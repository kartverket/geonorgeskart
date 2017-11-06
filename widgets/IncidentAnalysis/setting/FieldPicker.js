// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/IncidentAnalysis/setting/FieldPicker.html":'\x3cdiv style\x3d"height:100%;width:100%;overflow:auto"\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"tableArea" class\x3d"tableArea"\x3e\r\n    \x3cdiv class\x3d"btn-add-section enable" data-dojo-attach-point\x3d"btnAddField"\x3e\r\n        \x3cspan class\x3d"btn-add-icon"\x3e\x3c/span\x3e\r\n        \x3cspan class\x3d"btn-add-label" id\x3d"divLayerTitle" data-dojo-attach-point\x3d"divLayerTitle"\x3e${nls.addField}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"fieldTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"layer",title:"Field","class":"label",type:"empty",width:"400px"},{name:"type",title:"Type","class":"sumlabel",type:"empty"},{name:"actions",title:"Actions","class":"actions",type:"actions",actions:["up","down","delete"],width:"150px"}]\'\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:20px" data-dojo-attach-point\x3d"chk_summary"\x3e\r\n    \x3cdiv class\x3d"col-1-3" data-dojo-attach-point\x3d"div_chkCount"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_count" title\x3d"${nls.count_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.count_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkArea"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_area" title\x3d"${nls.area_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.area_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkLength"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_length" title\x3d"${nls.length_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.length_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"footer"\x3e\r\n    \x3cdiv class\x3d"jimu-btn ok" data-dojo-attach-point\x3d"btnOk"\x3e${nls.ok}\x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-btn cancel" data-dojo-attach-point\x3d"btnCancel"\x3e${nls.cancel}\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dijit/_WidgetsInTemplateMixin dijit/form/Select dojo/_base/array dojo/_base/lang dojo/_base/html dojo/dom-style dojo/on dojo/query jimu/BaseWidget jimu/dijit/Message esri/layers/FeatureLayer dojo/text!./FieldPicker.html dojo/Evented jimu/dijit/SimpleTable".split(" "),function(m,n,k,e,d,l,g,f,h,p,q,r,s,t){return m([p,n,t],{templateString:s,baseClass:"jimu-widget-IMT-setting",advConfig:{},fieldsList:null,callerLayer:null,callerTab:null,callerOpLayers:null,layerList:null,constructor:function(a){this.map=
a.map},postCreate:function(){this.inherited(arguments);this.startup()},startup:function(){this.operationsList=[{value:"sum",label:this.nls.sum},{value:"avg",label:this.nls.avg},{value:"min",label:this.nls.min},{value:"max",label:this.nls.max}];var a="";"summary"===this.callerTab.type?(g.set(this.chk_summary,"display","block"),a="Type"):g.set(this.chk_summary,"display","none");var b=h("th",this.domNode);1<b.length&&(b[1].innerHTML=a);this.own(f(this.btnCancel,"click",d.hitch(this,function(){this.emit("cancel")})));
this.own(f(this.btnOk,"click",d.hitch(this,function(){this.updateAdvConfig();this.emit("ok",this.advConfig)})));this.layerTables=[];this.summaryLayers=[];this.advConfig={};this._getAllValidLayers();this.own(f(this.btnAddField,"click",d.hitch(this,this._addTabRow)))},_updateGeomOptions:function(a){a&&(this.chk_area.set("disabled","esriGeometryPolygon"!==a),this.chk_length.set("disabled","esriGeometryPolyline"!==a))},_getAllValidLayers:function(){e.forEach(this.callerOpLayers,d.hitch(this,function(a){0<
a.newSubLayers.length?this._recurseOpLayers(a.newSubLayers):a.title===this.callerLayer&&(this.layerList=a)}));if(this.layerList.layerObject.empty){var a=new r(this.layerList.layerObject.url);f(a,"load",d.hitch(this,function(){this._completeMapLayers(a)}))}else this._completeMapLayers(this.layerList)},_recurseOpLayers:function(a){e.forEach(a,d.hitch(this,function(a){0<a.newSubLayers.length?this._recurseOpLayers(a.newSubLayers):a.title===this.callerLayer&&(this.layerList=a)}))},_completeMapLayers:function(a){if(a){console.log(a);
var b,c;"undefined"===typeof a.layerObject?(c=a.geometryType,this.objectIdField=a.objectIdField,b={url:a.url,fields:[]},a=d.clone(a.fields)):(c=a.layerObject.geometryType,this.objectIdField=a.layerObject.objectIdField,b={url:a.layerObject.url,fields:[]},a=d.clone(a.layerObject.fields));this.advConfig=b;this._updateGeomOptions(c);this.advConfig.url&&(this._setFields(a),this.callerTab.advConfig&&(this.callerTab.advConfig.fields&&0<this.callerTab.advConfig.fields.length)&&e.forEach(this.callerTab.advConfig.fields,
d.hitch(this,function(a){"count"===a.type?this.chk_count.set("value",!0):"area"===a.type?this.chk_area.set("value",!0):"length"===a.type?this.chk_length.set("value",!0):(console.log(a.type,a.expression),this._populateTabTableRow(a.type,a.expression))})))}},_setFields:function(a){var b=["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeDouble"];"summary"!==this.callerTab.type&&(b.push("esriFieldTypeString"),b.push("esriFieldTypeDate"));var c=[];e.forEach(a,d.hitch(this,function(a){-1<
b.indexOf(a.type)&&c.push({label:a.alias,value:a.name})}));1>c.length&&g.set(this.btnAddField,"display","none");this.fieldsList=d.clone(c)},_populateTabTableRow:function(a,b){var c=this.fieldTable.addRow({});c.success&&c.tr&&(c=c.tr,this._addTabFields(c),this._addTabTypes(c),c.selectFields.set("value",b),"summary"===this.callerTab.type&&c.selectTypes.set("value",a))},_addTabRow:function(){if("summary"!==this.callerTab.type&&3<=this.fieldTable.getRows().length)new q({message:this.nls.max_records});
else{var a=this.fieldTable.addRow({});a.success&&a.tr&&(a=a.tr,this._addTabFields(a),this._addTabTypes(a))}},_addTabFields:function(a){var b=d.clone(this.fieldsList),c=h(".simple-table-cell",a)[0];c&&(l.setStyle(c,"verticalAlign","middle"),b=new k({style:{width:"100%",height:"30px"},options:b}),b.placeAt(c),b.startup(),a.selectFields=b)},_addTabTypes:function(a){if("summary"===this.callerTab.type){var b=d.clone(this.operationsList),c=h(".simple-table-cell",a)[1];c&&(l.setStyle(c,"verticalAlign","middle"),
b=new k({style:{width:"100%",height:"30px"},options:b}),b.placeAt(c),b.startup(),a.selectTypes=b)}},updateAdvConfig:function(){var a=this.fieldTable.getRows(),b=[];"summary"!==this.callerTab.type?e.forEach(a,function(a){b.push({value:0,type:"out",expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})}):(this.chk_count.checked&&b.push({value:0,type:"count",expression:this.objectIdField,label:this.nls.count}),this.chk_area.checked&&b.push({value:0,type:"area",expression:this.objectIdField,
label:this.nls.area}),this.chk_length.checked&&b.push({value:0,type:"length",expression:this.objectIdField,label:this.nls.length}),e.forEach(a,d.hitch(this,function(a){b.push({value:0,type:a.selectTypes.value,expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})})));0<b.length?this.advConfig.fields=b:this.advConfig=null;console.log("ADVCONFIG",this.advConfig)},destroy:function(){this.advConfig=null}})});