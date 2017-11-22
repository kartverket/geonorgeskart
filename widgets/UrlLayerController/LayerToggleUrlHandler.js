define([
    "dojo/_base/lang",
    "esri/urlUtils"
  ],
  function(
    lang,
    esriUrlUtils
  ) {
    
    function LayerToggleUrlHandler() {
        this.queryParamName = "geonorge_layers";
    }

    LayerToggleUrlHandler.prototype.createQueryParamsForVisibleMapLayers = function (map) {
        // TODO create a method that returns a string representation of visible layers in map
        console.log("Creating query params for share");
        return this.queryParamName + "=" + encodeURIComponent(new Date().toDateString());
    };

    LayerToggleUrlHandler.prototype.enableVisibleMapLayersForQueryParams = function (map, url) {
        // TODO parse url and enable map layers which should be visible
        var urlObject = esriUrlUtils.urlToObject(url);
        console.log("Should handle layer toggle for url:", urlObject);
    };

    return new LayerToggleUrlHandler();
  });