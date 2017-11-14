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
  "esri/request",
  "./NorgeDigitaltAuth"
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
    esriRequest,
    NorgeDigitaltAuth
  ) {
    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-norge-digitalt-ticket",
      name: "Norge Digitalt Ticket",

      postCreate: function () {
        this.inherited(arguments);
        console.log("Hello from Norge Digitalt Ticket postCreate");

        this.addUrlRewriterForAuthentication();

        this.map.layerIds.forEach(lang.hitch(this, function(layerId) {
          var layer = this.map.getLayer(layerId);
          NorgeDigitaltAuth.addLayerAuthenticationIfNecessary(layer);       
        }));
      },

      addUrlRewriterForAuthentication: function() {
        this.map.on("layer-add", function (evt) {
          var layer = evt.layer;
          NorgeDigitaltAuth.addLayerAuthenticationIfNecessary(layer);
        });
      },

      startup: function () {
        this.inherited(arguments);        
      },

      onClose: function () {
      }

    });

    return clazz;
  });