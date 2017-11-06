// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "jimu/BaseWidget"], function(b, c, d) {
    return b([d], {
        baseClass: "jimu-widget-widgeta",
        i: 0,
        j: 0,
        _onPublishClick: function() {
            this.publishData({
                message: "I am widget A."
            });
            this.i++;
            this.pubInfoNode.innerText = "Publish " + this.i
        },
        _onPublishHisClick: function() {
            this.publishData({
                message: "I am widget A."
            }, !0);
            this.j++;
            this.pubHisInfoNode.innerText = "Publish " + this.j
        },
        _onLoadWidgetBClick: function() {
            var a = this.appConfig.getConfigElementsByName("WidgetB");
            0 === a.length ? this.loadWidgetBInfoNode.innerText =
                "Widget B is not configured." : (a = a[0].id, this.widgetManager.getWidgetById(a) ? this.loadWidgetBInfoNode.innerText = "Widget B has been loaded." : this.openWidgetById(a).then(c.hitch(this, function(a) {
                    this.loadWidgetBInfoNode.innerText = a.name + " is loaded"
                })))
        }
    })
});