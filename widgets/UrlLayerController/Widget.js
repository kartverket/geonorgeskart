define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "jimu/BaseWidget",
    "./LayerToggleUrlHandler"
  ],
  function(
    declare,
    lang,
    BaseWidget,
    LayerToggleUrlHandler
  ) {
    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-url-layer-controller",
      name: "Url Layer Controller",

      startup: function() {
        this.inherited(arguments);
        console.log("Hello from Url Layer Controller");

        var fullUrl = window.location.href;
        LayerToggleUrlHandler.enableVisibleMapLayersForQueryParams(this.map, fullUrl);
      }
    });

    return clazz;
  });