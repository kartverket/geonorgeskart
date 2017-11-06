// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "esri/dijit/LayerSwipe": function() {
            define("dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has ../kernel dijit/_WidgetBase dijit/_TemplatedMixin dojo/on dojo/text!./templates/LayerSwipe.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style dojo/dnd/move dojo/dnd/Mover dojo/sniff dojo/dom-geometry ../geometry/Point dojo/Deferred dojo/promise/all".split(" "), function(r, m, f, n, p, s, t, k, u, v, b, e, g, l, h, q, x, w, y) {
                var z = m([l], {
                    onFirstMove: function(a) {
                        var c = this.node.style,
                            b, e = this.host;
                        switch (c.position) {
                            case "relative":
                            case "absolute":
                                b = Math.round(parseFloat(c.left)) || 0;
                                c = Math.round(parseFloat(c.top)) || 0;
                                break;
                            default:
                                c.position = "absolute", c = q.getMarginBox(this.node), b = c.l, c = c.t
                        }
                        this.marginBox.l = b - this.marginBox.l;
                        this.marginBox.t = c - this.marginBox.t;
                        if (e && e.onFirstMove) e.onFirstMove(this, a);
                        this.events.shift().remove()
                    }
                });
                return m("esri.dijit.LayerSwipe", [s, t, r], {
                    templateString: u,
                    options: {
                        theme: "LayerSwipe",
                        layers: [],
                        enabled: !0,
                        type: "vertical",
                        invertPlacement: !1,
                        clip: 9
                    },
                    constructor: function(a,
                        c) {
                        var b = f.mixin({}, this.options, a);
                        this.domNode = c;
                        this._i18n = v;
                        this.set("map", b.map);
                        this.set("layers", b.layers);
                        this.set("top", b.top);
                        this.set("left", b.left);
                        this.set("theme", b.theme);
                        this.set("enabled", b.enabled);
                        this.set("type", b.type);
                        this.set("clip", b.clip);
                        this.set("invertPlacement", b.invertPlacement);
                        this.watch("theme", this._updateThemeWatch);
                        this.watch("enabled", this._enabled);
                        this.watch("type", this._type);
                        this.watch("invertPlacement", this._invertPlacement);
                        this._css = {
                            handleContainer: "handleContainer",
                            handle: "handle"
                        };
                        this._listeners = []
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this.map || (this.destroy(), console.log("LayerSwipe::map required"));
                        this.set("layers", this.layers);
                        this.layers.length || (this.destroy(), console.log("LayerSwipe::layer required"));
                        this._allLoaded().then(f.hitch(this, function() {
                            this._init()
                        }), function(a) {
                            console.log("LayerSwipe::" + a.message)
                        })
                    },
                    destroy: function() {
                        this._removeEvents();
                        this._unclipLayers();
                        this.inherited(arguments)
                    },
                    swipe: function() {
                        this._swipe()
                    },
                    enable: function() {
                        this.set("enabled", !0)
                    },
                    disable: function() {
                        this.set("enabled", !1)
                    },
                    _allLoaded: function() {
                        for (var a = [], c = 0; c < this.layers.length; c++) {
                            "string" === typeof this.layers[c] && (this.layers[c] = this.map.getLayer(this.layers[c]), this.layers[c] || console.log("LayerSwipe::Could not get layer by ID"));
                            var b = new w;
                            this.layers[c].loaded ? b.resolve("layer loaded") : this._layerLoadedPromise(c, b);
                            a.push(b.promise)
                        }
                        var e = new w;
                        if (this.map.loaded) e.resolve("map loaded");
                        else k.once(this.map, "load", f.hitch(this, function() {
                            e.resolve("map loaded")
                        }));
                        a.push(e.promise);
                        return y(a)
                    },
                    _layerLoadedPromise: function(a, c) {
                        k.once(this.layers[a], "load", function() {
                            c.resolve("layer loaded")
                        })
                    },
                    _mb: function() {
                        var a = q.getMarginBox(this.map.root);
                        return {
                            t: 0,
                            l: 0,
                            w: a.l + a.w,
                            h: a.h + a.t
                        }
                    },
                    _setInitialPosition: function() {
                        var a, c, b, f, g, h, l;
                        c = a = 0;
                        f = q.getMarginBox(this._moveableNode);
                        b = this.get("type");
                        g = this.get("top");
                        h = this.get("left");
                        l = this.get("invertPlacement");
                        "scope" === b ? (c = "undefined" !== typeof g ? g : this.map.height / 2 - f.h / 2, a = "undefined" !== typeof h ? h : this.map.width /
                            2 - f.w / 2) : "horizontal" === b ? (c = this.map.height / 4 - f.h / 2, c = "undefined" !== typeof g ? g : l ? this.map.height - c : c) : (a = this.map.width / 4 - f.w / 2, a = "undefined" !== typeof h ? h : l ? this.map.width - a : a);
                        e.set(this._moveableNode, {
                            top: c + "px",
                            left: a + "px"
                        })
                    },
                    _setSwipeType: function() {
                        var a = this.get("moveable"),
                            c = this.get("type");
                        c && (a && a.destroy(), b.add(this._moveableNode, c), a = new g.parentConstrainedMoveable(this._moveableNode, {
                            area: "content",
                            within: !0,
                            handle: this._moveableNode,
                            constraints: f.hitch(this, this._mb),
                            mover: z
                        }), this.set("moveable",
                            a), this._setInitialPosition())
                    },
                    _init: function() {
                        this._setSwipeType();
                        this._setupEvents();
                        this._enabled();
                        this.set("loaded", !0);
                        this.emit("load", {});
                        this.swipe()
                    },
                    _removeEvents: function() {
                        if (this._listeners && this._listeners.length)
                            for (var a = 0; a < this._listeners.length; a++) this._listeners[a] && this._listeners[a].remove();
                        this._listeners = []
                    },
                    _repositionMover: function() {
                        var a = q.getMarginBox(this._moveableNode);
                        a && (a.t > this.map.height || 0 > a.t || a.l > this.map.width || 0 > a.l) && this._setInitialPosition()
                    },
                    _setupEvents: function() {
                        this._removeEvents();
                        this._mapResize = k.pausable(this.map, "resize", f.hitch(this, function() {
                            this._repositionMover()
                        }));
                        this._listeners.push(this._mapResize);
                        this._swipeMove = k.pausable(this.moveable, "Move", f.hitch(this, function() {
                            this.swipe()
                        }));
                        this._listeners.push(this._swipeMove);
                        this._swipePanEnd = k.pausable(this.map, "pan-end", f.hitch(this, function() {
                            this._swipe()
                        }));
                        this._listeners.push(this._swipePanEnd);
                        this._mapUpdateStart = k.pausable(this.map, "update-start", f.hitch(this, function() {
                            this._swipe()
                        }));
                        this._listeners.push(this._mapUpdateStart);
                        this._mapUpdateEnd = k.pausable(this.map, "update-end", f.hitch(this, function() {
                            this._swipe()
                        }));
                        this._listeners.push(this._mapUpdateEnd);
                        this._swipePan = k.pausable(this.map, "pan", f.hitch(this, function() {
                            this._swipe()
                        }));
                        this._listeners.push(this._swipePan);
                        this._toolClick = k.pausable(this._moveableNode, "click", f.hitch(this, function(a) {
                            if ("scope" === this.get("type")) {
                                a = this._clickPosition(a);
                                try {
                                    this.map.onClick(a, "other")
                                } catch (c) {
                                    console.log("LayerSwipe::scope click error")
                                }
                                this._clickCoords = null
                            }
                        }));
                        this._listeners.push(this._toolClick);
                        this._toolDblClick = k.pausable(this._moveableNode, "dblclick", f.hitch(this, function(a) {
                            if ("scope" === this.get("type")) {
                                a = this._clickPosition(a);
                                try {
                                    this.map.navigationManager.mouseEvents.onDblClick(a, "other")
                                } catch (c) {
                                    console.log("LayerSwipe::scope dblclick error")
                                }
                                this._clickCoords = null
                            }
                        }));
                        this._listeners.push(this._toolDblClick);
                        this._evtCoords = k.pausable(this.moveable, "MouseDown", f.hitch(this, function(a) {
                            "scope" === this.get("type") && (this._clickCoords = {
                                x: a.x,
                                y: a.y
                            })
                        }));
                        this._listeners.push(this._evtCoords)
                    },
                    _clickPosition: function(a) {
                        if (this._clickCoords && this._clickCoords.x === a.x && this._clickCoords.y === a.y) {
                            var c = q.position(this.map.root, !0),
                                b = a.pageX - c.x,
                                c = a.pageY - c.y;
                            a.x = b;
                            a.y = c;
                            a.screenPoint = {
                                x: b,
                                y: c
                            };
                            a.mapPoint = this.map.toMap(new x(b, c, this.map.spatialReference))
                        }
                        return a
                    },
                    _positionValues: function(a) {
                        var c, b, e, f, g, h, d = {
                            layer: a,
                            layerNode: a._div,
                            layerGraphics: a.graphics,
                            swipeType: this.get("type"),
                            l: 0,
                            r: 0,
                            t: 0,
                            b: 0
                        };
                        e = this.get("clip");
                        h = this.get("invertPlacement");
                        a = q.getMarginBox(this._moveableNode);
                        if ("vertical" === d.swipeType || "horizontal" === d.swipeType) d.layerNode && (c = q.getMarginBox(d.layerNode), f = Math.abs(c.t), g = Math.abs(c.l)), b = q.getMarginBox(this.map.root);
                        "vertical" === d.swipeType ? (h ? c && 0 < c.l ? (d.l = a.l - g, d.r = this.map.width - g) : c && 0 > c.l ? (d.l = a.l + g, d.r = this.map.width + g) : (d.l = a.l, d.r = this.map.width) : c && 0 < c.l ? (d.l = 0 - g, d.r = a.l - g) : c && 0 > c.l ? (d.l = 0 + g, d.r = a.l + g) : (d.l = 0, d.r = a.l), c && 0 < c.t ? (d.t = 0 - f, d.b = b.h - f) : c && 0 > c.t ? (d.t = 0 + f, d.b = b.h + f) : (d.t = 0, d.b = b.h)) : "horizontal" ===
                            d.swipeType ? (h ? c && 0 < c.t ? (d.t = a.t - f, d.b = this.map.height - f) : c && 0 > c.t ? (d.t = a.t + f, d.b = this.map.height + f) : (d.t = a.t, d.b = this.map.height) : c && 0 < c.t ? (d.t = 0 - f, d.b = a.t - f) : c && 0 > c.t ? (d.t = 0 + f, d.b = a.t + f) : (d.t = 0, d.b = a.t), c && 0 < c.l ? (d.l = 0 - g, d.r = b.w - g) : c && 0 > c.l ? (d.l = 0 + g, d.r = b.w + g) : (d.l = 0, d.r = b.w)) : "scope" === d.swipeType && (d.layerGraphics ? (d.l = a.l, d.r = a.w, d.t = a.t, d.b = a.h, "undefined" !== typeof e && (d.l += e, d.r += -(2 * e), d.t += e, d.b += -(2 * e))) : (d.l = a.l, d.r = d.l + a.w, d.t = a.t, d.b = d.t + a.h, "undefined" !== typeof e && (d.l += e, d.r += -e, d.t +=
                                e, d.b += -e)));
                        return d
                    },
                    _clipLayer: function(a) {
                        if (a.layerNode)
                            if (a.layerGraphics) {
                                var c = a.layer._getTransform();
                                c && (c.hasOwnProperty("dx") && (a.l += -c.dx), c.hasOwnProperty("dy") && (a.t += -c.dy));
                                a.layerNode.setClip({
                                    x: a.l,
                                    y: a.t,
                                    width: a.r,
                                    height: a.b
                                })
                            } else {
                                if (c = a.layerNode.style, a && c && a.hasOwnProperty("r") && a.hasOwnProperty("l") && a.hasOwnProperty("t") && a.hasOwnProperty("b")) {
                                    if ("css-transforms" === this.map.navigationMode) {
                                        if (c && (c = this._getTransformValue(c))) c = this._parseTransformValue(c), a.l -= c.x, a.r -=
                                            c.x, a.t -= c.y, a.b -= c.y
                                    } else c && "scope" === a.swipeType && (c = this._parseScopeStyle(c), a.l -= c.x, a.r -= c.x, a.t -= c.y, a.b -= c.y);
                                    c = h("ie");
                                    e.set(a.layerNode, "clip", c && 8 > c ? "rect(" + a.t + "px " + a.r + "px " + a.b + "px " + a.l + "px)" : "rect(" + a.t + "px, " + a.r + "px, " + a.b + "px, " + a.l + "px)")
                                }
                            }
                        else console.log("LayerSwipe::Invalid layer type")
                    },
                    _swipe: function() {
                        if (this.get("loaded") && this.get("enabled")) {
                            var a = {
                                layers: []
                            };
                            if (this.layers && this.layers.length)
                                for (var c = 0; c < this.layers.length; c++) {
                                    var b = this._positionValues(this.layers[c]);
                                    this._clipLayer(b);
                                    a.layers.push({
                                        layer: this.layers[c],
                                        left: b.l,
                                        right: b.r,
                                        top: b.t,
                                        bottom: b.b
                                    })
                                }
                            this.emit("swipe", a)
                        }
                    },
                    _getTransformValue: function(a) {
                        var c, b;
                        if (a) {
                            b = ["transform", "-webkit-transform", "-ms-transform", "-moz-transform", "-o-transform"];
                            for (var e = 0; e < b.length && !(c = a[b[e]]); e++) {
                                try {
                                    c = a.getPropertyValue(b[e])
                                } catch (f) {}
                                if (c) break
                            }
                        }
                        return c
                    },
                    _parseTransformValue: function(a) {
                        var c = {
                            x: 0,
                            y: 0
                        }; - 1 !== a.toLowerCase().indexOf("translate3d") ? a = a.replace("translate3d(", "").replace(")", "").replace(/px/ig,
                            "").replace(/\s/i, "").split(",") : -1 !== a.toLowerCase().indexOf("translate") && (a = a.replace("translate(", "").replace(")", "").replace(/px/ig, "").replace(/\s/i, "").split(","));
                        try {
                            c.x = parseFloat(a[0]), c.y = parseFloat(a[1])
                        } catch (b) {
                            console.log("LayerSwipe::Error parsing transform number")
                        }
                        return c
                    },
                    _parseScopeStyle: function(a) {
                        var c = {
                            x: 0,
                            y: 0
                        };
                        try {
                            c.x = parseFloat(a.left.replace(/px/ig, "").replace(/\s/i, "")), c.y = parseFloat(a.top.replace(/px/ig, "").replace(/\s/i, ""))
                        } catch (b) {
                            console.log("LayerSwipe::Error parsing div style float")
                        }
                        return c
                    },
                    _updateThemeWatch: function(a, c, e) {
                        b.remove(this.domNode, c);
                        b.add(this.domNode, e)
                    },
                    _type: function(a, c) {
                        c && b.remove(this._moveableNode, c);
                        this._setSwipeType();
                        this._setupEvents();
                        this.swipe()
                    },
                    _pauseEvents: function() {
                        if (this._listeners && this._listeners.length)
                            for (var a = 0; a < this._listeners.length; a++) this._listeners[a].pause()
                    },
                    _resumeEvents: function() {
                        if (this._listeners && this._listeners.length)
                            for (var a = 0; a < this._listeners.length; a++) this._listeners[a].resume()
                    },
                    _unclipLayers: function() {
                        if (this.get("loaded") &&
                            this.layers && this.layers.length)
                            for (var a = 0; a < this.layers.length; a++) {
                                var c = this.layers[a]._div,
                                    b = this.layers[a].graphics;
                                c && (b ? c.setClip(null) : (b = h("ie"), e.set(c, "clip", b && 8 > b ? "rect(auto auto auto auto)" : "auto")))
                            }
                    },
                    _invertPlacement: function() {
                        this.swipe()
                    },
                    _enabled: function() {
                        this.get("enabled") ? (e.set(this.domNode, "display", "block"), this._resumeEvents(), this.swipe()) : (this._pauseEvents(), e.set(this.domNode, "display", "none"), this._unclipLayers())
                    }
                })
            })
        },
        "widgets/Swipe/_build-generate_module": function() {
            define(["dojo/text!./Widget.html",
                "dojo/text!./css/style.css", "dojo/i18n!./nls/strings"
            ], function() {})
        },
        "url:esri/dijit/templates/LayerSwipe.html": '\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv title\x3d"${_i18n.widgets.layerSwipe.title}" data-dojo-attach-point\x3d"_moveableNode"\x3e\r\n        \x3cdiv class\x3d"${_css.handleContainer}"\x3e\r\n            \x3cdiv class\x3d"${_css.handle}"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e',
        "url:widgets/Swipe/Widget.html": '\x3cdiv class\x3d"jimu-widget-swipe"\x3e\r\n\t\x3cdiv class\x3d"swipe-layer-menu" data-dojo-attach-point\x3d"swipeLayersMenu" data-dojo-attach-event\x3d"mouseleave:onMenuMouseLeave"\x3e\r\n    \x3cdiv class\x3d"swipe-icon jimu-float-trailing" data-dojo-attach-point\x3d"swipeIcon"\x3e\r\n      \x3cdiv class\x3d"swipe-icon-inner" data-dojo-attach-point\x3d"swipeImg"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\t\t\x3cspan class\x3d"hint" data-dojo-attach-point\x3d"hintNode"\x3e\x3c/span\x3e\r\n\t\t\x3cdiv data-dojo-type\x3d"dijit/form/Select" style\x3d"width:100%" data-dojo-attach-point\x3d"swipeLayers"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"layerSwipe"\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
        "url:widgets/Swipe/css/style.css": '.jimu-widget-swipe {border-radius: 5px; max-width: 350px;}.jimu-widget-swipe .swipe-icon{width: 30px; height: 100%; padding: 5px; cursor: pointer;}.jimu-widget-swipe .swipe-icon .swipe-icon-inner{width: 20px; height: 20px; background-position: center; background-repeat: no-repeat; background-image: url("images/loading.gif");}.jimu-widget-swipe .swipe-icon.swipe-icon-loaded{width: 50px; height: 18px; padding: 0; display: none;}.jimu-widget-swipe .swipe-layer-menu{min-width: 320px; font-size: 14px; color: #686868; padding: 14px; background: #fff; z-index: 50;}.jimu-rtl .jimu-widget-swipe .swipe-layer-menu{right: 32px; left: auto;}.jimu-widget-swipe .swipe-layer-menu .hint{display: inline-block; font-weight: bold; padding-bottom: 10px; width: 100%;}.claro .jimu-widget-swipe .swipe-layer-menu .dijitSelect {color: #7989a0; border-color: #d2dade;}.claro .jimu-widget-swipe .swipe-layer-menu .dijitSelectHover,.claro .jimu-widget-swipe .swipe-layer-menu .dijitSelectFocused {border-color: #759dc0;}.claro .jimu-widget-swipe .swipe-layer-menu .dijitArrowButton{padding: 1px;}.claro .jimu-widget-swipe .swipe-layer-menu .dijitSelect .dijitButtonContents {border-style: none; border-width: 0; background: #fafafc !important;}.claro .jimu-widget-swipe .swipe-layer-menu .dijitSelect .dijitArrowButton {border-style: none; border-width: 0; background: #fafafc !important;}',
        "*now": function(r) {
            r(['dojo/i18n!*preload*widgets/Swipe/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])
        }
    }
});
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/on dojo/Deferred jimu/BaseWidget jimu/LayerInfos/LayerInfos dijit/_WidgetsInTemplateMixin esri/dijit/LayerSwipe dijit/form/Select".split(" "), function(r, m, f, n, p, s, t, k, u, v) {
    return r([t, u], {
        baseClass: "jimu-widget-swipe",
        loaded: !1,
        swipeDijit: null,
        layerInfosObj: null,
        open: !1,
        _isFirst: !0,
        _currentLayerId: null,
        _firstEmitChange: null,
        _loadDef: null,
        postCreate: function() {
            this.inherited(arguments);
            this.own(p(this.swipeLayers, "Change",
                f.hitch(this, this.onSwipeLayersChange)));
            this.own(p(this.swipeLayers, "Click", f.hitch(this, this.onSwipeLayersClick)));
            this.own(p(this.swipeLayers.dropDown.domNode, "mouseenter", f.hitch(this, this.onDropMouseEnter)));
            this.own(p(this.swipeLayers.dropDown.domNode, "mouseleave", f.hitch(this, this.onDropMouseLeave)));
            this.own(p(this.map, "layer-add", f.hitch(this, this._onMainMapBasemapChange)));
            this.swipeLayers.set("disabled", !0)
        },
        _loadLayerInfos: function() {
            var b = new s;
            this._loadDef = b;
            this.loaded ? b.resolve() :
                k.getInstance(this.map, this.map.itemInfo).then(f.hitch(this, function(e) {
                    b.isCanceled() || (this.layerInfosObj = e, this.own(p(e, "layerInfosChanged", f.hitch(this, this.onLayerInfosChanged))), this.own(p(e, "layerInfosIsShowInMapChanged", f.hitch(this, this.onLayerInfosIsShowInMapChanged))), this.hintNode.innerHTML = "scope" === this.config.style ? this.nls.spyglassText : this.nls.swipeText, n.addClass(this.swipeIcon, "swipe-icon-loaded"), this.loaded = !0, b.resolve())
                }));
            return b
        },
        _getVisibleLayerInfos: function(b) {
            var e =
                this.layerInfosObj.getLayerInfoArray();
            return m.filter(e, function(e) {
                return e.isShowInMap() || b && b === e.id
            })
        },
        _setOptionsOfSwipeLayers: function(b) {
            (b = m.map(b, f.hitch(this, function(b) {
                var f = {
                    label: b.title,
                    value: b.id
                };
                f.value === this._currentLayerId && (b.isShowInMap() || (f.label = b.title + "(" + (this.nls.invisible || "invisible") + ")\x26lrm;"), f.selected = !0);
                return f
            }))) && 0 < b.length ? this.swipeLayers.set("options", b) : (b = this.swipeLayers.getOptions(), m.forEach(b, f.hitch(this, function(b) {
                    this.swipeLayers.removeOption(b.value)
                })),
                this.swipeLayers.reset())
        },
        _loadSwipeDijit: function(b) {
            var e = f.clone(this.config);
            e.style || (e.style = "vertical");
            var g = !1;
            if (!this.map.getLayer(e.layer)) {
                var l = null;
                0 < b.length ? l = b[0].id : g = !0;
                e.layer = l
            }
            this.createSwipeDijit(e.style, e.layer, !0, g)
        },
        _enableSwipe: function() {
            this.swipeDijit.enable();
            this.swipeLayers.set("disabled", !1)
        },
        _disableSwipe: function() {
            this.swipeDijit.disable();
            this.swipeLayers.set("disabled", !0)
        },
        onOpen: function() {
            this._loadLayerInfos().then(f.hitch(this, function() {
                if (!this.open &&
                    !this.swipeDijit && this._isFirst) {
                    var b = this._getVisibleLayerInfos();
                    this._loadSwipeDijit(b);
                    this._currentLayerId = this.swipeDijit.layers[0].id;
                    this._setOptionsOfSwipeLayers(b);
                    this._firstEmitChange = !0;
                    this.swipeLayers.set("value", this._currentLayerId);
                    this.swipeLayers.set("disabled", !1);
                    this.open = !0;
                    this._isFirst = !1
                } else this.swipeDijit.enabled ? (this._disableSwipe(), this.open = !1) : (this._enableSwipe(), this.open = !0)
            }))
        },
        onClose: function() {
            this.loaded && this.open ? this._disableSwipe() : this._loadDef.isFulfilled() ||
                this._loadDef.cancel()
        },
        onDropMouseEnter: function() {
            this._mouseOnDropDown = !0
        },
        onDropMouseLeave: function() {
            this._mouseOnDropDown = !1;
            this.swipeLayers.dropDown.onCancel()
        },
        onMenuMouseLeave: function() {
            setTimeout(f.hitch(this, function() {
                if (!this._mouseOnDropDown) this.swipeLayers.dropDown.onCancel()
            }), 10)
        },
        onSwipeLayersChange: function() {
            if (this.swipeDijit) {
                this.destroySwipeDijit();
                var b = this.swipeLayers.get("value");
                this.createSwipeDijit(this.config.style || "vertical", b, this.open, !b);
                !0 === this._firstEmitChange &&
                    (this._firstEmitChange = !1);
                var e = this.layerInfosObj.getLayerInfoById(this._currentLayerId);
                e && !e.isShowInMap() && this.swipeLayers.removeOption(this._currentLayerId);
                this._currentLayerId = b;
                b = n.getMarginBox(this.swipeLayers.domNode);
                350 < b.w + 28 ? n.setStyle(this.domNode, "maxWidth", b.w + 28 + "px") : n.setStyle(this.domNode, "maxWidth", "")
            }
        },
        onSwipeLayersClick: function() {
            if (!this.swipeLayers.disabled) {
                var b = n.getMarginBox(this.swipeLayers.dropDown.domNode);
                console.log(b);
                350 < b.w + 28 && n.setStyle(this.domNode, "maxWidth",
                    b.w + 28 + "px")
            }
        },
        createSwipeDijit: function(b, e, g, l) {
            e = this._getLayerParams(e, l);
            this.swipeDijit = new v({
                enabled: !!g,
                type: b,
                map: this.map,
                layers: e
            }, this.layerSwipe);
            this.swipeDijit.startup();
            n.place(this.swipeDijit.domNode, this.map.root, "before");
            this._shouldHideInfoWindow(e) && this.map.infoWindow.hide();
            this.swipeDijit.on("swipe", f.hitch(this, function(b) {
                b = m.map(b.layers, function(b) {
                    return b.layer
                });
                this._shouldHideInfoWindow(b) && this.map.infoWindow.hide()
            }))
        },
        _shouldHideInfoWindow: function(b) {
            if (!this.map.infoWindow.isShowing) return !1;
            var e = this.map.infoWindow.getSelectedFeature();
            return b && m.some(b, function(b) {
                var f = e && e.getLayer && e.getLayer(),
                    h = this.layerInfosObj.getLayerInfoById(b.id),
                    h = f && h && h.traversal(function(b) {
                        return b.id === f.id
                    });
                return f === b || h
            }, this)
        },
        _getLayerParams: function(b, e) {
            var g = this.layerInfosObj.getLayerInfoById(b),
                l = [];
            e ? (g = this.layerInfosObj.getBasemapLayers(), m.forEach(g, f.hitch(this, function(b) {
                l.push(this.map.getLayer(b.id))
            }))) : g.traversal(f.hitch(this, function(b) {
                (b = this.map.getLayer(b.id)) && l.push(b)
            }));
            return l
        },
        destroySwipeDijit: function() {
            this.swipeDijit && this.swipeDijit.destroy && (this.swipeDijit.destroy(), this.swipeDijit = null, this.layerSwipe = n.create("div", {}, this.swipeLayersMenu, "after"))
        },
        onLayerInfosChanged: function(b, e, f) {
            if (this.swipeDijit) {
                var l = this.swipeLayers.get("value"),
                    h = null;
                this._currentLayerId = f && f.id === l ? null : l || this._currentLayerId;
                var k = this._getVisibleLayerInfos(this._currentLayerId);
                this._setOptionsOfSwipeLayers(k || b);
                "removed" === e ? l === f.id && (this._currentLayerId || k[0] && k[0].id ?
                    h = this._currentLayerId || k[0].id : (this.destroySwipeDijit(), this.createSwipeDijit(this.config.style || "vertical", null, this.open, !0))) : "added" === e && (h = this.swipeDijit.layers[0].id);
                this.swipeLayers.set("value", h)
            }
        },
        onLayerInfosIsShowInMapChanged: function() {
            if (this.swipeDijit) {
                var b = this._getVisibleLayerInfos(this._currentLayerId);
                this._setOptionsOfSwipeLayers(b);
                var e = this.swipeDijit.layers,
                    f = this.layerInfosObj.getBasemapLayers();
                m.every(f, function(b) {
                        return m.some(e, function(e) {
                            return e.id === b.id
                        })
                    }) &&
                    (b && b[0] && b[0].id) && (this.swipeLayers.set("value", b[0].id), this.onSwipeLayersChange())
            }
        },
        _onMainMapBasemapChange: function(b) {
            b.layer && b.layer._basemapGalleryLayerType && (b = this.swipeLayers.get("options"), !(b && 0 < b.length) && this.loaded && (this.destroySwipeDijit(), this.createSwipeDijit(this.config.style || "vertical", null, this.open, !0)))
        },
        destroy: function() {
            this.destroySwipeDijit();
            this.inherited(arguments)
        }
    })
});