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
        this.apiBaseUrl = "https://localhost:44303";
        this.wmtsToken = null;
        this.wmsTicketIds = [];
        this.ticketByServiceIdDictionary = {};
        this.generatingTickets = false;
        this.generatingToken = false;
        this.failedTicketRequestsInRow = 0;
        this.failedTokenRequestsInRow = 0;
        this.ticketTimeoutId = null;
        this.tokenTimeoutId = null;
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

    NorgeDigitaltAuth.prototype.getToken = function () {
        var deferred = new Deferred();

        request(this.apiBaseUrl + "/api/auth/token", {
            method: "GET",
            handleAs: "json"
        })
        .then(function (token) {
            deferred.resolve(token);
        }, function (error) {
            console.warn("Could not get token for WMTS services: ", error);
            deferred.resolve(null);
        });

        return deferred.promise;
    };

    NorgeDigitaltAuth.prototype.getTicketForServices = function (serviceIds) {
        var deferred = new Deferred();

        if(!(serviceIds instanceof Array)){
            serviceIds = [];
        }

        request(this.apiBaseUrl + "/api/auth/ticket", {
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

    NorgeDigitaltAuth.prototype.generateToken = function () {
        if(this.generatingToken || this.failedTokenRequestsInRow > 2) {
            return;
        }

        this.generatingToken = true;

        this.getToken().then(lang.hitch(this, function(token) {

            this.generatingToken = false;

            if(token === null) {
                console.warn("WMTS services are run without token. Check setup and token service for error.");
                this.failedTokenRequestsInRow = this.failedTokenRequestsInRow + 1;

                // Retry a total of three times before quitting with 5 second spacing
                setTimeout(lang.hitch(this, this.generateToken), 5000);
                return;
            }

            this.failedTokenRequestsInRow = 0;

            var now = new Date();
            var tokenExpires = new Date(token.expirationTimeUTC);

            var diffMilliSeconds = tokenExpires - now;

            var nextCallbackShouldBeIn = diffMilliSeconds - (5 * 60 * 1000);

            this.wmtsToken = token;

            if(this.tokenTimeoutId !== null) {
                clearTimeout(this.tokenTimeoutId);
            }

            if(nextCallbackShouldBeIn <= 0) {
                this.generateToken();
                return;
            }
            this.tokenTimeoutId = setTimeout(lang.hitch(this, this.generateToken), nextCallbackShouldBeIn);
        }));
    };

    NorgeDigitaltAuth.prototype.generateTickets = function () {
        if(this.generatingTickets || this.failedTicketRequestsInRow > 2) {
            return;
        }

        this.generatingTickets = true;

        this.getTicketForServices(this.wmsTicketIds).then(lang.hitch(this, function(tickets) {

            this.generatingTickets = false;

            if(tickets === null || ((tickets instanceof Array) === false)) {
                console.warn("WMS services are run without ticket. Check setup and ticket service for error.");
                this.failedTicketRequestsInRow = this.failedTicketRequestsInRow + 1;

                // Retry a total of three times before quitting with 5 second spacing
                setTimeout(lang.hitch(this, this.generateTickets), 5000);
                return;
            }

            this.failedTicketRequestsInRow = 0;

            tickets.forEach(lang.hitch(this, function(t) {
                this.ticketByServiceIdDictionary[t.serviceId] = t;
            }));

            var now = new Date();
            var expirationTimeInMinutes = tickets.map(function(t) {
                var tokenExpires = new Date(t.expirationTimeUTC);

                var diffMilliSeconds = tokenExpires - now;

                var nextCallbackShouldBeIn = diffMilliSeconds - (5 * 60 * 1000);
                return nextCallbackShouldBeIn;
            });

            var minNextCallbackTime = Math.min.apply(null, expirationTimeInMinutes);

            if(this.ticketTimeoutId !== null) {
                clearTimeout(this.ticketTimeoutId);
            }

            if(minNextCallbackTime <= 0) {
                this.generateTickets();
                return;
            }
            this.ticketTimeoutId = setTimeout(lang.hitch(this, this.generateTickets), minNextCallbackTime);
        }));
    };

    NorgeDigitaltAuth.prototype.wmsNeedsAuthenticationRewrite = function(layer) {
        var domains = ["wms.geonorge.no"];
        return this.urlNeedsAuthentication(layer.url, domains);
    };

    NorgeDigitaltAuth.prototype.wmtsNeedsAuthenticationRewrite = function(layer) {
        var domains = ["opencache.statkart.no"];
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