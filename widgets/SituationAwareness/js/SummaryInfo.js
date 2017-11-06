// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/Evented dojo/_base/array dojo/_base/lang dojo/_base/Color dojo/dom dojo/dom-class dojo/dom-construct dojo/dom-style dojo/number dojo/on dojo/has dijit/form/Button jimu/dijit/Popup jimu/CSVUtils jimu/utils esri/config esri/geometry/geometryEngine esri/geometry/mathUtils esri/geometry/Point esri/geometry/webMercatorUtils esri/graphic esri/layers/FeatureLayer esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/Font esri/symbols/TextSymbol esri/tasks/query".split(" "),
function(v,w,m,f,z,A,l,n,B,x,r,C,D,E,s,y,F,q,G,H,I,J,t,K,L,M,N,u){return v("SummaryInfo",[w],{summaryLayer:null,summaryFields:[],summaryIds:[],summaryFeatures:[],summaryGeom:null,tabNum:null,symbolField:null,graphicsLayer:null,lyrRenderer:null,lyrSymbol:null,constructor:function(a,b,d){this.tab=a;this.container=b;this.parent=d;this.config=d.config;this.graphicsLayer=null},updateForIncident:function(a,b,d,c){this.tabNum=c;this.container.innerHTML="";l.add(this.container,"loading");this.summaryIds=
[];this.summaryFeatures=[];this.summaryGeom=b.geometry;if(0<this.tab.tabLayers.length){var e;"undefined"!==typeof this.tab.tabLayers[0].infoTemplate?(this.summaryLayer=this.tab.tabLayers[0],e=new t(this.summaryLayer.url),e.infoTemplate=this.tab.tabLayers[0].infoTemplate,this.tab.tabLayers.push(e),this._initGraphicsLayer(d),this.summaryFields=this._getFields(this.summaryLayer),f.hitch(this,this._queryFeatures(b.geometry))):(e=new t(this.tab.tabLayers[0].url),r(e,"load",f.hitch(this,function(){this.summaryLayer=
e;if(-1<this.tab.tabLayers[0].url.indexOf("MapServer"))for(var a=this.tab.tabLayers[0].url.split("MapServer/")[1],c=this.parent.map.itemInfo.itemData.operationalLayers,k=0;k<c.length;k++){var h=c[k];if("undefined"!==typeof h.layerObject&&h.layerObject.infoTemplates&&(h=h.layerObject.infoTemplates[a])){e.infoTemplate=h.infoTemplate;break}}this.tab.tabLayers.push(e);this._initGraphicsLayer(d);this.summaryFields=this._getFields(this.summaryLayer);f.hitch(this,this._queryFeatures(b.geometry))})))}},_initGraphicsLayer:function(a){null!==
a&&(this.graphicsLayer=a,this.graphicsLayer.clear(),this.summaryLayer&&this.summaryLayer.renderer&&(this.lyrRenderer=this.summaryLayer.renderer,this.graphicsLayer.renderer=this.lyrRenderer,"undefined"!==typeof this.summaryLayer.renderer.attributeField?this.symbolField=this.summaryLayer.renderer.attributeField:this.lyrSymbol=this.lyrRenderer.symbol))},_queryFeatures:function(a){var b=new u;b.geometry=a;this.summaryLayer.queryIds(b,f.hitch(this,function(a){a?(this.summaryIds=a,0<this.summaryIds.length?
this._queryFeaturesByIds():this._processResults()):this._processResults()}))},_queryFeaturesByIds:function(){var a=this.summaryLayer.maxRecordCount||1E3,b=this.summaryIds.slice(0,a);this.summaryIds.splice(0,a);var a=new u,d=!1;m.some(this.summaryFields,f.hitch(this,function(a){if("area"===a.type||"length"===a.type||this.graphicsLayer)return d=!0}));a.returnGeometry=d;var c=[];m.forEach(this.summaryFields,function(a){c.push(a.field)});this.symbolField&&c.push(this.symbolField);a.outFields=!0===this.config.csvAllFields||
"true"===this.config.csvAllFields?["*"]:c;a.objectIds=b;this.summaryLayer.queryFeatures(a,f.hitch(this,function(a){a.features&&(this.summaryFeatures=this.summaryFeatures.concat(a.features));this._processResults();0<this.summaryIds.length?(this.SA_SAT_download&&l.replace(this.SA_SAT_download,"processing","download"),this._queryFeaturesByIds()):this.SA_SAT_download&&l.replace(this.SA_SAT_download,"download","processing")}))},_prepResults:function(){for(var a=0;a<this.summaryFields.length;a++){var b=
this.summaryFields[a],d=b.field,c=b.total;switch(b.type){case "count":c=this.summaryFeatures.length;break;case "area":c=this._getArea();break;case "length":c=this._getLength();break;case "sum":c=this._getSum(d);break;case "avg":c=this._getSum(d)/this.summaryFeatures.length;break;case "min":c=this._getMin(d);break;case "max":c=this._getMax(d)}b.total=c}},_sortResults:function(a){return function(b,d){return b.attributes[a]<d.attributes[a]?-1:b.attributes[a]>d.attributes[a]?1:0}},_getSum:function(a){var b=
0;m.forEach(this.summaryFeatures,function(d){b+=d.attributes[a]});return b},_getMin:function(a){this.summaryFeatures.sort(this._sortResults(a));return this.summaryFeatures[0].attributes[a]},_getMax:function(a){this.summaryFeatures.sort(this._sortResults(a));this.summaryFeatures.reverse();return this.summaryFeatures[0].attributes[a]},_getArea:function(){var a=0,b=f.clone(this.config.distanceSettings);b.miles=109413;b.kilometers=109414;b.feet=109405;b.meters=109404;b.yards=109442;b.nauticalMiles=109409;
var d=b[this.config.distanceUnits];m.forEach(this.summaryFeatures,f.hitch(this,function(b){b=q.intersect(b.geometry,this.summaryGeom);null!==b&&(a+=q.geodesicArea(b,d))}));return a},_getLength:function(){var a=0,b=this.config.distanceSettings[this.config.distanceUnits];m.forEach(this.summaryFeatures,f.hitch(this,function(d){d=q.intersect(d.geometry,this.summaryGeom);null!==d&&(a+=q.geodesicLength(d,b))}));return a},_processResults:function(){this._prepResults();this.container.innerHTML="";l.remove(this.container,
"loading");if(0===this.summaryFeatures.length)this.container.innerHTML=this.parent.nls.noFeaturesFound;else{var a=this.summaryFields,b=0,d=n.create("div",{style:"width:"+220*(a.length+1)+"px;"},this.container);l.add(d,"SAT_tabPanelContent");var c=n.create("div",{},d);l.add(c,"SATcol");c=n.create("div",{"data-dojo-attach-point":"SA_SAT_download",innerHTML:this.parent.nls.downloadCSV},c);l.add(c,["btnExport","download"]);r(c,"click",f.hitch(this,this._exportToCSV));for(c=0;c<a.length;c++){var b=a[c],
e=y.stripHTML(b.alias?b.alias:"")+"\x3cbr/\x3e",b=b.alias===this.parent.nls.area||b.alias===this.parent.nls.length?b.total:Math.round(b.total);isNaN(b)&&(b=0);var g=n.create("div",{"class":"SATcol"},d),p=n.create("div",{style:"max-height: 60px;"},g);n.create("div",{"class":" SATcolWrap",style:"max-height: 30px; overflow: hidden;",innerHTML:e},p);n.create("div",{"class":" colSummary",innerHTML:x.format(b)},g)}if(null!==this.graphicsLayer){this.graphicsLayer.clear();this.tab.tabLayers[1].clear();if(this.summaryFeatures)for(a=
0;a<this.summaryFeatures.length;a++)d=this.summaryFeatures[a],this.lyrSymbol?d.symbol=this.lyrSymbol:this.graphicsLayer.renderer&&(c=this.graphicsLayer.renderer.getSymbol(d),d.symbol=c),this.graphicsLayer.add(d),this.tab.tabLayers[1].add(d);this.graphicsLayer.setVisibility(!0);this.parent._toggleTabLayersNew(this.tabNum);this.tab.restore&&this.emit("summary-complete",{bubbles:!0,cancelable:!0,tab:this.tabNum})}}},_exportToCSV:function(){if(0===this.summaryFeatures.length)return!1;var a;a=this.tab.label?
this.tab.label:this.tab.layers;var b=[],d=[];m.forEach(this.summaryFeatures,function(a){b.push(a.attributes)});if(!0===this.config.csvAllFields||"true"===this.config.csvAllFields)for(var c in b[0])d.push(c);else for(c=0;c<this.summaryFields.length;c++)d.push(this.summaryFields[c].field);c=this.summaryLayer.fields;if(this.summaryLayer&&this.summaryLayer.loaded&&c){var e={};if(this.parent.opLayers&&this.parent.opLayers._layerInfos){var g=this.parent.opLayers.getLayerInfoById(this.summaryLayer.id);g&&
(e.popupInfo=g.getPopupInfo())}var g=[],p=0;for(;p<d.length;p++){var k=d[p],h=!1,f,l=0;b:for(;l<c.length;l++)if(f=c[l],f.name===k){h=!0;break b}h?g.push(f):g.push({name:k,alias:k,show:!0,type:"esriFieldTypeString"})}e.datas=b;e.fromClient=!1;e.withGeometry=!1;e.outFields=g;e.formatDate=!0;e.formatCodedValue=!0;e.formatNumber=!1;s.exportCSVFromFeatureLayer(a,this.summaryLayer,e)}else s.exportCSV(a,b,d)},_getFields:function(a){var b=[];if(this.tab.advStat){a=this.tab.advStat.stats;for(var d in a)0<
a[d].length&&m.forEach(a[d],function(a){b.push({field:a.expression,alias:a.label+"",type:d,total:0})});return b}var c;if(a.infoTemplate)c=a.infoTemplate.info.fieldInfos;else if(-1<this.tab.tabLayers[0].url.indexOf("MapServer")){var e=this.tab.tabLayers[0].url.split("MapServer/")[1],g=this.parent.map.itemInfo.itemData.operationalLayers;c=null;for(var f=0;f<g.length;f++){var k=g[f];if(k.layerObject.infoTemplates&&(k=k.layerObject.infoTemplates[e])){c=k.infoTemplate.info.fieldInfos;break}}}else c=a.fields;
c||(c=a.fields);for(e=0;e<c.length;e++)if(g=c[e],"undefined"!==typeof a.fields){var f=a.fields[e].type,h;if(g.name!==a.objectIdField&&("esriFieldTypeDouble"===f||"esriFieldTypeInteger"===f||"esriFieldTypeSmallInteger"===f))"undefined"!==typeof g.visible?g.visible&&(h={field:g.fieldName,alias:g.label,type:"sum",total:0}):h={field:g.name,alias:g.alias,type:"sum",total:0},h&&b.push(h),h=null}return b}})});