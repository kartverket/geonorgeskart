define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "jimu/BaseWidget",
    "./ShareLayerConfigInUrl"
  ],
  function(
    declare,
    lang,
    BaseWidget,
    ShareLayerConfigInUrl
  ) {
    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-url-layer-controller",
      name: "Url Layer Controller",

      startup: function() {
        this.inherited(arguments);
        console.log("Hello from Url Layer Controller");

        var fullUrl = window.location.href;
        var layersToToggle = ShareLayerConfigInUrl.parseUrlForVisibleMapLayersQueryParams(fullUrl);
        ShareLayerConfigInUrl.enableVisibleMapLayersForQueryParams(this.map, layersToToggle);
        ShareLayerConfigInUrl.removeQueryParameterFromUrl(fullUrl);
      }
    });

    return clazz;
  });