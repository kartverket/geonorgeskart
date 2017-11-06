// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"esri/dijit/HomeButton":function(){define("dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has ../kernel dijit/_WidgetBase dijit/a11yclick dijit/_TemplatedMixin dojo/on dojo/Deferred dojo/text!./templates/HomeButton.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style".split(" "),function(f,g,d,q,m,n,h,p,k,l,a,s,e,r){return g("esri.dijit.HomeButton",[n,p,f],{templateString:a,options:{theme:"HomeButton",map:null,extent:null,fit:!1,visible:!0},constructor:function(a,b){var c=
d.mixin({},this.options,a);this.domNode=b;this._i18n=s;this.set("map",c.map);this.set("theme",c.theme);this.set("visible",c.visible);this.set("extent",c.extent);this.set("fit",c.fit);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this._css={container:"homeContainer",home:"home",loading:"loading"}},postCreate:function(){this.inherited(arguments);this.own(k(this._homeNode,h,d.hitch(this,this.home)))},startup:function(){this.inherited(arguments);this.map||(this.destroy(),
console.log("HomeButton::map required"));if(this.map.loaded)this._init();else k.once(this.map,"load",d.hitch(this,function(){this._init()}))},destroy:function(){this.inherited(arguments)},home:function(){var a=new l,b=this.get("extent");this._showLoading();var c={extent:b};b?this.map.extent!==b?this.map.setExtent(b,this.get("fit")).then(d.hitch(this,function(){this._hideLoading();this.emit("home",c);a.resolve(c)}),d.hitch(this,function(b){b||(b=Error("HomeButton::Error setting map extent"));c.error=
b;this.emit("home",c);a.reject(b)})):(this._hideLoading(),this.emit("home",c),a.resolve(c)):(this._hideLoading(),b=Error("HomeButton::home extent is undefined"),c.error=b,this.emit("home",c),a.reject(b));return a.promise},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},_init:function(){this._visible();this.get("extent")||this.set("extent",this.map.extent);this.set("loaded",!0);this.emit("load",{})},_showLoading:function(){e.add(this._homeNode,this._css.loading)},_hideLoading:function(){e.remove(this._homeNode,
this._css.loading)},_updateThemeWatch:function(a,b,c){e.remove(this.domNode,b);e.add(this.domNode,c)},_visible:function(){this.get("visible")?r.set(this.domNode,"display","block"):r.set(this.domNode,"display","none")}})})},"widgets/HomeButton/_build-generate_module":function(){define(["dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:esri/dijit/templates/HomeButton.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"_homeNode" title\x3d"${_i18n.widgets.homeButton.home.title}" role\x3d"button" class\x3d"${_css.home}" tabindex\x3d"0"\x3e\x3cspan\x3e${_i18n.widgets.homeButton.home.button}\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/HomeButton/css/style.css":".jimu-widget-homebutton {background-color: #ccc; background-color: rgba(0,0,0,0.2); border-radius: 5px;}.jimu-widget-homebutton .HomeButton .home {background-color: rgba(0,0,0,0);}.jimu-widget-homebutton.inHome {background-color: #000;}.jimu-widget-homebutton .HomeButton .home:hover {background-color: rgba(0,0,0,0.4);}.jimu-widget-homebutton.inHome .HomeButton .home {background-color: #000;}","*now":function(f){f(['dojo/i18n!*preload*widgets/HomeButton/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])}}});
define("dojo/_base/declare dojo/_base/lang jimu/BaseWidget esri/dijit/HomeButton esri/geometry/Extent esri/SpatialReference dojo/_base/html dojo/dom-construct dojo/topic dojo/on".split(" "),function(f,g,d,q,m,n,h,p,k,l){return f([d],{name:"HomeButton",baseClass:"jimu-widget-homebutton",postCreate:function(){this.own(k.subscribe("appConfigChanged",g.hitch(this,this.onAppConfigChanged)))},startup:function(){var a=null;this.inherited(arguments);this.own(l(this.map,"extent-change",g.hitch(this,"onExtentChange")));
a=(a=this.appConfig&&this.appConfig.map&&this.appConfig.map.mapOptions&&this.appConfig.map.mapOptions.extent)?new m(a.xmin,a.ymin,a.xmax,a.ymax,new n(a.spatialReference)):this.map._initialExtent||this.map.extent;this.createHomeDijit({map:this.map,extent:a})},createHomeDijit:function(a){this.homeDijit=new q(a,p.create("div"));this.own(l(this.homeDijit,"home",g.hitch(this,"onHome")));h.place(this.homeDijit.domNode,this.domNode);this.homeDijit.startup()},onAppConfigChanged:function(a,d,e){"mapOptionsChange"===
d&&(e&&a&&e.extent)&&(a=new m(e.extent),this.homeDijit.set("extent",a))},onExtentChange:function(){h.removeClass(this.domNode,"inHome")},onHome:function(a){(!a||!a.error)&&h.addClass(this.domNode,"inHome")}})});