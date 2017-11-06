// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/Stream/StreamControl.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"jimu-widget-title" data-dojo-attach-point\x3d"controlLabelSection"\x3e\r\n    ${nls.streamControls}\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"controlButton stop" data-dojo-attach-point\x3d"startBtn"\x3e\r\n    \x3cdiv class\x3d"jimu-float-leading jimu-leading-margin1 runningIcon"\x3e\x3c/div\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal jimu-leading-margin1 btnLabel"\r\n           data-dojo-attach-point\x3d"startBtnLabel"\x3e${nls.stopStreaming}\x3c/label\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"controlButton" data-dojo-attach-point\x3d"clearBtn"\x3e\r\n    \x3cdiv class\x3d"jimu-float-leading jimu-leading-margin1 clearIcon"\x3e\x3c/div\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal jimu-leading-margin1 btnLabel"\x3e${nls.clearObservation}\x3c/label\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"drawPreviousSection" class\x3d"drawControl"\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal btnLabel"\x3e${nls.previousObservations}\x26nbsp;\x3c/label\x3e\r\n    \x3cinput data-dojo-type\x3d"dijit/form/NumberSpinner" style\x3d"height:32px;width:30%;float:right;"\r\n           data-dojo-props\x3d"smallDelta:1, intermediateChanges:true, constraints:{min:1,max:100,places:0}"\r\n           data-dojo-attach-point\x3d"previousSpinner"\r\n    /\x3e\r\n    \x3cdiv style\x3d"clear:both"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-widget-title filterLabel"\r\n      data-dojo-attach-point\x3d"filterLabelSection"\x3e\r\n    ${nls.streamFilter}\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"spatialFilterControl" class\x3d"filterControl"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"spatialFilterToggleDiv"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"spatialFilterSection" class\x3d"filterControl" style\x3d"display:none"\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"attrFilterControl" class\x3d"filterControl"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"attrFilterToggleDiv"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"attrFilterSection" class\x3d"filterControl" style\x3d"display:none"\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/on dojo/dom-attr dojo/dom-style dojo/dom-class dojo/dom-construct dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./StreamControl.html jimu/dijit/DrawBox ./FilterItem jimu/dijit/CheckBox dijit/form/RadioButton esri/symbols/jsonUtils esri/symbols/SimpleFillSymbol esri/graphic jimu/dijit/SimpleTable dijit/form/NumberSpinner jimu/dijit/LoadingShelter".split(" "),function(n,b,h,c,k,a,l,f,p,q,r,s,t,u,g,m,v,
w,x){return n([p,q,r],{baseClass:"jimu-widget-stream",templateString:s,map:null,streamLayer:null,isStreaming:!0,mapExtentChangeHandler:null,config:null,filterItems:[],postCreate:function(){this.inherited(arguments);this.spatialFilterToggle=new g({checked:!1,label:this.nls.useSpatialFilter,onChange:b.hitch(this,this._toggleSpatialFilter)});this.spatialFilterToggle.placeAt(this.spatialFilterToggleDiv);this.attrFilterToggle=new g({checked:!1,label:this.nls.useAttributeFilter,onChange:b.hitch(this,this._toggleAttributeFilter)});
this.attrFilterToggle.placeAt(this.attrFilterToggleDiv);this.config&&this._applyConfig();this.streamLayer&&this._bindEvents()},_applyConfig:function(){!0!==this.config.startStop&&a.set(this.startBtn,"display","none");!0!==this.config.clear&&a.set(this.clearBtn,"display","none");!0!==this.config.drawPrevious&&a.set(this.drawPreviousSection,"display","none");!0!==this.config.spatialFilter?(a.set(this.spatialFilterControl,"display","none"),a.set(this.spatialFilterSection,"display","none")):this.config.mapExtentFilter&&
this.config.drawExtentFilter?(this._createMapAreaFilterControl(!0),this._createDrawAreaFilterControl(!0)):this.config.mapExtentFilter?this._createMapAreaFilterControl(!1):this.config.drawExtentFilter?this._createDrawAreaFilterControl(!1):(a.set(this.spatialFilterControl,"display","none"),a.set(this.spatialFilterSection,"display","none"));if(this.config.attrFilter&&0<this.config.filterList.length){var e,d,c=!1;h.forEach(this.config.filterList,b.hitch(this,function(a,b){d=1===this.config.filterList.length?
"checkbox":"radio";var f=!0===a.inherited&&a.definitionExpression===this.streamLayer.getDefinitionExpression();e=new u({uid:this.id,config:a,type:d,streamLayer:this.streamLayer,index:b,checked:f,nls:this.nls});e.placeAt(this.attrFilterSection);this.filterItems.push(e);c=c||f}));c&&this.attrFilterToggle.setValue(!0)}else a.set(this.attrFilterControl,"display","none"),a.set(this.attrFilterSection,"display","none");!this.config.spatialFilter&&(!this.config.attrFilter||0===this.config.filterList.length)&&
a.set(this.filterLabelSection,"display","none")},_createMapAreaFilterControl:function(a){var d;d=f.create("div",{"class":"filterOption"},this.spatialFilterSection);a?(this.mapAreaControl=new m({id:this.id+"_mapAreaObservations",name:this.id+"_sf",value:"mapArea"}),this.mapAreaControl.placeAt(d),this.own(c(this.mapAreaControl,"change",b.hitch(this,this._mapAreaFilterChange))),f.create("label",{"class":"jimu-widget-normal","for":this.id+"_mapAreaObservations",innerHTML:this.nls.showMapAreaObservations},
d)):(this.mapAreaControl=new g({checked:!1,label:this.nls.showMapAreaObservations,onChange:b.hitch(this,this._mapAreaFilterChange)}),this.mapAreaControl.placeAt(d))},_createDrawAreaFilterControl:function(a){var d;d=f.create("div",{"class":"filterOption"},this.spatialFilterSection);a?(this.drawAreaControl=new m({id:this.id+"_drawAreaObservations",name:this.id+"_sf",value:"drawArea"}),this.drawAreaControl.placeAt(d),this.own(c(this.drawAreaControl,"change",b.hitch(this,this._drawAreaFilterChange))),
f.create("label",{"class":"jimu-widget-normal","for":this.id+"_drawAreaObservations",innerHTML:this.nls.showObservationsByDrawing},d)):(this.drawAreaControl=new g({checked:!1,label:this.nls.showObservationsByDrawing,onChange:b.hitch(this,this._drawAreaFilterChange)}),this.drawAreaControl.placeAt(d));this.drawToolDiv=f.create("div",{style:"display:none"},d);this.drawTool=new t({map:this.map,showClear:!0,keepOneGraphic:!0,geoTypes:["EXTENT"],types:["polygon"]});this.config.drawSymbol&&this.drawTool.setPolygonSymbol(v.fromJson(this.config.drawSymbol));
this.drawTool.placeAt(this.drawToolDiv);this.own(c(this.drawTool,"draw-end",b.hitch(this,function(a){a=new x(a.toJson());var e;a.symbol.setStyle(w.STYLE_NULL);this.drawTool.addGraphic(a);e=c(this.streamLayer,"filter-change",b.hitch(this,function(a){e.remove();a.filter.geometry&&"extent"===a.filter.geometry.type&&setTimeout(b.hitch(this,function(){this._clearOutsideGraphics(a.filter.geometry)}),100)}));this.streamLayer.setGeometryDefinition(a.geometry)})));this.own(c(this.drawTool,"clear",b.hitch(this,
function(){this.streamLayer.setGeometryDefinition(this.map.extent)})))},_mapAreaFilterChange:function(a){a?(this.streamLayer&&this.streamLayer.setGeometryDefinition(this.map.extent),this._addMapExtentChangeHandler()):this._removeMapExtentChangeHandler()},_drawAreaFilterChange:function(b){b?a.set(this.drawToolDiv,"display",""):(this.drawTool.clear(),a.set(this.drawToolDiv,"display","none"))},_bindEvents:function(){"none"!==a.get(this.startBtn,"display")&&this.own(c(this.startBtn,"click",b.hitch(this,
function(){(this.isStreaming=!this.isStreaming)?(l.add(this.startBtn,"stop"),k.set(this.startBtnLabel,"innerHTML",this.nls.stopStreaming),this.startStreaming()):(l.remove(this.startBtn,"stop"),k.set(this.startBtnLabel,"innerHTML",this.nls.startStreaming),this.stopStreaming())})));"none"!==a.get(this.clearBtn,"display")&&this.own(c(this.clearBtn,"click",b.hitch(this,function(){this.streamLayer.clear()})));if("none"!==a.get(this.drawPreviousSection,"display")){var e=this.streamLayer.maximumTrackPoints||
1;this.previousSpinner.set("value",e-1);this.streamLayer.setMaximumTrackPoints(e);this.own(c(this.previousSpinner,"change",b.hitch(this,function(a){this.streamLayer.setMaximumTrackPoints(a+1)})))}},_clearOutsideGraphics:function(a){this.streamLayer.clear()},destroy:function(){this.inherited(arguments);this._removeMapExtentChangeHandler()},stopStreaming:function(){this.streamLayer.disconnect(b.hitch(this,function(){this.streamLayer.clear()}))},startStreaming:function(){this.streamLayer.connect()},
_removeMapExtentChangeHandler:function(){this.mapExtentChangeHandler&&"function"===typeof this.mapExtentChangeHandler.remove&&(this.mapExtentChangeHandler.remove(),this.mapExtentChangeHandler=null)},_addMapExtentChangeHandler:function(){null===this.mapExtentChangeHandler&&(this.mapExtentChangeHandler=c(this.map,"extent-change",b.hitch(this,this._mapExtentChange)))},_mapExtentChange:function(a){this.streamLayer&&this.streamLayer.setGeometryDefinition(a.extent)},_toggleSpatialFilter:function(b){b?a.set(this.spatialFilterSection,
"display",""):(a.set(this.spatialFilterSection,"display","none"),a.set(this.drawToolDiv,"display","none"),this.mapAreaControl&&("jimu.dijit.CheckBox"===this.mapAreaControl.dealaredClass?this.mapAreaControl.setValue(!1):this.mapAreaControl.set("checked",!1)),this.drawAreaControl&&(this.drawTool.clear(),"jimu.dijit.CheckBox"===this.drawAreaControl.dealaredClass?this.drawAreaControl.setValue(!1):this.drawAreaControl.set("checked",!1)),this._removeMapExtentChangeHandler(),this.streamLayer&&this.streamLayer.setGeometryDefinition(null))},
_toggleAttributeFilter:function(b){b?a.set(this.attrFilterSection,"display",""):(a.set(this.attrFilterSection,"display","none"),h.forEach(this.filterItems,function(a){a.unCheck()}),this.streamLayer&&this.streamLayer.setDefinitionExpression(null))}})});