// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare", "dojo/_base/array", "dojo/Deferred", "jimu/BaseFeatureAction", "jimu/WidgetManager"], function(e, f, g, h, k) {
    return e(h, {
        map: null,
        iconClass: "icon-edit",
        isFeatureSupported: function(d, b) {
            if (!b) return !1;
            var c = !1,
                a = this.appConfig.getConfigElementById(this.widgetId).config;
            a.editor.layerInfos ? 0 === a.editor.layerInfos.length ? c = !0 : f.forEach(a.editor.layerInfos, function(a) {
                b.id === a.featureLayer.id && (c = !0)
            }) : c = !1;
            return c && b.isEditable && b.isEditable() ? !0 : !1
        },
        onExecute: function(d, b) {
            var c =
                new g;
            k.getInstance().triggerWidgetOpen(this.widgetId).then(function(a) {
                a.beginEditingByFeatures(d.features, b)
            });
            return c.promise
        }
    })
});