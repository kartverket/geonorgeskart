// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare", "dojo/_base/array", "jimu/BaseWidget"], function(b, e, c) {
    return b([c], {
        baseClass: "jimu-widget-widgetb",
        startup: function() {
            this.inherited(arguments);
            this.fetchDataByName("WidgetA")
        },
        onReceiveData: function(a, b, c, d) {
            "WidgetA" === a && (a = '\x3cdiv style\x3d"margin:10px;"\x3e\x3cb\x3eReceive data from\x3c/b\x3e:' + a + "\x3cbr\x3e\x3cb\x3ewidgetId:\x3c/b\x3e" + b + "\x3cbr\x3e\x3cb\x3edata:\x3c/b\x3e" + c.message, !0 === d ? (this.messageNode.innerHTML += a + ("\x3cbr\x3e\x3cb\x3ehistoryData:\x3c/b\x3e" +
                d + ". Fetch again.\x3c/div\x3e"), this.fetchDataByName("WidgetA")) : (a += "\x3cbr\x3e\x3cb\x3ehistoryData:\x3c/b\x3e\x3cbr\x3e" + e.map(d, function(a, b) {
                return b + ":" + a.message
            }).join("\x3cbr\x3e") + "\x3c/div\x3e", this.messageNode.innerHTML += a))
        }
    })
});