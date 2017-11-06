// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/Legend/Utils":function(){define(["dojo/_base/array","jimu/LayerInfos/LayerInfos"],function(c,e){var h=function(){var b=[],d=e.getInstanceSync().getLayerInfoArray();c.forEach(d,function(a){var g=[];a.getShowLegendOfWebmap()&&(a.layerObject&&("esri.layers.ArcGISDynamicMapServiceLayer"===a.layerObject.declaredClass||"esri.layers.ArcGISTiledMapServiceLayer"===a.layerObject.declaredClass)&&a.traversal(function(a){a.isLeaf()&&!a.getShowLegendOfWebmap()&&g.push(a.originOperLayer.mapService.subId)}),
a.isMapNotesLayerInfo()?c.forEach(a.getSubLayers(),function(a){b.push({layer:a.layerObject,title:"Map Notes - "+a.title})}):b.push({hideLayers:g,layer:a.layerObject,title:a.title}))});return b.reverse()},f=function(b,d){return c.filter(b.layerInfos,function(a){var b=!1;a.id===d&&(b=!0);return b})[0]};return{getLayerInfosParam:function(){return h()},getLayerInfosParamByConfig:function(b){var d=[],a;b.layerInfos&&b.layerInfos.length&&(a=h(),c.forEach(a,function(a){var c=f(b,a.jimuLayerInfo.id);c&&(a.hideLayers=
c.hideLayers,d.push(a))}));return d}}})},"widgets/Legend/_build-generate_module":function(){define(["dojo/text!./Widget.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/Legend/Widget.html":'\x3cdiv\x3e\r\n  \x3c!--div data-dojo-attach-point\x3d"legendDiv"\x3e\x3c/div--\x3e\r\n  \x3cdiv style\x3d"display:none" data-dojo-attach-point\x3d"removedDiv"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n\r\n',"url:widgets/Legend/css/style.css":".esriLegendServiceLabel {font-size: 14px;}.esriLegendLayer{font-size: 12px;}",
"*now":function(c){c(['dojo/i18n!*preload*widgets/Legend/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])}}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on ./Utils dijit/_WidgetsInTemplateMixin jimu/BaseWidget jimu/LayerInfos/LayerInfos esri/dijit/Legend".split(" "),function(c,e,h,f,b,d,a,g,k){return c([a,d],{name:"Legend",baseClass:"jimu-widget-legend",legend:null,_jimuLayerInfos:null,startup:function(){this.inherited(arguments)},onOpen:function(){this._jimuLayerInfos=g.getInstanceSync();var a={arrangement:this.config.legend.arrangement,autoUpdate:this.config.legend.autoUpdate,respectCurrentMapScale:this.config.legend.respectCurrentMapScale,
map:this.map,layerInfos:this._getLayerInfosParam()};this.legend=new k(a,h.create("div",{},this.domNode));this.legend.startup();this._bindEvent()},onClose:function(){this.legend.destroy()},_bindEvent:function(){this.config.legend.autoUpdate&&(this.own(f(this._jimuLayerInfos,"layerInfosIsShowInMapChanged",e.hitch(this,"refreshLegend"))),this.own(f(this._jimuLayerInfos,"layerInfosChanged",e.hitch(this,"refreshLegend"))),this.own(f(this._jimuLayerInfos,"layerInfosRendererChanged",e.hitch(this,"refreshLegend"))))},
_getLayerInfosParam:function(){return void 0===this.config.legend.layerInfos?b.getLayerInfosParam():b.getLayerInfosParamByConfig(this.config.legend)},refreshLegend:function(){var a=this._getLayerInfosParam();this.legend.refresh(a)}})});