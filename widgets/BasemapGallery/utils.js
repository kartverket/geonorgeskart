// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/Deferred dojo/_base/array dojo/promise/all jimu/portalUtils jimu/SpatialReference/wkidUtils jimu/shared/basePortalUrlUtils esri/request".split(" "), function(f, g, h, p, k, q, r, s) {
    function m(a) {
        if (!a) return null;
        var b = a.indexOf("?");
        return 0 === a.search(/http|\/\//) && -1 !== b ? a.slice(0, b).replace(/\/*$/g, "") : a
    }

    function l(a) {
        return a ? r.removeProtocol(m(a)) : null
    }

    function n(a) {
        var b = [];
        h.forEach(a, function(a) {
            b.push(a.url)
        });
        b.sort();
        a = "";
        for (var c = 0, c = 0; c < b.length; c++) {
            var e = b[c].indexOf("?"),
                d = "",
                d = -1 !== e ? b[c].slice(0, e) : b[c];
            a += d
        }
        return a.replace(/\ /, "")
    }

    function u(a) {
        var b = !1;
        if (a)
            for (var c = 0; c < a.length; c++)
                if (a[c].type) {
                    b = !0;
                    break
                }
        return b
    }

    function v(a, b) {
        var c = null,
            e = new g;
        b.spatialReference || a.spatialReference ? (c = b.spatialReference || a.spatialReference, e.resolve(c)) : a.owner && 0 === a.owner.indexOf("esri_") ? e.resolve({
            wkid: "102100"
        }) : u(b.baseMap.baseMapLayers) ? e.resolve({
            wkid: "102100"
        }) : b.baseMap.baseMapLayers && b.baseMap.baseMapLayers[0] ? s({
            url: b.baseMap.baseMapLayers[0].url,
            content: {
                f: "json"
            },
            handleAs: "json",
            callbackParamName: "callback"
        }).then(f.hitch(this, function(a) {
            c = a.spatialReference ? a.spatialReference : null;
            e.resolve(c)
        }), f.hitch(this, function() {
            e.resolve(null)
        })) : e.resolve(null);
        return e
    }

    function w(a) {
        var b = new g;
        k.getPortalSelfInfo(a).then(f.hitch(this, function(c) {
            var e = k.getPortal(a);
            c = c.basemapGalleryGroupQuery;
            var d = c.indexOf("esri_");
            if (0 <= d) {
                var d = c.slice(d, d + 7),
                    t = "esri_" + dojoConfig.locale.slice(0, 2);
                c = c.replace(d, t)
            }
            e.queryGroups({
                f: "json",
                q: c
            }).then(f.hitch(this, function(a) {
                0 <
                    a.results.length ? a.results[0].queryItems({
                        start: 1,
                        num: 100,
                        f: "json",
                        q: k.webMapQueryStr
                    }).then(f.hitch(this, function(a) {
                        b.resolve(a)
                    }), f.hitch(this, function() {
                        b.reject()
                    })) : b.reject()
            }), f.hitch(this, function() {
                b.reject()
            }))
        }), f.hitch(this, function() {
            b.reject()
        }));
        return b
    }
    return {
        _loadPortalBaseMaps: function(a, b) {
            var c = new g,
                e = [];
            w(a).then(function(a) {
                h.forEach(a.results, function(a) {
                    var c = new g;
                    e.push(c);
                    a.getItemData().then(function(d) {
                        v(a, d).then(f.hitch(this, function(e) {
                            var f = [];
                            if (b && e && q.isSameSR(b.wkid,
                                    e.wkid)) {
                                var f = h.map(d.baseMap.baseMapLayers, function(a) {
                                        return a
                                    }),
                                    g = l(a.thumbnailUrl);
                                c.resolve({
                                    layers: f,
                                    title: a.title,
                                    thumbnailUrl: g,
                                    spatialReference: e
                                })
                            } else c.resolve({})
                        }))
                    })
                });
                p(e).then(function(a) {
                    a = h.filter(a, function(a) {
                        return a && a.title ? !0 : !1
                    }, this);
                    c.resolve(a)
                })
            }, function(a) {
                c.reject(a)
            });
            return c
        },
        compareSameBasemap: function(a, b) {
            var c = b.layers,
                e = "",
                d = "",
                e = n(a.layers),
                d = n(c);
            return e === d
        },
        compareSameBasemapByOrder: function(a, b) {
            var c = a.layers,
                e = b.layers;
            if (c.length !== e.length) return !1;
            for (var d = 0; d < c.length; d++)
                if (c[d].type || (c[d].type = null), e[d].type || (e[d].type = null), c[d].type !== e[d].type || !c[d].type && !c[d].type && (c[d].url || (c[d].url = null), e[d].url || (e[d].url = null), l(c[d].url) !== l(e[d].url))) return !1;
            return !0
        },
        isBingMap: function(a) {
            if (!a || !a.layers) return !1;
            for (var b = 0; b < a.layers.length; b++)
                if ("BingMapsAerial" === a.layers[b].type || "BingMapsRoad" === a.layers[b].type || "BingMapsHybrid" === a.layers[b].type) return !0;
            return !1
        },
        isNoUrlLayerMap: function(a) {
            if (!a || !a.layers) return !1;
            for (var b =
                    0; b < a.layers.length; b++)
                if ("BingMapsAerial" === a.layers[b].type || "BingMapsRoad" === a.layers[b].type || "BingMapsHybrid" === a.layers[b].type || "OpenStreetMap" === a.layers[b].type) return !0;
            return !1
        },
        getToken: function(a) {
            a = k.getPortal(a);
            a.updateCredential();
            return a.credential ? "?token\x3d" + a.credential.token : ""
        },
        removeUrlQuery: function(a) {
            return m(a)
        },
        getStanderdUrl: function(a) {
            return l(a)
        }
    }
});