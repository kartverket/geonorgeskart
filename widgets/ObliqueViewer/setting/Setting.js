// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"dojox/form/CheckedMultiSelect":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/event dojo/dom-geometry dojo/dom-class dojo/dom-construct dojo/i18n dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/registry dijit/Menu dijit/MenuItem dijit/Tooltip dijit/form/_FormSelectWidget dijit/form/ComboButton dojo/text!dojox/form/resources/_CheckedMultiSelectMenuItem.html dojo/text!dojox/form/resources/_CheckedMultiSelectItem.html dojo/text!dojox/form/resources/CheckedMultiSelect.html dojo/i18n!dojox/form/nls/CheckedMultiSelect dijit/form/CheckBox".split(" "),
function(e,m,d,h,k,f,g,n,b,c,p,q,r,s,l,t,u,v,w,x,B){var y=e("dojox.form._CheckedMultiSelectItem",[b,c,p],{templateString:w,baseClass:"dojoxMultiSelectItem",option:null,parent:null,disabled:!1,readOnly:!1,postMixInProperties:function(){this._type=this.parent.multiple?{type:"checkbox",baseClass:"dijitCheckBox"}:{type:"radio",baseClass:"dijitRadio"};this.disabled||(this.disabled=this.option.disabled=this.option.disabled||!1);this.readOnly||(this.readOnly=this.option.readOnly=this.option.readOnly||!1);
this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this.labelNode.innerHTML=this.option.label},_changeBox:function(){!this.get("disabled")&&!this.get("readOnly")&&(this.parent.multiple?this.option.selected=this.checkBox.get("value")&&!0:this.parent.set("value",this.option.value),this.parent._updateSelection(),this.parent.focus())},_onClick:function(a){this.get("disabled")||this.get("readOnly")?h.stop(a):this.checkBox._onClick(a)},_updateBox:function(){this.checkBox.set("value",
this.option.selected)},_setDisabledAttr:function(a){this.disabled=a||this.option.disabled;this.checkBox.set("disabled",this.disabled);f.toggle(this.domNode,"dojoxMultiSelectDisabled",this.disabled)},_setReadOnlyAttr:function(a){this.checkBox.set("readOnly",a);this.readOnly=a}}),z=e("dojox.form._CheckedMultiSelectMenu",r,{multiple:!1,buildRendering:function(){this.inherited(arguments);var a=this.menuTableNode=this.domNode,b=this.domNode=g.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}});
a.parentNode&&a.parentNode.replaceChild(b,a);f.remove(a,"dijitMenuTable");b.className=a.className+" dojoxCheckedMultiSelectMenu";a.className="dijitReset dijitMenuTable";a.setAttribute("role","listbox");b.setAttribute("role","presentation");b.appendChild(a)},resize:function(a){a&&(k.setMarginBox(this.domNode,a),"w"in a&&(this.menuTableNode.style.width="100%"))},onClose:function(){this.inherited(arguments);this.menuTableNode&&(this.menuTableNode.style.width="")},onItemClick:function(a,b){"undefined"==
typeof this.isShowingNow&&this._markActive();this.focusChild(a);if(a.disabled||a.readOnly)return!1;if(!this.multiple)this.onExecute();a.onClick(b)}}),A=e("dojox.form._CheckedMultiSelectMenuItem",s,{templateString:v,option:null,parent:null,iconClass:"",postMixInProperties:function(){this.parent.multiple?(this._iconClass="dojoxCheckedMultiSelectMenuCheckBoxItemIcon",this._type={type:"checkbox"}):(this._iconClass="",this._type={type:"hidden"});this.disabled=this.option.disabled;this.checked=this.option.selected;
this.label=this.option.label;this.readOnly=this.option.readOnly;this.inherited(arguments)},onChange:function(a){},_updateBox:function(){f.toggle(this.domNode,"dojoxCheckedMultiSelectMenuItemChecked",!!this.option.selected);this.domNode.setAttribute("aria-checked",this.option.selected);this.inputNode.checked=this.option.selected;this.parent.multiple||f.toggle(this.domNode,"dijitSelectSelectedOption",!!this.option.selected)},_onClick:function(a){!this.disabled&&!this.readOnly&&(this.parent.multiple?
(this.option.selected=!this.option.selected,this.parent.onChange(),this.onChange(this.option.selected)):this.option.selected||(d.forEach(this.parent.getChildren(),function(a){a.option.selected=!1}),this.option.selected=!0,this.parent.onChange(),this.onChange(this.option.selected)));this.inherited(arguments)}});return e("dojox.form.CheckedMultiSelect",t,{templateString:x,baseClass:"dojoxCheckedMultiSelect",required:!1,invalidMessage:"$_unset_$",_message:"",dropDown:!1,labelText:"",tooltipPosition:[],
postMixInProperties:function(){this.inherited(arguments);this._nlsResources=n.getLocalization("dojox.form","CheckedMultiSelect",this.lang);"$_unset_$"==this.invalidMessage&&(this.invalidMessage=this._nlsResources.invalidMessage)},_fillContent:function(){this.inherited(arguments);if(this.options.length&&!this.value&&this.srcNodeRef){var a=this.srcNodeRef.selectedIndex||0;this.value=this.options[0<=a?a:0].value}this.dropDown&&(f.toggle(this.selectNode,"dojoxCheckedMultiSelectHidden"),this.dropDownMenu=
new z({id:this.id+"_menu",style:"display: none;",multiple:this.multiple,onChange:m.hitch(this,"_updateSelection")}))},startup:function(){this.dropDown&&(this.dropDownButton=new u({label:this.labelText,dropDown:this.dropDownMenu,baseClass:"dojoxCheckedMultiSelectButton",maxHeight:this.maxHeight},this.comboButtonNode));this.inherited(arguments)},_onMouseDown:function(a){a.preventDefault()},validator:function(){return!this.required?!0:d.some(this.getOptions(),function(a){return a.selected&&null!=a.value&&
0!=a.value.toString().length})},validate:function(a){l.hide(this.domNode);(a=this.isValid(a))||this.displayMessage(this.invalidMessage);return a},isValid:function(a){return this.validator()},getErrorMessage:function(a){return this.invalidMessage},displayMessage:function(a){l.hide(this.domNode);a&&l.show(a,this.domNode,this.tooltipPosition)},onAfterAddOptionItem:function(a,b){},_addOptionItem:function(a){var b;this.dropDown?(b=new A({option:a,parent:this.dropDownMenu}),this.dropDownMenu.addChild(b)):
(b=new y({option:a,parent:this,disabled:this.disabled,readOnly:this.readOnly}),this.wrapperDiv.appendChild(b.domNode));this.onAfterAddOptionItem(b,a)},_refreshState:function(){this.validate(this.focused)},onChange:function(a){this._refreshState()},reset:function(){this.inherited(arguments);l.hide(this.domNode)},_updateSelection:function(){this.inherited(arguments);this._handleOnChange(this.value);d.forEach(this._getChildren(),function(a){a._updateBox()});g.empty(this.containerNode);var a=this;d.forEach(this.value,
function(b){b=g.create("option",{value:b,label:b,selected:"selected"});g.place(b,a.containerNode)});if(this.dropDown&&this.dropDownButton){var b=0,c="";d.forEach(this.options,function(a){a.selected&&(b++,c=a.label)});this.dropDownButton.set("label",this.multiple?m.replace(this._nlsResources.multiSelectLabelText,{num:b}):c)}},_getChildren:function(){return this.dropDown?this.dropDownMenu.getChildren():d.map(this.wrapperDiv.childNodes,function(a){return q.byNode(a)})},invertSelection:function(a){this.multiple&&
(d.forEach(this.options,function(a){a.selected=!a.selected}),this._updateSelection())},_setDisabledAttr:function(a){this.inherited(arguments);this.dropDown&&this.dropDownButton.set("disabled",a);d.forEach(this._getChildren(),function(b){b&&b.set&&b.set("disabled",a)})},_setReadOnlyAttr:function(a){this.inherited(arguments);"readOnly"in this.attributeMap&&this[this.attributeMap.readOnly].setAttribute("readonly",a);this.readOnly=a;d.forEach(this._getChildren(),function(b){b&&b.set&&b.set("readOnly",
a)})},uninitialize:function(){l.hide(this.domNode);d.forEach(this._getChildren(),function(a){a.destroyRecursive()});this.inherited(arguments)}})})},"widgets/ObliqueViewer/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:dojox/form/resources/_CheckedMultiSelectMenuItem.html":'\x3ctr class\x3d"dijitReset dijitMenuItem" dojoAttachPoint\x3d"focusNode" role\x3d"menuitemcheckbox" tabIndex\x3d"-1"\r\n\tdojoAttachEvent\x3d"ondijitclick:_onClick"\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemIconCell" role\x3d"presentation"\r\n\t\t\x3e\x3cdiv src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitMenuItemIcon ${_iconClass}" dojoAttachPoint\x3d"iconNode"\r\n\t\t\t\x3e\x3cinput class\x3d"dojoxCheckedMultiSelectCheckBoxInput" dojoAttachPoint\x3d"inputNode" type\x3d"${_type.type}"\r\n\t\t/\x3e\x3c/div\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemLabel" colspan\x3d"2" dojoAttachPoint\x3d"containerNode,labelNode"\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemAccelKey" style\x3d"display: none" dojoAttachPoint\x3d"accelKeyNode"\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuArrowCell" role\x3d"presentation"\x3e\x26nbsp;\x3c/td\r\n\x3e\x3c/tr\x3e',
"url:dojox/form/resources/_CheckedMultiSelectItem.html":'\x3cdiv class\x3d"dijitReset ${baseClass}"\r\n\t\x3e\x3cinput class\x3d"${baseClass}Box" data-dojo-type\x3d"dijit.form.CheckBox" data-dojo-attach-point\x3d"checkBox" \r\n\t\tdata-dojo-attach-event\x3d"_onClick:_changeBox" type\x3d"${_type.type}" data-dojo-props\x3d\'disabled:${disabled}, readOnly:${readOnly}\' baseClass\x3d"${_type.baseClass}"\r\n\t/\x3e\x3cdiv class\x3d"dijitInline ${baseClass}Label" data-dojo-attach-point\x3d"labelNode" data-dojo-attach-event\x3d"onclick:_onClick"\x3e\x3c/div\r\n\x3e\x3c/div\x3e\r\n',
"url:dojox/form/resources/CheckedMultiSelect.html":'\x3cdiv class\x3d"dijit dijitReset dijitInline dijitLeft" id\x3d"widget_${id}"\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"comboButtonNode"\r\n\t\x3e\x3c/div\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"selectNode" class\x3d"dijit dijitReset dijitInline ${baseClass}Wrapper" data-dojo-attach-event\x3d"onmousedown:_onMouseDown,onclick:focus"\r\n\t\t\x3e\x3cselect class\x3d"${baseClass}Select dojoxCheckedMultiSelectHidden" multiple\x3d"true" data-dojo-attach-point\x3d"containerNode,focusNode"\x3e\x3c/select\r\n\t\t\x3e\x3cdiv data-dojo-attach-point\x3d"wrapperDiv"\x3e\x3c/div\r\n\t\x3e\x3c/div\r\n\x3e\x3c/div\x3e',
"url:widgets/ObliqueViewer/setting/Setting.html":'\x3cdiv style\x3d"width: 100%; height: 100%;"\x3e\r\n  \x3cdiv class\x3d"settings-section" data-dojo-attach-point\x3d"searchesSection"\x3e\r\n    \x3ctable class\x3d"setting-table input-table" cellspacing\x3d"0"\x3e\r\n      \x3ctbody\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.layerSelect}:\x3c/td\x3e\r\n          \x3ctd class\x3d"second"\x3e\r\n            \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"mapLayerSelect" data-dojo-type\x3d"dijit/form/Select"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.elevationFieldSelect}:\x3c/td\x3e\r\n          \x3ctd class\x3d"second"\x3e\r\n            \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"elevationFieldSelect" data-dojo-type\x3d"dijit/form/Select"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.azimuthFieldSelect}:\x3c/td\x3e\r\n          \x3ctd class\x3d"second"\x3e\r\n            \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"azimuthFieldSelect" data-dojo-type\x3d"dijit/form/Select"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.rasterInfoFieldsSelect}:\x3cbr/\x3e\r\n            \x3clabel data-dojo-attach-point\x3d"fieldLimitLabel"\x3e(${nls.fieldLimitText})\x3c/label\x3e\r\n                            \x3c/td\x3e\r\n          \x3ctd class\x3d"second"\x3e\r\n            \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"rasterInfoFieldsSelect" data-dojo-type\x3d"dojox/form/CheckedMultiSelect" multiple\x3d"true"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n\r\n        \x3ctr\x3e\r\n          \x3ctd colspan\x3d"2"\x3e\r\n            \x3cinput style\x3d"margin-right: 15px;" data-dojo-attach-point\x3d"thumbnailCheckbox" data-dojo-type\x3d"dijit/form/CheckBox" /\x3e${nls.showThumbnailText}\x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd colspan\x3d"2"\x3e\r\n            \x3cinput style\x3d"margin-right: 15px;" data-dojo-attach-point\x3d"autoSyncCheckbox" data-dojo-type\x3d"dijit/form/CheckBox" checked /\x3e${nls.autoSyncText}\x3c/td\x3e\r\n        \x3c/tr\x3e\r\n      \x3c/tbody\x3e\r\n    \x3c/table\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"errorSection"\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/ObliqueViewer/setting/css/style.css":".jimu-widget-ObliqueViewer-setting{margin:0; padding:0; font-size:15px;}.jimu-widget-ObliqueViewer-setting .dijitArrowButtonContainer{width: 17px;}.jimu-widget-ObliqueViewer-setting .dijitSelect{height: 30px; width: 96%;}.jimu-widget-ObliqueViewer-setting .dijitTextBox {margin-left: 10px; width: 17em;}.jimu-widget-ObliqueViewer-setting .setting-table \x3e thead \x3e tr \x3e th,.jimu-widget-ObliqueViewer-setting .setting-table \x3e tbody \x3e tr \x3e td{height:40px; line-height:40px; vertical-align:middle;}.jimu-widget-ObliqueViewer-setting .input-table \x3e tbody \x3e tr \x3e .first{width:auto; text-align: left; padding-right:15px;}.jimu-widget-ObliqueViewer-setting .input-table \x3e tbody \x3e tr \x3e .second{width:200px;}.jimu-widget-ObliqueViewer-setting .input-table \x3e tbody \x3e tr \x3e .third{width:35px;}.settingsHidden {display: none;}.dojoxCheckedMultiSelect {margin-top: 4px; margin-bottom: 3px;}.dojoxCheckedMultiSelect .dojoxCheckedMultiSelectWrapper {height: 175px; margin: 0px; width: 255px;}",
"*now":function(e){e(['dojo/i18n!*preload*widgets/ObliqueViewer/setting/nls/Setting*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])}}});
define("dojo/_base/declare dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting dojo/_base/array dojo/dom-class dojo/dom-style dojo/html dojo/_base/lang dojo/on dijit/form/CheckBox dijit/form/Select dojox/form/CheckedMultiSelect dijit/form/NumberTextBox".split(" "),function(e,m,d,h,k,f,g,n){return e([d,m],{baseClass:"jimu-widget-ObliqueViewer-setting",_layerFieldMap:{},_hasSupportedLayer:!1,startup:function(){this.inherited(arguments);this.config.ObliqueViewer||(this.config.ObliqueViewer={});this._populateLayers();
this._hasSupportedLayer&&this._populateFields();this.rasterInfoFieldsSelect&&(this._multiSelectClick(),this.own(this.rasterInfoFieldsSelect.on("click",n.hitch(this,this._multiSelectClick))));this.setConfig(this.config)},_multiSelectClick:function(){var b=this.rasterInfoFieldsSelect.get("value");3<b.length?(f.set(this.fieldLimitLabel,"visibility","visible"),this.rasterInfoFieldsSelect.set("value",b.slice(0,3))):f.set(this.fieldLimitLabel,"visibility","hidden")},_checkForImageServiceLayers:function(){},
_populateLayers:function(){var b=0;h.forEach(this.map.itemInfo.itemData.operationalLayers,function(c){c&&(c.layerObject&&this._isImageServiceLayer(c.layerObject))&&(b++,this.mapLayerSelect.addOption({value:c.title,label:c.title}),this._layerFieldMap[c.title]=[],this._layerFieldMap[c.title]=c.layerObject.fields)},this);this.mapLayerSelect.on("change",n.hitch(this,this._populateFields));0===b?(k.add(this.searchesSection,"settingsHidden"),g.set(this.errorSection,this.nls.errorSectionMeasage),this._hasSupportedLayer=
!1):(k.remove(this.searchesSection,"settingsHidden"),g.set(this.errorSection,""),this._hasSupportedLayer=!0)},_isImageServiceLayer:function(b){return"esri.layers.ArcGISImageServiceLayer"===b.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===b.declaredClass},_populateFields:function(){var b=this.config.ObliqueViewer,c=b.rasterInfoFields&&b.rasterInfoFields.length?b.rasterInfoFields:this._getDefaultFields(),d=b.elevationField?b.elevationField.toLowerCase():"elevation",b=b.azimuthField?b.azimuthField.toLowerCase():
"azimuth";this._clearFields(this.elevationFieldSelect);this._clearFields(this.azimuthFieldSelect);this._clearFields(this.rasterInfoFieldsSelect);this._addFields(this.elevationFieldSelect,d);this._addFields(this.azimuthFieldSelect,b);this._addFields(this.rasterInfoFieldsSelect);this.rasterInfoFieldsSelect.set("value",c)},_clearFields:function(b){var c=b.getOptions();h.forEach(c,function(c){b.removeOption(c)},this)},_addFields:function(b,c){var d=this._layerFieldMap[this.mapLayerSelect.get("value")],
e;h.forEach(d,function(d){c&&-1<d.name.toLowerCase().indexOf(c)&&(e=d.name);"esriFieldTypeGeometry"!==d.type&&b.addOption({value:d.name,label:d.alias||d.name})},this);c&&b.set("value",e)},_getDefaultFields:function(){var b,c=this._layerFieldMap[this.mapLayerSelect.get("value")],d=[];if(!c||!c.length)return k.add(this.searchesSection,"settingsHidden"),g.set(this.errorSection,this.nls.errorSectionMeasage),console.log("No fields found.");for(b=0;3>b;b++)d.push(c[b].alias);return d},setConfig:function(b){this.config=
b;this.thumbnailCheckbox.set("checked",this.config.ObliqueViewer.showThumbnail);this.autoSyncCheckbox.set("checked",this.config.ObliqueViewer.autoSync);this.config.ObliqueViewer.layerTitle&&this.mapLayerSelect.set("value",this.config.ObliqueViewer.layerTitle);this.config.ObliqueViewer.elevationField&&this.elevationFieldSelect.set("value",this.config.ObliqueViewer.elevationField);this.config.ObliqueViewer.azimuthField&&this.azimuthFieldSelect.set("value",this.config.ObliqueViewer.azimuthField);0<this.config.ObliqueViewer.rasterInfoFields.length?
this.rasterInfoFieldsSelect.set("value",this.config.ObliqueViewer.rasterInfoFields):this.rasterInfoFieldsSelect.set("value",this._getDefaultFields())},getConfig:function(){this.config.ObliqueViewer.autoSync=this.autoSyncCheckbox.checked;this.config.ObliqueViewer.showThumbnail=this.thumbnailCheckbox.checked;this.config.ObliqueViewer.layerTitle=this.mapLayerSelect.get("value");this.config.ObliqueViewer.elevationField=this.elevationFieldSelect.get("value");this.config.ObliqueViewer.azimuthField=this.azimuthFieldSelect.get("value");
this.config.ObliqueViewer.rasterInfoFields=this.rasterInfoFieldsSelect.get("value");return this.config}})});