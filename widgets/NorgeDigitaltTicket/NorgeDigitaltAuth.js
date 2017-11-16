define([
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/request"
],
function (
    aspect,
    lang,
    Deferred,
    request) {

    var wmtsToken = null;
    var wmsTicketIds = [];
    var ticketByServiceIdDictionary = {};
    var generatingTickets = false;

    var getTicketFor = function (serviceId) {
        if(ticketByServiceIdDictionary[serviceId]) {
            return ticketByServiceIdDictionary[serviceId].ticket;
        } 
        return null;
    };

    var getWmtsToken = function () {
        if(wmtsToken) {
            return wmtsToken.token;
        }
        return null;
    };

    var getTicketForServices = function (serviceIds) {
        var deferred = new Deferred();

        if(!(serviceIds instanceof Array)){
            serviceIds = [];
        }

        request("https://localhost:44303/api/auth/ticket", {
            data: JSON.stringify(serviceIds),
            method: "POST",
            handleAs: "json",
            headers: { "Content-Type": "application/json" }
        })
        .then(function (tickets) {
            deferred.resolve(tickets);
        }, function (error) {
            console.warn("Could not get token for service-ids " + serviceIds.join(", "));
            deferred.resolve(null);
        });

        return deferred.promise;
    };

    var generateTickets = function () {
        if(generatingTickets) {
            return;
        }

        generatingTickets = true;

        getTicketForServices(wmsTicketIds).then(function(tickets) {
            if(tickets === null || ((tickets instanceof Array) === false)) {
                // unable to reach ticket service.
                console.warn("WMS services are run without ticket. Check setup and ticket service for error.");
                return;
            }

            tickets.forEach(function(t) {
                ticketByServiceIdDictionary[t.serviceId] = t;
            });
            generatingTickets = false;
        });
    };

    var wmsNeedsAuthenticationRewrite = function(layer) {
        var domains = ["wms.geonorge.no"];
        return urlNeedsAuthentication(layer.url, domains);
    };

    var wmtsNeedsAuthenticationRewrite = function(layer) {
        var domains = [];
        return urlNeedsAuthentication(layer.url, domains);
    };

    var urlNeedsAuthentication = function (url, domains) {
        var hasAuthenticatedDomain = false;

        for(var i = 0; i < domains.length; i++){
            if(url.indexOf(domains[i]) !== -1) {
                hasAuthenticatedDomain = true;
                break;
            }
        }

        return hasAuthenticatedDomain;
    };

    var getServiceIdFromUrl = function (url) {
        var servideIdPattern = /(wms\.[\w]+(\-\w+)*)/g;

        var matches = url.match(servideIdPattern);

        if(matches === null) {
            return null;
        }

        // Last match is serviceId. First match is wms.geonorge
        var serviceId = matches[matches.length - 1];
        return serviceId;
    };

    var urlRewriterWmsLayer = function(layer) {

        var originalGetImageUrl = layer.getImageUrl;
        

        layer.getImageUrl = function(extent, width, height, callback) {

            var result = originalGetImageUrl.call(layer, extent, width, height, function(url) {

                var serviceId = getServiceIdFromUrl(url);
                var ticket = getTicketFor(serviceId);

                if(ticket === null) {
                    return callback(url);
                }

                if(typeof url !== "string") {
                    return callback(url);
                }

                var modifiedUrl = url + "&ticket=" + ticket;

                return callback(modifiedUrl);
            });
            return result;
        };

        layer._geodata_norgedigitalt_auth_added = true;
    };

    var urlRewriterWmtsLayer = function(layer) {
        aspect.after(layer, "getTileUrl", function(url, imgElement) {
            var token = getTokenFor("something");
            // TODO FIGURE OUT SOMETHING
            return url + "&gkt=" + token;   
        });

        layer._geodata_norgedigitalt_auth_added = true;
    };

    var addLayerAuthenticationIfNecessary = function(layer) {

        if(typeof layer.getTileUrl === "function") {
            if(wmtsNeedsAuthenticationRewrite(layer)){
              if(layer._geodata_norgedigitalt_auth_added !== true) {
                urlRewriterWmtsLayer(layer);
              }
            }
          }

          if(typeof layer.getImageUrl === "function") {
            if(wmsNeedsAuthenticationRewrite(layer)) {
              if(layer._geodata_norgedigitalt_auth_added !== true) {

                // Add id to list of ids to fetch ticket for
                var serviceId = getServiceIdFromUrl(layer.url);
                if(wmsTicketIds.indexOf(serviceId) === -1) {
                    wmsTicketIds.push(serviceId);
                }

                urlRewriterWmsLayer(layer);
              }
            }
          }
    };


    return {
        getTicketForServices: getTicketForServices,
        urlRewriterWmsLayer: urlRewriterWmsLayer,
        urlRewriterWmtsLayer: urlRewriterWmtsLayer,
        addLayerAuthenticationIfNecessary: addLayerAuthenticationIfNecessary,
        generateTickets: generateTickets
    };
});