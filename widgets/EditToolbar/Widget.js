define(["dojo/_base/declare", "jimu/BaseWidget", "esri/toolbars/edit", "esri/config","dojo/_base/array", "dojo/_base/event", "dojo/_base/lang", "dijit/registry", "dijit/form/Button", "dojo/domReady!" ], function(declare, BaseWidget, Edit, esriConfig, arrayUtils, event, lang, registry) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        baseClass: 'jimu-widget-EditToolbar',

        startup: function() {
            this.inherited(arguments);
            //this.mapIdNode.innerHTML = 'map id' + this.map.id;
            map = this.map;
        }
    });
	        map = this.map;
        console.log(map);

        require([
            "esri/toolbars/edit",
            "esri/config",

            "dojo/_base/array",
            "dojo/_base/event",
            "dojo/_base/lang",
            "dijit/registry",

            "dijit/form/Button",
            "dojo/domReady!"
        ], function(
            Edit, esriConfig,
            arrayUtils, event, lang, registry
        ) {

            // refer to "Using the Proxy Page" for more information:  https://developers.arcgis.com/javascript/3/jshelp/ags_proxy.html
            esriConfig.defaults.io.proxyUrl = "/proxy/";

            // This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications.
            esriConfig.defaults.geometryService = new esri.tasks.GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

            //map = e.detail[0];


            // Can be used instead of e.detail[x]
            //console.log(this.map);
            // console.log(map.getLayer("graphicsLayer[x]"));

            //initEditing([e.detail[1], e.detail[2], e.detail[3], e.detail[4]]);

            function initEditing(evt) {
                //console.log("initEditing", evt);
                var currentLayer = null;
                var layers = evt;
                //console.log("layers", layers);

                var editToolbar = new Edit(map);
                editToolbar.on("deactivate", function(evt) {

                    //currentLayer.applyEdits(null, [evt.graphic], null);
                });

                //deactivate the toolbar when you click outside a graphic
                map.on("click", function(evt) {
                    editToolbar.deactivate();
                });

                arrayUtils.forEach(layers, function(layer) {
                    var editingEnabled = false;
                    layer.on("click", function(evt) {
                        event.stop(evt);
                        if (editingEnabled === false) {
                            editingEnabled = true;
                            editToolbar.activate(Edit.EDIT_VERTICES | Edit.SCALE | Edit.MOVE | Edit.ROTATE, evt.graphic);
                            //console.log(evt.graphic);
                        } else {
                            currentLayer = this;
                            editToolbar.deactivate();
                            editingEnabled = false;
                        }
                    });
                });
            }
        });
});