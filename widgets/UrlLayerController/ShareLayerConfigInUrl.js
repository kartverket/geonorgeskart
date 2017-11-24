define([
    "dojo/_base/lang",
    "esri/urlUtils"
  ],
  function(
    lang,
    esriUrlUtils
  ) {
    var debug = true;
    function isDefined(x) {
        return !(x == null);
    }

    function log(x) {
        if(debug) {
            console.log(x);
        }
    }

    function ShareLayerConfigInUrl() {
        this.queryParamName = "geonorge_layers";
        this.splitSublayerCharacter = ",";
        this.splitLayerCharacter = ";";

        this.urlCleanupEnabled = false;
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
        log("Creating query params for share");

        var layerIds = map.layerIds || [];
        
        var layerIdToNumberDict = this.getArrayItemToIndexDict(layerIds);

        var visibleLayers = layerIds
            .map(function(id) { return map.getLayer(id); })
            .filter(function(l) { return l.visible; });

        var self = this;
        var queryParam = visibleLayers.reduce(function(queryString, layer) {
            var layerPart = layerIdToNumberDict[layer.id];

            // WMS
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
        
        if(!isDefined(urlObject.query)) {
            // no query params
            return [];
        }

        var layersQueryObject = urlObject.query[this.queryParamName];

        if(!isDefined(layersQueryObject)) {
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
        var layerToggleResult = layersToToggle.map(function (layer) {
            var errors = [];

            var mapLayerId = layerNumbersToIdsDict[layer.id];
            
            if(!isDefined(mapLayerId)) {
                errors.push("Could not find layer");
                return {
                    id: layer.id,
                    success: errors.length === 0,
                    errors: errors
                };
            }

            var mapLayer = map.getLayer(mapLayerId);

            // WMS
            if(mapLayer.getImageUrl) {

                var subLayerNames = mapLayer.layerInfos.map(function(li) {
                    return li.name;
                });

                var subLayerNumbersToIdsDict = self.getArrayIndexToItemDict(subLayerNames);

                var visibleSubLayerIds = layer.visibleLayers.map(function(number) { 
                    if(isDefined(subLayerNumbersToIdsDict[number])) {
                        return subLayerNumbersToIdsDict[number];
                    }
                    errors.push("Could not find sublayer with number " + number);
                    return null; 
                }).filter(function(id) { return id !== null; });

                mapLayer.setVisibleLayers(visibleSubLayerIds);
                mapLayer.show();
            }

            return {
                id: mapLayerId,
                success: errors.length === 0,
                errors: errors
            };
        });

        var failedLayers = layerToggleResult
            .filter(function(l) { return l.success === false })
            .forEach(function(l) {
                log("--- Layer with Id " + l.id + " ---");
                l.errors.forEach(log);
                log("--- End Layer Id " + l.id + " ---");
            });

        // clean up url from the browser window so its clear it does not update continously
        if(layersToToggle.length > 0) {
            this.removeQueryParameterFromUrl(url);
        }
    };

    ShareLayerConfigInUrl.prototype.removeQueryParameterFromUrl = function (url) {
        if(this.urlCleanupEnabled === false) {
            return;
        }

        var indexOfQueryParam = url.indexOf(this.queryParamName);
        
        if(indexOfQueryParam === -1) {
            // Could not find query param in url
            return;
        }

        var indexOfFirstAmpersandAfterQueryParam = url.indexOf("&", indexOfQueryParam);

        var urlWithoutQueryParam = null;
        if(indexOfFirstAmpersandAfterQueryParam === -1) {
            // we ran out of url before the query param ended, or the query param is the last param
            urlWithoutQueryParam = url.slice(0, indexOfQueryParam);
        } else {
            urlWithoutQueryParam = url.slice(0, indexOfQueryParam) + url.slice(indexOfFirstAmpersandAfterQueryParam + 1);
        }

        if(window.history && (typeof window.history.replaceState === "function")) {
            window.history.replaceState(null, null, urlWithoutQueryParam);
        }
    };

    return new ShareLayerConfigInUrl();
  });