// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/html dijit/_WidgetBase jimu/dijit/Popup jimu/dijit/Message jimu/dijit/Filter dgrid/OnDemandGrid ../dgrid/Selection dgrid/extensions/ColumnHider dgrid/extensions/ColumnResizer dgrid/extensions/ColumnReorder dijit/Menu dijit/MenuItem dijit/Toolbar dijit/form/Button dijit/DropDownMenu dijit/form/ToggleButton dijit/form/DropDownButton dojo/Deferred dojo/when dojo/Evented dojo/touch dojo/store/Memory esri/config esri/lang esri/request esri/tasks/RelationParameters esri/tasks/RelationshipQuery esri/layers/FeatureLayer esri/tasks/QueryTask esri/tasks/query esri/tasks/ProjectParameters esri/graphic esri/geometry/Point esri/geometry/Multipoint esri/geometry/Polyline esri/geometry/Polygon esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/Color esri/geometry/normalizeUtils dojo/_base/lang dojo/on dojo/aspect dojo/_base/array jimu/dijit/LoadingIndicator jimu/dijit/FieldStatistics jimu/SelectionManager jimu/CSVUtils jimu/utils ../utils dojo/query".split(" "),
function(x,h,C,D,t,E,F,G,H,I,J,K,p,L,u,M,N,O,r,P,Q,R,s,v,n,S,y,T,z,A,q,U,da,ea,V,fa,ga,ha,ia,ja,W,e,m,X,l,Y,Z,$,aa,ba,w,B){return x([C,Q],{baseClass:"jimu-widget-attributetable-feature-table",_defaultFeatureCount:2E3,_defaultBatchCount:25,_batchCount:0,_filterObj:null,_currentDef:null,_requestStatus:"initial",map:null,matchingMap:!1,layerInfo:null,configedInfo:null,footerHeight:25,layer:null,loading:null,grid:null,footer:null,selectedRowsLabel:null,selectionRows:null,nls:null,_dblClickResult:null,
actived:!1,showSelected:!1,tableCreated:!1,_relatedQuery:!1,_relatedQueryIds:null,_selectionHandles:null,_selectionResults:null,constructor:function(a){a=a||{};this.set("map",a.map||null);this.set("matchingMap",!!a.matchingMap);this.set("layerInfo",a.layerInfo||null);this.set("layer",a.layer||null);this.set("configedInfo",a.configedInfo||null);this.set("relatedOriginalInfo",a.relatedOriginalInfo||null);this.set("relationship",a.relationship||null);this.set("syncSelection",!!a.syncSelection||!0)},
postCreate:function(){this.inherited(arguments);this._relatedQueryIds=[];this.createToolbar();this.loading=new Y;this.loading.placeAt(this.domNode);this.selectionManager=$.getInstance();this._selectionResults=[];this.selectionRows=[];h.setAttr(this.domNode,"data-layerinfoid",e.getObject("layerInfo.id",!1,this));this.get("map")&&(this.own(m(this.map.root,R.release,e.hitch(this,function(){this._clickMap=!0}))),this.own(m(this.map,"extent-change",e.hitch(this,"_onExtentChange"))))},startup:function(){this.inherited(arguments);
this.toolbarHeight=parseInt(h.getStyle(this.toolbar.domNode,"height"),10)||0},setLayerDefinition:function(a){this._layerDefinition=a},getLayerDefinition:function(){return this._getLayerDifinition()},getFilterableFields:function(){if(this._layerDefinition&&this.configedInfo){var a=e.clone(this._layerDefinition);return this._getFilterableFields(a.fields,this.configedInfo.layer.fields)}return[]},getFilterObj:function(){return this._filterObj},setFilterObj:function(a){this._filterObj=a},showRefreshing:function(a){a?
this.loading.show():this.loading.hide()},active:function(){this.actived=!0},deactive:function(){this.actived=!1},cancelThread:function(){"fulfilled"!==this._requestStatus&&this._currentDef&&(this._currentDef.cancel({canceledBySelf:!0}),this._requestStatus="canceled")},isCanceled:function(){return"canceled"===this._requestStatus},createToolbar:function(){var a=new L({},h.create("div")),b=new M;this.showSelectedRecordsMenuItem=new p({label:this.nls.showSelectedRecords,iconClass:"esriAttributeTableSelectPageImage",
onClick:e.hitch(this,this.toggleSelectedRecords)});b.addChild(this.showSelectedRecordsMenuItem);this.showRelatedRecordsMenuItem=new p({label:this.nls.showRelatedRecords,iconClass:"esriAttributeTableSelectAllImage",onClick:e.hitch(this,this.onShowRelatedRecordsClick)});b.addChild(this.showRelatedRecordsMenuItem);this.filterMenuItem=new p({label:this.nls.filter,iconClass:"esriAttributeTableFilterImage",onClick:e.hitch(this,this.onFilterMenuItemClick)});b.addChild(this.filterMenuItem);this.toggleColumnsMenuItem=
new p({label:this.nls.columns,iconClass:"esriAttributeTableColumnsImage",onClick:e.hitch(this,this.onToggleColumnsClick)});b.addChild(this.toggleColumnsMenuItem);this.hideExportButton||(this.exportCSVMenuItem=new p({label:this.nls.exportFiles,showLabel:!0,iconClass:"esriAttributeTableExportImage",onClick:e.hitch(this,this.onExportCSVClick)}),b.addChild(this.exportCSVMenuItem));this.selectionMenu=new O({label:this.nls.options,iconClass:"esriAttributeTableOptionsImage",dropDown:b});a.addChild(this.selectionMenu);
this.matchingCheckBox=new N({checked:this.matchingMap?!0:!1,showLabel:!0,label:this.nls.filterByExtent,onChange:e.hitch(this,function(a){this.set("matchingMap",a);this._onMatchingCheckBoxChange(a)})});a.addChild(this.matchingCheckBox);this.zoomButton=new u({label:this.nls.zoomto,iconClass:"esriAttributeTableZoomImage",onClick:e.hitch(this,this.zoomTo)});a.addChild(this.zoomButton);this.clearSelectionButton=new u({label:this.nls.clearSelection,iconClass:"esriAttributeTableClearImage",onClick:e.hitch(this,
this.clearSelection,!0,!0)});a.addChild(this.clearSelectionButton);this.refreshButton=new u({label:this.nls.refresh,showLabel:!0,iconClass:"esriAttributeTableRefreshImage",onClick:e.hitch(this,this.refresh)});a.addChild(this.refreshButton);h.place(a.domNode,this.domNode);this.toolbar=a;this.own(m(this,"data-loaded,row-click,clear-selection",e.hitch(this,"changeToolbarStatus")))},startQuery:function(a){this.cancelThread();this._requestStatus="processing";this.loading.show();!a||!a.length?(this._relatedQuery=
!1,this._relatedQueryIds=[],this.queryByStoreObjectIds=null):this.queryByStoreObjectIds=a;this._currentDef=this._getLayerObject();this._currentDef.then(e.hitch(this,function(b){this.domNode&&(this.layer=b,(b=!this.layerInfo.isTable&&this.matchingMap&&this.map.extent||null)&&b.spatialReference&&b.spatialReference.isWebMercator()?(this._currentDef=W.normalizeCentralMeridian([b],null,e.hitch(this,function(a){return a[0]}))).then(e.hitch(this,function(b){this._doQuery(b,a)}),e.hitch(this,function(a){a&&
"Request canceled"!==a.message&&console.error(a);this.changeToolbarStatus();this.loading.hide()})):this._doQuery(b,a))}),e.hitch(this,function(a){console.error(a);this.changeToolbarStatus();this.loading.hide()}))},queryRecordsByRelationship:function(a){var b=a&&a.layer,c=a&&a.selectedIds;a&&a.relationship&&this.set("relationship",a.relationship);a&&a.relatedOriginalInfo&&this.set("relatedOriginalInfo",a.relatedOriginalInfo);var d=this.relationship;b&&d&&c&&0<c.length&&!ba.isEqual(this._relatedQueryIds,
c)&&e.getObject("relatedOriginalInfo.layerObject.url",!1,this)?(this.loading.show(),this._requestStatus="processing",this._relatedQuery=!0,this.matchingCheckBox.set("checked",!1),this.cancelThread(),this._currentDef=this._getLayerObject(),this._currentDef.then(e.hitch(this,function(a){if(this.domNode){this.layer=a;var g=[],k=this.layer;l.forEach(k.fields,function(a){(!n.isDefined(a.show)||!0===a.show||"esriFieldTypeOID"===a.type||n.isDefined(k.objectIdField)&&a.name===k.objectIdField)&&g.push(a.name)});
a=new T;a.objectIds=c;a.outFields=g.length?g:["*"];a.relationshipId=d.id;a.returnGeometry="esriGeometryPoint"===this.layer.geometryType;(this._currentDef=b.queryRelatedFeatures(a,function(a){return a})).then(e.hitch(this,function(a){if(this.domNode){var b={displayFieldName:d.objectIdField,fields:k.fields,features:[],fieldAliases:null},e={},f=function(a){var c=a.attributes[this.layer.objectIdField];e[c]||(e[c]=!0,b.features.push(a))},g;for(g in a){var m=a[g];l.forEach(m&&m.features,f,this)}h.destroy(this.tipNode);
0<b.features.length?(this.grid||(this._removeTable(),h.place(this.loading.domNode,this.domNode)),a=this._getOutFieldsFromLayerInfos(this.layer.objectIdField),this.queryExecute(a,b.features.length,!1,b)):(this.tipNode=h.toDom("\x3cdiv\x3e"+this.nls.noRelatedRecords+"\x3c/div\x3e"),this._removeTable(),h.place(this.tipNode,this.domNode),h.place(this.loading.domNode,this.domNode));this._relatedQueryIds=c;this.emit("data-loaded");this.loading.hide()}}),e.hitch(this,function(a){a&&"Request canceled"!==
a.message&&console.error(a);h.destroy(this.tipNode);this.tipNode=h.toDom("\x3cdiv\x3e"+this.nls.noRelatedRecords+"\x3c/div\x3e");this._removeTable();h.place(this.tipNode,this.domNode);h.place(this.loading.domNode,this.domNode);this.loading.hide();this.changeToolbarStatus()}))}}),e.hitch(this,function(a){console.error(a);this.loading.hide();this.changeToolbarStatus()}))):this.loading.hide()},getSelectedRows:function(){return!this.tableCreated?[]:this.selectionRows},zoomTo:function(){this._zoomToSelected()},
toggleSelectedRecords:function(){this._relatedQuery&&!this.showSelected&&0===this.getSelectedRows().length?(this._relatedQuery=!1,this._relatedQueryIds=[],this.layerInfo&&!this.layerInfo.isTable&&this.matchingCheckBox.set("checked",!0),this.startQuery(),this.showSelectedRecordsMenuItem.set("label",this.nls.showSelectedRecords),this.showSelected=!1,this.emit("show-all-records",{layerInfoId:this.layerInfo.id})):this.tableCreated&&(this.showSelected?(this.showAllSelectedRecords(),this.showSelectedRecordsMenuItem.set("label",
this.nls.showSelectedRecords),this.showSelected=!1,this.emit("show-all-records",{layerInfoId:this.layerInfo.id})):(this.showSelectedRecords(),this.showSelectedRecordsMenuItem.set("label",this.nls.showAllRecords),this.showSelected=!0,this.emit("show-selected-records",{layerInfoId:this.layerInfo.id})))},onShowRelatedRecordsClick:function(){this.emit("show-related-records",{layerInfoId:this.layerInfo.id,objectIds:this.getSelectedRows()})},onFilterMenuItemClick:function(){this.showRefreshing(!0);this.getLayerDefinition().then(e.hitch(this,
function(a){if(this.domNode){a=e.clone(a);var b=this.getFilterableFields();a.fields=b;var c=new E({noFilterTip:this.nls.noFilterTip,style:"width:100%;margin-top:22px;"});this._filterPopup=new D({titleLabel:this.nls.filter,width:720,height:485,content:c,buttons:[{label:this.nls.ok,onClick:e.hitch(this,function(){var a=c.toJson();a&&a.expr?(this.setFilterObj(a),this.clearSelection(!1),this.startQuery(),this._filterPopup.close(),this._filterPopup=null,this.emit("apply-filter",{layerInfoId:this.layerInfo.id,
expr:a.expr})):new t({message:this.nls.setFilterTip})})},{label:this.nls.cancel}]});(b=this.getFilterObj())?c.buildByFilterObj(this.layer.url,b,a):c.buildByExpr(this.layer.url,null,a)}}),e.hitch(this,function(a){this.domNode&&console.error(a)})).always(e.hitch(this,function(){this.showRefreshing(!1)}));this.emit("show-filter",{layerInfoId:this.layerInfo.id})},onToggleColumnsClick:function(){this.toggleColumns();this.emit("toggle-columns",{layerInfoId:this.layerInfo.id})},onExportCSVClick:function(){var a=
new t({message:this.nls.exportMessage,titleLabel:this.nls.exportFiles,autoHeight:!0,buttons:[{label:this.nls.ok,onClick:e.hitch(this,function(){this.exportToCSV();a.close()})},{label:this.nls.cancel}]});this.emit("export-csv",{layerInfoId:this.layerInfo.id})},onSelectionComplete:function(a){var b=a.features;b&&(0===b.length?this.clearSelection(!1):this._selectBySelf(b)||(this.clearSelection(!1),this._updateSelectRowsByFeatures(a.features)))},changeToolbarStatus:function(){if(this.tableCreated){var a=
this.getSelectedRows();this.showSelected?this.showSelectedRecordsMenuItem.set("label",this.nls.showAllRecords):this.showSelectedRecordsMenuItem.set("label",this.nls.showSelectedRecords);this.tableCreated&&a&&0<a.length&&this.layer&&this.layer.objectIdField?(this.showSelectedRecordsMenuItem.set("disabled",!1),this.clearSelectionButton.set("disabled",!1)):(this.showSelectedRecordsMenuItem.set("disabled",!0),this.clearSelectionButton.set("disabled",!0));this._relatedQuery&&(this.showSelectedRecordsMenuItem.set("disabled",
!1),this.tableCreated&&(a&&0===a.length)&&this.showSelectedRecordsMenuItem.set("label",this.nls.showAllRecords));this.showRelatedRecordsMenuItem.set("disabled",!0);if(this.layerInfo&&this.isSupportQueryToServer()&&a&&0<a.length&&this.layer&&this.layer.objectIdField){this._relatedDef&&!this._relatedDef.isFulfilled()&&this._relatedDef.cancel();var b=this.layerInfo.getRelatedTableInfoArray();this._relatedDef=b;b.then(e.hitch(this,function(a){if(this.domNode){var b=this.getSelectedRows();this.tableCreated&&
(a&&0<a.length&&b&&0<b.length)&&this.showRelatedRecordsMenuItem.set("disabled",!1)}}))}this.tableCreated&&this.isSupportQueryToServer()&&!this._relatedQuery?this.filterMenuItem.set("disabled",!1):this.filterMenuItem.set("disabled",!0);this.matchingCheckBox.set("disabled",!1);this.tableCreated?this.toggleColumnsMenuItem.set("disabled",!1):this.toggleColumnsMenuItem.set("disabled",!0);this.hideExportButton||(a&&0<a.length?this.exportCSVMenuItem.set("label",this.nls.exportSelected):this.exportCSVMenuItem.set("label",
this.nls.exportAll),this.tableCreated?this.exportCSVMenuItem.set("disabled",!1):this.exportCSVMenuItem.set("disabled",!0));this.layerInfo.isShowInMap()?this.tableCreated&&a&&0<a.length?this.zoomButton.set("disabled",!1):this.zoomButton.set("disabled",!0):this.zoomButton.set("disabled",!0);this.layerInfo.isTable&&(this.matchingCheckBox.set("disabled",!0),this.zoomButton.set("disabled",!0))}else this._relatedQuery?(this.showSelectedRecordsMenuItem.set("disabled",!1),this.showSelectedRecordsMenuItem.set("label",
this.nls.showAllRecords)):this.showSelectedRecordsMenuItem.set("disabled",!0),this.showRelatedRecordsMenuItem.set("disabled",!0),this.matchingCheckBox.set("disabled",!0),this.filterMenuItem.set("disabled",!0),this.toggleColumnsMenuItem.set("disabled",!0),this.hideExportButton||this.exportCSVMenuItem.set("disabled",!0),this.zoomButton.set("disabled",!0)},showSelectedRecords:function(){if(this.tableCreated){var a=this.layer.objectIdField,b=this.getSelectedRows();0<b.length&&this.grid&&(this.grid.store instanceof
s?this.grid.set("query",e.hitch(this,function(c){return"number"===typeof c&&-1<b.indexOf(c)||-1<b.indexOf(c[a])?!0:!1})):this.grid.set("query",function(){return b}))}},showAllSelectedRecords:function(){if(this.tableCreated&&this.showSelected){this.grid.set("query",{});var a=this.getSelectedRows();this._updateSelectRowsByIds(a)}},clearSelection:function(a,b){this.tableCreated&&(this.grid.clearSelection(),this.selectionRows=[],a&&this.grid.set("query",{}),b&&(this.selectionManager.clearSelection(this.layer),
this._selectionResults=[]),this._closePopup(),this.setSelectedNumber(),this.showSelected=!1,this.emit("clear-selection"))},refresh:function(){this.grid&&this.grid.clearSelection();this._relatedQuery||this.startQuery();this.emit("refresh",{layerInfoId:this.layerInfo.id})},exportToCSV:function(a){if(this.layerInfo&&this.layer&&this.tableCreated){var b=null,b=this.layer.objectIdField,c=this.getSelectedRowsData(),b=this._getOutFieldsFromLayerInfos(b),b=this._processExecuteFields(this.layer.fields,b),
d={};c&&0<c.length?d.datas=c:this.grid.store instanceof s&&(c=this.grid.store.data,d.datas=c);"datas"in d&&"esriGeometryPoint"===this.layer.geometryType&&(c=e.clone(d.datas),l.forEach(c,function(a){var b=a.geometry;b&&"point"===b.type&&("x"in a?a._x=b.x:a.x=b.x,"y"in a?a._y=b.y:a.y=b.y);delete a.geometry}),d.datas=c,b=e.clone(b),c="",c=-1!==b.indexOf("x")?"_x":"x",b.push({name:c,alias:c,format:{digitSeparator:!1,places:6},show:!0,type:"esriFieldTypeDouble"}),c=-1!==b.indexOf("y")?"_y":"y",b.push({name:c,
alias:c,format:{digitSeparator:!1,places:6},show:!0,type:"esriFieldTypeDouble"}));d.fromClient=!1;d.withGeometry="esriGeometryPoint"===this.layer.geometryType;d.outFields=b;d.formatNumber=!1;d.formatDate=!0;d.formatCodedValue=!0;d.popupInfo=this.layerInfo.getPopupInfo();return aa.exportCSVFromFeatureLayer(a||this.configedInfo.name,this.layer,d)}},toggleColumns:function(){this.tableCreated&&this.grid._toggleColumnHiderMenu()},changeHeight:function(a){this.grid&&0<=a-this.toolbarHeight-this.footerHeight&&
h.setStyle(this.grid.domNode,"height",a-this.toolbarHeight-this.footerHeight+"px")},isSupportQueryToServer:function(){var a=this.layer&&"esri.layers.CSVLayer"===this.layer.declaredClass,b=this.layer&&"esri.layers.StreamLayer"===this.layer.declaredClass;return this.layer&&this.layer.url&&this.configedInfo.layer.url&&!a&&!b},isSupportQueryOnClient:function(){var a=this.layer&&"esri.layers.CSVLayer"===this.layer.declaredClass,b=this.layer&&"esri.layers.StreamLayer"===this.layer.declaredClass;return!(this.layer&&
this.layer.url&&this.configedInfo.layer.url)||a||b},destroy:function(){this._destroyed||(this.layer=this.configedInfo=this.layerInfo=null,this._selectionHandles&&l.forEach(this._selectionHandles,function(a){a&&a.remove&&a.remove()}),this._closePopup(),this._filterPopup&&this._filterPopup.domNode&&(this._filterPopup.close(),this._filterPopup=null),this._dblClickResult=null,this.grid&&this.grid.destroy(),this.relationship=this.nls=this.map=null,this._currentDef&&!this._currentDef.isFulfilled()&&this._currentDef.cancel({canceledBySelf:!0}),
this._relatedDef&&!this._relatedDef.isFulfilled()&&this._relatedDef.cancel({canceledBySelf:!0}),this.inherited(arguments))},_selectBySelf:function(a){a=a||[];return a.length!==this._selectionResults.length?!1:l.every(this._selectionResults,function(b){return-1<a.indexOf(b)})},_updateSelectRowsByFeatures:function(a){a=l.map(a,e.hitch(this,function(a){return a.attributes[this.layer.objectIdField]}));this._updateSelectRowsByIds(a)},_updateSelectRowsByIds:function(a){this.grid&&this.tableCreated&&(this.selectionRows=
a,l.forEach(a,e.hitch(this,function(a){this.grid.select(a)})),this.setSelectedNumber(),this.changeToolbarStatus())},_removeTable:function(){this.grid&&this.grid.domNode&&(this.grid.destroy(),this.grid=null);this.footer&&(h.destroy(this.footer),this.selectedRowsLabel=this.footer=null);this.tableCreated=!1},_onMatchingCheckBoxChange:function(a){this.tableCreated&&!this._relatedQuery&&(this.cancelThread(),this.queryByStoreObjectIds=null,this.startQuery());if("fulfilled"===this._requestStatus&&this.tableCreated&&
this._relatedQuery)if(a)this.queryByStoreObjectIds=l.map(this.grid.store.data,e.hitch(this,function(a){return a[this.layer.objectIdField]})),this.startQuery(this.queryByStoreObjectIds);else{var b=this._relatedQueryIds;this._relatedQueryIds=[];this.queryRecordsByRelationship({layer:this.relatedOriginalInfo.layerObject,selectedIds:b})}a||(this._currentExtent=null)},_closePopup:function(){var a=this.map.infoWindow.getSelectedFeature(),b=a&&this._dblClickResult&&a===this._dblClickResult,a=a&&a._layer===
this.layer;if(this.domNode&&(b||a))this.map.infoWindow.hide(),this._dblClickResult=null},_getLayerObject:function(){function a(a){this._selectionHandles&&l.forEach(this._selectionHandles,function(a){a&&a.remove&&a.remove()});this._selectionHandles=[];this._selectionHandles.push(m(a,"selection-complete",e.hitch(this,"onSelectionComplete")))}return(this._currentDef=this.layerInfo.getLayerObject()).then(e.hitch(this,function(b){var c=new r;"esri.layers.ArcGISImageServiceLayer"===b.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===
b.declaredClass?(b=new z(b.url),this.own(m(b,"load",e.hitch(this,function(b){e.hitch(this,a)(b.layer);c.resolve(b.layer)})))):(e.hitch(this,a)(b),c.resolve(b));return c}))},_getLayerDifinition:function(){return this._layerDefinition?P(e.clone(this._layerDefinition)):S({url:this.layer.url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}).then(e.hitch(this,function(a){this.setLayerDefinition(a);return this.getLayerDefinition()}))},_getFilterableFields:function(a,b){return l.filter(a,
function(a){return l.some(b,function(b){return a.name===b.name&&(b.show||!n.isDefined(b.show))&&e.mixin(a,b)})})},_doQuery:function(a,b){if(this.layer){var c=this.layer.objectIdField;this.isSupportQueryToServer()?this._queryToServer(a,c,b):this.isSupportQueryOnClient()&&this._queryOnClient(a,c,b)}},_queryOnClient:function(a,b,c){var d={};d.features="esri.layers.StreamLayer"===this.layer.declaredClass?this.layer.getLatestObservations():this.layer.graphics;c&&0<c.length&&(d.features=l.filter(d.features,
function(a){return-1<c.indexOf(a.attributes[this.layer.objectIdField])},this));var f=this.layer.fields,g=this.configedInfo.layer.fields;d.fields=g?l.filter(g,e.hitch(this,function(a){n.isDefined(a.show)||(a.show=!0);if(a.name===b&&("esriFieldTypeOID"===a.type||"esriFieldTypeInteger"===a.type))a._pk=!0;for(var c=0,d=f.length;c<d;c++)f[c].name===a.name&&!a.type&&(a.type=f[c].type);return a.show||a._pk})):l.filter(f,e.hitch(this,function(a){n.isDefined(a.show)||(a.show=!0);if(a.name===b&&("esriFieldTypeOID"===
a.type||"esriFieldTypeInteger"===a.type))a._pk=!0;return a.show||a._pk}));for(var g=[],k=d.features.length,h=0;h<k;h++)d&&(d.features&&d.features[h]&&d.features[h].geometry)&&g.push(d.features[h].geometry);a&&v.defaults.geometryService&&0<g.length?(k=new y,k.geometries1=g,k.geometries2=[a],k.relation=y.SPATIAL_REL_INTERSECTION,(this._currentDef=v.defaults.geometryService.relation(k,e.hitch(this,function(a){return a}))).then(e.hitch(this,function(b,c){for(var d=c.length,e=[],f=0;f<d;f++)e.push(b.features[c[f].geometry1Index]);
b.features=e;this.queryExecute(b.fields,b.features.length,!1,b,a)},d),e.hitch(this,function(a){a&&"Request canceled"!==a.message&&console.error(a);this.changeToolbarStatus();this.loading.hide()}))):this.queryExecute(d.fields,d.features.length,!1,d,a)},_queryToServer:function(a,b,c){this._getFeatureCount(a,c).then(e.hitch(this,function(d){if(this.domNode)if(c)this._queryFeatureLayer(a,b,d,!1,c);else{var f=this.layer,g=n.isDefined(f.maxRecordCount)?f.maxRecordCount:1E3;this._batchCount=Math.min(g,this._defaultBatchCount);
if(d<=g||!this.layer.objectIdField)this._queryFeatureLayer(a,b,d,!1);else{var k=this._getOutFieldsFromLayerInfos(b),h={fields:this.layer.fields};this.layer._recordCounts=d;f.advancedQueryCapabilities&&f.advancedQueryCapabilities.supportsPagination?this.queryExecute(k,d,!0,h,a):this._getFeatureIds(b,a).then(e.hitch(this,function(b){this.domNode&&(this.layer._objectIds=b,this.queryExecute(k,d,!0,h,a))}),e.hitch(this,function(a){console.error(a);this.changeToolbarStatus()}))}}}),e.hitch(this,function(a){console.error(a);
this.changeToolbarStatus()}))},_getFeatureCount:function(a,b){var c=new r,d=new q;d.returnGeometry=!1;d.where=this._getLayerFilterExpression();b&&(d.where+=" AND "+this.layer.objectIdField+" IN ("+b.join()+")");a&&(d.geometry=a);(this._currentDef=this.layer.queryCount(d)).then(e.hitch(this,function(a){c.resolve(a)}),e.hitch(this,function(a){a&&"Request canceled"!==a.message&&(console.error(a),console.log("Could not get feature count."));this.loading.hide();c.reject(a)}));return c},_queryFeatureLayer:function(a,
b,c,d,f){var g=new A(this.configedInfo.layer.url),k=new q;k.where=this._getLayerFilterExpression();f&&b&&(k.where+=" AND "+b+" IN ("+f.join()+")");var h=this._getOutFieldsFromLayerInfos(b);0<h.length?(f=l.map(h,function(a){return a.name}),k.outFields=f):k.outFields=["*"];a&&(k.geometry=a,k.spatialRelationship=q.SPATIAL_REL_INTERSECTS);k.outSpatialReference=e.clone(this.map.spatialReference);k.returnGeometry="esriGeometryPoint"===this.layer.geometryType;b&&(k.orderByFields=[b+" ASC"]);(this._currentDef=
g.execute(k,e.hitch(this,function(a){return a}))).then(e.hitch(this,function(b){this.queryExecute(h,c,d,b,a)}),e.hitch(this,function(a){a&&"Request canceled"!==a.message&&console.error(a);this.changeToolbarStatus();this.loading.hide()}))},_getFeatureIds:function(a,b){var c=new r,d=new q;d.returnGeometry=!1;d.returnIdsOnly=!0;d.where=this._getLayerFilterExpression();if(this.layer._orderByFields||a)d.orderByFields=this.layer._orderByFields||[a+" ASC"];b&&(d.geometry=b);(this._currentDef=this.layer.queryIds(d)).then(e.hitch(this,
function(a){c.resolve(a)}),e.hitch(this,function(a){a&&"Request canceled"!==a.message&&(console.error(a),console.log("Could not get feature Ids"));c.resolve([])}));return c},queryExecute:function(a,b,c,d,f){var g=[],g=null,k={};if(this.domNode){d.fields=this._processExecuteFields(this.layer.fields,a);c?g=w.generateCacheStore(this.layer,b,this._batchCount,this._getLayerFilterExpression(),f):(g=l.map(d.features,e.hitch(this,function(a){var b=e.clone(a.attributes);return e.mixin(b,{geometry:a.geometry})})),
g=w.generateMemoryStore(g,this.layer.objectIdField));a=this.layer.typeIdField;var k=this.layer.types,m=e.getObject("advancedQueryCapabilities.supportsOrderBy",!1,this.layer),ca=e.getObject("advancedQueryCapabilities.supportsPagination",!1,this.layer),n=e.getObject("advancedQueryCapabilities.supportsStatistics",!1,this.layer),k=w.generateColumnsFromFields(this.layerInfo.getPopupInfo(),d.fields,a,k,m&&ca||!c,n);c=20+100*d.fields.length<h.getMarginBox(this.domNode).w;this.createTable(k,g,b,c);this._currentExtent=
f;b=this.layer.getSelectedFeatures();this.selectionRows&&0<this.selectionRows.length?this._updateSelectRowsByIds(this.selectionRows):b&&0<b.length?this._updateSelectRowsByFeatures(b):this.grid.clearSelection();this.changeToolbarStatus();this.emit("data-loaded")}},createTable:function(a,b,c,d){if(this.grid)this.grid.set("store",b),this.grid.set("columns",a),this.grid.refresh();else{var f={};f.columns=a;f.store=b;f.keepScrollPosition=!0;f.pagingDelay=1E3;f.allowTextSelection=!0;f.deselectOnRefresh=
!1;this.layer.objectIdField||(f.minRowsPerPage=this.layer.maxRecordCount||1E3,f.maxRowsPerPage=this.layer.maxRecordCount||1E3,f.selectionMode="none");this.grid=new (x([F,G,H,I,J]))(f,h.create("div"));h.place(this.grid.domNode,this.domNode);this.grid.startup();this.tipNode&&h.destroy(this.tipNode);this.own(m(this.ownerDocument,"keydown",e.hitch(this,function(a){this.grid&&(this.grid.allowTextSelection&&a.shiftKey)&&this.grid._setAllowTextSelection(!1)})));this.own(m(this.ownerDocument,"keyup",e.hitch(this,
function(){this.grid&&!this.grid.allowTextSelection&&this.grid._setAllowTextSelection(!0)})));this.layer.objectIdField&&(this.own(m(this.grid,".dgrid-header .dgrid-cell:click",e.hitch(this,this._onHeaderClick))),this.own(m(this.grid,"dgrid-columnstatechange",e.hitch(this,this._onColumnStateChange))),this.own(m(this.grid,".selection-handle-column:click",e.hitch(this,this._onSelectionHandleClick))),this.own(m(this.grid,".dgrid-row:dblclick",e.hitch(this,this._onDblclickRow))),this.own(m(this.grid,"dgrid-sort",
e.hitch(this,function(a){this.emit("sort",a)}))),a=this.map.getLayer(this.layer.id),this.syncSelection&&a&&this.own(m(a,"click",e.hitch(this,this._onFeaturelayerClick))))}this.layer.objectIdField&&this.grid.set("sort",this.layer.objectIdField,!1);this.getParent()&&(a=B(".dgrid-scroller",this.grid.domNode)[0],f=B(".dgrid-header",this.grid.domNode)[0],b=h.getComputedStyle(a),f=h.getMarginBox(f),b=parseInt(b.marginTop,10),isFinite(b)&&(f&&b<f.h)&&h.setStyle(a,"marginTop",f.h+"px"));d?h.addClass(this.domNode,
"auto-width"):h.removeClass(this.domNode,"auto-width");this.footer?h.empty(this.footer):this.footer=h.create("div",{"class":"jimu-widget-attributetable-feature-table-footer"},this.domNode);c=h.create("div",{"class":"dgrid-status self-footer",innerHTML:c+"\x26nbsp;"+(this.layerInfo.isTable?this.nls.records:this.nls.features)+"\x26nbsp;"},this.footer);this.selectedRowsLabel=h.create("div",{"class":"dgrid-status self-footer",innerHTML:"0\x26nbsp;"+this.nls.selected+"\x26nbsp;",style:{display:this.layer.objectIdField?
"":"none"}},c,"after");c=h.getStyle(this.domNode,"height");this.changeHeight(c);this._requestStatus="fulfilled";this.tableCreated=!0;h.place(this.loading.domNode,this.grid.domNode);this.loading.hide()},getSelectedRowsData:function(){if(!this.grid)return null;var a=this.layer.objectIdField,b=this.grid.store,c=b._entityData||b.data,b=this.getSelectedRows();return l.map(b,e.hitch(this,function(b){for(var e=0,g=c.length;e<g;e++)if(c[e]&&c[e][a]===b)return c[e];return{}}))||[]},setSelectedNumber:function(){if(this.selectedRowsLabel&&
this.grid){var a=this.getSelectedRows(),b=0;if(this.grid.store instanceof s){var c=l.map(this.grid.store.data,function(a){return a[this.layer.objectIdField]},this);l.forEach(a,function(a){-1<c.indexOf(a)&&b++})}else b=a.length;this.selectedRowsLabel.innerHTML="\x26nbsp;\x26nbsp;"+b+" "+this.nls.selected+"\x26nbsp;\x26nbsp;"}},_setSelection:function(a){this._selectionResults=a=a||[];this.selectionManager.setSelection(this.layer,a)},_zoomToExtentByFeatures:function(a){return this.getExtent(a).then(e.hitch(this,
function(a){if(a&&this.domNode){var c=null;"point"===a.type?(c=15,c=-1<this.map.getMaxZoom()?this.map.getMaxZoom():0.1,c=this.map.centerAndZoom(a,c)):c=this.map.setExtent(a.expand(1.1));return c.then(function(){return a})}}))},_showMapInfoWindowByFeatures:function(a,b){if(b&&0!==b.length&&this.domNode){var c=this.map.infoWindow,d=this.layerInfo.isPopupEnabled()&&this.layerInfo.getInfoTemplate();if(c&&c.setFeatures&&1===b.length&&d){l.forEach(b,e.hitch(this,function(a){a._layer=this.layerInfo.layerObject;
a.setInfoTemplate(d)}));c.setFeatures(b);var f=null,f="point"===a.type?b[0].geometry:a.getCenter();c.show(f,{closetFirst:!0});this._dblClickResult=b[0];this.syncWithMapInfowindow(this._dblClickResult)}}},selectFeatures:function(a,b){b&&0<b.length?("rowclick"===a||"selectall"===a?this._setSelection(b):("zoom"===a||"row-dblclick"===a)&&this._zoomToExtentByFeatures(b).then(e.hitch(this,function(c){"row-dblclick"===a&&this.domNode&&this._showMapInfoWindowByFeatures(c,b)}),e.hitch(this,function(a){a&&
"Request canceled"!==a.message&&console.error(a)})),this.setSelectedNumber()):this._popupMessage(this.nls.dataNotAvailable)},syncWithMapInfowindow:function(a){var b=this.map.infoWindow,c=e.isArray(a)?a:[a];m.once(b,"hide",e.hitch(this,function(){d&&d.remove&&(d.remove(),d=null)}));var d=X.after(b,"show",e.hitch(this,function(){var a=b.getSelectedFeature(),a=a&&c[0]===a,e=b.features.indexOf(c[0]);!a&&-1<e?b.select(e):this.domNode&&!a&&(d&&d.remove)&&(d.remove(),d=null)}))},getGraphicsFromLocalFeatureLayer:function(a){for(var b=
[],c,d,e=a.length,g=this.layer.graphics.length,k=this.layer.objectIdField,h=0;h<e;h++)for(var l=0;l<g;l++)if(c=this.layer.graphics[l].attributes[k]+"",d=a[h]+"",c===d){b.push(this.layer.graphics[l]);break}return b},getExtent:function(a){var b=new r,c,d,f=a.length;if(1===f&&a[0].geometry&&"point"===a[0].geometry.type)c=a[0].geometry;else{if(1===f&&!a[0].geometry)return b.reject(Error("AttributeTable.getExtent:: extent was not projected.")),b;for(var g=0;g<f;g++)a[g].geometry?"point"===a[g].geometry.type?
(d||(d=new V(a[g].geometry.spatialReference)),d.addPoint(a[g].geometry),g===f-1&&(c=d.getExtent())):c=c?c.union(a[g].geometry.getExtent()):a[g].geometry.getExtent():console.error("unable to get geometry of the reocord: ",a[g])}if(!c||!c.spatialReference)return b.reject(Error("AttributeTable.getExtent:: extent was not projected.")),b;a=this.map.spatialReference;c.spatialReference.equals(a)?b.resolve(c):(d=new U,d.geometries=[c],d.outSR=a,v.defaults.geometryService.project(d,e.hitch(this,function(a){this.domNode&&
(a&&a.length?b.resolve(a[0]):b.reject(Error("AttributeTable.getExtent:: extent was not projected.")))}),e.hitch(this,function(a){a||(a=Error("AttributeTable.getExtent:: extent was not projected."));b.reject(a)})));return b},_onFeaturelayerClick:function(a,b){if(this.actived){var c=e.getObject("graphic",!1,a),d=e.getObject("graphic.attributes",!1,a);d&&(c&&c._layer===this.layer)&&((c=this.map.infoWindow.getSelectedFeature())&&(c._layer===this.layer&&!b)&&this.map.infoWindow.hide(),d=d[this.layer.objectIdField],
this.showSelected&&this.toggleSelectedRecords(),this._getIndexOfIdInGrid(d).then(e.hitch(this,function(b){-1!==b&&(this.grid.scrollTo({x:0,y:this.grid.rowHeight*b}),this.map.infoWindow.features&&(b=this.map.infoWindow.features.indexOf(a.graphic),this.map.infoWindow.select(b)),m.once(this.map.infoWindow,"selection-change",e.hitch(this,function(){var b=this.map.infoWindow.getSelectedFeature(),c=e.getObject("_layer",!1,b);b===a.graphic||c!==this.layer||this._onFeaturelayerClick({graphic:b},!0)})),this.syncWithMapInfowindow(a.graphic))})))}},
_getIndexOfIdInGrid:function(a){var b=new r,c=-1,d=e.getObject("store.objectIds",!1,this.grid),c=null,c=this.grid.get("sort")[0];if(this._relatedQuery)return b.resolve(-1),b;if(this.grid.store instanceof s)a=this.grid.store.get(a),d=this.grid.store.data,a?c&&c.attribute&&n.isDefined(c.descending)?(d=e.clone(d),c=function(a,b){return function(c,d){return c[a]===d[a]?0:c[a]<d[a]?b?1:-1:b?-1:1}}(c.attribute,c.descending),d.sort(c),d=l.map(d,function(a){return a[this.layer.objectIdField]},this),c=d.indexOf(a[this.layer.objectIdField])):
c=d.indexOf(a):c=-1,b.resolve(c);else if(d&&0<d.length)c=d.indexOf(a),b.resolve(c);else{d=new q;d.returnGeometry=!1;d.where=this._getLayerFilterExpression()+" AND "+this.layer.objectIdField+" \x3c "+a;if(c&&(c.attribute!==this.layer.objectIdField||c.descending))return b.resolve(-1),b;this.matchingMap&&(!this._relatedQuery&&this._currentExtent)&&(d.geometry=this._currentExtent);(this._currentDef=this.layer.queryCount(d)).then(e.hitch(this,function(a){b.resolve(a)}),e.hitch(this,function(a){b.reject(a)}))}return b},
_zoomToSelected:function(){if(this.configedInfo&&this.tableCreated){var a=this.getSelectedRows();this._goToFeatures(a,"zoom")}},_goToFeatures:function(a,b){if(0!==a.length){var c=this.getGraphicsFromLocalFeatureLayer(a);this.isSupportQueryToServer()&&a.length!==c.length?this._queryFeaturesByIds(a,b):this.selectFeatures(b,c)}},_onDblclickRow:function(a){this.layerInfo&&this.layerInfo.isShowInMap()&&(a=[this.grid.row(a).id],this._goToFeatures(a,"row-dblclick"))},_queryFeaturesByIds:function(a,b){var c=
new q;c.objectIds=a;c.returnGeometry=!0;c.outSpatialReference=e.clone(this.map.spatialReference);c.outFields=["*"];var d=this.layer,f="esri.layers.CSVLayer"===d.declaredClass;d.url&&!f?(new A(d.url)).execute(c,e.hitch(this,function(a){this.selectFeatures(b,a.features)}),e.hitch(this,this._errorSelectFeatures)):d.selectFeatures(c,z.SELECTION_NEW,e.hitch(this,this.selectFeatures,b),e.hitch(this,this._errorSelectFeatures))},_onHeaderClick:function(a){var b=this.grid.cell(a);this._showColumnMenu(b.column,
b,a.target,{x:a.pageX,y:a.pageY})},_showColumnMenu:function(a,b,c,d){var f=e.getObject("_cache",!1,a);if(f){var g=new K({});h.addClass(g.domNode,"jimu-widget-attributetable-feature-menu");var k=this;if(f.sortable){var n=["iconSortAscending","iconSortDescending"];l.forEach([this.nls.sortAsc,this.nls.sortDes],function(b,c){var d=new p({label:b,iconClass:n[c],baseClass:"menuItemClass",onClick:function(){0===c?k.grid.set("sort",a.field,!1):1===c&&k.grid.set("sort",a.field,!0)}});g.addChild(d)})}f.statistics&&
(f=new p({label:this.nls.statistics,iconClass:"iconTableStatistics",baseClass:"menuItemClass",onClick:e.hitch(this,function(){var b={layer:this.layer,filterExpression:this._getLayerFilterExpression(),fieldNames:[a.field]};this.matchingMap&&(b.geometry=this._currentExtent);if(this.showSelected){var c=this._getSelectedIds();b.filterExpression+=" AND "+this.layer.objectIdField+" IN ("+c.join()+")"}else this.queryByStoreObjectIds&&0<this.queryByStoreObjectIds.length&&(b.filterExpression+=" AND "+this.layer.objectIdField+
" IN ("+this.queryByStoreObjectIds.join()+")");this.fieldStatistics=new Z;this.fieldStatistics.showContentAsPopup(b)})}),g.addChild(f));f=g.getChildren();g.startup();g._openMyself({target:c,delegatedTarget:b,iframe:null,coords:d});this.own(m(g,"Close",e.hitch(this,function(){var a=this.get("columnMenu");a&&(a.destroyRecursive(),this.set("columnMenu",null))})));this.set("columnMenu",g);1>f.length&&m.emit(g,"Close")}},_onColumnStateChange:function(a){if(a&&a.grid&&a.grid.columns){var b=0,c;for(c in a.grid.columns)a.grid.columns[c].hidden||
b++;20+100*b-1<h.getMarginBox(this.domNode).w?h.addClass(this.domNode,"auto-width"):h.removeClass(this.domNode,"auto-width")}},_onSelectionHandleClick:function(){var a=this._getSelectedIds();this.selectionRows=a;this._closePopup();this.layerInfo.isTable||(0<a.length?this._goToFeatures(a,"rowclick"):this._setSelection([]));this.setSelectedNumber();this.emit("row-click",{table:this,selectedIds:a})},_onExtentChange:function(a){var b=e.getObject("delta.x",!1,a),c=e.getObject("delta.y",!1,a);a=this._clickMap&&
!a.levelChange?isFinite(b)&&isFinite(c)&&(0<Math.abs(b)||0<Math.abs(c)):!0;this._clickMap=!1;a&&this.matchingMap&&(this.actived&&this.layerInfo&&!this.layerInfo.isTable)&&this.startQuery(this.queryByStoreObjectIds)},_getLayerFilterExpression:function(){var a=this.layerInfo.getFilter();return a?a:"1\x3d1"},_getOutFieldsFromLayerInfos:function(a){var b=this.configedInfo.layer.fields,c=[];b&&l.forEach(b,e.hitch(this,function(b){n.isDefined(b.show)||(b.show=!0);if(b.name===a&&("esriFieldTypeOID"===b.type||
"esriFieldTypeInteger"===b.type||!b.type))b._pk=!0;(b.show||b._pk)&&c.push(b)}));return c},_processExecuteFields:function(a,b){if(a&&0<a.length){var c=[];if(!b.length)return a;for(var d=0,f=b.length;d<f;d++)for(var g=0;g<a.length;g++)if(b[d].name===a[g].name&&(b[d].type===a[g].type||!b[d].type))a[g]=e.mixin(a[g],b[d]),c.push(a[g]);return c}return b},_getSelectedIds:function(){var a=[],b=this.grid.selection,c;for(c in b)b[c]&&(isFinite(c)?a.push(parseInt(c,10)):a.push(c));return a},_errorSelectFeatures:function(a){console.error(a)},
_popupMessage:function(a){var b=new t({message:a,buttons:[{label:this.nls.ok,onClick:e.hitch(this,function(){b.close()})}]});this.loading.hide()}})});