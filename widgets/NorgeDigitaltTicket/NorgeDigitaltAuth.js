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

    function NorgeDigitaltAuth() {
        this.wmtsToken = null;
        this.wmsTicketIds = [];
        this.ticketByServiceIdDictionary = {};
        this.generatingTickets = false;
    }

    NorgeDigitaltAuth.prototype.getTicketFor = function (serviceId) {
        if(this.ticketByServiceIdDictionary[serviceId]) {
            return this.ticketByServiceIdDictionary[serviceId].ticket;
        } 
        return null;
    };

    NorgeDigitaltAuth.prototype.getWmtsToken = function () {
        if(this.wmtsToken) {
            return this.wmtsToken.token;
        }
        return null;
    };

    NorgeDigitaltAuth.prototype.getTicketForServices = function (serviceIds) {
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

    NorgeDigitaltAuth.prototype.generateTickets = function () {
        if(this.generatingTickets) {
            return;
        }

        this.generatingTickets = true;

        this.getTicketForServices(this.wmsTicketIds).then(lang.hitch(this, function(tickets) {
            if(tickets === null || ((tickets instanceof Array) === false)) {
                console.warn("WMS services are run without ticket. Check setup and ticket service for error.");
                return;
            }

            tickets.forEach(lang.hitch(this, function(t) {
                this.ticketByServiceIdDictionary[t.serviceId] = t;
            }));

            this.generatingTickets = false;
        }));
    };

    NorgeDigitaltAuth.prototype.wmsNeedsAuthenticationRewrite = function(layer) {
        var domains = ["wms.geonorge.no"];
        return this.urlNeedsAuthentication(layer.url, domains);
    };

    NorgeDigitaltAuth.prototype.wmtsNeedsAuthenticationRewrite = function(layer) {
        var domains = [];
        return this.urlNeedsAuthentication(layer.url, domains);
    };

    NorgeDigitaltAuth.prototype.urlNeedsAuthentication = function (url, domains) {
        var hasAuthenticatedDomain = false;

        for(var i = 0; i < domains.length; i++){
            if(url.indexOf(domains[i]) !== -1) {
                hasAuthenticatedDomain = true;
                break;
            }
        }

        return hasAuthenticatedDomain;
    };

    NorgeDigitaltAuth.prototype.getServiceIdFromUrl = function (url) {
        var servideIdPattern = /(wms\.[\w]+(\-\w+)*)/g;

        var matches = url.match(servideIdPattern);

        if(matches === null) {
            return null;
        }

        // Last match is serviceId. First match is wms.geonorge
        var serviceId = matches[matches.length - 1];
        return serviceId;
    };

    NorgeDigitaltAuth.prototype.urlRewriterWmsLayer = function(layer) {

        var originalGetImageUrl = layer.getImageUrl;
        var self = this;

        layer.getImageUrl = function(extent, width, height, callback) {

            var result = originalGetImageUrl.call(layer, extent, width, height, function(url) {

                var serviceId = self.getServiceIdFromUrl(url);
                var ticket = self.getTicketFor(serviceId);

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

    NorgeDigitaltAuth.prototype.urlRewriterWmtsLayer = function(layer) {
        var self = this;
        aspect.after(layer, "getTileUrl", function(url, imgElement) {
            var token = self.getWmtsToken();

            if(token === null) {
                return url;
            }

            return url + "&gkt=" + token;   
        });

        layer._geodata_norgedigitalt_auth_added = true;
    };

    NorgeDigitaltAuth.prototype.addLayerAuthenticationIfNecessary = function(layer) {

        if(typeof layer.getTileUrl === "function") {
            if(this.wmtsNeedsAuthenticationRewrite(layer)){
              if(layer._geodata_norgedigitalt_auth_added !== true) {
                this.urlRewriterWmtsLayer(layer);
              }
            }
          }

          if(typeof layer.getImageUrl === "function") {
            if(this.wmsNeedsAuthenticationRewrite(layer)) {
              if(layer._geodata_norgedigitalt_auth_added !== true) {

                // Add id to list of ids to fetch ticket for
                var serviceId = this.getServiceIdFromUrl(layer.url);
                if(this.wmsTicketIds.indexOf(serviceId) === -1) {
                    this.wmsTicketIds.push(serviceId);
                }

                this.urlRewriterWmsLayer(layer);
              }
            }
          }
    };

    // Create singleton
    var norgeDigitaltAuth = new NorgeDigitaltAuth();
    return norgeDigitaltAuth;
});