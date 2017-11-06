// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "widgets/LayerList/LayerListView": function() {
            define("dijit/_WidgetBase dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-construct dojo/on dojo/query jimu/dijit/CheckBox jimu/dijit/DropMenu ./PopupMenu dijit/_TemplatedMixin dojo/text!./LayerListView.html dojo/dom-class dojo/dom-style ./NlsStrings".split(" "), function(s, q, d, e, g, m, h, p, t, u, r, b, a, f, l) {
                return q([s, r], {
                    templateString: b,
                    _currentSelectedLayerRowNode: null,
                    operationsDropMenu: null,
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.nls = l.value
                    },
                    postCreate: function() {
                        e.forEach(this.operLayerInfos.getLayerInfoArray(), function(c) {
                            this.drawListNode(c, 0, this.layerListTable, !0)
                        }, this);
                        e.forEach(this.operLayerInfos.getTableInfoArray(), function(c) {
                            this.drawListNode(c, 0, this.tableListTable, !0)
                        }, this);
                        this._initOperations()
                    },
                    drawListNode: function(c, k, v) {
                        var n;
                        this.isLayerHiddenInWidget(c) || (0 === c.newSubLayers.length ? (n = this.addLayerNode(c, k, v), this.config.showLegend ? this.addLegendNode(c, k, n.subNode) : (c = h(".showLegend-div", n.currentNode)[0]) &&
                            a.add(c, "hidden")) : (n = this.addLayerNode(c, k, v), e.forEach(c.newSubLayers, d.hitch(this, function(c, k) {
                            this.drawListNode(k, c + 1, n.subNode)
                        }, k))))
                    },
                    addLayerNode: function(c, k, a) {
                        var n = g.create("tr", {
                                "class": "jimu-widget-row layer-row ",
                                layerTrNodeId: c.id
                            }, a),
                            b, l, e, t, h;
                        b = g.create("td", {
                            "class": "col col1"
                        }, n);
                        for (e = 0; e < k; e++) g.create("div", {
                            "class": "begin-blank-div jimu-float-leading",
                            innerHTML: ""
                        }, b);
                        h = g.create("div", {
                            "class": "showLegend-div jimu-float-leading",
                            imageShowLegendDivId: c.id
                        }, b);
                        l = g.create("div", {
                            "class": "div-select jimu-float-leading"
                        }, b);
                        e = new p({
                            checked: c.isVisible(),
                            "class": "visible-checkbox-" + c.id
                        });
                        g.place(e.domNode, l);
                        t = g.create("div", {
                            "class": "noLegend-div jimu-float-leading"
                        }, b);
                        g.create("img", {
                            "class": "noLegend-image",
                            src: this.layerListWidget.folderUrl + (c.isTable ? "images/table.png" : "images/noLegend.png"),
                            alt: "l"
                        }, t);
                        if (c.noLegend || c.isTable) f.set(h, "display", "none"), f.set(l, "display", "none"), f.set(t, "display", "block");
                        f.set(b, "width", 12 * k + 40 + "px");
                        k = g.create("td", {
                                "class": "col col2"
                            },
                            n);
                        b = "";
                        try {
                            c.isInScale() || (b = "grayed-title")
                        } catch (r) {
                            console.warn(r.message)
                        }
                        g.create("div", {
                            innerHTML: c.title,
                            "class": "layer-title-div-" + c.id + " div-content jimu-float-leading " + b
                        }, k);
                        b = g.create("td", {
                            "class": "col col3"
                        }, n);
                        b = g.create("div", {
                            "class": "layers-list-popupMenu-div"
                        }, b);
                        l = (new u({
                            _layerInfo: c,
                            box: this.layerListWidget.domNode.parentNode,
                            popupMenuNode: b,
                            layerListWidget: this.layerListWidget,
                            _config: this.config
                        })).placeAt(b);
                        this.own(m(l, "onMenuClick", d.hitch(this, this._onPopupMenuItemClick,
                            c, l)));
                        a = g.create("tr", {
                            "class": "",
                            layerContentTrNodeId: c.id
                        }, a);
                        a = g.create("td", {
                            "class": "",
                            colspan: "3"
                        }, a);
                        a = g.create("table", {
                            "class": "layer-sub-node",
                            subNodeId: c.id
                        }, a);
                        this.own(m(k, "click", d.hitch(this, this._onRowTrClick, c, h, n, a)));
                        this.own(m(h, "click", d.hitch(this, this._onRowTrClick, c, h, n, a)));
                        this.own(m(n, "mouseover", d.hitch(this, this._onLayerNodeMouseover, n, l)));
                        this.own(m(n, "mouseout", d.hitch(this, this._onLayerNodeMouseout, n, l)));
                        this.own(m(e.domNode, "click", d.hitch(this, this._onCkSelectNodeClick,
                            c, e)));
                        this.own(m(b, "click", d.hitch(this, this._onPopupMenuClick, c, l, n)));
                        return {
                            currentNode: n,
                            subNode: a
                        }
                    },
                    addLegendNode: function(c, k, a) {
                        a = g.create("tr", {
                            "class": "legend-node-tr"
                        }, a);
                        a = g.create("td", {
                            "class": "legend-node-td"
                        }, a);
                        try {
                            var b = c.createLegendsNode();
                            f.set(b, "font-size", 12 * (k + 1) + "px");
                            g.place(b, a)
                        } catch (d) {
                            console.error(d)
                        }
                    },
                    _foldSwitch: function(c, k, a) {
                        return "none" === f.get(a, "display") ? this._foldOrUnfoldLayer(c, !1, k, a) : this._foldOrUnfoldLayer(c, !0, k, a)
                    },
                    _foldOrUnfoldLayer: function(c, k, b,
                        n) {
                        var d = d ? b : h("div[imageShowLegendDivId\x3d'" + c.id + "']", this.layerListTable)[0],
                            l = l ? n : h("table[subNodeId\x3d'" + c.id + "']", this.layerListTable)[0];
                        b = null;
                        d && l && (k ? (f.set(l, "display", "none"), a.remove(d, "unfold"), b = !0) : (f.set(l, "display", "table"), a.add(d, "unfold"), b = !1, c.isLeaf() && (k = h(".legends-div", l)[0], d = h(".legends-loading-img", k)[0], k && d && c.drawLegends(k, this.layerListWidget.appConfig.portalUrl))));
                        return b
                    },
                    redrawLegends: function(c) {
                        var k = h("div[legendsDivId\x3d'" + c.id + "']", this.layerListTable)[0];
                        k && (k._legendDijit && k._legendDijit.destroy && k._legendDijit.destroy(), c.drawLegends(k, this.layerListWidget.appConfig.portalUrl))
                    },
                    _foldOrUnfoldLayers: function(c, k) {
                        e.forEach(c, function(c) {
                            this._foldOrUnfoldLayer(c, k)
                        }, this)
                    },
                    _onCkSelectNodeClick: function(c, k, a) {
                        a.ctrlKey || a.metaKey ? c.isRootLayer() ? this.turnAllRootLayers(k.checked) : this.turnAllSameLevelLayers(c, k.checked) : c.setTopLayerVisible(k.checked);
                        a.stopPropagation()
                    },
                    _onPopupMenuClick: function(c, a, b, d) {
                        this._changeSelectedLayerRow(b);
                        a && "opened" ===
                            a.state ? a.closeDropMenu() : (this._hideCurrentPopupMenu(), a && (this.currentPopupMenu = a, a.openDropMenu()));
                        this.operationsDropMenu && "opened" === this.operationsDropMenu.state && this.operationsDropMenu.closeDropMenu();
                        d.stopPropagation()
                    },
                    _hideCurrentPopupMenu: function() {
                        this.currentPopupMenu && "opened" === this.currentPopupMenu.state && this.currentPopupMenu.closeDropMenu()
                    },
                    _onLayerNodeMouseover: function(c) {
                        a.add(c, "layer-row-mouseover")
                    },
                    _onLayerNodeMouseout: function(c) {
                        a.remove(c, "layer-row-mouseover")
                    },
                    _onLayerListWidgetPaneClick: function() {
                        this.operationsDropMenu &&
                            this.operationsDropMenu.closeDropMenu()
                    },
                    _onRowTrClick: function(c, a, b, d, f) {
                        this._changeSelectedLayerRow(b);
                        a = this._foldSwitch(c, a, d);
                        if (f.ctrlKey || f.metaKey) c.isRootLayer() ? this.foldOrUnfoldAllRootLayers(a) : this.foldOrUnfoldSameLevelLayers(c, a)
                    },
                    _changeSelectedLayerRow: function(c) {
                        this._currentSelectedLayerRowNode && this._currentSelectedLayerRowNode === c || (this._currentSelectedLayerRowNode && a.remove(this._currentSelectedLayerRowNode, "jimu-widget-row-selected"), a.add(c, "jimu-widget-row-selected"), this._currentSelectedLayerRowNode =
                            c)
                    },
                    _onPopupMenuItemClick: function(c, a, b, d) {
                        d = {
                            itemKey: b.key,
                            extraData: d,
                            layerListWidget: this.layerListWidget,
                            layerListView: this
                        };
                        "transparency" === b.key ? "none" === f.get(a.transparencyDiv, "display") ? a.showTransNode(c.getOpacity()) : a.hideTransNode() : (c = a.popupMenuInfo.onPopupMenuClick(d), c.closeMenu && a.closeDropMenu())
                    },
                    _exchangeLayerTrNode: function(c, a) {
                        var b = h("tr[layerTrNodeId\x3d'" + c.id + "']", this.layerListTable)[0],
                            d = h("tr[layerTrNodeId\x3d'" + a.id + "']", this.layerListTable)[0],
                            f = h("tr[layerContentTrNodeId\x3d'" +
                                a.id + "']", this.layerListTable)[0];
                        b && (d && f) && (this.layerListTable.removeChild(d), this.layerListTable.insertBefore(d, b), this.layerListTable.removeChild(f), this.layerListTable.insertBefore(f, b))
                    },
                    _getMovedSteps: function(c, a) {
                        var b = 1,
                            d, f = this.operLayerInfos.getLayerInfoArray();
                        e.forEach(f, function(a, b) {
                            c.id === a.id && (d = b)
                        }, this);
                        if ("moveup" === a)
                            for (; !f[d].isFirst;)
                                if (d--, this.isLayerHiddenInWidget(f[d]) && !f[d].isFirst) b++;
                                else break;
                        else
                            for (; !f[d].isLast;)
                                if (d++, this.isLayerHiddenInWidget(f[d]) && !f[d].isLast) b++;
                                else break;
                        return b
                    },
                    _initOperations: function() {
                        this.operationsDropMenu = (new t({
                            items: [{
                                key: "turnAllLayersOn",
                                label: this.nls.turnAllLayersOn
                            }, {
                                key: "turnAllLayersOff",
                                label: this.nls.turnAllLayersOff
                            }, {
                                key: "separator"
                            }, {
                                key: "expandAllLayers",
                                label: this.nls.expandAllLayers
                            }, {
                                key: "collapseAlllayers",
                                label: this.nls.collapseAlllayers
                            }],
                            box: this.layerListWidget.domNode.parentNode
                        })).placeAt(this.layerListOperations);
                        var c = h("div.jimu-dropmenu \x3e div:first-child", this.layerListOperations)[0];
                        c && (a.remove(c, ["jimu-icon-btn", "popup-menu-button"]), a.add(c, ["feature-action", "icon-operation"]));
                        this.operationsDropMenu.btnNode && this.own(m(this.operationsDropMenu.btnNode, "click", d.hitch(this, this._onLayerListOperationsClick)));
                        this.own(m(this.operationsDropMenu, "onMenuClick", d.hitch(this, this._onOperationsMenuItemClick)))
                    },
                    _onLayerListOperationsClick: function() {
                        this._hideCurrentPopupMenu()
                    },
                    _onOperationsMenuItemClick: function(c) {
                        switch (c.key) {
                            case "turnAllLayersOn":
                                this.turnAllRootLayers(!0);
                                break;
                            case "turnAllLayersOff":
                                this.turnAllRootLayers(!1);
                                break;
                            case "expandAllLayers":
                                this.foldOrUnfoldAllRootLayers(!1);
                                break;
                            case "collapseAlllayers":
                                this.foldOrUnfoldAllRootLayers(!0)
                        }
                    },
                    isFirstDisplayedLayerInfo: function(c) {
                        var a, b;
                        c.isFirst || !c.isRootLayer() ? a = !0 : (a = this._getMovedSteps(c, "moveup"), b = this.operLayerInfos.getLayerInfoArray(), c = this.operLayerInfos._getTopLayerInfoIndexById(c.id), a = this.isLayerHiddenInWidget(b[c - a]) ? !0 : !1);
                        return a
                    },
                    isLastDisplayedLayerInfo: function(c) {
                        var a, b;
                        c.isLast || !c.isRootLayer() ? a = !0 : (a = this._getMovedSteps(c, "movedown"),
                            b = this.operLayerInfos.getLayerInfoArray(), c = this.operLayerInfos._getTopLayerInfoIndexById(c.id), a = this.isLayerHiddenInWidget(b[c + a]) ? !0 : !1);
                        return a
                    },
                    moveUpLayer: function(c) {
                        var a = this._getMovedSteps(c, "moveup");
                        this.layerListWidget._denyLayerInfosReorderResponseOneTime = !0;
                        (a = this.operLayerInfos.moveUpLayer(c, a)) && this._exchangeLayerTrNode(a, c)
                    },
                    moveDownLayer: function(c) {
                        var a = this._getMovedSteps(c, "movedown");
                        this.layerListWidget._denyLayerInfosReorderResponseOneTime = !0;
                        (a = this.operLayerInfos.moveDownLayer(c,
                            a)) && this._exchangeLayerTrNode(c, a)
                    },
                    isLayerHiddenInWidget: function(c) {
                        var a = !1,
                            b = c;
                        if (c && this.config.layerOptions && void 0 !== this.config.layerOptions[c.id])
                            for (; b && !(a = a || !this.config.layerOptions[b.id].display);) b = b.parentLayerInfo;
                        else a = !1;
                        return a
                    },
                    turnAllRootLayers: function(c) {
                        var a = this.operLayerInfos.getLayerInfoArray();
                        e.forEach(a, function(a) {
                            this.isLayerHiddenInWidget(a) || a.setTopLayerVisible(c)
                        }, this)
                    },
                    turnAllSameLevelLayers: function(c, a) {
                        var b = {},
                            f = c.getRootLayerInfo();
                        f.traversal(d.hitch(this,
                            function(d) {
                                d.parentLayerInfo && d.parentLayerInfo.id === c.parentLayerInfo.id && !this.isLayerHiddenInWidget(d) ? b[d.id] = {
                                    visible: a
                                } : b[d.id] = {
                                    visible: d.isVisible()
                                }
                            }));
                        f.resetLayerObjectVisibility(b)
                    },
                    foldOrUnfoldAllRootLayers: function(c) {
                        var a = e.filter(this.operLayerInfos.getLayerInfoArray(), function(c) {
                            return !this.isLayerHiddenInWidget(c)
                        }, this);
                        this._foldOrUnfoldLayers(a, c)
                    },
                    foldOrUnfoldSameLevelLayers: function(c, a) {
                        var b;
                        c.parentLayerInfo && (b = e.filter(c.parentLayerInfo.getSubLayers(), function(c) {
                                return !this.isLayerHiddenInWidget(c)
                            },
                            this), this._foldOrUnfoldLayers(b, a))
                    }
                })
            })
        },
        "jimu/dijit/DropMenu": function() {
            define("dojo/_base/declare dijit/_WidgetBase dojo/_base/lang dojo/_base/array dojo/_base/html dojo/on dojo/Evented ../utils".split(" "), function(s, q, d, e, g, m, h, p) {
                return s([q, h], {
                    baseClass: "jimu-dropmenu",
                    declaredClass: "jimu.dijit.DropMenu",
                    constructor: function() {
                        this.state = "closed"
                    },
                    postCreate: function() {
                        this.btnNode = g.create("div", {
                            "class": "popup-menu-button"
                        }, this.domNode);
                        this.own(m(this.btnNode, "click", d.hitch(this, this._onBtnClick)));
                        this.box || (this.box = this.domNode.parentNode);
                        this.own(m(this.box, "click", d.hitch(this, function() {
                            this.dropMenuNode && this.closeDropMenu()
                        })))
                    },
                    _onBtnClick: function(d) {
                        d.stopPropagation();
                        this.dropMenuNode || this._createDropMenuNode();
                        "closed" === this.state ? this.openDropMenu() : this.closeDropMenu()
                    },
                    _createDropMenuNode: function() {
                        this.dropMenuNode = g.create("div", {
                            "class": "drop-menu",
                            style: {
                                display: "none"
                            }
                        }, this.domNode);
                        this.items || (this.items = []);
                        e.forEach(this.items, function(e) {
                            var h;
                            e.key && "separator" ===
                                e.key ? g.create("hr", {
                                    "class": "menu-item-identification menu-item-line",
                                    itemId: e.key
                                }, this.dropMenuNode) : e.key && (h = g.create("div", {
                                    "class": "menu-item-identification menu-item",
                                    itemId: e.key,
                                    innerHTML: e.label
                                }, this.dropMenuNode), this.own(m(h, "click", d.hitch(this, function(d) {
                                    this.selectItem(e, d)
                                }))))
                        }, this)
                    },
                    _getDropMenuPosition: function() {
                        var d = g.getContentBox(this.box),
                            e = g.getMarginBox(this.domNode),
                            h = g.getMarginBox(this.btnNode),
                            b = g.getMarginBox(this.dropMenuNode),
                            a = {},
                            f, l;
                        a.l = e.l;
                        a.t = e.t + h.h;
                        a.t +
                            b.h > d.h && (l = e.t, f = d.h - e.t - h.h, f = Math.max(l, f), f === l && (a.t = 0 - b.h));
                        a.l + b.w > d.w && (b = e.l, d = d.w - e.l - h.w, f = Math.max(b, d), f === b && (a.l = "", a.r = 0));
                        a.left = a.l;
                        a.top = a.t;
                        a.right = a.r;
                        return a
                    },
                    selectItem: function(d) {
                        this.closeDropMenu();
                        this.emit("onMenuClick", d)
                    },
                    openDropMenu: function() {
                        this.state = "opened";
                        g.setStyle(this.dropMenuNode, "display", "");
                        g.setStyle(this.dropMenuNode, p.getPositionStyle(this._getDropMenuPosition()));
                        this.emit("onOpenMenu")
                    },
                    closeDropMenu: function() {
                        this.state = "closed";
                        g.setStyle(this.dropMenuNode,
                            "display", "none");
                        this.emit("onCloseMenu")
                    }
                })
            })
        },
        "widgets/LayerList/PopupMenu": function() {
            define("dojo/_base/declare dojo/_base/array dojo/_base/html dojo/_base/lang dojo/query dojo/Deferred jimu/dijit/DropMenu jimu/dijit/LoadingIndicator dijit/_TemplatedMixin dijit/form/HorizontalSlider dijit/form/HorizontalRuleLabels dojo/text!./PopupMenu.html dojo/dom-style ./NlsStrings ./PopupMenuInfo".split(" "), function(s, q, d, e, g, m, h, p, t, u, r, b, a, f, l) {
                return s([h, t], {
                    templateString: b,
                    popupMenuInfo: null,
                    loading: null,
                    _deniedItems: null,
                    _deniedItemsFromConfig: null,
                    _layerInfo: null,
                    constructor: function() {
                        this.nls = f.value
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._initDeniedItems();
                        this.loading = new p({
                            hidden: !0
                        });
                        this.loading.placeAt(this.popupMenuNode);
                        this.hasContentMenu() || this.hide()
                    },
                    _initDeniedItems: function() {
                        var c = [],
                            a = {
                                ZoomTo: "zoomto",
                                Transparency: "transparency",
                                EnableOrDisablePopup: "controlPopup",
                                MoveupOrMovedown: "moveup movedown",
                                OpenAttributeTable: "table",
                                DescriptionOrShowItemDetailsOrDownload: "url"
                            };
                        this._deniedItems = [];
                        this._deniedItemsFromConfig = [];
                        for (var b in this._config.contextMenu) this._config.contextMenu.hasOwnProperty(b) && ("function" !== typeof this._config.contextMenu[b] && !1 === this._config.contextMenu[b]) && (c = c.concat(a[b].split(" ")));
                        q.forEach(c, e.hitch(this, function(c) {
                            this._deniedItemsFromConfig.push({
                                key: c,
                                denyType: "hidden"
                            })
                        }))
                    },
                    _getDropMenuPosition: function() {
                        return {
                            top: "40px",
                            right: "0px",
                            zIndex: 1
                        }
                    },
                    _getTransNodePosition: function() {
                        return {
                            top: "28px",
                            right: "2px"
                        }
                    },
                    _onBtnClick: function() {},
                    _refresh: function() {
                        this._denyItems();
                        this._changeItemsUI()
                    },
                    _denyItems: function() {
                        var c = g("[class~\x3d'menu-item-identification']", this.dropMenuNode);
                        c.forEach(function(a) {
                            d.removeClass(a, "menu-item-dissable");
                            d.removeClass(a, "menu-item-hidden")
                        }, this);
                        d.removeClass(this.dropMenuNode, "no-border");
                        q.forEach(this._deniedItems, function(a) {
                            var c = g("div[itemId\x3d'" + a.key + "']", this.dropMenuNode)[0];
                            c && ("disable" === a.denyType ? (d.addClass(c, "menu-item-dissable"), "url" === a.key && g(".menu-item-description",
                                c).forEach(function(a) {
                                d.setAttr(a, "href", "#");
                                d.removeAttr(a, "target")
                            })) : d.addClass(c, "menu-item-hidden"))
                        }, this);
                        for (var a = -1, b = 0; b < c.length; b++) d.hasClass(c[b], "menu-item-line") && (-1 === a || d.hasClass(c[a], "menu-item-line")) && d.addClass(c[b], "menu-item-hidden"), d.hasClass(c[b], "menu-item-hidden") || (a = b);
                        c = q.filter(c, function(a) {
                            return !d.hasClass(a, "menu-item-hidden")
                        });
                        0 === c.length ? d.addClass(this.dropMenuNode, "no-border") : (d.removeClass(this.dropMenuNode, "no-border"), d.hasClass(c[c.length - 1], "menu-item-line") &&
                            d.addClass(c[c.length - 1], "menu-item-hidden"))
                    },
                    _changeItemsUI: function() {
                        var a = g("[itemid\x3dcontrolPopup]", this.dropMenuNode)[0];
                        a && this._layerInfo.controlPopupInfo && (this._layerInfo.controlPopupInfo.enablePopup ? d.setAttr(a, "innerHTML", this.nls.removePopup) : d.setAttr(a, "innerHTML", this.nls.enablePopup))
                    },
                    selectItem: function(a, b) {
                        for (var d = !1, f = 0; f < this._deniedItems.length; f++)
                            if (this._deniedItems[f].key === a.key) {
                                d = !0;
                                break
                            }
                        d || this.emit("onMenuClick", a);
                        b.stopPropagation(b)
                    },
                    openDropMenu: function() {
                        var a =
                            e.hitch(this, this.inherited, arguments),
                            b = new m;
                        this.loading.show();
                        this.dropMenuNode ? b.resolve(this.popupMenuInfo) : l.create(this._layerInfo, this.layerListWidget).then(e.hitch(this, function(a) {
                            this.items = a.getDisplayItems();
                            this.popupMenuInfo = a;
                            this._createDropMenuNode();
                            b.resolve(this.popupMenuInfo)
                        }));
                        b.then(e.hitch(this, function() {
                            this.popupMenuInfo.getDeniedItems().then(e.hitch(this, function(b) {
                                    this._deniedItems = this._deniedItemsFromConfig.concat(b);
                                    this._refresh();
                                    a(arguments);
                                    this.loading.hide()
                                }),
                                e.hitch(this, function() {
                                    this.loading.hide()
                                }))
                        }), e.hitch(this, function() {
                            this.loading.hide()
                        }))
                    },
                    closeDropMenu: function() {
                        this.inherited(arguments);
                        this.hideTransNode()
                    },
                    _onTransparencyDivClick: function(a) {
                        a.stopPropagation()
                    },
                    showTransNode: function(c) {
                        this.transHorizSlider || (this._createTransparencyWidget(), this.transHorizSlider.set("value", 1 - c));
                        a.set(this.transparencyDiv, "top", this._getTransNodePosition().top);
                        isRTL ? a.set(this.transparencyDiv, "left", this._getTransNodePosition().right) : a.set(this.transparencyDiv,
                            "right", this._getTransNodePosition().right);
                        a.set(this.transparencyDiv, "display", "block")
                    },
                    hideTransNode: function() {
                        a.set(this.transparencyDiv, "display", "none")
                    },
                    _createTransparencyWidget: function() {
                        this.transHorizSlider = new u({
                            minimum: 0,
                            maximum: 1,
                            intermediateChanges: !0
                        }, this.transparencyBody);
                        this.own(this.transHorizSlider.on("change", e.hitch(this, function(a) {
                            this.emit("onMenuClick", {
                                key: "transparencyChanged"
                            }, {
                                newTransValue: a
                            })
                        })));
                        new r({
                            container: "bottomDecoration"
                        }, this.transparencyRule)
                    },
                    hide: function() {
                        a.set(this.domNode,
                            "display", "none")
                    },
                    show: function() {
                        a.set(this.domNode, "display", "block")
                    },
                    hasContentMenu: function() {
                        var a = !1,
                            b;
                        if (this._config.contextMenu)
                            for (b in this._config.contextMenu) this._config.contextMenu.hasOwnProperty(b) && "function" !== typeof this._config.contextMenu[b] && (a = a || this._config.contextMenu[b]);
                        else a = !0;
                        return a
                    }
                })
            })
        },
        "widgets/LayerList/NlsStrings": function() {
            define([], function() {
                return {
                    value: null
                }
            })
        },
        "widgets/LayerList/PopupMenuInfo": function() {
            define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/Deferred dojo/promise/all jimu/portalUrlUtils jimu/WidgetManager esri/lang esri/graphicsUtils ./NlsStrings".split(" "),
                function(s, q, d, e, g, m, h, p, t, u) {
                    var r = s([], {
                        _candidateMenuItems: null,
                        _displayItems: null,
                        _layerInfo: null,
                        _layerType: null,
                        _appConfig: null,
                        constructor: function(b, a, d, l) {
                            this.nls = u.value;
                            this._layerInfo = b;
                            this._layerType = d;
                            this.layerListWidget = l;
                            this._initCandidateMenuItems();
                            this._initDisplayItems(a)
                        },
                        _getATagLabel: function() {
                            var b, a;
                            b = this._layerInfo.isItemLayer && this._layerInfo.isItemLayer();
                            a = this._layerInfo.getUrl();
                            b ? (b = m.getItemDetailsPageUrl(m.getStandardPortalUrl(this.layerListWidget.appConfig.portalUrl),
                                b), a = this.nls.itemShowItemDetails) : a && ("CSVLayer" === this._layerType || "KMLLayer" === this._layerType) ? (b = a, a = this.nls.itemDownload) : (b = a && "WMSLayer" === this._layerType ? a + (-1 < a.indexOf("?") ? "\x26" : "?") + "SERVICE\x3dWMS\x26REQUEST\x3dGetCapabilities" : a && "WFSLayer" === this._layerType ? a + (-1 < a.indexOf("?") ? "\x26" : "?") + "SERVICE\x3dWFS\x26REQUEST\x3dGetCapabilities" : a ? a : "", a = this.nls.itemDesc);
                            return '\x3ca class\x3d"menu-item-description" target\x3d"_blank" href\x3d"' + b + '"\x3e' + a + "\x3c/a\x3e"
                        },
                        _initCandidateMenuItems: function() {
                            this._candidateMenuItems = [{
                                key: "separator",
                                label: ""
                            }, {
                                key: "empty",
                                label: this.nls.empty
                            }, {
                                key: "zoomto",
                                label: this.nls.itemZoomTo
                            }, {
                                key: "transparency",
                                label: this.nls.itemTransparency
                            }, {
                                key: "moveup",
                                label: this.nls.itemMoveUp
                            }, {
                                key: "movedown",
                                label: this.nls.itemMoveDown
                            }, {
                                key: "table",
                                label: this.nls.itemToAttributeTable
                            }, {
                                key: "controlPopup",
                                label: this.nls.removePopup
                            }, {
                                key: "url",
                                label: this._getATagLabel()
                            }]
                        },
                        _initDisplayItems: function(b) {
                            this._displayItems = [];
                            q.forEach(b, function(a) {
                                q.forEach(this._candidateMenuItems, function(b) {
                                    a.key ===
                                        b.key && (this._displayItems.push(d.clone(b)), a.onClick && (this._displayItem.onClick = a.onClick))
                                }, this)
                            }, this)
                        },
                        _isSupportedByAT: function() {
                            return !0
                        },
                        _isSupportedByAT_bk: function(b, a) {
                            var d;
                            d = b.config;
                            d = 0 === d.layerInfos.length ? !0 : q.some(d.layerInfos, function(a) {
                                if (a.id === this._layerInfo.id && a.show) return !0
                            }, this);
                            return !a.isSupportedLayer || !a.isSupportQuery || a.otherReasonCanNotSupport || !d ? !1 : !0
                        },
                        getDeniedItems: function() {
                            var b = new e,
                                a = [];
                            this.layerListWidget.layerListView.isFirstDisplayedLayerInfo(this._layerInfo) &&
                                a.push({
                                    key: "moveup",
                                    denyType: "disable"
                                });
                            this.layerListWidget.layerListView.isLastDisplayedLayerInfo(this._layerInfo) && a.push({
                                key: "movedown",
                                denyType: "disable"
                            });
                            this._layerInfo.getUrl() || a.push({
                                key: "url",
                                denyType: "disable"
                            });
                            var f = this._layerInfo.loadInfoTemplate(),
                                l = this._layerInfo.getSupportTableInfo();
                            g({
                                infoTemplate: f,
                                supportTableInfo: l
                            }).then(d.hitch(this, function(c) {
                                c.infoTemplate || a.push({
                                    key: "controlPopup",
                                    denyType: "disable"
                                });
                                c = c.supportTableInfo;
                                var d = this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];
                                !d || !d.visible ? a.push({
                                    key: "table",
                                    denyType: "hidden"
                                }) : this._isSupportedByAT(d, c) || (this._layerInfo.parentLayerInfo && this._layerInfo.parentLayerInfo.isMapNotesLayerInfo() ? a.push({
                                    key: "table",
                                    denyType: "hidden"
                                }) : a.push({
                                    key: "table",
                                    denyType: "disable"
                                }));
                                b.resolve(a)
                            }), function() {
                                b.resolve(a)
                            });
                            return b
                        },
                        getDisplayItems: function() {
                            return this._displayItems
                        },
                        onPopupMenuClick: function(b) {
                            var a = {
                                closeMenu: !0
                            };
                            switch (b.itemKey) {
                                case "zoomto":
                                    this._onItemZoomToClick(b);
                                    break;
                                case "moveup":
                                    this._onMoveUpItemClick(b);
                                    break;
                                case "movedown":
                                    this._onMoveDownItemClick(b);
                                    break;
                                case "table":
                                    this._onTableItemClick(b);
                                    break;
                                case "transparencyChanged":
                                    this._onTransparencyChanged(b);
                                    a.closeMenu = !1;
                                    break;
                                case "controlPopup":
                                    this._onControlPopup()
                            }
                            return a
                        },
                        _onItemZoomToClick: function(b) {
                            this._layerInfo.getExtent().then(d.hitch(this, function(a) {
                                var b = null;
                                a = a && 0 < a.length && a[0];
                                this._isValidExtent(a) && (b = a);
                                b ? this._layerInfo.map.setExtent(b) : 0 <= this._layerInfo.map.graphicsLayerIds.indexOf(this._layerInfo.id) && this._layerInfo.getLayerObject().then(d.hitch(this,
                                    function(a) {
                                        if (a.graphics && 0 < a.graphics.length) {
                                            try {
                                                b = t.graphicsExtent(a.graphics)
                                            } catch (c) {
                                                console.error(c)
                                            }
                                            b && this._layerInfo.map.setExtent(b)
                                        }
                                    }))
                            }))
                        },
                        _isValidExtent: function(b) {
                            var a = !1;
                            p.isDefined(b) && p.isDefined(b.xmin) && (isFinite(b.xmin) && p.isDefined(b.ymin) && isFinite(b.ymin) && p.isDefined(b.xmax) && isFinite(b.xmax) && p.isDefined(b.ymax) && isFinite(b.ymax)) && (a = !0);
                            return a
                        },
                        _onMoveUpItemClick: function(b) {
                            this._layerInfo.isFirst || b.layerListView.moveUpLayer(this._layerInfo)
                        },
                        _onMoveDownItemClick: function(b) {
                            this._layerInfo.isLast ||
                                b.layerListView.moveDownLayer(this._layerInfo)
                        },
                        _onTableItemClick: function(b) {
                            this._layerInfo.getSupportTableInfo().then(d.hitch(this, function(a) {
                                var f = this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];
                                this._isSupportedByAT(f, a) && (a = h.getInstance(), a.triggerWidgetOpen(f.id).then(d.hitch(this, function() {
                                    b.layerListWidget.publishData({
                                        target: "AttributeTable",
                                        layer: this._layerInfo
                                    })
                                })))
                            }))
                        },
                        _onTransparencyChanged: function(b) {
                            this._layerInfo.setOpacity(1 - b.extraData.newTransValue)
                        },
                        _onControlPopup: function(b) {
                            this._layerInfo.controlPopupInfo.enablePopup ? this._layerInfo.disablePopup() : this._layerInfo.enablePopup();
                            this._layerInfo.map.infoWindow.hide()
                        }
                    });
                    r.create = function(b, a) {
                        var f = new e,
                            l = b.isRootLayer(),
                            c = {
                                RootLayer: [{
                                    key: "zoomto"
                                }, {
                                    key: "transparency"
                                }, {
                                    key: "separator"
                                }, {
                                    key: "moveup"
                                }, {
                                    key: "movedown"
                                }, {
                                    key: "separator"
                                }, {
                                    key: "url"
                                }],
                                RootLayerAndFeatureLayer: [{
                                        key: "zoomto"
                                    }, {
                                        key: "transparency"
                                    }, {
                                        key: "separator"
                                    }, {
                                        key: "controlPopup"
                                    }, {
                                        key: "separator"
                                    }, {
                                        key: "moveup"
                                    }, {
                                        key: "movedown"
                                    },
                                    {
                                        key: "separator"
                                    }, {
                                        key: "table"
                                    }, {
                                        key: "separator"
                                    }, {
                                        key: "url"
                                    }
                                ],
                                FeatureLayer: [{
                                    key: "controlPopup"
                                }, {
                                    key: "separator"
                                }, {
                                    key: "table"
                                }, {
                                    key: "separator"
                                }, {
                                    key: "url"
                                }],
                                GroupLayer: [{
                                    key: "url"
                                }],
                                Table: [{
                                    key: "table"
                                }, {
                                    key: "separator"
                                }, {
                                    key: "url"
                                }],
                                "default": [{
                                    key: "url",
                                    onClick: null
                                }]
                            };
                        b.getLayerType().then(d.hitch(this, function(d) {
                            var e = "",
                                e = l && ("FeatureLayer" === d || "CSVLayer" === d || "ArcGISImageServiceLayer" === d || "StreamLayer" === d || "ArcGISImageServiceVectorLayer" === d) ? "RootLayerAndFeatureLayer" : l ? "RootLayer" :
                                "FeatureLayer" === d || "CSVLayer" === d ? "FeatureLayer" : "GroupLayer" === d ? "GroupLayer" : "Table" === d ? "Table" : "default";
                            f.resolve(new r(b, c[e], d, a))
                        }), d.hitch(this, function() {
                            f.resolve(new r(b, [{
                                key: "empty"
                            }]))
                        }));
                        return f
                    };
                    return r
                })
        },
        "widgets/LayerList/_build-generate_module": function() {
            define(["dojo/text!./Widget.html", "dojo/text!./css/style.css", "dojo/i18n!./nls/strings"], function() {})
        },
        "url:widgets/LayerList/PopupMenu.html": '\x3cdiv\x3e\r\n  \x3cdiv class\x3d"popup-menu-transparency-body" data-dojo-attach-point\x3d"transparencyDiv" data-dojo-attach-event\x3d"onclick:_onTransparencyDivClick" \x3e\r\n    \x3cdiv class\x3d"label"\x3e\r\n      \x3cdiv class\x3d"label-left jimu-float-leading"\x3e${nls.itemOpaque}\x3c/div\x3e\r\n      \x3cdiv class\x3d"label-right jimu-float-trailing"\x3e${nls.itemTransparent}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"transparencyBody"\x3e \r\n      \x3col data-dojo-attach-point\x3d"transparencyRule" class\x3d"transparency-rule"\x3e \x3c/ol\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3cdiv\x3e\r\n',
        "url:widgets/LayerList/LayerListView.html": '\x3cdiv\x3e\r\n  \x3cdiv class\x3d"layer-list-operations" data-dojo-attach-point\x3d"layerListOperations"\x3e\r\n    \x3c!--div class\x3d"setting-image jimu-icon jimu-icon-setting jimu-state-disabled"\x3e\x3c/div--\x3e\r\n  \x3c/div\x3e\r\n  \x3ctable class\x3d"layer-list-table"\x3e\r\n    \x3ctbody class\x3d"layers-list-body" data-dojo-attach-point\x3d"layerListTable"\x3e\x3c/tbody\x3e\r\n    \x3ctbody class\x3d"layers-list-body" data-dojo-attach-point\x3d"tableListTable"\x3e\x3c/tbody\x3e       \r\n  \x3c/table\x3e\r\n\x3c/div\x3e\r\n',
        "url:widgets/LayerList/Widget.html": '\x3cdiv\x3e\r\n  \x3cdiv class\x3d"layers-section" data-dojo-attach-point\x3d"layersSection"\x3e\r\n    \x3cdiv class\x3d"layer-list-title"\x3e${nls.titleLayers}\x3c/div\x3e\r\n    \x3cdiv class\x3d"layer-list-body" data-dojo-attach-point\x3d"layerListBody"\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:widgets/LayerList/css/style.css": '.jimu-widget-layerList{position: relative;}.jimu-widget-layerList .jimu-hr{margin-top: 15px;}.jimu-widget-layerList .layers-section{margin-top: 0px; z-index: 0; position: relative;}.jimu-widget-layerList .layers-section .layers-list{width: 100%;}.jimu-widget-layerList .layers-section .layer-list-title{height: 16px; font-size: 14px; color: #000000; margin-bottom: 14px; font-family: "Avenir Heavy"; margin-left: 8px; margin-right: 8px;}.jimu-widget-layerList .layer-list-body {}.jimu-widget-layerList .layer-list-table{width: 100%; border-spacing: 0px;}.jimu-widget-layerList .layers-list-body{border: 0px solid #999;}.jimu-widget-layerList .jimu-widget-row{}.jimu-widget-layerList .layer-row{background-color: #ffffff; height: 40px;}.jimu-widget-layerList .layer-row-mouseover{background-color: #e3ecf2;}.jimu-widget-layerList .jimu-widget-row-selected{background-color: #d9dde0;;}.jimu-widget-layerList .jimu-widget-row-active{background-color: #009cff;}.jimu-widget-layerList .jimu-widget-row-selected .col-layer-label{color: #333;}.jimu-widget-layerList .jimu-widget-row-active .col-layer-label{color: #fff;}.jimu-widget-layerList .col{border: 0px solid; border-bottom: 0px solid #ffffff;}.jimu-widget-layerList .col1{}.jimu-widget-layerList .col2{width: auto; word-break: break-word; cursor: pointer;}.jimu-widget-layerList .col3{width: 24px;}.jimu-widget-layerList .begin-blank-div{width: 12px; height: 2px;}.jimu-widget-layerList .col-showLegend{width: 17px; text-align: center;}.jimu-widget-layerList .showLegend-div{width: 13px; height: 13px; cursor: pointer; margin-left: 3px; margin-top: 3px; background-image: url("../images/v_right.png"); background-repeat: no-repeat; background-position: center;}.jimu-rtl .layer-selector .showLegend-div{background-image: url("../images/v_left.png"); margin-left: 0; margin-right: 3px;} .jimu-widget-layerList .showLegend-div.unfold{background-image: url("../images/v.png");}.jimu-widget-layerList .showLegend-div.hidden{background-image: none; cursor: auto;}.jimu-widget-layerList .layers-list-imageShowLegend-down{-moz-transform: scale(1) rotate(270deg) translateX(0px) translateY(0px) skewX(0deg) skewY(0deg); -webkit-transform: scale(1) rotate(270deg) translateX(0px) translateY(0px) skewX(0deg) skewY(0deg); -o-transform: scale(1) rotate(270deg) translateX(0px) translateY(0px) skewX(0deg) skewY(0deg); -ms-transform: scale(1) rotate(270deg) translateX(0px) translateY(0px) skewX(0deg) skewY(0deg); transform: scale(1) rotate(270deg) translateX(0px) translateY(0px) skewX(0deg) skewY(0deg);}.jimu-widget-layerList .layers-list-imageShowLegend-down-div{background-color: #d9dde0;}.jimu-widget-layerList .noLegend-div{width: 33px; text-align: right; display: none;}.jimu-widget-layerList .noLegend-image{display: block; margin: 0 auto;}.jimu-widget-layerList .col-blank{width:17px;}.jimu-widget-layerList .col-select{width: 17px;}.jimu-widget-layerList .col-reserve-blank{width: 25px;}.jimu-widget-layerList .col-content{color: #686868; font-size: 12px;}.jimu-widget-layerList .div-select{position: relative; font-size: 2px;}.jimu-widget-layerList .div-select .checkbox{cursor: auto;}.jimu-widget-layerList .div-content{position: relative; color: #000000; font-size: 12px; border: 0px solid;}.jimu-widget-layerList .div-content.grayed-title{opacity: 0.3;}.jimu-widget-layerList .col-popupMenu{width: 17px; text-align: center;}.jimu-widget-layerList .col-select .jimu-selection-box{margin-top: 5px;}.jimu-widget-layerList .layers-list-body .col-layer-label{color: #686868;}.jimu-widget-layerList .layer-sub-node{display: none; width:100%; border-spacing: 0px;}.jimu-widget-layerList .legend-node-td{}.jimu-widget-layerList .legend-div{overflow: hidden; font-size: 11px;}.jimu-widget-layerList .legend-symbol{}.jimu-widget-layerList .legend-label{margin-top: 17px; color: #686868; font-size: 11px;}.jimu-widget-layerList .esriLegendService {padding-bottom: 0;}.jimu-widget-layerList .esriLegendLayerLabel {padding-top: 0; height: 0; display: none;}.jimu-widget-layerList .esriLegendServiceLabel {display: none;}.jimu-widget-layerList .esriLegendLayer{font-size: 12px;}.jimu-widget-layerList .esriLegendMsg{display: none;}.jimu-widget-layerList .layers-list-popupMenu-div{position: relative; width: 22px; height: 40px; cursor: pointer; border-radius: 2px; float: right; padding-top: 14px;}.jimu-widget-layerList .layers-list-popupMenu-div .loading-section {width: 17px; height: 17px; top: 14px; left: 2px; z-index: 1; margin: 0;} .jimu-rtl .jimu-widget-layerList .layers-list-popupMenu-div .loading-section {left: auto; right: 2px;}.jimu-widget-layerList .layers-list-popupMenu-div .jimu-loading{width: 17px; height: 17px; margin: 0; border-radius: 25px;}.jimu-rtl .jimu-widget-layerList .layers-list-popupMenu-div .jimu-loading{}.jimu-widget-layerList .layers-list-popupMenu-div-selected{width: 13px; height: 13px; background-color: #ffffff; border-radius: 2px;}.jimu-widget-layerList .layers-list-popupMenu-image{position: absolute; top: 5px; left: 3px;}.jimu-widget-layerList .popup-menu-transparency-body {position: absolute; background-color: #ffffff; box-shadow: 0px 0px 4px 2px rgba(177, 177, 177, 0.5); outline-width:1px; width: 220px; height:50px; padding-left: 2%; padding-right: 2%; color: #686868; z-index: 2; font-size: 12px; display: none;}.jimu-widget-layerList .popup-menu-transparency-body .transparency-rule{}.jimu-widget-layerList .popup-menu-transparency-body .label {overflow: hidden; margin-top: 2px; margin-bottom: 1px;}.jimu-widget-layerList .jimu-dropmenu .popup-menu-button{width: 22px; height: 22px;}.jimu-widget-layerList .jimu-dropmenu .jimu-icon-btn{width: 22px; height: 22px; min-width: 13px; background-image: url("../images/more_normal.svg"); background-color: rgba(255, 255, 255, 0); border: 0 solid;}.jimu-widget-layerList .layers-list-popupMenu-div:hover .jimu-icon-btn{background-image: url("../images/more_hover.svg"); border: 0 solid; box-shadow: none;}.jimu-widget-layerList .jimu-dropmenu .jimu-icon-btn-selected{background-image: url("../images/more_hover.svg"); border: 0 solid; box-shadow: none;}.jimu-widget-layerList .jimu-dropmenu .drop-menu{min-width: 180px; max-width: 250px; outline-color:#ffffff; outline-style:solid; outline-width:1px; overflow:auto; color: #000000; font-size: 12px; z-index: 2; right: 0px; background-color: #ffffff; box-shadow: 0px 0px 4px 2px rgba(177, 177, 177, 0.5); outline-style: none;}.jimu-widget-layerList .jimu-dropmenu .drop-menu hr{border-bottom: 1px solid #d7dbde !important;}.jimu-widget-layerList .jimu-dropmenu .drop-menu.no-border{outline-style: none; border: none; box-shadow: none;}.jimu-rtl .jimu-widget-layerList .jimu-dropmenu .drop-menu{left: 0px;}.jimu-widget-layerList .jimu-dropmenu .menu-item{position: relative; height: 40px; line-height: 40px; white-space: nowrap; padding: 0px 24px; margin: 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}.jimu-widget-layerList .jimu-dropmenu .menu-item:hover{color: #000000; text-decoration: initial; background-color: #f3f3f3; font-family: "Avenir Medium";}.jimu-widget-layerList .jimu-dropmenu .menu-item-dissable{opacity: 0.4;}.jimu-widget-layerList .jimu-dropmenu .menu-item-hidden{display: none;}.jimu-widget-layerList .jimu-dropmenu .menu-item a{position: absolute; padding: 0 24px; width: 100%; left: 0;}.jimu-rtl .jimu-widget-layerList .jimu-dropmenu .menu-item a{right: auto; left: 0;}.jimu-widget-layerList .legends-loading-img{width: 45px;}.jimu-widget-layerList .jimu-dropmenu .menu-item .menu-item-description{text-decoration: none; color: inherit; display: block;}.jimu-widget-layerList .layer-list-operations{position: absolute; right: 0; top: 0;}.jimu-rtl .jimu-widget-layerList .layer-list-operations{right: auto; left: 0;}.jimu-widget-layerList .layer-list-operations .setting-image{position: relative; right: 11px; top: -1px;}.jimu-rtl .jimu-widget-layerList .layer-list-operations .setting-image{right: auto; left: 11px;}.jimu-widget-layerList .layer-list-operations .jimu-icon-btn{background-image: url("../images/operation_normal.svg"); background-color: rgba(255, 255, 255, 0);}.jimu-rtl .jimu-widget-layerList .layer-list-operations .jimu-icon-btn{left: auto; right: -8px;}.jimu-widget-layerList .layer-list-operations:hover .jimu-icon-btn{background-image: url("../images/operation_hover.svg"); border: 0 solid; box-shadow: none;}.jimu-widget-layerList .layer-list-operations .drop-menu{min-width:147px !important; top: 21px !important; right: 0 !important; left: auto !important; z-index: 1 !important; background-color: #ffffff; box-shadow: 0px 0px 4px 2px rgba(177, 177, 177, 0.5); outline-style: none !important;}.jimu-rtl .jimu-widget-layerList .layer-list-operations .drop-menu{right: auto !important; left: 0 !important;}.jimu-widget-layerList .layer-list-operations .drop-menu hr{border-bottom: 1px solid #d7dbde !important;}.jimu-widget-layerList .layer-list-operations .drop-menu .menu-item{margin: 0; padding: 0 7px; font-size: 12px; padding: 0 20px;}.jimu-widget-layerList .layer-list-operations .drop-menu .menu-item:hover{text-decoration: initial; background-color: #f3f3f3;}',
        "*now": function(s) {
            s(['dojo/i18n!*preload*widgets/LayerList/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])
        }
    }
});
define("jimu/BaseWidget dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/dom dojo/on dojo/query dijit/registry ./LayerListView ./NlsStrings jimu/LayerInfos/LayerInfos".split(" "), function(s, q, d, e, g, m, h, p, t, u, r, b) {
    return q([s], {
        baseClass: "jimu-widget-layerList",
        name: "layerList",
        _denyLayerInfosReorderResponseOneTime: null,
        layerListView: null,
        operLayerInfos: null,
        startup: function() {
            this.inherited(arguments);
            r.value = this.nls;
            this._denyLayerInfosReorderResponseOneTime = !1;
            if (this.map.itemId) b.getInstance(this.map,
                this.map.itemInfo).then(d.hitch(this, function(a) {
                this.operLayerInfos = a;
                this.showLayers();
                this.bindEvents();
                m.setSelectable(this.layersSection, !1)
            }));
            else {
                var a = this._obtainMapLayers();
                b.getInstance(this.map, a).then(d.hitch(this, function(a) {
                    this.operLayerInfos = a;
                    this.showLayers();
                    this.bindEvents();
                    m.setSelectable(this.layersSection, !1)
                }))
            }
        },
        destroy: function() {
            this._clearLayers();
            this.inherited(arguments)
        },
        _obtainMapLayers: function() {
            var a = [],
                b = [],
                d = {
                    itemData: {
                        baseMap: {
                            baseMapLayers: []
                        },
                        operationalLayers: []
                    }
                };
            e.forEach(this.map.graphicsLayerIds, function(a) {
                a = this.map.getLayer(a);
                a.isOperationalLayer && b.push({
                    layerObject: a,
                    title: a.label || a.title || a.name || a.id || " ",
                    id: a.id || " "
                })
            }, this);
            e.forEach(this.map.layerIds, function(c) {
                c = this.map.getLayer(c);
                c.isOperationalLayer ? b.push({
                    layerObject: c,
                    title: c.label || c.title || c.name || c.id || " ",
                    id: c.id || " "
                }) : a.push({
                    layerObject: c,
                    id: c.id || " "
                })
            }, this);
            d.itemData.baseMap.baseMapLayers = a;
            d.itemData.operationalLayers = b;
            return d
        },
        showLayers: function() {
            this.layerListView =
                (new u({
                    operLayerInfos: this.operLayerInfos,
                    layerListWidget: this,
                    config: this.config
                })).placeAt(this.layerListBody)
        },
        _clearLayers: function() {
            this.layerListView && this.layerListView.destroyRecursive && this.layerListView.destroyRecursive()
        },
        _refresh: function() {
            this._clearLayers();
            this.showLayers()
        },
        bindEvents: function() {
            this.own(h(this.operLayerInfos, "layerInfosChanged", d.hitch(this, this._onLayerInfosChanged)));
            this.own(h(this.operLayerInfos, "tableInfosChanged", d.hitch(this, this._onLayerInfosChanged)));
            this.own(this.operLayerInfos.on("layerInfosIsVisibleChanged", d.hitch(this, this._onLayerInfosIsVisibleChanged)));
            this.own(h(this.operLayerInfos, "updated", d.hitch(this, this._onLayerInfosObjUpdated)));
            this.own(h(this.operLayerInfos, "layerInfosReorder", d.hitch(this, this._onLayerInfosReorder)));
            this.own(h(this.map, "zoom-end", d.hitch(this, this._onZoomEnd)));
            this.own(h(this.operLayerInfos, "layerInfosRendererChanged", d.hitch(this, this._onLayerInfosRendererChanged)))
        },
        _onLayerInfosChanged: function() {
            this._refresh()
        },
        _onLayerInfosIsVisibleChanged: function(a) {
            e.forEach(a, function(a) {
                p("[class~\x3d'visible-checkbox-" + a.id + "']", this.domNode).forEach(function(b) {
                    b = t.byNode(b);
                    a.isVisible() ? b.check() : b.uncheck()
                }, this)
            }, this)
        },
        _onLayerInfosObjUpdated: function() {
            this._refresh()
        },
        _onZoomEnd: function() {
            this.operLayerInfos.traversal(d.hitch(this, function(a) {
                p("[class~\x3d'layer-title-div-" + a.id + "']", this.domNode).forEach(function(b) {
                        try {
                            a.isInScale() ? g.removeClass(b, "grayed-title") : g.addClass(b, "grayed-title")
                        } catch (d) {
                            console.warn(d.message)
                        }
                    },
                    this)
            }))
        },
        _onLayerInfosReorder: function() {
            this._denyLayerInfosReorderResponseOneTime ? this._denyLayerInfosReorderResponseOneTime = !1 : this._refresh()
        },
        _onLayerInfosRendererChanged: function(a) {
            try {
                e.forEach(a, function(a) {
                    this.layerListView.redrawLegends(a)
                }, this)
            } catch (b) {
                this._refresh()
            }
        },
        onAppConfigChanged: function(a, b, d) {
            this.appConfig = a
        }
    })
});