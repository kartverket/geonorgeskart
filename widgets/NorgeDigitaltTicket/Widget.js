define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/html",
  "dojo/Deferred",
  "jimu/BaseWidget",
  "jimu/utils",
  "jimu/portalUtils",
  "jimu/dijit/Message",
  "esri/arcgis/utils",
  "esri/request"  
],
  function (
    declare,
    lang,
    html,
    Deferred,
    BaseWidget,
    utils,
    PortalUtils,
    Message,
    arcgisUtils,
    esriRequest) {
    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-norge-digitalt-ticket",
      name: "Norge Digitalt Ticket",

      postCreate: function () {
        this.inherited(arguments);
        console.log("Hello from Norge Digitalt Ticket postCreate");

        this.addUrlRewriterForAuthentication();

        arcgisUtils.getItem(this.appConfig.map.itemId)
          .then(function (response) {
            var data = response.itemData;

            var basemapLayers = data.baseMap.baseMapLayers;
            var operationalLayers = data.operationalLayers;
            var layers = basemapLayers.concat(operationalLayers);

            console.log("All layers");
            console.log(layers);

            var wmtsLayers = layers.filter(function (l) { return l.type === "WebTiledLayer" });
            var wmsLayers = layers.filter(function (l) { return l.type === "WMS" });
          });
      },

      addUrlRewriterForAuthentication: function() {
        this.map.on("layer-add-result", function (evt) {
          // TODO HOOK overwrite function getImageUrl getTileUrl
        });
      },

      startup: function () {
        this.inherited(arguments);        
      },

      getTicketForService: function (serviceId) {
        var deferred = new Deferred();

        esriRequest("https://localhost:44303/api/auth/ticket?serviceid=" + serviceId)
          .then(function (ticket) {
            deferred.resolve(ticket);
          }, function (error) {
            console.warn("Could not get token for service-id " + serviceId);
            deferred.resolve(null);
          });

        return deferred.promise;
      },

      onClose: function () {
      }

    });

    return clazz;
  });