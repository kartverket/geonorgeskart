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

    var getTicketFor = function (serviceId) {
        return "3231";
    };

    var getTokenFor = function (serviceId) {
        return "TEST_TOKEN";
    };

    var getTicketForService = function (serviceId) {
        var deferred = new Deferred();

        request("https://localhost:44303/api/auth/ticket?serviceid=" + serviceId)
            .then(function (ticket) {
                deferred.resolve(ticket);
            }, function (error) {
                console.warn("Could not get token for service-id " + serviceId);
                deferred.resolve(null);
            });

        return deferred.promise;
    };

    var wmsNeedsAuthenticationRewrite = function(layer) {
        return false;
    };

    var wmtsNeedsAuthenticationRewrite = function(layer) {
        return true;
    };

    var urlRewriterWmsLayer = function(layer) {

        var originalGetImageUrl = layer.getImageUrl;

        layer.getImageUrl = function(extent, width, height, callback) {

            var ticket = getTicketFor("something");

            var result = originalGetImageUrl.call(layer, extent, width, height, function(url) {

                // TODO Improve readability and stability
                if(typeof url !== "string") {
                    return callback(url);
                }

                var urlAndQueryString = url.split("?");

                if(urlAndQueryString.length !== 2) {
                    return callback(url);
                }

                var urlWithoutQueryString = urlAndQueryString[0];
                var lastCharOfUrl = urlWithoutQueryString.slice(-1);

                if(lastCharOfUrl !== "/" && lastCharOfUrl !== "\\") {
                    urlWithoutQueryString += "/";
                }

                var modifiedUrl = urlWithoutQueryString + "ti_" + ticket + "?" + urlAndQueryString[1];   

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
                urlRewriterWmsLayer(layer);
              }
            }
          }
    };

    return {
        getTicketForService: getTicketForService,
        urlRewriterWmsLayer: urlRewriterWmsLayer,
        urlRewriterWmtsLayer: urlRewriterWmtsLayer,
        addLayerAuthenticationIfNecessary: addLayerAuthenticationIfNecessary
    };
});