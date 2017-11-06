// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/AddData/search/templates/ScopeOptions.html":'\x3cdiv class\x3d"search-scope-options"\x3e\r\n  \x3ca href\x3d"#" class\x3d"scope-placeholder"\r\n    data-dojo-attach-point\x3d"scopePlaceholder"\r\n    data-dojo-attach-event\x3d"onClick: scopePlaceholderClicked"\x3e\r\n    \x3cspan data-dojo-attach-point\x3d"scopePlaceholderText"\x3e\x3c/span\x3e\r\n    \x3cspan class\x3d"dropdown-arrow"\x3e\x3c/span\x3e\r\n  \x3c/a\x3e\r\n  \x3cdiv class\x3d"btn-group" data-dojo-attach-point\x3d"btnGroup"\x3e\r\n    \x3cbutton type\x3d"button" class\x3d"btn btn-sm btn-default" name\x3d"${id}_scope"\r\n      data-dojo-attach-point\x3d"MyContentToggle"\r\n      data-dojo-attach-event\x3d"onClick: optionClicked"\r\n      data-option-name\x3d"MyContent"\x3e\r\n      ${i18n.search.scopeOptions.myContent}\r\n    \x3c/button\x3e\r\n    \x3cbutton type\x3d"button" class\x3d"btn btn-sm btn-default" name\x3d"${id}_scope"\r\n      data-dojo-attach-point\x3d"MyOrganizationToggle"\r\n      data-dojo-attach-event\x3d"onClick: optionClicked"\r\n      data-option-name\x3d"MyOrganization"\x3e\r\n      ${i18n.search.scopeOptions.myOrganization}\r\n    \x3c/button\x3e\r\n    \x3cbutton type\x3d"button" class\x3d"btn btn-sm btn-default" name\x3d"${id}_scope"\r\n      data-dojo-attach-point\x3d"ArcGISOnlineToggle"\r\n      data-dojo-attach-event\x3d"onClick: optionClicked"\r\n      data-option-name\x3d"ArcGISOnline"\x3e\r\n      ${i18n.search.scopeOptions.ArcGISOnline}\r\n    \x3c/button\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-class ./SearchComponent dojo/text!./templates/ScopeOptions.html dojo/i18n!../nls/strings ./util".split(" "),function(n,p,l,b,q,r,s,k){return n([q],{i18n:s,templateString:r,postCreate:function(){this.inherited(arguments)},startup:function(){this._started||(this.inherited(arguments),this.initOptions())},hideDropdown:function(){b.remove(this.scopePlaceholder,"opened");b.remove(this.btnGroup,"show")},initOptions:function(){var a=this.searchPane.searchContext,
c=a.portal.isPortal,e="string"===typeof a.username&&0<a.username.length,f=e,d=!0,g=a.allowArcGISOnline,h=this.getConfig().scopeOptions,a=function(a,c){var b=h[a];b&&("boolean"===typeof b.allow&&!b.allow&&(c.style.display="none","MyContent"===a?f=!1:"MyOrganization"===a?d=!1:"ArcGISOnline"===a&&(g=!1)),"string"===typeof b.label&&(b=p.trim(b.label),0<b.length&&k.setNodeText(c,b)))};a("MyContent",this.MyContentToggle);a("MyOrganization",this.MyOrganizationToggle);a("ArcGISOnline",this.ArcGISOnlineToggle);
!e&&!c&&g&&(d=!1);f||(this.MyContentToggle.style.display="none");d||(this.MyOrganizationToggle.style.display="none");g||(this.ArcGISOnlineToggle.style.display="none");c=null;d?c=this.MyOrganizationToggle:g?c=this.ArcGISOnlineToggle:f&&(c=this.MyContentToggle);c&&(b.add(c,"active"),this.scopePlaceholderText.innerHTML=c.innerHTML)},optionClicked:function(a){this.toggleClassName(a);this.hideDropdown();this.search()},scopePlaceholderClicked:function(a){a.preventDefault();b.contains(this.scopePlaceholder,
"opened")?this.hideDropdown():this.showDropdown()},showDropdown:function(){b.add(this.scopePlaceholder,"opened");b.add(this.btnGroup,"show")},toggleClassName:function(a){l.forEach(this.btnGroup.children,function(a){b.remove(a,"active")});b.add(a.target,"active");this.scopePlaceholderText.innerHTML=a.target.innerHTML},appendQueryParams:function(a,c){var e=null;l.some(this.btnGroup.children,function(a){if(b.contains(a,"active"))return e=a.getAttribute("data-option-name"),!0});"undefined"===typeof e&&
(e=null);var f=this.searchPane.searchContext,d=null,g=f.username,h=f.orgId,m=!0;f.portal&&f.portal.isPortal&&(m=!1);"MyContent"===e?"string"===typeof g&&0<g.length&&(d="(owner:"+k.escapeForLucene(g)+")"):"MyOrganization"===e?m&&("string"===typeof h&&0<h.length)&&(d="(orgid:"+k.escapeForLucene(h)+")"):"ArcGISOnline"===e&&f.allowArcGISOnline&&(c.scopeIsArcGISOnline=!0);null!==d&&0<d.length&&(d="("+d+")",a.q=null!==a.q&&0<a.q.length?a.q+(" AND "+d):d)}})});