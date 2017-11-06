// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"esri/tasks/datareviewer/DashboardTask":function(){define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/Deferred dojo/has ./_DRSBaseTask ./DashboardResult ./ReviewerFilters ../../kernel ../../request".split(" "),function(l,f,h,m,q,n,d,a,c,e){return l(n,{declaredClass:"esri.tasks.datareviewer.DashboardTask",constructor:function(b){this.onGetDashboardResultsComplete=h.hitch(this,this.onGetDashboardResultsComplete);this.onGetDashboardFieldNamesComplete=h.hitch(this,this.onGetDashboardFieldNamesComplete)},
getDashboardResults:function(b,s){var c=this._successHandler,k=this._errorHandler,g=this._appendQueryParams,p=new m,t,r;null===s||void 0===s?(r=this._url+"/Dashboard/reviewerResultsBy/"+b,t={f:"json"}):(r=this._url+"/Dashboard/reviewerResultsBy/"+b+"/filter",t={f:"json",filtersArray:s.toJSON()});r=g(r);e({callbackParamName:"callback",url:r,content:t}).then(h.hitch(this,function(b,s){if(void 0!==b.error){var e=Error();e.message=b.error.message;e.code=b.error.code;k(e,p)}else try{if(void 0===b.dashboardResults)k(null,
p);else{var g=new d;f.forEach(b.dashboardResults,function(b,a){g.fieldValues.push(b.fieldValue);g.counts.push(b.count)});g.fieldName=b.fieldName;e=new a;e.createFromJsonObject(b);g.filters=e;c({dashboardResult:g},"onGetDashboardResultsComplete",p)}}catch(r){k(r,p)}}),function(b,a){k(b,p)});return p},getDashboardFieldNames:function(){var b=this._successHandler,a=this._errorHandler,c=this._appendQueryParams,k=this._url+"/Dashboard",k=c(k),g=new m;e({callbackParamName:"callback",url:k,content:{f:"json"}}).then(h.hitch(this,
function(e,c){if(void 0!==e.error){var k=Error();k.message=e.error.message;k.code=e.error.code;a(k,g)}else try{var d=[];f.forEach(e.reviewerResultsBy,function(b,a){d.push(b.name)});b({fieldNames:d},"onGetDashboardFieldNamesComplete",g)}catch(h){a(h,g)}}),function(b,e){a(b,g)});return g},onGetDashboardResultsComplete:function(b){},onGetDashboardFieldNamesComplete:function(b){}})})},"esri/tasks/datareviewer/_DRSBaseTask":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Deferred dojo/has ../../request ../../urlUtils ../../kernel ../Task ./ReviewerSession".split(" "),
function(l,f,h,m,q,n,d,a,c,e){return l(c,{declaredClass:"esri.tasks.datareviewer.DRSBaseTask",_url:null,_queryParams:null,_reviewerMapServerUrl:null,constructor:function(b){"/"==b[b.length-1]&&(b=b.slice(0,-1));b=d.urlToObject(b);this._url=b.path;this._queryParams=b.query;b=this._url.toLowerCase().lastIndexOf("/exts/");0<b&&(this._reviewerMapServerUrl=this._url.substring(0,b));this._successHandler=f.hitch(this,this._successHandler);this._errorHandler=f.hitch(this,this._errorHandler);this._appendQueryParams=
f.hitch(this,this._appendQueryParams);this.onError=f.hitch(this,this.onError)},_appendQueryParams:function(b){if(this._queryParams)for(var a in this._queryParams)b=d.urlToObject(b).query?b+("\x26"+a+"\x3d"+this._queryParams[a]):b+("?"+a+"\x3d"+this._queryParams[a]);return b},_successHandler:function(b,a,e){a&&this[a].apply(this,[b]);e&&e.resolve(b)},_errorHandler:function(b,a){null===b&&(b=Error("Unexpected response received from server"),b.code=500);this.onError(b);a&&a.reject(b)},getReviewerMapServerUrl:function(){var b=
null;if(b=this._reviewerMapServerUrl){if(this._queryParams)for(var a in this._queryParams)b=d.urlToObject(b).query?b+("\x26"+a+"\x3d"+this._queryParams[a]):b+("?"+a+"\x3d"+this._queryParams[a]);return b}return null},getLifecycleStatusStrings:function(){var b=this._successHandler,a=this._errorHandler,e=this._appendQueryParams,k=this._url+"/Utilities/getLifecycleStatusStrings",k=e(k),g=new m;n({callbackParamName:"callback",url:k,content:{f:"json"}}).then(f.hitch(this,function(e,k){if(void 0!==e.error){var c=
Error();c.message=e.error.message;c.code=e.error.code;a(c,g)}else try{if(c=e.lifecycleStatusString,void 0===c)a(null,g);else{var f=[];h.forEach(c,function(b,a){f[b.descriptionCode]=b.descriptionString});b({lifecycleStatusStrings:f},"onGetLifecycleStatusStringsComplete",g)}}catch(d){a(d,g)}}),function(b,e){a(b,g)});return g},createReviewerSession:function(b,a){var c=this._successHandler,k=this._errorHandler,g=this._appendQueryParams,p=this._url+"/Utilities/createReviewerSession",p=g(p),d=new m;n({callbackParamName:"callback",
url:p,content:{sessionName:b,sessionProperties:a.toJsonSessionOptions(),f:"json"}}).then(f.hitch(this,function(b,a){if(void 0!==b.error){var g=Error();g.message=b.error.message;g.code=b.error.code;k(g,d)}else try{if(void 0===b.sessionAttributes)k(null,d);else{var g=b.sessionAttributes,f=new e(g.sessionId,g.sessionName,g.userName,g.versionName);c({reviewerSession:f},"onCreateReviewerSessionComplete",d)}}catch(p){k(p,d)}}),function(b,a){k(b,d)});return d},getReviewerSessions:function(){var b=this._successHandler,
a=this._errorHandler,c=this._appendQueryParams,k=this._url+"/Utilities/getReviewerSessions",k=c(k),g=new m;n({callbackParamName:"callback",url:k,content:{f:"json"}}).then(f.hitch(this,function(c,k){if(void 0!==c.error){var d=Error();d.message=c.error.message;d.code=c.error.code;a(d,g)}else try{if(d=c.sessionAttributes,void 0===d)a(null,g);else{var f=[];h.forEach(d,function(b,a){f[a]=new e(b.sessionId,b.sessionName,b.userName,b.versionName)});b({reviewerSessions:f},"onGetReviewerSessionsComplete",
g)}}catch(n){a(n,g)}}),function(b,e){a(b,g)});return g},getCustomFieldNames:function(){var b=this._successHandler,a=this._errorHandler,e="BATCHJOBCHECKGROUP CHECKTITLE FEATUREOBJECTCLASS LIFECYCLEPHASE LIFECYCLESTATUS SESSIONID SEVERITY SUBTYPE".split(" "),c=this._appendQueryParams,g=this._url+"/Dashboard",g=c(g),d=new m;n({callbackParamName:"callback",url:g,content:{f:"json"}}).then(f.hitch(this,function(c,g){if(void 0!==c.error){var k=Error();k.message=c.error.message;k.code=c.error.code;a(k,d)}else try{var f=
[];void 0===c.reviewerResultsBy&&a(null,d);h.forEach(c.reviewerResultsBy,function(b,a){-1===e.indexOf(b.name)&&f.push(b.name)});b({customFieldNames:f},"onGetCustomFieldNamesComplete",d)}catch(n){a(n,d)}}),function(b,e){a(b,d)});return d},onGetLifecycleStatusStringsComplete:function(b){},onGetReviewerSessionsComplete:function(b){},onCreateReviewerSessionComplete:function(b){},onGetCustomFieldNamesComplete:function(b){},onError:function(b){}})})},"esri/tasks/datareviewer/ReviewerSession":function(){define(["dojo/_base/declare",
"dojo/has","dojo/_base/lang","../../kernel"],function(l,f,h,m){return l(null,{declaredClass:"esri.tasks.datareviewer.ReviewerSession",sessionId:NaN,sessionName:"",userName:"",versionName:"",constructor:function(f,h,d,a){this.sessionId=f;this.sessionName=h;this.userName=d;void 0!==a&&(this.versionName=a)},toString:function(){return isNaN(this.sessionId)?null:"Session "+this.sessionId+" : "+this.sessionName}})})},"esri/tasks/datareviewer/DashboardResult":function(){define(["dojo/_base/declare","dojo/has",
"dojo/_base/lang","../../kernel"],function(l,f,h,m){return l(null,{declaredClass:"esri.tasks.datareviewer.DashboardResult",fieldName:null,fieldValues:null,counts:null,filters:null,constructor:function(){this.fieldName="";this.fieldValues=[];this.counts=[]},getCount:function(f){if(0<this.fieldValues.length&&0<this.counts.length&&this.fieldValues.length===this.counts.length)for(var h=0;h<this.fieldValues.length;h++)if(this.fieldValues[h]===f)return this.counts[h];return 0}})})},"esri/tasks/datareviewer/ReviewerFilters":function(){define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/json ../../geometry/Polygon dojo/has ../../kernel".split(" "),
function(l,f,h,m,q,n,d){return l(null,{declaredClass:"esri.tasks.datareviewer.ReviewerFilters",constructor:function(){this.singleAttributeFilters=[];this.listAttributeFilters=[];this.rangeAttributeFilters=[];this.spatialFilters=[]},addAttributeFilter:function(a,c){var e={};e.fieldName=a;h.isArray(c)?1<c.length?(e.fieldValue=c,this.listAttributeFilters.push(e)):(e.fieldValue=c[0],this.singleAttributeFilters.push(e)):(e.fieldValue=c,this.singleAttributeFilters.push(e))},addRangeFilter:function(a,c,
e){var b={},d={};d.minFieldValue=c;d.maxFieldValue=e;b.fieldName=a;b.fieldValue=d;this.rangeAttributeFilters.push(b)},addSpatialFilter:function(a){var c={};a&&("rings"in a&&"spatialReference"in a)&&(c.rings=a.rings,c.spatialReference=a.spatialReference,this.spatialFilters.push(c))},toJSON:function(){var a=[];null!==this.singleAttributeFilters&&0<this.singleAttributeFilters.length&&a.push({singleAttributeFilter:this.singleAttributeFilters});null!==this.listAttributeFilters&&0<this.listAttributeFilters.length&&
a.push({listAttributeFilter:this.listAttributeFilters});null!==this.rangeAttributeFilters&&0<this.rangeAttributeFilters.length&&a.push({rangeAttributeFilter:this.rangeAttributeFilters});null!==this.spatialFilters&&0<this.spatialFilters.length&&a.push({spatialFilter:this.spatialFilters});return 0===a.length?"":m.stringify({filtersArray:a})},getCount:function(){var a=0;null!==this.singleAttributeFilters&&0<this.singleAttributeFilters.length&&(a+=this.singleAttributeFilters.length);null!==this.listAttributeFilters&&
0<this.listAttributeFilters.length&&(a+=this.listAttributeFilters.length);null!==this.rangeAttributeFilters&&0<this.rangeAttributeFilters.length&&(a+=this.rangeAttributeFilters.length);null!==this.spatialFilters&&0<this.spatialFilters.length&&(a+=this.spatialFilters.length);return a},addReviewerFilters:function(a){if(!a)return 0;var c=0;f.forEach(a.singleAttributeFilters,function(a){this.addAttributeFilter(a.fieldName,a.fieldValue);c++});f.forEach(a.listAttributeFilters,function(a){this.addAttributeFilter(a.fieldName,
a.fieldValue);c++});f.forEach(a.rangeAttributeFilters,function(a){this.addRangeFilter(a.fieldName,a.minValue,a.maxValue);c++});f.forEach(a.spatialFilters,function(a){this.addSpatialFilter(a);c++});return c},createFromJsonObject:function(a){a&&(a.filters&&h.isArray(a.filters))&&f.forEach(a.filters,h.hitch(this,function(a){"spatialFilter"in a?f.forEach(a.spatialFilter,h.hitch(this,function(a){this.addSpatialFilter(new q(a))})):"singleAttributeFilter"in a?f.forEach(a.singleAttributeFilter,h.hitch(this,
function(a){this.addAttributeFilter(a.fieldName,a.fieldValue)})):"listAttributeFilter"in a?f.forEach(a.listAttributeFilter,h.hitch(this,function(a){this.addAttributeFilter(a.fieldName,a.fieldValue)})):"rangeAttributeFilter"in a&&f.forEach(a.rangeAttributeFilter,h.hitch(this,function(a){this.addRangeFilter(a.fieldName,a.minValue,a.maxValue)}))}))}})})},"dijit/form/RadioButton":function(){define(["dojo/_base/declare","./CheckBox","./_RadioButtonMixin"],function(l,f,h){return l("dijit.form.RadioButton",
[f,h],{baseClass:"dijitRadio"})})},"dijit/form/_RadioButtonMixin":function(){define("dojo/_base/array dojo/_base/declare dojo/dom-attr dojo/_base/lang dojo/query!css2 ../registry".split(" "),function(l,f,h,m,q,n){return f("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){var d=[];q("input[type\x3dradio]",this.focusNode.form||this.ownerDocument).forEach(m.hitch(this,function(a){a.name==this.name&&a.form==this.focusNode.form&&(a=n.getEnclosingWidget(a))&&d.push(a)}));return d},
_setCheckedAttr:function(d){this.inherited(arguments);this._created&&d&&l.forEach(this._getRelatedWidgets(),m.hitch(this,function(a){a!=this&&a.checked&&a.set("checked",!1)}))},_getSubmitValue:function(d){return null==d?"on":d},_onClick:function(d){if(this.checked||this.disabled)return d.stopPropagation(),d.preventDefault(),!1;if(this.readOnly)return d.stopPropagation(),d.preventDefault(),l.forEach(this._getRelatedWidgets(),m.hitch(this,function(a){h.set(this.focusNode||this.domNode,"checked",a.checked)})),
!1;var a=!1,c;l.some(this._getRelatedWidgets(),function(a){return a.checked?(c=a,!0):!1});this.checked=!0;c&&(c.checked=!1);if(!1===this.onClick(d)||d.defaultPrevented)a=!0;this.checked=!1;c&&(c.checked=!0);a?d.preventDefault():this.set("checked",!0);return!a}})})},"widgets/ReviewerDashboard/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/ReviewerDashboard/setting/Setting.html":'\x3cdiv style\x3d"width:100%;"\x3e\r\n  \x3ctable  data-dojo-attach-point\x3d"geoFilterSettingsTable" class\x3d"setting-table input-table jimu-leading-padding05 jimu-align-leading" cellspacing\x3d"0"\x3e\r\n    \x3ctbody\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e${nls.drsSOEURL}\x3c/td\x3e\r\n        \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n\r\n        \x3ctable cellpadding\x3d"0" cellspacing\x3d"0" style\x3d"width:100%;border-collapse:collapse;"\x3e\r\n            \x3ctbody\x3e\r\n              \x3ctr\x3e\r\n                \x3ctd style\x3d"width:auto;"\x3e\r\n                  \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" required\x3d"true" \r\n                  data-dojo-attach-point\x3d"drsSOEURL" style\x3d"width:100%;"/\x3e\r\n                \x3c/td\x3e\r\n                \x3ctd style\x3d"width:80px;"\x3e\r\n                 \x3cdiv data-dojo-attach-event\x3d"onclick:_onBtnSetSourceClicked" class\x3d"jimu-btn  jimu-float-trailing" style\x3d"padding:0px 15px !important;"\x3e${nls.setSource}\x3c/div\x3e       \r\n                \x3c/td\x3e\r\n              \x3c/tr\x3e\r\n            \x3c/tbody\x3e\r\n          \x3c/table\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n       \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e${nls.chartSection}\x3c/td\x3e\r\n        \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n          \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" required\x3d"true" \r\n          data-dojo-attach-point\x3d"chartDataSections" data-dojo-props\x3d\'style:{width:"50px"},constraints:{min:1,max:10,places:0},\r\n          invalidMessage:"Please enter a numeric value.",\r\n          rangeMessage:"Please enter values between 1 and 10."\'/\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n      \x3ctd class\x3d"first"\x3e${nls.selectByGeography}\x3c/td\x3e\r\n      \x3ctd\x3e\x3cinput style\x3d"margin-left: 8px;" data-dojo-attach-point\x3d"includeGeoFilter" name\x3d"includeGeoFilter" data-dojo-type\x3d"dijit/form/CheckBox" /\x3e\x3c/td\x3e\r\n\r\n      \x3c/tr\x3e\r\n       \x3cdiv data-dojo-attach-point\x3d"geoFilterSettings" \x3e\r\n      \x3ctr class\x3d\'dynamicRow\'\x3e\r\n        \x3ctd class\x3d"first"\x3e${nls.selectMapUrl}\x3c/td\x3e\r\n        \x3ctd class\x3d"second"  colspan\x3d"2"\x3e\r\n          \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n          data-dojo-attach-point\x3d"selectMapUrl" style\x3d"width:100%;" /\x3e\r\n        \x3c/td\x3e\r\n       \r\n      \x3c/tr\x3e\r\n      \x3ctr class\x3d\'dynamicRow\'\x3e\r\n        \x3ctd class\x3d"first"\x3e${nls.selectUrl}\x3c/td\x3e\r\n        \x3ctd class\x3d"second"  colspan\x3d"2"\x3e\r\n          \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" required\x3d"true"\r\n          data-dojo-attach-point\x3d"selectUrl" style\x3d"width:100%;" /\x3e\r\n        \x3c/td\x3e\r\n      \r\n      \x3c/tr\x3e\r\n      \r\n      \x3ctr class\x3d\'dynamicRow\'\x3e\r\n        \x3ctd class\x3d"first"\x3e${nls.geometryServiceURL}\x3c/td\x3e\r\n        \x3ctd class\x3d"second"  colspan\x3d"2"\x3e\r\n         \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n          data-dojo-attach-point\x3d"geometryServiceURL" style\x3d"width:100%;" /\x3e\r\n        \x3c/td\x3e\r\n       \r\n      \x3c/tr\x3e\r\n      \x3c/div\x3e\r\n      \x3ctr\x3e \r\n        \x3ctd colspan\x3d"2"\x3e\r\n         \x3cdiv data-dojo-attach-point\x3d"dashboardFieldNameInfos"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"dashboardFieldNameInfosError" style\x3d"display:none; padding: 5px;"\x3e\x3c/div\x3e\r\n    \r\n        \x3c/td\x3e\r\n         \r\n        \x3c/tr\x3e\r\n\r\n    \x3c/tbody\x3e\r\n  \x3c/table\x3e\r\n \x3c/div\x3e\r\n',
"url:widgets/ReviewerDashboard/setting/css/style.css":".drs-widget-dashboard-setting{margin:0; padding:0; font-size:15px;}.drs-widget-dashboard-setting .setting-table \x3e thead \x3e tr \x3e th,.drs-widget-dashboard-setting .setting-table \x3e tbody \x3e tr \x3e td{height:40px; line-height:40px; vertical-align:middle;}.drs-widget-dashboard-setting .input-table \x3e tbody \x3e tr \x3e .first{width:24%;}.drs-widget-dashboard-setting .input-table \x3e tbody \x3e tr \x3e .second{width:74%;}.drs-widget-dashboard-setting .input-table \x3e tbody \x3e tr \x3e .third{width:35px;}",
"*now":function(l){l(['dojo/i18n!*preload*widgets/ReviewerDashboard/setting/nls/Setting*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])}}});
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/query dojo/on jimu/dijit/Message dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/SimpleTable esri/tasks/datareviewer/DashboardTask dijit/form/ValidationTextBox dijit/form/RadioButton dijit/form/NumberTextBox".split(" "),function(l,f,h,m,q,n,d,a,c,e){return l([a,d],{baseClass:"drs-widget-dashboard-setting",startup:function(){this.inherited(arguments);this.setConfig(this.config);this.own(q(this.includeGeoFilter,"change",
h.hitch(this,this._setFilterVisibility)))},setConfig:function(a){this.config=a;a.drsSOEURL&&this.drsSOEURL.set("value",a.drsSOEURL);a.numberChartSections&&this.chartDataSections.set("value",a.numberChartSections);"true"===a.includeGeographicFilter?this.includeGeoFilter.set("checked",!0):(this.includeGeoFilter.set("checked",!1),this.showHideDynamicRows(!1,this.geoFilterSettingsTable));a.selectUrl&&this.selectUrl.set("value",a.selectUrl);a.selectMapUrl&&this.selectMapUrl.set("value",a.selectMapUrl);
a.geometryServiceURL&&this.geometryServiceURL.set("value",a.geometryServiceURL);this.displayFieldsTable=new c({fields:[{name:"isDefault",title:this.nls.defaultColumn,type:"radio",width:"100px"},{name:"isVisible",title:this.nls.visibleColumn,type:"checkbox","class":"update",width:"100px"},{name:"dashboardFieldName",title:this.nls.fieldNameColumn,type:"text",width:"300px"},{name:"alias",title:this.nls.aliasColumn,type:"text",editable:"true",width:"300px"}],selectable:!1});this.displayFieldsTable.placeAt(this.dashboardFieldNameInfos);
this.displayFieldsTable.startup();this.getDashboardFieldInfos(a.drsSOEURL,a.dashboardFieldNames)},getDashboardFieldInfos:function(a,c){(new e(a)).getDashboardFieldNames().then(h.hitch(this,function(a){a.fieldNames.push("LIFECYCLEPHASE");for(var b=0;b<a.fieldNames.length;b++){var d=a.fieldNames[b];if("batchjobcheckgroup"!==d.toLowerCase()){for(var f="",e="",h="",l,m=0;m<c.length;m++)if(c[m].dashboardFieldName===a.fieldNames[b]){l=c[m];break}null!==l&&void 0!==l?(f=l.isDefault,e=l.isVisible,h=l.alias):
0===c.length&&"severity"===d.toLowerCase()&&(f=!0);this.displayFieldsTable.addRow({isDefault:""===f?!1:f,isVisible:""===e?!0:e,dashboardFieldName:d,alias:""===h?d:h})}}}))},_onBtnSetSourceClicked:function(){this.displayFieldsTable.clear();this.getDashboardFieldInfos(this.drsSOEURL.value,[])},getConfig:function(){this.config.drsSOEURL=this.drsSOEURL.value;this.config.numberChartSections=this.chartDataSections.value;this.config.includeGeographicFilter=this.includeGeoFilter.checked?"true":"false";this.config.selectUrl=
this.selectUrl.value;this.config.selectMapUrl=this.selectMapUrl.value;this.config.geometryServiceURL=this.geometryServiceURL.value;var a=this.displayFieldsTable.getData();this.config.dashboardFieldNames=[];for(var c=[],d=a.length,e=0;e<d;e++){var g={};g.dashboardFieldName=a[e].dashboardFieldName;g.alias=a[e].alias;g.isVisible=a[e].isVisible;g.isDefault=a[e].isDefault;c.push(g)}if(0===f.filter(c,function(a){return!0===a.isVisible}).length)return new n({message:this.nls.selectFieldWarning}),!1;a=f.filter(c,
function(a){return!0===a.isDefault});if(null===a||0===a.length)return new n({message:this.nls.includeDefaultFieldName}),!1;if(0<a.length&&!1===a[0].isVisible)return new n({message:this.nls.defaultFieldNotVisible}),!1;this.config.dashboardFieldNames=c;return this.config},_setFilterVisibility:function(a){var c=m(this.geoFilterSettings);a?(c.style({display:"block"}),this.showHideDynamicRows(!0,this.geoFilterSettingsTable)):this.showHideDynamicRows(!1,this.geoFilterSettingsTable)},showHideDynamicRows:function(a,
c){var d=m(".dynamicRow",c);if(void 0!==d&&null!==d&&0<d.length)for(var e=0;e<d.length;e++)d[e].style.display=a?"":"none"}})});