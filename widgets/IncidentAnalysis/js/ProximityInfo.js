// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/_base/array dojo/dom-class dojo/dom-construct dojo/dom-style dojo/on esri/geometry/geometryEngine esri/geometry/webMercatorUtils esri/graphic esri/layers/FeatureLayer esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/Font esri/symbols/TextSymbol esri/tasks/query jimu/CSVUtils".split(" "),function(z,n,u,l,g,h,A,q,B,v,w,C,x,y,D,E,F,G){return z("ProximityInfo",null,{constructor:function(b,c,a){this.tab=b;this.container=
c;this.parent=a;this.graphicsLayer=this.buffer=this.incident=this.featureLayer=null;this.specialFields={}},updateForIncident:function(b,c,a){if(this.featureLayer)this.processIncident(b,c,a);else if(0<this.tab.tabLayers.length){var d=new C(this.tab.tabLayers[0].url);q(d,"load",n.hitch(this,function(){d.capabilities&&-1<d.capabilities.indexOf("Query")?(this.featureLayer=d,this.processIncident(b,c,a)):this._processError()}));q(this.parent.opLayers,"layerInfosFilterChanged",n.hitch(this,this._layerFilterChanged))}},
_layerFilterChanged:function(b){if(!(null===this.featureLayer||null===this.incident||null===this.buffer||null===this.graphicsLayer)){var c=this.tab.tabLayers[0].id;l.forEach(b,n.hitch(this,function(a){c===a.id&&this.processIncident(this.incident,this.buffer,this.graphicsLayer)}))}},processIncident:function(b,c,a){this.container.innerHTML="";g.add(this.container,"loading");var d=[];this.incident=b;this.buffer=c;this.graphicsLayer=a;this.graphicsLayer.clear();var e=this.tab.tabLayers[0].id,f="";this.parent.opLayers.traversal(function(a){if(e===
a.id&&a.getFilter())return f=a.getFilter(),!0});a=new F;a.returnGeometry=!0;a.geometry=c.geometry;a.where=f;a.outFields=this._getFields(this.featureLayer);a.outSpatialReference=this.parent.map.spatialReference;this.featureLayer.queryFeatures(a,n.hitch(this,function(a){var c=this._getFields(this.featureLayer);a=a.features;if(0<a.length)for(var e=0;e<a.length;e++){for(var f=a[e],g={DISTANCE:this._getDistance(b.geometry,f.geometry)},h=0;h<c.length;h++)g[c[h]]=f.attributes[c[h]];f.attributes=g;d.push(f)}this._processResults(d)}),
n.hitch(this,this._processError))},_processError:function(){this.container.innerHTML="";g.remove(this.container,"loading");this.container.innerHTML=this.parent.nls.noFeaturesFound},_processResults:function(b){this.container.innerHTML="";g.remove(this.container,"loading");this.graphicsLayer.clear();if(0===b.length)this.container.innerHTML=this.parent.nls.noFeaturesFound;else{b.sort(this._compareDistance);var c=h.create("div",{id:"tpc",style:"width:"+220*(b.length+1)+"px;"},this.container);g.add(c,
"IMT_tabPanelContent");var a=h.create("div",{},c);g.add(a,"IMTcol");a=h.create("div",{innerHTML:this.parent.nls.downloadCSV},a);g.add(a,"btnExport");q(a,"click",n.hitch(this,this._exportToCSV,b));for(var a=this.parent.nls[this.parent.config.distanceUnits],d=0;d<b.length;d++){var e=d+1,f=b[d],k=f.geometry,l=k;"point"!==k.type&&(l=k.getExtent().getCenter());var f=f.attributes,p=a+": "+Math.round(100*f.DISTANCE)/100,k="",m=0,r;for(r in f)"DISTANCE"!==r&&3>m&&(k+=this._getFieldValue(r,f[r])+"\x3cbr/\x3e",
m+=1);m=h.create("div",{id:"Feature_"+e},c);g.add(m,"IMTcolRec");var s=h.create("div",{},m);g.add(s,"IMTcolRecBar");var t=h.create("div",{innerHTML:e},s);g.add(t,"IMTcolRecNum");A.set(t,"backgroundColor",this.parent.config.color);q(t,"click",n.hitch(this,this._zoomToLocation,l));p=h.create("div",{innerHTML:p},s);g.add(p,"IMTcolDistance");this.parent.config.enableRouting&&(p=h.create("div",{},s),g.add(p,"IMTcolDir"),q(p,"click",n.hitch(this,this._routeToIncident,l)));k=h.create("div",{innerHTML:k},
m);g.add(k,"IMTcolInfo");k=new y(y.STYLE_SOLID,new u.fromString(this.parent.config.color),1);k=new x(x.STYLE_CIRCLE,24,k,new u.fromString(this.parent.config.color));m=new D;m.family="Arial";m.size="12px";e=new E(e,m,"#ffffff");e.setOffset(0,-4);this.graphicsLayer.add(new w(l,k,f));this.graphicsLayer.add(new w(l,e,f))}}},_exportToCSV:function(b){if(0===b.length)return!1;var c=this.tab.layers,a=[],d=[];l.forEach(b,function(b){a.push(b.attributes)});for(var e in a[0])d.push(e);G.exportCSV(c,a,d)},_getFields:function(b){var c=
[];if(this.tab.advConfig&&this.tab.advConfig.fields&&0<this.tab.advConfig.fields.length)l.forEach(this.tab.advConfig.fields,function(a){c.push(a.expression)});else{var a;a=b.infoTemplate?b.infoTemplate.info.fieldInfos:b.fields;for(var d=0;d<a.length;d++){var e=a[d];"undefined"!==typeof e.visible?e.visible&&c.push(e.fieldName):c.push(e.name)}}var f={};l.forEach(b.fields,function(a){if("esriFieldTypeDate"===a.type||a.domain)f[a.name]=a});this.specialFields=f;return c},_getFieldValue:function(b,c){var a=
c;if(this.specialFields[b]){var d=this.specialFields[b];"esriFieldTypeDate"===d.type?a=(new Date(c)).toLocaleString():l.some(d.domain.codedValues,function(b){if(b.code===c)return a=b.name,!0})}return a},_getDistance:function(b,c){var a=0;4326===b.spatialReference.wkid&&(b=v.geographicToWebMercator(b));4326===c.spatialReference.wkid&&(c=v.geographicToWebMercator(c));var d=this.parent.config.distanceUnits,a=B.distance(b,c,9001);switch(d){case "miles":a*=6.21371E-4;break;case "kilometers":a*=0.0010;
break;case "feet":a*=3.28084;break;case "yards":a*=1.09361;break;case "nauticalMiles":a*=5.39957E-4}return a},_compareDistance:function(b,c){return b.attributes.DISTANCE<c.attributes.DISTANCE?-1:b.attributes.DISTANCE>c.attributes.DISTANCE?1:0},_zoomToLocation:function(b){this.parent.zoomToLocation(b)},_routeToIncident:function(b){this.parent.routeToIncident(b)}})});