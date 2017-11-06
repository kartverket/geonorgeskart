// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/SmartEditor/setting/FilterPage.html":'\x3cdiv\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"submitWhenHidden"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"filterControl"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/json dojo/text!./FilterPage.html dijit/_TemplatedMixin jimu/BaseWidgetSetting jimu/dijit/Popup jimu/dijit/Filter esri/lang dojox/html/entities dijit/form/CheckBox dojo/dom-construct".split(" "),function(b,d,f,g,h,k,l,m,n,p,q,r){return b([k,h],{baseClass:"jimu-widget-smartEditor-filter-page",templateString:g,_filter:null,_url:null,_layerDefinition:null,_validationTable:null,postCreate:function(){this.inherited(arguments);this._init()},_init:function(){this._origNLS=
window.jimuNls.filterBuilder.matchMsg;window.jimuNls.filterBuilder.matchMsg=this.nls.filterPage.filterBuilder},destroy:function(){window.jimuNls.filterBuilder.matchMsg=this._origNLS;this._filter&&(this._filter.destroyRecursive(),this._filter=null,delete this._filter);this._submitHidden&&(this._submitHidden.destroyRecursive(),this._submitHidden=null,delete this._submitHidden)},popup:function(c){var a=this._validationTable.getRowData(c);if(a){if(a.label===this.nls.actionPage.actions.hide){this.submitWhenHidden.style.display=
"block";this._submitHidden=new q({id:"submitHidden",checked:void 0===a.submitWhenHidden?!1:a.submitWhenHidden,value:this.nls.filterPage.submitHidden},null);this.submitWhenHidden.appendChild(this._submitHidden.domNode);var b=d.replace("\x3clabel class\x3d'submithide' for\x3d'submitWhenHidden'\x3e{replace}\x3c/label\x3e\x3c/br\x3e\x3c/br\x3e",{replace:this.nls.filterPage.submitHidden});r.place(b,this._submitHidden.domNode,"after")}else this.submitWhenHidden.style.display="none";this._filter=new m({style:"width:100%;margin-top:22px;",
noFilterTip:this.nls.filterPage.noFilterTip});this._filter.placeAt(this.filterControl);var e=new l({titleLabel:n.substitute({action:a.label},this.nls.filterPage.title),width:850,height:485,content:this,rowData:a,buttons:[{label:this.nls.ok,onClick:d.hitch(this,function(){var a=this._filter.toJson(),b=!1;this._submitHidden&&this._submitHidden.checked&&(b=this._submitHidden.checked);a&&a.expr&&("1\x3d1"===a.expr?this._validationTable.editRow(c,{expression:"",filter:null,submitWhenHidden:b}):this._validationTable.editRow(c,
{expression:a.expr,filter:f.stringify(a),submitWhenHidden:b}),e.close())})},{label:this.nls.cancel,classNames:["jimu-btn jimu-btn-vacation"],onClick:function(){e.close()}}]});void 0===a.filter||null===a.filter||""===a.filter?this._filter.buildByExpr(this._url,null,this._layerDefinition):this._filter.buildByExpr(this._url,p.decode(a.expression),this._layerDefinition)}}})});