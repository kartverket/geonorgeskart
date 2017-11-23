define([
    "dojo/_base/lang",
    "esri/urlUtils"
  ],
  function(
    lang,
    esriUrlUtils
  ) {
    
    function ShareLayerConfigInUrl() {
        this.queryParamName = "geonorge_layers";
        this.splitSublayerCharacter = ",";
        this.splitLayerCharacter = ";";
    }

    ShareLayerConfigInUrl.prototype.getArrayItemToIndexDict = function(layerIds) {
        if(layerIds instanceof Array === false){
            return {};
        }

        return layerIds.reduce(function(dict, id, index) {
            dict[id] = index;

            return dict;
        }, {});
    };

    ShareLayerConfigInUrl.prototype.getArrayIndexToItemDict = function(layerIds) {
        if(layerIds instanceof Array === false){
            return {};
        }

        return layerIds.reduce(function(dict, id, index) {
            dict[index] = id;
            
            return dict;
        }, {});
    };

    ShareLayerConfigInUrl.prototype.createQueryParamsForVisibleMapLayers = function (map) {
        console.log("Creating query params for share");

        var layerIds = map.layerIds || [];
        
        var layerIdToNumberDict = this.getArrayItemToIndexDict(layerIds);

        var visibleLayers = layerIds
            .map(function(id) { return map.getLayer(id); })
            .filter(function(l) { return l.visible; });

        var self = this;
        var queryParam = visibleLayers.reduce(function(queryString, layer) {
            var layerPart = layerIdToNumberDict[layer.id];
            //wms
            if(layer.getImageUrl) {
                var visibleLayers = layer.visibleLayers
                    .filter(function(l) { return l !== -1; });

                var subLayerIdToNumberDict = self.getArrayItemToIndexDict(visibleLayers);

                var visibleLayersAsTextNumbers = visibleLayers.map(function(subLayerId) { return subLayerIdToNumberDict[subLayerId] });

                layerPart = layerPart + "[" + visibleLayersAsTextNumbers.join(self.splitSublayerCharacter) + "]";
            }

            if(queryString !== ""){
                queryString += self.splitLayerCharacter;
            }

            return queryString + layerPart;
        }, "");

        return this.queryParamName + "=" + encodeURIComponent(queryParam);
    };

    ShareLayerConfigInUrl.prototype.parseUrlForVisibleMapLayersQueryParams = function (url) {
        var urlObject = esriUrlUtils.urlToObject(url);
        
        if(urlObject.query === null) {
            // no query params
            return [];
        }

        var layersQueryObject = urlObject.query[this.queryParamName];

        if(typeof layersQueryObject === "undefined" || layersQueryObject === null) {
            // query params, but not the one this component is looking for
            return [];
        } 

        var self = this;

        var layers = layersQueryObject
            .split(this.splitLayerCharacter)
            .map(function(layerString) {
                var id = null;
                var visibleLayers = null;

                var indexOfBlockStart = layerString.indexOf("[");
                if(indexOfBlockStart > -1) {
                    // has sublayer ids passed in [...]
                    var idString = layerString.slice(0, indexOfBlockStart);
                    var sublayerString = layerString.slice(indexOfBlockStart);

                    var sublayers = sublayerString
                        .replace("[", "")
                        .replace("]", "")
                        .split(self.splitSublayerCharacter);

                    id = idString;
                    visibleLayers = sublayers;
                } else {
                    // only id passed, no sublayers
                    id = layerString;
                    visibleLayers = [];
                }

                return {
                    id: id,
                    visibleLayers: visibleLayers
                };
            });

            return layers;
    };

    ShareLayerConfigInUrl.prototype.enableVisibleMapLayersForQueryParams = function (map, url) {
        var layersToToggle = this.parseUrlForVisibleMapLayersQueryParams(url);

        var layerNumbersToIdsDict = this.getArrayIndexToItemDict(map.layerIds);

        var self = this;
        var layerToggleResult = layersToToggle.map(function(layer) {
            var mapLayer = map.getLayer(layerNumbersToIdsDict[layer.id]);

            if(!(mapLayer)) {
                return {
                    id: layer.id,
                    success: false
                };
            }

            // wms
            if(mapLayer.getImageUrl) {
                var subLayersWithIdAndNumber = mapLayer.layerInfos.map(function(li) {
                    return li.name;
                });
                var subLayerNumbersToIdsDict = self.getArrayIndexToItemDict(subLayersWithIdAndNumber);
                var visibleLayerIds = layer.visibleLayers.map(function(number) { return subLayerNumbersToIdsDict[number]; });
                mapLayer.setVisibleLayers(visibleLayerIds);
                mapLayer.show();
            }


            return {
                id: layer.id,
                success: true
            };
        }, this);
    };

    return new ShareLayerConfigInUrl();
  });