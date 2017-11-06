// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "esri/dijit/editing/Editor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/kernel dojo/has dojo/query dojo/DeferredList dojo/dom-class dojo/dom-construct dojo/string dijit/_Widget dijit/_Templated ../../domUtils ../../graphicsUtils ../../geometry/Polyline ../../geometry/Polygon ../../graphic ../../undoManager ../../tasks/query ../../layers/FeatureLayer ../../layers/FeatureTemplate ../../toolbars/draw ../../toolbars/edit ../AttributeInspector ./Util ./Add ./Update ./Delete ./Cut ./Union ./toolbars/Drawing ./SelectionHelper ./TemplatePicker ../../kernel ../../config dojo/i18n!../../nls/jsapi dojo/text!./templates/Editor.html dijit/ProgressBar dojo/NodeList-dom".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E, A, D, G, F, C, K, L, N, M, P, O, J, Q) {
                    var I = p([s, t], {
                        declaredClass: "esri.dijit.editing.Editor",
                        widgetsInTemplate: !0,
                        templateString: Q,
                        onLoad: function() {},
                        constructor: function(a, c) {
                            a = a || {};
                            a.settings || console.error("Editor: please provide 'settings' parameter in the constructor");
                            a.settings.layerInfos || console.error("Editor: please provide 'layerInfos' parameter in the constructor");
                            this._settings = a.settings;
                            this._eConnects = []
                        },
                        startup: function() {
                            this.inherited(arguments);
                            this._setDefaultOptions();
                            var a = this._settings.layerInfos;
                            if (k.every(a, function(a) {
                                    return a.featureLayer.loaded
                                })) this._initLayers(), this._connectEvents(), this._createWidgets(), this.onLoad(), this.loaded = !0;
                            else {
                                var c = a.length;
                                k.forEach(a, function(a) {
                                    a = a.featureLayer;
                                    if (a.loaded) c--;
                                    else var g = f.connect(a, "onLoad", this, function(a) {
                                        f.disconnect(g);
                                        g = null;
                                        c--;
                                        c || (this._initLayers(), this._connectEvents(), this._createWidgets(), this.onLoad(), this.loaded = !0)
                                    })
                                }, this)
                            }
                            this._reset();
                            this._enableMapClickHandler()
                        },
                        stopEditing: function(a) {
                            this._updateCurrentFeature(m.hitch(this, function() {
                                this._clearSelection(!1);
                                a && a()
                            }))
                        },
                        destroy: function() {
                            this.drawingToolbar && this.drawingToolbar.destroy();
                            this.attributeInspector && this.attributeInspector.destroy();
                            this.templatePicker && this.templatePicker.destroy();
                            this._selectionHelper && this._selectionHelper.destroy();
                            this._drawToolbar && this._drawToolbar.deactivate();
                            this._reset();
                            this._disableMapClickHandler();
                            k.forEach(this._eConnects, f.disconnect);
                            f.disconnect(this._dtConnect);
                            f.disconnect(this._templatePickerOnSelectionChangeEvent);
                            this._layer = this._currentGraphic = this._activeType = this._activeTemplate = this._drawingTool = this._drawToolbar = this.editToolbar = this.drawingToolbar = this.attributeInspector = this.templatePicker = this.undoManager = null;
                            this._settings.map.infoWindow && this._settings.map.infoWindow.clearFeatures && this._settings.map.infoWindow.clearFeatures();
                            this.inherited(arguments)
                        },
                        _setDefaultOptions: function() {
                            this._drawToolbar = this._settings.drawToolbar || new x(this._settings.map);
                            this._settings.drawToolbar = this._drawToolbar;
                            this.editToolbar = this._settings.editToolbar || new z(this._settings.map, {
                                textSymbolEditorHolder: this.domNode
                            });
                            this._settings.editToolbar = this.editToolbar;
                            this._settings.toolbarVisible = this._settings.toolbarVisible || !1;
                            this._settings.toolbarOptions = m.mixin({
                                reshapeVisible: !1,
                                cutVisible: !1,
                                mergeVisible: !1
                            }, this._settings.toolbarOptions);
                            this._settings.createOptions = m.mixin({
                                polylineDrawTools: [I.CREATE_TOOL_POLYLINE],
                                polygonDrawTools: [I.CREATE_TOOL_POLYGON],
                                editAttributesImmediately: !0
                            }, this._settings.createOptions);
                            this._settings.singleSelectionTolerance = this._settings.singleSelectionTolerance || 3;
                            this._settings.maxUndoRedoOperations = this._settings.maxUndoRedoOperations || 10;
                            this._settings.editor = this;
                            this._usePopup = this._settings.usePopup = this._settings.map.infoWindow._setPagerCallbacks ? !0 : !1;
                            this._datePackage = this._settings.datePackage;
                            var a = O.defaults;
                            this._settings.geometryService = this._settings.geometryService || a.geometryService;
                            a.geometryService =
                                a.geometryService || this._settings.geometryService
                        },
                        _initLayers: function() {
                            this._settings.layers = [];
                            this._settings.userIds = {};
                            this._settings.createOnlyLayer = {};
                            k.forEach(this._settings.layerInfos, function(a) {
                                if (a.featureLayer && a.featureLayer.loaded) {
                                    this._settings.layers.push(a.featureLayer);
                                    var c = a.featureLayer.id;
                                    a.featureLayer.credential && (this._settings.userIds[c] = a.featureLayer.credential.userId);
                                    a.userId && (this._settings.userIds[c] = a.userId);
                                    var g = a.featureLayer.getEditCapabilities();
                                    this._settings.createOnlyLayer[c] =
                                        g.canCreate && !g.canUpdate ? !0 : !1;
                                    this._isTextSymbolPointLayer(a.featureLayer) && (a.disableAttributeUpdate = !0)
                                }
                            }, this)
                        },
                        _reset: function() {
                            this._hideAttributeInspector();
                            this.editToolbar.deactivate();
                            this._editVertices = !0;
                            this._drawingTool = this._activeTemplate = this._activeType = this._currentGraphic = this._layer = null;
                            this._attributeChanged = !1
                        },
                        _saveFeatureOnClient: function(a) {
                            var c = this.templatePicker.getSelected(),
                                g;
                            g = c.template ? c.featureLayer.renderer.getSymbol(c.template.prototype) : c.symbolInfo.symbol;
                            this._tempGraphic = new r(a, g, null, null);
                            this._tempGraphic.setAttributes(m.mixin({}, c.template.prototype.attributes));
                            g = this._settings.map;
                            g.graphics.add(this._tempGraphic);
                            a = this._findCenterPoint(a);
                            this._createAttributeInspector(!0);
                            g.infoWindow.setTitle(c.featureLayer ? c.featureLayer.name : J.widgets.attributeInspector.NLS_title);
                            this.attributeInspector.showFeature(this._tempGraphic, c.featureLayer);
                            this._showInfoWindow(a, g.getInfoWindowAnchor(a));
                            this._settings.createOnlyLayer[c.featureLayer.id] && (this._infoWindowHideEvent =
                                f.connect(g.infoWindow, "onHide", this, "_infoWindowHide"));
                            f.disconnect(this._templatePickerOnSelectionChangeEvent);
                            this.templatePicker.clearSelection();
                            this._drawToolbar.deactivate();
                            this._enableMapClickHandler();
                            this.drawingToolbar && this.drawingToolbar.deactivate();
                            this._templatePickerOnSelectionChangeEvent = f.connect(this.templatePicker, "onSelectionChange", m.hitch(this, "_onCreateFeature"))
                        },
                        _saveAttributesOnClient: function(a, c, g) {
                            this._tempGraphic.attributes[c] = "number" === typeof g && isNaN(g) ? null :
                                g
                        },
                        _infoWindowHide: function() {
                            this._createFeature(this._tempGraphic.geometry, this._tempGraphic.attributes);
                            f.disconnect(this._infoWindowHideEvent)
                        },
                        _createFeature: function(a, c) {
                            this._editClickPoint = this._findCenterPoint(a);
                            a.rings ? this._simplify(a, m.hitch(this, function(a) {
                                this._drawingTool !== v.TOOL_AUTO_COMPLETE_POLYGON ? this._applyEdits([{
                                    layer: this._layer,
                                    adds: [this._createGraphic(a, c)]
                                }], m.hitch(this, function() {
                                    this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField],
                                        this._oEdits[0].layer)
                                })) : this._autoComplete(a, m.hitch(this, function(a) {
                                    a && a.length && this._applyEdits([{
                                        layer: this._layer,
                                        adds: k.map(a, m.hitch(this, function(a) {
                                            return this._createGraphic(a, c)
                                        }))
                                    }], function() {
                                        this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField], this._oEdits[0].layer)
                                    })
                                }))
                            })) : this._applyEdits([{
                                layer: this._layer,
                                adds: [this._createGraphic(a, c)]
                            }], m.hitch(this, function() {
                                this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField],
                                    this._oEdits[0].layer);
                                this._layer && (this._layer.renderer && "heatmap" === this._layer.renderer.type) && this._layer.refresh()
                            }))
                        },
                        _chainAttachment: function(a, c) {
                            this.attributeInspector && (this.attributeInspector._attachmentEditor && this.attributeInspector._attachmentEditor._tempUpload) && this.attributeInspector._attachmentEditor._chainAttachment(a, c)
                        },
                        _updateCurrentFeature: function(a) {
                            var c = this._isModified();
                            c ? this._updateFeature(c, a) : a && a(!1)
                        },
                        _updateFeature: function(a, c, g) {
                            var h = a.geometry;
                            a.getLayer().hasM ||
                                g && !this._isModified() ? (g = new r, g.setAttributes(a.attributes), this._applyEdits([{
                                    layer: a.getLayer(),
                                    updates: [g]
                                }], c)) : h.rings ? this._simplify(h, m.hitch(this, function(g) {
                                    this._applyEdits([{
                                        layer: a.getLayer(),
                                        updates: [m.mixin(a, {
                                            geometry: g
                                        })]
                                    }], c)
                                })) : this._applyEdits([{
                                    layer: a.getLayer(),
                                    updates: [a]
                                }], c)
                        },
                        _deleteFeature: function(a, c) {
                            var g = [];
                            a ? g.push({
                                layer: a.getLayer(),
                                deletes: [a]
                            }) : (g = k.map(k.filter(this._settings.layers, function(a) {
                                return 0 < a.getSelectedFeatures().length
                            }), function(a) {
                                return {
                                    layer: a,
                                    deletes: a.getSelectedFeatures()
                                }
                            }), (!g || !g.length) && this._currentGraphic && g.push({
                                layer: this._layer,
                                deletes: [this._currentGraphic]
                            }));
                            this._applyEdits(g, c)
                        },
                        _stopEditing: function(a, c, r, h) {
                            u.hide(this.progressBar.domNode);
                            this._undoRedoAdd();
                            var b;
                            !0 === a._isSelOnly || 1 === a.mode || 6 === a.mode ? c && c.length && (this.templatePicker.clearSelection(), b = new g, b.objectIds = [c[0].objectId], this._settings.createOnlyLayer[a.id] ? this._settings.map.graphics.remove(this._tempGraphic) : this._selectFeatures([a], b, m.hitch(this,
                                "_onEditFeature"))) : ((b = this._selectionHelper.findMapService(this._settings.map, a)) && b.refresh(), c && c.length && (this.templatePicker.clearSelection(), this._settings.createOnlyLayer[a.id] ? this._settings.map.graphics.remove(this._tempGraphic) : A.findFeatures(c, a, m.hitch(this, "_onEditFeature"))));
                            h && h.length && (this._clearSelection(!0), this._undoRedo && (b = this._selectionHelper.findMapService(a, this._settings.map)) && b.refresh());
                            this._undoRedo && (r && r.length) && ((b = this._selectionHelper.findMapService(a, this._settings.map)) &&
                                b.refresh(), this.attributeInspector.refresh(), this._undoRedo = !1);
                            this.drawingToolbar && this.drawingToolbar._updateUI();
                            this._undoRedo = !1
                        },
                        _undoRedoAdd: function() {
                            this._settings._isApplyEditsCall = !1;
                            if (this._settings.undoManager) {
                                var a = this._edits && this._edits.length ? this._edits[0] : null;
                                if (a) {
                                    var c = a.adds || [],
                                        g = a.updates || [],
                                        r = a.deletes || [],
                                        h = a.preUpdates || [],
                                        a = {
                                            featureLayer: a.layer
                                        };
                                    if ("CUT" === this._activeTool) c.length && (g.length && h.length) && this.undoManager.add(new C(m.mixin(a, {
                                        preUpdatedGraphics: h,
                                        addedGraphics: c,
                                        postUpdatedGraphics: g
                                    })));
                                    else if ("UNION" === this._activeTool) r.length && (g.length && h.length) && this.undoManager.add(new K(m.mixin(a, {
                                        preUpdatedGraphics: h,
                                        deletedGraphics: r,
                                        postUpdatedGraphics: g
                                    })));
                                    else if (c.length) this.undoManager.add(new D(m.mixin(a, {
                                        addedGraphics: c
                                    })));
                                    else if (r.length) this.undoManager.add(new F(m.mixin(a, {
                                        deletedGraphics: r
                                    })));
                                    else if (g.length && (this._rollbackGraphic || h.length)) this.undoManager.add(new G(m.mixin(a, {
                                        preUpdatedGraphics: h.length ? h : [this._rollbackGraphic],
                                        postUpdatedGraphics: g
                                    })));
                                    this._rollbackGraphic = this._edits = null
                                }
                            }
                        },
                        _activateDrawToolbar: function(a) {
                            this._layer = a.featureLayer;
                            this._activeType = a.type;
                            this._drawingTool = (this._activeTemplate = a.template) ? this._activeTemplate.drawingTool : null;
                            this._drawTool = this._toDrawTool(this._drawingTool, a.featureLayer);
                            f.disconnect(this._dtConnect);
                            this._dtConnect = this._settings.createOnlyLayer[a.featureLayer.id] ? f.connect(this._drawToolbar, "onDrawEnd", this, "_saveFeatureOnClient") : f.connect(this._drawToolbar,
                                "onDrawEnd", this, "_createFeature");
                            this.editToolbar.deactivate();
                            this._disableMapClickHandler();
                            this.drawingToolbar ? this.drawingToolbar.activateEditing(this._drawTool, this._layer) : this._drawToolbar.activate(this._drawTool)
                        },
                        _activateEditToolbar: function(a, c) {
                            var g = a.getLayer(),
                                h = g ? g.geometryType : null,
                                b = this._isTextSymbolPoint(a),
                                e = z.MOVE;
                            "esriGeometryPoint" !== h && !0 === this._isNotesFeature(a) ? (e = e | z.ROTATE | z.SCALE, this._editVertices = !1) : "esriGeometryPoint" !== h && !0 === this._editVertices ? (e = e | z.ROTATE |
                                z.SCALE, this._editVertices = !1) : b ? (e = e | z.ROTATE | z.SCALE | z.EDIT_TEXT, this._editVertices = !1) : (e |= z.EDIT_VERTICES, this._editVertices = !0);
                            this._attributeChanged = this._isModified();
                            this._rollbackGraphic = new r(a.toJson());
                            var h = g.getEditCapabilities({
                                    feature: a,
                                    userId: this._settings.userIds[g.id]
                                }),
                                q = k.filter(this._settings.layerInfos, function(a) {
                                    return a.featureLayer.layerId === g.layerId
                                })[0];
                            h.canUpdate && (!q.disableGeometryUpdate && g.allowGeometryUpdates) && (this.editToolbar.activate(e, a), b && (this.editToolbar._textEditor._addTextBox(a),
                                this.editToolbar._textSymbolEditor && this.editToolbar._textSymbolEditor.hide()));
                            !this._settings.map.infoWindow.isShowing && !this._updateAttributeDisabled(a) && (b = c && c.screenPoint || this._findCenterPoint(a), this._showInfoWindow(b, this._settings.map.getInfoWindowAnchor(b)))
                        },
                        _createGraphic: function(a, c) {
                            var g = new r(a, this._activeType && this._activeType.symbol || this._layer.defaultSymbol, c);
                            this._activeTemplate || c ? g.attributes = c || m.mixin({}, this._activeTemplate.prototype.attributes) : (g.attributes = g.attributes || [], k.forEach(this._layer.fields, function(a) {
                                g.attributes[a.name] = null
                            }, this));
                            return g
                        },
                        _connectEvents: function() {
                            var a = this._settings.layers;
                            k.forEach(a, function(a) {
                                this._connect(a, "onEditsComplete", m.hitch(this, "_stopEditing", a))
                            }, this);
                            k.forEach(a, function(a) {
                                this._connect(a, "onBeforeApplyEdits", m.hitch(this, function() {
                                    u.show(this.progressBar.domNode);
                                    this._settings._isApplyEditsCall = !0
                                }))
                            }, this);
                            this._connect(this.editToolbar, "onGraphicClick", m.hitch(this, "_activateEditToolbar"));
                            this._connect(this.editToolbar,
                                "onGraphicFirstMove", m.hitch(this, "_hideAttributeInspector"));
                            this._connect(this.editToolbar, "onVertexFirstMove", m.hitch(this, "_hideAttributeInspector"));
                            this._connect(this.editToolbar, "onScaleStart", m.hitch(this, "_hideAttributeInspector"));
                            this._connect(this.editToolbar, "onRotateStart", m.hitch(this, "_hideAttributeInspector"))
                        },
                        _connect: function(a, c, g) {
                            this._eConnects.push(f.connect(a, c, g))
                        },
                        _createWidgets: function() {
                            this._selectionHelper = new N(this._settings);
                            this._createTemplatePicker();
                            this._createAttributeInspector();
                            this._createDrawingToolbar();
                            this._createUndoRedoManager()
                        },
                        _createTemplatePicker: function() {
                            if (this._settings.templatePicker) this.templatePicker = this._settings.templatePicker, u.hide(this.templatePickerDiv);
                            else {
                                var a = k.filter(this._settings.layers, function(a) {
                                    return a.getEditCapabilities().canCreate
                                });
                                this.templatePicker = new M({
                                    "class": "esriTemplatePicker",
                                    featureLayers: a,
                                    showTooltip: !0,
                                    maxLabelLength: this._settings.typesCharacterLimit,
                                    columns: "auto",
                                    rows: "auto"
                                }, this.templatePickerDiv);
                                this.templatePicker.startup();
                                this._settings.templatePicker = this.templatePicker
                            }
                            this._templatePickerOnSelectionChangeEvent = f.connect(this.templatePicker, "onSelectionChange", m.hitch(this, "_onCreateFeature"))
                        },
                        _createAttributeInspector: function(a) {
                            if (this._settings.attributeInspector) this._customAttributeInspector = !0, this.attributeInspector = this._settings.attributeInspector;
                            else {
                                this._customAttributeInspector = !1;
                                var c = this._settings.map;
                                this.attributeInspector = new E({
                                    layerInfos: this._settings.layerInfos,
                                    hideNavButtons: this._usePopup,
                                    datePackage: this._datePackage
                                }, l.create("div"));
                                this.attributeInspector.startup();
                                c.infoWindow.setContent(this.attributeInspector.domNode);
                                c.infoWindow.setTitle(J.widgets.attributeInspector.NLS_title);
                                c.infoWindow.resize(350, 375);
                                d.query(".esriAttributeInspector .atiLayerName").style({
                                    display: "none"
                                })
                            }
                            this._connect(this.attributeInspector, "onDelete", m.hitch(this, "_deleteFeature"));
                            this._connect(this.attributeInspector, "onNext", m.hitch(this, function(a) {
                                this._updateCurrentFeature(m.hitch(this, function() {
                                    this._attributeChanged = !1;
                                    this._onEditFeature(a)
                                }))
                            }));
                            this._usePopup && this._settings.map.infoWindow._setPagerCallbacks(this.attributeInspector, m.hitch(this.attributeInspector, "next"), m.hitch(this.attributeInspector, "previous"));
                            a ? this._connect(this.attributeInspector, "onAttributeChange", m.hitch(this, "_saveAttributesOnClient")) : this._connect(this.attributeInspector, "onAttributeChange", m.hitch(this, function(a, c, g) {
                                var h = a.getLayer();
                                (h = k.filter(h.fields, function(a) {
                                    return a.name === c
                                })[0]) && "" === g && (g = null);
                                this._rollbackGraphic =
                                    new r(m.clone(a.toJson()));
                                this.attributeInspector._rollbackInfo = {
                                    field: h,
                                    graphic: this._rollbackGraphic
                                };
                                this._currentGraphic.attributes[c] = "number" === typeof g && isNaN(g) ? null : g;
                                this._currentGraphic.setAttributes(this._currentGraphic.attributes);
                                this._updateFeature(this._currentGraphic, null, !0);
                                this._attributeChanged = !1
                            }))
                        },
                        _createDrawingToolbar: function() {
                            !0 === this._settings.toolbarVisible && (this.drawingToolbar = new L({
                                "class": "esriDrawingToolbar",
                                drawToolbar: this._drawToolbar,
                                editToolbar: this.editToolbar,
                                settings: this._settings,
                                onDelete: m.hitch(this, "_deleteFeature"),
                                onApplyEdits: m.hitch(this, "_applyEdits"),
                                onShowAttributeInspector: m.hitch(this, "_onEditFeature")
                            }, this.drawingToolbarDiv))
                        },
                        _createUndoRedoManager: function() {
                            if (this._settings.enableUndoRedo || this._settings.undoManager) this._settings.enableUndoRedo = !0, this.undoManager = this._settings.undoManager, this.undoManager || (this.undoManager = this._settings.undoManager = new B({
                                maxOperations: this._settings.maxUndoRedoOperations
                            })), this._connect(this.undoManager,
                                "onUndoComplete", m.hitch(this, this._updateUndoRedoOperations)), this._connect(this.undoManager, "onRedoComplete", m.hitch(this, this._updateUndoRedoOperations)), this._connect(document, "onkeypress", m.hitch(this, function(a) {
                                if (a.metaKey || a.ctrlKey) "z" === a.charOrCode && this._undo(), "y" === a.charOrCode && this._redo()
                            }))
                        },
                        _updateUndoRedoOperations: function(a) {
                            if (a && a.addedIds) {
                                var c;
                                for (c = 0; c < this.undoManager.length; c++) {
                                    var g = this.undoManager.get(c);
                                    g && a.layer === g._featureLayer && g.updateObjectIds(a.oldIds, a.addedIds)
                                }
                            }
                            a &&
                                "Update Features" === a.operation.label && this.attributeInspector.refresh()
                        },
                        _enableMapClickHandler: function() {
                            this._mapClickHandler = f.connect(this._settings.map, "onClick", m.hitch(this, function(a) {
                                this._drawToolbar._geometryType || ("SELECT" === this._activeTool ? this._activeTool = "" : this._updateCurrentFeature(m.hitch(this, function() {
                                    this._reset();
                                    this._updateSelection(a)
                                })))
                            }))
                        },
                        _disableMapClickHandler: function() {
                            f.disconnect(this._mapClickHandler)
                        },
                        _onCreateFeature: function() {
                            var a = this.templatePicker.getSelected();
                            a ? this._updateCurrentFeature(m.hitch(this, function() {
                                this._currentGraphic && this._clearSelection(!1);
                                this._reset();
                                this._activateDrawToolbar(a)
                            })) : (this._reset(), f.disconnect(this._dtConnect), this._drawToolbar.deactivate(), this._enableMapClickHandler(), this.drawingToolbar && this.drawingToolbar.deactivate())
                        },
                        _isTextSymbolPoint: function(a) {
                            if ("point" === a.geometry.type || "multipoint" === a.geometry.type) {
                                var c = a.getLayer(),
                                    g = c.renderer;
                                a = a.symbol || c._getSymbol(a);
                                if (!a && (g.hasVisualVariables("sizeInfo", !1) || g.hasVisualVariables("colorInfo", !1) || g.hasVisualVariables("opacityInfo", !1)) && g.addBreak && g.infos && 1 === g.infos.length) a = g.infos[0].symbol || g.defaultSymbol;
                                if (a && "textsymbol" === a.type) return !0
                            }
                            return !1
                        },
                        _isTextSymbolPointLayer: function(a) {
                            return "esriGeometryPoint" === a.geometryType && a.renderer && a.renderer._symbols && a.renderer._symbols[0] && a.renderer._symbols[0].symbol && "textsymbol" === a.renderer._symbols[0].symbol.type ? !0 : !1
                        },
                        _updateAttributeDisabled: function(a) {
                            a = a.getLayer();
                            if (!a) return !1;
                            var c,
                                g, r = !1;
                            for (c = 0; c < this._settings.layerInfos.length; c++)
                                if (g = this._settings.layerInfos[c], g.featureLayer == a) {
                                    r = g.disableAttributeUpdate;
                                    break
                                }
                            return r
                        },
                        _onEditFeature: function(a, g) {
                            if (a = (m.isArray(a) ? a[0] : a) || null) {
                                this._layer = a.getLayer();
                                if (!this._customAttributeInspector && !this._updateAttributeDisabled(a)) {
                                    g = g || this._editClickPoint || this._findCenterPoint(a);
                                    if (1 < this._currentFeatureCount) {
                                        this._popupFeatures.indexOf(a);
                                        var r = this._currentFeatureCount - this._popupFeatures.indexOf(a) + 1;
                                        r > this._currentFeatureCount &&
                                            (r = 1);
                                        this._settings.map.infoWindow.setTitle(c.substitute(J.widgets.popup.NLS_pagingInfo, {
                                            index: r,
                                            total: this._currentFeatureCount
                                        }))
                                    } else this._settings.map.infoWindow.setTitle(this._layer ? this._layer.name : J.widgets.attributeInspector.NLS_title);
                                    (this.drawingToolbar || !this._settings.map.infoWindow.isShowing) && this._showInfoWindow(g, this._settings.map.getInfoWindowAnchor(g));
                                    this._editClickPoint = null
                                }
                                a !== this._currentGraphic && (this._editVertices = !0, this._currentGraphic = a, a.getDojoShape() && a.getDojoShape().moveToFront(),
                                    this._layer.hasM || this._activateEditToolbar(a))
                            }
                        },
                        _applyEdits: function(c, g) {
                            c = c || [];
                            if (!(0 >= c.length)) {
                                this._edits = this._oEdits = c;
                                var r = [];
                                k.forEach(c, function(a) {
                                    a.layer && r.push(a.layer.applyEdits(a.adds, a.updates, a.deletes))
                                });
                                0 < r.length && (this._deferredsList = (new a(r)).addCallback(m.hitch(this, function() {
                                    u.hide(this.progressBar.domNode);
                                    g && g();
                                    var a = this._settings.map;
                                    a && (a.infoWindow.reposition && a.infoWindow.isShowing) && a.infoWindow.reposition()
                                })))
                            }
                        },
                        _undo: function() {
                            this._settings.undoManager &&
                                !this._settings._isApplyEditsCall && (this.editToolbar.deactivate(), this._undoRedo = !0, this._settings.undoManager.undo())
                        },
                        _redo: function() {
                            this._settings.undoManager && !this._settings._isApplyEditsCall && (this.editToolbar.deactivate(), this._undoRedo = !0, this._settings.undoManager.redo())
                        },
                        _simplify: function(a, c) {
                            h.prototype.isSelfIntersecting(a) ? this._settings.geometryService.simplify([a], function(a) {
                                var g = a && a.length ? a[0] : g;
                                c && c(g)
                            }) : c && c(a)
                        },
                        _autoComplete: function(a, c) {
                            var r = this._getLayers("esriGeometryPolygon"),
                                h = new g;
                            h.geometry = a;
                            h.returnGeometry = !0;
                            this._selectFeatures(r, h, m.hitch(this, function(g) {
                                !g || 0 >= g.length ? c && c([a]) : this._settings.geometryService.autoComplete(q.getGeometries(g), this._toPolylines([h.geometry]), function(a) {
                                    c && c(a)
                                })
                            }))
                        },
                        _getLayers: function(a) {
                            return k.filter(this._settings.layers, function(c) {
                                return c.geometryType === a
                            })
                        },
                        _selectFeatures: function(a, c, g, r) {
                            this._selectionHelper.selectFeatures(a, c, r || y.SELECTION_NEW, g)
                        },
                        _updateSelection: function(a) {
                            var c = a.mapPoint,
                                r = a.graphic;
                            r && r.getLayer() &&
                                !this._isValidLayer(r.getLayer()) ? this._clearSelection() : (this._selectionHelper.selectFeaturesByGeometry(this._settings.layers, c, y.SELECTION_NEW, m.hitch(this, function(a) {
                                    var h = k.some(a, m.hitch(this, function(a) {
                                        return a == r
                                    }));
                                    r && !h ? (a = r.getLayer(), this._isValidLayer(a) ? (h = new g, h.objectIds = [r.attributes[a.objectIdField]], this._selectionHelper.selectFeatures([a], h, y.SELECTION_ADD, m.hitch(this, function(a) {
                                        this._updatePopupButtons(a);
                                        this._onEditFeature(a, c)
                                    }))) : this._clearSelection()) : a && a.length ? (this._updatePopupButtons(a),
                                        this._onEditFeature(a, c)) : this._clearSelection()
                                })), r && this._isTextSymbolPoint(r) && (a = 0 | z.MOVE | z.ROTATE | z.SCALE | z.EDIT_TEXT, this.editToolbar.activate(a, r)))
                        },
                        _updatePopupButtons: function(a) {
                            if (!this._usePopup || !a) this._currentFeatureCount = this._popupFeatures = null;
                            else {
                                var c = a.length;
                                k.forEach([this._settings.map.infoWindow._prevFeatureButton, this._settings.map.infoWindow._nextFeatureButton], m.hitch(this, function(a) {
                                    1 < c ? n.remove(a, "hidden") : n.add(a, "hidden")
                                }));
                                var g = 1 < c ? "block" : "none";
                                d.query(".esriAttributeInspector .atiLayerName").style({
                                    display: g
                                });
                                this._currentFeatureCount = c;
                                this._popupFeatures = a
                            }
                        },
                        _clearSelection: function(a) {
                            this._currentFeatureCount = 0;
                            this._popupFeatures = null;
                            this._selectionHelper.clearSelection(a || !1);
                            this._reset()
                        },
                        _findCenterPoint: function(a) {
                            a = a.geometry || a;
                            var c;
                            switch (a.type) {
                                case "point":
                                    c = a;
                                    break;
                                case "polyline":
                                    c = a.getPoint(0, Math.ceil(a.paths[0].length / 2));
                                    break;
                                case "polygon":
                                    c = a.rings.length - 1, c = a.getPoint(c, a.rings[c].length - 1)
                            }
                            return this._settings.map.toScreen(c)
                        },
                        _hideAttributeInspector: function() {
                            !this._customAttributeInspector &&
                                this._settings.map.infoWindow && this._settings.map.infoWindow.hide()
                        },
                        _toPolylines: function(a) {
                            return k.map(a, function(a) {
                                var c = new w(a.spatialReference);
                                k.forEach(a.rings, function(a) {
                                    c.addPath(a)
                                });
                                return c
                            })
                        },
                        _isNotesFeature: function(a) {
                            var c = a.getLayer(),
                                g = c ? c.types || null : null;
                            if (!g) return !1;
                            var r = a.attributes[c.typeIdField],
                                h;
                            k.some(g, function(a) {
                                return a.id === r ? (h = a.templates, !0) : !1
                            });
                            if (!h) return !1;
                            a = h[0] || null;
                            return !a ? !1 : this._isShapeTool(a.drawingTool) ? !0 : !1
                        },
                        _isValidLayer: function(a) {
                            var c,
                                g = this._settings.layerInfos;
                            for (c = 0; c < g.length; c++) {
                                var r = g[c];
                                if (a.id == (r.featureLayer ? r.featureLayer.id : r.layerId)) return !0
                            }
                            return !1
                        },
                        _isShapeTool: function(a) {
                            switch (a) {
                                case v.TOOL_ARROW:
                                    return x.ARROW;
                                case v.TOOL_LEFT_ARROW:
                                    return x.LEFT_ARROW;
                                case v.TOOL_RIGHT_ARROW:
                                    return x.RIGHT_ARROW;
                                case v.TOOL_UP_ARROW:
                                    return x.UP_ARROW;
                                case v.TOOL_DOWN_ARROW:
                                    return x.DOWN_ARROW;
                                case v.TOOL_CIRCLE:
                                    return x.CIRCLE;
                                case v.TOOL_ELLIPSE:
                                    return x.ELLIPSE;
                                case v.TOOL_TRIANGLE:
                                    return x.TRIANGLE;
                                case v.TOOL_RECTANGLE:
                                    return x.RECTANGLE;
                                default:
                                    return null
                            }
                        },
                        _toDrawTool: function(a, c) {
                            var g = c.geometryType;
                            switch (a) {
                                case v.TOOL_POINT:
                                    return x.POINT;
                                case v.TOOL_ARROW:
                                    return x.ARROW;
                                case v.TOOL_LEFT_ARROW:
                                    return x.LEFT_ARROW;
                                case v.TOOL_RIGHT_ARROW:
                                    return x.RIGHT_ARROW;
                                case v.TOOL_UP_ARROW:
                                    return x.UP_ARROW;
                                case v.TOOL_DOWN_ARROW:
                                    return x.DOWN_ARROW;
                                case v.TOOL_CIRCLE:
                                    return x.CIRCLE;
                                case v.TOOL_ELLIPSE:
                                    return x.ELLIPSE;
                                case v.TOOL_TRIANGLE:
                                    return x.TRIANGLE;
                                case v.TOOL_RECTANGLE:
                                    return x.RECTANGLE;
                                case v.TOOL_LINE:
                                    return x.POLYLINE;
                                case v.TOOL_POLYGON:
                                    return x.POLYGON;
                                case v.TOOL_FREEHAND:
                                    return "esriGeometryPolyline" === g ? x.FREEHAND_POLYLINE : x.FREEHAND_POLYGON;
                                default:
                                    var r = x.POINT;
                                    "esriGeometryPolyline" === g ? (r = x.POLYLINE, this._settings.createOptions.polylineDrawTools[0] === I.CREATE_TOOL_FREEHAND_POLYLINE && (r = x.FREEHAND_POLYLINE)) : "esriGeometryPolygon" === g && (r = x.POLYGON, this._settings.createOptions.polygonDrawTools[0] === I.CREATE_TOOL_FREEHAND_POLYGON && (r = x.FREEHAND_POLYGON));
                                    return r
                            }
                        },
                        _isModified: function() {
                            var a = this.editToolbar.getCurrentState();
                            return (a.isModified || this._attributeChanged) && a.graphic ? a.graphic : null
                        },
                        _showInfoWindow: function(a, c) {
                            this._customAttributeInspector || this._settings.map.infoWindow.show(a, c)
                        }
                    });
                    m.mixin(I, {
                        CREATE_TOOL_POLYLINE: "polyline",
                        CREATE_TOOL_FREEHAND_POLYLINE: "freehandpolyline",
                        CREATE_TOOL_POLYGON: "polygon",
                        CREATE_TOOL_FREEHAND_POLYGON: "freehandpolygon",
                        CREATE_TOOL_AUTOCOMPLETE: "autocomplete",
                        CREATE_TOOL_RECTANGLE: "rectangle",
                        CREATE_TOOL_TRIANGLE: "triangle",
                        CREATE_TOOL_CIRCLE: "circle",
                        CREATE_TOOL_ELLIPSE: "ellipse",
                        CREATE_TOOL_ARROW: "arrow",
                        CREATE_TOOL_UP_ARROW: "uparrow",
                        CREATE_TOOL_DOWN_ARROW: "downarrow",
                        CREATE_TOOL_RIGHT_ARROW: "rightarrow",
                        CREATE_TOOL_LEFT_ARROW: "leftarrow"
                    });
                    return I
                })
        },
        "esri/undoManager": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/has dojo/when ./kernel ./Evented require".split(" "), function(p, m, k, f, d, b) {
                return p([b], {
                    declaredClass: "esri.UndoManager",
                    maxOperations: 10,
                    canUndo: !1,
                    canRedo: !1,
                    position: 0,
                    length: 0,
                    onUndo: function() {},
                    onRedo: function() {},
                    onUndoComplete: function() {},
                    onRedoComplete: function() {},
                    onAdd: function() {},
                    onChange: function() {},
                    constructor: function(b) {
                        b = b || {};
                        b.maxOperations && (this.maxOperations = b.maxOperations);
                        this._historyStack = []
                    },
                    add: function(b) {
                        if (0 < this.maxOperations)
                            for (; this._historyStack.length >= this.maxOperations;) this._historyStack.shift();
                        this._historyStack.splice(this.position, 0, b);
                        this.position++;
                        this.clearRedo();
                        this.onAdd();
                        this._checkAvailability()
                    },
                    undo: function() {
                        if (0 === this.position) return null;
                        var b = this.peekUndo();
                        this.position--;
                        b ? (b = b.performUndo(), this.onUndo(), this._checkAvailability(), f(b).then(m.hitch(this, this.onUndoComplete))) : (this.onUndo(), this._checkAvailability())
                    },
                    redo: function() {
                        if (this.position === this._historyStack.length) return null;
                        var b = this.peekRedo();
                        this.position++;
                        b ? (b = b.performRedo(), this.onRedo(), this._checkAvailability(), f(b).then(m.hitch(this, this.onRedoComplete))) : (this.onRedo(), this._checkAvailability())
                    },
                    _checkAvailability: function() {
                        this.length = this._historyStack.length;
                        0 === this.length ? this.canUndo =
                            this.canRedo = !1 : 0 === this.position ? (this.canRedo = !0, this.canUndo = !1) : this.position === this.length ? (this.canUndo = !0, this.canRedo = !1) : this.canRedo = this.canUndo = !0;
                        this.onChange()
                    },
                    clearUndo: function() {
                        this._historyStack.splice(0, this.position);
                        this.position = 0;
                        this._checkAvailability()
                    },
                    clearRedo: function() {
                        this._historyStack.splice(this.position, this._historyStack.length - this.position);
                        this.position = this._historyStack.length;
                        this._checkAvailability()
                    },
                    peekUndo: function() {
                        if (0 < this._historyStack.length &&
                            0 < this.position) return this.get(this.position - 1)
                    },
                    peekRedo: function() {
                        if (0 < this._historyStack.length && this.position < this._historyStack.length) return this.get(this.position)
                    },
                    get: function(b) {
                        return this._historyStack[b]
                    },
                    remove: function(b) {
                        0 < this._historyStack.length && (this._historyStack.splice(b, 1), 0 < this.position && b < this.position && this.position--, this._checkAvailability())
                    },
                    destroy: function() {
                        this._historyStack = null
                    }
                })
            })
        },
        "esri/toolbars/edit": function() {
            define("require dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/Color dojo/has dojo/dom-construct dojo/dom-style ../kernel ../lang ../sniff ./_toolbar ./_Box ./_GraphicMover ./_VertexEditor ./TextEditor ../symbols/SimpleMarkerSymbol ../symbols/SimpleLineSymbol ../symbols/TextSymbol ../graphic".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y) {
                    var v = m(t, {
                        declaredClass: "esri.toolbars.Edit",
                        constructor: function(a, c) {
                            this._map = a;
                            this._tool = 0;
                            if (this._map.loaded) this._scratchGL = a.graphics;
                            else var g = f.connect(this._map, "onLoad", this, function() {
                                f.disconnect(g);
                                g = null;
                                this._scratchGL = this._map.graphics
                            });
                            var h = e("esri-mobile");
                            this._defaultOptions = k.mixin({
                                vertexSymbol: new r(r.STYLE_CIRCLE, h ? 20 : 12, new B(B.STYLE_SOLID, new b([0, 0, 0, 0.5]), 1), new b([128, 128, 128])),
                                ghostVertexSymbol: new r(r.STYLE_CIRCLE,
                                    h ? 18 : 10, new B(B.STYLE_SOLID, new b([0, 0, 0, 0.5]), 1), new b([255, 255, 255, 0.75])),
                                ghostLineSymbol: new B(B.STYLE_DOT, new b([128, 128, 128]), 2),
                                allowDeleteVertices: !0,
                                allowAddVertices: !0,
                                rotateHandleOffset: h ? 24 : 16,
                                boxLineSymbol: new B(B.STYLE_DASH, new b([64, 64, 64]), 1),
                                boxHandleSymbol: new r(r.STYLE_SQUARE, h ? 16 : 9, new B(B.STYLE_SOLID, new b([0, 0, 0, 0.5]), 1), new b([255, 255, 255, 0.75])),
                                textAnchorSymbol: new r(r.STYLE_CIRCLE, 10, null, new b([255, 0, 0]))
                            }, c || {})
                        },
                        activate: function(a, c, g) {
                            this.deactivate();
                            this._graphic =
                                c;
                            this._options = k.mixin(k.mixin({}, this._defaultOptions), g || {});
                            var r = v.MOVE;
                            g = v.EDIT_VERTICES;
                            var h = v.SCALE,
                                b = v.ROTATE,
                                q = v.EDIT_TEXT,
                                e = !1,
                                u = !1,
                                d = !1,
                                n = this._map,
                                l = n.spatialReference,
                                s = c.geometry.spatialReference;
                            this._geo = !(!l || !s || l.equals(s) || !(l.isWebMercator() && 4326 === s.wkid));
                            this._isTextPoint = this._prepareTextSymbolEditing(c, a);
                            (a & r) === r && (e = this._enableMove(c));
                            r = (a & h) === h;
                            b = (a & b) === b;
                            if (r || b) d = this._enableBoxEditing(c, r, b);
                            (a & g) === g && (u = this._enableVertexEditing(c));
                            (a & q) === q && this._enableTextEditing(c);
                            if (!e && !u && !d) throw Error("[esri.toolbars.Edit::activate] Unable to activate the tool. Check if the tool is valid for the given geometry type.");
                            if (this._tool = a) this._mapPanEndHandle = f.connect(n, "onPanEnd", this, this._mapPanEndHandler), this._mapExtChgHandle = f.connect(n, "onExtentChange", this, this._mapExtentChangeHandler), this.onActivate(this._tool, c);
                            n.snappingManager && (e || u) && n.snappingManager._startSelectionLayerQuery()
                        },
                        deactivate: function() {
                            this._isTextPoint = null;
                            var a = this._tool,
                                c = this._graphic;
                            if (a) {
                                var g = !!this._modified;
                                this._clear();
                                f.disconnect(this._mapPanEndHandle);
                                f.disconnect(this._mapExtChgHandle);
                                this._graphic = this._geo = this._mapPanEndHandle = this._mapExtChgHandle = null;
                                this.onDeactivate(a, c, {
                                    isModified: g
                                });
                                this._map.snappingManager && this._map.snappingManager._stopSelectionLayerQuery()
                            }
                        },
                        refresh: function() {
                            this._refreshMoveables(!0)
                        },
                        getCurrentState: function() {
                            return {
                                tool: this._tool,
                                graphic: this._graphic,
                                isModified: !!this._modified
                            }
                        },
                        onActivate: function(a, c) {},
                        onDeactivate: function(a,
                            c, g) {},
                        onGraphicMoveStart: function(a) {},
                        onGraphicFirstMove: function(a) {
                            this._modified = !0
                        },
                        onGraphicMove: function(a, c) {},
                        onGraphicMoveStop: function(a, c) {},
                        onGraphicClick: function(a, c) {},
                        onVertexMoveStart: function(a, c) {},
                        onVertexFirstMove: function(a, c) {
                            this._modified = !0
                        },
                        onVertexMove: function(a, c, g) {},
                        onVertexMoveStop: function(a, c, g) {},
                        onVertexAdd: function(a, c) {
                            this._modified = !0
                        },
                        onVertexClick: function(a, c) {},
                        onVertexMouseOver: function(a, c) {},
                        onVertexMouseOut: function(a, c) {},
                        onVertexDelete: function(a,
                            c) {
                            this._modified = !0
                        },
                        onTextEditStart: function(a, c) {},
                        onTextEditEnd: function(a) {},
                        onScaleStart: function(a) {},
                        onScaleFirstMove: function(a) {
                            this._modified = !0
                        },
                        onScale: function(a, c) {},
                        onScaleStop: function(a, c) {},
                        onRotateStart: function(a) {},
                        onRotateFirstMove: function(a) {
                            this._modified = !0
                        },
                        onRotate: function(a, c) {},
                        onRotateStop: function(a, c) {},
                        _eventMap: {
                            activate: ["tool", "graphic"],
                            deactivate: ["tool", "graphic", "info"],
                            "graphic-move-start": ["graphic"],
                            "graphic-first-move": ["graphic"],
                            "graphic-move": ["graphic",
                                "transform"
                            ],
                            "graphic-move-stop": ["graphic", "transform"],
                            "graphic-click": ["graphic", "info"],
                            "vertex-move-start": ["graphic", "vertexinfo"],
                            "vertex-first-move": ["graphic", "vertexinfo"],
                            "vertex-move": ["graphic", "vertexinfo", "transform"],
                            "vertex-move-stop": ["graphic", "vertexinfo", "transform"],
                            "vertex-add": ["graphic", "vertexinfo"],
                            "vertex-click": ["graphic", "vertexinfo"],
                            "vertex-mouse-over": ["graphic", "vertexinfo"],
                            "vertex-mouse-out": ["graphic", "vertexinfo"],
                            "vertex-delete": ["graphic", "vertexinfo"],
                            "scale-start": ["graphic"],
                            "scale-first-move": ["graphic"],
                            scale: ["graphic", "info"],
                            "scale-stop": ["graphic", "info"],
                            "rotate-start": ["graphic"],
                            "rotate-first-move": ["graphic"],
                            rotate: ["graphic", "info"],
                            "rotate-stop": ["graphic", "info"]
                        },
                        _prepareTextSymbolEditing: function(c, r) {
                            if ("point" === c.geometry.type || "multipoint" === c.geometry.type) {
                                var h = c.getLayer(),
                                    b = h.renderer,
                                    h = c.symbol || h._getSymbol(c);
                                if (!h && (b.hasVisualVariables("sizeInfo", !1) || b.hasVisualVariables("colorInfo", !1) || b.hasVisualVariables("opacityInfo", !1)) && b.addBreak &&
                                    b.infos && 1 === b.infos.length) h = b.infos[0].symbol || b.defaultSymbol;
                                if (h && "textsymbol" === h.type) {
                                    if ((r & v.SCALE) === v.SCALE || (r & v.ROTATE) === v.ROTATE || (r & v.EDIT_TEXT) === v.EDIT_TEXT) {
                                        c.setSymbol(new g(h.toJson()));
                                        var q = this;
                                        this._textSymbolEditor ? (this._textSymbolEditor.createForm(c), this._textSymbolEditor.show()) : this._options && this._options.textSymbolEditor ? (this._textSymbolEditor = this._options.textSymbolEditor, this._textSymbolEditor.on("symbol-change", function() {
                                                q._boxEditor && q._boxEditor.refresh()
                                            })) :
                                            p(["../dijit/SymbolEditor"], function(g) {
                                                if (!q._textSymbolEditor) {
                                                    var r;
                                                    r = q._options.textSymbolEditorHolder ? a.create("div", null, q._options.textSymbolEditorHolder) : a.create("div", null, q._map.root);
                                                    q._textSymbolEditor = new g({
                                                        graphic: c
                                                    }, r);
                                                    g = q._textSymbolEditor.domNode.parentNode.id;
                                                    n.set(q._textSymbolEditor.domNode, {
                                                        position: "map_root" === g ? "absolute" : "relative",
                                                        left: "map_root" === g ? q._map.width / 2 - 100 + "px" : "5px",
                                                        top: "20px",
                                                        "z-index": 50
                                                    });
                                                    q._textSymbolEditor.startup();
                                                    q._textSymbolEditor.createForm(c);
                                                    q._textSymbolEditor.show();
                                                    q._textSymbolEditor.on("symbol-change", function() {
                                                        q._boxEditor && q._boxEditor.refresh()
                                                    })
                                                }
                                            })
                                    }
                                    if ((r & v.MOVE) === v.MOVE || (r & v.ROTATE) === v.ROTATE || (r & v.SCALE) === v.SCALE) this._textAnchor = new y(c.geometry, this._options.textAnchorSymbol), this._scratchGL.add(this._textAnchor);
                                    return !0
                                }
                            }
                            return !1
                        },
                        _enableMove: function(a) {
                            var c = this._map;
                            switch (a.geometry.type) {
                                case "point":
                                case "polyline":
                                case "polygon":
                                    return this._graphicMover = new q(a, c, this, this._textAnchor), !0
                            }
                            return !1
                        },
                        _enableVertexEditing: function(a) {
                            var c =
                                this._map;
                            switch (a.geometry.type) {
                                case "multipoint":
                                case "polyline":
                                case "polygon":
                                    return this._vertexEditor = w.create(a, c, this), !0
                            }
                            return !1
                        },
                        _enableBoxEditing: function(a, c, g) {
                            var r = this._map,
                                h = a.geometry.type;
                            return "polyline" === h || "polygon" === h || this._isTextPoint ? (this._boxEditor = new u(a, r, this, c, g, this._options.uniformScaling, this._isTextPoint), !0) : !1
                        },
                        _enableTextEditing: function(a) {
                            return this._isTextPoint ? (this._textEditor = new h(a, this._map, this), f.connect(this._textEditor, "onEditStart", k.hitch(this,
                                function() {
                                    this._textAnchor && (this._textAnchor.getLayer().remove(this._textAnchor), this._textAnchor = null);
                                    this._map.disableKeyboardNavigation();
                                    this._disableMove();
                                    this._disableBoxEditing()
                                })), !0) : !1
                        },
                        _disableMove: function() {
                            var a = this._graphicMover;
                            a && (a.destroy(), this._graphicMover = null)
                        },
                        _disableVertexEditing: function() {
                            var a = this._vertexEditor;
                            a && (a.destroy(), this._vertexEditor = null)
                        },
                        _disableBoxEditing: function() {
                            var a = this._boxEditor;
                            a && (a.destroy(), this._boxEditor = null)
                        },
                        _disableTextEditing: function() {
                            this._textEditor &&
                                (this._textEditor.destroy(), this._textEditor = null);
                            this._map.enableKeyboardNavigation()
                        },
                        _disableSymbolEditing: function() {
                            this._textSymbolEditor && this._textSymbolEditor.hide()
                        },
                        _clear: function() {
                            this._disableMove();
                            this._disableVertexEditing();
                            this._disableBoxEditing();
                            this._disableTextEditing();
                            this._disableSymbolEditing();
                            this._textAnchor && (this._textAnchor.getLayer().remove(this._textAnchor), this._textAnchor = null);
                            this._tool = 0;
                            this._modified = !1
                        },
                        _mapPanEndHandler: function() {
                            this._refreshMoveables()
                        },
                        _mapExtentChangeHandler: function(a, c, g) {
                            g && this._refreshMoveables()
                        },
                        _refreshMoveables: function(a) {
                            var g = d.filter([this._graphicMover, this._vertexEditor, this._boxEditor], c.isDefined);
                            d.forEach(g, function(c) {
                                c.refresh(a)
                            })
                        },
                        _beginOperation: function(a) {
                            d.forEach(this._getAffectedTools(a), function(a) {
                                a.suspend()
                            })
                        },
                        _endOperation: function(a) {
                            d.forEach(this._getAffectedTools(a), function(a) {
                                a.resume()
                            })
                        },
                        _getAffectedTools: function(a) {
                            var g = [];
                            switch (a) {
                                case "MOVE":
                                    g = [this._vertexEditor, this._boxEditor];
                                    break;
                                case "VERTICES":
                                    g = [this._boxEditor];
                                    break;
                                case "BOX":
                                    g = [this._vertexEditor]
                            }
                            return g = d.filter(g, c.isDefined)
                        }
                    });
                    k.mixin(v, {
                        MOVE: 1,
                        EDIT_VERTICES: 2,
                        SCALE: 4,
                        ROTATE: 8,
                        EDIT_TEXT: 16
                    });
                    return v
                })
        },
        "esri/toolbars/_Box": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/has dojo/dom-style dojox/gfx/Moveable dojox/gfx/matrix ../kernel ../lang ../geometry/Point ../geometry/Polyline ../symbols/SimpleMarkerSymbol ../geometry/webMercatorUtils ../geometry/jsonUtils ../graphic".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h) {
                    return p(null, {
                        declaredClass: "esri.toolbars._Box",
                        constructor: function(a, c, g, h, b, q, e) {
                            this._graphic = a;
                            this._map = c;
                            this._toolbar = g;
                            this._scale = h;
                            this._rotate = b;
                            this._defaultEventArgs = {};
                            this._scaleEvent = "Scale";
                            this._rotateEvent = "Rotate";
                            this._uniformScaling = q;
                            a = g._options;
                            this._markerSymbol = a.boxHandleSymbol;
                            this._lineSymbol = a.boxLineSymbol;
                            this._moveStartHandler = m.hitch(this, this._moveStartHandler);
                            this._firstMoveHandler = m.hitch(this, this._firstMoveHandler);
                            this._moveStopHandler = m.hitch(this, this._moveStopHandler);
                            this._moveHandler = m.hitch(this, this._moveHandler);
                            this._isTextPoint = e;
                            this._init()
                        },
                        destroy: function() {
                            this._cleanUp();
                            this._graphic = this._map = this._toolbar = this._markerSymbol = this._lineSymbol = null
                        },
                        refresh: function() {
                            this._draw()
                        },
                        suspend: function() {
                            k.forEach(this._getAllGraphics(), function(a) {
                                a.hide()
                            })
                        },
                        resume: function() {
                            k.forEach(this._getAllGraphics(), function(a) {
                                a.show()
                            });
                            this._draw()
                        },
                        _init: function() {
                            this._draw()
                        },
                        _cleanUp: function() {
                            this._connects &&
                                k.forEach(this._connects, f.disconnect);
                            var a = this._toolbar._scratchGL;
                            this._anchors && k.forEach(this._anchors, function(c) {
                                a.remove(c.graphic);
                                (c = c.moveable) && c.destroy()
                            });
                            this._box && a.remove(this._box);
                            this._box = this._anchors = this._connects = null
                        },
                        _draw: function() {
                            if (this._graphic.getDojoShape()) {
                                var a = this._map,
                                    c = this._toolbar._scratchGL,
                                    g = this._getBoxCoords(),
                                    b = new t(a.spatialReference),
                                    q = m.clone(k.filter(g, function(a, c) {
                                        return 8 !== c && 0 === c % 2
                                    }));
                                q[0] && q.push([q[0][0], q[0][1]]);
                                b.addPath(q);
                                this._rotate &&
                                    b.addPath([g[1], g[8]]);
                                this._box ? this._box.setGeometry(b) : (this._box = new h(b, this._lineSymbol), c.add(this._box));
                                this._anchors ? k.forEach(this._anchors, function(c, h) {
                                    this._scale || (h = 8);
                                    var b = new s(g[h], a.spatialReference);
                                    c.graphic.setGeometry(b);
                                    var b = c.moveable,
                                        q = c.graphic.getDojoShape();
                                    q && (b ? q !== b.shape && (b.destroy(), c.moveable = this._getMoveable(c.graphic, h)) : c.moveable = this._getMoveable(c.graphic, h))
                                }, this) : (this._anchors = [], this._connects = [], k.forEach(g, function(g, b) {
                                    if (this._scale || !(8 > b)) {
                                        g =
                                            new s(g, a.spatialReference);
                                        var q = new h(g, this._markerSymbol);
                                        this._isTextPoint && 1 === b % 2 && q.hide();
                                        c.add(q);
                                        this._anchors.push({
                                            graphic: q,
                                            moveable: this._getMoveable(q, b)
                                        })
                                    }
                                }, this))
                            } else this._cleanUp()
                        },
                        _getBoxCoords: function(a) {
                            var c = this._map,
                                g, b = [],
                                h, q, e;
                            if (this._isTextPoint) {
                                g = this._graphic.getNode().getBoundingClientRect();
                                var u = c.__container.getBoundingClientRect();
                                g = [{
                                    x: g.left - u.left,
                                    y: g.top - u.top
                                }, {
                                    x: g.right - u.left,
                                    y: g.top - u.top
                                }, {
                                    x: g.right - u.left,
                                    y: g.bottom - u.top
                                }, {
                                    x: g.left - u.left,
                                    y: g.bottom -
                                        u.top
                                }]
                            } else g = this._getTransformedBoundingBox(this._graphic);
                            k.forEach(g, function(g, u, d) {
                                h = g;
                                (q = d[u + 1]) || (q = d[0]);
                                e = {
                                    x: (h.x + q.x) / 2,
                                    y: (h.y + q.y) / 2
                                };
                                a || (h = c.toMap(h), e = c.toMap(e));
                                b.push([h.x, h.y]);
                                b.push([e.x, e.y])
                            });
                            this._rotate && (g = m.clone(b[1]), g = a ? {
                                x: g[0],
                                y: g[1]
                            } : c.toScreen({
                                x: g[0],
                                y: g[1],
                                spatialReference: c.spatialReference
                            }), g.y -= this._toolbar._options.rotateHandleOffset, a || (g = c.toMap(g)), b.push([g.x, g.y]));
                            return b
                        },
                        _getTransformedBoundingBox: function(a) {
                            var c = this._map,
                                g = a.geometry.getExtent(),
                                h = a.geometry.spatialReference;
                            a = new s(g.xmin, g.ymax, h);
                            g = new s(g.xmax, g.ymin, h);
                            a = c.toScreen(a);
                            g = c.toScreen(g);
                            return [{
                                x: a.x,
                                y: a.y
                            }, {
                                x: g.x,
                                y: a.y
                            }, {
                                x: g.x,
                                y: g.y
                            }, {
                                x: a.x,
                                y: g.y
                            }]
                        },
                        _getAllGraphics: function() {
                            var a = [this._box];
                            this._anchors && k.forEach(this._anchors, function(c) {
                                a.push(c.graphic)
                            });
                            return a = k.filter(a, c.isDefined)
                        },
                        _getMoveable: function(c, h) {
                            var g = c.getDojoShape();
                            if (g) {
                                var b = new a(g);
                                b._index = h;
                                this._connects.push(f.connect(b, "onMoveStart", this._moveStartHandler));
                                this._connects.push(f.connect(b,
                                    "onFirstMove", this._firstMoveHandler));
                                this._connects.push(f.connect(b, "onMoveStop", this._moveStopHandler));
                                b.onMove = this._moveHandler;
                                (g = g.getEventSource()) && e.set(g, "cursor", this._toolbar._cursors["box" + h]);
                                return b
                            }
                        },
                        _moveStartHandler: function(a) {
                            this._toolbar["on" + (8 === a.host._index ? this._rotateEvent : this._scaleEvent) + "Start"](this._graphic)
                        },
                        _firstMoveHandler: function(a) {
                            this._map.disableScrollWheelZoom();
                            var c = a.host._index,
                                g = this._wrapOffset = a.host.shape._wrapOffsets[0] || 0,
                                h = this._graphic.getLayer()._getTransform(),
                                b;
                            a = k.map(this._getBoxCoords(!0), function(a) {
                                return {
                                    x: a[0] + g,
                                    y: a[1]
                                }
                            });
                            b = this._isTextPoint ? this._map.toScreen(this._graphic.geometry) : {
                                x: a[1].x,
                                y: a[3].y
                            };
                            this._centerCoord = n.multiplyPoint(n.invert(h), b);
                            if (8 === c) b = n.multiplyPoint(n.invert(h), a[1]), this._isTextPoint && (this._centerCoord = this._deNormalizePoint(this._centerCoord, b)), this._startLine = [this._centerCoord, b], this._moveLine = m.clone(this._startLine);
                            else if (b = n.multiplyPoint(n.invert(h), a[c]), h = n.multiplyPoint(n.invert(h), a[(c + 4) % 8]), this._isTextPoint &&
                                (this._centerCoord = this._deNormalizePoint(this._centerCoord, b)), this._firstMoverToAnchor = Math.sqrt((b.x - this._centerCoord.x) * (b.x - this._centerCoord.x) + (b.y - this._centerCoord.y) * (b.y - this._centerCoord.y)), this._startBox = h, this._startBox.width = a[4].x - a[0].x, this._startBox.height = a[4].y - a[0].y, this._moveBox = m.clone(this._startBox), this._xfactor = b.x > h.x ? 1 : -1, this._yfactor = b.y > h.y ? 1 : -1, 1 === c || 5 === c) this._xfactor = 0;
                            else if (3 === c || 7 === c) this._yfactor = 0;
                            this._toolbar._beginOperation("BOX");
                            this._toolbar["on" +
                                (8 === c ? this._rotateEvent : this._scaleEvent) + "FirstMove"](this._graphic)
                        },
                        _moveHandler: function(a, c) {
                            var g = a.host._index,
                                b = this._defaultEventArgs,
                                h, q, e, u;
                            b.angle = 0;
                            b.scaleX = 1;
                            b.scaleY = 1;
                            if (8 === g) h = this._startLine, q = this._moveLine, e = q[1], e.x += c.dx, e.y += c.dy, e = this._getAngle(h, q), this._isTextPoint && (e += this._graphic.symbol.angle), q = n.rotategAt(e, h[0]), this._graphic.getDojoShape().setTransform(q), b.transform = q, b.angle = e, b.around = h[0];
                            else {
                                h = this._startBox;
                                q = this._moveBox;
                                q.width += c.dx * this._xfactor;
                                q.height +=
                                    c.dy * this._yfactor;
                                this._uniformScaling || this._isTextPoint ? (h = q.x + this._xfactor * q.width, q = q.y + this._yfactor * q.height, h = Math.sqrt((h - this._centerCoord.x) * (h - this._centerCoord.x) + (q - this._centerCoord.y) * (q - this._centerCoord.y)), this._scaleRatio = e = u = h / this._firstMoverToAnchor, h = this._centerCoord) : (e = q.width / h.width, u = q.height / h.height, h = {
                                    x: h.x,
                                    y: h.y
                                });
                                if (isNaN(e) || Infinity === e || -Infinity === e) e = 1;
                                if (isNaN(u) || Infinity === u || -Infinity === u) u = 1;
                                q = n.scaleAt(e, u, h);
                                if (this._isTextPoint) {
                                    var d = n.rotategAt(this._graphic.symbol.angle,
                                        h);
                                    this._graphic.getDojoShape().setTransform([d, q])
                                } else this._graphic.getDojoShape().setTransform(q);
                                b.transform = q;
                                b.scaleX = e;
                                b.scaleY = u;
                                b.around = h
                            }
                            this._toolbar["on" + (8 === g ? this._rotateEvent : this._scaleEvent)](this._graphic, b)
                        },
                        _moveStopHandler: function(a) {
                            this._map.enableScrollWheelZoom();
                            var c = this._graphic,
                                g = this._toolbar,
                                h = g._geo ? q.geographicToWebMercator(c.geometry) : c.geometry,
                                b = h.spatialReference,
                                e = c.getDojoShape(),
                                u = e.getTransform(),
                                d = c.getLayer()._getTransform();
                            this._isTextPoint ? (c = this._graphic.symbol,
                                8 === a.host._index ? c.angle += this._getAngle(this._startLine, this._moveLine) : c.font.setSize(Math.round(100 * c.font.size * this._scaleRatio) / 100), this._graphic.setSymbol(c)) : (h = h.toJson(), this._updateSegments(h.paths || h.rings, u, d, b), e.setTransform(null), h = w.fromJson(h), c.setGeometry(g._geo ? q.webMercatorToGeographic(h, !0) : h));
                            this._draw();
                            this._startLine = this._moveLine = this._startBox = this._moveBox = this._xfactor = this._yfactor = null;
                            g._endOperation("BOX");
                            this._defaultEventArgs.transform = u;
                            g["on" + (8 === a.host._index ?
                                this._rotateEvent : this._scaleEvent) + "Stop"](this._graphic, this._defaultEventArgs)
                        },
                        _updateSegments: function(a, c, g, h) {
                            var b = this._map,
                                q = this._wrapOffset || 0;
                            k.forEach(a, function(a) {
                                k.forEach(a, function(a) {
                                    this._updatePoint(a, h, q, n, b, g, c)
                                }, this)
                            }, this)
                        },
                        _updatePoint: function(a, c, g, h, b, q, e) {
                            c = b.toScreen({
                                x: a[0],
                                y: a[1],
                                spatialReference: c
                            }, !0);
                            c.x += g;
                            c = h.multiplyPoint([q, e, h.invert(q)], c);
                            c.x -= g;
                            g = b.toMap(c);
                            a[0] = g.x;
                            a[1] = g.y
                        },
                        _getAngle: function(a, c) {
                            var g = 180 * Math.atan2(a[0].y - a[1].y, a[0].x - a[1].x) / Math.PI;
                            return 180 * Math.atan2(c[0].y - c[1].y, c[0].x - c[1].x) / Math.PI - g
                        },
                        _deNormalizePoint: function(a, c) {
                            var g = this._map._getFrameWidth();
                            if (-1 === g) return a;
                            for (var h = {
                                    x: a.x,
                                    y: a.y
                                }; Math.abs(h.x - c.x) >= g;) h.x = h.x < c.x ? h.x + g : h.x - g;
                            var b = Math.abs(h.x - c.x);
                            Math.abs(h.x - c.x + g) < b ? h.x += g : Math.abs(h.x - c.x - g) < b && (h.x -= g);
                            return h
                        }
                    })
                })
        },
        "dojox/gfx/Moveable": function() {
            define("dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/event dojo/topic dojo/touch dojo/dom-class dojo/_base/window ./Mover dojo/mouse".split(" "),
                function(p, m, k, f, d, b, e, a, n, l) {
                    return m("dojox.gfx.Moveable", null, {
                        constructor: function(a, e) {
                            this.shape = a;
                            this.delay = e && 0 < e.delay ? e.delay : 0;
                            this.mover = e && e.mover ? e.mover : n;
                            this.leftButtonOnly = e && e.leftButtonOnly;
                            this.events = [this.shape.on(b.press, p.hitch(this, "onMouseDown"))]
                        },
                        destroy: function() {
                            k.forEach(this.events, function(a) {
                                a.remove()
                            });
                            this.events = this.shape = null
                        },
                        onMouseDown: function(a) {
                            this.delay ? (this.events.push(this.shape.on(b.move, p.hitch(this, "onMouseMove")), this.shape.on(b.release, p.hitch(this,
                                "onMouseUp"))), this._lastX = a.clientX, this._lastY = a.clientY) : (!this.leftButtonOnly || l.isLeft(a)) && new this.mover(this.shape, a, this);
                            f.stop(a)
                        },
                        onMouseMove: function(a) {
                            var b = a.clientY;
                            if (Math.abs(a.clientX - this._lastX) > this.delay || Math.abs(b - this._lastY) > this.delay) this.onMouseUp(a), new this.mover(this.shape, a, this);
                            f.stop(a)
                        },
                        onMouseUp: function(a) {
                            this.events.pop().remove()
                        },
                        onMoveStart: function(c) {
                            d.publish("/gfx/move/start", c);
                            e.add(a.body(), "dojoMove")
                        },
                        onMoveStop: function(c) {
                            d.publish("/gfx/move/stop",
                                c);
                            e.remove(a.body(), "dojoMove")
                        },
                        onFirstMove: function(a) {},
                        onMove: function(a, b, e) {
                            this.onMoving(a, b, e);
                            this.shape.applyLeftTransform(b);
                            this.onMoved(a, b)
                        },
                        onMoving: function(a, b) {},
                        onMoved: function(a, b) {}
                    })
                })
        },
        "dojox/gfx/Mover": function() {
            define("dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/on dojo/touch dojo/_base/event".split(" "), function(p, m, k, f, d, b) {
                return k("dojox.gfx.Mover", null, {
                    constructor: function(e, a, n) {
                        this.shape = e;
                        this.lastX = a.clientX;
                        this.lastY = a.clientY;
                        e = this.host = n;
                        a =
                            document;
                        n = f(a, d.move, p.hitch(this, "onFirstMove"));
                        this.events = [f(a, d.move, p.hitch(this, "onMouseMove")), f(a, d.release, p.hitch(this, "destroy")), f(a, "dragstart", p.hitch(b, "stop")), f(a, "selectstart", p.hitch(b, "stop")), n];
                        if (e && e.onMoveStart) e.onMoveStart(this)
                    },
                    onMouseMove: function(e) {
                        var a = e.clientX,
                            d = e.clientY;
                        this.host.onMove(this, {
                            dx: a - this.lastX,
                            dy: d - this.lastY
                        }, e);
                        this.lastX = a;
                        this.lastY = d;
                        b.stop(e)
                    },
                    onFirstMove: function() {
                        this.host.onFirstMove(this);
                        this.events.pop().remove()
                    },
                    destroy: function() {
                        m.forEach(this.events,
                            function(a) {
                                a.remove()
                            });
                        var b = this.host;
                        if (b && b.onMoveStop) b.onMoveStop(this);
                        this.events = this.shape = null
                    }
                })
            })
        },
        "esri/toolbars/_GraphicMover": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/json dojo/has dojo/dom-style dojox/gfx/Moveable dojox/gfx/Mover dojox/gfx/matrix ../kernel ../geometry/webMercatorUtils ../geometry/ScreenPoint ../geometry/Point".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s, t) {
                var u = p(null, {
                    declaredClass: "esri.toolbars._GraphicMover",
                    constructor: function(a,
                        c, h, b) {
                        this.graphic = a;
                        this.map = c;
                        this.toolbar = h;
                        this.tempPt = b;
                        this._enableGraphicMover();
                        this._moved = !1
                    },
                    refresh: function(a) {
                        var c = this.graphic.getDojoShape();
                        if (c && (a || !c._hostGraphic)) this._disableGraphicMover(), this._enableGraphicMover()
                    },
                    destroy: function() {
                        this._disableGraphicMover()
                    },
                    hasMoved: function() {
                        return this._moved
                    },
                    _enableGraphicMover: function() {
                        var a = this.graphic,
                            c = a.getDojoShape();
                        c && (c._hostGraphic = a, this._moveable = new e(c, {
                            mover: u.Mover
                        }), this._moveStartHandle = k.connect(this._moveable,
                            "onMoveStart", this, this._moveStartHandler), this._firstMoveHandle = k.connect(this._moveable, "onFirstMove", this, this._firstMoveHandler), this._movingHandle = k.connect(this._moveable, "onMoving", this, this._movingHandler), this._moveStopHandle = k.connect(this._moveable, "onMoveStop", this, this._moveStopHandler), (a = c.getEventSource()) && b.set(a, "cursor", this.toolbar._cursors.move))
                    },
                    _disableGraphicMover: function() {
                        var a = this._moveable;
                        if (a) {
                            k.disconnect(this._moveStartHandle);
                            k.disconnect(this._firstMoveHandle);
                            k.disconnect(this._movingHandle);
                            k.disconnect(this._moveStopHandle);
                            var c = a.shape;
                            c && (c._hostGraphic = null, (c = c.getEventSource()) && b.set(c, "cursor", null));
                            a.destroy()
                        }
                        this._moveable = null
                    },
                    _moveStartHandler: function() {
                        var a = this.graphic,
                            c = this.map;
                        this._startTx = a.getDojoShape().getTransform();
                        "point" === this.graphic.geometry.type && c.snappingManager && c.snappingManager._setUpSnapping();
                        this.toolbar.onGraphicMoveStart(a)
                    },
                    _firstMoveHandler: function() {
                        this.toolbar._beginOperation("MOVE");
                        this.toolbar.onGraphicFirstMove(this.graphic)
                    },
                    _movingHandler: function(a) {
                        a = a.shape.getTransform();
                        this.tempPt && this.tempPt.getDojoShape().setTransform(a);
                        this.toolbar.onGraphicMove(this.graphic, a)
                    },
                    _moveStopHandler: function(a) {
                        var b = this.graphic,
                            h = this.toolbar,
                            r = this.map,
                            e = h._geo ? c.geographicToWebMercator(b.geometry) : b.geometry,
                            g = e.type,
                            u = b.getDojoShape(),
                            d = u.getTransform();
                        if (f.toJson(d) !== f.toJson(this._startTx)) {
                            this._moved = !0;
                            switch (g) {
                                case "point":
                                    var g = [d, n.invert(this._startTx)],
                                        l;
                                    r.snappingManager && (l = r.snappingManager._snappingPoint);
                                    e = l || r.toMap(n.multiplyPoint(g, r.toScreen(e, !0)));
                                    r.snappingManager && r.snappingManager._killOffSnapping();
                                    break;
                                case "polyline":
                                    e = this._updatePolyGeometry(e, e.paths, d);
                                    break;
                                case "polygon":
                                    e = this._updatePolyGeometry(e, e.rings, d)
                            }
                            u.setTransform(null);
                            b.setGeometry(h._geo ? c.webMercatorToGeographic(e, !0) : e);
                            this.tempPt && this.tempPt.setGeometry(new t(b.geometry.toJson()))
                        } else this._moved = !1;
                        h._endOperation("MOVE");
                        h.onGraphicMoveStop(b, d);
                        this._moved || (a = a.__e, r = this.map.position, a = new s(a.pageX - r.x,
                            a.pageY - r.y), h.onGraphicClick(b, {
                            screenPoint: a,
                            mapPoint: this.map.toMap(a)
                        }))
                    },
                    _updatePolyGeometry: function(a, c, h) {
                        var b = this.map,
                            e = a.getPoint(0, 0),
                            b = b.toMap(b.toScreen(e).offset(h.dx, h.dy));
                        h = b.x - e.x;
                        for (var e = b.y - e.y, g, u, d, b = 0; b < c.length; b++) {
                            u = c[b];
                            for (g = 0; g < u.length; g++) d = a.getPoint(b, g), a.setPoint(b, g, d.offset(h, e))
                        }
                        return a
                    }
                });
                u.Mover = p(a, {
                    declaredClass: "esri.toolbars._Mover",
                    constructor: function(a, c, b) {
                        this.__e = c
                    }
                });
                return u
            })
        },
        "esri/toolbars/_VertexEditor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/has dijit/Menu dijit/MenuItem ../kernel ./_VertexMover ../geometry/Point ../geometry/jsonUtils dojo/i18n!../nls/jsapi".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s) {
                    var t = p(null, {
                        declaredClass: "esri.toolbars._GraphicVertexEditor",
                        constructor: function(a, c, b) {
                            this.graphic = a;
                            this.map = c;
                            this.toolbar = b;
                            a = b._options;
                            this._symbol1 = a.vertexSymbol;
                            this._symbol2 = a.ghostVertexSymbol;
                            c = a.ghostLineSymbol;
                            this._lineStroke = {
                                style: c.style,
                                width: c.width,
                                color: c.color
                            };
                            this._canDel = a.allowDeleteVertices;
                            this._canAdd = a.allowAddVertices;
                            this._addControllers()
                        },
                        destroy: function() {
                            this._removeControllers()
                        },
                        refresh: function(a) {
                            a ? (this._removeControllers(),
                                this._addControllers()) : (this._refresh(this._vertexMovers), this._refresh(this._mpVertexMovers))
                        },
                        suspend: function() {
                            this._suspended || this._removeControllers();
                            this._suspended = !0
                        },
                        resume: function() {
                            this._suspended && this._addControllers();
                            this._suspended = !1
                        },
                        _addControllers: function() {
                            this._firstMoveHandle = k.connect(n, "onFirstMove", this, this._firstMoveHandler);
                            this._moveStopHandle = k.connect(n, "onMoveStop", this, this._moveStopHandler);
                            this._vertexMovers = this._add(this._getSegments(this.graphic.geometry),
                                this._symbol1);
                            this._canAdd && (this._mpVertexMovers = this._add(this._getMidpointSegments(this.graphic.geometry), this._symbol2, !0));
                            var a = this._getGraphicsLayer();
                            this._mouseOverHandle = k.connect(a, "onMouseOver", this, this._mouseOverHandler);
                            this._mouseOutHandle = k.connect(a, "onMouseOut", this, this._mouseOutHandler);
                            this._canDel && (this._ctxMenu = new b({
                                    style: "font-size: 12px; margin-left: 5px; margin-top: 5px;"
                                }), a = this._ctxDelete = new e({
                                    label: s.toolbars.edit.deleteLabel,
                                    iconClass: "vertexDeleteIcon",
                                    style: "outline: none;"
                                }),
                                this._deleteHandle = k.connect(a, "onClick", this, this._deleteHandler), this._ctxMenu.addChild(a), this._ctxMenu.startup())
                        },
                        _removeControllers: function() {
                            k.disconnect(this._firstMoveHandle);
                            k.disconnect(this._moveStopHandle);
                            k.disconnect(this._mouseOverHandle);
                            k.disconnect(this._mouseOutHandle);
                            k.disconnect(this._deleteHandle);
                            this._ctxMenu && (this._ctxDelete = null, this._unbindCtxNode(), this._ctxMenu.destroyRecursive());
                            this._remove(this._vertexMovers);
                            this._remove(this._mpVertexMovers);
                            this._vertexMovers =
                                this._mpVertexMovers = null
                        },
                        _add: function(a, c, b) {
                            var h, e, d = this.graphic,
                                g = [];
                            for (h = 0; h < a.length; h++) {
                                var l = a[h],
                                    s = [];
                                for (e = 0; e < l.length; e++) s.push(new n(l[e], c, d, h, e, l.length, this, b));
                                g.push(s)
                            }
                            return g
                        },
                        _remove: function(a) {
                            a && f.forEach(a, function(a) {
                                f.forEach(a, function(a) {
                                    a.destroy()
                                })
                            })
                        },
                        _refresh: function(a) {
                            a && f.forEach(a, function(a) {
                                f.forEach(a, function(a) {
                                    a.refresh()
                                })
                            })
                        },
                        _isNew: function(a) {
                            return -1 === f.indexOf(this._vertexMovers[a.segIndex], a) ? !0 : !1
                        },
                        _getGraphicsLayer: function() {
                            return this.toolbar._scratchGL
                        },
                        _deleteHandler: function(a) {
                            a = this._selectedMover;
                            this._updateRelatedGraphic(a, a.relatedGraphic, a.graphic.geometry, a.segIndex, a.ptIndex, a.segLength, !1, !0);
                            this._canAdd && this._deleteMidpoints(a);
                            this._deleteVertex(a);
                            this.toolbar._endOperation("VERTICES")
                        },
                        _mouseOverHandler: function(a) {
                            a = a.graphic;
                            var c = this._findMover(a);
                            c && (this.toolbar.onVertexMouseOver(this.graphic, c._getInfo()), c._placeholder || (this._selectedMover = c, this._canDel && this._bindCtxNode(a.getDojoShape().getNode())))
                        },
                        _mouseOutHandler: function(a) {
                            if (a =
                                this._findMover(a.graphic)) this.toolbar.onVertexMouseOut(this.graphic, a._getInfo())
                        },
                        _bindCtxNode: function(a) {
                            this._unbindCtxNode();
                            this._ctxDelete.set("disabled", this._selectedMover.segLength <= this.minLength ? !0 : !1);
                            this._ctxMenu.bindDomNode(a);
                            this._bindNode = a
                        },
                        _unbindCtxNode: function() {
                            var a = this._bindNode;
                            a && this._ctxMenu.unBindDomNode(a)
                        },
                        _findMover: function(a) {
                            var c, b = [];
                            c = this._mpVertexMovers;
                            f.forEach(this._vertexMovers, function(a) {
                                b = b.concat(a)
                            });
                            c && f.forEach(c, function(a) {
                                b = b.concat(a)
                            });
                            for (c = 0; c < b.length; c++) {
                                var h = b[c];
                                if (h.graphic === a) return h
                            }
                        },
                        _firstMoveHandler: function(a) {
                            !this._isNew(a) && this._canAdd && this._hideRelatedMidpoints(a);
                            this.toolbar._beginOperation("VERTICES")
                        },
                        _moveStopHandler: function(a, c) {
                            var b = this._isNew(a);
                            !c || !c.dx && !c.dy ? !b && this._canAdd && this._showRelatedMidpoints(a) : (this._updateRelatedGraphic(a, a.relatedGraphic, a.graphic.geometry, a.segIndex, a.ptIndex, a.segLength, b), this._canAdd && (b ? this._addMidpoints(a) : (this._repositionRelatedMidpoints(a), this._showRelatedMidpoints(a))),
                                this.toolbar._endOperation("VERTICES"))
                        },
                        _showRelatedMidpoints: function(a) {
                            var c = this._getAdjacentMidpoints(a.ptIndex, a.segLength),
                                b = this._mpVertexMovers[a.segIndex];
                            for (a = 0; a < c.length; a++) {
                                var h = b[c[a]];
                                h.graphic.show();
                                h.refresh()
                            }
                        },
                        _hideRelatedMidpoints: function(a) {
                            var c = this._getAdjacentMidpoints(a.ptIndex, a.segLength),
                                b = this._mpVertexMovers[a.segIndex];
                            for (a = 0; a < c.length; a++) b[c[a]].graphic.hide()
                        },
                        _repositionRelatedMidpoints: function(a) {
                            var c, b = this._getAdjacentMidpoints(a.ptIndex, a.segLength),
                                h = this._mpVertexMovers[a.segIndex];
                            for (c = 0; c < b.length; c++) {
                                var e = this._getAdjacentVertices(b[c], a.segLength),
                                    d = a.relatedGraphic.geometry.getPoint(a.segIndex, e[0]),
                                    e = a.relatedGraphic.geometry.getPoint(a.segIndex, e[1]),
                                    d = new l({
                                        x: (d.x + e.x) / 2,
                                        y: (d.y + e.y) / 2,
                                        spatialReference: d.spatialReference.toJson()
                                    });
                                h[b[c]].graphic.setGeometry(d)
                            }
                        },
                        _addMidpoints: function(a) {
                            var c = a.segIndex,
                                b = a.ptIndex,
                                h = a.segLength,
                                e = b + 1,
                                d, g = h + 1;
                            this._mpVertexMovers[c].splice(b, 1);
                            var s = this._vertexMovers[c];
                            for (d = 0; d < e; d++) s[d].segLength +=
                                1;
                            for (d = e; d < s.length; d++) s[d].ptIndex += 1, s[d].segLength += 1;
                            a.ptIndex = e;
                            a.segLength = s.length + 1;
                            s.splice(e, 0, a);
                            a.graphic.setSymbol(this._symbol1);
                            s = this._mpVertexMovers[c];
                            for (d = 0; d < b; d++) s[d].segLength += 1;
                            for (d = b; d < h - 1; d++) s[d].ptIndex += 1, s[d].segLength += 1;
                            e = this._getAdjacentVertices(b, g);
                            c = this._getAdjacentVertices(b + 1, g);
                            h = a.relatedGraphic.geometry.getPoint(a.segIndex, e[0]);
                            d = a.relatedGraphic.geometry.getPoint(a.segIndex, e[1]);
                            e = new l({
                                x: (h.x + d.x) / 2,
                                y: (h.y + d.y) / 2,
                                spatialReference: h.spatialReference.toJson()
                            });
                            h = a.relatedGraphic.geometry.getPoint(a.segIndex, c[0]);
                            d = a.relatedGraphic.geometry.getPoint(a.segIndex, c[1]);
                            c = new l({
                                x: (h.x + d.x) / 2,
                                y: (h.y + d.y) / 2,
                                spatialReference: h.spatialReference.toJson()
                            });
                            h = new n(e, this._symbol2, this.graphic, a.segIndex, b, g, this, !0);
                            a = new n(c, this._symbol2, this.graphic, a.segIndex, b + 1, g, this, !0);
                            s.splice(b, 0, h, a)
                        },
                        _deleteVertex: function(a) {
                            var c, b = a.ptIndex,
                                h = this._vertexMovers[a.segIndex];
                            for (c = 0; c < b; c++) h[c].segLength -= 1;
                            for (c = b + 1; c < h.length; c++) {
                                var e = h[c];
                                e.ptIndex -= 1;
                                e.segLength -=
                                    1
                            }
                            h.splice(b, 1);
                            c = a._getInfo();
                            a.destroy();
                            this.toolbar.onVertexDelete(this.graphic, c)
                        }
                    });
                    m.mixin(t, {
                        create: function(a, c, b) {
                            switch (a.geometry.type) {
                                case "multipoint":
                                    return new t.MultipointVertexEditor(a, c, b);
                                case "polyline":
                                    return new t.PolylineVertexEditor(a, c, b);
                                case "polygon":
                                    return new t.PolygonVertexEditor(a, c, b)
                            }
                        }
                    });
                    t.MultipointVertexEditor = p(t, {
                        declaredClass: "esri.toolbars._MultipointVertexEditor",
                        minLength: 1,
                        constructor: function() {
                            this._moveStartHandle = k.connect(n, "onMoveStart", this, this._moveStartHandler);
                            k.disconnect(this._firstMoveHandle)
                        },
                        destroy: function() {
                            this.inherited(arguments);
                            k.disconnect(this._moveStartHandle)
                        },
                        _getSegments: function(a) {
                            var c = a.points,
                                b = [],
                                h = a.spatialReference;
                            for (a = 0; a < c.length; a++) {
                                var e = c[a];
                                b.push(new l({
                                    x: e[0],
                                    y: e[1],
                                    spatialReference: h.toJson()
                                }))
                            }
                            return [b]
                        },
                        _getMidpointSegments: function(a) {
                            return []
                        },
                        _getControlPoints: function(a, c, b, h, e) {
                            return []
                        },
                        _getGraphicsLayer: function() {
                            return this.graphic._graphicsLayer
                        },
                        _mouseOverHandler: function(a) {
                            var c = a.graphic;
                            if (a = this._findMover(a)) this.toolbar.onVertexMouseOver(c,
                                a._getInfo()), this._selectedMover = a, this._canDel && this._bindCtxNode(a.graphic.getDojoShape().getNode())
                        },
                        _mouseOutHandler: function(a) {
                            var c = a.graphic;
                            if (a = this._findMover(a)) this.toolbar.onVertexMouseOut(c, a._getInfo())
                        },
                        _findMover: function(a) {
                            var c = [].concat(this._vertexMovers[0]),
                                b = a.target;
                            for (a = 0; a < c.length; a++) {
                                var h = c[a];
                                if (h.graphic.getDojoShape().getNode() === b) return h
                            }
                        },
                        _moveStartHandler: function(a) {
                            var c = a.ptIndex,
                                b = a.segLength - 1,
                                h = a.relatedGraphic.geometry.points;
                            a = h.splice(c, 1);
                            h.push(a[0]);
                            h = this._vertexMovers[0];
                            for (a = b; a > c; a--) h[a].ptIndex -= 1;
                            a = h.splice(c, 1);
                            h.push(a[0]);
                            a[0].ptIndex = b
                        },
                        _moveStopHandler: function(a) {
                            this._updateRelatedGraphic(a, a.relatedGraphic, a.graphic.geometry, a.segIndex, a.ptIndex, a.segLength);
                            this.toolbar._endOperation("VERTICES")
                        },
                        _updateRelatedGraphic: function(a, c, b, h, e, d, g, n) {
                            a = c.geometry;
                            n ? a.removePoint(e) : a.setPoint(e, b);
                            c.setGeometry(a)
                        },
                        _deleteMidpoints: function(a) {}
                    });
                    t.PolylineVertexEditor = p(t, {
                        declaredClass: "esri.toolbars._PolylineVertexEditor",
                        minLength: 2,
                        _getSegments: function(a) {
                            var c, b, h = a.paths,
                                e = [];
                            for (c = 0; c < h.length; c++) {
                                var d = h[c],
                                    g = [];
                                for (b = 0; b < d.length; b++) g.push(a.getPoint(c, b));
                                e.push(g)
                            }
                            return e
                        },
                        _getMidpointSegments: function(a) {
                            var c, b, h = a.paths,
                                e = [],
                                d = a.spatialReference;
                            for (c = 0; c < h.length; c++) {
                                var g = h[c],
                                    n = [];
                                for (b = 0; b < g.length - 1; b++) {
                                    var s = a.getPoint(c, b),
                                        t = a.getPoint(c, b + 1),
                                        s = new l({
                                            x: (s.x + t.x) / 2,
                                            y: (s.y + t.y) / 2,
                                            spatialReference: d.toJson()
                                        });
                                    n.push(s)
                                }
                                e.push(n)
                            }
                            return e
                        },
                        _getControlPoints: function(a, c, b, h, e) {
                            var d = this.map,
                                g, n;
                            this._isNew(a) ?
                                (a = h, h += 1, 0 <= a && (g = d.toScreen(c.getPoint(b, a))), h <= e && (n = d.toScreen(c.getPoint(b, h)))) : (a = h - 1, h += 1, 0 <= a && (g = d.toScreen(c.getPoint(b, a))), h < e && (n = d.toScreen(c.getPoint(b, h))));
                            return [g, n]
                        },
                        _getAdjacentMidpoints: function(a, c) {
                            var b = [],
                                h = a - 1;
                            0 <= h && b.push(h);
                            a < c - 1 && b.push(a);
                            return b
                        },
                        _getAdjacentVertices: function(a, c) {
                            return [a, a + 1]
                        },
                        _deleteMidpoints: function(a) {
                            var c = this._mpVertexMovers[a.segIndex],
                                b = c.length - 1,
                                h = this._getAdjacentMidpoints(a.ptIndex, a.segLength).sort(),
                                e, d = h[0];
                            for (e = 0; e < d; e++) c[e].segLength -=
                                1;
                            for (e = d + 1; e < c.length; e++) {
                                var g = c[e];
                                g.ptIndex -= 1;
                                g.segLength -= 1
                            }
                            if (1 === h.length) c.splice(d, 1)[0].destroy();
                            else {
                                g = this._getAdjacentVertices(d, b);
                                e = a.relatedGraphic.geometry.getPoint(a.segIndex, g[0]);
                                g = a.relatedGraphic.geometry.getPoint(a.segIndex, g[1]);
                                e = new l({
                                    x: (e.x + g.x) / 2,
                                    y: (e.y + g.y) / 2,
                                    spatialReference: e.spatialReference.toJson()
                                });
                                a = new n(e, this._symbol2, this.graphic, a.segIndex, d, b, this, !0);
                                c = c.splice(d, h.length, a);
                                for (e = 0; e < c.length; e++) c[e].destroy()
                            }
                        },
                        _updateRelatedGraphic: function(a, b,
                            e, h, d, n, g, l) {
                            a = b.geometry;
                            g ? a.insertPoint(h, d + 1, c.fromJson(e.toJson())) : l ? a.removePoint(h, d) : a.setPoint(h, d, c.fromJson(e.toJson()));
                            b.setGeometry(a)
                        }
                    });
                    t.PolygonVertexEditor = p(t, {
                        declaredClass: "esri.toolbars._PolygonVertexEditor",
                        minLength: 3,
                        _getSegments: function(a) {
                            var c, b, h = a.rings,
                                e = [];
                            for (c = 0; c < h.length; c++) {
                                var d = h[c],
                                    g = [];
                                for (b = 0; b < d.length - 1; b++) g.push(a.getPoint(c, b));
                                e.push(g)
                            }
                            return e
                        },
                        _getMidpointSegments: function(a) {
                            var c, b, h = a.rings,
                                e = [],
                                d = a.spatialReference;
                            for (c = 0; c < h.length; c++) {
                                var g =
                                    h[c],
                                    n = [];
                                for (b = 0; b < g.length - 1; b++) {
                                    var s = a.getPoint(c, b),
                                        t = a.getPoint(c, b + 1),
                                        s = new l({
                                            x: (s.x + t.x) / 2,
                                            y: (s.y + t.y) / 2,
                                            spatialReference: d.toJson()
                                        });
                                    n.push(s)
                                }
                                e.push(n)
                            }
                            return e
                        },
                        _getControlPoints: function(a, c, b, h, e) {
                            var d = this.map;
                            this._isNew(a) ? a = h : (a = h - 1, a = 0 > a ? (e + a) % e : a);
                            h = (h + 1) % e;
                            e = d.toScreen(c.getPoint(b, a));
                            c = d.toScreen(c.getPoint(b, h));
                            return [e, c]
                        },
                        _getAdjacentMidpoints: function(a, c) {
                            var b = a - 1;
                            return [0 > b ? (c + b) % c : b, a]
                        },
                        _getAdjacentVertices: function(a, c) {
                            return [a, (a + 1) % c]
                        },
                        _deleteMidpoints: function(a) {
                            var c =
                                a.ptIndex,
                                b = this._mpVertexMovers[a.segIndex],
                                h = b.length - 1,
                                e = this._getAdjacentMidpoints(c, a.segLength).sort(),
                                d, g;
                            g = e[0];
                            var s = e[e.length - 1];
                            if (0 === c) {
                                d = this._getAdjacentVertices(h - 1, h);
                                c = a.relatedGraphic.geometry.getPoint(a.segIndex, d[0]);
                                d = a.relatedGraphic.geometry.getPoint(a.segIndex, d[1]);
                                c = new l({
                                    x: (c.x + d.x) / 2,
                                    y: (c.y + d.y) / 2,
                                    spatialReference: c.spatialReference.toJson()
                                });
                                a = new n(c, this._symbol2, this.graphic, a.segIndex, h - 1, h, this, !0);
                                b.splice(s, 1, a)[0].destroy();
                                b.splice(g, 1)[0].destroy();
                                for (e =
                                    0; e < b.length - 1; e++) g = b[e], g.ptIndex -= 1, g.segLength -= 1
                            } else {
                                d = this._getAdjacentVertices(g, h);
                                c = a.relatedGraphic.geometry.getPoint(a.segIndex, d[0]);
                                d = a.relatedGraphic.geometry.getPoint(a.segIndex, d[1]);
                                c = new l({
                                    x: (c.x + d.x) / 2,
                                    y: (c.y + d.y) / 2,
                                    spatialReference: c.spatialReference.toJson()
                                });
                                a = new n(c, this._symbol2, this.graphic, a.segIndex, g, h, this, !0);
                                s = b.splice(g, e.length, a);
                                for (e = 0; e < s.length; e++) s[e].destroy();
                                for (e = 0; e < g; e++) b[e].segLength -= 1;
                                for (e = g + 1; e < b.length; e++) g = b[e], g.ptIndex -= 1, g.segLength -= 1
                            }
                        },
                        _updateRelatedGraphic: function(a, b, e, h, d, n, g, s) {
                            a = b.geometry;
                            g ? a.insertPoint(h, d + 1, c.fromJson(e.toJson())) : s ? (a.removePoint(h, d), 0 === d && a.setPoint(h, n - 1, c.fromJson(a.getPoint(h, 0).toJson()))) : (a.setPoint(h, d, c.fromJson(e.toJson())), 0 === d && a.setPoint(h, n, c.fromJson(e.toJson())));
                            b.setGeometry(a)
                        }
                    });
                    return t
                })
        },
        "esri/toolbars/_VertexMover": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/has dojo/sniff dojo/dom-style dojox/gfx/Moveable ../kernel ../geometry/Point ../graphic ../geometry/webMercatorUtils".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c) {
                    p = p(null, {
                        declaredClass: "esri.toolbars.VertexMover",
                        constructor: function(a, c, b, e, d, h, n, l) {
                            this.point = a;
                            this.symbol = c;
                            this.relatedGraphic = b;
                            this.segIndex = e;
                            this.ptIndex = d;
                            this.segLength = h;
                            this.editor = n;
                            this.map = n.map;
                            this._scratchGL = n.toolbar._scratchGL;
                            this._placeholder = l || !1;
                            this._type = b.geometry.type;
                            this._init();
                            this._enable()
                        },
                        refresh: function(a) {
                            if (a || this._needRefresh()) this._disable(), this._enable()
                        },
                        destroy: function() {
                            this._disable();
                            this.graphic && this._scratchGL.remove(this.graphic);
                            this.point = this.symbol = this.graphic = this.relatedGraphic = this.segIndex = this.ptIndex = this.segLength = this.editor = this.map = this._scratchGL = null
                        },
                        _init: function() {
                            var a = new n(this.point.toJson()),
                                a = new l(a, this.symbol);
                            switch (this._type) {
                                case "multipoint":
                                    a._shape = this.relatedGraphic.getDojoShape().children[this.ptIndex];
                                    break;
                                case "polyline":
                                case "polygon":
                                    this._scratchGL.add(a)
                            }
                            this.graphic = a
                        },
                        _enable: function() {
                            var a = this.graphic.getDojoShape();
                            a && (a._hasMover = !0, this._moveable = this._getMoveable(a),
                                (a = a.getEventSource()) && b.set(a, "cursor", this.editor.toolbar._cursors[this._placeholder ? "move-gv" : "move-v"]))
                        },
                        _disable: function() {
                            var a = this._moveable;
                            if (a) {
                                k.disconnect(this._startHandle);
                                k.disconnect(this._firstHandle);
                                k.disconnect(this._movingHandle);
                                k.disconnect(this._stopHandle);
                                var c = a.shape;
                                c && (c = c.getEventSource()) && b.set(c, "cursor", null);
                                a.destroy();
                                this._moveable = null
                            }
                        },
                        _needRefresh: function() {
                            var a = this.graphic.getDojoShape(),
                                c = !1;
                            if (a) switch (this._type) {
                                case "multipoint":
                                    var b = this.relatedGraphic.getDojoShape();
                                    b && (b = b.children[this.ptIndex], a !== b && (this.graphic._shape = b, c = !0));
                                    break;
                                case "polyline":
                                case "polygon":
                                    c = !a._hasMover
                            }
                            return c
                        },
                        _getMoveable: function(a) {
                            a = new e(a, d("mac") && d("ff") && !f("esri-touch") && {
                                leftButtonOnly: !0
                            });
                            this._startHandle = k.connect(a, "onMoveStart", this, this._moveStartHandler);
                            this._firstHandle = k.connect(a, "onFirstMove", this, this._firstMoveHandler);
                            this._movingHandle = k.connect(a, "onMoving", this, this._movingHandler);
                            this._stopHandle = k.connect(a, "onMoveStop", this, this._moveStopHandler);
                            return a
                        },
                        _getPtIndex: function() {
                            return this.ptIndex + (this._placeholder ? 1 : 0)
                        },
                        _getInfo: function() {
                            return {
                                graphic: this.graphic,
                                isGhost: this._placeholder,
                                segmentIndex: this.segIndex,
                                pointIndex: this._getPtIndex()
                            }
                        },
                        _moveStartHandler: function(a) {
                            var c = this.map;
                            c.snappingManager && c.snappingManager._setUpSnapping();
                            c.disableScrollWheelZoom();
                            a.shape.moveToFront();
                            this.constructor.onMoveStart(this);
                            this.editor.toolbar.onVertexMoveStart(this.relatedGraphic, this._getInfo())
                        },
                        _firstMoveHandler: function(a) {
                            var c =
                                a.shape,
                                b = this._getControlEdges(),
                                e = this._scratchGL._div,
                                d, h = [],
                                n = a.host.shape._wrapOffsets[0] || 0;
                            for (d = 0; d < b.length; d++) {
                                var l = b[d];
                                l.x1 += n;
                                l.x2 += n;
                                h.push([e.createLine({
                                    x1: l.x1,
                                    y1: l.y1,
                                    x2: l.x2,
                                    y2: l.y2
                                }).setStroke(this.editor._lineStroke), l.x1, l.y1, l.x2, l.y2])
                            }
                            c._lines = h;
                            a.shape.moveToFront();
                            this.constructor.onFirstMove(this);
                            this.editor.toolbar.onVertexFirstMove(this.relatedGraphic, this._getInfo())
                        },
                        _movingHandler: function(a, c, b) {
                            c = this.map;
                            f("esri-pointer") && (b = c.navigationManager.pointerEvents._processTouchEvent(b,
                                b), c.snappingManager && c.snappingManager._onSnappingMouseMoveHandler(b));
                            b = a.shape;
                            a = b.getTransform();
                            c = b._lines;
                            for (b = 0; b < c.length; b++) {
                                var e = c[b];
                                e[0].setShape({
                                    x1: e[1] + a.dx,
                                    y1: e[2] + a.dy,
                                    x2: e[3],
                                    y2: e[4]
                                })
                            }
                            this.editor.toolbar.onVertexMove(this.relatedGraphic, this._getInfo(), a)
                        },
                        _moveStopHandler: function(a) {
                            a = a.shape;
                            var b = this.editor.toolbar,
                                e = a.getTransform(),
                                d = this.map,
                                n = this.graphic,
                                h = b._geo ? c.geographicToWebMercator(n.geometry) : n.geometry;
                            d.enableScrollWheelZoom();
                            var l, f = a._lines;
                            if (f) {
                                for (l =
                                    0; l < f.length; l++) f[l][0].removeShape();
                                a._lines = null
                            }
                            l = !1;
                            var f = !0,
                                g = this._getInfo();
                            e && (e.dx || e.dy) ? this._placeholder && (this._placeholder = !1, l = !0) : f = !1;
                            var m;
                            d.snappingManager && (m = d.snappingManager._snappingPoint);
                            m = m || d.toMap(d.toScreen(h).offset(e.dx, e.dy));
                            d.snappingManager && d.snappingManager._killOffSnapping();
                            a.setTransform(null);
                            n.setGeometry(b._geo ? c.webMercatorToGeographic(m, !0) : m);
                            this.constructor.onMoveStop(this, e);
                            b.onVertexMoveStop(this.relatedGraphic, g, e);
                            if (!f) b.onVertexClick(this.relatedGraphic,
                                g);
                            if (l) b.onVertexAdd(this.relatedGraphic, this._getInfo())
                        },
                        _getControlEdges: function() {
                            var a = this.map,
                                c = this.relatedGraphic.geometry,
                                b = this.segIndex,
                                e = this.ptIndex,
                                d = this.segLength,
                                h = this._scratchGL._getTransform(),
                                n = h.dx,
                                h = h.dy,
                                l = a.toScreen(this.graphic.geometry),
                                a = l.x - n,
                                l = l.y - h,
                                g = [],
                                c = this.editor._getControlPoints(this, c, b, e, d);
                            c[0] && g.push({
                                x1: a,
                                y1: l,
                                x2: c[0].x - n,
                                y2: c[0].y - h
                            });
                            c[1] && g.push({
                                x1: a,
                                y1: l,
                                x2: c[1].x - n,
                                y2: c[1].y - h
                            });
                            return g
                        }
                    });
                    m.mixin(p, {
                        onMoveStart: function() {},
                        onFirstMove: function() {},
                        onMoveStop: function() {}
                    });
                    return p
                })
        },
        "esri/toolbars/TextEditor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/event dojo/has dojo/dom-construct dojo/dom-class dojo/dom-style dojo/keys ../kernel".split(" "), function(p, m, k, f, d, b, e, a, n, l) {
                return p(null, {
                    declaredClass: "esri.toolbars.TextEditor",
                    constructor: function(a, b, e) {
                        this._graphic = a;
                        this._map = b;
                        this._toolbar = e;
                        this._enable(this._graphic)
                    },
                    destroy: function() {
                        this._disable()
                    },
                    onEditStart: function() {},
                    onEditEnd: function() {},
                    _enable: function(a) {
                        this._editBox ? (k.disconnect(this._addEditBoxHandler), this._addEditBoxHandler = null) : (this._map.navigationManager.setImmediateClick(!0), this._addEditBoxHandler = k.connect(a.getLayer(), "onDblClick", this, function(b) {
                            this._map.navigationManager.setImmediateClick(!1);
                            b.graphic == a && (f.stop(b), k.disconnect(this._addEditBoxHandler), this._addEditBoxHandler = null, this._addTextBox(a))
                        }))
                    },
                    _disable: function() {
                        this._applyEdit();
                        this._addEditBoxHandler && (k.disconnect(this._addEditBoxHandler), this._addEditBoxHandler =
                            null);
                        this._removeTextBox();
                        this.onEditEnd(this._graphic);
                        this._toolbar.onTextEditEnd(this._graphic)
                    },
                    _addTextBox: function(c, d) {
                        if (!this._editBox) {
                            var l;
                            c.symbol.text || (c.symbol.text = "Tempt text", c.setSymbol(c.symbol), l = "");
                            var f = this._createInputTextStyle(c, this._map);
                            "" !== l && (l = d || c.symbol.text);
                            this._editBox = b.create("input", {
                                type: "text",
                                value: l
                            });
                            a.set(this._editBox, f);
                            e.add(this._editBox, "esriTextEditorInput");
                            this._map.container.appendChild(this._editBox);
                            this._editBox.focus();
                            this._editBoxKeyHandler =
                                k.connect(this._editBox, "onkeyup", m.hitch(this, function(a) {
                                    (a.keyCode == n.ENTER || a.keyCode === n.TAB) && this._disable()
                                }));
                            this._editBoxBlurHandler = k.connect(this._editBox, "onblur", m.hitch(this, function(a) {
                                this._disable()
                            }));
                            c.symbol.text = "";
                            c.setSymbol(c.symbol);
                            c.hide();
                            var q = this._editBox;
                            this._disableBoxHandler || (this._disableBoxHandler = this._map.on("zoom-start", m.hitch(this, function() {
                                this._disable()
                            })));
                            this._moveBoxHandler = this._map.on("pan", function(c) {
                                a.set(q, {
                                    left: this._editBoxLeft + c.delta.x +
                                        "px",
                                    top: this._editBoxTop + c.delta.y + "px"
                                })
                            });
                            this._moveBoxStartHandler = this._map.on("pan-start", function() {
                                this._editBoxLeft = parseFloat(a.get(q, "left"));
                                this._editBoxTop = parseFloat(a.get(q, "top"))
                            });
                            this.onEditStart(c, this._editBox);
                            this._toolbar.onTextEditStart(c, this._editBox)
                        }
                    },
                    _removeTextBox: function() {
                        this._editBoxBlurHandler && (k.disconnect(this._editBoxBlurHandler), this._editBoxBlurHandler = null);
                        this._editBox && (this._editBox.parentNode.removeChild(this._editBox), this._editBox = null);
                        this._disableBoxHandler &&
                            (this._disableBoxHandler.remove(), this._disableBoxHandler = null);
                        this._moveBoxHandler && (this._moveBoxHandler.remove(), this._moveBoxHandler = null);
                        this._moveBoxStartHandler && (this._moveBoxStartHandler.remove(), this._moveBoxStartHandler = null);
                        this._editBoxKeyHandler && (k.disconnect(this._editBoxKeyHandler), this._editBoxKeyHandler = null)
                    },
                    _createInputTextStyle: function(a, b) {
                        var e = a.getDojoShape().getTransformedBoundingBox(),
                            d = Math.abs(e[0].x - e[1].x) / Math.cos(a.symbol.angle / 180 * Math.PI),
                            l = a.symbol.font;
                        return {
                            "font-family": l.family,
                            "font-size": l.size + "px",
                            "font-style": l.style,
                            "font-variant": l.variant,
                            "font-weight": l.weight,
                            left: e[0].x + "px",
                            top: e[0].y + "px",
                            width: d + "px"
                        }
                    },
                    _applyEdit: function() {
                        if (this._editBox)
                            if (this._editBox.value) {
                                this._graphic.show();
                                var a = this._graphic.symbol;
                                a.text = this._editBox.value;
                                this._graphic.setSymbol(a)
                            } else this._graphic.getLayer().remove(this._graphic)
                    }
                })
            })
        },
        "esri/dijit/AttributeInspector": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/sniff dojo/_base/kernel dojo/has dojo/dom-style dojo/dom-construct ../kernel ../lang ../domUtils ../layers/InheritedDomain ../layers/FeatureLayer dojo/i18n!../nls/jsapi dojo/fx dojox/gfx dijit/_Widget dijit/_Templated dijit/Editor dijit/_editor/plugins/LinkDialog dijit/_editor/plugins/TextColor ./_EventedWidget ./editing/AttachmentEditor ./editing/Util ../tasks/query dijit/form/DateTextBox dijit/form/TextBox dijit/form/NumberTextBox dijit/form/FilteringSelect dijit/form/NumberSpinner dijit/form/Button dijit/form/SimpleTextarea dijit/form/ValidationTextBox dijit/form/TimeTextBox dijit/Tooltip dojo/data/ItemFileReadStore dojox/date/islamic dojox/date/islamic/Date dojox/date/islamic/locale dojo/text!./templates/AttributeInspector.html".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E, A, D, G, F, C, K, L, N, M, P, O, J, Q, I, S, R) {
                    var H = p([x, r, B], {
                        declaredClass: "esri.dijit.AttributeInspector",
                        widgetsInTemplate: !0,
                        templateString: R,
                        onUpdate: function() {},
                        onDelete: function() {},
                        onAttributeChange: function() {},
                        onNext: function() {},
                        onReset: function() {},
                        onCancel: function() {},
                        _navMessage: "( ${idx} ${of} ${numFeatures} )",
                        _currentAttributeFieldName: null,
                        _aiConnects: [],
                        _selection: [],
                        _toolTips: [],
                        _numFeatures: 0,
                        _featureIdx: 0,
                        _currentLInfo: null,
                        _currentFeature: null,
                        _rollbackInfo: null,
                        _eventMap: {
                            update: !0,
                            "delete": ["feature"],
                            "attribute-change": ["feature", "fieldName", "fieldValue"],
                            next: ["feature"],
                            reset: !0,
                            cancel: !0
                        },
                        constructor: function(a, c) {
                            m.mixin(this, q.widgets.attributeInspector);
                            a = a || {};
                            !a.featureLayer && !a.layerInfos && console.error("esri.AttributeInspector: please provide correct parameter in the constructor");
                            this._datePackage = this._getDatePackage(a);
                            this._layerInfos = a.layerInfos || [{
                                featureLayer: a.featureLayer,
                                options: a.options || []
                            }];
                            this._layerInfos =
                                k.filter(this._layerInfos, function(a) {
                                    return !a.disableAttributeUpdate
                                });
                            this._hideNavButtons = a.hideNavButtons || !1
                        },
                        postCreate: function() {
                            if (k.every(this._layerInfos, function(a) {
                                    return a.featureLayer.loaded
                                })) this._initLayerInfos(), this._createAttachmentEditor(), this.onFirstFeature();
                            else {
                                var a = this._layerInfos.length;
                                k.forEach(this._layerInfos, function(c) {
                                    c = c.featureLayer;
                                    if (c.loaded) a--;
                                    else var b = f.connect(c, "onLoad", this, function(c) {
                                        f.disconnect(b);
                                        b = null;
                                        a--;
                                        a || (this._initLayerInfos(), this._createAttachmentEditor(),
                                            this.onFirstFeature())
                                    })
                                }, this)
                            }
                        },
                        destroy: function() {
                            this._destroyAttributeTable();
                            k.forEach(this._aiConnects, f.disconnect);
                            delete this._aiConnects;
                            this._attachmentEditor && (this._attachmentEditor.destroy(), delete this._attachmentEditor);
                            delete this._layerInfos;
                            this._selection = this._currentFeature = this._currentLInfo = this._attributes = this._layerInfos = null;
                            this.inherited(arguments)
                        },
                        refresh: function() {
                            this._updateSelection()
                        },
                        first: function() {
                            this.onFirstFeature()
                        },
                        last: function() {
                            this.onLastFeature()
                        },
                        next: function() {
                            this.onNextFeature()
                        },
                        previous: function() {
                            this.onPreviousFeature()
                        },
                        showFeature: function(a, c) {
                            c && (this._createOnlyFirstTime = !0);
                            this._updateSelection([a], c);
                            this._updateUI()
                        },
                        onLayerSelectionChange: function(a, c, b) {
                            this._createOnlyFirstTime = !1;
                            this._featureIdx = b === u.SELECTION_NEW ? 0 : this._featureIdx;
                            this._updateSelection();
                            this._updateUI()
                        },
                        onLayerSelectionClear: function() {
                            this._selection && !(0 >= this._selection.length) && (this._featureIdx = this._numFeatures = 0, this._selection = [], this._currentLInfo =
                                this._currentFeature = null, this._updateUI())
                        },
                        onLayerUpdateEnd: function(a, c, b, g) {},
                        onLayerError: function(a, c, b, g) {},
                        onLayerEditsError: function(a, c, b, g) {},
                        onLayerEditsComplete: function(a, c, b, g) {
                            g = g || [];
                            if (g.length) {
                                var e = this._selection,
                                    h = a.featureLayer.objectIdField;
                                k.forEach(g, m.hitch(this, function(a) {
                                    k.some(e, m.hitch(this, function(c, b) {
                                        if (c.attributes[h] !== a.objectId) return !1;
                                        this._selection.splice(b, 1);
                                        return !0
                                    }))
                                }))
                            }
                            c = c || [];
                            c.length && (this._selection = E.findFeatures(c, a.featureLayer), this._featureIdx =
                                0);
                            g = this._numFeatures = this._selection ? this._selection.length : 0;
                            if (c.length) {
                                if (c = g ? this._selection[this._featureIdx] : null) g = c.getLayer().getEditCapabilities(), (!g.canCreate || g.canUpdate) && this._showFeature(c);
                                this._updateUI()
                            }
                            b = b || [];
                            if (b.length) {
                                var d = this._rollbackInfo;
                                k.forEach(b, function(c) {
                                    var g = E.findFeatures(b, a.featureLayer)[0];
                                    if (!c.success && g.attributes[a.featureLayer.objectIdField] === c.objectId && d) {
                                        c = d.graphic.attributes[d.field.name];
                                        var e = k.filter(this._currentLInfo.fieldInfos, function(a) {
                                            return a.fieldName ===
                                                d.field.name
                                        }, this)[0].dijit;
                                        g.attributes[d.field.name] = c;
                                        this._setValue(e, c)
                                    }
                                }, this)
                            }
                            this._rollbackInfo = null
                        },
                        onFieldValueChange: function(a, c) {
                            var b = a.field,
                                g = a.dijit,
                                e = this._currentFeature,
                                h = this._currentLInfo,
                                d = b.name;
                            if ("" !== g.displayedValue && "undefined" === typeof c && !g.isValid()) this._setValue(g, e.attributes[b.name]);
                            else if ("" !== g.displayedValue && g.displayedValue !== c && g.isValid && !g.isValid()) this._setValue(g, e.attributes[b.name]);
                            else {
                                c = "undefined" === typeof c ? null : c;
                                if ("esriFieldTypeDate" ===
                                    b.type) {
                                    if (g instanceof Array) {
                                        var l = g[0].getValue(),
                                            g = g[1].getValue();
                                        c = l && g ? new Date(l.getFullYear(), l.getMonth(), l.getDate(), g.getHours(), g.getMinutes(), g.getSeconds(), g.getMilliseconds()) : l || g || null
                                    } else c = g.getValue();
                                    c = c && c.getTime ? c.getTime() : c && c.toGregorian ? c.toGregorian().getTime() : c
                                }
                                if (this._currentFeature.attributes[b.name] !== c) {
                                    if (d === h.typeIdField) {
                                        var n = this._findFirst(h.types, "id", c);
                                        k.forEach(h.fieldInfos, function(a) {
                                            if ((b = a.field) && b.name !== h.typeIdField) a = a.dijit, this._setFieldDomain(a,
                                                n, b) && a && (this._setValue(a, e.attributes[b.name] + ""), !1 === a.isValid() && this._setValue(a, null))
                                        }, this)
                                    }
                                    this.onAttributeChange(e, d, c)
                                }
                            }
                        },
                        onDeleteBtn: function(a) {
                            this._deleteFeature()
                        },
                        onNextFeature: function(a) {
                            this._onNextFeature(1)
                        },
                        onPreviousFeature: function(a) {
                            this._onNextFeature(-1)
                        },
                        onFirstFeature: function(a) {
                            this._onNextFeature(-1 * this._featureIdx)
                        },
                        onLastFeature: function(a) {
                            this._onNextFeature(this._numFeatures - 1 - this._featureIdx)
                        },
                        _initLayerInfos: function() {
                            var a = this._layerInfos;
                            this._editorTrackingInfos = {};
                            k.forEach(a, this._initLayerInfo, this)
                        },
                        _initLayerInfo: function(a) {
                            var b = a.featureLayer,
                                g, e;
                            this._userIds = {};
                            e = b.id;
                            b.credential && (this._userIds[e] = b.credential.userId);
                            a.userId && (this._userIds[e] = a.userId);
                            this._connect(b, "onSelectionComplete", m.hitch(this, "onLayerSelectionChange", a));
                            this._connect(b, "onSelectionClear", m.hitch(this, "onLayerSelectionClear", a));
                            this._connect(b, "onEditsComplete", m.hitch(this, "onLayerEditsComplete", a));
                            this._connect(b, "error", m.hitch(this, "onLayerError", a));
                            this._connect(b,
                                "onUpdateEnd", m.hitch(this, "onLayerUpdateEnd", a));
                            a.showAttachments = b.hasAttachments ? c.isDefined(a.showAttachments) ? a.showAttachments : !0 : !1;
                            a.hideFields = a.hideFields || [];
                            a.htmlFields = a.htmlFields || [];
                            a.isEditable = b.isEditable() ? c.isDefined(a.isEditable) ? a.isEditable : !0 : !1;
                            a.typeIdField = b.typeIdField;
                            a.layerId = b.id;
                            a.types = b.types;
                            b.globalIdField && (g = this._findFirst(a.fieldInfos, "fieldName", b.globalIdField), !g && !a.showGlobalID && a.hideFields.push(b.globalIdField));
                            e = this._findFirst(a.fieldInfos, "fieldName",
                                b.objectIdField);
                            !e && !a.showObjectID && a.hideFields.push(b.objectIdField);
                            var h = this._getFields(a.featureLayer);
                            if (h) {
                                var d = a.fieldInfos || [],
                                    d = k.map(d, function(a) {
                                        return m.mixin({}, a)
                                    });
                                d.length ? a.fieldInfos = k.filter(k.map(d, m.hitch(this, function(c) {
                                    var b = c.stringFieldOption || (this._isInFields(c.fieldName, a.htmlFields) ? H.STRING_FIELD_OPTION_RICHTEXT : H.STRING_FIELD_OPTION_TEXTBOX);
                                    return m.mixin(c, {
                                        field: this._findFirst(h, "name", c.fieldName),
                                        stringFieldOption: b
                                    })
                                })), "return item.field;") : (h = k.filter(h,
                                    m.hitch(this, function(c) {
                                        return !this._isInFields(c.name, a.hideFields)
                                    })), a.fieldInfos = k.map(h, m.hitch(this, function(c) {
                                    var b = this._isInFields(c.name, a.htmlFields) ? H.STRING_FIELD_OPTION_RICHTEXT : H.STRING_FIELD_OPTION_TEXTBOX;
                                    return {
                                        fieldName: c.name,
                                        field: c,
                                        stringFieldOption: b
                                    }
                                })));
                                a.showGlobalID && !g && d.push(this._findFirst(h, "name", b.globalIdField));
                                a.showObjectID && !e && d.push(this._findFirst(h, "name", b.objectIdField));
                                g = [];
                                b.editFieldsInfo && (b.editFieldsInfo.creatorField && g.push(b.editFieldsInfo.creatorField),
                                    b.editFieldsInfo.creationDateField && g.push(b.editFieldsInfo.creationDateField), b.editFieldsInfo.editorField && g.push(b.editFieldsInfo.editorField), b.editFieldsInfo.editDateField && g.push(b.editFieldsInfo.editDateField));
                                this._editorTrackingInfos[b.id] = g
                            }
                        },
                        _createAttachmentEditor: function() {
                            this._attachmentEditor = null;
                            var a = k.filter(this._layerInfos, function(a) {
                                return a.showAttachments
                            });
                            a && a.length && (this._attachmentEditor = new z({
                                "class": "atiAttachmentEditor"
                            }, this.attachmentEditor), this._attachmentEditor.startup())
                        },
                        _setCurrentLInfo: function(a) {
                            var c = this._currentLInfo ? this._currentLInfo.featureLayer : null,
                                b = a.featureLayer;
                            if (c && (c.id === b.id && !c.ownershipBasedAccessControlForFeatures) && (c = b.getEditCapabilities(), !c.canCreate || c.canUpdate)) return;
                            this._currentLInfo = a;
                            this._createTable()
                        },
                        _updateSelection: function(a, c) {
                            this._selection = a || [];
                            k.forEach(this._layerInfos, this._getSelection, this);
                            var b = this._selection.length;
                            this._numFeatures = this._selection.length;
                            this._showFeature(b ? this._selection[this._featureIdx] :
                                null, c)
                        },
                        _getSelection: function(a) {
                            a = a.featureLayer.getSelectedFeatures();
                            this._selection = this._selection.concat(a)
                        },
                        _updateUI: function() {
                            var b = this._numFeatures,
                                g = this._currentLInfo;
                            this.layerName.innerHTML = !g || 0 === b ? this.NLS_noFeaturesSelected : g.featureLayer ? g.featureLayer.name : "";
                            a.set(this.attributeTable, "display", b ? "" : "none");
                            a.set(this.editButtons, "display", b ? "" : "none");
                            a.set(this.navButtons, "display", !this._hideNavButtons && 1 < b ? "" : "none");
                            this.navMessage.innerHTML = c.substitute({
                                idx: this._featureIdx +
                                    1,
                                of: this.NLS_of,
                                numFeatures: this._numFeatures
                            }, this._navMessage);
                            this._attachmentEditor && a.set(this._attachmentEditor.domNode, "display", g && g.showAttachments && b ? "" : "none");
                            a.set(this.deleteBtn.domNode, "display", !(g && !1 === g.showDeleteButton) && this._canDelete ? "" : "none");
                            this.domNode.parentNode && 0 < this.domNode.parentNode.scrollTop && (this.domNode.parentNode.scrollTop = 0)
                        },
                        _onNextFeature: function(a) {
                            this._featureIdx += a;
                            0 > this._featureIdx ? this._featureIdx = this._numFeatures - 1 : this._featureIdx >= this._numFeatures &&
                                (this._featureIdx = 0);
                            a = this._selection.length ? this._selection[this._featureIdx] : null;
                            this._showFeature(a);
                            this._updateUI();
                            this.onNext(a)
                        },
                        _deleteFeature: function() {
                            this.onDelete(this._currentFeature)
                        },
                        _showFeature: function(a, b) {
                            if (a) {
                                this._currentFeature = a;
                                var g = b ? b : a.getLayer(),
                                    e = g.getEditCapabilities({
                                        feature: a,
                                        userId: this._userIds[g.id]
                                    });
                                this._canUpdate = e.canUpdate;
                                this._canDelete = e.canDelete;
                                if (e = this._getLInfoFromFeatureLayer(g)) {
                                    this._setCurrentLInfo(e);
                                    var h = a.attributes,
                                        d = this._findFirst(e.types,
                                            "id", h[e.typeIdField]),
                                        l = null;
                                    k.forEach(e.fieldInfos, function(a) {
                                        l = a.field;
                                        var b = [];
                                        a.dijit && 1 < a.dijit.length ? k.forEach(a.dijit, function(a) {
                                            b.push(a)
                                        }) : b.push(a.dijit);
                                        k.forEach(b, m.hitch(this, function(a) {
                                            if (a) {
                                                var b = this._setFieldDomain(a, d, l),
                                                    g = h[l.name],
                                                    g = g && b && b.codedValues && b.codedValues.length ? b.codedValues[g] ? b.codedValues[g].name : g : g;
                                                c.isDefined(g) || (g = "");
                                                "dijit.form.DateTextBox" === a.declaredClass || "dijit.form.TimeTextBox" === a.declaredClass ? g = "" === g ? null : new Date(g) : "dijit.form.FilteringSelect" ===
                                                    a.declaredClass && (a._lastValueReported = null, g = h[l.name] + "");
                                                try {
                                                    this._setValue(a, g), "dijit.form.FilteringSelect" === a.declaredClass && !1 === a.isValid() && this._setValue(a, null)
                                                } catch (e) {
                                                    a.set("displayedValue", this.NLS_errorInvalid, !1)
                                                }
                                            }
                                        }))
                                    }, this);
                                    this._attachmentEditor && e.showAttachments && this._attachmentEditor.showAttachments(this._currentFeature, g);
                                    (g = g.getEditSummary(a)) ? (this.editorTrackingInfoDiv.innerHTML = g, s.show(this.editorTrackingInfoDiv)) : s.hide(this.editorTrackingInfoDiv)
                                }
                            }
                        },
                        _setFieldDomain: function(a,
                            b, g) {
                            if (!a) return null;
                            var e = g.domain;
                            b && b.domains && b.domains[g.name] && !1 === b.domains[g.name] instanceof t && (e = b.domains[g.name]);
                            if (!e) return null;
                            e.codedValues && 0 < e.codedValues.length ? (a.set("store", this._toStore(k.map(e.codedValues, function(a) {
                                return {
                                    id: a.code += "",
                                    name: a.name
                                }
                            }))), this._setValue(a, e.codedValues[0].code)) : (a.constraints = {
                                min: c.isDefined(e.minValue) ? e.minValue : Number.MIN_VALUE,
                                max: c.isDefined(e.maxValue) ? e.maxValue : Number.MAX_VALUE
                            }, this._setValue(a, a.constraints.min));
                            return e
                        },
                        _setValue: function(a, c) {
                            a.set && (a._onChangeActive = !1, a.set("value", c, !0), a._onChangeActive = !0)
                        },
                        _getFields: function(a) {
                            var b = a._getOutFields();
                            if (!b) return null;
                            a = a.fields;
                            return "*" == b ? a : k.filter(k.map(b, m.hitch(this, "_findFirst", a, "name")), c.isDefined)
                        },
                        _isInFields: function(a, c) {
                            return !a || !c && !c.length ? !1 : k.some(c, function(c) {
                                return c.toLowerCase() === a.toLowerCase()
                            })
                        },
                        _findFirst: function(a, c, b) {
                            return (a = k.filter(a, function(a) {
                                return a.hasOwnProperty(c) && a[c] === b
                            })) && a.length ? a[0] : null
                        },
                        _getLInfoFromFeatureLayer: function(a) {
                            return this._findFirst(this._layerInfos,
                                "layerId", a ? a.id : null)
                        },
                        _createTable: function() {
                            this._destroyAttributeTable();
                            this.attributeTable.innerHTML = "";
                            this._attributes = n.create("table", {
                                cellspacing: "0",
                                cellpadding: "0"
                            }, this.attributeTable);
                            var a = n.create("tbody", null, this._attributes),
                                c = this._currentLInfo,
                                b = this._findFirst(c.types, "id", this._currentFeature.attributes[c.typeIdField]);
                            k.forEach(c.fieldInfos, m.hitch(this, "_createField", b, a), this);
                            this._createOnlyFirstTime = !1
                        },
                        _createField: function(a, c, b) {
                            var g = this._currentLInfo,
                                e = b.field;
                            if (!this._isInFields(e.name, g.hideFields) && !this._isInFields(e.name, this._editorTrackingInfos[g.featureLayer.id])) {
                                var h = n.create("tr", null, c);
                                c = n.create("td", {
                                    innerHTML: b.label || e.alias || e.name,
                                    "class": "atiLabel"
                                }, h);
                                c = n.create("td", null, h);
                                var d, h = null,
                                    l = !1;
                                if (b.customField) n.place(b.customField.domNode || b.customField, n.create("div", null, c), "first"), d = b.customField;
                                else if (!1 === g.isEditable || !1 === e.editable || !1 === b.isEditable || "esriFieldTypeOID" === e.type || "esriFieldTypeGlobalID" === e.type || !this._canUpdate &&
                                    !this._createOnlyFirstTime) l = !0;
                                !d && g.typeIdField && e.name.toLowerCase() == g.typeIdField.toLowerCase() ? d = this._createTypeField(e, b, c) : d || (d = this._createDomainField(e, b, a, c));
                                if (!d) switch (e.type) {
                                    case "esriFieldTypeString":
                                        d = this._createStringField(e, b, c);
                                        break;
                                    case "esriFieldTypeDate":
                                        d = this._createDateField(e, b, c);
                                        b.format && b.format.time && (h = this._createTimeField(e, b, c));
                                        break;
                                    case "esriFieldTypeInteger":
                                    case "esriFieldTypeSmallInteger":
                                        d = this._createIntField(e, b, c);
                                        break;
                                    case "esriFieldTypeSingle":
                                    case "esriFieldTypeDouble":
                                        d =
                                            this._createFltField(e, b, c);
                                        break;
                                    default:
                                        d = this._createStringField(e, b, c)
                                }
                                b.tooltip && b.tooltip.length && this._toolTips.push(new O({
                                    connectId: [d.id],
                                    label: b.tooltip
                                }));
                                d.onChange = m.hitch(this, "onFieldValueChange", b);
                                d.set("disabled", l);
                                h ? (b.dijit = [d, h], h.onChange = m.hitch(this, "onFieldValueChange", b), h.set("disabled", l)) : b.dijit = d
                            }
                        },
                        _createTypeField: function(a, c, b) {
                            return (c = a.domain) && "range" === c.type && c.minValue === c.maxValue ? new G({
                                "class": "atiField"
                            }, n.create("div", null, b)) : new C({
                                "class": "atiField",
                                name: a.alias || a.name,
                                required: !a.nullable || !1,
                                store: this._toStore(k.map(this._currentLInfo.types, function(a) {
                                    return {
                                        id: a.id,
                                        name: a.name
                                    }
                                })),
                                searchAttr: "name"
                            }, n.create("div", null, b))
                        },
                        _createDomainField: function(a, c, b, g) {
                            c = a.domain;
                            b && b.domains && b.domains[a.name] && !1 === b.domains[a.name] instanceof t && (c = b.domains[a.name]);
                            return !c ? null : c.codedValues ? new C({
                                "class": "atiField",
                                name: a.alias || a.name,
                                searchAttr: "name",
                                required: !a.nullable || !1
                            }, n.create("div", null, g)) : new K({
                                "class": "atiField"
                            }, n.create("div",
                                null, g))
                        },
                        _createStringField: function(a, c, b) {
                            var e = {
                                "class": "atiField",
                                trim: !0,
                                maxLength: a.length
                            };
                            return c.stringFieldOption === H.STRING_FIELD_OPTION_TEXTAREA ? (e["class"] += " atiTextAreaField", new N(e, n.create("div", null, b))) : c.stringFieldOption === H.STRING_FIELD_OPTION_RICHTEXT ? (e["class"] += " atiRichTextField", e.height = "100%", e.width = "100%", e.plugins = c.richTextPlugins || "bold italic underline foreColor hiliteColor | justifyLeft justifyCenter justifyRight justifyFull | insertOrderedList insertUnorderedList indent outdent | createLink".split(" "),
                                a = new g(e, n.create("div", null, b)), a.startup(), a) : !a.nullable || !c.field || !c.field.nullable ? new M({
                                required: !0
                            }, n.create("div", null, b)) : new G(e, n.create("div", null, b))
                        },
                        _createTimeField: function(a, c, b) {
                            a = {
                                "class": "atiField",
                                trim: !0,
                                constraints: {
                                    formatLength: "medium"
                                }
                            };
                            this._datePackage && (a.datePackage = this._datePackage);
                            return new P(a, n.create("div", null, b))
                        },
                        _createDateField: function(a, c, b) {
                            a = {
                                "class": "atiField",
                                trim: !0
                            };
                            this._datePackage && (a.datePackage = this._datePackage);
                            return new D(a, n.create("div",
                                null, b))
                        },
                        _createIntField: function(a, c, b) {
                            return new F({
                                "class": "atiField",
                                constraints: "esriFieldTypeSmallInteger" === a.type ? {
                                    min: -32768,
                                    max: 32767,
                                    places: 0
                                } : {
                                    places: 0
                                },
                                invalidMessage: this.NLS_validationInt,
                                trim: !0
                            }, n.create("div", null, b))
                        },
                        _createFltField: function(a, c, b) {
                            var g = /\de[-+]?\d/i,
                                e = /[0-9]\d{0,2}(\.\d{3})*(,\d+)?$/i;
                            return new M({
                                validator: function(a, c) {
                                    this._maskValidSubsetError = !1;
                                    this._hasBeenBlurred = !0;
                                    return "" === a || null === a ? !0 : g.test(a) ? !0 : e.test(a) ? ("min" in c ? 0 <= this.compare(a, c.min) :
                                        1) && ("max" in c ? 0 >= this.compare(a, c.max) : 1) ? !0 : !1 : !1
                                },
                                "class": "atiField",
                                trim: !0,
                                constraints: {
                                    places: "0,40",
                                    min: -Infinity,
                                    max: Infinity,
                                    exponent: !0
                                },
                                invalidMessage: this.NLS_validationFlt
                            }, n.create("div", null, b))
                        },
                        _toStore: function(a) {
                            return new J({
                                data: {
                                    identifier: "id",
                                    label: "name",
                                    items: a
                                }
                            })
                        },
                        _connect: function(a, c, b) {
                            this._aiConnects.push(f.connect(a, c, b))
                        },
                        _getDatePackage: function(a) {
                            return null === a.datePackage ? null : a.datePackage ? a.datePackage : "ar" === b.locale ? "dojox.date.islamic" : null
                        },
                        _destroyAttributeTable: function() {
                            k.forEach(this._layerInfos,
                                function(a) {
                                    k.forEach(a.fieldInfos, function(a) {
                                        var c = a.dijit;
                                        if (c) {
                                            c._onChangeHandle = null;
                                            if (a.customField) return;
                                            c instanceof Array ? k.forEach(c, m.hitch(this, function(a) {
                                                a.destroyRecursive ? a.destroyRecursive() : a.destroy && a.destroy();
                                                a._onChangeHandle = null
                                            })) : c.destroyRecursive ? c.destroyRecursive() : c.destroy && c.destroy()
                                        }
                                        a.dijit = null
                                    }, this)
                                }, this);
                            k.forEach(this._toolTips, function(a) {
                                a.destroy()
                            });
                            this._toolTips = [];
                            this._attributes && n.destroy(this._attributes)
                        }
                    });
                    m.mixin(H, {
                        STRING_FIELD_OPTION_RICHTEXT: "richtext",
                        STRING_FIELD_OPTION_TEXTAREA: "textarea",
                        STRING_FIELD_OPTION_TEXTBOX: "textbox"
                    });
                    return H
                })
        },
        "dijit/Editor": function() {
            define("require dojo/_base/array dojo/_base/declare dojo/Deferred dojo/i18n dojo/dom-attr dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/keys dojo/_base/lang dojo/sniff dojo/string dojo/topic ./_Container ./Toolbar ./ToolbarSeparator ./layout/_LayoutWidget ./form/ToggleButton ./_editor/_Plugin ./_editor/plugins/EnterKeyHandling ./_editor/html ./_editor/range ./_editor/RichText ./main dojo/i18n!./_editor/nls/commands".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E) {
                    function A(a) {
                        return new g({
                            command: a.name
                        })
                    }

                    function D(a) {
                        return new g({
                            buttonClass: B,
                            command: a.name
                        })
                    }
                    k = k("dijit.Editor", z, {
                        plugins: null,
                        extraPlugins: null,
                        constructor: function() {
                            c.isArray(this.plugins) || (this.plugins = ["undo", "redo", "|", "cut", "copy", "paste", "|", "bold", "italic", "underline", "strikethrough", "|", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "|", "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", y]);
                            this._plugins = [];
                            this._editInterval = 1E3 * this.editActionInterval;
                            if (s("ie") || s("trident") || s("edge")) this.events.push("onBeforeDeactivate"), this.events.push("onBeforeActivate")
                        },
                        postMixInProperties: function() {
                            this.setValueDeferred = new f;
                            this.inherited(arguments)
                        },
                        postCreate: function() {
                            this.inherited(arguments);
                            this._steps = this._steps.slice(0);
                            this._undoedSteps = this._undoedSteps.slice(0);
                            c.isArray(this.extraPlugins) && (this.plugins = this.plugins.concat(this.extraPlugins));
                            this.commands = d.getLocalization("dijit._editor",
                                "commands", this.lang);
                            s("webkit") && n.set(this.domNode, "KhtmlUserSelect", "none")
                        },
                        startup: function() {
                            this.inherited(arguments);
                            this.toolbar || (this.toolbar = new w({
                                ownerDocument: this.ownerDocument,
                                dir: this.dir,
                                lang: this.lang,
                                "aria-label": this.id
                            }), this.header.appendChild(this.toolbar.domNode));
                            m.forEach(this.plugins, this.addPlugin, this);
                            this.setValueDeferred.resolve(!0);
                            e.add(this.iframe.parentNode, "dijitEditorIFrameContainer");
                            e.add(this.iframe, "dijitEditorIFrame");
                            b.set(this.iframe, "allowTransparency", !0);
                            this.toolbar.startup();
                            this.onNormalizedDisplayChanged()
                        },
                        destroy: function() {
                            m.forEach(this._plugins, function(a) {
                                a && a.destroy && a.destroy()
                            });
                            this._plugins = [];
                            this.toolbar.destroyRecursive();
                            delete this.toolbar;
                            this.inherited(arguments)
                        },
                        addPlugin: function(a, b) {
                            var e = c.isString(a) ? {
                                name: a
                            } : c.isFunction(a) ? {
                                ctor: a
                            } : a;
                            if (!e.setEditor) {
                                var h = {
                                    args: e,
                                    plugin: null,
                                    editor: this
                                };
                                e.name && (g.registry[e.name] ? h.plugin = g.registry[e.name](e) : u.publish(E._scopeName + ".Editor.getPlugin", h));
                                if (!h.plugin) try {
                                    var d =
                                        e.ctor || c.getObject(e.name) || p(e.name);
                                    d && (h.plugin = new d(e))
                                } catch (l) {
                                    throw Error(this.id + ": cannot find plugin [" + e.name + "]");
                                }
                                if (!h.plugin) throw Error(this.id + ": cannot find plugin [" + e.name + "]");
                                a = h.plugin
                            }
                            1 < arguments.length ? this._plugins[b] = a : this._plugins.push(a);
                            a.setEditor(this);
                            c.isFunction(a.setToolbar) && a.setToolbar(this.toolbar)
                        },
                        resize: function(a) {
                            a && r.prototype.resize.apply(this, arguments)
                        },
                        layout: function() {
                            var c = this._contentBox.h - (this.getHeaderHeight() + this.getFooterHeight() + a.getPadBorderExtents(this.iframe.parentNode).h +
                                a.getMarginExtents(this.iframe.parentNode).h);
                            this.editingArea.style.height = c + "px";
                            this.iframe && (this.iframe.style.height = "100%");
                            this._layoutMode = !0
                        },
                        _onIEMouseDown: function(a) {
                            var c, b = this.document.body,
                                g = b.clientWidth,
                                e = b.clientHeight,
                                h = b.clientLeft,
                                d = b.offsetWidth,
                                l = b.offsetHeight,
                                n = b.offsetLeft;
                            /^rtl$/i.test(b.dir || "") ? g < d && (a.x > g && a.x < d) && (c = !0) : a.x < h && a.x > n && (c = !0);
                            c || e < l && (a.y > e && a.y < l) && (c = !0);
                            c || (delete this._cursorToStart, delete this._savedSelection, "BODY" == a.target.tagName && this.defer("placeCursorAtEnd"),
                                this.inherited(arguments))
                        },
                        onBeforeActivate: function() {
                            this._restoreSelection()
                        },
                        onBeforeDeactivate: function(a) {
                            this.customUndo && this.endEditing(!0);
                            "BODY" != a.target.tagName && this._saveSelection()
                        },
                        customUndo: !0,
                        editActionInterval: 3,
                        beginEditing: function(a) {
                            this._inEditing || (this._inEditing = !0, this._beginEditing(a));
                            0 < this.editActionInterval && (this._editTimer && this._editTimer.remove(), this._editTimer = this.defer("endEditing", this._editInterval))
                        },
                        _steps: [],
                        _undoedSteps: [],
                        execCommand: function(a) {
                            if (this.customUndo &&
                                ("undo" == a || "redo" == a)) return this[a]();
                            this.customUndo && (this.endEditing(), this._beginEditing());
                            var c = this.inherited(arguments);
                            this.customUndo && this._endEditing();
                            return c
                        },
                        _pasteImpl: function() {
                            return this._clipboardCommand("paste")
                        },
                        _cutImpl: function() {
                            return this._clipboardCommand("cut")
                        },
                        _copyImpl: function() {
                            return this._clipboardCommand("copy")
                        },
                        _clipboardCommand: function(a) {
                            var c;
                            try {
                                if (c = this.document.execCommand(a, !1, null), s("webkit") && !c) throw {};
                            } catch (b) {
                                c = t.substitute, alert(c(this.commands.systemShortcut, [this.commands[a], c(this.commands[s("mac") ? "appleKey" : "ctrlKey"], [{
                                    cut: "X",
                                    copy: "C",
                                    paste: "V"
                                }[a]])])), c = !1
                            }
                            return c
                        },
                        queryCommandEnabled: function(a) {
                            return this.customUndo && ("undo" == a || "redo" == a) ? "undo" == a ? 1 < this._steps.length : 0 < this._undoedSteps.length : this.inherited(arguments)
                        },
                        _moveToBookmark: function(a) {
                            var b = a.mark,
                                g = a.mark;
                            a = a.isCollapsed;
                            var e, h, d;
                            if (g)
                                if (9 > s("ie") || 9 === s("ie") && s("quirks"))
                                    if (c.isArray(g)) b = [], m.forEach(g, function(a) {
                                        b.push(x.getNode(a, this.editNode))
                                    }, this), this.selection.moveToBookmark({
                                        mark: b,
                                        isCollapsed: a
                                    });
                                    else {
                                        if (g.startContainer && g.endContainer && (d = x.getSelection(this.window)) && d.removeAllRanges) d.removeAllRanges(), a = x.create(this.window), e = x.getNode(g.startContainer, this.editNode), h = x.getNode(g.endContainer, this.editNode), e && h && (a.setStart(e, g.startOffset), a.setEnd(h, g.endOffset), d.addRange(a))
                                    }
                            else if ((d = x.getSelection(this.window)) && d.removeAllRanges) d.removeAllRanges(), a = x.create(this.window), e = x.getNode(g.startContainer, this.editNode), h = x.getNode(g.endContainer, this.editNode),
                                e && h && (a.setStart(e, g.startOffset), a.setEnd(h, g.endOffset), d.addRange(a))
                        },
                        _changeToStep: function(a, c) {
                            this.setValue(c.text);
                            var b = c.bookmark;
                            b && this._moveToBookmark(b)
                        },
                        undo: function() {
                            var a = !1;
                            if (!this._undoRedoActive) {
                                this._undoRedoActive = !0;
                                this.endEditing(!0);
                                var c = this._steps.pop();
                                c && 0 < this._steps.length && (this.focus(), this._changeToStep(c, this._steps[this._steps.length - 1]), this._undoedSteps.push(c), this.onDisplayChanged(), delete this._undoRedoActive, a = !0);
                                delete this._undoRedoActive
                            }
                            return a
                        },
                        redo: function() {
                            var a = !1;
                            if (!this._undoRedoActive) {
                                this._undoRedoActive = !0;
                                this.endEditing(!0);
                                var c = this._undoedSteps.pop();
                                c && 0 < this._steps.length && (this.focus(), this._changeToStep(this._steps[this._steps.length - 1], c), this._steps.push(c), this.onDisplayChanged(), a = !0);
                                delete this._undoRedoActive
                            }
                            return a
                        },
                        endEditing: function(a) {
                            this._editTimer && (this._editTimer = this._editTimer.remove());
                            this._inEditing && (this._endEditing(a), this._inEditing = !1)
                        },
                        _getBookmark: function() {
                            var a = this.selection.getBookmark(),
                                b = [];
                            if (a && a.mark) {
                                var g = a.mark;
                                if (9 > s("ie") || 9 === s("ie") && s("quirks")) {
                                    var e = x.getSelection(this.window);
                                    if (c.isArray(g)) m.forEach(a.mark, function(a) {
                                        b.push(x.getIndex(a, this.editNode).o)
                                    }, this), a.mark = b;
                                    else if (e) {
                                        var h;
                                        e.rangeCount && (h = e.getRangeAt(0));
                                        a.mark = h ? h.cloneRange() : this.selection.getBookmark()
                                    }
                                }
                                try {
                                    a.mark && a.mark.startContainer && (b = x.getIndex(a.mark.startContainer, this.editNode).o, a.mark = {
                                        startContainer: b,
                                        startOffset: a.mark.startOffset,
                                        endContainer: a.mark.endContainer === a.mark.startContainer ?
                                            b : x.getIndex(a.mark.endContainer, this.editNode).o,
                                        endOffset: a.mark.endOffset
                                    })
                                } catch (d) {
                                    a.mark = null
                                }
                            }
                            return a
                        },
                        _beginEditing: function() {
                            0 === this._steps.length && this._steps.push({
                                text: v.getChildrenHtml(this.editNode),
                                bookmark: this._getBookmark()
                            })
                        },
                        _endEditing: function() {
                            var a = v.getChildrenHtml(this.editNode);
                            this._undoedSteps = [];
                            this._steps.push({
                                text: a,
                                bookmark: this._getBookmark()
                            })
                        },
                        onKeyDown: function(a) {
                            !s("ie") && (!this.iframe && a.keyCode == l.TAB && !this.tabIndent) && this._saveSelection();
                            if (this.customUndo) {
                                var c =
                                    a.keyCode;
                                if (a.ctrlKey && !a.shiftKey && !a.altKey) {
                                    if (90 == c || 122 == c) {
                                        a.stopPropagation();
                                        a.preventDefault();
                                        this.undo();
                                        return
                                    }
                                    if (89 == c || 121 == c) {
                                        a.stopPropagation();
                                        a.preventDefault();
                                        this.redo();
                                        return
                                    }
                                }
                                this.inherited(arguments);
                                switch (c) {
                                    case l.ENTER:
                                    case l.BACKSPACE:
                                    case l.DELETE:
                                        this.beginEditing();
                                        break;
                                    case 88:
                                    case 86:
                                        if (a.ctrlKey && !a.altKey && !a.metaKey) {
                                            this.endEditing();
                                            88 == a.keyCode ? this.beginEditing("cut") : this.beginEditing("paste");
                                            this.defer("endEditing", 1);
                                            break
                                        }
                                    default:
                                        if (!a.ctrlKey && !a.altKey &&
                                            !a.metaKey && (a.keyCode < l.F1 || a.keyCode > l.F15)) {
                                            this.beginEditing();
                                            break
                                        }
                                    case l.ALT:
                                        this.endEditing();
                                        break;
                                    case l.UP_ARROW:
                                    case l.DOWN_ARROW:
                                    case l.LEFT_ARROW:
                                    case l.RIGHT_ARROW:
                                    case l.HOME:
                                    case l.END:
                                    case l.PAGE_UP:
                                    case l.PAGE_DOWN:
                                        this.endEditing(!0);
                                    case l.CTRL:
                                    case l.SHIFT:
                                    case l.TAB:
                                }
                            } else this.inherited(arguments)
                        },
                        _onBlur: function() {
                            this.inherited(arguments);
                            this.endEditing(!0)
                        },
                        _saveSelection: function() {
                            try {
                                this._savedSelection = this._getBookmark()
                            } catch (a) {}
                        },
                        _restoreSelection: function() {
                            this._savedSelection &&
                                (delete this._cursorToStart, this.selection.isCollapsed() && this._moveToBookmark(this._savedSelection), delete this._savedSelection)
                        },
                        onClick: function() {
                            this.endEditing(!0);
                            this.inherited(arguments)
                        },
                        replaceValue: function(a) {
                            this.customUndo ? this.isClosed ? this.setValue(a) : (this.beginEditing(), a || (a = "\x26#160;"), this.setValue(a), this.endEditing()) : this.inherited(arguments)
                        },
                        _setDisabledAttr: function(a) {
                            this.setValueDeferred.then(c.hitch(this, function() {
                                !this.disabled && a || !this._buttonEnabledPlugins && a ?
                                    m.forEach(this._plugins, function(a) {
                                        a.set("disabled", !0)
                                    }) : this.disabled && !a && m.forEach(this._plugins, function(a) {
                                        a.set("disabled", !1)
                                    })
                            }));
                            this.inherited(arguments)
                        },
                        _setStateClass: function() {
                            try {
                                this.inherited(arguments), this.document && this.document.body && n.set(this.document.body, "color", n.get(this.iframe, "color"))
                            } catch (a) {}
                        }
                    });
                    c.mixin(g.registry, {
                        undo: A,
                        redo: A,
                        cut: A,
                        copy: A,
                        paste: A,
                        insertOrderedList: A,
                        insertUnorderedList: A,
                        indent: A,
                        outdent: A,
                        justifyCenter: A,
                        justifyFull: A,
                        justifyLeft: A,
                        justifyRight: A,
                        "delete": A,
                        selectAll: A,
                        removeFormat: A,
                        unlink: A,
                        insertHorizontalRule: A,
                        bold: D,
                        italic: D,
                        underline: D,
                        strikethrough: D,
                        subscript: D,
                        superscript: D,
                        "|": function() {
                            return new g({
                                setEditor: function(a) {
                                    this.editor = a;
                                    this.button = new h({
                                        ownerDocument: a.ownerDocument
                                    })
                                }
                            })
                        }
                    });
                    return k
                })
        },
        "dijit/Toolbar": function() {
            define("require dojo/_base/declare dojo/has dojo/keys dojo/ready ./_Widget ./_KeyNavContainer ./_TemplatedMixin".split(" "), function(p, m, k, f, d, b, e, a) {
                k("dijit-legacy-requires") && d(0, function() {
                    p(["dijit/ToolbarSeparator"])
                });
                return m("dijit.Toolbar", [b, a, e], {
                    templateString: '\x3cdiv class\x3d"dijit" role\x3d"toolbar" tabIndex\x3d"${tabIndex}" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e',
                    baseClass: "dijitToolbar",
                    _onLeftArrow: function() {
                        this.focusPrev()
                    },
                    _onRightArrow: function() {
                        this.focusNext()
                    }
                })
            })
        },
        "dijit/ToolbarSeparator": function() {
            define(["dojo/_base/declare", "dojo/dom", "./_Widget", "./_TemplatedMixin"], function(p, m, k, f) {
                return p("dijit.ToolbarSeparator", [k, f], {
                    templateString: '\x3cdiv class\x3d"dijitToolbarSeparator dijitInline" role\x3d"presentation"\x3e\x3c/div\x3e',
                    buildRendering: function() {
                        this.inherited(arguments);
                        m.setSelectable(this.domNode, !1)
                    },
                    isFocusable: function() {
                        return !1
                    }
                })
            })
        },
        "dijit/_editor/_Plugin": function() {
            define(["dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "../Destroyable", "../form/Button"], function(p, m, k, f, d) {
                m = m("dijit._editor._Plugin", f, {
                    constructor: function(b) {
                        this.params = b || {};
                        k.mixin(this, this.params);
                        this._attrPairNames = {}
                    },
                    editor: null,
                    iconClassPrefix: "dijitEditorIcon",
                    button: null,
                    command: "",
                    useDefaultCommand: !0,
                    buttonClass: d,
                    disabled: !1,
                    getLabel: function(b) {
                        return this.editor.commands[b]
                    },
                    _initButton: function() {
                        if (this.command.length) {
                            var b = this.getLabel(this.command),
                                e = this.editor,
                                a = this.iconClassPrefix + " " + this.iconClassPrefix + this.command.charAt(0).toUpperCase() + this.command.substr(1);
                            this.button || (b = k.mixin({
                                label: b,
                                ownerDocument: e.ownerDocument,
                                dir: e.dir,
                                lang: e.lang,
                                showLabel: !1,
                                iconClass: a,
                                dropDown: this.dropDown,
                                tabIndex: "-1"
                            }, this.params || {}), delete b.name, this.button = new this.buttonClass(b))
                        }
                        this.get("disabled") &&
                            this.button && this.button.set("disabled", this.get("disabled"))
                    },
                    destroy: function() {
                        this.dropDown && this.dropDown.destroyRecursive();
                        this.inherited(arguments)
                    },
                    connect: function(b, e, a) {
                        this.own(p.connect(b, e, this, a))
                    },
                    updateState: function() {
                        var b = this.editor,
                            e = this.command,
                            a, d;
                        if (b && b.isLoaded && e.length) {
                            var l = this.get("disabled");
                            if (this.button) try {
                                d = !l && b.queryCommandEnabled(e), this.enabled !== d && (this.enabled = d, this.button.set("disabled", !d)), d && "boolean" == typeof this.button.checked && (a = b.queryCommandState(e),
                                    this.checked !== a && (this.checked = a, this.button.set("checked", b.queryCommandState(e))))
                            } catch (c) {
                                console.log(c)
                            }
                        }
                    },
                    setEditor: function(b) {
                        this.editor = b;
                        this._initButton();
                        this.button && this.useDefaultCommand && (this.editor.queryCommandAvailable(this.command) ? this.own(this.button.on("click", k.hitch(this.editor, "execCommand", this.command, this.commandArg))) : this.button.domNode.style.display = "none");
                        this.own(this.editor.on("NormalizedDisplayChanged", k.hitch(this, "updateState")))
                    },
                    setToolbar: function(b) {
                        this.button &&
                            b.addChild(this.button)
                    },
                    set: function(b, e) {
                        if ("object" === typeof b) {
                            for (var a in b) this.set(a, b[a]);
                            return this
                        }
                        a = this._getAttrNames(b);
                        if (this[a.s]) var d = this[a.s].apply(this, Array.prototype.slice.call(arguments, 1));
                        else this._set(b, e);
                        return d || this
                    },
                    get: function(b) {
                        var e = this._getAttrNames(b);
                        return this[e.g] ? this[e.g]() : this[b]
                    },
                    _setDisabledAttr: function(b) {
                        this._set("disabled", b);
                        this.updateState()
                    },
                    _getAttrNames: function(b) {
                        var e = this._attrPairNames;
                        if (e[b]) return e[b];
                        var a = b.charAt(0).toUpperCase() +
                            b.substr(1);
                        return e[b] = {
                            s: "_set" + a + "Attr",
                            g: "_get" + a + "Attr"
                        }
                    },
                    _set: function(b, e) {
                        this[b] = e
                    }
                });
                m.registry = {};
                return m
            })
        },
        "dijit/_editor/plugins/EnterKeyHandling": function() {
            define("dojo/_base/declare dojo/dom-construct dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/_base/window dojo/window ../_Plugin ../RichText ../range".split(" "), function(p, m, k, f, d, b, e, a, n, l, c) {
                return p("dijit._editor.plugins.EnterKeyHandling", n, {
                    blockNodeForEnter: "BR",
                    constructor: function(a) {
                        a && ("blockNodeForEnter" in a && (a.blockNodeForEnter =
                            a.blockNodeForEnter.toUpperCase()), f.mixin(this, a))
                    },
                    setEditor: function(a) {
                        if (this.editor !== a)
                            if (this.editor = a, "BR" == this.blockNodeForEnter) this.editor.customUndo = !0, a.onLoadDeferred.then(f.hitch(this, function(c) {
                                this.own(d(a.document, "keydown", f.hitch(this, function(a) {
                                    if (a.keyCode == k.ENTER) {
                                        var c = f.mixin({}, a);
                                        c.shiftKey = !0;
                                        this.handleEnterKey(c) || (a.stopPropagation(), a.preventDefault())
                                    }
                                })));
                                9 <= b("ie") && 10 >= b("ie") && this.own(d(a.document, "paste", f.hitch(this, function(a) {
                                    setTimeout(f.hitch(this,
                                        function() {
                                            var a = this.editor.document.selection.createRange();
                                            a.move("character", -1);
                                            a.select();
                                            a.move("character", 1);
                                            a.select()
                                        }), 0)
                                })));
                                return c
                            }));
                            else if (this.blockNodeForEnter) {
                            var c = f.hitch(this, "handleEnterKey");
                            a.addKeyHandler(13, 0, 0, c);
                            a.addKeyHandler(13, 0, 1, c);
                            this.own(this.editor.on("KeyPressed", f.hitch(this, "onKeyPressed")))
                        }
                    },
                    onKeyPressed: function() {
                        if (this._checkListLater) {
                            if (this.editor.selection.isCollapsed()) {
                                var a = this.editor.selection.getAncestorElement("LI");
                                if (a) {
                                    b("mozilla") &&
                                        "LI" == a.parentNode.parentNode.nodeName && (a = a.parentNode.parentNode);
                                    var e = a.firstChild;
                                    if (e && 1 == e.nodeType && ("UL" == e.nodeName || "OL" == e.nodeName)) a.insertBefore(e.ownerDocument.createTextNode("\u00a0"), e), e = c.create(this.editor.window), e.setStart(a.firstChild, 0), a = c.getSelection(this.editor.window, !0), a.removeAllRanges(), a.addRange(e)
                                } else l.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter), (a = this.editor.selection.getAncestorElement(this.blockNodeForEnter)) ? (a.innerHTML =
                                    this.bogusHtmlContent, 9 >= b("ie") && (a = this.editor.document.selection.createRange(), a.move("character", -1), a.select())) : console.error("onKeyPressed: Cannot find the new block node")
                            }
                            this._checkListLater = !1
                        }
                        this._pressedEnterInBlock && (this._pressedEnterInBlock.previousSibling && this.removeTrailingBr(this._pressedEnterInBlock.previousSibling), delete this._pressedEnterInBlock)
                    },
                    bogusHtmlContent: "\x26#160;",
                    blockNodes: /^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,
                    handleEnterKey: function(e) {
                        var d, n, q, f, h = this.editor.document,
                            r, k, g;
                        if (e.shiftKey) {
                            e = this.editor.selection.getParentElement();
                            if (f = c.getAncestor(e, this.blockNodes)) {
                                if ("LI" == f.tagName) return !0;
                                e = c.getSelection(this.editor.window);
                                d = e.getRangeAt(0);
                                d.collapsed || (d.deleteContents(), e = c.getSelection(this.editor.window), d = e.getRangeAt(0));
                                if (c.atBeginningOfContainer(f, d.startContainer, d.startOffset)) r = h.createElement("br"), d = c.create(this.editor.window), f.insertBefore(r, f.firstChild), d.setStartAfter(r), e.removeAllRanges(), e.addRange(d);
                                else if (c.atEndOfContainer(f,
                                        d.startContainer, d.startOffset)) d = c.create(this.editor.window), r = h.createElement("br"), f.appendChild(r), f.appendChild(h.createTextNode("\u00a0")), d.setStart(f.lastChild, 0), e.removeAllRanges(), e.addRange(d);
                                else return (k = d.startContainer) && 3 == k.nodeType ? (g = k.nodeValue, n = h.createTextNode(g.substring(0, d.startOffset)), q = h.createTextNode(g.substring(d.startOffset)), f = h.createElement("br"), "" == q.nodeValue && b("webkit") && (q = h.createTextNode("\u00a0")), m.place(n, k, "after"), m.place(f, n, "after"), m.place(q,
                                    f, "after"), m.destroy(k), d = c.create(this.editor.window), d.setStart(q, 0), e.removeAllRanges(), e.addRange(d), !1) : !0
                            } else if (e = c.getSelection(this.editor.window), e.rangeCount) {
                                if ((d = e.getRangeAt(0)) && d.startContainer) d.collapsed || (d.deleteContents(), e = c.getSelection(this.editor.window), d = e.getRangeAt(0)), (k = d.startContainer) && 3 == k.nodeType ? (f = d.startOffset, k.length < f && (q = this._adjustNodeAndOffset(k, f), k = q.node, f = q.offset), g = k.nodeValue, n = h.createTextNode(g.substring(0, f)), q = h.createTextNode(g.substring(f)),
                                    f = h.createElement("br"), q.length || (q = h.createTextNode("\u00a0")), n.length ? m.place(n, k, "after") : n = k, m.place(f, n, "after"), m.place(q, f, "after"), m.destroy(k)) : (0 <= d.startOffset && (r = k.childNodes[d.startOffset]), f = h.createElement("br"), q = h.createTextNode("\u00a0"), r ? (m.place(f, r, "before"), m.place(q, f, "after")) : (k.appendChild(f), k.appendChild(q))), d = c.create(this.editor.window), d.setStart(q, 0), d.setEnd(q, q.length), e.removeAllRanges(), e.addRange(d), this.editor.selection.collapse(!0)
                            } else l.prototype.execCommand.call(this.editor,
                                "inserthtml", "\x3cbr\x3e");
                            return !1
                        }
                        var y = !0;
                        e = c.getSelection(this.editor.window);
                        d = e.getRangeAt(0);
                        d.collapsed || (d.deleteContents(), e = c.getSelection(this.editor.window), d = e.getRangeAt(0));
                        r = c.getBlockAncestor(d.endContainer, null, this.editor.editNode);
                        var v = r.blockNode;
                        if (this._checkListLater = v && ("LI" == v.nodeName || "LI" == v.parentNode.nodeName)) return b("mozilla") && (this._pressedEnterInBlock = v), /^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(v.innerHTML) &&
                            (v.innerHTML = "", b("webkit") && (d = c.create(this.editor.window), d.setStart(v, 0), e.removeAllRanges(), e.addRange(d)), this._checkListLater = !1), !0;
                        if (!r.blockNode || r.blockNode === this.editor.editNode) {
                            try {
                                l.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter)
                            } catch (x) {}
                            r = {
                                blockNode: this.editor.selection.getAncestorElement(this.blockNodeForEnter),
                                blockContainer: this.editor.editNode
                            };
                            if (r.blockNode) {
                                if (r.blockNode != this.editor.editNode && !(r.blockNode.textContent || r.blockNode.innerHTML).replace(/^\s+|\s+$/g,
                                        "").length) return this.removeTrailingBr(r.blockNode), !1
                            } else r.blockNode = this.editor.editNode;
                            e = c.getSelection(this.editor.window);
                            d = e.getRangeAt(0)
                        }
                        v = h.createElement(this.blockNodeForEnter);
                        v.innerHTML = this.bogusHtmlContent;
                        this.removeTrailingBr(r.blockNode);
                        q = d.endOffset;
                        y = d.endContainer;
                        y.length < q && (q = this._adjustNodeAndOffset(y, q), y = q.node, q = q.offset);
                        if (c.atEndOfContainer(r.blockNode, y, q)) r.blockNode === r.blockContainer ? r.blockNode.appendChild(v) : m.place(v, r.blockNode, "after"), y = !1, d = c.create(this.editor.window),
                            d.setStart(v, 0), e.removeAllRanges(), e.addRange(d), this.editor.height && a.scrollIntoView(v);
                        else if (c.atBeginningOfContainer(r.blockNode, d.startContainer, d.startOffset)) m.place(v, r.blockNode, r.blockNode === r.blockContainer ? "first" : "before"), v.nextSibling && this.editor.height && (d = c.create(this.editor.window), d.setStart(v.nextSibling, 0), e.removeAllRanges(), e.addRange(d), a.scrollIntoView(v.nextSibling)), y = !1;
                        else {
                            r.blockNode === r.blockContainer ? r.blockNode.appendChild(v) : m.place(v, r.blockNode, "after");
                            y = !1;
                            r.blockNode.style && (v.style && r.blockNode.style.cssText) && (v.style.cssText = r.blockNode.style.cssText);
                            if ((k = d.startContainer) && 3 == k.nodeType) {
                                q = d.endOffset;
                                k.length < q && (q = this._adjustNodeAndOffset(k, q), k = q.node, q = q.offset);
                                g = k.nodeValue;
                                n = h.createTextNode(g.substring(0, q));
                                q = h.createTextNode(g.substring(q, g.length));
                                m.place(n, k, "before");
                                m.place(q, k, "after");
                                m.destroy(k);
                                for (n = n.parentNode; n !== r.blockNode;) {
                                    g = h.createElement(n.tagName);
                                    n.style && (g.style && n.style.cssText) && (g.style.cssText = n.style.cssText);
                                    "FONT" === n.tagName && (n.color && (g.color = n.color), n.face && (g.face = n.face), n.size && (g.size = n.size));
                                    for (d = q; d;) k = d.nextSibling, g.appendChild(d), d = k;
                                    m.place(g, n, "after");
                                    q = g;
                                    n = n.parentNode
                                }
                                d = q;
                                if (1 == d.nodeType || 3 == d.nodeType && d.nodeValue) v.innerHTML = "";
                                for (n = d; d;) k = d.nextSibling, v.appendChild(d), d = k
                            }
                            d = c.create(this.editor.window);
                            h = n;
                            if ("BR" !== this.blockNodeForEnter) {
                                for (; h;) f = h, h = k = h.firstChild;
                                f && f.parentNode ? (v = f.parentNode, d.setStart(v, 0), e.removeAllRanges(), e.addRange(d), this.editor.height && a.scrollIntoView(v),
                                    b("mozilla") && (this._pressedEnterInBlock = r.blockNode)) : y = !0
                            } else d.setStart(v, 0), e.removeAllRanges(), e.addRange(d), this.editor.height && a.scrollIntoView(v), b("mozilla") && (this._pressedEnterInBlock = r.blockNode)
                        }
                        return y
                    },
                    _adjustNodeAndOffset: function(a, c) {
                        for (; a.length < c && a.nextSibling && 3 == a.nextSibling.nodeType;) c -= a.length, a = a.nextSibling;
                        return {
                            node: a,
                            offset: c
                        }
                    },
                    removeTrailingBr: function(a) {
                        if (a = /P|DIV|LI/i.test(a.tagName) ? a : this.editor.selection.getParentOfType(a, ["P", "DIV", "LI"])) a.lastChild &&
                            (1 < a.childNodes.length && 3 == a.lastChild.nodeType && /^[\s\xAD]*$/.test(a.lastChild.nodeValue) || "BR" == a.lastChild.tagName) && m.destroy(a.lastChild), a.childNodes.length || (a.innerHTML = this.bogusHtmlContent)
                    }
                })
            })
        },
        "dijit/_editor/RichText": function() {
            define("dojo/_base/array dojo/_base/config dojo/_base/declare dojo/_base/Deferred dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/_base/kernel dojo/keys dojo/_base/lang dojo/on dojo/query dojo/domReady dojo/sniff dojo/string dojo/topic dojo/_base/unload dojo/_base/url dojo/window ../_Widget ../_CssStateMixin ../selection ./range ./html ../focus ../main".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E, A, D, G, F) {
                    var C = k("dijit._editor.RichText", [x, z], {
                        constructor: function(a) {
                            this.contentPreFilters = [];
                            this.contentPostFilters = [];
                            this.contentDomPreFilters = [];
                            this.contentDomPostFilters = [];
                            this.editingAreaStyleSheets = [];
                            this.events = [].concat(this.events);
                            this._keyHandlers = {};
                            a && t.isString(a.value) && (this.value = a.value);
                            this.onLoadDeferred = new f
                        },
                        baseClass: "dijitEditor",
                        inheritWidth: !1,
                        focusOnLoad: !1,
                        name: "",
                        styleSheets: "",
                        height: "300px",
                        minHeight: "1em",
                        isClosed: !0,
                        isLoaded: !1,
                        _SEPARATOR: "@@**%%__RICHTEXTBOUNDRY__%%**@@",
                        _NAME_CONTENT_SEP: "@@**%%:%%**@@",
                        onLoadDeferred: null,
                        isTabIndent: !1,
                        disableSpellCheck: !1,
                        postCreate: function() {
                            "textarea" === this.domNode.tagName.toLowerCase() && console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
                            this.contentPreFilters = [t.trim, t.hitch(this, "_preFixUrlAttributes")].concat(this.contentPreFilters);
                            h("mozilla") && (this.contentPreFilters = [this._normalizeFontStyle].concat(this.contentPreFilters),
                                this.contentPostFilters = [this._removeMozBogus].concat(this.contentPostFilters));
                            h("webkit") && (this.contentPreFilters = [this._removeWebkitBogus].concat(this.contentPreFilters), this.contentPostFilters = [this._removeWebkitBogus].concat(this.contentPostFilters));
                            if (h("ie") || h("trident")) this.contentPostFilters = [this._normalizeFontStyle].concat(this.contentPostFilters), this.contentDomPostFilters = [t.hitch(this, "_stripBreakerNodes")].concat(this.contentDomPostFilters);
                            this.contentDomPostFilters = [t.hitch(this,
                                "_stripTrailingEmptyNodes")].concat(this.contentDomPostFilters);
                            this.inherited(arguments);
                            B.publish(F._scopeName + "._editor.RichText::init", this)
                        },
                        startup: function() {
                            this.inherited(arguments);
                            this.open();
                            this.setupDefaultShortcuts()
                        },
                        setupDefaultShortcuts: function() {
                            var a = t.hitch(this, function(a, c) {
                                    return function() {
                                        return !this.execCommand(a, c)
                                    }
                                }),
                                c = {
                                    b: a("bold"),
                                    i: a("italic"),
                                    u: a("underline"),
                                    a: a("selectall"),
                                    s: function() {
                                        this.save(!0)
                                    },
                                    m: function() {
                                        this.isTabIndent = !this.isTabIndent
                                    },
                                    1: a("formatblock",
                                        "h1"),
                                    2: a("formatblock", "h2"),
                                    3: a("formatblock", "h3"),
                                    4: a("formatblock", "h4"),
                                    "\\": a("insertunorderedlist")
                                };
                            h("ie") || (c.Z = a("redo"));
                            for (var b in c) this.addKeyHandler(b, !0, !1, c[b])
                        },
                        events: ["onKeyDown", "onKeyUp"],
                        captureEvents: [],
                        _editorCommandsLocalized: !1,
                        _localizeEditorCommands: function() {
                            if (C._editorCommandsLocalized) this._local2NativeFormatNames = C._local2NativeFormatNames, this._native2LocalFormatNames = C._native2LocalFormatNames;
                            else {
                                C._editorCommandsLocalized = !0;
                                C._local2NativeFormatNames = {};
                                C._native2LocalFormatNames = {};
                                this._local2NativeFormatNames = C._local2NativeFormatNames;
                                this._native2LocalFormatNames = C._native2LocalFormatNames;
                                for (var c = "div p pre h1 h2 h3 h4 h5 h6 ol ul address".split(" "), b = "", e, g = 0; e = c[g++];) b = "l" !== e.charAt(1) ? b + ("\x3c" + e + "\x3e\x3cspan\x3econtent\x3c/span\x3e\x3c/" + e + "\x3e\x3cbr/\x3e") : b + ("\x3c" + e + "\x3e\x3cli\x3econtent\x3c/li\x3e\x3c/" + e + "\x3e\x3cbr/\x3e");
                                var d = a.create("div", {
                                    style: {
                                        position: "absolute",
                                        top: "0px",
                                        zIndex: 10,
                                        opacity: 0.01
                                    },
                                    innerHTML: b
                                });
                                this.ownerDocumentBody.appendChild(d);
                                c = t.hitch(this, function() {
                                    for (var c = d.firstChild; c;) try {
                                        this.selection.selectElement(c.firstChild);
                                        var b = c.tagName.toLowerCase();
                                        this._local2NativeFormatNames[b] = document.queryCommandValue("formatblock");
                                        this._native2LocalFormatNames[this._local2NativeFormatNames[b]] = b;
                                        c = c.nextSibling.nextSibling
                                    } catch (e) {}
                                    a.destroy(d)
                                });
                                this.defer(c)
                            }
                        },
                        open: function(c) {
                            if (!this.onLoadDeferred || 0 <= this.onLoadDeferred.fired) this.onLoadDeferred = new f;
                            this.isClosed || this.close();
                            B.publish(F._scopeName + "._editor.RichText::open",
                                this);
                            1 === arguments.length && c.nodeName && (this.domNode = c);
                            var n = this.domNode,
                                r;
                            if (t.isString(this.value)) r = this.value, n.innerHTML = "";
                            else if (n.nodeName && "textarea" == n.nodeName.toLowerCase()) {
                                var q = this.textarea = n;
                                this.name = q.name;
                                r = q.value;
                                n = this.domNode = this.ownerDocument.createElement("div");
                                n.setAttribute("widgetId", this.id);
                                q.removeAttribute("widgetId");
                                n.cssText = q.cssText;
                                n.className += " " + q.className;
                                a.place(n, q, "before");
                                var s = t.hitch(this, function() {
                                    l.set(q, {
                                        display: "block",
                                        position: "absolute",
                                        top: "-1000px"
                                    });
                                    if (h("ie")) {
                                        var a = q.style;
                                        this.__overflow = a.overflow;
                                        a.overflow = "hidden"
                                    }
                                });
                                h("ie") ? this.defer(s, 10) : s();
                                if (q.form) {
                                    var k = q.value;
                                    this.reset = function() {
                                        this.getValue() !== k && this.replaceValue(k)
                                    };
                                    u(q.form, "submit", t.hitch(this, function() {
                                        b.set(q, "disabled", this.disabled);
                                        q.value = this.getValue()
                                    }))
                                }
                            } else r = D.getChildrenHtml(n), n.innerHTML = "";
                            this.value = r;
                            n.nodeName && "LI" === n.nodeName && (n.innerHTML = " \x3cbr\x3e");
                            this.header = n.ownerDocument.createElement("div");
                            n.appendChild(this.header);
                            this.editingArea = n.ownerDocument.createElement("div");
                            n.appendChild(this.editingArea);
                            this.footer = n.ownerDocument.createElement("div");
                            n.appendChild(this.footer);
                            this.name || (this.name = this.id + "_AUTOGEN");
                            if ("" !== this.name && (!m.useXDomain || m.allowXdRichTextSave)) {
                                if ((r = d.byId(F._scopeName + "._editor.RichText.value")) && "" !== r.value)
                                    for (var s = r.value.split(this._SEPARATOR), x = 0, A; A = s[x++];)
                                        if (A = A.split(this._NAME_CONTENT_SEP), A[0] === this.name) {
                                            this.value = A[1];
                                            s = s.splice(x, 1);
                                            r.value = s.join(this._SEPARATOR);
                                            break
                                        }
                                C._globalSaveHandler || (C._globalSaveHandler = {}, g.addOnUnload(function() {
                                    for (var a in C._globalSaveHandler) {
                                        var c = C._globalSaveHandler[a];
                                        t.isFunction(c) && c()
                                    }
                                }));
                                C._globalSaveHandler[this.id] = t.hitch(this, "_saveContent")
                            }
                            this.isClosed = !1;
                            r = this.editorObject = this.iframe = this.ownerDocument.createElement("iframe");
                            r.id = this.id + "_iframe";
                            r.style.border = "none";
                            r.style.width = "100%";
                            this._layoutMode ? r.style.height = "100%" : 7 <= h("ie") ? (this.height && (r.style.height = this.height), this.minHeight && (r.style.minHeight =
                                this.minHeight)) : r.style.height = this.height ? this.height : this.minHeight;
                            r.frameBorder = 0;
                            r._loadFunc = t.hitch(this, function(a) {
                                this.window = a;
                                this.document = a.document;
                                this.selection = new E.SelectionManager(a);
                                h("ie") && this._localizeEditorCommands();
                                this.onLoad(this.get("value"))
                            });
                            s = this._getIframeDocTxt().replace(/\\/g, "\\\\").replace(/'/g, "\\'");
                            s = 11 > h("ie") ? 'javascript:document.open();try{parent.window;}catch(e){document.domain\x3d"' + document.domain + "\";}document.write('" + s + "');document.close()" : "javascript: '" +
                                s + "'";
                            this.editingArea.appendChild(r);
                            r.src = s;
                            "LI" === n.nodeName && (n.lastChild.style.marginTop = "-1.2em");
                            e.add(this.domNode, this.baseClass)
                        },
                        _local2NativeFormatNames: {},
                        _native2LocalFormatNames: {},
                        _getIframeDocTxt: function() {
                            var a = l.getComputedStyle(this.domNode),
                                b;
                            if (this["aria-label"]) b = this["aria-label"];
                            else {
                                var e = q('label[for\x3d"' + this.id + '"]', this.ownerDocument)[0] || d.byId(this["aria-labelledby"], this.ownerDocument);
                                e && (b = e.textContent || e.innerHTML || "")
                            }
                            var e = "\x3cdiv id\x3d'dijitEditorBody' role\x3d'textbox' aria-multiline\x3d'true' " +
                                (b ? " aria-label\x3d'" + r.escape(b) + "'" : "") + "\x3e\x3c/div\x3e",
                                g = [a.fontWeight, a.fontSize, a.fontFamily].join(" "),
                                n = a.lineHeight,
                                n = 0 <= n.indexOf("px") ? parseFloat(n) / parseFloat(a.fontSize) : 0 <= n.indexOf("em") ? parseFloat(n) : "normal",
                                f = "",
                                s = this;
                            this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig, function(a) {
                                a = a.replace(/^;/ig, "") + ";";
                                var c = a.split(":")[0];
                                if (c) {
                                    var c = t.trim(c),
                                        c = c.toLowerCase(),
                                        b, e = "";
                                    for (b = 0; b < c.length; b++) {
                                        var g = c.charAt(b);
                                        switch (g) {
                                            case "-":
                                                b++, g = c.charAt(b).toUpperCase();
                                            default:
                                                e +=
                                                    g
                                        }
                                    }
                                    l.set(s.domNode, e, "")
                                }
                                f += a + ";"
                            });
                            this.iframe.setAttribute("title", b);
                            return ["\x3c!DOCTYPE html\x3e", "\x3chtml lang\x3d'" + (this.lang || c.locale.replace(/-.*/, "")) + "'" + (this.isLeftToRight() ? "" : " dir\x3d'rtl'") + "\x3e\n", "\x3chead\x3e\n\x3cmeta http-equiv\x3d'Content-Type' content\x3d'text/html'\x3e\n", b ? "\x3ctitle\x3e" + r.escape(b) + "\x3c/title\x3e" : "", "\x3cstyle\x3e\n\tbody,html {\n\t\tbackground:transparent;\n\t\tpadding: 1px 0 0 0;\n\t\tmargin: -1px 0 0 0;\n\t}\n\tbody,html,#dijitEditorBody { outline: none; }html { height: 100%; width: 100%; overflow: hidden; }\n",
                                this.height ? "\tbody,#dijitEditorBody { height: 100%; width: 100%; overflow: auto; }\n" : "\tbody,#dijitEditorBody { min-height: " + this.minHeight + "; width: 100%; overflow-x: auto; overflow-y: hidden; }\n", "\tbody{\n\t\ttop:0px;\n\t\tleft:0px;\n\t\tright:0px;\n\t\tfont:", g, ";\n", this.height || h("opera") ? "" : "\t\tposition: fixed;\n", "\t\tline-height:", n, ";\n\t}\n\tp{ margin: 1em 0; }\n\tli \x3e ul:-moz-first-node, li \x3e ol:-moz-first-node{ padding-top: 1.2em; }\n", h("ie") || h("trident") || h("edge") ? "" : "\tli{ min-height:1.2em; }\n",
                                "\x3c/style\x3e\n", this._applyEditingAreaStyleSheets(), "\n\x3c/head\x3e\n\x3cbody role\x3d'application'", b ? " aria-label\x3d'" + r.escape(b) + "'" : "", "onload\x3d'try{frameElement \x26\x26 frameElement._loadFunc(window,document)}catch(e){document.domain\x3d\"" + document.domain + "\";frameElement._loadFunc(window,document)}' ", "style\x3d'" + f + "'\x3e", e, "\x3c/body\x3e\n\x3c/html\x3e"
                            ].join("")
                        },
                        _applyEditingAreaStyleSheets: function() {
                            var a = [];
                            this.styleSheets && (a = this.styleSheets.split(";"), this.styleSheets =
                                "");
                            a = a.concat(this.editingAreaStyleSheets);
                            this.editingAreaStyleSheets = [];
                            for (var c = "", b = 0, e, g = v.get(this.ownerDocument); e = a[b++];) e = (new y(g.location, e)).toString(), this.editingAreaStyleSheets.push(e), c += '\x3clink rel\x3d"stylesheet" type\x3d"text/css" href\x3d"' + e + '"/\x3e';
                            return c
                        },
                        addStyleSheet: function(a) {
                            var c = a.toString(),
                                b = v.get(this.ownerDocument);
                            if ("." === c.charAt(0) || "/" !== c.charAt(0) && !a.host) c = (new y(b.location, c)).toString(); - 1 < p.indexOf(this.editingAreaStyleSheets, c) || (this.editingAreaStyleSheets.push(c),
                                this.onLoadDeferred.then(t.hitch(this, function() {
                                    if (this.document.createStyleSheet) this.document.createStyleSheet(c);
                                    else {
                                        var a = this.document.getElementsByTagName("head")[0],
                                            b = this.document.createElement("link");
                                        b.rel = "stylesheet";
                                        b.type = "text/css";
                                        b.href = c;
                                        a.appendChild(b)
                                    }
                                })))
                        },
                        removeStyleSheet: function(a) {
                            var c = a.toString(),
                                b = v.get(this.ownerDocument);
                            if ("." === c.charAt(0) || "/" !== c.charAt(0) && !a.host) c = (new y(b.location, c)).toString();
                            a = p.indexOf(this.editingAreaStyleSheets, c); - 1 !== a && (delete this.editingAreaStyleSheets[a],
                                q('link[href\x3d"' + c + '"]', this.window.document).orphan())
                        },
                        disabled: !1,
                        _mozSettingProps: {
                            styleWithCSS: !1
                        },
                        _setDisabledAttr: function(a) {
                            a = !!a;
                            this._set("disabled", a);
                            if (this.isLoaded) {
                                var c = h("ie") && (this.isLoaded || !this.focusOnLoad);
                                c && (this.editNode.unselectable = "on");
                                this.editNode.contentEditable = !a;
                                this.editNode.tabIndex = a ? "-1" : this.tabIndex;
                                c && this.defer(function() {
                                    this.editNode && (this.editNode.unselectable = "off")
                                });
                                if (h("mozilla") && !a && this._mozSettingProps) {
                                    a = this._mozSettingProps;
                                    for (var b in a)
                                        if (a.hasOwnProperty(b)) try {
                                            this.document.execCommand(b, !1, a[b])
                                        } catch (e) {}
                                }
                                this._disabledOK = !0
                            }
                        },
                        onLoad: function(c) {
                            this.window.__registeredWindow || (this.window.__registeredWindow = !0, this._iframeRegHandle = G.registerIframe(this.iframe));
                            this.editNode = this.document.body.firstChild;
                            var b = this;
                            this.beforeIframeNode = a.place("\x3cdiv tabIndex\x3d-1\x3e\x3c/div\x3e", this.iframe, "before");
                            this.afterIframeNode = a.place("\x3cdiv tabIndex\x3d-1\x3e\x3c/div\x3e", this.iframe, "after");
                            this.iframe.onfocus = this.document.onfocus = function() {
                                b.editNode.focus()
                            };
                            this.focusNode =
                                this.editNode;
                            var e = this.events.concat(this.captureEvents),
                                g = this.iframe ? this.document : this.editNode;
                            this.own.apply(this, p.map(e, function(a) {
                                var c = a.toLowerCase().replace(/^on/, "");
                                return u(g, c, t.hitch(this, a))
                            }, this));
                            this.own(u(g, "mouseup", t.hitch(this, "onClick")));
                            h("ie") && (this.own(u(this.document, "mousedown", t.hitch(this, "_onIEMouseDown"))), this.editNode.style.zoom = 1);
                            h("webkit") && (this._webkitListener = this.own(u(this.document, "mouseup", t.hitch(this, "onDisplayChanged")))[0], this.own(u(this.document,
                                "mousedown", t.hitch(this, function(a) {
                                    (a = a.target) && (a === this.document.body || a === this.document) && this.defer("placeCursorAtEnd")
                                }))));
                            if (h("ie")) try {
                                this.document.execCommand("RespectVisibilityInDesign", !0, null)
                            } catch (d) {}
                            this.isLoaded = !0;
                            this.set("disabled", this.disabled);
                            e = t.hitch(this, function() {
                                this.setValue(c);
                                this.onLoadDeferred && !this.onLoadDeferred.isFulfilled() && this.onLoadDeferred.resolve(!0);
                                this.onDisplayChanged();
                                this.focusOnLoad && w(t.hitch(this, "defer", "focus", this.updateInterval));
                                this.value =
                                    this.getValue(!0)
                            });
                            this.setValueDeferred ? this.setValueDeferred.then(e) : e()
                        },
                        onKeyDown: function(a) {
                            if (a.keyCode === s.SHIFT || a.keyCode === s.ALT || a.keyCode === s.META || a.keyCode === s.CTRL) return !0;
                            if (a.keyCode === s.TAB && this.isTabIndent && (a.stopPropagation(), a.preventDefault(), this.queryCommandEnabled(a.shiftKey ? "outdent" : "indent"))) this.execCommand(a.shiftKey ? "outdent" : "indent");
                            if (a.keyCode == s.TAB && !this.isTabIndent && !a.ctrlKey && !a.altKey) return a.shiftKey ? this.beforeIframeNode.focus() : this.afterIframeNode.focus(), !0;
                            9 > h("ie") && (a.keyCode === s.BACKSPACE && "Control" === this.document.selection.type) && (a.stopPropagation(), a.preventDefault(), this.execCommand("delete"));
                            h("ff") && (a.keyCode === s.PAGE_UP || a.keyCode === s.PAGE_DOWN) && this.editNode.clientHeight >= this.editNode.scrollHeight && a.preventDefault();
                            var c = this._keyHandlers[a.keyCode],
                                b = arguments;
                            c && !a.altKey && p.some(c, function(c) {
                                if (!(c.shift ^ a.shiftKey) && !(c.ctrl ^ (a.ctrlKey || a.metaKey))) return c.handler.apply(this, b) || a.preventDefault(), !0
                            }, this);
                            this.defer("onKeyPressed",
                                1);
                            return !0
                        },
                        onKeyUp: function() {},
                        setDisabled: function(a) {
                            c.deprecated("dijit.Editor::setDisabled is deprecated", 'use dijit.Editor::attr("disabled",boolean) instead', 2);
                            this.set("disabled", a)
                        },
                        _setValueAttr: function(a) {
                            this.setValue(a)
                        },
                        _setDisableSpellCheckAttr: function(a) {
                            this.document ? b.set(this.document.body, "spellcheck", !a) : this.onLoadDeferred.then(t.hitch(this, function() {
                                b.set(this.document.body, "spellcheck", !a)
                            }));
                            this._set("disableSpellCheck", a)
                        },
                        addKeyHandler: function(a, c, b, e) {
                            "string" ==
                            typeof a && (a = a.toUpperCase().charCodeAt(0));
                            t.isArray(this._keyHandlers[a]) || (this._keyHandlers[a] = []);
                            this._keyHandlers[a].push({
                                shift: b || !1,
                                ctrl: c || !1,
                                handler: e
                            })
                        },
                        onKeyPressed: function() {
                            this.onDisplayChanged()
                        },
                        onClick: function(a) {
                            this.onDisplayChanged(a)
                        },
                        _onIEMouseDown: function() {
                            !this.focused && !this.disabled && this.focus()
                        },
                        _onBlur: function(a) {
                            (h("ie") || h("trident")) && this.defer(function() {
                                G.curNode || this.ownerDocumentBody.focus()
                            });
                            this.inherited(arguments);
                            var c = this.getValue(!0);
                            if (c !== this.value) this.onChange(c);
                            this._set("value", c)
                        },
                        _onFocus: function(a) {
                            this.disabled || (this._disabledOK || this.set("disabled", !1), this.inherited(arguments))
                        },
                        blur: function() {
                            !h("ie") && this.window.document.documentElement && this.window.document.documentElement.focus ? this.window.document.documentElement.focus() : this.ownerDocumentBody.focus && this.ownerDocumentBody.focus()
                        },
                        focus: function() {
                            this.isLoaded ? 9 > h("ie") ? this.iframe.fireEvent("onfocus", document.createEventObject()) : this.editNode.focus() : this.focusOnLoad = !0
                        },
                        updateInterval: 200,
                        _updateTimer: null,
                        onDisplayChanged: function() {
                            this._updateTimer && this._updateTimer.remove();
                            this._updateTimer = this.defer("onNormalizedDisplayChanged", this.updateInterval)
                        },
                        onNormalizedDisplayChanged: function() {
                            delete this._updateTimer
                        },
                        onChange: function() {},
                        _normalizeCommand: function(a, c) {
                            var b = a.toLowerCase();
                            "formatblock" === b ? h("safari") && void 0 === c && (b = "heading") : "hilitecolor" === b && !h("mozilla") && (b = "backcolor");
                            return b
                        },
                        _qcaCache: {},
                        queryCommandAvailable: function(a) {
                            var c = this._qcaCache[a];
                            return void 0 !==
                                c ? c : this._qcaCache[a] = this._queryCommandAvailable(a)
                        },
                        _queryCommandAvailable: function(a) {
                            switch (a.toLowerCase()) {
                                case "bold":
                                case "italic":
                                case "underline":
                                case "subscript":
                                case "superscript":
                                case "fontname":
                                case "fontsize":
                                case "forecolor":
                                case "hilitecolor":
                                case "justifycenter":
                                case "justifyfull":
                                case "justifyleft":
                                case "justifyright":
                                case "delete":
                                case "selectall":
                                case "toggledir":
                                case "createlink":
                                case "unlink":
                                case "removeformat":
                                case "inserthorizontalrule":
                                case "insertimage":
                                case "insertorderedlist":
                                case "insertunorderedlist":
                                case "indent":
                                case "outdent":
                                case "formatblock":
                                case "inserthtml":
                                case "undo":
                                case "redo":
                                case "strikethrough":
                                case "tabindent":
                                case "cut":
                                case "copy":
                                case "paste":
                                    return !0;
                                case "blockdirltr":
                                case "blockdirrtl":
                                case "dirltr":
                                case "dirrtl":
                                case "inlinedirltr":
                                case "inlinedirrtl":
                                    return h("ie") || h("trident") || h("edge");
                                case "inserttable":
                                case "insertcell":
                                case "insertcol":
                                case "insertrow":
                                case "deletecells":
                                case "deletecols":
                                case "deleterows":
                                case "mergecells":
                                case "splitcell":
                                    return !h("webkit");
                                default:
                                    return !1
                            }
                        },
                        execCommand: function(a, c) {
                            var b;
                            this.focused && this.focus();
                            a = this._normalizeCommand(a, c);
                            if (void 0 !== c) {
                                if ("heading" === a) throw Error("unimplemented");
                                if ("formatblock" ===
                                    a && (h("ie") || h("trident"))) c = "\x3c" + c + "\x3e"
                            }
                            var e = "_" + a + "Impl";
                            if (this[e]) b = this[e](c);
                            else if ((c = 1 < arguments.length ? c : null) || "createlink" !== a) b = this.document.execCommand(a, !1, c);
                            this.onDisplayChanged();
                            return b
                        },
                        queryCommandEnabled: function(a) {
                            if (this.disabled || !this._disabledOK) return !1;
                            a = this._normalizeCommand(a);
                            var c = "_" + a + "EnabledImpl";
                            return this[c] ? this[c](a) : this._browserQueryCommandEnabled(a)
                        },
                        queryCommandState: function(a) {
                            if (this.disabled || !this._disabledOK) return !1;
                            a = this._normalizeCommand(a);
                            try {
                                return this.document.queryCommandState(a)
                            } catch (c) {
                                return !1
                            }
                        },
                        queryCommandValue: function(a) {
                            if (this.disabled || !this._disabledOK) return !1;
                            a = this._normalizeCommand(a);
                            if (h("ie") && "formatblock" === a) a = this._native2LocalFormatNames[this.document.queryCommandValue(a)];
                            else if (h("mozilla") && "hilitecolor" === a) {
                                var c;
                                try {
                                    c = this.document.queryCommandValue("styleWithCSS")
                                } catch (b) {
                                    c = !1
                                }
                                this.document.execCommand("styleWithCSS", !1, !0);
                                a = this.document.queryCommandValue(a);
                                this.document.execCommand("styleWithCSS", !1, c)
                            } else a = this.document.queryCommandValue(a);
                            return a
                        },
                        _sCall: function(a, c) {
                            return this.selection[a].apply(this.selection, c)
                        },
                        placeCursorAtStart: function() {
                            this.focus();
                            var a = !1;
                            if (h("mozilla"))
                                for (var c = this.editNode.firstChild; c;) {
                                    if (3 === c.nodeType) {
                                        if (0 < c.nodeValue.replace(/^\s+|\s+$/g, "").length) {
                                            a = !0;
                                            this.selection.selectElement(c);
                                            break
                                        }
                                    } else if (1 === c.nodeType) {
                                        var a = !0,
                                            b = c.tagName ? c.tagName.toLowerCase() : "";
                                        /br|input|img|base|meta|area|basefont|hr|link/.test(b) ? this.selection.selectElement(c) :
                                            this.selection.selectElementChildren(c);
                                        break
                                    }
                                    c = c.nextSibling
                                } else a = !0, this.selection.selectElementChildren(this.editNode);
                            a && this.selection.collapse(!0)
                        },
                        placeCursorAtEnd: function() {
                            this.focus();
                            var a = !1;
                            if (h("mozilla"))
                                for (var c = this.editNode.lastChild; c;) {
                                    if (3 === c.nodeType) {
                                        if (0 < c.nodeValue.replace(/^\s+|\s+$/g, "").length) {
                                            a = !0;
                                            this.selection.selectElement(c);
                                            break
                                        }
                                    } else if (1 === c.nodeType) {
                                        a = !0;
                                        this.selection.selectElement(c.lastChild || c);
                                        break
                                    }
                                    c = c.previousSibling
                                } else a = !0, this.selection.selectElementChildren(this.editNode);
                            a && this.selection.collapse(!1)
                        },
                        getValue: function(a) {
                            return this.textarea && (this.isClosed || !this.isLoaded) ? this.textarea.value : this.isLoaded ? this._postFilterContent(null, a) : this.value
                        },
                        _getValueAttr: function() {
                            return this.getValue(!0)
                        },
                        setValue: function(a) {
                            if (this.isLoaded) {
                                if (this.textarea && (this.isClosed || !this.isLoaded)) this.textarea.value = a;
                                else {
                                    a = this._preFilterContent(a);
                                    var c = this.isClosed ? this.domNode : this.editNode;
                                    c.innerHTML = a;
                                    this._preDomFilterContent(c)
                                }
                                this.onDisplayChanged();
                                this._set("value",
                                    this.getValue(!0))
                            } else this.onLoadDeferred.then(t.hitch(this, function() {
                                this.setValue(a)
                            }))
                        },
                        replaceValue: function(a) {
                            this.isClosed ? this.setValue(a) : this.window && this.window.getSelection && !h("mozilla") ? this.setValue(a) : this.window && this.window.getSelection ? (a = this._preFilterContent(a), this.execCommand("selectall"), this.execCommand("inserthtml", a), this._preDomFilterContent(this.editNode)) : this.document && this.document.selection && this.setValue(a);
                            this._set("value", this.getValue(!0))
                        },
                        _preFilterContent: function(a) {
                            var c =
                                a;
                            p.forEach(this.contentPreFilters, function(a) {
                                a && (c = a(c))
                            });
                            return c
                        },
                        _preDomFilterContent: function(a) {
                            a = a || this.editNode;
                            p.forEach(this.contentDomPreFilters, function(c) {
                                c && t.isFunction(c) && c(a)
                            }, this)
                        },
                        _postFilterContent: function(a, c) {
                            var b;
                            t.isString(a) ? b = a : (a = a || this.editNode, this.contentDomPostFilters.length && (c && (a = t.clone(a)), p.forEach(this.contentDomPostFilters, function(c) {
                                a = c(a)
                            })), b = D.getChildrenHtml(a));
                            t.trim(b.replace(/^\xA0\xA0*/, "").replace(/\xA0\xA0*$/, "")).length || (b = "");
                            p.forEach(this.contentPostFilters,
                                function(a) {
                                    b = a(b)
                                });
                            return b
                        },
                        _saveContent: function() {
                            var a = d.byId(F._scopeName + "._editor.RichText.value");
                            a && (a.value && (a.value += this._SEPARATOR), a.value += this.name + this._NAME_CONTENT_SEP + this.getValue(!0))
                        },
                        escapeXml: function(a, c) {
                            a = a.replace(/&/gm, "\x26amp;").replace(/</gm, "\x26lt;").replace(/>/gm, "\x26gt;").replace(/"/gm, "\x26quot;");
                            c || (a = a.replace(/'/gm, "\x26#39;"));
                            return a
                        },
                        getNodeHtml: function(a) {
                            c.deprecated("dijit.Editor::getNodeHtml is deprecated", "use dijit/_editor/html::getNodeHtml instead",
                                2);
                            return D.getNodeHtml(a)
                        },
                        getNodeChildrenHtml: function(a) {
                            c.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated", "use dijit/_editor/html::getChildrenHtml instead", 2);
                            return D.getChildrenHtml(a)
                        },
                        close: function(c) {
                            if (!this.isClosed) {
                                arguments.length || (c = !0);
                                c && this._set("value", this.getValue(!0));
                                this.interval && clearInterval(this.interval);
                                this._webkitListener && (this._webkitListener.remove(), delete this._webkitListener);
                                h("ie") && (this.iframe.onfocus = null);
                                this.iframe._loadFunc = null;
                                this._iframeRegHandle &&
                                    (this._iframeRegHandle.remove(), delete this._iframeRegHandle);
                                if (this.textarea) {
                                    var b = this.textarea.style;
                                    b.position = "";
                                    b.left = b.top = "";
                                    h("ie") && (b.overflow = this.__overflow, this.__overflow = null);
                                    this.textarea.value = this.value;
                                    a.destroy(this.domNode);
                                    this.domNode = this.textarea
                                } else this.domNode.innerHTML = this.value;
                                delete this.iframe;
                                e.remove(this.domNode, this.baseClass);
                                this.isClosed = !0;
                                this.isLoaded = !1;
                                delete this.editNode;
                                delete this.focusNode;
                                this.window && this.window._frameElement && (this.window._frameElement =
                                    null);
                                this.editorObject = this.editingArea = this.document = this.window = null
                            }
                        },
                        destroy: function() {
                            this.isClosed || this.close(!1);
                            this._updateTimer && this._updateTimer.remove();
                            this.inherited(arguments);
                            C._globalSaveHandler && delete C._globalSaveHandler[this.id]
                        },
                        _removeMozBogus: function(a) {
                            return a.replace(/\stype="_moz"/gi, "").replace(/\s_moz_dirty=""/gi, "").replace(/_moz_resizing="(true|false)"/gi, "")
                        },
                        _removeWebkitBogus: function(a) {
                            a = a.replace(/\sclass="webkit-block-placeholder"/gi, "");
                            a = a.replace(/\sclass="apple-style-span"/gi,
                                "");
                            return a = a.replace(/<meta charset=\"utf-8\" \/>/gi, "")
                        },
                        _normalizeFontStyle: function(a) {
                            return a.replace(/<(\/)?strong([ \>])/gi, "\x3c$1b$2").replace(/<(\/)?em([ \>])/gi, "\x3c$1i$2")
                        },
                        _preFixUrlAttributes: function(a) {
                            return a.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl\x3d$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl\x3d$2$3$5$2")
                        },
                        _browserQueryCommandEnabled: function(a) {
                            if (!a) return !1;
                            if (h("ie") || h("trident") || h("edge")) return this.focused && !this.disabled;
                            var c = 9 > h("ie") ? this.document.selection.createRange() : this.document;
                            try {
                                return c.queryCommandEnabled(a)
                            } catch (b) {
                                return !1
                            }
                        },
                        _createlinkEnabledImpl: function() {
                            var a = !0;
                            return a = h("opera") ? this.window.getSelection().isCollapsed ? !0 : this.document.queryCommandEnabled("createlink") : this._browserQueryCommandEnabled("createlink")
                        },
                        _unlinkEnabledImpl: function() {
                            var a = !0;
                            return a = h("mozilla") || h("webkit") || h("ie") || h("trident") || h("edge") ?
                                this.selection.hasAncestorElement("a") : this._browserQueryCommandEnabled("unlink")
                        },
                        _inserttableEnabledImpl: function() {
                            var a = !0;
                            return a = h("mozilla") || h("webkit") ? !0 : this._browserQueryCommandEnabled("inserttable")
                        },
                        _cutEnabledImpl: function() {
                            var a = !0;
                            h("webkit") ? ((a = this.window.getSelection()) && (a = a.toString()), a = !!a) : a = this._browserQueryCommandEnabled("cut");
                            return a
                        },
                        _copyEnabledImpl: function() {
                            var a = !0;
                            h("webkit") ? ((a = this.window.getSelection()) && (a = a.toString()), a = !!a) : a = this._browserQueryCommandEnabled("copy");
                            return a
                        },
                        _pasteEnabledImpl: function() {
                            var a = !0;
                            return h("webkit") ? !0 : a = this._browserQueryCommandEnabled("paste")
                        },
                        _inserthorizontalruleImpl: function(a) {
                            return h("ie") ? this._inserthtmlImpl("\x3chr\x3e") : this.document.execCommand("inserthorizontalrule", !1, a)
                        },
                        _unlinkImpl: function(a) {
                            return this.queryCommandEnabled("unlink") && (h("mozilla") || h("webkit")) ? (a = this.selection.getAncestorElement("a"), this.selection.selectElement(a), this.document.execCommand("unlink", !1, null)) : this.document.execCommand("unlink", !1, a)
                        },
                        _hilitecolorImpl: function(a) {
                            var c;
                            this._handleTextColorOrProperties("hilitecolor", a) || (h("mozilla") ? (this.document.execCommand("styleWithCSS", !1, !0), console.log("Executing color command."), c = this.document.execCommand("hilitecolor", !1, a), this.document.execCommand("styleWithCSS", !1, !1)) : c = this.document.execCommand("hilitecolor", !1, a));
                            return c
                        },
                        _backcolorImpl: function(a) {
                            h("ie") && (a = a ? a : null);
                            var c = this._handleTextColorOrProperties("backcolor", a);
                            c || (c = this.document.execCommand("backcolor", !1, a));
                            return c
                        },
                        _forecolorImpl: function(a) {
                            h("ie") && (a = a ? a : null);
                            var c = !1;
                            (c = this._handleTextColorOrProperties("forecolor", a)) || (c = this.document.execCommand("forecolor", !1, a));
                            return c
                        },
                        _inserthtmlImpl: function(c) {
                            c = this._preFilterContent(c);
                            var b = !0;
                            if (9 > h("ie")) {
                                var e = this.document.selection.createRange();
                                if ("CONTROL" === this.document.selection.type.toUpperCase()) {
                                    for (var g = e.item(0); e.length;) e.remove(e.item(0));
                                    g.outerHTML = c
                                } else e.pasteHTML(c);
                                e.select()
                            } else if (8 > h("trident")) {
                                var d = A.getSelection(this.window);
                                if (d && d.rangeCount && d.getRangeAt) {
                                    e = d.getRangeAt(0);
                                    e.deleteContents();
                                    var n = a.create("div");
                                    n.innerHTML = c;
                                    for (var l, g = this.document.createDocumentFragment(); c = n.firstChild;) l = g.appendChild(c);
                                    e.insertNode(g);
                                    l && (e = e.cloneRange(), e.setStartAfter(l), e.collapse(!1), d.removeAllRanges(), d.addRange(e))
                                }
                            } else h("mozilla") && !c.length ? this.selection.remove() : b = this.document.execCommand("inserthtml", !1, c);
                            return b
                        },
                        _boldImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(), c = this._adaptIEFormatAreaAndExec("bold");
                            c || (c = this.document.execCommand("bold", !1, a));
                            return c
                        },
                        _italicImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(), c = this._adaptIEFormatAreaAndExec("italic");
                            c || (c = this.document.execCommand("italic", !1, a));
                            return c
                        },
                        _underlineImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(), c = this._adaptIEFormatAreaAndExec("underline");
                            c || (c = this.document.execCommand("underline", !1, a));
                            return c
                        },
                        _strikethroughImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(),
                                c = this._adaptIEFormatAreaAndExec("strikethrough");
                            c || (c = this.document.execCommand("strikethrough", !1, a));
                            return c
                        },
                        _superscriptImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(), c = this._adaptIEFormatAreaAndExec("superscript");
                            c || (c = this.document.execCommand("superscript", !1, a));
                            return c
                        },
                        _subscriptImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident")) this._adaptIESelection(), c = this._adaptIEFormatAreaAndExec("subscript");
                            c || (c = this.document.execCommand("subscript", !1, a));
                            return c
                        },
                        _fontnameImpl: function(a) {
                            var c;
                            if (h("ie") || h("trident")) c = this._handleTextColorOrProperties("fontname", a);
                            c || (c = this.document.execCommand("fontname", !1, a));
                            return c
                        },
                        _fontsizeImpl: function(a) {
                            var c;
                            if (h("ie") || h("trident")) c = this._handleTextColorOrProperties("fontsize", a);
                            c || (c = this.document.execCommand("fontsize", !1, a));
                            return c
                        },
                        _insertorderedlistImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident") || h("edge")) c = this._adaptIEList("insertorderedlist", a);
                            c || (c = this.document.execCommand("insertorderedlist", !1, a));
                            return c
                        },
                        _insertunorderedlistImpl: function(a) {
                            var c = !1;
                            if (h("ie") || h("trident") || h("edge")) c = this._adaptIEList("insertunorderedlist", a);
                            c || (c = this.document.execCommand("insertunorderedlist", !1, a));
                            return c
                        },
                        getHeaderHeight: function() {
                            return this._getNodeChildrenHeight(this.header)
                        },
                        getFooterHeight: function() {
                            return this._getNodeChildrenHeight(this.footer)
                        },
                        _getNodeChildrenHeight: function(a) {
                            var c = 0;
                            if (a && a.childNodes) {
                                var b;
                                for (b = 0; b < a.childNodes.length; b++) var e = n.position(a.childNodes[b]),
                                    c = c + e.h
                            }
                            return c
                        },
                        _isNodeEmpty: function(a, c) {
                            return 1 === a.nodeType ? 0 < a.childNodes.length ? this._isNodeEmpty(a.childNodes[0], c) : !0 : 3 === a.nodeType ? "" === a.nodeValue.substring(c) : !1
                        },
                        _removeStartingRangeFromRange: function(a, c) {
                            if (a.nextSibling) c.setStart(a.nextSibling, 0);
                            else {
                                for (var b = a.parentNode; b && null == b.nextSibling;) b = b.parentNode;
                                b && c.setStart(b.nextSibling, 0)
                            }
                            return c
                        },
                        _adaptIESelection: function() {
                            var a = A.getSelection(this.window);
                            if (a && a.rangeCount && !a.isCollapsed) {
                                for (var c = a.getRangeAt(0), b =
                                        c.startContainer, e = c.startOffset; 3 === b.nodeType && e >= b.length && b.nextSibling;) e -= b.length, b = b.nextSibling;
                                for (var g = null; this._isNodeEmpty(b, e) && b !== g;) g = b, c = this._removeStartingRangeFromRange(b, c), b = c.startContainer, e = 0;
                                a.removeAllRanges();
                                a.addRange(c)
                            }
                        },
                        _adaptIEFormatAreaAndExec: function(c) {
                            var b = A.getSelection(this.window),
                                e = this.document,
                                g, d, h, n, l, r, f;
                            if (c && b && b.isCollapsed) {
                                if (this.queryCommandValue(c)) {
                                    c = this._tagNamesForCommand(c);
                                    h = b.getRangeAt(0);
                                    n = h.startContainer;
                                    3 === n.nodeType && (d = h.endOffset,
                                        n.length < d && (d = this._adjustNodeAndOffset(g, d), n = d.node));
                                    for (; n && n !== this.editNode;) {
                                        g = n.tagName ? n.tagName.toLowerCase() : "";
                                        if (-1 < p.indexOf(c, g)) {
                                            f = n;
                                            break
                                        }
                                        n = n.parentNode
                                    }
                                    if (f && (g = h.startContainer, c = e.createElement(f.tagName), a.place(c, f, "after"), g && 3 === g.nodeType)) {
                                        d = h.endOffset;
                                        g.length < d && (d = this._adjustNodeAndOffset(g, d), g = d.node, d = d.offset);
                                        n = g.nodeValue;
                                        h = e.createTextNode(n.substring(0, d));
                                        var q = n.substring(d, n.length);
                                        q && (l = e.createTextNode(q));
                                        a.place(h, g, "before");
                                        l && (r = e.createElement("span"),
                                            r.className = "ieFormatBreakerSpan", a.place(r, g, "after"), a.place(l, r, "after"), l = r);
                                        a.destroy(g);
                                        h = h.parentNode;
                                        for (g = []; h !== f;) {
                                            n = h.tagName;
                                            d = {
                                                tagName: n
                                            };
                                            g.push(d);
                                            n = e.createElement(n);
                                            h.style && (n.style && h.style.cssText) && (n.style.cssText = h.style.cssText, d.cssText = h.style.cssText);
                                            "FONT" === h.tagName && (h.color && (n.color = h.color, d.color = h.color), h.face && (n.face = h.face, d.face = h.face), h.size && (n.size = h.size, d.size = h.size));
                                            h.className && (n.className = h.className, d.className = h.className);
                                            if (l)
                                                for (; l;) d = l.nextSibling,
                                                    n.appendChild(l), l = d;
                                            n.tagName == h.tagName ? (r = e.createElement("span"), r.className = "ieFormatBreakerSpan", a.place(r, h, "after"), a.place(n, r, "after")) : a.place(n, h, "after");
                                            l = n;
                                            h = h.parentNode
                                        }
                                        if (l) {
                                            if (1 === l.nodeType || 3 === l.nodeType && l.nodeValue) c.innerHTML = "";
                                            for (; l;) d = l.nextSibling, c.appendChild(l), l = d
                                        }
                                        if (g.length) {
                                            d = g.pop();
                                            l = e.createElement(d.tagName);
                                            d.cssText && l.style && (l.style.cssText = d.cssText);
                                            d.className && (l.className = d.className);
                                            "FONT" === d.tagName && (d.color && (l.color = d.color), d.face && (l.face =
                                                d.face), d.size && (l.size = d.size));
                                            for (a.place(l, c, "before"); g.length;) d = g.pop(), f = e.createElement(d.tagName), d.cssText && f.style && (f.style.cssText = d.cssText), d.className && (f.className = d.className), "FONT" === d.tagName && (d.color && (f.color = d.color), d.face && (f.face = d.face), d.size && (f.size = d.size)), l.appendChild(f), l = f;
                                            f = e.createTextNode(".");
                                            r.appendChild(f);
                                            l.appendChild(f)
                                        } else r = e.createElement("span"), r.className = "ieFormatBreakerSpan", f = e.createTextNode("."), r.appendChild(f), a.place(r, c, "before");
                                        l =
                                            A.create(this.window);
                                        l.setStart(f, 0);
                                        l.setEnd(f, f.length);
                                        b.removeAllRanges();
                                        b.addRange(l);
                                        this.selection.collapse(!1);
                                        f.parentNode.innerHTML = "";
                                        c.firstChild || a.destroy(c);
                                        return !0
                                    }
                                    return !1
                                }
                                h = b.getRangeAt(0);
                                if ((g = h.startContainer) && 3 === g.nodeType) return d = h.startOffset, g.length < d && (d = this._adjustNodeAndOffset(g, d), g = d.node, d = d.offset), n = g.nodeValue, h = e.createTextNode(n.substring(0, d)), q = n.substring(d), "" !== q && (l = e.createTextNode(n.substring(d))), r = e.createElement("span"), f = e.createTextNode("."),
                                    r.appendChild(f), h.length ? a.place(h, g, "after") : h = g, a.place(r, h, "after"), l && a.place(l, r, "after"), a.destroy(g), l = A.create(this.window), l.setStart(f, 0), l.setEnd(f, f.length), b.removeAllRanges(), b.addRange(l), e.execCommand(c), a.place(r.firstChild, r, "before"), a.destroy(r), l.setStart(f, 0), l.setEnd(f, f.length), b.removeAllRanges(), b.addRange(l), this.selection.collapse(!1), f.parentNode.innerHTML = "", !0
                            } else return !1
                        },
                        _adaptIEList: function(c) {
                            var b = A.getSelection(this.window);
                            if (b.isCollapsed && b.rangeCount &&
                                !this.queryCommandValue(c)) {
                                var e = b.getRangeAt(0),
                                    g = e.startContainer;
                                if (g && 3 == g.nodeType && !e.startOffset) return e = "ul", "insertorderedlist" === c && (e = "ol"), c = this.document.createElement(e), e = a.create("li", null, c), a.place(c, g, "before"), e.appendChild(g), a.create("br", null, c, "after"), c = A.create(this.window), c.setStart(g, 0), c.setEnd(g, g.length), b.removeAllRanges(), b.addRange(c), this.selection.collapse(!0), !0
                            }
                            return !1
                        },
                        _handleTextColorOrProperties: function(c, b) {
                            var e = A.getSelection(this.window),
                                g = this.document,
                                d, n, r, f, q;
                            b = b || null;
                            if (c && (e && e.isCollapsed) && e.rangeCount && (n = e.getRangeAt(0), (d = n.startContainer) && 3 === d.nodeType)) {
                                q = n.startOffset;
                                d.length < q && (n = this._adjustNodeAndOffset(d, q), d = n.node, q = n.offset);
                                r = d.nodeValue;
                                n = g.createTextNode(r.substring(0, q));
                                "" !== r.substring(q) && (f = g.createTextNode(r.substring(q)));
                                r = g.createElement("span");
                                q = g.createTextNode(".");
                                r.appendChild(q);
                                g = g.createElement("span");
                                r.appendChild(g);
                                n.length ? a.place(n, d, "after") : n = d;
                                a.place(r, n, "after");
                                f && a.place(f, r, "after");
                                a.destroy(d);
                                d = A.create(this.window);
                                d.setStart(q, 0);
                                d.setEnd(q, q.length);
                                e.removeAllRanges();
                                e.addRange(d);
                                if (h("webkit")) {
                                    e = "color";
                                    if ("hilitecolor" === c || "backcolor" === c) e = "backgroundColor";
                                    l.set(r, e, b);
                                    this.selection.remove();
                                    a.destroy(g);
                                    r.innerHTML = "\x26#160;";
                                    this.selection.selectElement(r);
                                    this.focus()
                                } else this.execCommand(c, b), a.place(r.firstChild, r, "before"), a.destroy(r), d.setStart(q, 0), d.setEnd(q, q.length), e.removeAllRanges(), e.addRange(d), this.selection.collapse(!1), q.parentNode.removeChild(q);
                                return !0
                            }
                            return !1
                        },
                        _adjustNodeAndOffset: function(a, c) {
                            for (; a.length < c && a.nextSibling && 3 === a.nextSibling.nodeType;) c -= a.length, a = a.nextSibling;
                            return {
                                node: a,
                                offset: c
                            }
                        },
                        _tagNamesForCommand: function(a) {
                            return "bold" === a ? ["b", "strong"] : "italic" === a ? ["i", "em"] : "strikethrough" === a ? ["s", "strike"] : "superscript" === a ? ["sup"] : "subscript" === a ? ["sub"] : "underline" === a ? ["u"] : []
                        },
                        _stripBreakerNodes: function(c) {
                            if (this.isLoaded) return q(".ieFormatBreakerSpan", c).forEach(function(c) {
                                for (; c.firstChild;) a.place(c.firstChild, c, "before");
                                a.destroy(c)
                            }), c
                        },
                        _stripTrailingEmptyNodes: function(c) {
                            for (; c.lastChild && (/^(p|div|br)$/i.test(c.lastChild.nodeName) && 0 == c.lastChild.children.length && /^[\s\xA0]*$/.test(c.lastChild.textContent || c.lastChild.innerText || "") || 3 === c.lastChild.nodeType && /^[\s\xA0]*$/.test(c.lastChild.nodeValue));) a.destroy(c.lastChild);
                            return c
                        },
                        _setTextDirAttr: function(a) {
                            this._set("textDir", a);
                            this.onLoadDeferred.then(t.hitch(this, function() {
                                this.editNode.dir = a
                            }))
                        }
                    });
                    return C
                })
        },
        "dijit/_editor/range": function() {
            define(["dojo/_base/array",
                "dojo/_base/declare", "dojo/_base/lang"
            ], function(p, m, k) {
                var f = {
                    getIndex: function(b, a) {
                        for (var d = [], l = [], c = b, f, k; b != a;) {
                            var m = 0;
                            for (f = b.parentNode; k = f.childNodes[m++];)
                                if (k === b) {
                                    --m;
                                    break
                                }
                            d.unshift(m);
                            l.unshift(m - f.childNodes.length);
                            b = f
                        }
                        if (0 < d.length && 3 == c.nodeType) {
                            for (k = c.previousSibling; k && 3 == k.nodeType;) d[d.length - 1]--, k = k.previousSibling;
                            for (k = c.nextSibling; k && 3 == k.nodeType;) l[l.length - 1]++, k = k.nextSibling
                        }
                        return {
                            o: d,
                            r: l
                        }
                    },
                    getNode: function(b, a) {
                        if (!k.isArray(b) || 0 == b.length) return a;
                        var d = a;
                        p.every(b, function(a) {
                            if (0 <= a && a < d.childNodes.length) d = d.childNodes[a];
                            else return d = null, !1;
                            return !0
                        });
                        return d
                    },
                    getCommonAncestor: function(b, a, d) {
                        d = d || b.ownerDocument.body;
                        var l = function(a) {
                            for (var c = []; a;)
                                if (c.unshift(a), a !== d) a = a.parentNode;
                                else break;
                            return c
                        };
                        b = l(b);
                        a = l(a);
                        for (var l = Math.min(b.length, a.length), c = b[0], f = 1; f < l; f++)
                            if (b[f] === a[f]) c = b[f];
                            else break;
                        return c
                    },
                    getAncestor: function(b, a, d) {
                        for (d = d || b.ownerDocument.body; b && b !== d;) {
                            var l = b.nodeName.toUpperCase();
                            if (a.test(l)) return b;
                            b = b.parentNode
                        }
                        return null
                    },
                    BlockTagNames: /^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/,
                    getBlockAncestor: function(b, a, d) {
                        d = d || b.ownerDocument.body;
                        a = a || f.BlockTagNames;
                        for (var l = null, c; b && b !== d;) {
                            var s = b.nodeName.toUpperCase();
                            !l && a.test(s) && (l = b);
                            !c && /^(?:BODY|TD|TH|CAPTION)$/.test(s) && (c = b);
                            b = b.parentNode
                        }
                        return {
                            blockNode: l,
                            blockContainer: c || b.ownerDocument.body
                        }
                    },
                    atBeginningOfContainer: function(b, a, d) {
                        var l = !1,
                            c = 0 == d;
                        !c && 3 == a.nodeType && /^[\s\xA0]+$/.test(a.nodeValue.substr(0, d)) &&
                            (c = !0);
                        if (c)
                            for (l = !0; a && a !== b;) {
                                if (a.previousSibling) {
                                    l = !1;
                                    break
                                }
                                a = a.parentNode
                            }
                        return l
                    },
                    atEndOfContainer: function(b, a, d) {
                        var l = !1,
                            c = d == (a.length || a.childNodes.length);
                        !c && 3 == a.nodeType && /^[\s\xA0]+$/.test(a.nodeValue.substr(d)) && (c = !0);
                        if (c)
                            for (l = !0; a && a !== b;) {
                                if (a.nextSibling) {
                                    l = !1;
                                    break
                                }
                                a = a.parentNode
                            }
                        return l
                    },
                    adjacentNoneTextNode: function(b, a) {
                        for (var d = b, l = 0 - b.length || 0, c = a ? "nextSibling" : "previousSibling"; d && 3 == d.nodeType;) l += d.length, d = d[c];
                        return [d, l]
                    },
                    create: function(e) {
                        e = e || window;
                        return e.getSelection ?
                            e.document.createRange() : new b
                    },
                    getSelection: function(b, a) {
                        if (b.getSelection) return b.getSelection();
                        var n = new d.selection(b);
                        a || n._getCurrentSelection();
                        return n
                    }
                };
                if (!window.getSelection) var d = f.ie = {
                        cachedSelection: {},
                        selection: function(e) {
                            this._ranges = [];
                            this.addRange = function(a, b) {
                                this._ranges.push(a);
                                b || a._select();
                                this.rangeCount = this._ranges.length
                            };
                            this.removeAllRanges = function() {
                                this._ranges = [];
                                this.rangeCount = 0
                            };
                            this.getRangeAt = function(a) {
                                return this._ranges[a]
                            };
                            this._getCurrentSelection =
                                function() {
                                    this.removeAllRanges();
                                    var a;
                                    a = e.document.selection.createRange();
                                    a = "CONTROL" == e.document.selection.type.toUpperCase() ? new b(d.decomposeControlRange(a)) : new b(d.decomposeTextRange(a));
                                    a ? (this.addRange(a, !0), this.isCollapsed = a.collapsed) : this.isCollapsed = !0
                                }
                        },
                        decomposeControlRange: function(b) {
                            var a = b.item(0),
                                d = b.item(b.length - 1);
                            b = a.parentNode;
                            var l = d.parentNode,
                                a = f.getIndex(a, b).o[0],
                                d = f.getIndex(d, l).o[0] + 1;
                            return [b, a, l, d]
                        },
                        getEndPoint: function(b, a) {
                            var d = b.duplicate();
                            d.collapse(!a);
                            var l = "EndTo" + (a ? "End" : "Start"),
                                c = d.parentElement(),
                                s, k, m;
                            0 < c.childNodes.length ? p.every(c.childNodes, function(a, h) {
                                var r;
                                if (3 != a.nodeType)
                                    if (d.moveToElementText(a), 0 < d.compareEndPoints(l, b))
                                        if (m && 3 == m.nodeType) s = m, r = !0;
                                        else return s = c, k = h, !1;
                                else {
                                    if (h == c.childNodes.length - 1) return s = c, k = c.childNodes.length, !1
                                } else h == c.childNodes.length - 1 && (s = a, r = !0);
                                if (r && s) {
                                    s = (r = f.adjacentNoneTextNode(s)[0]) ? r.nextSibling : c.firstChild;
                                    var q = f.adjacentNoneTextNode(s);
                                    r = q[0];
                                    q = q[1];
                                    r ? (d.moveToElementText(r), d.collapse(!1)) :
                                        d.moveToElementText(c);
                                    d.setEndPoint(l, b);
                                    k = d.text.length - q;
                                    return !1
                                }
                                m = a;
                                return !0
                            }) : (s = c, k = 0);
                            if (!a && 1 == s.nodeType && k == s.childNodes.length) {
                                var q = s.nextSibling;
                                q && 3 == q.nodeType && (s = q, k = 0)
                            }
                            return [s, k]
                        },
                        setEndPoint: function(b, a, d) {
                            b = b.duplicate();
                            var l;
                            if (3 != a.nodeType)
                                if (0 < d) {
                                    if (l = a.childNodes[d - 1])
                                        if (3 == l.nodeType) a = l, d = l.length;
                                        else if (l.nextSibling && 3 == l.nextSibling.nodeType) a = l.nextSibling, d = 0;
                                    else {
                                        b.moveToElementText(l.nextSibling ? l : a);
                                        var c = l.parentNode;
                                        l = c.insertBefore(l.ownerDocument.createTextNode(" "),
                                            l.nextSibling);
                                        b.collapse(!1);
                                        c.removeChild(l)
                                    }
                                } else b.moveToElementText(a), b.collapse(!0);
                            3 == a.nodeType && (l = f.adjacentNoneTextNode(a), c = l[0], l = l[1], c ? (b.moveToElementText(c), b.collapse(!1), "inherit" != c.contentEditable && l++) : (b.moveToElementText(a.parentNode), b.collapse(!0), b.move("character", 1), b.move("character", -1)), d += l, 0 < d && b.move("character", d) != d && console.error("Error when moving!"));
                            return b
                        },
                        decomposeTextRange: function(b) {
                            var a = d.getEndPoint(b),
                                n = a[0],
                                l = a[1],
                                c = a[0],
                                a = a[1];
                            b.htmlText.length &&
                                (b.htmlText == b.text ? a = l + b.text.length : (a = d.getEndPoint(b, !0), c = a[0], a = a[1]));
                            return [n, l, c, a]
                        },
                        setRange: function(b, a, n, l, c, f) {
                            a = d.setEndPoint(b, a, n);
                            b.setEndPoint("StartToStart", a);
                            if (!f) var k = d.setEndPoint(b, l, c);
                            b.setEndPoint("EndToEnd", k || a);
                            return b
                        }
                    },
                    b = f.W3CRange = m(null, {
                        constructor: function() {
                            0 < arguments.length ? (this.setStart(arguments[0][0], arguments[0][1]), this.setEnd(arguments[0][2], arguments[0][3])) : (this.startContainer = this.commonAncestorContainer = null, this.startOffset = 0, this.endContainer =
                                null, this.endOffset = 0, this.collapsed = !0)
                        },
                        _updateInternal: function() {
                            this.commonAncestorContainer = this.startContainer !== this.endContainer ? f.getCommonAncestor(this.startContainer, this.endContainer) : this.startContainer;
                            this.collapsed = this.startContainer === this.endContainer && this.startOffset == this.endOffset
                        },
                        setStart: function(b, a) {
                            a = parseInt(a);
                            this.startContainer === b && this.startOffset == a || (delete this._cachedBookmark, this.startContainer = b, this.startOffset = a, this.endContainer ? this._updateInternal() :
                                this.setEnd(b, a))
                        },
                        setEnd: function(b, a) {
                            a = parseInt(a);
                            this.endContainer === b && this.endOffset == a || (delete this._cachedBookmark, this.endContainer = b, this.endOffset = a, this.startContainer ? this._updateInternal() : this.setStart(b, a))
                        },
                        setStartAfter: function(b, a) {
                            this._setPoint("setStart", b, a, 1)
                        },
                        setStartBefore: function(b, a) {
                            this._setPoint("setStart", b, a, 0)
                        },
                        setEndAfter: function(b, a) {
                            this._setPoint("setEnd", b, a, 1)
                        },
                        setEndBefore: function(b, a) {
                            this._setPoint("setEnd", b, a, 0)
                        },
                        _setPoint: function(b, a, d, l) {
                            d = f.getIndex(a,
                                a.parentNode).o;
                            this[b](a.parentNode, d.pop() + l)
                        },
                        _getIERange: function() {
                            var b = (this._body || this.endContainer.ownerDocument.body).createTextRange();
                            d.setRange(b, this.startContainer, this.startOffset, this.endContainer, this.endOffset, this.collapsed);
                            return b
                        },
                        getBookmark: function() {
                            this._getIERange();
                            return this._cachedBookmark
                        },
                        _select: function() {
                            this._getIERange().select()
                        },
                        deleteContents: function() {
                            var b = this.startContainer,
                                a = this._getIERange();
                            3 === b.nodeType && !this.startOffset && this.setStartBefore(b);
                            a.pasteHTML("");
                            this.endContainer = this.startContainer;
                            this.endOffset = this.startOffset;
                            this.collapsed = !0
                        },
                        cloneRange: function() {
                            var d = new b([this.startContainer, this.startOffset, this.endContainer, this.endOffset]);
                            d._body = this._body;
                            return d
                        },
                        detach: function() {
                            this.startContainer = this.commonAncestorContainer = this._body = null;
                            this.startOffset = 0;
                            this.endContainer = null;
                            this.endOffset = 0;
                            this.collapsed = !0
                        }
                    });
                k.setObject("dijit.range", f);
                return f
            })
        },
        "dijit/_editor/html": function() {
            define(["dojo/_base/array",
                "dojo/_base/lang", "dojo/sniff"
            ], function(p, m, k) {
                var f = {};
                m.setObject("dijit._editor.html", f);
                var d = f.escapeXml = function(b, d) {
                    b = b.replace(/&/gm, "\x26amp;").replace(/</gm, "\x26lt;").replace(/>/gm, "\x26gt;").replace(/"/gm, "\x26quot;");
                    d || (b = b.replace(/'/gm, "\x26#39;"));
                    return b
                };
                f.getNodeHtml = function(b) {
                    var d = [];
                    f.getNodeHtmlHelper(b, d);
                    return d.join("")
                };
                f.getNodeHtmlHelper = function(b, e) {
                    switch (b.nodeType) {
                        case 1:
                            var a = b.nodeName.toLowerCase();
                            if (!a || "/" == a.charAt(0)) return "";
                            e.push("\x3c", a);
                            var n = [],
                                l = {},
                                c;
                            if (k("dom-attributes-explicit") || k("dom-attributes-specified-flag"))
                                for (var s = 0; c = b.attributes[s++];) {
                                    var m = c.name;
                                    if ("_dj" !== m.substr(0, 3) && (!k("dom-attributes-specified-flag") || c.specified) && !(m in l)) {
                                        c = c.value;
                                        if ("src" == m || "href" == m) b.getAttribute("_djrealurl") && (c = b.getAttribute("_djrealurl"));
                                        8 === k("ie") && "style" === m && (c = c.replace("HEIGHT:", "height:").replace("WIDTH:", "width:"));
                                        n.push([m, c]);
                                        l[m] = c
                                    }
                                } else {
                                    var u = (/^input$|^img$/i.test(b.nodeName) ? b : b.cloneNode(!1)).outerHTML,
                                        l = u.match(/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi),
                                        u = u.substr(0, u.indexOf("\x3e"));
                                    p.forEach(l, function(c) {
                                        if (c) {
                                            var d = c.indexOf("\x3d");
                                            if (0 < d && (c = c.substring(0, d), "_dj" != c.substr(0, 3)))
                                                if (("src" == c || "href" == c) && b.getAttribute("_djrealurl")) n.push([c, b.getAttribute("_djrealurl")]);
                                                else {
                                                    var e;
                                                    switch (c) {
                                                        case "style":
                                                            e = b.style.cssText.toLowerCase();
                                                            break;
                                                        case "class":
                                                            e = b.className;
                                                            break;
                                                        case "width":
                                                            if ("img" === a) {
                                                                (d = /width=(\S+)/i.exec(u)) && (e = d[1]);
                                                                break
                                                            }
                                                        case "height":
                                                            if ("img" === a) {
                                                                (d = /height=(\S+)/i.exec(u)) && (e = d[1]);
                                                                break
                                                            }
                                                        default:
                                                            e = b.getAttribute(c)
                                                    }
                                                    null !=
                                                        e && n.push([c, e.toString()])
                                                }
                                        }
                                    }, this)
                                }
                            n.sort(function(a, c) {
                                return a[0] < c[0] ? -1 : a[0] == c[0] ? 0 : 1
                            });
                            for (l = 0; c = n[l++];) e.push(" ", c[0], '\x3d"', "string" === typeof c[1] ? d(c[1], !0) : c[1], '"');
                            switch (a) {
                                case "br":
                                case "hr":
                                case "img":
                                case "input":
                                case "base":
                                case "meta":
                                case "area":
                                case "basefont":
                                    e.push(" /\x3e");
                                    break;
                                case "script":
                                    e.push("\x3e", b.innerHTML, "\x3c/", a, "\x3e");
                                    break;
                                default:
                                    e.push("\x3e"), b.hasChildNodes() && f.getChildrenHtmlHelper(b, e), e.push("\x3c/", a, "\x3e")
                            }
                            break;
                        case 4:
                        case 3:
                            e.push(d(b.nodeValue, !0));
                            break;
                        case 8:
                            e.push("\x3c!--", d(b.nodeValue, !0), "--\x3e");
                            break;
                        default:
                            e.push("\x3c!-- Element not recognized - Type: ", b.nodeType, " Name: ", b.nodeName, "--\x3e")
                    }
                };
                f.getChildrenHtml = function(b) {
                    var d = [];
                    f.getChildrenHtmlHelper(b, d);
                    return d.join("")
                };
                f.getChildrenHtmlHelper = function(b, d) {
                    if (b)
                        for (var a = b.childNodes || b, n = !k("ie") || a !== b, l, c = 0; l = a[c++];)(!n || l.parentNode == b) && f.getNodeHtmlHelper(l, d)
                };
                return f
            })
        },
        "dijit/_editor/plugins/LinkDialog": function() {
            define("require dojo/_base/declare dojo/dom-attr dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/query dojo/string ../_Plugin ../../form/DropDownButton ../range".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s) {
                    var t = m("dijit._editor.plugins.LinkDialog", l, {
                            buttonClass: c,
                            useDefaultCommand: !1,
                            urlRegExp: "((https?|ftps?|file)\\://|./|../|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?",
                            emailRegExp: "\x3c?(mailto\\:)([!#-'*+\\-\\/-9\x3d?A-Z^-~]+[.])*[!#-'*+\\-\\/-9\x3d?A-Z^-~]+@((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*\x3e?",
                            htmlTemplate: '\x3ca href\x3d"${urlInput}" _djrealurl\x3d"${urlInput}" target\x3d"${targetSelect}"\x3e${textInput}\x3c/a\x3e',
                            tag: "a",
                            _hostRxp: /^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,
                            _userAtRxp: /^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@/i,
                            linkDialogTemplate: "\x3ctable role\x3d'presentation'\x3e\x3ctr\x3e\x3ctd\x3e\x3clabel for\x3d'${id}_urlInput'\x3e${url}\x3c/label\x3e\x3c/td\x3e\x3ctd\x3e\x3cinput data-dojo-type\x3d'dijit.form.ValidationTextBox' required\x3d'true' id\x3d'${id}_urlInput' name\x3d'urlInput' data-dojo-props\x3d'intermediateChanges:true'/\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x3clabel for\x3d'${id}_textInput'\x3e${text}\x3c/label\x3e\x3c/td\x3e\x3ctd\x3e\x3cinput data-dojo-type\x3d'dijit.form.ValidationTextBox' required\x3d'true' id\x3d'${id}_textInput' name\x3d'textInput' data-dojo-props\x3d'intermediateChanges:true'/\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x3clabel for\x3d'${id}_targetSelect'\x3e${target}\x3c/label\x3e\x3c/td\x3e\x3ctd\x3e\x3cselect id\x3d'${id}_targetSelect' name\x3d'targetSelect' data-dojo-type\x3d'dijit.form.Select'\x3e\x3coption selected\x3d'selected' value\x3d'_self'\x3e${currentWindow}\x3c/option\x3e\x3coption value\x3d'_blank'\x3e${newWindow}\x3c/option\x3e\x3coption value\x3d'_top'\x3e${topWindow}\x3c/option\x3e\x3coption value\x3d'_parent'\x3e${parentWindow}\x3c/option\x3e\x3c/select\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d'2'\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' type\x3d'submit' id\x3d'${id}_setButton'\x3e${set}\x3c/button\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' type\x3d'button' id\x3d'${id}_cancelButton'\x3e${buttonCancel}\x3c/button\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e",
                            _initButton: function() {
                                this.inherited(arguments);
                                this.button.loadDropDown = d.hitch(this, "_loadDropDown");
                                this._connectTagEvents()
                            },
                            _loadDropDown: function(a) {
                                p("dojo/i18n ../../TooltipDialog ../../registry ../../form/Button ../../form/Select ../../form/ValidationTextBox dojo/i18n!../../nls/common dojo/i18n!../nls/LinkDialog".split(" "), d.hitch(this, function(c, e, l) {
                                    var k = this;
                                    this.tag = "insertImage" == this.command ? "img" : "a";
                                    c = d.delegate(c.getLocalization("dijit", "common", this.lang), c.getLocalization("dijit._editor",
                                        "LinkDialog", this.lang));
                                    var g = this.dropDown = this.button.dropDown = new e({
                                        title: c[this.command + "Title"],
                                        ownerDocument: this.editor.ownerDocument,
                                        dir: this.editor.dir,
                                        execute: d.hitch(this, "setValue"),
                                        onOpen: function() {
                                            k._onOpenDialog();
                                            e.prototype.onOpen.apply(this, arguments)
                                        },
                                        onCancel: function() {
                                            setTimeout(d.hitch(k, "_onCloseDialog"), 0)
                                        }
                                    });
                                    c.urlRegExp = this.urlRegExp;
                                    c.id = l.getUniqueId(this.editor.id);
                                    this._uniqueId = c.id;
                                    this._setContent(g.title + "\x3cdiv style\x3d'border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'\x3e\x3c/div\x3e" +
                                        n.substitute(this.linkDialogTemplate, c));
                                    g.startup();
                                    this._urlInput = l.byId(this._uniqueId + "_urlInput");
                                    this._textInput = l.byId(this._uniqueId + "_textInput");
                                    this._setButton = l.byId(this._uniqueId + "_setButton");
                                    this.own(l.byId(this._uniqueId + "_cancelButton").on("click", d.hitch(this.dropDown, "onCancel")));
                                    this._urlInput && this.own(this._urlInput.on("change", d.hitch(this, "_checkAndFixInput")));
                                    this._textInput && this.own(this._textInput.on("change", d.hitch(this, "_checkAndFixInput")));
                                    this._urlRegExp = RegExp("^" +
                                        this.urlRegExp + "$", "i");
                                    this._emailRegExp = RegExp("^" + this.emailRegExp + "$", "i");
                                    this._urlInput.isValid = d.hitch(this, function() {
                                        var a = this._urlInput.get("value");
                                        return this._urlRegExp.test(a) || this._emailRegExp.test(a)
                                    });
                                    this.own(b(g.domNode, "keydown", d.hitch(this, d.hitch(this, function(a) {
                                        a && (a.keyCode == f.ENTER && !a.shiftKey && !a.metaKey && !a.ctrlKey && !a.altKey) && !this._setButton.get("disabled") && (g.onExecute(), g.execute(g.get("value")))
                                    }))));
                                    a()
                                }))
                            },
                            _checkAndFixInput: function() {
                                var a = this,
                                    c = this._urlInput.get("value");
                                this._delayedCheck && (clearTimeout(this._delayedCheck), this._delayedCheck = null);
                                this._delayedCheck = setTimeout(function() {
                                    var b = c,
                                        e = !1,
                                        l = !1;
                                    b && 1 < b.length && (b = d.trim(b), 0 !== b.indexOf("mailto:") && (0 < b.indexOf("/") ? -1 === b.indexOf("://") && "/" !== b.charAt(0) && b.indexOf("./") && 0 !== b.indexOf("../") && a._hostRxp.test(b) && (e = !0) : a._userAtRxp.test(b) && (l = !0)));
                                    e && a._urlInput.set("value", "http://" + b);
                                    l && a._urlInput.set("value", "mailto:" + b);
                                    a._setButton.set("disabled", !a._isValid())
                                }, 250)
                            },
                            _connectTagEvents: function() {
                                this.editor.onLoadDeferred.then(d.hitch(this,
                                    function() {
                                        this.own(b(this.editor.editNode, "dblclick", d.hitch(this, "_onDblClick")))
                                    }))
                            },
                            _isValid: function() {
                                return this._urlInput.isValid() && this._textInput.isValid()
                            },
                            _setContent: function(a) {
                                this.dropDown.set({
                                    parserScope: "dojo",
                                    content: a
                                })
                            },
                            _checkValues: function(a) {
                                a && a.urlInput && (a.urlInput = a.urlInput.replace(/"/g, "\x26quot;"));
                                return a
                            },
                            setValue: function(c) {
                                this._onCloseDialog();
                                if (9 > e("ie")) {
                                    var b = s.getSelection(this.editor.window).getRangeAt(0).endContainer;
                                    3 === b.nodeType && (b = b.parentNode);
                                    b && (b.nodeName && b.nodeName.toLowerCase() !== this.tag) && (b = this.editor.selection.getSelectedElement(this.tag));
                                    b && (b.nodeName && b.nodeName.toLowerCase() === this.tag) && this.editor.queryCommandEnabled("unlink") && (this.editor.selection.selectElementChildren(b), this.editor.execCommand("unlink"))
                                }
                                c = this._checkValues(c);
                                this.editor.execCommand("inserthtml", n.substitute(this.htmlTemplate, c));
                                a("a", this.editor.document).forEach(function(a) {
                                    !a.innerHTML && !k.has(a, "name") && a.parentNode.removeChild(a)
                                }, this)
                            },
                            _onCloseDialog: function() {
                                this.editor.focused &&
                                    this.editor.focus()
                            },
                            _getCurrentValues: function(a) {
                                var c, b, d;
                                a && a.tagName.toLowerCase() === this.tag ? (c = a.getAttribute("_djrealurl") || a.getAttribute("href"), d = a.getAttribute("target") || "_self", b = a.textContent || a.innerText, this.editor.selection.selectElement(a, !0)) : b = this.editor.selection.getSelectedText();
                                return {
                                    urlInput: c || "",
                                    textInput: b || "",
                                    targetSelect: d || ""
                                }
                            },
                            _onOpenDialog: function() {
                                var a, c;
                                if (e("ie")) {
                                    if (c = s.getSelection(this.editor.window), c.rangeCount) {
                                        var b = c.getRangeAt(0);
                                        a = b.endContainer;
                                        3 === a.nodeType && (a = a.parentNode);
                                        a && (a.nodeName && a.nodeName.toLowerCase() !== this.tag) && (a = this.editor.selection.getSelectedElement(this.tag));
                                        if (!a || a.nodeName && a.nodeName.toLowerCase() !== this.tag)
                                            if ((c = this.editor.selection.getAncestorElement(this.tag)) && c.nodeName && c.nodeName.toLowerCase() == this.tag) a = c, this.editor.selection.selectElement(a);
                                            else if (b.startContainer === b.endContainer && (c = b.startContainer.firstChild) && c.nodeName && c.nodeName.toLowerCase() == this.tag) a = c, this.editor.selection.selectElement(a)
                                    }
                                } else a =
                                    this.editor.selection.getAncestorElement(this.tag);
                                this.dropDown.reset();
                                this._setButton.set("disabled", !0);
                                this.dropDown.set("value", this._getCurrentValues(a))
                            },
                            _onDblClick: function(a) {
                                if (a && a.target && (a = a.target, (a.tagName ? a.tagName.toLowerCase() : "") === this.tag && k.get(a, "href"))) {
                                    var c = this.editor;
                                    this.editor.selection.selectElement(a);
                                    c.onDisplayChanged();
                                    c._updateTimer && (c._updateTimer.remove(), delete c._updateTimer);
                                    c.onNormalizedDisplayChanged();
                                    var b = this.button;
                                    setTimeout(function() {
                                        b.set("disabled", !1);
                                        b.loadAndOpenDropDown().then(function() {
                                            b.dropDown.focus && b.dropDown.focus()
                                        })
                                    }, 10)
                                }
                            }
                        }),
                        u = m("dijit._editor.plugins.ImgLinkDialog", [t], {
                            linkDialogTemplate: "\x3ctable role\x3d'presentation'\x3e\x3ctr\x3e\x3ctd\x3e\x3clabel for\x3d'${id}_urlInput'\x3e${url}\x3c/label\x3e\x3c/td\x3e\x3ctd\x3e\x3cinput dojoType\x3d'dijit.form.ValidationTextBox' regExp\x3d'${urlRegExp}' required\x3d'true' id\x3d'${id}_urlInput' name\x3d'urlInput' data-dojo-props\x3d'intermediateChanges:true'/\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x3clabel for\x3d'${id}_textInput'\x3e${text}\x3c/label\x3e\x3c/td\x3e\x3ctd\x3e\x3cinput data-dojo-type\x3d'dijit.form.ValidationTextBox' required\x3d'false' id\x3d'${id}_textInput' name\x3d'textInput' data-dojo-props\x3d'intermediateChanges:true'/\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d'2'\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' type\x3d'submit' id\x3d'${id}_setButton'\x3e${set}\x3c/button\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' type\x3d'button' id\x3d'${id}_cancelButton'\x3e${buttonCancel}\x3c/button\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e",
                            htmlTemplate: '\x3cimg src\x3d"${urlInput}" _djrealurl\x3d"${urlInput}" alt\x3d"${textInput}" /\x3e',
                            tag: "img",
                            _getCurrentValues: function(a) {
                                var c, b;
                                a && a.tagName.toLowerCase() === this.tag ? (c = a.getAttribute("_djrealurl") || a.getAttribute("src"), b = a.getAttribute("alt"), this.editor.selection.selectElement(a, !0)) : b = this.editor.selection.getSelectedText();
                                return {
                                    urlInput: c || "",
                                    textInput: b || ""
                                }
                            },
                            _isValid: function() {
                                return this._urlInput.isValid()
                            },
                            _connectTagEvents: function() {
                                this.inherited(arguments);
                                this.editor.onLoadDeferred.then(d.hitch(this,
                                    function() {
                                        this.own(b(this.editor.editNode, "mousedown", d.hitch(this, "_selectTag")))
                                    }))
                            },
                            _selectTag: function(a) {
                                a && a.target && (a = a.target, (a.tagName ? a.tagName.toLowerCase() : "") === this.tag && this.editor.selection.selectElement(a))
                            },
                            _checkValues: function(a) {
                                a && a.urlInput && (a.urlInput = a.urlInput.replace(/"/g, "\x26quot;"));
                                a && a.textInput && (a.textInput = a.textInput.replace(/"/g, "\x26quot;"));
                                return a
                            },
                            _onDblClick: function(a) {
                                if (a && a.target && (a = a.target, (a.tagName ? a.tagName.toLowerCase() : "") === this.tag && k.get(a,
                                        "src"))) {
                                    var c = this.editor;
                                    this.editor.selection.selectElement(a);
                                    c.onDisplayChanged();
                                    c._updateTimer && (c._updateTimer.remove(), delete c._updateTimer);
                                    c.onNormalizedDisplayChanged();
                                    var b = this.button;
                                    setTimeout(function() {
                                        b.set("disabled", !1);
                                        b.loadAndOpenDropDown().then(function() {
                                            b.dropDown.focus && b.dropDown.focus()
                                        })
                                    }, 10)
                                }
                            }
                        });
                    l.registry.createLink = function() {
                        return new t({
                            command: "createLink"
                        })
                    };
                    l.registry.insertImage = function() {
                        return new u({
                            command: "insertImage"
                        })
                    };
                    t.ImgLinkDialog = u;
                    return t
                })
        },
        "dijit/_editor/plugins/TextColor": function() {
            define("require dojo/colors dojo/_base/declare dojo/_base/lang ../_Plugin ../../form/DropDownButton".split(" "), function(p, m, k, f, d, b) {
                var e = k("dijit._editor.plugins.TextColor", d, {
                    buttonClass: b,
                    colorPicker: "dijit/ColorPalette",
                    useDefaultCommand: !1,
                    _initButton: function() {
                        this.command = this.name;
                        this.inherited(arguments);
                        var a = this;
                        this.button.loadDropDown = function(b) {
                            function d(c) {
                                a.button.dropDown = new c({
                                    dir: a.editor.dir,
                                    ownerDocument: a.editor.ownerDocument,
                                    value: a.value,
                                    onChange: function(c) {
                                        a.editor.execCommand(a.command, c)
                                    },
                                    onExecute: function() {
                                        a.editor.execCommand(a.command, this.get("value"))
                                    }
                                });
                                b()
                            }
                            "string" == typeof a.colorPicker ? p([a.colorPicker], d) : d(a.colorPicker)
                        }
                    },
                    updateState: function() {
                        var a = this.editor,
                            b = this.command;
                        if (a && a.isLoaded && b.length) {
                            if (this.button) {
                                var d = this.get("disabled");
                                this.button.set("disabled", d);
                                if (d) return;
                                var c;
                                try {
                                    c = a.queryCommandValue(b) || ""
                                } catch (e) {
                                    c = ""
                                }
                            }
                            "" == c && (c = "#000000");
                            "transparent" == c && (c = "#ffffff");
                            "string" ==
                            typeof c ? -1 < c.indexOf("rgb") && (c = m.fromRgb(c).toHex()) : (c = ((c & 255) << 16 | c & 65280 | (c & 16711680) >>> 16).toString(16), c = "#000000".slice(0, 7 - c.length) + c);
                            this.value = c;
                            (a = this.button.dropDown) && (a.get && c !== a.get("value")) && a.set("value", c, !1)
                        }
                    }
                });
                d.registry.foreColor = function(a) {
                    return new e(a)
                };
                d.registry.hiliteColor = function(a) {
                    return new e(a)
                };
                return e
            })
        },
        "esri/dijit/editing/AttachmentEditor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/kernel dojo/has dojo/query dojo/io-query dojo/dom-attr dijit/_Widget dijit/_Templated dijit/ProgressBar ../../kernel ../../lang ../../domUtils dojo/text!./templates/AttachmentEditor.html dojo/i18n!../../nls/jsapi dojo/NodeList-dom".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h) {
                    return p([l, c], {
                        declaredClass: "esri.dijit.editing.AttachmentEditor",
                        widgetsInTemplate: !0,
                        templateString: w,
                        _listHtml: "\x3cspan id\x3d'node_${oid}_${attid}'\x3e\x3ca href\x3d'${href}' target\x3d'_blank'\x3e${name}\x3c/a\x3e",
                        _deleteBtnHtml: "(\x3cspan style\x3d'cursor:pointer;color:red;font-weight:bold;' class\x3d'deleteAttachment' id\x3d'${attid}');'\x3eX\x3c/span\x3e)",
                        _endHtml: "\x3cbr/\x3e\x3c/span\x3e",
                        _aeConnects: [],
                        _layerEditingCapChecked: {},
                        _layerEditingCap: {},
                        constructor: function(a, c) {
                            m.mixin(this, h.widgets.attachmentEditor)
                        },
                        startup: function() {
                            this.inherited(arguments);
                            this._uploadField_connect = k.connect(this._uploadField, "onchange", this, function() {
                                0 < this._uploadField.value.length && this._addAttachment()
                            });
                            this._uploadFieldFocus_connect = k.connect(this._uploadField, "onfocus", m.hitch(this, function(a) {
                                q.hide(this._attachmentError)
                            }))
                        },
                        destroy: function() {
                            f.forEach(this._aeConnects, k.disconnect);
                            k.disconnect(this._uploadField_connect);
                            k.disconnect(this._uploadFieldFocus_connect);
                            this.inherited(arguments)
                        },
                        showAttachments: function(a, c) {
                            this._attachmentList.innerHTML = this.NLS_none;
                            this._uploadField.value = "";
                            f.forEach(this.domNode.children, function(a, c) {
                                q.show(a)
                            });
                            q.hide(this._attachmentError);
                            if (a && (this._featureLayer = a.getLayer() || c))
                                if ("esri.layers.FeatureLayer" !== this._featureLayer.declaredClass || !this._featureLayer.getEditCapabilities) {
                                    if (!c || !c.getEditCapabilities()) q.hide(this._uploadForm), f.forEach(this.domNode.children, function(a, c) {
                                        q.hide(a)
                                    })
                                } else this._currentLayerId =
                                    this._featureLayer.id, this._layerEditingCapChecked[this._currentLayerId] || (this._layerEditingCap[this._currentLayerId] = this._featureLayer.getEditCapabilities(), this._layerEditingCapChecked[this._currentLayerId] = !0), this._featureCanUpdate = this._featureLayer.getEditCapabilities({
                                        feature: a
                                    }).canUpdate, this._oid = a.attributes[this._featureLayer.objectIdField], this._getAttachments(a)
                        },
                        _getAttachments: function(a) {
                            this._featureLayer && this._featureLayer.queryAttachmentInfos && this._featureLayer.queryAttachmentInfos(this._oid,
                                m.hitch(this, "_onQueryAttachmentInfosComplete"))
                        },
                        _addAttachment: function() {
                            q.hide(this._attachmentError);
                            !this._featureLayer || !this._featureLayer.addAttachment ? this._tempUpload = this._uploadForm : (q.show(this._attachmentProgress), this._featureLayer.addAttachment(this._oid, this._uploadForm, m.hitch(this, "_onAddAttachmentComplete"), m.hitch(this, "_onAddAttachmentError")))
                        },
                        _chainAttachment: function(a, c) {
                            this._tempUpload && (q.show(this._attachmentProgress), c.addAttachment(a, this._tempUpload, m.hitch(this,
                                "_onAddAttachmentComplete"), m.hitch(this, "_onAddAttachmentError")));
                            this._tempUpload = null
                        },
                        _deleteAttachment: function(a, c) {
                            q.show(this._attachmentProgress);
                            this._featureLayer.deleteAttachments(a, [c], m.hitch(this, "_onDeleteAttachmentComplete"))
                        },
                        _onQueryAttachmentInfosComplete: function(a) {
                            var c = this._listHtml + this._deleteBtnHtml + this._endHtml;
                            this._uploadForm.style.display = "block";
                            !this._featureCanUpdate && this._layerEditingCap[this._currentLayerId].canUpdate || !this._layerEditingCap[this._currentLayerId].canCreate &&
                                !this._layerEditingCap[this._currentLayerId].canUpdate ? (c = this._listHtml + this._endHtml, this._uploadForm.style.display = "none") : this._layerEditingCap[this._currentLayerId].canCreate && !this._layerEditingCap[this._currentLayerId].canUpdate && (c = this._listHtml + this._endHtml);
                            var b = this._attachmentList;
                            a = f.map(a, m.hitch(this, function(a) {
                                return u.substitute({
                                    href: a.url,
                                    name: a.name,
                                    oid: a.objectId,
                                    attid: a.id
                                }, c)
                            }));
                            b.innerHTML = a.join("") || this.NLS_none;
                            this._updateConnects()
                        },
                        _onAddAttachmentComplete: function(c) {
                            q.hide(this._attachmentProgress.domNode);
                            var b = this._attachmentList,
                                d = this._uploadField,
                                e = d.value,
                                h = e.lastIndexOf("\\"); - 1 < h && (e = e.substring(h + 1, e.length));
                            var e = e.replace(/\ /g, "_"),
                                h = a.objectToQuery({
                                    gdbVersion: this._featureLayer.gdbVersion,
                                    token: this._featureLayer._getToken()
                                }),
                                l = this._listHtml + this._deleteBtnHtml + this._endHtml;
                            this._layerEditingCap[this._currentLayerId].canCreate && !this._layerEditingCap[this._currentLayerId].canUpdate && (l = this._listHtml + this._endHtml);
                            c = u.substitute({
                                href: this._featureLayer._url.path + "/" + c.objectId +
                                    "/attachments/" + c.attachmentId + (h ? "?" + h : ""),
                                name: e,
                                oid: c.objectId,
                                attid: c.attachmentId
                            }, l);
                            b.innerHTML = b.innerHTML == this.NLS_none ? c : b.innerHTML + c;
                            this._updateConnects();
                            d.value = ""
                        },
                        _onAddAttachmentError: function(a) {
                            q.hide(this._attachmentProgress.domNode);
                            if (a && u.isDefined(a.code)) {
                                var c = this._attachmentError;
                                n.set(c, "innerHTML", (400 === a.code ? this.NLS_fileNotSupported : a.message || a.details && a.details.length && a.details[0]) || this.NLS_error);
                                q.show(c)
                            }
                        },
                        _onDeleteAttachmentComplete: function(a) {
                            q.hide(this._attachmentProgress.domNode);
                            var c = this._attachmentList;
                            if (f.every(a, function(a) {
                                    return a.success
                                }) && (d.query("#node_" + a[0].objectId + "_" + a[0].attachmentId).orphan(), !c.children || !c.children.length)) c.innerHTML = this.NLS_none
                        },
                        _updateConnects: function() {
                            f.forEach(this._aeConnects, k.disconnect);
                            d.query(".deleteAttachment").forEach(function(a) {
                                this._aeConnects.push(k.connect(a, "onclick", m.hitch(this, "_deleteAttachment", this._oid, a.id)))
                            }, this)
                        }
                    })
                })
        },
        "dijit/ProgressBar": function() {
            define("require dojo/_base/declare dojo/dom-class dojo/_base/lang dojo/number ./_Widget ./_TemplatedMixin dojo/text!./templates/ProgressBar.html".split(" "),
                function(p, m, k, f, d, b, e, a) {
                    return m("dijit.ProgressBar", [b, e], {
                        progress: "0",
                        value: "",
                        maximum: 100,
                        places: 0,
                        indeterminate: !1,
                        label: "",
                        name: "",
                        templateString: a,
                        _indeterminateHighContrastImagePath: p.toUrl("./themes/a11y/indeterminate_progress.gif"),
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this.params && "value" in this.params || (this.value = this.indeterminate ? Infinity : this.progress)
                        },
                        buildRendering: function() {
                            this.inherited(arguments);
                            this.indeterminateHighContrastImage.setAttribute("src", this._indeterminateHighContrastImagePath.toString());
                            this.update()
                        },
                        _setDirAttr: function(a) {
                            var b = "rtl" == a.toLowerCase();
                            k.toggle(this.domNode, "dijitProgressBarRtl", b);
                            k.toggle(this.domNode, "dijitProgressBarIndeterminateRtl", this.indeterminate && b);
                            this.inherited(arguments)
                        },
                        update: function(a) {
                            f.mixin(this, a || {});
                            a = this.internalProgress;
                            var b = this.domNode,
                                c = 1;
                            this.indeterminate ? b.removeAttribute("aria-valuenow") : (-1 != String(this.progress).indexOf("%") ? (c = Math.min(parseFloat(this.progress) / 100, 1), this.progress = c * this.maximum) : (this.progress = Math.min(this.progress,
                                this.maximum), c = this.maximum ? this.progress / this.maximum : 0), b.setAttribute("aria-valuenow", this.progress));
                            b.setAttribute("aria-labelledby", this.labelNode.id);
                            b.setAttribute("aria-valuemin", 0);
                            b.setAttribute("aria-valuemax", this.maximum);
                            this.labelNode.innerHTML = this.report(c);
                            k.toggle(this.domNode, "dijitProgressBarIndeterminate", this.indeterminate);
                            k.toggle(this.domNode, "dijitProgressBarIndeterminateRtl", this.indeterminate && !this.isLeftToRight());
                            a.style.width = 100 * c + "%";
                            this.onChange()
                        },
                        _setValueAttr: function(a) {
                            this._set("value",
                                a);
                            Infinity == a ? this.update({
                                indeterminate: !0
                            }) : this.update({
                                indeterminate: !1,
                                progress: a
                            })
                        },
                        _setLabelAttr: function(a) {
                            this._set("label", a);
                            this.update()
                        },
                        _setIndeterminateAttr: function(a) {
                            this._set("indeterminate", a);
                            this.update()
                        },
                        report: function(a) {
                            return this.label ? this.label : this.indeterminate ? "\x26#160;" : d.format(a, {
                                type: "percent",
                                places: this.places,
                                locale: this.lang
                            })
                        },
                        onChange: function() {}
                    })
                })
        },
        "esri/dijit/editing/Util": function() {
            define(["dojo/_base/lang", "dojo/_base/array", "dojo/has", "../../kernel"],
                function(p, m, k, f) {
                    p = {};
                    return p = {
                        findFeatures: function(d, b, e) {
                            var a = b.objectIdField;
                            b = m.filter(b.graphics, function(b) {
                                return m.some(d, function(d) {
                                    return b.attributes[a] === d.objectId
                                })
                            });
                            if (e) e(b);
                            else return b
                        },
                        getSelection: function(d) {
                            var b = [];
                            m.forEach(d, function(d) {
                                d = d.getSelectedFeatures();
                                m.forEach(d, function(a) {
                                    b.push(a)
                                })
                            });
                            return b
                        }
                    }
                })
        },
        "dijit/form/DateTextBox": function() {
            define(["dojo/_base/declare", "../Calendar", "./_DateTimeTextBox"], function(p, m, k) {
                return p("dijit.form.DateTextBox", k, {
                    baseClass: "dijitTextBox dijitComboBox dijitDateTextBox",
                    popupClass: m,
                    _selector: "date",
                    maxHeight: Infinity,
                    value: new Date("")
                })
            })
        },
        "dijit/Calendar": function() {
            define("dojo/_base/array dojo/date dojo/date/locale dojo/_base/declare dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/_base/kernel dojo/keys dojo/_base/lang dojo/on dojo/sniff ./CalendarLite ./_Widget ./_CssStateMixin ./_TemplatedMixin ./form/DropDownButton".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h) {
                var r = f("dijit.Calendar", [t, u, q], {
                    baseClass: "dijitCalendar",
                    cssStateNodes: {
                        decrementMonth: "dijitCalendarArrow",
                        incrementMonth: "dijitCalendarArrow",
                        previousYearLabelNode: "dijitCalendarPreviousYear",
                        nextYearLabelNode: "dijitCalendarNextYear"
                    },
                    setValue: function(c) {
                        a.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
                        this.set("value", c)
                    },
                    _createMonthWidget: function() {
                        return new r._MonthDropDownButton({
                            id: this.id + "_mddb",
                            tabIndex: -1,
                            onMonthSelect: l.hitch(this, "_onMonthSelect"),
                            lang: this.lang,
                            dateLocaleModule: this.dateLocaleModule
                        }, this.monthNode)
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(c(this.domNode, "keydown", l.hitch(this, "_onKeyDown")), c(this.dateRowsNode, "mouseover", l.hitch(this, "_onDayMouseOver")), c(this.dateRowsNode, "mouseout", l.hitch(this, "_onDayMouseOut")), c(this.dateRowsNode, "mousedown", l.hitch(this, "_onDayMouseDown")), c(this.dateRowsNode, "mouseup", l.hitch(this, "_onDayMouseUp")))
                    },
                    _onMonthSelect: function(a) {
                        var c = new this.dateClassObj(this.currentFocus);
                        c.setDate(1);
                        c.setMonth(a);
                        a = this.dateModule.getDaysInMonth(c);
                        var b = this.currentFocus.getDate();
                        c.setDate(Math.min(b,
                            a));
                        this._setCurrentFocusAttr(c)
                    },
                    _onDayMouseOver: function(a) {
                        if ((a = b.contains(a.target, "dijitCalendarDateLabel") ? a.target.parentNode : a.target) && (a.dijitDateValue && !b.contains(a, "dijitCalendarDisabledDate") || a == this.previousYearLabelNode || a == this.nextYearLabelNode)) b.add(a, "dijitCalendarHoveredDate"), this._currentNode = a
                    },
                    _onDayMouseOut: function(a) {
                        this._currentNode && !(a.relatedTarget && a.relatedTarget.parentNode == this._currentNode) && (a = "dijitCalendarHoveredDate", b.contains(this._currentNode, "dijitCalendarActiveDate") &&
                            (a += " dijitCalendarActiveDate"), b.remove(this._currentNode, a), this._currentNode = null)
                    },
                    _onDayMouseDown: function(a) {
                        if ((a = a.target.parentNode) && a.dijitDateValue && !b.contains(a, "dijitCalendarDisabledDate")) b.add(a, "dijitCalendarActiveDate"), this._currentNode = a
                    },
                    _onDayMouseUp: function(a) {
                        (a = a.target.parentNode) && a.dijitDateValue && b.remove(a, "dijitCalendarActiveDate")
                    },
                    handleKey: function(a) {
                        var c = -1,
                            b, d = this.currentFocus;
                        switch (a.keyCode) {
                            case n.RIGHT_ARROW:
                                c = 1;
                            case n.LEFT_ARROW:
                                b = "day";
                                this.isLeftToRight() ||
                                    (c *= -1);
                                break;
                            case n.DOWN_ARROW:
                                c = 1;
                            case n.UP_ARROW:
                                b = "week";
                                break;
                            case n.PAGE_DOWN:
                                c = 1;
                            case n.PAGE_UP:
                                b = a.ctrlKey || a.altKey ? "year" : "month";
                                break;
                            case n.END:
                                d = this.dateModule.add(d, "month", 1), b = "day";
                            case n.HOME:
                                d = new this.dateClassObj(d);
                                d.setDate(1);
                                break;
                            default:
                                return !0
                        }
                        b && (d = this.dateModule.add(d, b, c));
                        this._setCurrentFocusAttr(d);
                        return !1
                    },
                    _onKeyDown: function(a) {
                        this.handleKey(a) || (a.stopPropagation(), a.preventDefault())
                    },
                    onValueSelected: function() {},
                    onChange: function(a) {
                        this.onValueSelected(a)
                    },
                    getClassForDate: function() {}
                });
                r._MonthDropDownButton = f("dijit.Calendar._MonthDropDownButton", h, {
                    onMonthSelect: function() {},
                    postCreate: function() {
                        this.inherited(arguments);
                        this.dropDown = new r._MonthDropDown({
                            id: this.id + "_mdd",
                            onChange: this.onMonthSelect
                        })
                    },
                    _setMonthAttr: function(a) {
                        var c = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, a);
                        this.dropDown.set("months", c);
                        this.containerNode.innerHTML = (6 == s("ie") ? "" : "\x3cdiv class\x3d'dijitSpacer'\x3e" + this.dropDown.domNode.innerHTML +
                            "\x3c/div\x3e") + "\x3cdiv class\x3d'dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'\x3e" + c[a.getMonth()] + "\x3c/div\x3e"
                    }
                });
                r._MonthDropDown = f("dijit.Calendar._MonthDropDown", [u, w, q], {
                    months: [],
                    baseClass: "dijitCalendarMonthMenu dijitMenu",
                    templateString: "\x3cdiv data-dojo-attach-event\x3d'ondijitclick:_onClick'\x3e\x3c/div\x3e",
                    _setMonthsAttr: function(a) {
                        this.domNode.innerHTML = "";
                        p.forEach(a, function(a, c) {
                            e.create("div", {
                                    className: "dijitCalendarMonthLabel",
                                    month: c,
                                    innerHTML: a
                                }, this.domNode)._cssState =
                                "dijitCalendarMonthLabel"
                        }, this)
                    },
                    _onClick: function(a) {
                        this.onChange(d.get(a.target, "month"))
                    },
                    onChange: function() {}
                });
                return r
            })
        },
        "dijit/CalendarLite": function() {
            define("dojo/_base/array dojo/_base/declare dojo/cldr/supplemental dojo/date dojo/date/locale dojo/date/stamp dojo/dom dojo/dom-class dojo/_base/lang dojo/on dojo/sniff dojo/string ./_WidgetBase ./_TemplatedMixin dojo/text!./templates/Calendar.html ./a11yclick ./hccss".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q) {
                var w = m("dijit.CalendarLite", [t, u], {
                    templateString: q,
                    dowTemplateString: '\x3cth class\x3d"dijitReset dijitCalendarDayLabelTemplate" role\x3d"columnheader" scope\x3d"col"\x3e\x3cspan class\x3d"dijitCalendarDayLabel"\x3e${d}\x3c/span\x3e\x3c/th\x3e',
                    dateTemplateString: '\x3ctd class\x3d"dijitReset" role\x3d"gridcell" data-dojo-attach-point\x3d"dateCells"\x3e\x3cspan class\x3d"dijitCalendarDateLabel" data-dojo-attach-point\x3d"dateLabels"\x3e\x3c/span\x3e\x3c/td\x3e',
                    weekTemplateString: '\x3ctr class\x3d"dijitReset dijitCalendarWeekTemplate" role\x3d"row"\x3e${d}${d}${d}${d}${d}${d}${d}\x3c/tr\x3e',
                    value: new Date(""),
                    datePackage: "",
                    dayWidth: "narrow",
                    tabIndex: "0",
                    dayOffset: -1,
                    currentFocus: new Date,
                    _setSummaryAttr: "gridNode",
                    baseClass: "dijitCalendar dijitCalendarLite",
                    _isValidDate: function(a) {
                        return a && !isNaN(a) && "object" == typeof a && a.toString() != this.constructor.prototype.value.toString()
                    },
                    _getValueAttr: function() {
                        var a = this._get("value");
                        if (a && !isNaN(a)) {
                            var c = new this.dateClassObj(a);
                            c.setHours(0, 0, 0, 0);
                            c.getDate() < a.getDate() && (c = this.dateModule.add(c, "hour", 1));
                            return c
                        }
                        return null
                    },
                    _setValueAttr: function(a,
                        c) {
                        "string" == typeof a && (a = b.fromISOString(a));
                        a = this._patchDate(a);
                        if (this._isValidDate(a) && !this.isDisabledDate(a, this.lang)) {
                            if (this._set("value", a), this.set("currentFocus", a), this._markSelectedDates([a]), this._created && (c || "undefined" == typeof c)) this.onChange(this.get("value"))
                        } else this._set("value", null), this._markSelectedDates([])
                    },
                    _patchDate: function(a) {
                        a && (a = new this.dateClassObj(a), a.setHours(1, 0, 0, 0));
                        return a
                    },
                    _setText: function(a, c) {
                        for (; a.firstChild;) a.removeChild(a.firstChild);
                        a.appendChild(a.ownerDocument.createTextNode(c))
                    },
                    _populateGrid: function() {
                        var a = new this.dateClassObj(this.currentFocus);
                        a.setDate(1);
                        var a = this._patchDate(a),
                            c = a.getDay(),
                            b = this.dateModule.getDaysInMonth(a),
                            d = this.dateModule.getDaysInMonth(this.dateModule.add(a, "month", -1)),
                            e = new this.dateClassObj,
                            l = 0 <= this.dayOffset ? this.dayOffset : k.getFirstDayOfWeek(this.lang);
                        l > c && (l -= 7);
                        if (!this.summary) {
                            var n = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, a);
                            this.gridNode.setAttribute("summary", n[a.getMonth()])
                        }
                        this._date2cell = {};
                        p.forEach(this.dateCells,
                            function(n, f) {
                                var k = f + l,
                                    s = new this.dateClassObj(a),
                                    m = "dijitCalendar",
                                    q = 0;
                                k < c ? (k = d - c + k + 1, q = -1, m += "Previous") : k >= c + b ? (k = k - c - b + 1, q = 1, m += "Next") : (k = k - c + 1, m += "Current");
                                q && (s = this.dateModule.add(s, "month", q));
                                s.setDate(k);
                                this.dateModule.compare(s, e, "date") || (m = "dijitCalendarCurrentDate " + m);
                                this.isDisabledDate(s, this.lang) ? (m = "dijitCalendarDisabledDate " + m, n.setAttribute("aria-disabled", "true")) : (m = "dijitCalendarEnabledDate " + m, n.removeAttribute("aria-disabled"), n.setAttribute("aria-selected", "false"));
                                (q = this.getClassForDate(s, this.lang)) && (m = q + " " + m);
                                n.className = m + "Month dijitCalendarDateTemplate";
                                m = s.valueOf();
                                this._date2cell[m] = n;
                                n.dijitDateValue = m;
                                this._setText(this.dateLabels[f], s.getDateLocalized ? s.getDateLocalized(this.lang) : s.getDate())
                            }, this)
                    },
                    _populateControls: function() {
                        var a = new this.dateClassObj(this.currentFocus);
                        a.setDate(1);
                        this.monthWidget.set("month", a);
                        var c = a.getFullYear() - 1,
                            b = new this.dateClassObj;
                        p.forEach(["previous", "current", "next"], function(a) {
                            b.setFullYear(c++);
                            this._setText(this[a +
                                "YearLabelNode"], this.dateLocaleModule.format(b, {
                                selector: "year",
                                locale: this.lang
                            }))
                        }, this)
                    },
                    goToToday: function() {
                        this.set("value", new this.dateClassObj)
                    },
                    constructor: function(a) {
                        this.dateModule = a.datePackage ? n.getObject(a.datePackage, !1) : f;
                        this.dateClassObj = this.dateModule.Date || Date;
                        this.dateLocaleModule = a.datePackage ? n.getObject(a.datePackage + ".locale", !1) : d
                    },
                    _createMonthWidget: function() {
                        return w._MonthWidget({
                            id: this.id + "_mddb",
                            lang: this.lang,
                            dateLocaleModule: this.dateLocaleModule
                        }, this.monthNode)
                    },
                    buildRendering: function() {
                        var a = this.dowTemplateString,
                            c = this.dateLocaleModule.getNames("days", this.dayWidth, "standAlone", this.lang),
                            b = 0 <= this.dayOffset ? this.dayOffset : k.getFirstDayOfWeek(this.lang);
                        this.dayCellsHtml = s.substitute([a, a, a, a, a, a, a].join(""), {
                            d: ""
                        }, function() {
                            return c[b++ % 7]
                        });
                        a = s.substitute(this.weekTemplateString, {
                            d: this.dateTemplateString
                        });
                        this.dateRowsHtml = [a, a, a, a, a, a].join("");
                        this.dateCells = [];
                        this.dateLabels = [];
                        this.inherited(arguments);
                        e.setSelectable(this.domNode, !1);
                        a = new this.dateClassObj(this.currentFocus);
                        this.monthWidget = this._createMonthWidget();
                        this.set("currentFocus", a, !1)
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._connectControls()
                    },
                    _connectControls: function() {
                        var a = n.hitch(this, function(a, c, b) {
                            this[a].dojoClick = !0;
                            return l(this[a], "click", n.hitch(this, function() {
                                this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus, c, b))
                            }))
                        });
                        this.own(a("incrementMonth", "month", 1), a("decrementMonth", "month", -1), a("nextYearLabelNode", "year", 1), a("previousYearLabelNode", "year", -1))
                    },
                    _setCurrentFocusAttr: function(a,
                        b) {
                        var d = this.currentFocus,
                            g = this._getNodeByDate(d);
                        a = this._patchDate(a);
                        this._set("currentFocus", a);
                        if (!this._date2cell || 0 != this.dateModule.difference(d, a, "month")) this._populateGrid(), this._populateControls(), this._markSelectedDates([this.value]);
                        d = this._getNodeByDate(a);
                        d.setAttribute("tabIndex", this.tabIndex);
                        (this.focused || b) && d.focus();
                        g && g != d && (c("webkit") ? g.setAttribute("tabIndex", "-1") : g.removeAttribute("tabIndex"))
                    },
                    focus: function() {
                        this._setCurrentFocusAttr(this.currentFocus, !0)
                    },
                    _onDayClick: function(c) {
                        c.stopPropagation();
                        c.preventDefault();
                        for (c = c.target; c && !c.dijitDateValue; c = c.parentNode);
                        c && !a.contains(c, "dijitCalendarDisabledDate") && this.set("value", c.dijitDateValue)
                    },
                    _getNodeByDate: function(a) {
                        return (a = this._patchDate(a)) && this._date2cell ? this._date2cell[a.valueOf()] : null
                    },
                    _markSelectedDates: function(c) {
                        function b(c, d) {
                            a.toggle(d, "dijitCalendarSelectedDate", c);
                            d.setAttribute("aria-selected", c ? "true" : "false")
                        }
                        p.forEach(this._selectedCells || [], n.partial(b, !1));
                        this._selectedCells = p.filter(p.map(c, this._getNodeByDate,
                            this), function(a) {
                            return a
                        });
                        p.forEach(this._selectedCells, n.partial(b, !0))
                    },
                    onChange: function() {},
                    isDisabledDate: function() {},
                    getClassForDate: function() {}
                });
                w._MonthWidget = m("dijit.CalendarLite._MonthWidget", t, {
                    _setMonthAttr: function(a) {
                        var b = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, a),
                            d = 6 == c("ie") ? "" : "\x3cdiv class\x3d'dijitSpacer'\x3e" + p.map(b, function(a) {
                                return "\x3cdiv\x3e" + a + "\x3c/div\x3e"
                            }).join("") + "\x3c/div\x3e";
                        this.domNode.innerHTML = d + "\x3cdiv class\x3d'dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'\x3e" +
                            b[a.getMonth()] + "\x3c/div\x3e"
                    }
                });
                return w
            })
        },
        "dijit/form/_DateTimeTextBox": function() {
            define("dojo/date dojo/date/locale dojo/date/stamp dojo/_base/declare dojo/_base/lang ./RangeBoundTextBox ../_HasDropDown dojo/text!./templates/DropDownBox.html".split(" "), function(p, m, k, f, d, b, e, a) {
                new Date("X");
                return f("dijit.form._DateTimeTextBox", [b, e], {
                    templateString: a,
                    hasDownArrow: !0,
                    cssStateNodes: {
                        _buttonNode: "dijitDownArrowButton"
                    },
                    _unboundedConstraints: {},
                    pattern: m.regexp,
                    datePackage: "",
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._set("type", "text")
                    },
                    compare: function(a, b) {
                        var c = this._isInvalidDate(a),
                            d = this._isInvalidDate(b);
                        if (c || d) return c && d ? 0 : !c ? 1 : -1;
                        var c = this.format(a, this._unboundedConstraints),
                            d = this.format(b, this._unboundedConstraints),
                            e = this.parse(c, this._unboundedConstraints),
                            f = this.parse(d, this._unboundedConstraints);
                        return c == d ? 0 : p.compare(e, f, this._selector)
                    },
                    autoWidth: !0,
                    format: function(a, b) {
                        return !a ? "" : this.dateLocaleModule.format(a, b)
                    },
                    parse: function(a, b) {
                        return this.dateLocaleModule.parse(a, b) || (this._isEmpty(a) ?
                            null : void 0)
                    },
                    serialize: function(a, b) {
                        a.toGregorian && (a = a.toGregorian());
                        return k.toISOString(a, b)
                    },
                    dropDownDefaultValue: new Date,
                    value: new Date(""),
                    _blankValue: null,
                    popupClass: "",
                    _selector: "",
                    constructor: function(a) {
                        a = a || {};
                        this.dateModule = a.datePackage ? d.getObject(a.datePackage, !1) : p;
                        this.dateClassObj = this.dateModule.Date || Date;
                        this.dateClassObj instanceof Date || (this.value = new this.dateClassObj(this.value));
                        this.dateLocaleModule = a.datePackage ? d.getObject(a.datePackage + ".locale", !1) : m;
                        this._set("pattern",
                            this.dateLocaleModule.regexp);
                        this._invalidDate = this.constructor.prototype.value.toString()
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.hasDownArrow || (this._buttonNode.style.display = "none");
                        this.hasDownArrow || (this._buttonNode = this.domNode, this.baseClass += " dijitComboBoxOpenOnClick")
                    },
                    _setConstraintsAttr: function(a) {
                        a.selector = this._selector;
                        a.fullYear = !0;
                        var b = k.fromISOString;
                        "string" == typeof a.min && (a.min = b(a.min), this.dateClassObj instanceof Date || (a.min = new this.dateClassObj(a.min)));
                        "string" == typeof a.max && (a.max = b(a.max), this.dateClassObj instanceof Date || (a.max = new this.dateClassObj(a.max)));
                        this.inherited(arguments);
                        this._unboundedConstraints = d.mixin({}, this.constraints, {
                            min: null,
                            max: null
                        })
                    },
                    _isInvalidDate: function(a) {
                        return !a || isNaN(a) || "object" != typeof a || a.toString() == this._invalidDate
                    },
                    _setValueAttr: function(a, b, c) {
                        void 0 !== a && ("string" == typeof a && (a = k.fromISOString(a)), this._isInvalidDate(a) && (a = null), a instanceof Date && !(this.dateClassObj instanceof Date) && (a = new this.dateClassObj(a)));
                        this.inherited(arguments, [a, b, c]);
                        this.value instanceof Date && (this.filterString = "");
                        !1 !== b && this.dropDown && this.dropDown.set("value", a, !1)
                    },
                    _set: function(a, b) {
                        if ("value" == a) {
                            b instanceof Date && !(this.dateClassObj instanceof Date) && (b = new this.dateClassObj(b));
                            var c = this._get("value");
                            if (c instanceof this.dateClassObj && 0 == this.compare(b, c)) return
                        }
                        this.inherited(arguments)
                    },
                    _setDropDownDefaultValueAttr: function(a) {
                        this._isInvalidDate(a) && (a = new this.dateClassObj);
                        this._set("dropDownDefaultValue", a)
                    },
                    openDropDown: function(a) {
                        this.dropDown && this.dropDown.destroy();
                        var b = d.isString(this.popupClass) ? d.getObject(this.popupClass, !1) : this.popupClass,
                            c = this,
                            e = this.get("value");
                        this.dropDown = new b({
                            onChange: function(a) {
                                c.set("value", a, !0)
                            },
                            id: this.id + "_popup",
                            dir: c.dir,
                            lang: c.lang,
                            value: e,
                            textDir: c.textDir,
                            currentFocus: !this._isInvalidDate(e) ? e : this.dropDownDefaultValue,
                            constraints: c.constraints,
                            filterString: c.filterString,
                            datePackage: c.datePackage,
                            isDisabledDate: function(a) {
                                return !c.rangeCheck(a, c.constraints)
                            }
                        });
                        this.inherited(arguments)
                    },
                    _getDisplayedValueAttr: function() {
                        return this.textbox.value
                    },
                    _setDisplayedValueAttr: function(a, b) {
                        this._setValueAttr(this.parse(a, this.constraints), b, a)
                    }
                })
            })
        },
        "dijit/form/FilteringSelect": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/when", "./MappedTextBox", "./ComboBoxMixin"], function(p, m, k, f, d) {
                return p("dijit.form.FilteringSelect", [f, d], {
                    required: !0,
                    _lastDisplayedValue: "",
                    _isValidSubset: function() {
                        return this._opened
                    },
                    isValid: function() {
                        return !!this.item ||
                            !this.required && "" == this.get("displayedValue")
                    },
                    _refreshState: function() {
                        this.searchTimer || this.inherited(arguments)
                    },
                    _callbackSetLabel: function(b, d, a, n) {
                        d && d[this.searchAttr] !== this._lastQuery || !d && b.length && this.store.getIdentity(b[0]) != this._lastQuery || (b.length ? this.set("item", b[0], n) : this.set("value", "", n || void 0 === n && !this.focused, this.textbox.value, null))
                    },
                    _openResultList: function(b, d, a) {
                        d[this.searchAttr] === this._lastQuery && (this.inherited(arguments), void 0 === this.item && this.validate(!0))
                    },
                    _getValueAttr: function() {
                        return this.valueNode.value
                    },
                    _getValueField: function() {
                        return "value"
                    },
                    _setValueAttr: function(b, d, a, n) {
                        this._onChangeActive || (d = null);
                        if (void 0 === n) {
                            if (null === b || "" === b)
                                if (b = "", !m.isString(a)) {
                                    this._setDisplayedValueAttr(a || "", d);
                                    return
                                }
                            var l = this;
                            this._lastQuery = b;
                            k(this.store.get(b), function(a) {
                                l._callbackSetLabel(a ? [a] : [], void 0, void 0, d)
                            })
                        } else this.valueNode.value = b, this.inherited(arguments, [b, d, a, n])
                    },
                    _setItemAttr: function(b, d, a) {
                        this.inherited(arguments);
                        this._lastDisplayedValue =
                            this.textbox.value
                    },
                    _getDisplayQueryString: function(b) {
                        return b.replace(/([\\\*\?])/g, "\\$1")
                    },
                    _setDisplayedValueAttr: function(b, d) {
                        null == b && (b = "");
                        if (!this._created) {
                            if (!("displayedValue" in this.params)) return;
                            d = !1
                        }
                        if (this.store) {
                            this.closeDropDown();
                            var a = m.clone(this.query),
                                n = this._getDisplayQueryString(b),
                                l;
                            this.store._oldAPI ? l = n : (l = this._patternToRegExp(n), l.toString = function() {
                                return n
                            });
                            this._lastQuery = a[this.searchAttr] = l;
                            this._lastDisplayedValue = this.textbox.value = b;
                            this._set("displayedValue",
                                b);
                            var c = this,
                                f = {
                                    queryOptions: {
                                        ignoreCase: this.ignoreCase,
                                        deep: !0
                                    }
                                };
                            m.mixin(f, this.fetchProperties);
                            this._fetchHandle = this.store.query(a, f);
                            k(this._fetchHandle, function(b) {
                                c._fetchHandle = null;
                                c._callbackSetLabel(b || [], a, f, d)
                            }, function(a) {
                                c._fetchHandle = null;
                                c._cancelingQuery || console.error("dijit.form.FilteringSelect: " + a.toString())
                            })
                        }
                    },
                    undo: function() {
                        this.set("displayedValue", this._lastDisplayedValue)
                    }
                })
            })
        },
        "dijit/form/SimpleTextarea": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/sniff",
                "./TextBox"
            ], function(p, m, k, f) {
                return p("dijit.form.SimpleTextarea", f, {
                    baseClass: "dijitTextBox dijitTextArea",
                    rows: "3",
                    cols: "20",
                    templateString: "\x3ctextarea ${!nameAttrSetting} data-dojo-attach-point\x3d'focusNode,containerNode,textbox' autocomplete\x3d'off'\x3e\x3c/textarea\x3e",
                    postMixInProperties: function() {
                        !this.value && this.srcNodeRef && (this.value = this.srcNodeRef.value);
                        this.inherited(arguments)
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        k("ie") && this.cols && m.add(this.textbox, "dijitTextAreaCols")
                    },
                    filter: function(d) {
                        d && (d = d.replace(/\r/g, ""));
                        return this.inherited(arguments)
                    },
                    _onInput: function(d) {
                        if (this.maxLength) {
                            var b = parseInt(this.maxLength),
                                e = this.textbox.value.replace(/\r/g, ""),
                                b = e.length - b;
                            if (0 < b) {
                                var a = this.textbox;
                                if (a.selectionStart) {
                                    var n = a.selectionStart,
                                        l = 0;
                                    k("opera") && (l = (this.textbox.value.substring(0, n).match(/\r/g) || []).length);
                                    this.textbox.value = e.substring(0, n - b - l) + e.substring(n - l);
                                    a.setSelectionRange(n - b, n - b)
                                } else this.ownerDocument.selection && (a.focus(), e = this.ownerDocument.selection.createRange(),
                                    e.moveStart("character", -b), e.text = "", e.select())
                            }
                        }
                        this.inherited(arguments)
                    }
                })
            })
        },
        "dijit/form/TimeTextBox": function() {
            define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "../_TimePicker", "./_DateTimeTextBox"], function(p, m, k, f, d) {
                return p("dijit.form.TimeTextBox", d, {
                    baseClass: "dijitTextBox dijitComboBox dijitTimeTextBox",
                    popupClass: f,
                    _selector: "time",
                    value: new Date(""),
                    maxHeight: -1,
                    openDropDown: function(b) {
                        this.inherited(arguments);
                        this.dropDown.on("input", k.hitch(this, function() {
                            this.set("value",
                                this.dropDown.get("value"), !1)
                        }))
                    },
                    _onInput: function() {
                        this.inherited(arguments);
                        var b = this.get("displayedValue");
                        this.filterString = b && !this.parse(b, this.constraints) ? b.toLowerCase() : "";
                        this._opened && this.closeDropDown();
                        this.openDropDown()
                    }
                })
            })
        },
        "dijit/_TimePicker": function() {
            define("dojo/_base/array dojo/date dojo/date/locale dojo/date/stamp dojo/_base/declare dojo/dom-class dojo/dom-construct dojo/_base/kernel dojo/keys dojo/_base/lang dojo/sniff dojo/query dojo/mouse dojo/on ./_WidgetBase ./form/_ListMouseMixin".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w) {
                    return d("dijit._TimePicker", [q, w], {
                        baseClass: "dijitTimePicker",
                        pickerMin: "T00:00:00",
                        pickerMax: "T23:59:59",
                        clickableIncrement: "T00:15:00",
                        visibleIncrement: "T01:00:00",
                        value: new Date,
                        _visibleIncrement: 2,
                        _clickableIncrement: 1,
                        _totalIncrements: 10,
                        constraints: {},
                        serialize: f.toISOString,
                        buildRendering: function() {
                            this.inherited(arguments);
                            this.timeMenu = this.containerNode = this.domNode
                        },
                        setValue: function(c) {
                            a.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.",
                                "", "2.0");
                            this.set("value", c)
                        },
                        _setValueAttr: function(a) {
                            this._set("value", a);
                            this._showText()
                        },
                        _setFilterStringAttr: function(a) {
                            this._set("filterString", a);
                            this._showText()
                        },
                        isDisabledDate: function() {
                            return !1
                        },
                        _getFilteredNodes: function(a, c, b, d) {
                            a = this.ownerDocument.createDocumentFragment();
                            for (c = 0; c < this._maxIncrement; c++)(b = this._createOption(c)) && a.appendChild(b);
                            return a
                        },
                        _showText: function() {
                            var a = f.fromISOString;
                            this.domNode.innerHTML = "";
                            this._clickableIncrementDate = a(this.clickableIncrement);
                            this._visibleIncrementDate = a(this.visibleIncrement);
                            var c = 3600 * this._clickableIncrementDate.getHours() + 60 * this._clickableIncrementDate.getMinutes() + this._clickableIncrementDate.getSeconds(),
                                b = 3600 * this._visibleIncrementDate.getHours() + 60 * this._visibleIncrementDate.getMinutes() + this._visibleIncrementDate.getSeconds();
                            (this.value || this.currentFocus).getTime();
                            this._refDate = a(this.pickerMin);
                            this._refDate.setFullYear(1970, 0, 1);
                            this._clickableIncrement = 1;
                            this._visibleIncrement = b / c;
                            a = a(this.pickerMax);
                            a.setFullYear(1970, 0, 1);
                            a = 0.0010 * (a.getTime() - this._refDate.getTime());
                            this._maxIncrement = Math.ceil((a + 1) / c);
                            c = this._getFilteredNodes();
                            !c.firstChild && this.filterString ? (this.filterString = "", this._showText()) : this.domNode.appendChild(c)
                        },
                        constructor: function() {
                            this.constraints = {}
                        },
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this._setConstraintsAttr(this.constraints)
                        },
                        _setConstraintsAttr: function(a) {
                            for (var c in {
                                    clickableIncrement: 1,
                                    visibleIncrement: 1,
                                    pickerMin: 1,
                                    pickerMax: 1
                                }) c in a &&
                                (this[c] = a[c]);
                            a.locale || (a.locale = this.lang)
                        },
                        _createOption: function(a) {
                            var c = new Date(this._refDate),
                                b = this._clickableIncrementDate;
                            c.setHours(c.getHours() + b.getHours() * a, c.getMinutes() + b.getMinutes() * a, c.getSeconds() + b.getSeconds() * a);
                            "time" == this.constraints.selector && c.setFullYear(1970, 0, 1);
                            var d = k.format(c, this.constraints);
                            if (this.filterString && 0 !== d.toLowerCase().indexOf(this.filterString)) return null;
                            b = this.ownerDocument.createElement("div");
                            b.className = this.baseClass + "Item";
                            b.date = c;
                            b.idx =
                                a;
                            e.create("div", {
                                "class": this.baseClass + "ItemInner",
                                innerHTML: d
                            }, b);
                            d = 1 > a % this._visibleIncrement && -1 < a % this._visibleIncrement;
                            a = !d && !(a % this._clickableIncrement);
                            d ? b.className += " " + this.baseClass + "Marker" : a && (b.className += " " + this.baseClass + "Tick");
                            this.isDisabledDate(c) && (b.className += " " + this.baseClass + "ItemDisabled");
                            this.value && !m.compare(this.value, c, this.constraints.selector) && (b.selected = !0, b.className += " " + this.baseClass + "ItemSelected", this._selectedDiv = b, d ? b.className += " " + this.baseClass +
                                "MarkerSelected" : a && (b.className += " " + this.baseClass + "TickSelected"), this._highlightOption(b, !0));
                            return b
                        },
                        onOpen: function() {
                            this.inherited(arguments);
                            this.set("selected", this._selectedDiv)
                        },
                        _onOptionSelected: function(a, c) {
                            var b = a.target.date || a.target.parentNode.date;
                            b && !this.isDisabledDate(b) && (this._set("value", b), this.emit("input"), c && (this._highlighted_option = null, this.set("value", b), this.onChange(b)))
                        },
                        onChange: function() {},
                        _highlightOption: function(a, c) {
                            if (a) {
                                if (c) this._highlighted_option &&
                                    this._highlightOption(this._highlighted_option, !1), this._highlighted_option = a;
                                else {
                                    if (this._highlighted_option !== a) return;
                                    this._highlighted_option = null
                                }
                                b.toggle(a, this.baseClass + "ItemHover", c);
                                b.contains(a, this.baseClass + "Marker") ? b.toggle(a, this.baseClass + "MarkerHover", c) : b.toggle(a, this.baseClass + "TickHover", c)
                            }
                        },
                        handleKey: function(a) {
                            if (a.keyCode == n.DOWN_ARROW) return this.selectNextNode(), this._onOptionSelected({
                                target: this._highlighted_option
                            }, !1), a.stopPropagation(), a.preventDefault(), !1;
                            if (a.keyCode ==
                                n.UP_ARROW) return this.selectPreviousNode(), this._onOptionSelected({
                                target: this._highlighted_option
                            }, !1), a.stopPropagation(), a.preventDefault(), !1;
                            if (a.keyCode == n.ENTER || a.keyCode === n.TAB) {
                                if (!this._keyboardSelected && a.keyCode === n.TAB) return !0;
                                this._highlighted_option && this._onOptionSelected({
                                    target: this._highlighted_option
                                }, !0);
                                return a.keyCode === n.TAB
                            }
                        },
                        onHover: function(a) {
                            this._highlightOption(a, !0)
                        },
                        onUnhover: function(a) {
                            this._highlightOption(a, !1)
                        },
                        onSelect: function(a) {
                            this._highlightOption(a, !0)
                        },
                        onDeselect: function(a) {
                            this._highlightOption(a, !1)
                        },
                        onClick: function(a) {
                            this._onOptionSelected({
                                target: a
                            }, !0)
                        }
                    })
                })
        },
        "dojox/date/islamic": function() {
            define(["dojox/main", "dojo/_base/lang", "dojo/date", "./islamic/Date"], function(p, m, k, f) {
                var d = m.getObject("date.islamic", !0, p);
                d.getDaysInMonth = function(b) {
                    return b.getDaysInIslamicMonth(b.getMonth(), b.getFullYear())
                };
                d.compare = function(b, d, a) {
                    b instanceof f && (b = b.toGregorian());
                    d instanceof f && (d = d.toGregorian());
                    return k.compare.apply(null, arguments)
                };
                d.add = function(b, d, a) {
                    var n = new f(b);
                    switch (d) {
                        case "day":
                            n.setDate(b.getDate() + a);
                            break;
                        case "weekday":
                            var l = b.getDay();
                            if (5 > l + a && 0 < l + a) n.setDate(b.getDate() + a);
                            else {
                                var c = d = 0;
                                5 == l ? (l = 4, c = 0 < a ? -1 : 1) : 6 == l && (l = 4, c = 0 < a ? -2 : 2);
                                var l = 0 < a ? 5 - l - 1 : -l,
                                    k = a - l,
                                    m = parseInt(k / 5);
                                0 != k % 5 && (d = 0 < a ? 2 : -2);
                                n.setDate(b.getDate() + (d + 7 * m + k % 5 + l) + c)
                            }
                            break;
                        case "year":
                            n.setFullYear(b.getFullYear() + a);
                            break;
                        case "week":
                            n.setDate(b.getDate() + 7 * a);
                            break;
                        case "month":
                            b = b.getMonth();
                            n.setMonth(b + a);
                            break;
                        case "hour":
                            n.setHours(b.getHours() +
                                a);
                            break;
                        case "minute":
                            n._addMinutes(a);
                            break;
                        case "second":
                            n._addSeconds(a);
                            break;
                        case "millisecond":
                            n._addMilliseconds(a)
                    }
                    return n
                };
                d.difference = function(b, e, a) {
                    e = e || new f;
                    a = a || "day";
                    var n = e.getFullYear() - b.getFullYear(),
                        l = 1;
                    switch (a) {
                        case "weekday":
                            n = Math.round(d.difference(b, e, "day"));
                            l = parseInt(d.difference(b, e, "week"));
                            a = n % 7;
                            if (0 == a) n = 5 * l;
                            else {
                                var c = 0,
                                    k = b.getDay();
                                e = e.getDay();
                                l = parseInt(n / 7);
                                a = n % 7;
                                b = new f(b);
                                b.setDate(b.getDate() + 7 * l);
                                b = b.getDay();
                                if (0 < n) switch (!0) {
                                    case 5 == k:
                                        c = -1;
                                        break;
                                    case 6 ==
                                    k:
                                        c = 0;
                                        break;
                                    case 5 == e:
                                        c = -1;
                                        break;
                                    case 6 == e:
                                        c = -2;
                                        break;
                                    case 5 < b + a:
                                        c = -2
                                } else if (0 > n) switch (!0) {
                                    case 5 == k:
                                        c = 0;
                                        break;
                                    case 6 == k:
                                        c = 1;
                                        break;
                                    case 5 == e:
                                        c = 2;
                                        break;
                                    case 6 == e:
                                        c = 1;
                                        break;
                                    case 0 > b + a:
                                        c = 2
                                }
                                n = n + c - 2 * l
                            }
                            l = n;
                            break;
                        case "year":
                            l = n;
                            break;
                        case "month":
                            a = e.toGregorian() > b.toGregorian() ? e : b;
                            c = e.toGregorian() > b.toGregorian() ? b : e;
                            l = a.getMonth();
                            k = c.getMonth();
                            if (0 == n) l = a.getMonth() - c.getMonth();
                            else {
                                l = 12 - k + l;
                                n = c.getFullYear() + 1;
                                a = a.getFullYear();
                                for (n; n < a; n++) l += 12
                            }
                            e.toGregorian() < b.toGregorian() && (l = -l);
                            break;
                        case "week":
                            l = parseInt(d.difference(b, e, "day") / 7);
                            break;
                        case "day":
                            l /= 24;
                        case "hour":
                            l /= 60;
                        case "minute":
                            l /= 60;
                        case "second":
                            l /= 1E3;
                        case "millisecond":
                            l *= e.toGregorian().getTime() - b.toGregorian().getTime()
                    }
                    return Math.round(l)
                };
                return d
            })
        },
        "dojox/date/islamic/Date": function() {
            define(["dojo/_base/lang", "dojo/_base/declare", "dojo/date"], function(p, m, k) {
                var f = m("dojox.date.islamic.Date", null, {
                    _date: 0,
                    _month: 0,
                    _year: 0,
                    _hours: 0,
                    _minutes: 0,
                    _seconds: 0,
                    _milliseconds: 0,
                    _day: 0,
                    _GREGORIAN_EPOCH: 1721425.5,
                    _ISLAMIC_EPOCH: 1948439.5,
                    constructor: function() {
                        var d = arguments.length;
                        d ? 1 == d ? (d = arguments[0], "number" == typeof d && (d = new Date(d)), d instanceof Date ? this.fromGregorian(d) : "" == d ? this._date = new Date("") : (this._year = d._year, this._month = d._month, this._date = d._date, this._hours = d._hours, this._minutes = d._minutes, this._seconds = d._seconds, this._milliseconds = d._milliseconds)) : 3 <= d && (this._year += arguments[0], this._month += arguments[1], this._date += arguments[2], this._hours += arguments[3] || 0, this._minutes += arguments[4] || 0, this._seconds +=
                            arguments[5] || 0, this._milliseconds += arguments[6] || 0) : this.fromGregorian(new Date)
                    },
                    getDate: function() {
                        return this._date
                    },
                    getMonth: function() {
                        return this._month
                    },
                    getFullYear: function() {
                        return this._year
                    },
                    getDay: function() {
                        return this.toGregorian().getDay()
                    },
                    getHours: function() {
                        return this._hours
                    },
                    getMinutes: function() {
                        return this._minutes
                    },
                    getSeconds: function() {
                        return this._seconds
                    },
                    getMilliseconds: function() {
                        return this._milliseconds
                    },
                    setDate: function(d) {
                        d = parseInt(d);
                        if (!(0 < d && d <= this.getDaysInIslamicMonth(this._month,
                                this._year))) {
                            var b;
                            if (0 < d)
                                for (b = this.getDaysInIslamicMonth(this._month, this._year); d > b; d -= b, b = this.getDaysInIslamicMonth(this._month, this._year)) this._month++, 12 <= this._month && (this._year++, this._month -= 12);
                            else
                                for (b = this.getDaysInIslamicMonth(0 <= this._month - 1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year : this._year - 1); 0 >= d; b = this.getDaysInIslamicMonth(0 <= this._month - 1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year : this._year - 1)) this._month--, 0 > this._month && (this._year--, this._month += 12), d += b
                        }
                        this._date =
                            d;
                        return this
                    },
                    setFullYear: function(d) {
                        this._year = +d
                    },
                    setMonth: function(d) {
                        this._year += Math.floor(d / 12);
                        this._month = 0 < d ? Math.floor(d % 12) : Math.floor((d % 12 + 12) % 12)
                    },
                    setHours: function() {
                        var d = arguments.length,
                            b = 0;
                        1 <= d && (b = parseInt(arguments[0]));
                        2 <= d && (this._minutes = parseInt(arguments[1]));
                        3 <= d && (this._seconds = parseInt(arguments[2]));
                        4 == d && (this._milliseconds = parseInt(arguments[3]));
                        for (; 24 <= b;) this._date++, d = this.getDaysInIslamicMonth(this._month, this._year), this._date > d && (this._month++, 12 <= this._month &&
                            (this._year++, this._month -= 12), this._date -= d), b -= 24;
                        this._hours = b
                    },
                    _addMinutes: function(d) {
                        d += this._minutes;
                        this.setMinutes(d);
                        this.setHours(this._hours + parseInt(d / 60));
                        return this
                    },
                    _addSeconds: function(d) {
                        d += this._seconds;
                        this.setSeconds(d);
                        this._addMinutes(parseInt(d / 60));
                        return this
                    },
                    _addMilliseconds: function(d) {
                        d += this._milliseconds;
                        this.setMilliseconds(d);
                        this._addSeconds(parseInt(d / 1E3));
                        return this
                    },
                    setMinutes: function(d) {
                        this._minutes = d % 60;
                        return this
                    },
                    setSeconds: function(d) {
                        this._seconds =
                            d % 60;
                        return this
                    },
                    setMilliseconds: function(d) {
                        this._milliseconds = d % 1E3;
                        return this
                    },
                    toString: function() {
                        if (isNaN(this._date)) return "Invalidate Date";
                        var d = new Date;
                        d.setHours(this._hours);
                        d.setMinutes(this._minutes);
                        d.setSeconds(this._seconds);
                        d.setMilliseconds(this._milliseconds);
                        return this._month + " " + this._date + " " + this._year + " " + d.toTimeString()
                    },
                    toGregorian: function() {
                        var d = this._year,
                            d = this._date + Math.ceil(29.5 * this._month) + 354 * (d - 1) + Math.floor((3 + 11 * d) / 30) + this._ISLAMIC_EPOCH - 1,
                            d = Math.floor(d -
                                0.5) + 0.5,
                            b = d - this._GREGORIAN_EPOCH,
                            e = Math.floor(b / 146097),
                            a = this._mod(b, 146097),
                            b = Math.floor(a / 36524),
                            n = this._mod(a, 36524),
                            a = Math.floor(n / 1461),
                            n = this._mod(n, 1461),
                            n = Math.floor(n / 365),
                            e = 400 * e + 100 * b + 4 * a + n;
                        4 == b || 4 == n || e++;
                        b = d - (this._GREGORIAN_EPOCH + 365 * (e - 1) + Math.floor((e - 1) / 4) - Math.floor((e - 1) / 100) + Math.floor((e - 1) / 400));
                        a = this._GREGORIAN_EPOCH - 1 + 365 * (e - 1) + Math.floor((e - 1) / 4) - Math.floor((e - 1) / 100) + Math.floor((e - 1) / 400) + Math.floor(739 / 12 + (k.isLeapYear(new Date(e, 3, 1)) ? -1 : -2) + 1);
                        a = d < a ? 0 : k.isLeapYear(new Date(e,
                            3, 1)) ? 1 : 2;
                        b = Math.floor((12 * (b + a) + 373) / 367);
                        a = this._GREGORIAN_EPOCH - 1 + 365 * (e - 1) + Math.floor((e - 1) / 4) - Math.floor((e - 1) / 100) + Math.floor((e - 1) / 400) + Math.floor((367 * b - 362) / 12 + (2 >= b ? 0 : k.isLeapYear(new Date(e, b - 1, 1)) ? -1 : -2) + 1);
                        return new Date(e, b - 1, d - a + 1, this._hours, this._minutes, this._seconds, this._milliseconds)
                    },
                    fromGregorian: function(d) {
                        d = new Date(d);
                        var b = d.getFullYear(),
                            e = d.getMonth(),
                            a = d.getDate(),
                            b = this._GREGORIAN_EPOCH - 1 + 365 * (b - 1) + Math.floor((b - 1) / 4) + -Math.floor((b - 1) / 100) + Math.floor((b - 1) / 400) + Math.floor((367 *
                                (e + 1) - 362) / 12 + (2 >= e + 1 ? 0 : k.isLeapYear(d) ? -1 : -2) + a),
                            b = Math.floor(b) + 0.5,
                            b = b - this._ISLAMIC_EPOCH,
                            e = Math.floor((30 * b + 10646) / 10631),
                            a = Math.ceil((b - 29 - this._yearStart(e)) / 29.5),
                            a = Math.min(a, 11);
                        this._date = Math.ceil(b - this._monthStart(e, a)) + 1;
                        this._month = a;
                        this._year = e;
                        this._hours = d.getHours();
                        this._minutes = d.getMinutes();
                        this._seconds = d.getSeconds();
                        this._milliseconds = d.getMilliseconds();
                        this._day = d.getDay();
                        return this
                    },
                    valueOf: function() {
                        return this.toGregorian().valueOf()
                    },
                    _yearStart: function(d) {
                        return 354 *
                            (d - 1) + Math.floor((3 + 11 * d) / 30)
                    },
                    _monthStart: function(d, b) {
                        return Math.ceil(29.5 * b) + 354 * (d - 1) + Math.floor((3 + 11 * d) / 30)
                    },
                    _civilLeapYear: function(d) {
                        return 11 > (14 + 11 * d) % 30
                    },
                    getDaysInIslamicMonth: function(d, b) {
                        var e = 0,
                            e = 29 + (d + 1) % 2;
                        11 == d && this._civilLeapYear(b) && e++;
                        return e
                    },
                    _mod: function(d, b) {
                        return d - b * Math.floor(d / b)
                    }
                });
                f.getDaysInIslamicMonth = function(d) {
                    return (new f).getDaysInIslamicMonth(d.getMonth(), d.getFullYear())
                };
                return f
            })
        },
        "dojox/date/islamic/locale": function() {
            define("dojox/main dojo/_base/lang dojo/_base/array dojo/date dojo/i18n dojo/regexp dojo/string ./Date dojo/i18n!dojo/cldr/nls/islamic".split(" "),
                function(p, m, k, f, d, b, e, a, n) {
                    function l(a, c, b, d, l) {
                        return l.replace(/([a-z])\1*/ig, function(b) {
                            var d, h, n = b.charAt(0);
                            b = b.length;
                            var k = ["abbr", "wide", "narrow"];
                            switch (n) {
                                case "G":
                                    d = c.eraAbbr[0];
                                    break;
                                case "y":
                                    d = String(a.getFullYear());
                                    break;
                                case "M":
                                    d = a.getMonth();
                                    3 > b ? (d += 1, h = !0) : (n = ["months-format", k[b - 3]].join("-"), d = c[n][d]);
                                    break;
                                case "d":
                                    d = a.getDate(!0);
                                    h = !0;
                                    break;
                                case "E":
                                    d = a.getDay();
                                    3 > b ? (d += 1, h = !0) : (n = ["days-format", k[b - 3]].join("-"), d = c[n][d]);
                                    break;
                                case "a":
                                    d = 12 > a.getHours() ? "am" : "pm";
                                    d = c["dayPeriods-format-wide-" +
                                        d];
                                    break;
                                case "h":
                                case "H":
                                case "K":
                                case "k":
                                    h = a.getHours();
                                    switch (n) {
                                        case "h":
                                            d = h % 12 || 12;
                                            break;
                                        case "H":
                                            d = h;
                                            break;
                                        case "K":
                                            d = h % 12;
                                            break;
                                        case "k":
                                            d = h || 24
                                    }
                                    h = !0;
                                    break;
                                case "m":
                                    d = a.getMinutes();
                                    h = !0;
                                    break;
                                case "s":
                                    d = a.getSeconds();
                                    h = !0;
                                    break;
                                case "S":
                                    d = Math.round(a.getMilliseconds() * Math.pow(10, b - 3));
                                    h = !0;
                                    break;
                                case "z":
                                    if (d = f.getTimezoneName(a.toGregorian())) break;
                                    b = 4;
                                case "Z":
                                    d = a.toGregorian().getTimezoneOffset();
                                    d = [0 >= d ? "+" : "-", e.pad(Math.floor(Math.abs(d) / 60), 2), e.pad(Math.abs(d) % 60, 2)];
                                    4 == b && (d.splice(0,
                                        0, "GMT"), d.splice(3, 0, ":"));
                                    d = d.join("");
                                    break;
                                default:
                                    throw Error("dojox.date.islamic.locale.formatPattern: invalid pattern char: " + l);
                            }
                            h && (d = e.pad(d, b));
                            return d
                        })
                    }

                    function c(a, c, b, d) {
                        var e = function(a) {
                            return a
                        };
                        c = c || e;
                        b = b || e;
                        d = d || e;
                        var g = a.match(/(''|[^'])+/g),
                            l = "'" == a.charAt(0);
                        k.forEach(g, function(a, d) {
                            a ? (g[d] = (l ? b : c)(a), l = !l) : g[d] = ""
                        });
                        return d(g.join(""))
                    }

                    function s(a, c, e, l) {
                        l = b.escapeString(l);
                        d.normalizeLocale(e.locale);
                        return l.replace(/([a-z])\1*/ig, function(b) {
                            var d;
                            d = b.charAt(0);
                            var l =
                                b.length,
                                n = "";
                            e.strict ? 1 < l && (n = "0{" + (l - 1) + "}") : n = "0?";
                            switch (d) {
                                case "y":
                                    d = "\\d+";
                                    break;
                                case "M":
                                    d = 2 < l ? "\\S+ ?\\S+" : n + "[1-9]|1[0-2]";
                                    break;
                                case "d":
                                    d = "[12]\\d|" + n + "[1-9]|3[01]";
                                    break;
                                case "E":
                                    d = "\\S+";
                                    break;
                                case "h":
                                    d = n + "[1-9]|1[0-2]";
                                    break;
                                case "k":
                                    d = n + "\\d|1[01]";
                                    break;
                                case "H":
                                    d = n + "\\d|1\\d|2[0-3]";
                                    break;
                                case "K":
                                    d = n + "[1-9]|1\\d|2[0-4]";
                                    break;
                                case "m":
                                case "s":
                                    d = n + "\\d|[0-5]\\d";
                                    break;
                                case "S":
                                    d = "\\d{" + l + "}";
                                    break;
                                case "a":
                                    l = e.am || c["dayPeriods-format-wide-am"];
                                    n = e.pm || c["dayPeriods-format-wide-pm"];
                                    e.strict ? d = l + "|" + n : (d = l + "|" + n, l != l.toLowerCase() && (d += "|" + l.toLowerCase()), n != n.toLowerCase() && (d += "|" + n.toLowerCase()));
                                    break;
                                default:
                                    d = ".*"
                            }
                            a && a.push(b);
                            return "(" + d + ")"
                        }).replace(/[\xa0 ]/g, "[\\s\\xa0]")
                    }
                    var t = m.getObject("date.islamic.locale", !0, p);
                    t.format = function(a, b) {
                        b = b || {};
                        var e = d.normalizeLocale(b.locale),
                            n = b.formatLength || "short",
                            f = t._getIslamicBundle(e),
                            g = [],
                            e = m.hitch(this, l, a, f, e, b.fullYear);
                        if ("year" == b.selector) return a.getFullYear();
                        if ("time" != b.selector) {
                            var k = b.datePattern || f["dateFormat-" +
                                n];
                            k && g.push(c(k, e))
                        }
                        "date" != b.selector && (n = b.timePattern || f["timeFormat-" + n]) && g.push(c(n, e));
                        return g.join(" ")
                    };
                    t.regexp = function(a) {
                        return t._parseInfo(a).regexp
                    };
                    t._parseInfo = function(a) {
                        a = a || {};
                        var b = d.normalizeLocale(a.locale),
                            b = t._getIslamicBundle(b),
                            e = a.formatLength || "short",
                            l = a.datePattern || b["dateFormat-" + e],
                            e = a.timePattern || b["timeFormat-" + e],
                            n = [];
                        return {
                            regexp: c("date" == a.selector ? l : "time" == a.selector ? e : "undefined" == typeof e ? l : l + " " + e, m.hitch(this, s, n, b, a)),
                            tokens: n,
                            bundle: b
                        }
                    };
                    t.parse =
                        function(c, b) {
                            c = c.replace(/[\u200E\u200F\u202A\u202E]/g, "");
                            b || (b = {});
                            var e = t._parseInfo(b),
                                l = e.tokens,
                                n = e.bundle,
                                e = e.regexp.replace(/[\u200E\u200F\u202A\u202E]/g, ""),
                                e = RegExp("^" + e + "$").exec(c);
                            d.normalizeLocale(b.locale);
                            if (!e) return null;
                            var g = [1389, 0, 1, 0, 0, 0, 0],
                                f = "",
                                m = ["abbr", "wide", "narrow"];
                            k.every(e, function(a, c) {
                                if (!c) return !0;
                                var d = l[c - 1],
                                    e = d.length;
                                switch (d.charAt(0)) {
                                    case "y":
                                        g[0] = Number(a);
                                        break;
                                    case "M":
                                        if (2 < e) {
                                            if (d = n["months-format-" + m[e - 3]].concat(), b.strict || (a = a.replace(".", "").toLowerCase(),
                                                    d = k.map(d, function(a) {
                                                        return a ? a.replace(".", "").toLowerCase() : a
                                                    })), a = k.indexOf(d, a), -1 == a) return !1
                                        } else a--;
                                        g[1] = Number(a);
                                        break;
                                    case "D":
                                        g[1] = 0;
                                    case "d":
                                        g[2] = Number(a);
                                        break;
                                    case "a":
                                        d = b.am || n["dayPeriods-format-wide-am"];
                                        e = b.pm || n["dayPeriods-format-wide-pm"];
                                        if (!b.strict) {
                                            var h = /\./g;
                                            a = a.replace(h, "").toLowerCase();
                                            d = d.replace(h, "").toLowerCase();
                                            e = e.replace(h, "").toLowerCase()
                                        }
                                        if (b.strict && a != d && a != e) return !1;
                                        f = a == e ? "p" : a == d ? "a" : "";
                                        break;
                                    case "K":
                                        24 == a && (a = 0);
                                    case "h":
                                    case "H":
                                    case "k":
                                        g[3] =
                                            Number(a);
                                        break;
                                    case "m":
                                        g[4] = Number(a);
                                        break;
                                    case "s":
                                        g[5] = Number(a);
                                        break;
                                    case "S":
                                        g[6] = Number(a)
                                }
                                return !0
                            });
                            e = +g[3];
                            "p" === f && 12 > e ? g[3] = e + 12 : "a" === f && 12 == e && (g[3] = 0);
                            return new a(g[0], g[1], g[2], g[3], g[4], g[5], g[6])
                        };
                    var u = [];
                    t.addCustomFormats = function(a, c) {
                        u.push({
                            pkg: a,
                            name: c
                        })
                    };
                    t._getIslamicBundle = function(a) {
                        var c = {};
                        k.forEach(u, function(b) {
                            b = d.getLocalization(b.pkg, b.name, a);
                            c = m.mixin(c, b)
                        }, this);
                        return c
                    };
                    t.addCustomFormats("dojo.cldr", "islamic");
                    t.getNames = function(a, c, b, d, e) {
                        var g;
                        d = t._getIslamicBundle(d);
                        a = [a, b, c];
                        "standAlone" == b && (b = a.join("-"), g = d[b], 1 == g[0] && (g = void 0));
                        a[1] = "format";
                        return (g || d[a.join("-")]).concat()
                    };
                    t.weekDays = t.getNames("days", "wide", "format");
                    t.months = t.getNames("months", "wide", "format");
                    return t
                })
        },
        "esri/dijit/editing/Add": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ./EditOperationBase".split(" "), function(p, m, k, f, d, b) {
                return m(b, {
                    declaredClass: "esri.dijit.editing.Add",
                    type: "edit",
                    label: "Add Features",
                    constructor: function(b) {
                        b =
                            b || {};
                        b.featureLayer ? (this._featureLayer = b.featureLayer, b.addedGraphics ? this._addedGraphics = b.addedGraphics : console.error("In constructor of 'esri.dijit.editing.Add', no graphics provided")) : console.error("In constructor of 'esri.dijit.editing.Add', featureLayer is not provided")
                    },
                    updateObjectIds: function(b, a) {
                        this.updateIds(this._featureLayer, this._addedGraphics, b, a)
                    },
                    performUndo: function() {
                        return this._featureLayer.applyEdits(null, null, this._addedGraphics).then(k.hitch(this, function() {
                            return {
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    },
                    performRedo: function() {
                        var b = p.map(this._addedGraphics, function(a) {
                            return a.attributes[this._featureLayer.objectIdField]
                        }, this);
                        return this._featureLayer.applyEdits(this._addedGraphics, null, null).then(k.hitch(this, function(a, d, l) {
                            a = p.map(a, function(a) {
                                return a.objectId
                            });
                            return {
                                oldIds: b,
                                addedIds: a,
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    }
                })
            })
        },
        "esri/dijit/editing/EditOperationBase": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/has", "../../kernel", "../../OperationBase"],
                function(p, m, k, f, d) {
                    return m(d, {
                        declaredClass: "esri.EditOperationBase",
                        updateIds: function(b, d, a, n) {
                            p.forEach(d, function(d, c) {
                                var e = d[b.objectIdField];
                                p.forEach(a, function(a, c) {
                                    e === a && (d[b.objectIdField] = n[c])
                                })
                            })
                        }
                    })
                })
        },
        "esri/OperationBase": function() {
            define(["dojo/_base/declare", "dojo/has", "./kernel"], function(p, m, k) {
                return p(null, {
                    declaredClass: "esri.OperationBase",
                    type: "not implemented",
                    label: "not implemented",
                    constructor: function(f) {
                        f = f || {};
                        f.label && (this.label = f.label)
                    },
                    performUndo: function() {
                        console.log("performUndo has not been implemented")
                    },
                    performRedo: function() {
                        console.log("performRedo has not been implemented")
                    }
                })
            })
        },
        "esri/dijit/editing/Update": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/jsonUtils ./EditOperationBase".split(" "), function(p, m, k, f, d, b, e) {
                return m(e, {
                    declaredClass: "esri.dijit.editing.Update",
                    type: "edit",
                    label: "Update Features",
                    constructor: function(a) {
                        var b;
                        a = a || {};
                        if (a.featureLayer)
                            if (this._featureLayer = a.featureLayer, a.preUpdatedGraphics) {
                                this._preUpdatedGraphicsGeometries = [];
                                this._preUpdatedGraphicsAttributes = [];
                                for (b = 0; b < a.preUpdatedGraphics.length; b++) this._preUpdatedGraphicsGeometries.push(a.preUpdatedGraphics[b].geometry.toJson()), this._preUpdatedGraphicsAttributes.push(a.preUpdatedGraphics[b].attributes);
                                if (a.postUpdatedGraphics) {
                                    this._postUpdatedGraphics = a.postUpdatedGraphics;
                                    this._postUpdatedGraphicsGeometries = [];
                                    this._postUpdatedGraphicsAttributes = [];
                                    for (b = 0; b < a.postUpdatedGraphics.length; b++) a.postUpdatedGraphics[b].geometry ? this._postUpdatedGraphicsGeometries.push(a.postUpdatedGraphics[b].geometry.toJson()) :
                                        this._postUpdatedGraphicsGeometries.push(a.postUpdatedGraphics[b].geometry), this._postUpdatedGraphicsAttributes.push(k.clone(a.postUpdatedGraphics[b].attributes))
                                } else console.error("In constructor of 'esri.dijit.editing.Update', postUpdatedGraphics not provided")
                            } else console.error("In constructor of 'esri.dijit.editing.Update', preUpdatedGraphics not provided");
                        else console.error("In constructor of 'esri.dijit.editing.Update', featureLayer not provided")
                    },
                    updateObjectIds: function(a, b) {
                        this.updateIds(this._featureLayer,
                            this._preUpdatedGraphicsAttributes, a, b);
                        this.updateIds(this._featureLayer, this._postUpdatedGraphicsAttributes, a, b)
                    },
                    performUndo: function() {
                        var a;
                        for (a = 0; a < this._postUpdatedGraphics.length; a++) this._preUpdatedGraphicsGeometries[a] ? this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._preUpdatedGraphicsGeometries[a])) : this._postUpdatedGraphics[a].setGeometry(this._preUpdatedGraphicsGeometries[a]), this._postUpdatedGraphics[a].setAttributes(this._preUpdatedGraphicsAttributes[a]);
                        return this._featureLayer.applyEdits(null,
                            this._postUpdatedGraphics, null).then(k.hitch(this, function() {
                            return {
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    },
                    performRedo: function() {
                        var a;
                        for (a = 0; a < this._postUpdatedGraphics.length; a++) this._postUpdatedGraphicsGeometries[a] ? this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._postUpdatedGraphicsGeometries[a])) : this._postUpdatedGraphics[a].setGeometry(this._postUpdatedGraphicsGeometries[a]), this._postUpdatedGraphics[a].setAttributes(this._postUpdatedGraphicsAttributes[a]);
                        return this._featureLayer.applyEdits(null,
                            this._postUpdatedGraphics, null).then(k.hitch(this, function() {
                            return {
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    }
                })
            })
        },
        "esri/dijit/editing/Delete": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ./EditOperationBase".split(" "), function(p, m, k, f, d, b) {
                return m(b, {
                    declaredClass: "esri.dijit.editing.Delete",
                    type: "edit",
                    label: "Delete Features",
                    constructor: function(b) {
                        b = b || {};
                        b.featureLayer ? (this._featureLayer = b.featureLayer, b.deletedGraphics ? this._deletedGraphics =
                            b.deletedGraphics : console.error("In constructor of 'esri.dijit.editing.Delete', no graphics provided")) : console.error("In constructor of 'esri.dijit.editing.Delete', featureLayer is not provided")
                    },
                    updateObjectIds: function(b, a) {
                        this.updateIds(this._featureLayer, this._deletedGraphics, b, a)
                    },
                    performUndo: function() {
                        var b = p.map(this._deletedGraphics, function(a) {
                            return a.attributes[this._featureLayer.objectIdField]
                        }, this);
                        return this._featureLayer.applyEdits(this._deletedGraphics, null, null).then(k.hitch(this,
                            function(a, d, l) {
                                a = p.map(a, function(a) {
                                    return a.objectId
                                });
                                return {
                                    oldIds: b,
                                    addedIds: a,
                                    layer: this._featureLayer,
                                    operation: this
                                }
                            }))
                    },
                    performRedo: function() {
                        return this._featureLayer.applyEdits(null, null, this._deletedGraphics).then(k.hitch(this, function() {
                            return {
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    }
                })
            })
        },
        "esri/dijit/editing/Cut": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/jsonUtils ./EditOperationBase".split(" "), function(p, m, k, f,
                d, b, e) {
                return m(e, {
                    declaredClass: "esri.dijit.editing.Cut",
                    type: "edit",
                    label: "Cut Features",
                    constructor: function(a) {
                        var b;
                        a = a || {};
                        if (a.featureLayer)
                            if (this._featureLayer = a.featureLayer, a.addedGraphics)
                                if (this._addedGraphics = a.addedGraphics, a.preUpdatedGraphics) {
                                    this._preUpdatedGraphicsGeometries = [];
                                    this._preUpdatedGraphicsAttributes = [];
                                    for (b = 0; b < a.preUpdatedGraphics.length; b++) this._preUpdatedGraphicsGeometries.push(a.preUpdatedGraphics[b].geometry.toJson()), this._preUpdatedGraphicsAttributes.push(a.preUpdatedGraphics[b].attributes);
                                    if (a.postUpdatedGraphics) {
                                        this._postUpdatedGraphics = a.postUpdatedGraphics;
                                        this._postUpdatedGraphicsGeometries = [];
                                        this._postUpdatedGraphicsAttributes = [];
                                        for (b = 0; b < a.postUpdatedGraphics.length; b++) this._postUpdatedGraphicsGeometries.push(a.postUpdatedGraphics[b].geometry.toJson()), this._postUpdatedGraphicsAttributes.push(k.clone(a.postUpdatedGraphics[b].attributes))
                                    } else console.error("In constructor of 'esri.dijit.editing.Cut', postUpdatedGraphics not provided")
                                } else console.error("In constructor of 'esri.dijit.editing.Cut', preUpdatedGraphics not provided");
                        else console.error("In constructor of 'esri.dijit.editing.Cut', addedGraphics for cut not provided");
                        else console.error("In constructor of 'esri.dijit.editing.Cut', featureLayer not provided")
                    },
                    updateObjectIds: function(a, b) {
                        this.updateIds(this._featureLayer, this._preUpdatedGraphicsAttributes, a, b);
                        this.updateIds(this._featureLayer, this._postUpdatedGraphicsAttributes, a, b);
                        this.updateIds(this._featureLayer, this._addedGraphics, a, b)
                    },
                    performUndo: function() {
                        var a;
                        for (a = 0; a < this._postUpdatedGraphics.length; a++) this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._preUpdatedGraphicsGeometries[a])),
                            this._postUpdatedGraphics[a].setAttributes(this._preUpdatedGraphicsAttributes[a]);
                        return this._featureLayer.applyEdits(null, this._postUpdatedGraphics, this._addedGraphics).then(k.hitch(this, function() {
                            return {
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    },
                    performRedo: function() {
                        var a;
                        for (a = 0; a < this._postUpdatedGraphics.length; a++) this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._postUpdatedGraphicsGeometries[a])), this._postUpdatedGraphics[a].setAttributes(this._postUpdatedGraphicsAttributes[a]);
                        var d = p.map(this._addedGraphics, function(a) {
                            return a.attributes[this._featureLayer.objectIdField]
                        }, this);
                        return this._featureLayer.applyEdits(this._addedGraphics, this._postUpdatedGraphics, null).then(k.hitch(this, function(a, c, b) {
                            a = p.map(a, function(a) {
                                return a.objectId
                            });
                            return {
                                oldIds: d,
                                addedIds: a,
                                layer: this._featureLayer,
                                operation: this
                            }
                        }))
                    }
                })
            })
        },
        "esri/dijit/editing/Union": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/jsonUtils ./EditOperationBase".split(" "),
                function(p, m, k, f, d, b, e) {
                    return m(e, {
                        declaredClass: "esri.dijit.editing.Union",
                        type: "edit",
                        label: "Union Features",
                        constructor: function(a) {
                            a = a || {};
                            this._featureLayer = a.featureLayer;
                            this._deletedGraphics = a.deletedGraphics;
                            this._preUpdatedGraphics = a.preUpdatedGraphics;
                            this._postUpdatedGraphics = a.postUpdatedGraphics;
                            this._preUpdatedGraphicsGeometries = [];
                            this._preUpdatedGraphicsAttributes = [];
                            this._postUpdatedGraphicsGeometries = [];
                            this._postUpdatedGraphicsAttributes = [];
                            var b;
                            for (b = 0; b < a.preUpdatedGraphics.length; b++) this._preUpdatedGraphicsGeometries.push(a.preUpdatedGraphics[b].geometry.toJson()),
                                this._preUpdatedGraphicsAttributes.push(a.preUpdatedGraphics[b].attributes);
                            for (b = 0; b < a.postUpdatedGraphics.length; b++) this._postUpdatedGraphicsGeometries.push(a.postUpdatedGraphics[b].geometry.toJson()), this._postUpdatedGraphicsAttributes.push(k.clone(a.postUpdatedGraphics[b].attributes))
                        },
                        updateObjectIds: function(a, b) {
                            this.updateIds(this._featureLayer, this._preUpdatedGraphicsAttributes, a, b);
                            this.updateIds(this._featureLayer, this._postUpdatedGraphicsAttributes, a, b);
                            this.updateIds(this._featureLayer,
                                this._deletedGraphics, a, b)
                        },
                        performUndo: function() {
                            var a;
                            for (a = 0; a < this._postUpdatedGraphics.length; a++) this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._preUpdatedGraphicsGeometries[a])), this._postUpdatedGraphics[a].setAttributes(this._preUpdatedGraphicsAttributes[a]);
                            var d = p.map(this._deletedGraphics, function(a) {
                                return a.attributes[this._featureLayer.objectIdField]
                            }, this);
                            return this._featureLayer.applyEdits(this._deletedGraphics, this._postUpdatedGraphics, null).then(k.hitch(this, function(a,
                                c, b) {
                                a = p.map(a, function(a) {
                                    return a.objectId
                                });
                                return {
                                    oldIds: d,
                                    addedIds: a,
                                    layer: this._featureLayer,
                                    operation: this
                                }
                            }))
                        },
                        performRedo: function() {
                            var a;
                            for (a = 0; a < this._postUpdatedGraphics.length; a++) this._postUpdatedGraphics[a].setGeometry(b.fromJson(this._postUpdatedGraphicsGeometries[a])), this._postUpdatedGraphics[a].setAttributes(this._postUpdatedGraphicsAttributes[a]);
                            return this._featureLayer.applyEdits(null, this._postUpdatedGraphics, this._deletedGraphics).then(k.hitch(this, function() {
                                return {
                                    layer: this._featureLayer,
                                    operation: this
                                }
                            }))
                        }
                    })
                })
        },
        "esri/dijit/editing/toolbars/Drawing": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/has dijit/_CssStateMixin ../Util ./ToolbarBase ../tools/ButtonToolBase ../tools/Cut ../tools/Union ../tools/Reshape ../tools/Editing ../tools/EditingTools ../tools/Selection ../tools/SelectionTools ../../../kernel".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h) {
                return p([a, b], {
                    declaredClass: "esri.dijit.editing.toolbars.Drawing",
                    onShowAttributeInspector: function() {},
                    _activateTool: function(a, c) {
                        this._settings.editor._activeTool = a;
                        "EDITING" !== a && this._settings.templatePicker.clearSelection();
                        "ATTRIBUTES" !== a && this._settings.editor._hideAttributeInspector();
                        "CLEAR" !== a && this.inherited(arguments)
                    },
                    _initializeToolbar: function() {
                        k.forEach(this._settings.layers, function(a) {
                            this._tbConnects.push(f.connect(a, "onSelectionComplete", this, "_updateUI"))
                        }, this)
                    },
                    activateEditing: function(a, c) {
                        this._tools.EDITING._activateTool(a, c.geometryType);
                        this._activeTool = this._tools.EDITING;
                        this._activeTool.setChecked(!0)
                    },
                    _updateUI: function() {
                        this._settings.undoManager && (this._tools.UNDO.set("disabled", !1 === this._settings.undoManager.canUndo), this._tools.REDO.set("disabled", !1 === this._settings.undoManager.canRedo));
                        this._selectedFeatures = e.getSelection(this._settings.layers);
                        var a = this._selectedFeatures.length;
                        this._tools.DELETE && this._tools.DELETE.set("disabled", 0 >= a);
                        this._tools.CLEAR && this._tools.CLEAR.set("disabled", 0 >= a);
                        this._tools.ATTRIBUTES && this._tools.ATTRIBUTES.set("disabled",
                            0 >= a);
                        this._tools.UNION && this._tools.UNION.set("disabled", 2 > a)
                    },
                    _toolFinished: function(a) {
                        if ("ATTRIBUTES" === a && this._selectedFeatures && this._selectedFeatures.length) this.onShowAttributeInspector(this._selectedFeatures[0]);
                        if ("SELECT" === a || "CUT" === a || "RESHAPING" === a || "EDITING" === a) this._activeTool.deactivate(), this._activeTool.setChecked(!1), this._activeTool = null;
                        if ("DELETE" === a) this.onDelete();
                        this._settings.editor._activeTool = null;
                        this._updateUI()
                    },
                    _createTools: function() {
                        this._tools.SELECT = new q({
                            settings: this._settings,
                            onClick: m.hitch(this, "_activateTool", "SELECT", !0),
                            onFinished: m.hitch(this, "_toolFinished", "SELECT")
                        });
                        this.addChild(this._tools.SELECT);
                        this._tools.CLEAR = new n(m.mixin(w.selectClear, {
                            settings: this._settings,
                            onClick: m.hitch(this._settings.editor, "_clearSelection", !1)
                        }));
                        this.addChild(this._tools.CLEAR);
                        this._createSeparator();
                        this._tools.ATTRIBUTES = new n(m.mixin(u.attributes, {
                            settings: this._settings,
                            onClick: m.hitch(this, "_toolFinished", "ATTRIBUTES")
                        }));
                        this.addChild(this._tools.ATTRIBUTES);
                        this._createSeparator();
                        this._tools.EDITING = new t({
                            settings: this._settings,
                            onClick: m.hitch(this, "_activateTool", "EDITING", !0),
                            onApplyEdits: m.hitch(this, "onApplyEdits"),
                            onFinished: m.hitch(this, "_toolFinished", "EDITING")
                        });
                        this.addChild(this._tools.EDITING);
                        this._tools.DELETE = new n(m.mixin(u.del, {
                            settings: this._settings,
                            onClick: m.hitch(this, "_toolFinished", "DELETE")
                        }));
                        this.addChild(this._tools.DELETE);
                        this._settings.toolbarOptions && ((this._settings.toolbarOptions.cutVisible || this._settings.toolbarOptions.mergeVisible || this._settings.toolbarOptions.reshapeVisible) &&
                            this._createSeparator(), this._settings.toolbarOptions.cutVisible && (this._tools.CUT = new l({
                                settings: this._settings,
                                onFinished: m.hitch(this, "_toolFinished", "CUT"),
                                onClick: m.hitch(this, "_activateTool", "CUT", !0),
                                onApplyEdits: m.hitch(this, "onApplyEdits")
                            }), this.addChild(this._tools.CUT)), this._settings.toolbarOptions.mergeVisible && (this._tools.UNION = new c({
                                settings: this._settings,
                                onFinished: m.hitch(this, "_toolFinished", "UNION"),
                                onApplyEdits: m.hitch(this, "onApplyEdits")
                            }), this.addChild(this._tools.UNION)),
                            this._settings.toolbarOptions.reshapeVisible && (this._tools.RESHAPING = new s({
                                settings: this._settings,
                                onClick: m.hitch(this, "_activateTool", "RESHAPING", !0),
                                onFinished: m.hitch(this, "_toolFinished", "RESHAPING"),
                                onApplyEdits: m.hitch(this, "onApplyEdits")
                            }), this.addChild(this._tools.RESHAPING)));
                        this._settings.enableUndoRedo && (this._createSeparator(), this._tools.UNDO = new n(m.mixin(u.undo, {
                            settings: this._settings,
                            disabled: !0,
                            onClick: m.hitch(this, function() {
                                this._tools.UNDO.set("disabled", !0);
                                this._tools.REDO.set("disabled", !0);
                                this._settings.editor._undo()
                            })
                        })), this.addChild(this._tools.UNDO), this._tools.REDO = new n(m.mixin(u.redo, {
                            settings: this._settings,
                            disabled: !0,
                            onClick: m.hitch(this, function() {
                                this._tools.UNDO.set("disabled", !0);
                                this._tools.REDO.set("disabled", !0);
                                this._settings.editor._redo()
                            })
                        })), this.addChild(this._tools.REDO))
                    }
                })
            })
        },
        "esri/dijit/editing/toolbars/ToolbarBase": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/has dijit/Toolbar dijit/ToolbarSeparator ../../../kernel ../../../lang".split(" "),
                function(p, m, k, f, d, b, e, a, n) {
                    return p([b], {
                        declaredClass: "esri.dijit.editing.toolbars.ToolbarBase",
                        _enabled: !0,
                        graphicsAdded: function() {},
                        drawEnd: function() {},
                        onApplyEdits: function() {},
                        onDelete: function() {},
                        constructor: function(a, c) {
                            a && a.settings && (this._tools = [], this._tbConnects = [], this._initialize(a.settings))
                        },
                        postCreate: function() {
                            this._createTools();
                            this.deactivate()
                        },
                        destroy: function() {
                            var a, c = this._tools;
                            for (a in c) c.hasOwnProperty(a) && n.isDefined(this._tools[a]) && this._tools[a].destroy();
                            k.forEach(this._tbConnects,
                                f.disconnect);
                            this.inherited(arguments)
                        },
                        activate: function(a) {
                            this._enabled = !0
                        },
                        deactivate: function() {
                            var a;
                            this._enabled = !1;
                            this._geometryType = this._layer = null;
                            var c = this._tools;
                            for (a in c) c.hasOwnProperty(a) && (this._tools[a].deactivate(), this._tools[a].setChecked(!1))
                        },
                        isEnabled: function() {
                            return this._enabled
                        },
                        setActiveSymbol: function(a) {
                            this._activeSymbol = a
                        },
                        _getSymbol: function() {},
                        _createTools: function() {},
                        _initialize: function(a) {
                            this._settings = a;
                            this._toolbar = a.drawToolbar;
                            this._editToolbar =
                                a.editToolbar;
                            this._initializeToolbar()
                        },
                        _activateTool: function(a, c) {
                            this._activeTool && this._activeTool.deactivate();
                            !0 === c && this._activeTool == this._tools[a] ? (this._activeTool.setChecked(!1), this._activeTool = null) : (this._activeTool = this._tools[a], this._activeTool.setChecked(!0), this._activeTool.activate(null))
                        },
                        _createSeparator: function() {
                            this.addChild(new e)
                        }
                    })
                })
        },
        "esri/dijit/editing/tools/ButtonToolBase": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/has dijit/form/Button ./ToolBase ../../../kernel".split(" "),
                function(p, m, k, f, d, b) {
                    return p([f, d], {
                        declaredClass: "esri.dijit.editing.tools.ButtonToolBase",
                        postCreate: function() {
                            this.inherited(arguments);
                            this._setShowLabelAttr && this._setShowLabelAttr(!1)
                        },
                        destroy: function() {
                            f.prototype.destroy.apply(this, arguments);
                            d.prototype.destroy.apply(this, arguments)
                        }
                    })
                })
        },
        "esri/dijit/editing/tools/ToolBase": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../../../kernel", "dojo/i18n!../../../nls/jsapi"], function(p, m, k, f, d) {
                return p(null, {
                    declaredClass: "esri.dijit.editing.tools.ToolBase",
                    _enabled: !0,
                    showLabel: !1,
                    constructor: function(b, e) {
                        b = b || {};
                        m.mixin(this, b);
                        this.label = this._label ? d.widgets.editor.tools[this._label] : "";
                        this._settings = b.settings;
                        this._toolbar = b.settings.drawToolbar;
                        this._editToolbar = b.settings.editToolbar;
                        this._initializeTool()
                    },
                    onFinished: function() {},
                    onDrawEnd: function() {},
                    onApplyEdits: function() {},
                    postCreate: function() {
                        this.deactivate();
                        this.inherited(arguments)
                    },
                    destroy: function() {},
                    activate: function(b) {
                        this._toolbar && this._toolbar.deactivate();
                        this._editToolbar &&
                            this._editToolbar.deactivate();
                        this._enabled && (this._checked = !0, this._layer = b, this._toolbar && this._drawType && this._toolbar.activate(this._drawType))
                    },
                    deactivate: function() {
                        this._toolbar && this._toolbar.deactivate();
                        this._editToolbar && this._editToolbar.deactivate();
                        this.setChecked(!1);
                        this._updateUI()
                    },
                    setEnabled: function(b) {
                        this._enabled = b;
                        this._updateUI()
                    },
                    setChecked: function(b) {
                        this._checked = b
                    },
                    enable: function(b) {
                        this._updateUI()
                    },
                    isEnabled: function() {
                        return this._enabled
                    },
                    getToolName: function() {
                        return this._toolName
                    },
                    _initializeTool: function() {},
                    _updateUI: function() {
                        this.disabled = !this._enabled;
                        this.attr("iconClass", this._enabled ? this._enabledIcon : this._disabledIcon)
                    }
                })
            })
        },
        "esri/dijit/editing/tools/Cut": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/has dojo/DeferredList ../../../graphicsUtils ../../../graphic ../../../tasks/query ../../../layers/FeatureLayer ../../../toolbars/draw ../Cut ./ToggleToolBase ../../../kernel".split(" "), function(p, m, k, f, d, b, e, a, n, l,
                c, s, t, u) {
                return p([t], {
                    declaredClass: "esri.dijit.editing.tools.Cut",
                    id: "btnFeatureCut",
                    _enabledIcon: "toolbarIcon cutIcon",
                    _disabledIcon: "toolbarIcon cutIcon",
                    _drawType: c.POLYLINE,
                    _enabled: !0,
                    _label: "NLS_cutLbl",
                    _cutConnects: [],
                    activate: function() {
                        this._cutConnects.push(f.connect(this._toolbar, "onDrawEnd", this, "_onDrawEnd"));
                        this.inherited(arguments)
                    },
                    deactivate: function() {
                        this.inherited(arguments);
                        k.forEach(this._cutConnects, f.disconnect);
                        this._cutConnects = [];
                        this._edits = []
                    },
                    _onDrawEnd: function(a) {
                        var c =
                            this._cutLayers = k.filter(this._settings.layers, function(a) {
                                return "esriGeometryPolygon" === a.geometryType || "esriGeometryPolyline" === a.geometryType && a.visible && a._isMapAtVisibleScale()
                            });
                        this._cutConnects = this._cutConnects.concat(k.map(c, m.hitch(this, function(a) {
                            return f.connect(a, "onEditsComplete", m.hitch(this, function(a, c, b) {
                                if (this._settings.undoRedoManager) {
                                    var d = this._settings.undoRedoManager;
                                    k.forEach(this._edits, m.hitch(this, function(a) {
                                        d.add(new s({
                                            featureLayer: a.layer,
                                            addedGraphics: a.adds,
                                            preUpdatedGraphics: a.preUpdates,
                                            postUpdatedGraphics: a.updates
                                        }))
                                    }), this)
                                }
                                this.onFinished()
                            }))
                        })));
                        var b = new n;
                        b.geometry = a;
                        k.forEach(c, function(a, c) {
                            this._settings.editor._selectionHelper.selectFeatures([a], b, l.SELECTION_NEW, m.hitch(this, "_cutFeatures", a, b))
                        }, this)
                    },
                    _cutFeatures: function(a, c, d) {
                        if (d && d.length) {
                            this._edits = [];
                            var l = [];
                            l.push(this._settings.geometryService.cut(e.getGeometries(d), c.geometry, m.hitch(this, "_cutHandler", a, d)));
                            (new b(l)).addCallback(m.hitch(this, function() {
                                this.onApplyEdits(this._edits)
                            }))
                        }
                    },
                    _cutHandler: function(c,
                        b, d) {
                        var e = [],
                            l = [],
                            g = k.map(b, function(c) {
                                return new a(m.clone(c.toJson()))
                            }),
                            f, n;
                        k.forEach(d.cutIndexes, function(c, g) {
                            f != c ? (f = c, l.push(b[c].setGeometry(d.geometries[g]))) : (n = new a(d.geometries[g], null, m.mixin({}, b[c].attributes), null), n.attributes[b[0].getLayer().objectIdField] = null, e.push(n))
                        }, this);
                        this._edits.push({
                            layer: c,
                            adds: e,
                            updates: l,
                            preUpdates: g
                        })
                    }
                })
            })
        },
        "esri/dijit/editing/tools/ToggleToolBase": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/has dijit/form/ToggleButton ./ToolBase ../../../kernel".split(" "),
                function(p, m, k, f, d, b) {
                    return p([f, d], {
                        declaredClass: "esri.dijit.editing.tools.ToggleToolBase",
                        postCreate: function() {
                            this.inherited(arguments);
                            this._setShowLabelAttr && this._setShowLabelAttr(!1)
                        },
                        destroy: function() {
                            f.prototype.destroy.apply(this, arguments);
                            d.prototype.destroy.apply(this, arguments)
                        },
                        setChecked: function(b) {
                            f.prototype.setChecked.apply(this, arguments)
                        }
                    })
                })
        },
        "esri/dijit/editing/tools/Union": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../../../graphicsUtils ../../../graphic ../../../toolbars/draw ../Union ./ButtonToolBase ../../../kernel".split(" "),
                function(p, m, k, f, d, b, e, a, n, l) {
                    return p([n], {
                        declaredClass: "esri.dijit.editing.tools.Union",
                        id: "btnFeatureUnion",
                        _enabledIcon: "toolbarIcon unionIcon",
                        _disabledIcon: "toolbarIcon unionIcon",
                        _drawType: e.POLYLINE,
                        _enabled: !0,
                        _label: "NLS_unionLbl",
                        _onClick: function(c) {
                            this._settings.editor._activeTool = "UNION";
                            c = k.filter(this._settings.layers, function(a) {
                                return "esriGeometryPolygon" === a.geometryType && a.visible && a._isMapAtVisibleScale()
                            });
                            var e = [],
                                l = 0;
                            k.forEach(c, function(c, f) {
                                var n = c.getSelectedFeatures();
                                2 <= n.length && (l++, this._settings.geometryService.union(d.getGeometries(n), m.hitch(this, function(d) {
                                    var f = n.shift(),
                                        q = [],
                                        g = [];
                                    q.push(new b(f.toJson()));
                                    g.push(f.setGeometry(d));
                                    e.push({
                                        layer: c,
                                        updates: g,
                                        deletes: n,
                                        preUpdates: q
                                    });
                                    l--;
                                    if (0 >= l) this.onApplyEdits(e, m.hitch(this, function() {
                                        if (this._settings.undoRedoManager) {
                                            var c = this._settings.undoRedoManager;
                                            k.forEach(this._edits, m.hitch(this, function(b) {
                                                    c.add(new a({
                                                        featureLayer: b.layer,
                                                        deletedGraphics: b.deletes,
                                                        preUpdatedGraphics: b.preUpdates,
                                                        postUpdatedGraphics: b.updates
                                                    }))
                                                }),
                                                this)
                                        }
                                        this._settings.editor._selectionHelper.clearSelection(!1);
                                        this.onFinished()
                                    }))
                                })))
                            }, this)
                        }
                    })
                })
        },
        "esri/dijit/editing/tools/Reshape": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/has ../../../graphic ../../../layers/FeatureLayer ../../../tasks/query ../../../toolbars/draw ./ToggleToolBase ../../../kernel".split(" "), function(p, m, k, f, d, b, e, a, n, l, c) {
                return p([l], {
                    declaredClass: "esri.dijit.editing.tools.Reshape",
                    id: "btnFeatureReshape",
                    _enabledIcon: "toolbarIcon reshapeIcon",
                    _disabledIcon: "toolbarIcon reshapeIcon",
                    _drawType: n.POLYLINE,
                    _enabled: !0,
                    _label: "NLS_reshapeLbl",
                    activate: function() {
                        f.disconnect(this._rConnect);
                        this._rConnect = f.connect(this._toolbar, "onDrawEnd", this, "_onDrawEnd");
                        this.inherited(arguments)
                    },
                    deactivate: function() {
                        this.inherited(arguments);
                        f.disconnect(this._rConnect);
                        delete this._rConnect
                    },
                    _onDrawEnd: function(c) {
                        var b = this._settings.layers,
                            d = new a;
                        d.geometry = c;
                        c = this._reshapeLayers = k.filter(b, function(a) {
                            return "esriGeometryPolygon" === a.geometryType ||
                                "esriGeometryPolyline"
                        });
                        this._settings.editor._selectionHelper.selectFeatures(c, d, e.SELECTION_NEW, m.hitch(this, "_reshape", d))
                    },
                    _reshape: function(a, c) {
                        if (1 === c.length) {
                            var d = [],
                                e = [],
                                l = [],
                                h = c[0],
                                f = h.getLayer();
                            this._settings.geometryService.reshape(h.geometry, a.geometry, m.hitch(this, function(a) {
                                "polyline" === a.type && a.paths && 0 === a.paths.length ? (this._settings.editor._selectionHelper.clearSelection(!1), this.onFinished()) : "polygon" === a.type && a.rings && 0 === a.rings.length ? (this._settings.editor._selectionHelper.clearSelection(!1),
                                    this.onFinished()) : (l.push(new b(h.toJson())), e.push(h.setGeometry(a)), d.push({
                                    layer: f,
                                    updates: e,
                                    preUpdates: l
                                }), this.onApplyEdits(d, m.hitch(this, function() {
                                    this._settings.editor._selectionHelper.clearSelection(!1);
                                    this.onFinished()
                                })))
                            }))
                        }
                    }
                })
            })
        },
        "esri/dijit/editing/tools/Editing": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../../../layers/FeatureTemplate ./Edit ./EditingTools ./DropDownToolBase ../../../kernel ../../../lang".split(" "), function(p, m, k, f, d, b, e, a,
                n, l) {
                return p([a], {
                    declaredClass: "esri.dijit.editing.tools.Editing",
                    _enabled: !1,
                    deactivate: function() {
                        this._enabled && (this._enabled = !1, this.inherited(arguments), this._settings.templatePicker.clearSelection())
                    },
                    onItemClicked: function(a, b) {
                        this.inherited(arguments);
                        this._activeTool === this._tools.AUTOCOMPLETE && (this._settings.editor._drawingTool = d.TOOL_AUTO_COMPLETE_POLYGON)
                    },
                    _activateTool: function(a, b) {
                        var d;
                        this.enable(b);
                        for (d in this._tools) this._tools.hasOwnProperty(d) && (this.dropDown.removeChild(this._tools[d]), !0 === this._tools[d]._enabled && this.dropDown.addChild(this._tools[d]));
                        if (this._geometryType !== b || !1 === this._activeTool._enabled) this._activeTool = this._tools[a.toUpperCase()];
                        this._geometryType = b;
                        this._activeTool.activate();
                        this._activeTool.setChecked(!0);
                        this._updateUI()
                    },
                    _initializeTool: function(a) {
                        this.inherited(arguments);
                        this._initializeTools()
                    },
                    _initializeTools: function() {
                        var a = this._settings.layers,
                            b = this._settings.editor,
                            d = !1,
                            e = !1,
                            l = !1,
                            f = this._toolTypes = [],
                            h;
                        k.forEach(a, function(a) {
                            h = a.geometryType;
                            d = d || "esriGeometryPoint" === h;
                            e = e || "esriGeometryPolyline" === h;
                            l = l || "esriGeometryPolygon" === h;
                            f = f.concat(k.map(this._getTemplatesFromLayer(a), m.hitch(this, function(c) {
                                return b._toDrawTool(c.drawingTool, a)
                            })))
                        }, this);
                        a = this._settings.createOptions;
                        d && this._toolTypes.push("point");
                        e && (this._toolTypes = this._toolTypes.concat(a.polylineDrawTools));
                        l && (this._toolTypes = this._toolTypes.concat(a.polygonDrawTools));
                        this._toolTypes = this._toUnique(this._toolTypes.concat(f))
                    },
                    _toUnique: function(a) {
                        var b = {};
                        return k.filter(a,
                            function(a) {
                                return b[a] ? !1 : b[a] = !0
                            })
                    },
                    _getTemplatesFromLayer: function(a) {
                        var b = a.templates || [];
                        k.forEach(a.types, function(a) {
                            b = b.concat(a.templates)
                        });
                        return k.filter(b, l.isDefined)
                    },
                    _createTools: function() {
                        k.forEach(this._toolTypes, this._createTool, this);
                        this.inherited(arguments)
                    },
                    _createTool: function(a) {
                        var d = m.mixin(e[a], {
                            settings: this._settings,
                            onClick: m.hitch(this, "onItemClicked", e[a].id)
                        });
                        this._tools[a.toUpperCase()] = new b(d)
                    }
                })
            })
        },
        "esri/dijit/editing/tools/Edit": function() {
            define(["dojo/_base/declare",
                "dojo/_base/lang", "dojo/has", "./MenuItemBase", "../../../kernel"
            ], function(p, m, k, f, d) {
                return p([f], {
                    declaredClass: "esri.dijit.editing.tools.Edit",
                    enable: function(b) {
                        this._enabled = b === this._geomType;
                        this.inherited(arguments)
                    }
                })
            })
        },
        "esri/dijit/editing/tools/MenuItemBase": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/has dijit/MenuItem ./ToolBase ../../../kernel".split(" "), function(p, m, k, f, d, b) {
                return p([f, d], {
                    declaredClass: "esri.dijit.editing.tools.MenuItemBase",
                    destroy: function() {
                        f.prototype.destroy.apply(this,
                            arguments);
                        d.prototype.destroy.apply(this, arguments)
                    }
                })
            })
        },
        "esri/dijit/editing/tools/EditingTools": function() {
            define(["dojo/_base/lang", "dojo/has", "../../../toolbars/draw", "../../../kernel"], function(p, m, k, f) {
                return {
                    point: {
                        id: "esriPointTool",
                        _enabledIcon: "toolbarIcon pointIcon",
                        _disabledIcon: "toolbarIcon pointIconDisabled",
                        _drawType: k.POINT,
                        _geomType: "esriGeometryPoint",
                        _label: "NLS_pointLbl"
                    },
                    polyline: {
                        id: "toolDrawFreehandPolyline",
                        _enabledIcon: "toolbarIcon polylineIcon",
                        _disabledIcon: "toolbarIcon polylineIconDisabled",
                        _drawType: k.POLYLINE,
                        _geomType: "esriGeometryPolyline",
                        _label: "NLS_polylineLbl"
                    },
                    freehandpolyline: {
                        id: "toolDrawPolyline",
                        _enabledIcon: "toolbarIcon freehandPolylineIcon",
                        _disabledIcon: "toolbarIcon freehandPolylineIcon",
                        _drawType: k.FREEHAND_POLYLINE,
                        _geomType: "esriGeometryPolyline",
                        _label: "NLS_freehandPolylineLbl"
                    },
                    polygon: {
                        id: "toolDrawPolygon",
                        _enabledIcon: "toolbarIcon polygonIcon",
                        _disabledIcon: "toolbarIcon polygonIconDisabled",
                        _drawType: k.POLYGON,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_polygonLbl"
                    },
                    freehandpolygon: {
                        id: "toolDrawFreehandPolygon",
                        _enabledIcon: "toolbarIcon freehandPolygonIcon",
                        _disabledIcon: "toolbarIcon freehandPolygonIconDisabled",
                        _drawType: k.FREEHAND_POLYGON,
                        _label: "NLS_freehandPolygonLbl",
                        _geomType: "esriGeometryPolygon"
                    },
                    autocomplete: {
                        id: "btnFeatureAutoComplete",
                        _enabledIcon: "toolbarIcon autoCompleteIcon",
                        _disabledIcon: "toolbarIcon autoCompleteIcon",
                        _drawType: k.POLYGON,
                        _label: "NLS_autoCompleteLbl",
                        _geomType: "esriGeometryPolygon"
                    },
                    rectangle: {
                        id: "toolDrawRect",
                        _enabledIcon: "toolbarIcon rectangleIcon",
                        _disabledIcon: "toolbarIcon rectangleIcon",
                        _drawType: k.RECTANGLE,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_rectangleLbl"
                    },
                    arrow: {
                        id: "toolDrawArrow",
                        _enabledIcon: "toolbarIcon arrowIcon",
                        _disabledIcon: "toolbarIcon arrowIcon",
                        _drawType: k.ARROW,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_arrowLbl"
                    },
                    uparrow: {
                        id: "toolDrawArrowUp",
                        _enabledIcon: "toolbarIcon arrowUpIcon",
                        _disabledIcon: "toolbarIcon arrowUpIcon",
                        _drawType: k.UP_ARROW,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_arrowUpLbl"
                    },
                    downarrow: {
                        id: "toolDrawDownArrow",
                        _enabledIcon: "toolbarIcon arrowDownIcon",
                        _disabledIcon: "toolbarIcon arrowDownIcon",
                        _drawType: k.DOWN_ARROW,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_arrowDownLbl"
                    },
                    leftarrow: {
                        id: "toolDrawLeftArrow",
                        _enabledIcon: "toolbarIcon arrowLeftIcon",
                        _disabledIcon: "toolbarIcon arrowLeftIcon",
                        _drawType: k.LEFT_ARROW,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_arrowLeftLbl"
                    },
                    rightarrow: {
                        id: "toolDrawRightArrow",
                        _enabledIcon: "toolbarIcon arrowIcon",
                        _disabledIcon: "toolbarIcon arrowIcon",
                        _drawType: k.RIGHT_ARROW,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_arrowRightLbl"
                    },
                    circle: {
                        id: "toolDrawCircle",
                        _enabledIcon: "toolbarIcon circleIcon",
                        _disabledIcon: "toolbarIcon circleIcon",
                        _drawType: k.CIRCLE,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_circleLbl"
                    },
                    ellipse: {
                        id: "toolDrawEllipse",
                        _enabledIcon: "toolbarIcon ellipseIcon",
                        _disabledIcon: "toolbarIcon ellipseIcon",
                        _drawType: k.ELLIPSE,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_ellipseLbl"
                    },
                    triangle: {
                        id: "toolDrawTriangle",
                        _enabledIcon: "toolbarIcon triangleIcon",
                        _disabledIcon: "toolbarIcon triangleIcon",
                        _drawType: k.TRIANGLE,
                        _geomType: "esriGeometryPolygon",
                        _label: "NLS_triangleLbl"
                    },
                    attributes: {
                        id: "btnAttributes",
                        _enabledIcon: "toolbarIcon attributesIcon",
                        _disabledIcon: "toolbarIcon attributesIcon",
                        _enabled: !1,
                        _label: "NLS_attributesLbl"
                    },
                    del: {
                        id: "btnDelete2",
                        _enabledIcon: "toolbarIcon deleteFeatureIcon",
                        _disabledIcon: "toolbarIcon deleteFeatureIcon",
                        _enabled: !1,
                        _label: "NLS_deleteLbl"
                    },
                    undo: {
                        id: "btnUndo",
                        _enabledIcon: "dijitEditorIcon dijitEditorIconUndo",
                        _disabledIcon: "dijitEditorIcon dijitEditorIconUndo",
                        _enabled: !1,
                        _label: "NLS_undoLbl"
                    },
                    redo: {
                        id: "btnRedo",
                        _enabledIcon: "dijitEditorIcon dijitEditorIconRedo",
                        _disabledIcon: "dijitEditorIcon dijitEditorIconRedo",
                        _enabled: !1,
                        _label: "NLS_redoLbl"
                    }
                }
            })
        },
        "esri/dijit/editing/tools/DropDownToolBase": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/has dojo/dom-style dijit/registry dijit/Menu dijit/form/ComboButton ./ToolBase ../../../kernel ../../../lang".split(" "), function(p, m, k, f, d, b, e, a, n, l) {
                return p([e, a], {
                    declaredClass: "esri.dijit.editing.tools.DropDownToolBase",
                    _enabled: !1,
                    _checked: !1,
                    postCreate: function() {
                        this._tools = [];
                        this._createTools();
                        this.inherited(arguments);
                        this._setShowLabelAttr && this._setShowLabelAttr(!1)
                    },
                    destroy: function() {
                        var a, b = this._tools;
                        for (a in b) b.hasOwnProperty(a) && l.isDefined(b[a]) && b[a].destroy();
                        this.inherited(arguments)
                    },
                    _createTools: function() {
                        var a, d = new b;
                        this.dropDown = d;
                        for (a in this._tools) this._tools.hasOwnProperty(a) && d.addChild(this._tools[a]);
                        this._activeTool = d.getChildren()[0];
                        this._updateUI()
                    },
                    activate: function(a) {
                        this.inherited(arguments);
                        this._activeTool ? this._activeTool.activate() : this._activateDefaultTool()
                    },
                    deactivate: function() {
                        this.inherited(arguments);
                        this._activeTool && this._activeTool.deactivate()
                    },
                    enable: function(a) {
                        for (var b in this._tools) this._tools.hasOwnProperty(b) && this._tools[b].enable(a);
                        this.setEnabled(!0);
                        this.inherited(arguments)
                    },
                    setChecked: function(a) {
                        this._checked = a;
                        this._updateUI()
                    },
                    _onDrawEnd: function(a) {},
                    onLayerChange: function(a, b, d) {
                        this._activeTool = null;
                        this._activeType = b;
                        this._activeTemplate = d;
                        this._activeLayer =
                            a
                    },
                    onItemClicked: function(a, b) {
                        this._activeTool && this._activeTool.deactivate();
                        this._activeTool = d.byId(a);
                        !1 === this._checked ? this._onClick() : (this._updateUI(), this._activeTool && (this._activeTool.activate(), this._activeTool.setChecked(!0)))
                    },
                    _onClick: function(a) {
                        !1 !== this._enabled && (this._checked = !this._checked, this.inherited(arguments))
                    },
                    _updateUI: function() {
                        this.attr("disabled", !this._enabled);
                        f.set(this.focusNode, {
                            outline: "none"
                        });
                        f.set(this.titleNode, {
                            padding: "0px",
                            border: "none"
                        });
                        this._checked ?
                            f.set(this.titleNode, {
                                backgroundColor: "#D4DFF2",
                                border: "1px solid #316AC5"
                            }) : f.set(this.titleNode, {
                                backgroundColor: "",
                                border: ""
                            });
                        this._activeTool && (this.attr("iconClass", this._checked ? this._activeTool._enabledIcon : this._activeTool._disabledIcon), this.attr("label", this._activeTool.label))
                    }
                })
            })
        },
        "esri/dijit/editing/tools/Selection": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/has ../../../symbols/SimpleMarkerSymbol ../../../symbols/SimpleLineSymbol ../../../symbols/SimpleFillSymbol ./Edit ./SelectionTools ./DropDownToolBase ../../../kernel".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t) {
                    return p([s], {
                        declaredClass: "esri.dijit.editing.tools.Selection",
                        _enabled: !0,
                        activate: function() {
                            this.inherited(arguments);
                            this._sConnect = f.connect(this._toolbar, "onDrawEnd", this, "_onDrawEnd")
                        },
                        deactivate: function() {
                            this.inherited(arguments);
                            f.disconnect(this._sConnect);
                            delete this._sConnect
                        },
                        _initializeTool: function() {
                            this._createSymbols();
                            this._initializeLayers();
                            this._toolTypes = ["select", "selectadd", "selectremove"]
                        },
                        _onDrawEnd: function(a) {
                            this.inherited(arguments);
                            this._settings.editor._hideAttributeInspector();
                            var c = this._settings.layers;
                            this._selectMethod = this._activeTool._selectMethod;
                            this._settings.editor._selectionHelper.selectFeaturesByGeometry(c, a, this._selectMethod, m.hitch(this, "onFinished"))
                        },
                        _createSymbols: function() {
                            this._pointSelectionSymbol = new e(e.STYLE_CIRCLE, 10, new a(a.STYLE_SOLID, new d([0, 0, 0]), 1), new d([255, 0, 0, 0.5]));
                            this._polylineSelectionSymbol = new a(a.STYLE_SOLID, new d([0, 200, 255]), 2);
                            this._polygonSelectionSymbol = new n(n.STYLE_SOLID, new a(a.STYLE_SOLID,
                                new d([0, 0, 0]), 1), new d([0, 200, 255, 0.5]))
                        },
                        _initializeLayers: function() {
                            k.forEach(this._settings.layers, this._setSelectionSymbol, this)
                        },
                        _setSelectionSymbol: function(a) {
                            var c = null;
                            switch (a.geometryType) {
                                case "esriGeometryPoint":
                                    c = this._pointSelectionSymbol;
                                    break;
                                case "esriGeometryPolyline":
                                    c = this._polylineSelectionSymbol;
                                    break;
                                case "esriGeometryPolygon":
                                    c = this._polygonSelectionSymbol
                            }
                            a.setSelectionSymbol(a._selectionSymbol || c)
                        },
                        _createTools: function() {
                            k.forEach(this._toolTypes, this._createTool, this);
                            this.inherited(arguments)
                        },
                        _createTool: function(a) {
                            var b = m.mixin(c[a], {
                                settings: this._settings,
                                onClick: m.hitch(this, "onItemClicked", c[a].id)
                            });
                            this._tools[a.toUpperCase()] = new l(b)
                        }
                    })
                })
        },
        "esri/dijit/editing/tools/SelectionTools": function() {
            define(["dojo/_base/lang", "dojo/has", "../../../layers/FeatureLayer", "../../../toolbars/draw", "../../../kernel"], function(p, m, k, f, d) {
                return {
                    select: {
                        id: "btnNewSelection",
                        _enabledIcon: "toolbarIcon newSelectionIcon",
                        _disabledIcon: "toolbarIcon newSelectionIcon",
                        _drawType: f.EXTENT,
                        _selectMethod: k.SELECTION_NEW,
                        _label: "NLS_selectionNewLbl"
                    },
                    selectadd: {
                        id: "btnAddToSelection",
                        _enabledIcon: "toolbarIcon addToSelectionIcon",
                        _disabledIcon: "toolbarIcon addToSelectionIcon",
                        _drawType: f.EXTENT,
                        _selectMethod: k.SELECTION_ADD,
                        _label: "NLS_selectionAddLbl"
                    },
                    selectremove: {
                        id: "btnSubtractFromSelection",
                        _enabledIcon: "toolbarIcon removeFromSelectionIcon",
                        _disabledIcon: "toolbarIcon removeFromSelectionIcon",
                        _drawType: f.EXTENT,
                        _selectMethod: k.SELECTION_SUBTRACT,
                        _label: "NLS_selectionRemoveLbl"
                    },
                    selectClear: {
                        id: "btnClearSelection",
                        _enabledIcon: "toolbarIcon clearSelectionIcon",
                        _disabledIcon: "toolbarIcon clearSelectionIcon",
                        _enabled: !1,
                        _label: "NLS_selectionClearLbl"
                    }
                }
            })
        },
        "esri/dijit/editing/SelectionHelper": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/has dojo/DeferredList ../../geometry/Extent ../../geometry/Point ../../geometry/ScreenPoint ../../layers/FeatureLayer ../../tasks/query ../../kernel".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s) {
                return p(null, {
                    declaredClass: "esri.dijit.editing.SelectionHelper",
                    constructor: function(a) {
                        this._settings = a || {};
                        this._sConnects = [];
                        this._mapServiceCount = 0;
                        this._map = this._settings.map;
                        this._tolerance = this._settings.singleSelectionTolerance;
                        this._initMapServiceInfos(this._settings.layers)
                    },
                    destroy: function() {
                        for (var a in this._sConnects) this._sConnects.hasOwnProperty(a) && k.disconnect(this._sConnects[a])
                    },
                    selectFeatures: function(a, c, d, e) {
                        d === l.SELECTION_NEW && (this._resetMapServiceInfos(), this.getSelection(a));
                        var h = [];
                        f.forEach(a, function(a) {
                            if (!0 === a.visible && !0 ===
                                a._isMapAtVisibleScale()) {
                                var b = d;
                                a._isSelOnly && b === l.SELECTION_NEW && (b = l.SELECTION_ADD);
                                h.push(a.selectFeatures(c, b))
                            }
                        });
                        (new b(h)).addCallback(m.hitch(this, function(c) {
                            var b = [];
                            f.forEach(c, function(c, d) {
                                f.forEach(c[1], function(c) {
                                    (c = a[d]._mode._getFeature(c.attributes[a[d].objectIdField]) || null) && b.push(c)
                                }, this)
                            }, this);
                            this._mapServiceCount ? ((c = d === l.SELECTION_SUBTRACT) ? (this._resetMapServiceInfos(), this._createLayerDefs(this._getLayerInfosFromSelection(a))) : this._createLayerDefs(this._getLayerInfosFromFeatures(b)),
                                this._updateLayerDefs(this._mapServiceInfos, !1, !(b && b.length || c), m.hitch(this, e, b))) : e(b)
                        }))
                    },
                    selectFeaturesByGeometry: function(b, d, e, l) {
                        var h = d; - 1 !== d.declaredClass.indexOf("Extent") && d.xmax === d.xmin && d.ymax === d.ymin && (h = new a(d.xmax, d.ymax, d.spatialReference));
                        h = -1 !== h.declaredClass.indexOf("Point") ? this._extentFromPoint(h) : h;
                        d = new c;
                        d.geometry = h;
                        this.selectFeatures(b, d, e, l)
                    },
                    clearSelection: function(a) {
                        f.forEach(this._nonSelOnlyLayers, function(a) {
                            a.clearSelection && a.clearSelection()
                        });
                        if (this._mapServiceCount) {
                            this._resetMapServiceInfos();
                            var c = this._getLayerInfosFromSelection(this._settings.layers);
                            f.some(c, function(a) {
                                return a.oids && a.oids.length
                            }) && (this._createLayerDefs(c), this._updateLayerDefs(this._mapServiceInfos, !0, a || !1))
                        }
                    },
                    findMapService: function(a) {
                        var c = this._map,
                            b = c.layerIds;
                        a = a && a._url && a._url.path ? a._url.path.toLowerCase() : "";
                        var d, e, l;
                        for (e in b)
                            if (b.hasOwnProperty(e) && (d = c.getLayer(b[e]), l = d._url ? d._url.path ? d._url.path.toLowerCase().replace("mapserver", "featureserver") : d._url.toLowerCase().replace("mapserver", "featureserver") :
                                    "", a.substr(0, l.length) === l && "esri.layers.ArcGISDynamicMapServiceLayer" === d.declaredClass)) return d
                    },
                    getSelection: function(a) {
                        var c = [];
                        f.forEach(a, function(a) {
                            a._isSelOnly && c.push(this._createLayerInfo(a))
                        }, this);
                        f.forEach(c, function(a) {
                            var c = this._createMapServiceInfo(this.findMapService(a.layer));
                            c && (c.layerInfos[a.layer.layerId] = a)
                        }, this)
                    },
                    _initMapServiceInfos: function(a) {
                        this._nonSelOnlyLayers = [];
                        this._mapServiceInfos = [];
                        f.forEach(a, function(a) {
                            var c = this.findMapService(a);
                            c ? (this._mapServiceCount++,
                                this._createMapServiceInfo(c), c && c.setDisableClientCaching(!0)) : this._nonSelOnlyLayers.push(a)
                        }, this)
                    },
                    _createMapServiceInfo: function(a) {
                        if (!a) return null;
                        var c = this._mapServiceInfos,
                            b = c[a.id];
                        b || (b = c[a.id] = {
                            mapService: a,
                            layerInfos: [],
                            layerDefs: m.mixin([], a.layerDefinitions || []),
                            origLayerDefs: m.mixin([], a.layerDefinitions || [])
                        });
                        return b
                    },
                    _resetMapServiceInfo: function(a) {
                        f.forEach(a.layerInfos, this._resetLayerInfo);
                        a.layerDefs = m.mixin([], a.origLayerDefs || [])
                    },
                    _resetMapServiceInfos: function() {
                        var a =
                            this._mapServiceInfos,
                            c;
                        for (c in a) a.hasOwnProperty(c) && this._resetMapServiceInfo(a[c])
                    },
                    _createLayerInfo: function(a, c) {
                        var b = a.objectIdField,
                            d = c ? [] : a.getSelectedFeatures();
                        return {
                            layer: a,
                            selectedFeatures: d || [],
                            oids: f.map(d, function(a) {
                                return a.attributes[b]
                            })
                        }
                    },
                    _resetLayerInfo: function(a) {
                        a && (a.selectedFeatures = [], a.oids = [])
                    },
                    _updateLayerDefs: function(a, c, b, d) {
                        for (var e in a)
                            if (a.hasOwnProperty(e)) {
                                var l = a[e],
                                    f = l.mapService,
                                    g = l.layerDefs = c ? m.mixin([], l.origLayerDefs || []) : l.layerDefs;
                                g ? (b ? d && d() :
                                    this._sConnects[f.id] = k.connect(f, "onUpdateEnd", m.hitch(this, "_onMapServiceUpdate", l, c, d)), f.setLayerDefinitions(g, b || !1)) : d && d()
                            }
                    },
                    _onMapServiceUpdate: function(a, b, d) {
                        k.disconnect(this._sConnects[a.mapService.id]);
                        f.forEach(a.layerInfos, function(a) {
                            if (b) a && a.layer.clearSelection();
                            else {
                                var d = new c;
                                d.objectIds = a ? a.oids : [];
                                d.objectIds.length && a.layer.selectFeatures(d, l.SELECTION_SUBTRACT)
                            }
                        }, this);
                        b && this._resetMapServiceInfo(a);
                        d && d()
                    },
                    _createLayerDefs: function(a) {
                        f.forEach(a, function(a) {
                            var c = a.layer,
                                b = this._createMapServiceInfo(this.findMapService(a.layer));
                            if (b) {
                                var b = b.layerDefs,
                                    d = c.layerId,
                                    e = '("' + c.objectIdField + '" NOT IN (',
                                    l = a.oids;
                                l && l.length && (f.forEach(a.oids, function(a, c) {
                                    l = !0;
                                    c && (e += ",");
                                    e += "'" + a + "'"
                                }), e += "))", b[d] = b.length && b[d] && b[d].length ? b[d] + (" AND" + e) : e)
                            }
                        }, this)
                    },
                    _getLayerInfosFromFeatures: function(a) {
                        var c = [];
                        f.forEach(a, function(a) {
                                var b = a.getLayer();
                                b && b._isSelOnly && (c[b.id] || (c[b.id] = this._createLayerInfo(b, !0)), c[b.id].selectedFeatures.push(a), c[b.id].oids.push(a.attributes[b.objectIdField]))
                            },
                            this);
                        a = [];
                        for (var b in c) c.hasOwnProperty(b) && a.push(c[b]);
                        return a
                    },
                    _getLayerInfosFromSelection: function(a) {
                        var c = [];
                        f.forEach(a, function(a) {
                            a._isSelOnly && c.push(this._createLayerInfo(a, !1))
                        }, this);
                        return c
                    },
                    _extentFromPoint: function(a) {
                        var c = this._tolerance,
                            b = this._map,
                            d = b.toScreen(a);
                        a = new n(d.x - c, d.y + c);
                        c = new n(d.x + c, d.y - c);
                        a = b.toMap(a);
                        c = b.toMap(c);
                        return new e(a.x, a.y, c.x, c.y, b.spatialReference)
                    }
                })
            })
        },
        "esri/dijit/editing/TemplatePicker": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/html dojo/_base/array dojo/_base/json dojo/_base/kernel dojo/has dojo/query dojo/sniff dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dijit/_Widget dijit/_Templated dojo/data/ItemFileReadStore dojox/grid/DataGrid dojox/gfx ../../layers/FeatureLayer ../../symbols/SimpleMarkerSymbol ../../symbols/PictureMarkerSymbol ../../symbols/SimpleFillSymbol ../../symbols/SimpleLineSymbol ./TemplatePickerItem ../../kernel ../../lang ../../request ../_EventedWidget dojo/i18n!../../nls/jsapi dojo/text!./templates/TemplatePicker.html".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E, A, D, G, F, C, K) {
                    var L = p([F, q, w], {
                        declaredClass: "esri.dijit.editing.TemplatePicker",
                        widgetsInTemplate: !0,
                        templateString: K,
                        featureLayers: null,
                        items: null,
                        grouping: !0,
                        showTooltip: !1,
                        maxLabelLength: 0,
                        rows: 4,
                        _rows: 0,
                        columns: 3,
                        surfaceWidth: 30,
                        surfaceHeight: 30,
                        emptyMessage: "",
                        useLegend: !0,
                        legendCache: {},
                        _uniqueId: {
                            id: 0
                        },
                        _assumedCellWidth: 90,
                        _initialAutoWidth: 300,
                        _initialAutoHeight: 200,
                        _ieTimer: 150,
                        constructor: function(a, c) {
                            a = a || {};
                            !a.items && !a.featureLayers &&
                                console.error("TemplatePicker: please provide 'featureLayers' or 'items' parameter in the constructor");
                            this._dojo14x = 4 <= e.version.minor;
                            this._itemWidgets = {};
                            a.featureLayers && a.featureLayers.length && (this._flChanged = 1);
                            this._nls = C.widgets.templatePicker;
                            this.emptyMessage = a.emptyMessage || this._nls && this._nls.creationDisabled || ""
                        },
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this._preprocess()
                        },
                        startup: function() {
                            this.inherited(arguments);
                            if ("auto" === this.rows && "auto" === this.columns) {
                                var c =
                                    t.getContentBox(this.domNode);
                                c.w || (this.domNode.style.width = this._initialAutoWidth + "px");
                                if (!c.h || 1 >= c.h) this.domNode.style.height = this._initialAutoHeight + "px";
                                c = t.getContentBox(this.domNode);
                                this._columns = Math.floor(c.w / this._assumedCellWidth) || 1
                            }
                            this._applyGridPatches();
                            this._setGridLayout();
                            k.connect(this.grid, "onRowClick", this, this._rowClicked);
                            this._setGridData();
                            this._toggleTooltip();
                            9 > a("ie") && (this._repaintItems = m.hitch(this, this._repaintItems), setTimeout(this._repaintItems, this._ieTimer))
                        },
                        destroy: function() {
                            this.showTooltip = !1;
                            this._toggleTooltip();
                            this._clearLegendInfo();
                            this.featureLayers = this.items = this.grid = this._flItems = this._itItems = this._groupRowIndices = this._selectedCell = this._selectedInfo = this._selectedItem = null;
                            this.inherited(arguments)
                        },
                        getSelected: function() {
                            return this._selectedCell ? this._selectedItem : null
                        },
                        clearSelection: function() {
                            var a = this._selectedCell,
                                c = this._selectedInfo;
                            a && this._rowClicked({
                                cellNode: a,
                                rowIndex: c.selRow,
                                cellIndex: c.selCol
                            })
                        },
                        update: function(c) {
                            c =
                                "auto" === this.rows && "auto" === this.columns && c ? !0 : !1;
                            var b = this.grid,
                                d;
                            if (c) {
                                d = this.domNode;
                                var g;
                                g = e.query("#" + d.id + ".templatePicker div.item")[0];
                                d = t.getContentBox(d);
                                g = (g = g && g.parentNode) ? f.coords(g).w : this._assumedCellWidth;
                                this._columns = (this._columns = Math.floor((d.w - b.views.views[0].getScrollbarWidth()) / g)) || 1
                            }
                            g = this._rows;
                            this._preprocess();
                            var l = this._rows;
                            this._setGridLayout();
                            this._setGridData();
                            l !== g && b.set("autoHeight", this._rows, !1);
                            c ? (b._resize({
                                    w: d.w,
                                    h: d.h
                                }), b.viewsHeaderNode.style.display =
                                "none") : b.update();
                            this._toggleTooltip();
                            var h = this,
                                n = this.getSelected();
                            n && b.store.fetch({
                                onComplete: function(a) {
                                    var c = (a = h._locate(n, h._selectedInfo, a)) && b.views.views[0].getCellNode(a[0], a[1]);
                                    c && h._rowClicked({
                                        cellNode: c,
                                        rowIndex: a[0],
                                        cellIndex: a[1]
                                    }, !0)
                                }
                            });
                            9 > a("ie") && setTimeout(this._repaintItems, this._ieTimer);
                            c = this.featureLayers;
                            d = this.items;
                            (!c || !c.length) && ((!d || !d.length) && b && this.emptyMessage) && b.showMessage(this.emptyMessage)
                        },
                        _eventMap: {
                            "selection-change": !0
                        },
                        onSelectionChange: function() {},
                        _setUseLegendAttr: function(a) {
                            var c = this.useLegend;
                            if (!this._started || c !== a) a ? this._flChanged = 1 : this._clearLegendInfo();
                            this.useLegend = a
                        },
                        _setFeatureLayersAttr: function(a) {
                            var c = this.featureLayers;
                            if (!this._started || c !== a) this._flChanged = 1;
                            this.featureLayers = a
                        },
                        _adjustRowsCols: function(a) {
                            if ("auto" === this.rows && "auto" === this.columns) this._started || (this._rows = !1, this._columns = null, this._autoWidth = !1);
                            else {
                                var c = 0;
                                this._rows = this.rows;
                                this._columns = this.columns;
                                "auto" === this.rows ? (this.featureLayers ?
                                    this.grouping ? (c = a.length, d.forEach(a, function(a) {
                                        c += Math.ceil(a.length / this.columns)
                                    }, this)) : (d.forEach(a, function(a) {
                                        c += a.length
                                    }, this), c = Math.ceil(c / this.columns)) : c = Math.ceil(a.length / this.columns), this._rows = c) : "auto" === this.columns && (this.featureLayers ? this.grouping ? c = 3 : (d.forEach(a, function(a) {
                                    c += a.length
                                }, this), c = Math.ceil(c / this.rows)) : c = Math.ceil(a.length / this.rows), this._columns = c)
                            }
                        },
                        _preprocess: function() {
                            this.items && (this.grouping = !1);
                            this._autoWidth = !1;
                            if ("auto" === this.rows || "auto" ===
                                this.columns) this._autoWidth = !0;
                            var a;
                            if (this.featureLayers)
                                if (this.useLegend && this._flChanged && (this._legendIndices = [], this._loadingIndices = [], this._legendSymbols = {}, this._ignoreLegends(), this._loadingLegends = [], clearTimeout(this._legendTimer), this._legendTimer = null, this._processSelectionLayers(), this._flChanged = 0), d.every(this.featureLayers, function(a) {
                                        return a.loaded
                                    })) a = this._flItems = this._getItemsFromLayers(this.featureLayers), this._adjustRowsCols(a);
                                else {
                                    var c = this.featureLayers.length;
                                    d.forEach(this.featureLayers,
                                        function(a) {
                                            if (a.loaded) c--;
                                            else var b = k.connect(a, "onLoad", this, function() {
                                                k.disconnect(b);
                                                b = null;
                                                c--;
                                                c || this.update()
                                            })
                                        }, this)
                                }
                            else a = this._itItems = this._getItemsFromItems(this.items), this._adjustRowsCols(a)
                        },
                        _processSelectionLayers: function() {
                            var a, c, b, e, l, h, f, n = {};
                            d.forEach(this.featureLayers, function(d, l) {
                                d.mode === g.MODE_SELECTION && (d._map && d.url && d._params.drawMode && !d.source) && (c = m.trim(d._url.path).replace(/\/(MapServer|FeatureServer).*/ig, "/MapServer").replace(/^https?:\/\//ig, "").toLowerCase(),
                                    b = n[c] = n[c] || {}, e = b.featureLayers = b.featureLayers || {}, h = b.indices = b.indices || [], e[l] = d, h.push(l), a = d._map)
                            });
                            a && d.forEach(a.layerIds, function(d) {
                                if ((d = a.getLayer(d)) && d.url && (d.getImageUrl || d.getTileUrl) && d.loaded && 10.1 <= d.version) c = m.trim(d._url.path).replace(/(\/MapServer).*/ig, "$1"), l = c.replace(/^https?:\/\//ig, "").toLowerCase(), n[l] && !n[l].mapServiceUrl && (b = n[l], b.mapServiceUrl = c, b.mapServiceLayer = d, this._legendIndices = this._legendIndices.concat(b.indices), f = this._fetchLegend({
                                    pickerInstance: this,
                                    info: b
                                }, l), f.then ? (this._loadingIndices = this._loadingIndices.concat(b.indices), this._loadingLegends.push(f)) : this._processLegendResponse(f, b))
                            }, this)
                        },
                        _fetchLegend: function(a, c) {
                            var b = L.prototype,
                                e = b.legendCache[c];
                            e ? e.then && e._contexts.push(a) : (e = b.legendCache[c] = G({
                                url: a.info.mapServiceUrl + "/legend",
                                content: {
                                    f: "json"
                                },
                                callbackParamName: "callback"
                            }), e._contexts = [a], e.addBoth(function(a) {
                                if (!e.canceled) {
                                    b.legendCache[c] = a;
                                    var g = e._contexts;
                                    e._contexts = null;
                                    d.forEach(g, function(c) {
                                        var b = c.pickerInstance;
                                        c = c.info;
                                        var g;
                                        b._destroyed || (d.forEach(c.indices, function(a) {
                                            g = d.indexOf(b._loadingIndices, a); - 1 < g && b._loadingIndices.splice(g, 1)
                                        }), g = d.indexOf(b._loadingLegends, e), -1 < g && b._loadingLegends.splice(g, 1), b._processLegendResponse(a, c))
                                    })
                                }
                            }));
                            return e
                        },
                        _clearLegendInfo: function() {
                            clearTimeout(this._legendTimer);
                            this._ignoreLegends();
                            this._legendIndices = this._loadingIndices = this._legendSymbols = this._loadingLegends = this._legendTimer = null
                        },
                        _ignoreLegends: function() {
                            this._loadingLegends && d.forEach(this._loadingLegends,
                                function(a) {
                                    var c = -1;
                                    d.some(a._contexts, function(a, b) {
                                        a.pickerInstance === this && (c = b);
                                        return -1 < c
                                    }, this); - 1 < c && a._contexts.splice(c, 1)
                                }, this)
                        },
                        _processLegendResponse: function(a, c) {
                            if (a && !(a instanceof Error)) d.forEach(c.indices, function(b) {
                                var e = c.featureLayers[b].layerId,
                                    g, l = c.mapServiceUrl + "/" + e + "/images/",
                                    h = c.mapServiceLayer._getToken(),
                                    f, n, k, m;
                                this._legendSymbols[b] || (f = null, d.some(a.layers, function(a) {
                                    a.layerId == e && (f = a);
                                    return !!f
                                }), f && (n = this._legendSymbols[b] = {}, d.forEach(f.legend, function(a) {
                                    if ((k =
                                            a.values) && k.length)
                                        for (g = 0; g < k.length; g++) n[k[g]] = a;
                                    else n.defaultSymbol = a;
                                    if ((m = a.url) && !a._fixed) a._fixed = 1, -1 === m.search(/https?\:/) && (a.url = l + m), h && -1 !== a.url.search(/https?\:/) && (a.url += (-1 < a.url.indexOf("?") ? "\x26" : "?") + "token\x3d" + h)
                                })))
                            }, this);
                            else {
                                var b;
                                d.forEach(c.indices, function(a) {
                                    b = d.indexOf(this._legendIndices, a); - 1 < b && this._legendIndices.splice(b, 1)
                                }, this)
                            }
                            var e = this;
                            e._started && !e._legendTimer && (e._legendTimer = setTimeout(function() {
                                clearTimeout(e._legendTimer);
                                e._legendTimer = null;
                                e._destroyed || e.update()
                            }, 0))
                        },
                        _applyGridPatches: function() {
                            var a = this.grid,
                                c = a.adaptWidth,
                                b, d, e;
                            a.adaptWidth = function() {
                                b = this.views.views;
                                for (d = 0; e = b[d]; d++) u.set(e.headerNode, "display", "block");
                                c.apply(this, arguments);
                                for (d = 0; e = b[d]; d++) u.set(e.headerNode, "display", "none")
                            };
                            if (this._dojo14x) {
                                if ("auto" !== this.rows && "auto" !== this.columns) var g = k.connect(a, "_onFetchComplete", this, function() {
                                    k.disconnect(g);
                                    this.grid.set("autoHeight", this._rows)
                                });
                                k.connect(a, "_onDelete", this, this._destroyItems);
                                k.connect(a,
                                    "_clearData", this, this._destroyItems);
                                k.connect(a, "destroy", this, this._destroyItems);
                                if ((a = a.focus) && a.findAndFocusGridCell) a.findAndFocusGridCell = function() {
                                    return !1
                                }
                            }
                        },
                        _setGridLayout: function() {
                            var a = function(a) {
                                    return function(c, b) {
                                        return this._cellGet(a, c, b)
                                    }
                                },
                                c = m.hitch(this, this._cellFormatter),
                                b = [],
                                d = this._columns,
                                e;
                            for (e = 0; e < d; e++) b.push({
                                field: "cell" + e,
                                get: m.hitch(this, a(e)),
                                formatter: c
                            });
                            a = {
                                cells: [b]
                            };
                            this.grouping && (d = {
                                field: "groupName",
                                colSpan: d,
                                get: m.hitch(this, this._cellGetGroup),
                                formatter: m.hitch(this,
                                    this._cellGroupFormatter)
                            }, a.cells.push([d]));
                            d = this.grid;
                            c = r.prototype.rowsPerPage;
                            d.set("rowsPerPage", this._rows > c ? this._rows : c);
                            d.set("structure", a)
                        },
                        _setGridData: function() {
                            var a = [];
                            if (this.grouping) {
                                this._groupRowIndices = [];
                                var c, b, e = this._columns;
                                d.forEach(this._flItems, function(d, g) {
                                    a.push({});
                                    var l = 0 === g ? 0 : c + b + 1;
                                    this._groupRowIndices.push(l);
                                    c = l;
                                    b = Math.ceil(d.length / e);
                                    a = a.concat(this._getStoreItems(d))
                                }, this)
                            } else this.featureLayers ? (d.forEach(this._flItems, function(c) {
                                    a = a.concat(c)
                                }), a =
                                this._getStoreItems(a)) : a = this._getStoreItems(this._itItems);
                            var g = new h({
                                data: {
                                    items: a
                                }
                            });
                            this.grid.setStore(g)
                        },
                        _toggleTooltip: function() {
                            if (this.showTooltip) {
                                if (!this.tooltip) {
                                    this.tooltip = s.create("div", {
                                        "class": "tooltip"
                                    }, this.domNode);
                                    this.tooltip.style.display = "none";
                                    this.tooltip.style.position = "fixed";
                                    var a = this.grid;
                                    this._mouseOverConnect = k.connect(a, "onCellMouseOver", this, this._cellMouseOver);
                                    this._mouseOutConnect = k.connect(a, "onCellMouseOut", this, this._cellMouseOut)
                                }
                            } else this.tooltip &&
                                (k.disconnect(this._mouseOverConnect), k.disconnect(this._mouseOutConnect), s.destroy(this.tooltip), this.tooltip = null)
                        },
                        _rowClicked: function(a, b) {
                            var d = a.cellNode,
                                e = a.rowIndex,
                                g = a.cellIndex,
                                l = this._getCellInfo(d, e, g);
                            if (l) {
                                var f = this.grid.store;
                                if (!f.getValue(l, "loadingCell") && (this._selectedCell && c.remove(this._selectedCell, "selectedItem"), d !== this._selectedCell ? (c.add(d, "selectedItem"), this._selectedCell = d, this._selectedItem = {
                                        featureLayer: f.getValue(l, "layer"),
                                        type: f.getValue(l, "type"),
                                        template: f.getValue(l,
                                            "template"),
                                        symbolInfo: f.getValue(l, "symbolInfo"),
                                        item: this._getItem(l)
                                    }, this._selectedInfo = {
                                        selRow: e,
                                        selCol: g,
                                        index1: f.getValue(l, "index1"),
                                        index2: f.getValue(l, "index2"),
                                        index: f.getValue(l, "index")
                                    }) : this._selectedCell = this._selectedInfo = this._selectedItem = null, !b)) this.onSelectionChange()
                            }
                        },
                        _locate: function(a, c, b) {
                            var e = this.grid.store,
                                g = Array(this._columns),
                                l, f = c.index1,
                                h = c.index2,
                                n = c.index,
                                k = a.item;
                            d.some(b, function(a, c) {
                                return d.some(g, function(b, d) {
                                    var g = e.getValue(a, "cell" + d);
                                    return g && (k ?
                                        n === e.getValue(g, "index") : f === e.getValue(g, "index1") && h === e.getValue(g, "index2")) ? (l = [c, d], !0) : !1
                                })
                            });
                            return l
                        },
                        _getCellInfo: function(a, c, b) {
                            if (a) return a = this.grid, c = a.getItem(c), a.store.getValue(c, "cell" + b)
                        },
                        _getItem: function(a) {
                            var c = this.items;
                            if (c) return c[this.grid.store.getValue(a, "index")]
                        },
                        _cellMouseOver: function(a) {
                            var c = this.tooltip,
                                b = a.cellNode,
                                d = this._getCellInfo(b, a.rowIndex, a.cellIndex);
                            if (c && d) {
                                var e = this.grid.store;
                                a = e.getValue(d, "template");
                                var g = e.getValue(d, "type"),
                                    l = e.getValue(d,
                                        "symbolInfo"),
                                    e = e.getValue(d, "layer");
                                a = (d = this._getItem(d)) && d.label + (d.description ? ": " + d.description : "") || a && a.name + (a.description ? ": " + a.description : "") || g && g.name || l && l.label + (l.description ? ": " + l.description : "") || (e && e.name + ": ") + "Default";
                                c.style.display = "none";
                                c.innerHTML = a;
                                b = f.coords(b.firstChild);
                                u.set(c, {
                                    left: b.x + "px",
                                    top: b.y + b.h + 5 + "px"
                                });
                                c.style.display = ""
                            }
                        },
                        _cellMouseOut: function() {
                            var a = this.tooltip;
                            a && (a.style.display = "none")
                        },
                        _destroyItems: function() {
                            var a = this._itemWidgets,
                                c;
                            for (c in a) a[c] &&
                                (a[c].destroy(), delete a[c])
                        },
                        _repaintItems: function() {
                            var a = this._itemWidgets,
                                c;
                            for (c in a) {
                                var b = a[c];
                                b && b._repaint(b._surface)
                            }
                        },
                        _getStoreItems: function(a) {
                            var c = this._uniqueId;
                            a = d.map(a, function(a) {
                                return m.mixin({
                                    surfaceId: "tpick-surface-" + c.id++
                                }, a)
                            });
                            for (var b = a.length, e = 0, g = {}, l = 0, f, h = [], n = !0, k = this._columns; e < b;) n = !0, f = "cell" + l, g[f] = a[e], e++, l++, 0 === l % k && (n = !1, h.push(g), g = {}, l = 0);
                            n && b && h.push(g);
                            return h
                        },
                        _getItemsFromLayers: function(a) {
                            var c = [];
                            d.forEach(a, function(a, b) {
                                c.push(this._getItemsFromLayer(a,
                                    b))
                            }, this);
                            return c
                        },
                        _getItemsFromLayer: function(a, c) {
                            var e = [];
                            if (this.useLegend && -1 < d.indexOf(this._loadingIndices, c)) return [{
                                label: this._nls && this._nls.loading || "",
                                symbol: null,
                                layer: a,
                                type: null,
                                template: null,
                                index1: c,
                                index2: 0,
                                loadingCell: 1
                            }];
                            var g = [],
                                g = g.concat(a.templates);
                            d.forEach(a.types, function(a) {
                                var c = a.templates;
                                d.forEach(c, function(c) {
                                    c._type_ = a
                                });
                                g = g.concat(c)
                            });
                            var g = d.filter(g, D.isDefined),
                                f = a.renderer;
                            if (f) {
                                var h = f.declaredClass.replace("esri.renderer.", "");
                                if (0 < g.length) d.forEach(g,
                                    function(g) {
                                        var n = g.prototype;
                                        if (n) {
                                            var k;
                                            if (k = f.valueExpression ? this._createSimpleSymbol(a) : this._isUnclassedRenderer(f) ? f.infos[0].symbol : f.getSymbol(n)) {
                                                var m = null,
                                                    s;
                                                if (!(9 > l("ie")) && g.thumbnail && g.thumbnail.imageData) m = new v(g.thumbnail);
                                                else if (this.useLegend && -1 < d.indexOf(this._legendIndices, c)) {
                                                    if (s = this._legendSymbols && this._legendSymbols[c]) switch (h) {
                                                        case "SimpleRenderer":
                                                            m = s.defaultSymbol;
                                                            break;
                                                        case "UniqueValueRenderer":
                                                            d.some(f.infos, function(a) {
                                                                a.symbol === k && (m = s[a.value]);
                                                                return !!m
                                                            });
                                                            break;
                                                        case "ClassBreaksRenderer":
                                                            d.some(f.infos, function(a) {
                                                                a.symbol === k && (m = s[a.maxValue]);
                                                                return !!m
                                                            })
                                                    }
                                                    if (m) {
                                                        n = b.fromJson(b.toJson(v.defaultProps));
                                                        n.url = m.url;
                                                        n.imageData = m.imageData;
                                                        n.contentType = m.contentType;
                                                        n.width = m.width;
                                                        n.height = m.height;
                                                        if (!D.isDefined(n.width) || !D.isDefined(n.height)) n.width = 15, n.height = 15;
                                                        m = new v(n)
                                                    }
                                                }
                                                e.push({
                                                    label: this._trimLabel(g.name),
                                                    symbol: m || k,
                                                    legendOverride: !!m,
                                                    layer: a,
                                                    type: g._type_,
                                                    template: g,
                                                    index1: c,
                                                    index2: e.length
                                                })
                                            } else switch (h) {
                                                case "HeatmapRenderer":
                                                    e.push({
                                                        label: this._trimLabel(g.name),
                                                        symbol: new y,
                                                        legendOverride: !!m,
                                                        layer: a,
                                                        type: g._type_,
                                                        template: g,
                                                        index1: c,
                                                        index2: e.length
                                                    })
                                            }
                                        }
                                        delete g._type_
                                    }, this);
                                else {
                                    var n = [];
                                    "TemporalRenderer" === h && (f = f.observationRenderer) && (h = f.declaredClass.replace("esri.renderer.", ""));
                                    switch (h) {
                                        case "SimpleRenderer":
                                            n = [{
                                                symbol: f.symbol,
                                                label: f.label,
                                                description: f.description
                                            }];
                                            break;
                                        case "UniqueValueRenderer":
                                        case "ClassBreaksRenderer":
                                            n = f.infos
                                    }
                                    e = d.map(n, function(b, d) {
                                        return {
                                            label: this._trimLabel(b.label),
                                            description: b.description,
                                            symbolInfo: m.mixin({
                                                    constructor: function() {}
                                                },
                                                b),
                                            symbol: b.symbol,
                                            layer: a,
                                            index1: c,
                                            index2: d
                                        }
                                    }, this)
                                }
                            }
                            return e
                        },
                        _isUnclassedRenderer: function(a) {
                            return !(!a.hasVisualVariables("sizeInfo", !1) && !a.hasVisualVariables("colorInfo", !1) && !a.hasVisualVariables("opacityInfo", !1) || !a.addBreak || !(a.infos && 1 === a.infos.length))
                        },
                        _createSimpleSymbol: function(a) {
                            var c;
                            switch (a.geometryType) {
                                case "esriGeometryPoint":
                                case "esriGeometryMultipoint":
                                    c = new y;
                                    break;
                                case "esriGeometryPolyline":
                                    c = new z;
                                    break;
                                case "esriGeometryPolygon":
                                    c = new x;
                                    break;
                                default:
                                    a.hasXYFootprint &&
                                        a.hasXYFootprint() && (c = new x)
                            }
                            return c
                        },
                        _getItemsFromItems: function(a) {
                            return d.map(a, function(a, c) {
                                a = m.mixin({
                                    index: c
                                }, a);
                                a.label = this._trimLabel(a.label);
                                return a
                            }, this)
                        },
                        _trimLabel: function(a) {
                            var c = this.maxLabelLength;
                            c && a && a.length > c && (a = a.substr(0, c) + "...");
                            return a || ""
                        },
                        _cellGet: function(a, c, b) {
                            return !b ? "" : this.grid.store.getValue(b, "cell" + a)
                        },
                        _cellFormatter: function(a) {
                            if (a) {
                                var c = this._itemWidgets,
                                    b = this.grid.store,
                                    d = b.getValue(a, "surfaceId"),
                                    e = c[d];
                                e || (e = c[d] = new E({
                                    id: d,
                                    label: b.getValue(a,
                                        "label"),
                                    symbol: b.getValue(a, "symbol"),
                                    legendOverride: b.getValue(a, "legendOverride"),
                                    surfaceWidth: this.surfaceWidth,
                                    surfaceHeight: this.surfaceHeight,
                                    template: b.getValue(a, "template")
                                }));
                                return e || ""
                            }
                            return ""
                        },
                        _cellGetGroup: function(a, c) {
                            if (!this._groupRowIndices) return "";
                            var b = d.indexOf(this._groupRowIndices, a);
                            return !c || -1 === b ? "" : (b = this.featureLayers[b]) && (this.groupLabelFunction ? this.groupLabelFunction(b) : b.name) || ""
                        },
                        _cellGroupFormatter: function(a) {
                            return a ? "\x3cdiv class\x3d'groupLabel'\x3e" +
                                a + "\x3c/div\x3e" : ""
                        }
                    });
                    return L
                })
        },
        "dojox/grid/DataGrid": function() {
            define("../main dojo/_base/array dojo/_base/lang dojo/_base/json dojo/_base/sniff dojo/_base/declare ./_Grid ./DataSelection dojo/_base/html dojo/has dojo/has!dojo-bidi?./bidi/_BidiMixin".split(" "), function(p, m, k, f, d, b, e, a, n) {
                var l = b("dojox.grid.DataGrid", e, {
                    store: null,
                    query: null,
                    queryOptions: null,
                    fetchText: "...",
                    sortFields: null,
                    updateDelay: 1,
                    items: null,
                    _store_connects: null,
                    _by_idty: null,
                    _by_idx: null,
                    _cache: null,
                    _pages: null,
                    _pending_requests: null,
                    _bop: -1,
                    _eop: -1,
                    _requests: 0,
                    rowCount: 0,
                    _isLoaded: !1,
                    _isLoading: !1,
                    keepSelection: !1,
                    postCreate: function() {
                        this._pages = [];
                        this._store_connects = [];
                        this._by_idty = {};
                        this._by_idx = [];
                        this._cache = [];
                        this._pending_requests = {};
                        this._setStore(this.store);
                        this.inherited(arguments)
                    },
                    destroy: function() {
                        this.selection.destroy();
                        this.inherited(arguments)
                    },
                    createSelection: function() {
                        this.selection = new a(this)
                    },
                    get: function(a, b) {
                        if (b && "_item" == this.field && !this.fields) return b;
                        if (b && this.fields) {
                            var d = [],
                                e = this.grid.store;
                            m.forEach(this.fields, function(a) {
                                d = d.concat(e.getValues(b, a))
                            });
                            return d
                        }
                        return !b && "string" === typeof a ? this.inherited(arguments) : !b ? this.defaultValue : !this.field ? this.value : "_item" == this.field ? b : this.grid.store.getValue(b, this.field)
                    },
                    _checkUpdateStatus: function() {
                        if (0 < this.updateDelay) {
                            var a = !1;
                            this._endUpdateDelay && (clearTimeout(this._endUpdateDelay), delete this._endUpdateDelay, a = !0);
                            this.updating || (this.beginUpdate(), a = !0);
                            if (a) {
                                var b = this;
                                this._endUpdateDelay = setTimeout(function() {
                                    delete b._endUpdateDelay;
                                    b.endUpdate()
                                }, this.updateDelay)
                            }
                        }
                    },
                    _onSet: function(a, b, d, e) {
                        this._checkUpdateStatus();
                        a = this.getItemIndex(a); - 1 < a && this.updateRow(a)
                    },
                    _createItem: function(a, b) {
                        var d = this._hasIdentity ? this.store.getIdentity(a) : f.toJson(this.query) + ":idx:" + b + ":sort:" + f.toJson(this.getSortProps());
                        return this._by_idty[d] = {
                            idty: d,
                            item: a
                        }
                    },
                    _addItem: function(a, b, d) {
                        this._by_idx[b] = this._createItem(a, b);
                        d || this.updateRow(b)
                    },
                    _onNew: function(a, b) {
                        this._checkUpdateStatus();
                        var d = this.get("rowCount");
                        this._addingItem = !0;
                        this.updateRowCount(d + 1);
                        this._addingItem = !1;
                        this._addItem(a, d);
                        this.showMessage()
                    },
                    _onDelete: function(a) {
                        this._checkUpdateStatus();
                        a = this._getItemIndex(a, !0);
                        if (0 <= a) {
                            this._pages = [];
                            this._eop = this._bop = -1;
                            var b = this._by_idx[a];
                            this._by_idx.splice(a, 1);
                            delete this._by_idty[b.idty];
                            this.updateRowCount(this.get("rowCount") - 1);
                            0 === this.get("rowCount") && this.showMessage(this.noDataMessage)
                        }
                        this.selection.isSelected(a) && (this.selection.deselect(a), this.selection.selected.splice(a, 1))
                    },
                    _onRevert: function() {
                        this._refresh()
                    },
                    setStore: function(a, b, d) {
                        this._requestsPending(0) || (this._setQuery(b, d), this._setStore(a), this._refresh(!0))
                    },
                    setQuery: function(a, b) {
                        this._requestsPending(0) || (this._setQuery(a, b), this._refresh(!0))
                    },
                    setItems: function(a) {
                        this.items = a;
                        this._setStore(this.store);
                        this._refresh(!0)
                    },
                    _setQuery: function(a, b) {
                        this.query = a;
                        this.queryOptions = b || this.queryOptions
                    },
                    _setStore: function(a) {
                        this.store && this._store_connects && m.forEach(this._store_connects, this.disconnect, this);
                        if (this.store = a) {
                            a = this.store.getFeatures();
                            var b = [];
                            this._canEdit = !!a["dojo.data.api.Write"] && !!a["dojo.data.api.Identity"];
                            this._hasIdentity = !!a["dojo.data.api.Identity"];
                            a["dojo.data.api.Notification"] && !this.items && (b.push(this.connect(this.store, "onSet", "_onSet")), b.push(this.connect(this.store, "onNew", "_onNew")), b.push(this.connect(this.store, "onDelete", "_onDelete")));
                            this._canEdit && b.push(this.connect(this.store, "revert", "_onRevert"));
                            this._store_connects = b
                        }
                    },
                    _onFetchBegin: function(a, b) {
                        this.scroller && (this.rowCount != a && (b.isRender ?
                            (this.scroller.init(a, this.keepRows, this.rowsPerPage), this.rowCount = a, this._setAutoHeightAttr(this.autoHeight, !0), this._skipRowRenormalize = !0, this.prerender(), this._skipRowRenormalize = !1) : this.updateRowCount(a)), a ? this.showMessage() : (this.views.render(), this._resize(), this.showMessage(this.noDataMessage), this.focus.initFocusView()))
                    },
                    _onFetchComplete: function(a, b) {
                        this.scroller && (a && 0 < a.length && (m.forEach(a, function(a, c) {
                                this._addItem(a, b.start + c, !0)
                            }, this), this.updateRows(b.start, a.length), b.isRender ?
                            (this.setScrollTop(0), this.postrender()) : this._lastScrollTop && this.setScrollTop(this._lastScrollTop), d("ie") && n.setSelectable(this.domNode, this.selectable)), delete this._lastScrollTop, this._isLoaded || (this._isLoading = !1, this._isLoaded = !0), this._pending_requests[b.start] = !1)
                    },
                    _onFetchError: function(a, b) {
                        console.log(a);
                        delete this._lastScrollTop;
                        this._isLoaded || (this._isLoading = !1, this._isLoaded = !0, this.showMessage(this.errorMessage));
                        this._pending_requests[b.start] = !1;
                        this.onFetchError(a, b)
                    },
                    onFetchError: function(a,
                        b) {},
                    _fetch: function(a, b) {
                        a = a || 0;
                        if (this.store && !this._pending_requests[a]) {
                            !this._isLoaded && !this._isLoading && (this._isLoading = !0, this.showMessage(this.loadingMessage));
                            this._pending_requests[a] = !0;
                            try {
                                if (this.items) {
                                    var d = this.items,
                                        e = this.store;
                                    this.rowsPerPage = d.length;
                                    var l = {
                                        start: a,
                                        count: this.rowsPerPage,
                                        isRender: b
                                    };
                                    this._onFetchBegin(d.length, l);
                                    var f = 0;
                                    m.forEach(d, function(a) {
                                        e.isItemLoaded(a) || f++
                                    });
                                    if (0 === f) this._onFetchComplete(d, l);
                                    else {
                                        var n = function(a) {
                                            f--;
                                            0 === f && this._onFetchComplete(d,
                                                l)
                                        };
                                        m.forEach(d, function(a) {
                                            e.isItemLoaded(a) || e.loadItem({
                                                item: a,
                                                onItem: n,
                                                scope: this
                                            })
                                        }, this)
                                    }
                                } else this.store.fetch({
                                    start: a,
                                    count: this.rowsPerPage,
                                    query: this.query,
                                    sort: this.getSortProps(),
                                    queryOptions: this.queryOptions,
                                    isRender: b,
                                    onBegin: k.hitch(this, "_onFetchBegin"),
                                    onComplete: k.hitch(this, "_onFetchComplete"),
                                    onError: k.hitch(this, "_onFetchError")
                                })
                            } catch (r) {
                                this._onFetchError(r, {
                                    start: a,
                                    count: this.rowsPerPage
                                })
                            }
                        }
                    },
                    _clearData: function() {
                        this.updateRowCount(0);
                        this._by_idty = {};
                        this._by_idx = [];
                        this._pages = [];
                        this._bop = this._eop = -1;
                        this._isLoading = this._isLoaded = !1
                    },
                    getItem: function(a) {
                        var b = this._by_idx[a];
                        return !b || b && !b.item ? (this._preparePage(a), null) : b.item
                    },
                    getItemIndex: function(a) {
                        return this._getItemIndex(a, !1)
                    },
                    _getItemIndex: function(a, b) {
                        if (!b && !this.store.isItem(a)) return -1;
                        for (var d = this._hasIdentity ? this.store.getIdentity(a) : null, e = 0, l = this._by_idx.length; e < l; e++) {
                            var f = this._by_idx[e];
                            if (f && (d && f.idty == d || f.item === a)) return e
                        }
                        return -1
                    },
                    filter: function(a, b) {
                        this.query = a;
                        b &&
                            this._clearData();
                        this._fetch()
                    },
                    _getItemAttr: function(a, b) {
                        var d = this.getItem(a);
                        return !d ? this.fetchText : this.store.getValue(d, b)
                    },
                    _render: function() {
                        this.domNode.parentNode && (this.scroller.init(this.get("rowCount"), this.keepRows, this.rowsPerPage), this.prerender(), this._fetch(0, !0))
                    },
                    _requestsPending: function(a) {
                        return this._pending_requests[a]
                    },
                    _rowToPage: function(a) {
                        return this.rowsPerPage ? Math.floor(a / this.rowsPerPage) : a
                    },
                    _pageToRow: function(a) {
                        return this.rowsPerPage ? this.rowsPerPage * a : a
                    },
                    _preparePage: function(a) {
                        if ((a <
                                this._bop || a >= this._eop) && !this._addingItem) a = this._rowToPage(a), this._needPage(a), this._bop = a * this.rowsPerPage, this._eop = this._bop + (this.rowsPerPage || this.get("rowCount"))
                    },
                    _needPage: function(a) {
                        this._pages[a] || (this._pages[a] = !0, this._requestPage(a))
                    },
                    _requestPage: function(a) {
                        a = this._pageToRow(a);
                        0 < Math.min(this.rowsPerPage, this.get("rowCount") - a) && (this._requests++, this._requestsPending(a) || setTimeout(k.hitch(this, "_fetch", a, !1), 1))
                    },
                    getCellName: function(a) {
                        return a.field
                    },
                    _refresh: function(a) {
                        this._clearData();
                        this._fetch(0, a)
                    },
                    sort: function() {
                        this.edit.apply();
                        this._lastScrollTop = this.scrollTop;
                        this._refresh()
                    },
                    canSort: function() {
                        return !this._isLoading
                    },
                    getSortProps: function() {
                        var a = this.getCell(this.getSortIndex());
                        if (a) {
                            var b = a.sortDesc,
                                d = !(0 < this.sortInfo);
                            return [{
                                attribute: a.field,
                                descending: "undefined" == typeof b ? d : d ? !b : b
                            }]
                        }
                        return this.sortFields ? this.sortFields : null
                    },
                    styleRowState: function(a) {
                        if (this.store && this.store.getState) {
                            for (var b = this.store.getState(a.index), d = "", e = 0, l = ["inflight", "error",
                                    "inserting"
                                ], f; f = l[e]; e++)
                                if (b[f]) {
                                    d = " dojoxGridRow-" + f;
                                    break
                                }
                            a.customClasses += d
                        }
                    },
                    onStyleRow: function(a) {
                        this.styleRowState(a);
                        this.inherited(arguments)
                    },
                    canEdit: function(a, b) {
                        return this._canEdit
                    },
                    _copyAttr: function(a, b) {
                        var d = this.getItem(a);
                        return this.store.getValue(d, b)
                    },
                    doStartEdit: function(a, b) {
                        this._cache[b] || (this._cache[b] = this._copyAttr(b, a.field));
                        this.onStartEdit(a, b)
                    },
                    doApplyCellEdit: function(a, b, d) {
                        this.store.fetchItemByIdentity({
                            identity: this._by_idx[b].idty,
                            onItem: k.hitch(this, function(e) {
                                var l =
                                    this.store.getValue(e, d);
                                "number" == typeof l ? a = isNaN(a) ? a : parseFloat(a) : "boolean" == typeof l ? a = "true" == a ? !0 : "false" == a ? !1 : a : l instanceof Date && (l = new Date(a), a = isNaN(l.getTime()) ? a : l);
                                this.store.setValue(e, d, a);
                                this.onApplyCellEdit(a, b, d)
                            })
                        })
                    },
                    doCancelEdit: function(a) {
                        this._cache[a] && (this.updateRow(a), delete this._cache[a]);
                        this.onCancelEdit.apply(this, arguments)
                    },
                    doApplyEdit: function(a, b) {
                        this.onApplyEdit(a)
                    },
                    removeSelectedRows: function() {
                        if (this._canEdit) {
                            this.edit.apply();
                            var a = k.hitch(this, function(a) {
                                a.length &&
                                    (m.forEach(a, this.store.deleteItem, this.store), this.selection.clear())
                            });
                            this.allItemsSelected ? this.store.fetch({
                                query: this.query,
                                queryOptions: this.queryOptions,
                                onComplete: a
                            }) : a(this.selection.getSelected())
                        }
                    }
                });
                l.cell_markupFactory = function(a, b, d) {
                    var e = k.trim(n.attr(b, "field") || "");
                    e && (d.field = e);
                    d.field = d.field || d.name;
                    if (e = k.trim(n.attr(b, "fields") || "")) d.fields = e.split(",");
                    a && a(b, d)
                };
                l.markupFactory = function(a, b, d, f) {
                    return e.markupFactory(a, b, d, k.partial(l.cell_markupFactory, f))
                };
                return l
            })
        },
        "dojox/grid/_Grid": function() {
            define("dojo/_base/kernel ../main dojo/_base/declare ./_Events ./_Scroller ./_Layout ./_View ./_ViewManager ./_RowManager ./_FocusManager ./_EditManager ./Selection ./_RowSelector ./util dijit/_Widget dijit/_TemplatedMixin dijit/CheckedMenuItem dojo/text!./resources/_Grid.html dojo/string dojo/_base/array dojo/_base/lang dojo/_base/sniff dojox/html/metrics dojo/_base/html dojo/query dojo/dnd/common dojo/i18n!dijit/nls/loading".split(" "), function(p, m, k, f, d, b, e, a, n, l,
                c, s, t, u, q, w, h, r, B, g, y, v, x, z, E) {
                p.isCopyKey || (p.isCopyKey = p.dnd.getCopyKeyState);
                k = k("dojox.grid._Grid", [q, w, f], {
                    templateString: r,
                    classTag: "dojoxGrid",
                    rowCount: 5,
                    keepRows: 75,
                    rowsPerPage: 25,
                    autoWidth: !1,
                    initialWidth: "",
                    autoHeight: "",
                    rowHeight: 0,
                    autoRender: !0,
                    defaultHeight: "15em",
                    height: "",
                    structure: null,
                    elasticView: -1,
                    singleClickEdit: !1,
                    selectionMode: "extended",
                    rowSelector: "",
                    columnReordering: !1,
                    headerMenu: null,
                    placeholderLabel: "GridColumns",
                    selectable: !1,
                    _click: null,
                    loadingMessage: "\x3cspan class\x3d'dojoxGridLoading'\x3e${loadingState}\x3c/span\x3e",
                    errorMessage: "\x3cspan class\x3d'dojoxGridError'\x3e${errorState}\x3c/span\x3e",
                    noDataMessage: "",
                    escapeHTMLInData: !0,
                    formatterScope: null,
                    editable: !1,
                    summary: "",
                    _setSummaryAttr: "domNode",
                    sortInfo: 0,
                    _placeholders: null,
                    _layoutClass: b,
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.domNode.getAttribute("tabIndex") || (this.domNode.tabIndex = "0");
                        this.createScroller();
                        this.createLayout();
                        this.createViews();
                        this.createManagers();
                        this.createSelection();
                        this.connect(this.selection, "onSelected", "onSelected");
                        this.connect(this.selection, "onDeselected", "onDeselected");
                        this.connect(this.selection, "onChanged", "onSelectionChanged");
                        x.initOnFontResize();
                        this.connect(x, "onFontResize", "textSizeChanged");
                        u.funnelEvents(this.domNode, this, "doKeyEvent", u.keyEvents);
                        "none" != this.selectionMode && this.domNode.setAttribute("aria-multiselectable", "single" == this.selectionMode ? "false" : "true");
                        z.addClass(this.domNode, this.classTag);
                        this.isLeftToRight() || z.addClass(this.domNode, this.classTag + "Rtl");
                        0 < this.rowHeight && z.addClass(this.viewsNode,
                            this.classTag + "FixedRowHeight")
                    },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        var a = p.i18n.getLocalization("dijit", "loading", this.lang);
                        this.loadingMessage = B.substitute(this.loadingMessage, a);
                        this.errorMessage = B.substitute(this.errorMessage, a);
                        this.srcNodeRef && this.srcNodeRef.style.height && (this.height = this.srcNodeRef.style.height);
                        this._setAutoHeightAttr(this.autoHeight, !0);
                        this.lastScrollTop = this.scrollTop = 0
                    },
                    postCreate: function() {
                        this._placeholders = [];
                        this._setHeaderMenuAttr(this.headerMenu);
                        this._setStructureAttr(this.structure);
                        this._click = [];
                        this.inherited(arguments);
                        this.domNode && (this.autoWidth && this.initialWidth) && (this.domNode.style.width = this.initialWidth);
                        this.domNode && !this.editable && z.attr(this.domNode, "aria-readonly", "true")
                    },
                    destroy: function() {
                        this.domNode.onReveal = null;
                        this.domNode.onSizeChange = null;
                        delete this._click;
                        this.scroller && (this.scroller.destroy(), delete this.scroller);
                        this.edit.destroy();
                        delete this.edit;
                        this.views.destroyViews();
                        this.focus && (this.focus.destroy(),
                            delete this.focus);
                        this.headerMenu && this._placeholders.length && (g.forEach(this._placeholders, function(a) {
                            a.unReplace(!0)
                        }), this.headerMenu.unBindDomNode(this.viewsHeaderNode));
                        this.inherited(arguments)
                    },
                    _setAutoHeightAttr: function(a, b) {
                        "string" == typeof a && (a = !a || "false" == a ? !1 : "true" == a ? !0 : window.parseInt(a, 10));
                        "number" == typeof a && (isNaN(a) && (a = !1), 0 > a ? a = !0 : 0 === a && (a = !1));
                        this.autoHeight = a;
                        this._autoHeight = "boolean" == typeof a ? a : "number" == typeof a ? a >= this.get("rowCount") : !1;
                        this._started && !b && this.render()
                    },
                    _getRowCountAttr: function() {
                        return this.updating && this.invalidated && void 0 != this.invalidated.rowCount ? this.invalidated.rowCount : this.rowCount
                    },
                    textSizeChanged: function() {
                        this.render()
                    },
                    sizeChange: function() {
                        this.update()
                    },
                    createManagers: function() {
                        this.rows = new n(this);
                        this.focus = new l(this);
                        this.edit = new c(this)
                    },
                    createSelection: function() {
                        this.selection = new s(this)
                    },
                    createScroller: function() {
                        this.scroller = new d;
                        this.scroller.grid = this;
                        this.scroller.renderRow = y.hitch(this, "renderRow");
                        this.scroller.removeRow =
                            y.hitch(this, "rowRemoved")
                    },
                    createLayout: function() {
                        this.layout = new this._layoutClass(this);
                        this.connect(this.layout, "moveColumn", "onMoveColumn")
                    },
                    onMoveColumn: function() {
                        this.update()
                    },
                    onResizeColumn: function(a) {},
                    createViews: function() {
                        this.views = new a(this);
                        this.views.createView = y.hitch(this, "createView")
                    },
                    createView: function(a, b) {
                        var c = new(y.getObject(a))({
                            grid: this,
                            index: b
                        });
                        this.viewsNode.appendChild(c.domNode);
                        this.viewsHeaderNode.appendChild(c.headerNode);
                        this.views.addView(c);
                        z.attr(this.domNode,
                            "align", this.isLeftToRight() ? "left" : "right");
                        return c
                    },
                    buildViews: function() {
                        for (var a = 0, b; b = this.layout.structure[a]; a++) this.createView(b.type || m._scopeName + ".grid._View", a).setStructure(b);
                        this.scroller.setContentNodes(this.views.getContentNodes())
                    },
                    _setStructureAttr: function(a) {
                        a && y.isString(a) && (p.deprecated("dojox.grid._Grid.set('structure', 'objVar')", "use dojox.grid._Grid.set('structure', objVar) instead", "2.0"), a = y.getObject(a));
                        this.structure = a;
                        if (!a)
                            if (this.layout.structure) a = this.layout.structure;
                            else return;
                        this.views.destroyViews();
                        this.focus.focusView = null;
                        a !== this.layout.structure && this.layout.setStructure(a);
                        this._structureChanged()
                    },
                    setStructure: function(a) {
                        p.deprecated("dojox.grid._Grid.setStructure(obj)", "use dojox.grid._Grid.set('structure', obj) instead.", "2.0");
                        this._setStructureAttr(a)
                    },
                    getColumnTogglingItems: function() {
                        var a, b = [];
                        a = g.map(this.layout.cells, function(a) {
                            a.menuItems || (a.menuItems = []);
                            var c = this,
                                d = new h({
                                    label: a.name,
                                    checked: !a.hidden,
                                    _gridCell: a,
                                    onChange: function(a) {
                                        if (c.layout.setColumnVisibility(this._gridCell.index,
                                                a)) {
                                            var b = this._gridCell.menuItems;
                                            1 < b.length && g.forEach(b, function(b) {
                                                b !== this && b.setAttribute("checked", a)
                                            }, this);
                                            a = g.filter(c.layout.cells, function(a) {
                                                1 < a.menuItems.length ? g.forEach(a.menuItems, "item.set('disabled', false);") : a.menuItems[0].set("disabled", !1);
                                                return !a.hidden
                                            });
                                            1 == a.length && g.forEach(a[0].menuItems, "item.set('disabled', true);")
                                        }
                                    },
                                    destroy: function() {
                                        var a = g.indexOf(this._gridCell.menuItems, this);
                                        this._gridCell.menuItems.splice(a, 1);
                                        delete this._gridCell;
                                        h.prototype.destroy.apply(this,
                                            arguments)
                                    }
                                });
                            a.menuItems.push(d);
                            a.hidden || b.push(d);
                            return d
                        }, this);
                        1 == b.length && b[0].set("disabled", !0);
                        return a
                    },
                    _setHeaderMenuAttr: function(a) {
                        this._placeholders && this._placeholders.length && (g.forEach(this._placeholders, function(a) {
                            a.unReplace(!0)
                        }), this._placeholders = []);
                        this.headerMenu && this.headerMenu.unBindDomNode(this.viewsHeaderNode);
                        if (this.headerMenu = a) this.headerMenu.bindDomNode(this.viewsHeaderNode), this.headerMenu.getPlaceholders && (this._placeholders = this.headerMenu.getPlaceholders(this.placeholderLabel))
                    },
                    setHeaderMenu: function(a) {
                        p.deprecated("dojox.grid._Grid.setHeaderMenu(obj)", "use dojox.grid._Grid.set('headerMenu', obj) instead.", "2.0");
                        this._setHeaderMenuAttr(a)
                    },
                    setupHeaderMenu: function() {
                        this._placeholders && this._placeholders.length && g.forEach(this._placeholders, function(a) {
                            a._replaced && a.unReplace(!0);
                            a.replace(this.getColumnTogglingItems())
                        }, this)
                    },
                    _fetch: function(a) {
                        this.setScrollTop(0)
                    },
                    getItem: function(a) {
                        return null
                    },
                    showMessage: function(a) {
                        a ? (this.messagesNode.innerHTML = a, this.messagesNode.style.display =
                            "") : (this.messagesNode.innerHTML = "", this.messagesNode.style.display = "none")
                    },
                    _structureChanged: function() {
                        this.buildViews();
                        this.autoRender && this._started && this.render()
                    },
                    hasLayout: function() {
                        return this.layout.cells.length
                    },
                    resize: function(a, b) {
                        this._pendingChangeSize = a;
                        this._pendingResultSize = b;
                        this.sizeChange()
                    },
                    _getPadBorder: function() {
                        return this._padBorder = this._padBorder || z._getPadBorderExtents(this.domNode)
                    },
                    _getHeaderHeight: function() {
                        var a = this.viewsHeaderNode.style,
                            b = "none" == a.display ?
                            0 : this.views.measureHeader();
                        a.height = b + "px";
                        this.views.normalizeHeaderNodeHeight();
                        return b
                    },
                    _resize: function(a, b) {
                        a = a || this._pendingChangeSize;
                        b = b || this._pendingResultSize;
                        delete this._pendingChangeSize;
                        delete this._pendingResultSize;
                        if (this.domNode) {
                            var c = this.domNode.parentNode;
                            if (c && !(1 != c.nodeType || !this.hasLayout() || "hidden" == c.style.visibility || "none" == c.style.display)) {
                                var d = this._getPadBorder(),
                                    e = void 0,
                                    l;
                                this._autoHeight ? this.domNode.style.height = "auto" : "number" == typeof this.autoHeight ?
                                    (l = e = this._getHeaderHeight(), l += this.scroller.averageRowHeight * this.autoHeight, this.domNode.style.height = l + "px") : this.domNode.clientHeight <= d.h && (c == document.body ? this.domNode.style.height = this.defaultHeight : this.height ? this.domNode.style.height = this.height : this.fitTo = "parent");
                                b && (a = b);
                                !this._autoHeight && a ? (z.marginBox(this.domNode, a), this.height = this.domNode.style.height, delete this.fitTo) : "parent" == this.fitTo && (l = this._parentContentBoxHeight = 0 < this._parentContentBoxHeight ? this._parentContentBoxHeight :
                                    z._getContentBox(c).h, this.domNode.style.height = Math.max(0, l) + "px");
                                c = g.some(this.views.views, function(a) {
                                    return a.flexCells
                                });
                                !this._autoHeight && 0 === (l || z._getContentBox(this.domNode).h) ? this.viewsHeaderNode.style.display = "none" : (this.viewsHeaderNode.style.display = "block", !c && void 0 === e && (e = this._getHeaderHeight()));
                                c && (e = void 0);
                                this.adaptWidth();
                                this.adaptHeight(e);
                                this.postresize()
                            }
                        }
                    },
                    adaptWidth: function() {
                        var a = !this.initialWidth && this.autoWidth,
                            b = a ? 0 : this.domNode.clientWidth || this.domNode.offsetWidth -
                            this._getPadBorder().w,
                            b = this.views.arrange(1, b);
                        this.views.onEach("adaptWidth");
                        a && (this.domNode.style.width = b + "px")
                    },
                    adaptHeight: function(a) {
                        a = void 0 === a ? this._getHeaderHeight() : a;
                        var b = this._autoHeight ? -1 : Math.max(this.domNode.clientHeight - a, 0) || 0;
                        this.views.onEach("setSize", [0, b]);
                        this.views.onEach("adaptHeight");
                        if (!this._autoHeight) {
                            var c = 0,
                                d = 0,
                                e = g.filter(this.views.views, function(a) {
                                    (a = a.hasHScrollbar()) ? c++ : d++;
                                    return !a
                                });
                            0 < c && 0 < d && g.forEach(e, function(a) {
                                a.adaptHeight(!0)
                            })
                        }!0 === this.autoHeight ||
                            -1 != b || "number" == typeof this.autoHeight && this.autoHeight >= this.get("rowCount") ? this.scroller.windowHeight = b : this.scroller.windowHeight = Math.max(this.domNode.clientHeight - a, 0)
                    },
                    startup: function() {
                        this._started || (this.inherited(arguments), this.autoRender && this.render())
                    },
                    render: function() {
                        this.domNode && this._started && (this.hasLayout() ? (this.update = this.defaultUpdate, this._render()) : this.scroller.init(0, this.keepRows, this.rowsPerPage))
                    },
                    _render: function() {
                        this.scroller.init(this.get("rowCount"), this.keepRows,
                            this.rowsPerPage);
                        this.prerender();
                        this.setScrollTop(0);
                        this.postrender()
                    },
                    prerender: function() {
                        this.keepRows = this._autoHeight ? 0 : this.keepRows;
                        this.scroller.setKeepInfo(this.keepRows);
                        this.views.render();
                        this._resize()
                    },
                    postrender: function() {
                        this.postresize();
                        this.focus.initFocusView();
                        z.setSelectable(this.domNode, this.selectable)
                    },
                    postresize: function() {
                        if (this._autoHeight) {
                            var a = Math.max(this.views.measureContent()) + "px";
                            this.viewsNode.style.height = a
                        }
                    },
                    renderRow: function(a, b) {
                        this.views.renderRow(a,
                            b, this._skipRowRenormalize)
                    },
                    rowRemoved: function(a) {
                        this.views.rowRemoved(a)
                    },
                    invalidated: null,
                    updating: !1,
                    beginUpdate: function() {
                        this.invalidated = [];
                        this.updating = !0
                    },
                    endUpdate: function() {
                        this.updating = !1;
                        var a = this.invalidated,
                            b;
                        if (a.all) this.update();
                        else if (void 0 != a.rowCount) this.updateRowCount(a.rowCount);
                        else
                            for (b in a) this.updateRow(Number(b));
                        this.invalidated = []
                    },
                    defaultUpdate: function() {
                        this.domNode && (this.updating ? this.invalidated.all = !0 : (this.lastScrollTop = this.scrollTop, this.prerender(),
                            this.scroller.invalidateNodes(), this.setScrollTop(this.lastScrollTop), this.postrender()))
                    },
                    update: function() {
                        this.render()
                    },
                    updateRow: function(a) {
                        a = Number(a);
                        this.updating ? this.invalidated[a] = !0 : (this.views.updateRow(a), this.scroller.rowHeightChanged(a))
                    },
                    updateRows: function(a, b) {
                        a = Number(a);
                        b = Number(b);
                        var c;
                        if (this.updating)
                            for (c = 0; c < b; c++) this.invalidated[c + a] = !0;
                        else {
                            for (c = 0; c < b; c++) this.views.updateRow(c + a, this._skipRowRenormalize);
                            this.scroller.rowHeightChanged(a)
                        }
                    },
                    updateRowCount: function(a) {
                        this.updating ?
                            this.invalidated.rowCount = a : (this.rowCount = a, this._setAutoHeightAttr(this.autoHeight, !0), this.layout.cells.length && this.scroller.updateRowCount(a), this._resize(), this.layout.cells.length && this.setScrollTop(this.scrollTop))
                    },
                    updateRowStyles: function(a) {
                        this.views.updateRowStyles(a)
                    },
                    getRowNode: function(a) {
                        if (this.focus.focusView && !(this.focus.focusView instanceof t)) return this.focus.focusView.rowNodes[a];
                        for (var b = 0, c; c = this.views.views[b]; b++)
                            if (!(c instanceof t)) return c.rowNodes[a];
                        return null
                    },
                    rowHeightChanged: function(a) {
                        this.views.renormalizeRow(a);
                        this.scroller.rowHeightChanged(a)
                    },
                    fastScroll: !0,
                    delayScroll: !1,
                    scrollRedrawThreshold: v("ie") ? 100 : 50,
                    scrollTo: function(a) {
                        if (this.fastScroll) {
                            var b = Math.abs(this.lastScrollTop - a);
                            this.lastScrollTop = a;
                            if (b > this.scrollRedrawThreshold || this.delayScroll) {
                                this.delayScroll = !0;
                                this.scrollTop = a;
                                this.views.setScrollTop(a);
                                this._pendingScroll && window.clearTimeout(this._pendingScroll);
                                var c = this;
                                this._pendingScroll = window.setTimeout(function() {
                                    delete c._pendingScroll;
                                    c.finishScrollJob()
                                }, 200)
                            } else this.setScrollTop(a)
                        } else this.setScrollTop(a)
                    },
                    finishScrollJob: function() {
                        this.delayScroll = !1;
                        this.setScrollTop(this.scrollTop)
                    },
                    setScrollTop: function(a) {
                        this.scroller.scroll(this.views.setScrollTop(a))
                    },
                    scrollToRow: function(a) {
                        this.setScrollTop(this.scroller.findScrollTop(a) + 1)
                    },
                    styleRowNode: function(a, b) {
                        b && this.rows.styleRowNode(a, b)
                    },
                    _mouseOut: function(a) {
                        this.rows.setOverRow(-2)
                    },
                    getCell: function(a) {
                        return this.layout.cells[a]
                    },
                    setCellWidth: function(a, b) {
                        this.getCell(a).unitWidth =
                            b
                    },
                    getCellName: function(a) {
                        return "Cell " + a.index
                    },
                    canSort: function(a) {},
                    sort: function() {},
                    getSortAsc: function(a) {
                        a = void 0 == a ? this.sortInfo : a;
                        return Boolean(0 < a)
                    },
                    getSortIndex: function(a) {
                        a = void 0 == a ? this.sortInfo : a;
                        return Math.abs(a) - 1
                    },
                    setSortIndex: function(a, b) {
                        var c = a + 1;
                        void 0 != b ? c *= b ? 1 : -1 : this.getSortIndex() == a && (c = -this.sortInfo);
                        this.setSortInfo(c)
                    },
                    setSortInfo: function(a) {
                        this.canSort(a) && (this.sortInfo = a, this.sort(), this.update())
                    },
                    doKeyEvent: function(a) {
                        a.dispatch = "do" + a.type;
                        this.onKeyEvent(a)
                    },
                    _dispatch: function(a, b) {
                        return a in this ? this[a](b) : !1
                    },
                    dispatchKeyEvent: function(a) {
                        this._dispatch(a.dispatch, a)
                    },
                    dispatchContentEvent: function(a) {
                        this.edit.dispatchEvent(a) || a.sourceView.dispatchContentEvent(a) || this._dispatch(a.dispatch, a)
                    },
                    dispatchHeaderEvent: function(a) {
                        a.sourceView.dispatchHeaderEvent(a) || this._dispatch("doheader" + a.type, a)
                    },
                    dokeydown: function(a) {
                        this.onKeyDown(a)
                    },
                    doclick: function(a) {
                        if (a.cellNode) this.onCellClick(a);
                        else this.onRowClick(a)
                    },
                    dodblclick: function(a) {
                        if (a.cellNode) this.onCellDblClick(a);
                        else this.onRowDblClick(a)
                    },
                    docontextmenu: function(a) {
                        if (a.cellNode) this.onCellContextMenu(a);
                        else this.onRowContextMenu(a)
                    },
                    doheaderclick: function(a) {
                        if (a.cellNode) this.onHeaderCellClick(a);
                        else this.onHeaderClick(a)
                    },
                    doheaderdblclick: function(a) {
                        if (a.cellNode) this.onHeaderCellDblClick(a);
                        else this.onHeaderDblClick(a)
                    },
                    doheadercontextmenu: function(a) {
                        if (a.cellNode) this.onHeaderCellContextMenu(a);
                        else this.onHeaderContextMenu(a)
                    },
                    doStartEdit: function(a, b) {
                        this.onStartEdit(a, b)
                    },
                    doApplyCellEdit: function(a,
                        b, c) {
                        this.onApplyCellEdit(a, b, c)
                    },
                    doCancelEdit: function(a) {
                        this.onCancelEdit(a)
                    },
                    doApplyEdit: function(a) {
                        this.onApplyEdit(a)
                    },
                    addRow: function() {
                        this.updateRowCount(this.get("rowCount") + 1)
                    },
                    removeSelectedRows: function() {
                        this.allItemsSelected ? this.updateRowCount(0) : this.updateRowCount(Math.max(0, this.get("rowCount") - this.selection.getSelected().length));
                        this.selection.clear()
                    }
                });
                k.markupFactory = function(a, b, c, d) {
                    var e = function(a) {
                        a = z.attr(a, "width") || "auto";
                        "auto" != a && ("em" != a.slice(-2) && "%" != a.slice(-1)) &&
                            (a = parseInt(a, 10) + "px");
                        return a
                    };
                    !a.structure && "table" == b.nodeName.toLowerCase() && (a.structure = E("\x3e colgroup", b).map(function(a) {
                        var b = z.attr(a, "span"),
                            b = {
                                noscroll: "true" == z.attr(a, "noscroll") ? !0 : !1,
                                __span: b ? parseInt(b, 10) : 1,
                                cells: []
                            };
                        z.hasAttr(a, "width") && (b.width = e(a));
                        return b
                    }), a.structure.length || a.structure.push({
                        __span: Infinity,
                        cells: []
                    }), E("thead \x3e tr", b).forEach(function(b, c) {
                        var g = 0,
                            l = 0,
                            f, n = null;
                        E("\x3e th", b).map(function(b) {
                            n ? g >= f + n.__span && (l++, f += n.__span, n = a.structure[l]) : (f =
                                0, n = a.structure[0]);
                            var h = {
                                name: y.trim(z.attr(b, "name") || b.innerHTML),
                                colSpan: parseInt(z.attr(b, "colspan") || 1, 10),
                                type: y.trim(z.attr(b, "cellType") || ""),
                                id: y.trim(z.attr(b, "id") || "")
                            };
                            g += h.colSpan;
                            var k = z.attr(b, "rowspan");
                            k && (h.rowSpan = k);
                            z.hasAttr(b, "width") && (h.width = e(b));
                            z.hasAttr(b, "relWidth") && (h.relWidth = window.parseInt(z.attr(b, "relWidth"), 10));
                            z.hasAttr(b, "hidden") && (h.hidden = "true" == z.attr(b, "hidden") || !0 === z.attr(b, "hidden"));
                            d && d(b, h);
                            h.type = h.type ? y.getObject(h.type) : m.grid.cells.Cell;
                            h.type && h.type.markupFactory && h.type.markupFactory(b, h);
                            n.cells[c] || (n.cells[c] = []);
                            n.cells[c].push(h)
                        })
                    }));
                    return new c(a, b)
                };
                return k
            })
        },
        "dojox/grid/_Events": function() {
            define(["dojo/keys", "dojo/dom-class", "dojo/_base/declare", "dojo/_base/event", "dojo/_base/sniff"], function(p, m, k, f, d) {
                return k("dojox.grid._Events", null, {
                    cellOverClass: "dojoxGridCellOver",
                    onKeyEvent: function(b) {
                        this.dispatchKeyEvent(b)
                    },
                    onContentEvent: function(b) {
                        this.dispatchContentEvent(b)
                    },
                    onHeaderEvent: function(b) {
                        this.dispatchHeaderEvent(b)
                    },
                    onStyleRow: function(b) {
                        b.customClasses += (b.odd ? " dojoxGridRowOdd" : "") + (b.selected ? " dojoxGridRowSelected" : "") + (b.over ? " dojoxGridRowOver" : "");
                        this.focus.styleRow(b);
                        this.edit.styleRow(b)
                    },
                    onKeyDown: function(b) {
                        if (!b.altKey && !b.metaKey) {
                            var d;
                            switch (b.keyCode) {
                                case p.ESCAPE:
                                    this.edit.cancel();
                                    break;
                                case p.ENTER:
                                    if (!this.edit.isEditing()) {
                                        d = this.focus.getHeaderIndex();
                                        if (0 <= d) {
                                            this.setSortIndex(d);
                                            break
                                        } else this.selection.clickSelect(this.focus.rowIndex, dojo.isCopyKey(b), b.shiftKey);
                                        f.stop(b)
                                    }
                                    b.shiftKey ||
                                        (d = this.edit.isEditing(), this.edit.apply(), d || this.edit.setEditCell(this.focus.cell, this.focus.rowIndex));
                                    this.edit.isEditing() || ((this.focus.focusView || this.views.views[0]).content.decorateEvent(b), this.onRowClick(b), f.stop(b));
                                    break;
                                case p.SPACE:
                                    if (!this.edit.isEditing()) {
                                        d = this.focus.getHeaderIndex();
                                        if (0 <= d) {
                                            this.setSortIndex(d);
                                            break
                                        } else this.selection.clickSelect(this.focus.rowIndex, dojo.isCopyKey(b), b.shiftKey), this.focus._focusifyCellNode(!0), this.focus.setFocusCell(this.focus.cell, this.focus.rowIndex);
                                        f.stop(b)
                                    }
                                    break;
                                case p.TAB:
                                    this.focus[b.shiftKey ? "previousKey" : "nextKey"](b);
                                    break;
                                case p.LEFT_ARROW:
                                case p.RIGHT_ARROW:
                                    if (!this.edit.isEditing()) {
                                        var a = b.keyCode;
                                        f.stop(b);
                                        d = this.focus.getHeaderIndex();
                                        0 <= d && b.shiftKey && b.ctrlKey ? this.focus.colSizeAdjust(b, d, 5 * (a == p.LEFT_ARROW ? -1 : 1)) : (b = a == p.LEFT_ARROW ? 1 : -1, this.isLeftToRight() && (b *= -1), this.focus.move(0, b))
                                    }
                                    break;
                                case p.UP_ARROW:
                                    !this.edit.isEditing() && 0 !== this.focus.rowIndex && (f.stop(b), this.focus.move(-1, 0));
                                    break;
                                case p.DOWN_ARROW:
                                    !this.edit.isEditing() &&
                                        this.focus.rowIndex + 1 != this.rowCount && (f.stop(b), this.focus.move(1, 0));
                                    break;
                                case p.PAGE_UP:
                                    !this.edit.isEditing() && 0 !== this.focus.rowIndex && (f.stop(b), this.focus.rowIndex != this.scroller.firstVisibleRow + 1 ? this.focus.move(this.scroller.firstVisibleRow - this.focus.rowIndex, 0) : (this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex - 1)), this.focus.move(this.scroller.firstVisibleRow - this.scroller.lastVisibleRow + 1, 0)));
                                    break;
                                case p.PAGE_DOWN:
                                    !this.edit.isEditing() && this.focus.rowIndex + 1 != this.rowCount &&
                                        (f.stop(b), this.focus.rowIndex != this.scroller.lastVisibleRow - 1 ? this.focus.move(this.scroller.lastVisibleRow - this.focus.rowIndex - 1, 0) : (this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex + 1)), this.focus.move(this.scroller.lastVisibleRow - this.scroller.firstVisibleRow - 1, 0)))
                            }
                        }
                    },
                    onMouseOver: function(b) {
                        -1 == b.rowIndex ? this.onHeaderCellMouseOver(b) : this.onCellMouseOver(b)
                    },
                    onMouseOut: function(b) {
                        -1 == b.rowIndex ? this.onHeaderCellMouseOut(b) : this.onCellMouseOut(b)
                    },
                    onMouseDown: function(b) {
                        -1 ==
                            b.rowIndex ? this.onHeaderCellMouseDown(b) : this.onCellMouseDown(b)
                    },
                    onMouseOverRow: function(b) {
                        this.rows.isOver(b.rowIndex) || (this.rows.setOverRow(b.rowIndex), -1 == b.rowIndex ? this.onHeaderMouseOver(b) : this.onRowMouseOver(b))
                    },
                    onMouseOutRow: function(b) {
                        if (this.rows.isOver(-1)) this.onHeaderMouseOut(b);
                        else this.rows.isOver(-2) || (this.rows.setOverRow(-2), this.onRowMouseOut(b))
                    },
                    onMouseDownRow: function(b) {
                        if (-1 != b.rowIndex) this.onRowMouseDown(b)
                    },
                    onCellMouseOver: function(b) {
                        b.cellNode && m.add(b.cellNode,
                            this.cellOverClass)
                    },
                    onCellMouseOut: function(b) {
                        b.cellNode && m.remove(b.cellNode, this.cellOverClass)
                    },
                    onCellMouseDown: function(b) {},
                    onCellClick: function(b) {
                        this._click[0] = this._click[1];
                        this._click[1] = b;
                        this.edit.isEditCell(b.rowIndex, b.cellIndex) || this.focus.setFocusCell(b.cell, b.rowIndex);
                        1 < this._click.length && null == this._click[0] && this._click.shift();
                        this.onRowClick(b)
                    },
                    onCellDblClick: function(b) {
                        var e;
                        e = 1 < this._click.length && d("ie") ? this._click[1] : 1 < this._click.length && this._click[0].rowIndex !=
                            this._click[1].rowIndex ? this._click[0] : b;
                        this.focus.setFocusCell(e.cell, e.rowIndex);
                        this.edit.setEditCell(e.cell, e.rowIndex);
                        this.onRowDblClick(b)
                    },
                    onCellContextMenu: function(b) {
                        this.onRowContextMenu(b)
                    },
                    onCellFocus: function(b, d) {
                        this.edit.cellFocus(b, d)
                    },
                    onRowClick: function(b) {
                        this.edit.rowClick(b);
                        this.selection.clickSelectEvent(b)
                    },
                    onRowDblClick: function(b) {},
                    onRowMouseOver: function(b) {},
                    onRowMouseOut: function(b) {},
                    onRowMouseDown: function(b) {},
                    onRowContextMenu: function(b) {
                        f.stop(b)
                    },
                    onHeaderMouseOver: function(b) {},
                    onHeaderMouseOut: function(b) {},
                    onHeaderCellMouseOver: function(b) {
                        b.cellNode && m.add(b.cellNode, this.cellOverClass)
                    },
                    onHeaderCellMouseOut: function(b) {
                        b.cellNode && m.remove(b.cellNode, this.cellOverClass)
                    },
                    onHeaderCellMouseDown: function(b) {},
                    onHeaderClick: function(b) {},
                    onHeaderCellClick: function(b) {
                        this.setSortIndex(b.cell.index);
                        this.onHeaderClick(b)
                    },
                    onHeaderDblClick: function(b) {},
                    onHeaderCellDblClick: function(b) {
                        this.onHeaderDblClick(b)
                    },
                    onHeaderCellContextMenu: function(b) {
                        this.onHeaderContextMenu(b)
                    },
                    onHeaderContextMenu: function(b) {
                        this.headerMenu || f.stop(b)
                    },
                    onStartEdit: function(b, d) {},
                    onApplyCellEdit: function(b, d, a) {},
                    onCancelEdit: function(b) {},
                    onApplyEdit: function(b) {},
                    onCanSelect: function(b) {
                        return !0
                    },
                    onCanDeselect: function(b) {
                        return !0
                    },
                    onSelected: function(b) {
                        this.updateRowStyles(b)
                    },
                    onDeselected: function(b) {
                        this.updateRowStyles(b)
                    },
                    onSelectionChanged: function() {}
                })
            })
        },
        "dojox/grid/_Scroller": function() {
            define(["dijit/registry", "dojo/_base/declare", "dojo/_base/lang", "./util", "dojo/_base/html"],
                function(p, m, k, f, d) {
                    var b = function(a) {
                            a && dojo.forEach(p.toArray(), function(b) {
                                b.domNode && d.isDescendant(b.domNode, a, !0) && b.destroy()
                            })
                        },
                        e = function(a, b) {
                            for (var e = [], c = 0, f; f = a.childNodes[c];) {
                                c++;
                                var k = d.byId(f);
                                (k && k.tagName ? k.tagName.toLowerCase() : "") == b && e.push(f)
                            }
                            return e
                        };
                    return m("dojox.grid._Scroller", null, {
                        constructor: function(a) {
                            this.setContentNodes(a);
                            this.pageHeights = [];
                            this.pageNodes = [];
                            this.stack = []
                        },
                        rowCount: 0,
                        defaultRowHeight: 32,
                        keepRows: 100,
                        contentNode: null,
                        scrollboxNode: null,
                        defaultPageHeight: 0,
                        keepPages: 10,
                        pageCount: 0,
                        windowHeight: 0,
                        firstVisibleRow: 0,
                        lastVisibleRow: 0,
                        averageRowHeight: 0,
                        page: 0,
                        pageTop: 0,
                        init: function(a, b, d) {
                            switch (arguments.length) {
                                case 3:
                                    this.rowsPerPage = d;
                                case 2:
                                    this.keepRows = b;
                                case 1:
                                    this.rowCount = a
                            }
                            this.defaultPageHeight = (0 < this.grid.rowHeight ? this.grid.rowHeight : this.defaultRowHeight) * this.rowsPerPage;
                            this.pageCount = this._getPageCount(this.rowCount, this.rowsPerPage);
                            this.setKeepInfo(this.keepRows);
                            this.invalidate();
                            this.scrollboxNode && (this.scrollboxNode.scrollTop =
                                0, this.scroll(0), this.scrollboxNode.onscroll = k.hitch(this, "onscroll"))
                        },
                        _getPageCount: function(a, b) {
                            return a ? Math.ceil(a / b) || 1 : 0
                        },
                        destroy: function() {
                            this.invalidateNodes();
                            delete this.contentNodes;
                            delete this.contentNode;
                            delete this.scrollboxNode
                        },
                        setKeepInfo: function(a) {
                            this.keepRows = a;
                            this.keepPages = !this.keepRows ? this.keepPages : Math.max(Math.ceil(this.keepRows / this.rowsPerPage), 2)
                        },
                        setContentNodes: function(a) {
                            this.colCount = (this.contentNodes = a) ? this.contentNodes.length : 0;
                            this.pageNodes = [];
                            for (a =
                                0; a < this.colCount; a++) this.pageNodes[a] = []
                        },
                        getDefaultNodes: function() {
                            return this.pageNodes[0] || []
                        },
                        invalidate: function() {
                            this._invalidating = !0;
                            this.invalidateNodes();
                            this.pageHeights = [];
                            this.height = this.pageCount ? (this.pageCount - 1) * this.defaultPageHeight + this.calcLastPageHeight() : 0;
                            this.resize();
                            this._invalidating = !1
                        },
                        updateRowCount: function(a) {
                            this.invalidateNodes();
                            this.rowCount = a;
                            a = this.pageCount;
                            0 === a && (this.height = 1);
                            this.pageCount = this._getPageCount(this.rowCount, this.rowsPerPage);
                            if (this.pageCount <
                                a)
                                for (a -= 1; a >= this.pageCount; a--) this.height -= this.getPageHeight(a), delete this.pageHeights[a];
                            else this.pageCount > a && (this.height += this.defaultPageHeight * (this.pageCount - a - 1) + this.calcLastPageHeight());
                            this.resize()
                        },
                        pageExists: function(a) {
                            return Boolean(this.getDefaultPageNode(a))
                        },
                        measurePage: function(a) {
                            return this.grid.rowHeight ? ((a + 1) * this.rowsPerPage > this.rowCount ? this.rowCount - a * this.rowsPerPage : this.rowsPerPage) * this.grid.rowHeight : (a = this.getDefaultPageNode(a)) && a.innerHTML ? a.offsetHeight :
                                void 0
                        },
                        positionPage: function(a, b) {
                            for (var d = 0; d < this.colCount; d++) this.pageNodes[d][a].style.top = b + "px"
                        },
                        repositionPages: function(a) {
                            for (var b = this.getDefaultNodes(), d = 0, c = 0; c < this.stack.length; c++) d = Math.max(this.stack[c], d);
                            var e = (c = b[a]) ? this.getPageNodePosition(c) + this.getPageHeight(a) : 0;
                            for (a += 1; a <= d; a++) {
                                if (c = b[a]) {
                                    if (this.getPageNodePosition(c) == e) break;
                                    this.positionPage(a, e)
                                }
                                e += this.getPageHeight(a)
                            }
                        },
                        installPage: function(a) {
                            for (var b = 0; b < this.colCount; b++) this.contentNodes[b].appendChild(this.pageNodes[b][a])
                        },
                        preparePage: function(a, b) {
                            for (var d = b ? this.popPage() : null, c = 0; c < this.colCount; c++) {
                                var e = this.pageNodes[c],
                                    f = null === d ? this.createPageNode() : this.invalidatePageNode(d, e);
                                f.pageIndex = a;
                                e[a] = f
                            }
                        },
                        renderPage: function(a) {
                            var b = [],
                                d;
                            for (d = 0; d < this.colCount; d++) b[d] = this.pageNodes[d][a];
                            d = 0;
                            for (a *= this.rowsPerPage; d < this.rowsPerPage && a < this.rowCount; d++, a++) this.renderRow(a, b)
                        },
                        removePage: function(a) {
                            var b = 0;
                            for (a *= this.rowsPerPage; b < this.rowsPerPage; b++, a++) this.removeRow(a)
                        },
                        destroyPage: function(a) {
                            for (var b =
                                    0; b < this.colCount; b++) {
                                var e = this.invalidatePageNode(a, this.pageNodes[b]);
                                e && d.destroy(e)
                            }
                        },
                        pacify: function(a) {},
                        pacifying: !1,
                        pacifyTicks: 200,
                        setPacifying: function(a) {
                            this.pacifying != a && (this.pacifying = a, this.pacify(this.pacifying))
                        },
                        startPacify: function() {
                            this.startPacifyTicks = (new Date).getTime()
                        },
                        doPacify: function() {
                            var a = (new Date).getTime() - this.startPacifyTicks > this.pacifyTicks;
                            this.setPacifying(!0);
                            this.startPacify();
                            return a
                        },
                        endPacify: function() {
                            this.setPacifying(!1)
                        },
                        resize: function() {
                            this.scrollboxNode &&
                                (this.windowHeight = this.scrollboxNode.clientHeight);
                            for (var a = 0; a < this.colCount; a++) f.setStyleHeightPx(this.contentNodes[a], Math.max(1, this.height));
                            a = !this._invalidating;
                            if (!a) {
                                var b = this.grid.get("autoHeight");
                                "number" == typeof b && b <= Math.min(this.rowsPerPage, this.rowCount) && (a = !0)
                            }
                            a && this.needPage(this.page, this.pageTop);
                            a = this.page < this.pageCount - 1 ? this.rowsPerPage : this.rowCount % this.rowsPerPage || this.rowsPerPage;
                            b = this.getPageHeight(this.page);
                            this.averageRowHeight = 0 < b && 0 < a ? b / a : 0
                        },
                        calcLastPageHeight: function() {
                            if (!this.pageCount) return 0;
                            var a = (this.rowCount % this.rowsPerPage || this.rowsPerPage) * this.defaultRowHeight;
                            return this.pageHeights[this.pageCount - 1] = a
                        },
                        updateContentHeight: function(a) {
                            this.height += a;
                            this.resize()
                        },
                        updatePageHeight: function(a, b, d) {
                            if (this.pageExists(a)) {
                                var c = this.getPageHeight(a),
                                    e = this.measurePage(a);
                                void 0 === e && (e = c);
                                this.pageHeights[a] = e;
                                if (c != e) {
                                    this.updateContentHeight(e - c);
                                    var f = this.grid.get("autoHeight");
                                    "number" == typeof f && f > this.rowCount || !0 === f && !b ? d ? (b = this.grid.viewsNode.style, b.height = parseInt(b.height) +
                                        e - c + "px", this.repositionPages(a)) : this.grid.sizeChange() : this.repositionPages(a)
                                }
                                return e
                            }
                            return 0
                        },
                        rowHeightChanged: function(a, b) {
                            this.updatePageHeight(Math.floor(a / this.rowsPerPage), !1, b)
                        },
                        invalidateNodes: function() {
                            for (; this.stack.length;) this.destroyPage(this.popPage())
                        },
                        createPageNode: function() {
                            var a = document.createElement("div");
                            d.attr(a, "role", "presentation");
                            a.style.position = "absolute";
                            a.style[this.grid.isLeftToRight() ? "left" : "right"] = "0";
                            return a
                        },
                        getPageHeight: function(a) {
                            a = this.pageHeights[a];
                            return void 0 !== a ? a : this.defaultPageHeight
                        },
                        pushPage: function(a) {
                            return this.stack.push(a)
                        },
                        popPage: function() {
                            return this.stack.shift()
                        },
                        findPage: function(a) {
                            for (var b = 0, d = 0, c = 0; b < this.pageCount && !(c = this.getPageHeight(b), d + c >= a); b++, d += c);
                            this.page = b;
                            this.pageTop = d
                        },
                        buildPage: function(a, b, d) {
                            this.preparePage(a, b);
                            this.positionPage(a, d);
                            this.installPage(a);
                            this.renderPage(a);
                            this.pushPage(a)
                        },
                        needPage: function(a, b) {
                            var d = this.getPageHeight(a);
                            this.pageExists(a) ? this.positionPage(a, b) : (this.buildPage(a, !this.grid._autoHeight && this.keepPages && this.stack.length >= this.keepPages, b), d = this.updatePageHeight(a, !0));
                            return d
                        },
                        onscroll: function() {
                            this.scroll(this.scrollboxNode.scrollTop)
                        },
                        scroll: function(a) {
                            this.grid.scrollTop = a;
                            if (this.colCount) {
                                this.startPacify();
                                this.findPage(a);
                                for (var b = this.height, d = this.getScrollBottom(a), c = this.page, e = this.pageTop; c < this.pageCount && (0 > d || e < d); c++) e += this.needPage(c, e);
                                this.firstVisibleRow = this.getFirstVisibleRow(this.page, this.pageTop, a);
                                this.lastVisibleRow = this.getLastVisibleRow(c -
                                    1, e, d);
                                b != this.height && this.repositionPages(c - 1);
                                this.endPacify()
                            }
                        },
                        getScrollBottom: function(a) {
                            return 0 <= this.windowHeight ? a + this.windowHeight : -1
                        },
                        processNodeEvent: function(a, b) {
                            for (var d = a.target; d && d != b && d.parentNode && d.parentNode.parentNode != b;) d = d.parentNode;
                            if (!d || !d.parentNode || d.parentNode.parentNode != b) return !1;
                            a.topRowIndex = d.parentNode.pageIndex * this.rowsPerPage;
                            var c = a.topRowIndex,
                                e;
                            a: {
                                e = 0;
                                for (var f, k = d.parentNode; f = k.childNodes[e++];)
                                    if (f == d) {
                                        e -= 1;
                                        break a
                                    }
                                e = -1
                            }
                            a.rowIndex = c + e;
                            a.rowTarget =
                                d;
                            return !0
                        },
                        processEvent: function(a) {
                            return this.processNodeEvent(a, this.contentNode)
                        },
                        renderRow: function(a, b) {},
                        removeRow: function(a) {},
                        getDefaultPageNode: function(a) {
                            return this.getDefaultNodes()[a]
                        },
                        positionPageNode: function(a, b) {},
                        getPageNodePosition: function(a) {
                            return a.offsetTop
                        },
                        invalidatePageNode: function(a, d) {
                            var e = d[a];
                            e && (delete d[a], this.removePage(a, e), b(e), e.innerHTML = "");
                            return e
                        },
                        getPageRow: function(a) {
                            return a * this.rowsPerPage
                        },
                        getLastPageRow: function(a) {
                            return Math.min(this.rowCount,
                                this.getPageRow(a + 1)) - 1
                        },
                        getFirstVisibleRow: function(a, b, d) {
                            if (!this.pageExists(a)) return 0;
                            var c = this.getPageRow(a),
                                f = this.getDefaultNodes();
                            a = e(f[a], "div");
                            for (var f = 0, k = a.length; f < k && b < d; f++, c++) b += a[f].offsetHeight;
                            return c ? c - 1 : c
                        },
                        getLastVisibleRow: function(a, b, d) {
                            if (!this.pageExists(a)) return 0;
                            var c = this.getDefaultNodes(),
                                f = this.getLastPageRow(a);
                            a = e(c[a], "div");
                            for (c = a.length - 1; 0 <= c && b > d; c--, f--) b -= a[c].offsetHeight;
                            return f + 1
                        },
                        findTopRow: function(a) {
                            for (var b = this.getDefaultNodes(), b = e(b[this.page],
                                    "div"), d = 0, c = b.length, f = this.pageTop, k; d < c; d++)
                                if (k = b[d].offsetHeight, f += k, f >= a) return this.offset = k - (f - a), d + this.page * this.rowsPerPage;
                            return -1
                        },
                        findScrollTop: function(a) {
                            var b = Math.floor(a / this.rowsPerPage),
                                d = 0,
                                c;
                            for (c = 0; c < b; c++) d += this.getPageHeight(c);
                            this.pageTop = d;
                            this.page = b;
                            this.needPage(b, this.pageTop);
                            c = this.getDefaultNodes();
                            var f = e(c[b], "div"),
                                b = a - this.rowsPerPage * b;
                            c = 0;
                            for (a = f.length; c < a && c < b; c++) d += f[c].offsetHeight;
                            return d
                        },
                        dummy: 0
                    })
                })
        },
        "dojox/grid/util": function() {
            define(["../main",
                "dojo/_base/lang", "dojo/dom"
            ], function(p, m, k) {
                var f = m.getObject("grid.util", !0, p);
                f.na = "...";
                f.rowIndexTag = "gridRowIndex";
                f.gridViewTag = "gridView";
                f.fire = function(d, b, e) {
                    var a = d && b && d[b];
                    return a && (e ? a.apply(d, e) : d[b]())
                };
                f.setStyleHeightPx = function(d, b) {
                    if (0 <= b) {
                        var e = d.style,
                            a = b + "px";
                        d && e.height != a && (e.height = a)
                    }
                };
                f.mouseEvents = "mouseover mouseout mousedown mouseup click dblclick contextmenu".split(" ");
                f.keyEvents = ["keyup", "keydown", "keypress"];
                f.funnelEvents = function(d, b, e, a) {
                    a = a ? a : f.mouseEvents.concat(f.keyEvents);
                    for (var n = 0, l = a.length; n < l; n++) b.connect(d, "on" + a[n], e)
                };
                f.removeNode = function(d) {
                    (d = k.byId(d)) && d.parentNode && d.parentNode.removeChild(d);
                    return d
                };
                f.arrayCompare = function(d, b) {
                    for (var e = 0, a = d.length; e < a; e++)
                        if (d[e] != b[e]) return !1;
                    return d.length == b.length
                };
                f.arrayInsert = function(d, b, e) {
                    d.length <= b ? d[b] = e : d.splice(b, 0, e)
                };
                f.arrayRemove = function(d, b) {
                    d.splice(b, 1)
                };
                f.arraySwap = function(d, b, e) {
                    var a = d[b];
                    d[b] = d[e];
                    d[e] = a
                };
                return f
            })
        },
        "dojox/grid/_Layout": function() {
            define("dojo/_base/kernel ../main dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/dom-geometry ./cells ./_RowSelector".split(" "),
                function(p, m, k, f, d, b) {
                    return k("dojox.grid._Layout", null, {
                        constructor: function(b) {
                            this.grid = b
                        },
                        cells: [],
                        structure: null,
                        defaultWidth: "6em",
                        moveColumn: function(b, a, d, l, c) {
                            var k = this.structure[b].cells[0],
                                m = this.structure[a].cells[0],
                                p = null,
                                q = p = 0;
                            b = 0;
                            for (var w; w = k[b]; b++)
                                if (w.index == d) {
                                    p = b;
                                    break
                                }
                            p = k.splice(p, 1)[0];
                            p.view = this.grid.views.views[a];
                            b = 0;
                            for (w = null; w = m[b]; b++)
                                if (w.index == l) {
                                    q = b;
                                    break
                                }
                            c || (q += 1);
                            m.splice(q, 0, p);
                            if (d = this.grid.getCell(this.grid.getSortIndex())) d._currentlySorted = this.grid.getSortAsc();
                            this.cells = [];
                            for (b = d = 0; a = this.structure[b]; b++)
                                for (l = 0; c = a.cells[l]; l++)
                                    for (k = 0; w = c[k]; k++) w.index = d, this.cells.push(w), "_currentlySorted" in w && (m = d + 1, m *= w._currentlySorted ? 1 : -1, this.grid.sortInfo = m, delete w._currentlySorted), d++;
                            f.forEach(this.cells, function(a) {
                                var b = a.markup[2].split(" ");
                                parseInt(b[1].substring(5)) != a.index && (b[1] = 'idx\x3d"' + a.index + '"', a.markup[2] = b.join(" "))
                            });
                            this.grid.setupHeaderMenu()
                        },
                        setColumnVisibility: function(d, a) {
                            var f = this.cells[d];
                            if (f.hidden == a) {
                                f.hidden = !a;
                                var l =
                                    f.view,
                                    c = l.viewWidth;
                                c && "auto" != c && (l._togglingColumn = b.getMarginBox(f.getHeaderNode()).w || 0);
                                l.update();
                                return !0
                            }
                            return !1
                        },
                        addCellDef: function(b, a, f) {
                            var l = this,
                                c = function(a) {
                                    var b = 0;
                                    1 < a.colSpan ? b = 0 : (b = a.width || l._defaultCellProps.width || l.defaultWidth, isNaN(b) || (b += "em"));
                                    return b
                                };
                            b = {
                                grid: this.grid,
                                subrow: b,
                                layoutIndex: a,
                                index: this.cells.length
                            };
                            if (f && f instanceof m.grid.cells._Base) return a = d.clone(f), b.unitWidth = c(a._props), a = d.mixin(a, this._defaultCellProps, f._props, b);
                            a = f.type || f.cellType ||
                                this._defaultCellProps.type || this._defaultCellProps.cellType || m.grid.cells.Cell;
                            d.isString(a) && (a = d.getObject(a));
                            b.unitWidth = c(f);
                            return new a(d.mixin({}, this._defaultCellProps, f, b))
                        },
                        addRowDef: function(b, a) {
                            for (var d = [], l = 0, c = 0, k = !0, m = 0, p; p = a[m]; m++) p = this.addCellDef(b, m, p), d.push(p), this.cells.push(p), k && p.relWidth ? l += p.relWidth : p.width && (p = p.width, "string" == typeof p && "%" == p.slice(-1) ? c += window.parseInt(p, 10) : "auto" == p && (k = !1));
                            l && k && f.forEach(d, function(a) {
                                a.relWidth && (a.width = a.unitWidth = a.relWidth /
                                    l * (100 - c) + "%")
                            });
                            return d
                        },
                        addRowsDef: function(b) {
                            var a = [];
                            if (d.isArray(b))
                                if (d.isArray(b[0]))
                                    for (var f = 0, l; b && (l = b[f]); f++) a.push(this.addRowDef(f, l));
                                else a.push(this.addRowDef(0, b));
                            return a
                        },
                        addViewDef: function(b) {
                            this._defaultCellProps = b.defaultCell || {};
                            b.width && "auto" == b.width && delete b.width;
                            return d.mixin({}, b, {
                                cells: this.addRowsDef(b.rows || b.cells)
                            })
                        },
                        setStructure: function(b) {
                            this.fieldIndex = 0;
                            this.cells = [];
                            var a = this.structure = [];
                            if (this.grid.rowSelector) {
                                var f = {
                                    type: m._scopeName + ".grid._RowSelector"
                                };
                                if (d.isString(this.grid.rowSelector)) {
                                    var l = this.grid.rowSelector;
                                    "false" == l ? f = null : "true" != l && (f.width = l)
                                } else this.grid.rowSelector || (f = null);
                                f && a.push(this.addViewDef(f))
                            }
                            f = function(a) {
                                return null !== a && d.isObject(a) && ("cells" in a || "rows" in a || "type" in a && !("name" in a || "field" in a || "get" in a))
                            };
                            if (d.isArray(b)) {
                                for (var l = !1, c = 0, k; k = b[c]; c++)
                                    if (f(k)) {
                                        l = !0;
                                        break
                                    }
                                if (l)
                                    for (c = 0; k = b[c]; c++) d.isArray(k) && (d.isArray(k[0]) || "name" in k[0] || "field" in k[0] || "get" in k[0]) ? a.push(this.addViewDef({
                                            cells: k
                                        })) :
                                        f(k) && a.push(this.addViewDef(k));
                                else a.push(this.addViewDef({
                                    cells: b
                                }))
                            } else f(b) && a.push(this.addViewDef(b));
                            this.cellCount = this.cells.length;
                            this.grid.setupHeaderMenu()
                        }
                    })
                })
        },
        "dojox/grid/cells": function() {
            define(["../main", "./cells/_base"], function(p) {
                return p.grid.cells
            })
        },
        "dojox/grid/cells/_base": function() {
            define("dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/event dojo/_base/connect dojo/_base/array dojo/_base/sniff dojo/dom dojo/dom-attr dojo/dom-construct dijit/_Widget ../util".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s) {
                    var t = m("dojox.grid._DeferredTextWidget", c, {
                            deferred: null,
                            _destroyOnRemove: !0,
                            postCreate: function() {
                                this.deferred && this.deferred.addBoth(k.hitch(this, function(a) {
                                    this.domNode && (this.domNode.innerHTML = a)
                                }))
                            }
                        }),
                        u = function() {
                            setTimeout(k.hitch.apply(p, arguments), 0)
                        },
                        q = m("dojox.grid.cells._Base", null, {
                            styles: "",
                            classes: "",
                            editable: !1,
                            alwaysEditing: !1,
                            formatter: null,
                            defaultValue: "...",
                            value: null,
                            hidden: !1,
                            noresize: !1,
                            draggable: !0,
                            _valueProp: "value",
                            _formatPending: !1,
                            constructor: function(a) {
                                this._props =
                                    a || {};
                                k.mixin(this, a);
                                void 0 === this.draggable && (this.draggable = !0)
                            },
                            _defaultFormat: function(a, b) {
                                var c = this.grid.formatterScope || this,
                                    d = this.formatter;
                                d && (c && "string" == typeof d) && (d = this.formatter = c[d]);
                                c = a != this.defaultValue && d ? d.apply(c, b) : a;
                                if ("undefined" == typeof c) return this.defaultValue;
                                c && c.addBoth && (c = new t({
                                    deferred: c
                                }, l.create("span", {
                                    innerHTML: this.defaultValue
                                })));
                                return c && c.declaredClass && c.startup ? "\x3cdiv class\x3d'dojoxGridStubNode' linkWidget\x3d'" + c.id + "' cellIdx\x3d'" + this.index +
                                    "'\x3e" + this.defaultValue + "\x3c/div\x3e" : c
                            },
                            format: function(a, b) {
                                var c = this.grid.edit.info,
                                    d = this.get ? this.get(a, b) : this.value || this.defaultValue,
                                    d = d && d.replace && this.grid.escapeHTMLInData ? d.replace(/&(?![a-z0-9]{1,8}\;)/ig, "\x26amp;").replace(/</g, "\x26lt;") : d;
                                return this.editable && (this.alwaysEditing || c.rowIndex == a && c.cell == this) ? this.formatEditing(c.value ? c.value : d, a) : this._defaultFormat(d, [d, a, this])
                            },
                            formatEditing: function(a, b) {},
                            getNode: function(a) {
                                return this.view.getCellNode(a, this.index)
                            },
                            getHeaderNode: function() {
                                return this.view.getHeaderCellNode(this.index)
                            },
                            getEditNode: function(a) {
                                return (this.getNode(a) || 0).firstChild || 0
                            },
                            canResize: function() {
                                var a = this.unitWidth;
                                return a && "auto" !== a
                            },
                            isFlex: function() {
                                var a = this.unitWidth;
                                return a && k.isString(a) && ("auto" == a || "%" == a.slice(-1))
                            },
                            applyEdit: function(a, b) {
                                this.getNode(b) && this.grid.edit.applyCellEdit(a, this, b)
                            },
                            cancelEdit: function(a) {
                                this.grid.doCancelEdit(a)
                            },
                            _onEditBlur: function(a) {
                                this.grid.edit.isEditCell(a, this.index) && this.grid.edit.apply()
                            },
                            registerOnBlur: function(a, b) {
                                this.commitOnBlur && d.connect(a, "onblur", function(a) {
                                    setTimeout(k.hitch(this, "_onEditBlur", b), 250)
                                })
                            },
                            needFormatNode: function(a, b) {
                                this._formatPending = !0;
                                u(this, "_formatNode", a, b)
                            },
                            cancelFormatNode: function() {
                                this._formatPending = !1
                            },
                            _formatNode: function(b, c) {
                                this._formatPending && (this._formatPending = !1, e("ie") || a.setSelectable(this.grid.domNode, !0), this.formatNode(this.getEditNode(c), b, c))
                            },
                            formatNode: function(a, b, c) {
                                e("ie") ? u(this, "focus", c, a) : this.focus(c, a)
                            },
                            dispatchEvent: function(a,
                                b) {
                                if (a in this) return this[a](b)
                            },
                            getValue: function(a) {
                                return this.getEditNode(a)[this._valueProp]
                            },
                            setValue: function(a, b) {
                                var c = this.getEditNode(a);
                                c && (c[this._valueProp] = b)
                            },
                            focus: function(a, b) {
                                var c = b || this.getEditNode(a);
                                try {
                                    s.fire(c, "focus"), s.fire(c, "select")
                                } catch (d) {}
                            },
                            save: function(a) {
                                this.value = this.value || this.getValue(a)
                            },
                            restore: function(a) {
                                this.setValue(a, this.value)
                            },
                            _finish: function(b) {
                                a.setSelectable(this.grid.domNode, !1);
                                this.cancelFormatNode()
                            },
                            apply: function(a) {
                                this.applyEdit(this.getValue(a),
                                    a);
                                this._finish(a)
                            },
                            cancel: function(a) {
                                this.cancelEdit(a);
                                this._finish(a)
                            }
                        });
                    q.markupFactory = function(a, b) {
                        var c = k.trim(n.get(a, "formatter") || "");
                        c && (b.formatter = k.getObject(c) || c);
                        if (c = k.trim(n.get(a, "get") || "")) b.get = k.getObject(c);
                        c = function(b, c, d) {
                            var e = k.trim(n.get(a, b) || "");
                            e && (c[d || b] = "false" != e.toLowerCase())
                        };
                        c("sortDesc", b);
                        c("editable", b);
                        c("alwaysEditing", b);
                        c("noresize", b);
                        c("draggable", b);
                        if (c = k.trim(n.get(a, "loadingText") || n.get(a, "defaultValue") || "")) b.defaultValue = c;
                        c = function(b,
                            c, d) {
                            var e = k.trim(n.get(a, b) || "") || void 0;
                            e && (c[d || b] = e)
                        };
                        c("styles", b);
                        c("headerStyles", b);
                        c("cellStyles", b);
                        c("classes", b);
                        c("headerClasses", b);
                        c("cellClasses", b)
                    };
                    var w = q.Cell = m("dojox.grid.cells.Cell", q, {
                        constructor: function() {
                            this.keyFilter = this.keyFilter
                        },
                        keyFilter: null,
                        formatEditing: function(a, b) {
                            this.needFormatNode(a, b);
                            return '\x3cinput class\x3d"dojoxGridInput" type\x3d"text" value\x3d"' + a + '"\x3e'
                        },
                        formatNode: function(a, b, c) {
                            this.inherited(arguments);
                            this.registerOnBlur(a, c)
                        },
                        doKey: function(a) {
                            this.keyFilter &&
                                -1 == String.fromCharCode(a.charCode).search(this.keyFilter) && f.stop(a)
                        },
                        _finish: function(a) {
                            this.inherited(arguments);
                            var b = this.getEditNode(a);
                            try {
                                s.fire(b, "blur")
                            } catch (c) {}
                        }
                    });
                    w.markupFactory = function(a, b) {
                        q.markupFactory(a, b);
                        var c = k.trim(n.get(a, "keyFilter") || "");
                        c && (b.keyFilter = RegExp(c))
                    };
                    (q.RowIndex = m("dojox.grid.cells.RowIndex", w, {
                        name: "Row",
                        postscript: function() {
                            this.editable = !1
                        },
                        get: function(a) {
                            return a + 1
                        }
                    })).markupFactory = function(a, b) {
                        w.markupFactory(a, b)
                    };
                    (q.Select = m("dojox.grid.cells.Select",
                        w, {
                            options: null,
                            values: null,
                            returnIndex: -1,
                            constructor: function(a) {
                                this.values = this.values || this.options
                            },
                            formatEditing: function(a, b) {
                                this.needFormatNode(a, b);
                                for (var c = ['\x3cselect class\x3d"dojoxGridSelect"\x3e'], d = 0, e, f; void 0 !== (e = this.options[d]) && void 0 !== (f = this.values[d]); d++) f = f.replace ? f.replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;") : f, e = e.replace ? e.replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;") : e, c.push("\x3coption", a == f ? " selected" : "", ' value\x3d"' + f + '"', "\x3e", e, "\x3c/option\x3e");
                                c.push("\x3c/select\x3e");
                                return c.join("")
                            },
                            _defaultFormat: function(a, c) {
                                var d = this.inherited(arguments);
                                if (!this.formatter && this.values && this.options) {
                                    var e = b.indexOf(this.values, d);
                                    0 <= e && (d = this.options[e])
                                }
                                return d
                            },
                            getValue: function(a) {
                                var b = this.getEditNode(a);
                                if (b) return a = b.selectedIndex, b = b.options[a], -1 < this.returnIndex ? a : b.value || b.innerHTML
                            }
                        })).markupFactory = function(a, b) {
                        w.markupFactory(a, b);
                        var c = k.trim(n.get(a, "options") || "");
                        if (c) {
                            var d = c.split(",");
                            d[0] != c && (b.options = d)
                        }
                        if (c = k.trim(n.get(a,
                                "values") || "")) d = c.split(","), d[0] != c && (b.values = d)
                    };
                    var h = q.AlwaysEdit = m("dojox.grid.cells.AlwaysEdit", w, {
                        alwaysEditing: !0,
                        _formatNode: function(a, b) {
                            this.formatNode(this.getEditNode(b), a, b)
                        },
                        applyStaticValue: function(a) {
                            var b = this.grid.edit;
                            b.applyCellEdit(this.getValue(a), this, a);
                            b.start(this, a, !0)
                        }
                    });
                    h.markupFactory = function(a, b) {
                        w.markupFactory(a, b)
                    };
                    (q.Bool = m("dojox.grid.cells.Bool", h, {
                        _valueProp: "checked",
                        formatEditing: function(a, b) {
                            return '\x3cinput class\x3d"dojoxGridInput" type\x3d"checkbox"' +
                                (a ? ' checked\x3d"checked"' : "") + ' style\x3d"width: auto" /\x3e'
                        },
                        doclick: function(a) {
                            "INPUT" == a.target.tagName && this.applyStaticValue(a.rowIndex)
                        }
                    })).markupFactory = function(a, b) {
                        h.markupFactory(a, b)
                    };
                    return q
                })
        },
        "dojox/grid/_RowSelector": function() {
            define(["dojo/_base/declare", "./_View"], function(p, m) {
                return p("dojox.grid._RowSelector", m, {
                    defaultWidth: "2em",
                    noscroll: !0,
                    padBorderWidth: 2,
                    buildRendering: function() {
                        this.inherited("buildRendering", arguments);
                        this.scrollboxNode.style.overflow = "hidden";
                        this.headerNode.style.visibility =
                            "hidden"
                    },
                    getWidth: function() {
                        return this.viewWidth || this.defaultWidth
                    },
                    buildRowContent: function(k, f) {
                        f.innerHTML = '\x3ctable class\x3d"dojoxGridRowbarTable" style\x3d"width:' + (this.contentWidth || 0) + 'px;height:1px;" border\x3d"0" cellspacing\x3d"0" cellpadding\x3d"0" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd class\x3d"dojoxGridRowbarInner"\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e'
                    },
                    renderHeader: function() {},
                    updateRow: function() {},
                    resize: function() {
                        this.adaptHeight()
                    },
                    adaptWidth: function() {
                        !("contentWidth" in
                            this) && (this.contentNode && 0 < this.contentNode.offsetWidth) && (this.contentWidth = this.contentNode.offsetWidth - this.padBorderWidth)
                    },
                    doStyleRowNode: function(k, f) {
                        var d = ["dojoxGridRowbar dojoxGridNonNormalizedCell"];
                        this.grid.rows.isOver(k) && d.push("dojoxGridRowbarOver");
                        this.grid.selection.isSelected(k) && d.push("dojoxGridRowbarSelected");
                        f.className = d.join(" ")
                    },
                    domouseover: function(k) {
                        this.grid.onMouseOverRow(k)
                    },
                    domouseout: function(k) {
                        if (!this.isIntraRowEvent(k)) this.grid.onMouseOutRow(k)
                    }
                })
            })
        },
        "dojox/grid/_View": function() {
            define("dojo dijit/registry ../main dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/connect dojo/_base/sniff dojo/query dojo/_base/window dojo/text!./resources/View.html dojo/dnd/Source dijit/_Widget dijit/_TemplatedMixin dojox/html/metrics ./util dojo/_base/html ./_Builder dojo/dnd/Avatar dojo/dnd/Manager".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g) {
                    c = f("dojox.grid._View", [t, u], {
                        defaultWidth: "18em",
                        viewWidth: "",
                        templateString: c,
                        classTag: "dojoxGrid",
                        marginBottom: 0,
                        rowPad: 2,
                        _togglingColumn: -1,
                        _headerBuilderClass: r._HeaderBuilder,
                        _contentBuilderClass: r._ContentBuilder,
                        postMixInProperties: function() {
                            this.rowNodes = {}
                        },
                        postCreate: function() {
                            this.connect(this.scrollboxNode, "onscroll", "doscroll");
                            w.funnelEvents(this.contentNode, this, "doContentEvent", "mouseover mouseout click dblclick contextmenu mousedown".split(" "));
                            w.funnelEvents(this.headerNode, this, "doHeaderEvent", "dblclick mouseover mouseout mousemove mousedown click contextmenu".split(" "));
                            this.content = new this._contentBuilderClass(this);
                            this.header = new this._headerBuilderClass(this);
                            this.grid.isLeftToRight() || (this.headerNodeContainer.style.width = "")
                        },
                        destroy: function() {
                            h.destroy(this.headerNode);
                            delete this.headerNode;
                            for (var a in this.rowNodes) this._cleanupRowWidgets(this.rowNodes[a]), h.destroy(this.rowNodes[a]);
                            this.rowNodes = {};
                            this.source && this.source.destroy();
                            this.inherited(arguments)
                        },
                        focus: function() {
                            a("ie") || a("webkit") || a("opera") ? this.hiddenFocusNode.focus() : this.scrollboxNode.focus()
                        },
                        setStructure: function(a) {
                            a = this.structure = a;
                            a.width && !isNaN(a.width) ? this.viewWidth = a.width + "em" : this.viewWidth = a.width || (a.noscroll ? "auto" : this.viewWidth);
                            this._onBeforeRow = a.onBeforeRow || function() {};
                            this._onAfterRow = a.onAfterRow || function() {};
                            if (this.noscroll = a.noscroll) this.scrollboxNode.style.overflow = "hidden";
                            this.simpleStructure = Boolean(1 == a.cells.length);
                            this.testFlexCells();
                            this.updateStructure()
                        },
                        _cleanupRowWidgets: function(a) {
                            a && d.forEach(n("[widgetId]", a).map(m.byNode), function(a) {
                                a._destroyOnRemove ? (a.destroy(), delete a) : a.domNode && a.domNode.parentNode && a.domNode.parentNode.removeChild(a.domNode)
                            })
                        },
                        onBeforeRow: function(a, b) {
                            this._onBeforeRow(a, b);
                            0 <= a && this._cleanupRowWidgets(this.getRowNode(a))
                        },
                        onAfterRow: function(a, b, c) {
                            this._onAfterRow(a, b, c);
                            var e = this.grid;
                            d.forEach(n(".dojoxGridStubNode", c), function(a) {
                                if (a && a.parentNode) {
                                    var b = a.getAttribute("linkWidget"),
                                        c = window.parseInt(h.attr(a, "cellIdx"), 10);
                                    e.getCell(c);
                                    (b = m.byId(b)) ? (a.parentNode.replaceChild(b.domNode, a), b._started || b.startup(), p.destroy(a)) : a.innerHTML = ""
                                }
                            }, this)
                        },
                        testFlexCells: function() {
                            this.flexCells = !1;
                            for (var a = 0, b; b = this.structure.cells[a]; a++)
                                for (var c = 0, d; d = b[c]; c++) d.view = this, this.flexCells = this.flexCells || d.isFlex();
                            return this.flexCells
                        },
                        updateStructure: function() {
                            this.header.update();
                            this.content.update()
                        },
                        getScrollbarWidth: function() {
                            var a = this.hasVScrollbar(),
                                b = h.style(this.scrollboxNode,
                                    "overflow");
                            this.noscroll || !b || "hidden" == b ? a = !1 : "scroll" == b && (a = !0);
                            return a ? q.getScrollbar().w : 0
                        },
                        getColumnsWidth: function() {
                            var a = this.headerContentNode;
                            return a && a.firstChild ? a.firstChild.offsetWidth || h.style(a.firstChild, "width") : 0
                        },
                        setColumnsWidth: function(a) {
                            this.headerContentNode.firstChild.style.width = a + "px";
                            this.viewWidth && (this.viewWidth = a + "px")
                        },
                        getWidth: function() {
                            return this.viewWidth || this.getColumnsWidth() + this.getScrollbarWidth() + "px"
                        },
                        getContentWidth: function() {
                            return Math.max(0,
                                h._getContentBox(this.domNode).w - this.getScrollbarWidth()) + "px"
                        },
                        render: function() {
                            this.scrollboxNode.style.height = "";
                            this.renderHeader();
                            0 <= this._togglingColumn && (this.setColumnsWidth(this.getColumnsWidth() - this._togglingColumn), this._togglingColumn = -1);
                            var c = this.grid.layout.cells,
                                d = b.hitch(this, function(a, b) {
                                    !this.grid.isLeftToRight() && (b = !b);
                                    for (var d = b ? -1 : 1, e = this.header.getCellNodeIndex(a) + d, g = c[e]; g && g.getHeaderNode() && "none" == g.getHeaderNode().style.display;) e += d, g = c[e];
                                    return g ? g.getHeaderNode() :
                                        null
                                });
                            if (this.grid.columnReordering && this.simpleStructure) {
                                this.source && this.source.destroy();
                                this.bottomMarker && h.destroy(this.bottomMarker);
                                this.bottomMarker = h.byId("dojoxGrid_bottomMarker");
                                this.topMarker && h.destroy(this.topMarker);
                                this.topMarker = h.byId("dojoxGrid_topMarker");
                                this.bottomMarker || (this.bottomMarker = h.create("div", {
                                    id: "dojoxGrid_bottomMarker",
                                    "class": "dojoxGridColPlaceBottom"
                                }, l.body()), this._hide(this.bottomMarker), this.topMarker = h.create("div", {
                                        id: "dojoxGrid_topMarker",
                                        "class": "dojoxGridColPlaceTop"
                                    },
                                    l.body()), this._hide(this.topMarker));
                                this.arrowDim = h.contentBox(this.bottomMarker);
                                var g = h.contentBox(this.headerContentNode.firstChild.rows[0]).h;
                                this.source = new s(this.headerContentNode.firstChild.rows[0], {
                                    horizontal: !0,
                                    accept: ["gridColumn_" + this.grid.id],
                                    viewIndex: this.index,
                                    generateText: !1,
                                    onMouseDown: b.hitch(this, function(b) {
                                        this.header.decorateEvent(b);
                                        if ((this.header.overRightResizeArea(b) || this.header.overLeftResizeArea(b)) && this.header.canResize(b) && !this.header.moveable) this.header.beginColumnResize(b);
                                        else {
                                            if (this.grid.headerMenu) this.grid.headerMenu.onCancel(!0);
                                            b.button === (9 > a("ie") ? 1 : 0) && s.prototype.onMouseDown.call(this.source, b)
                                        }
                                    }),
                                    onMouseOver: b.hitch(this, function(a) {
                                        var b = this.source;
                                        b._getChildByEvent(a) && s.prototype.onMouseOver.apply(b, arguments)
                                    }),
                                    _markTargetAnchor: b.hitch(this, function(a) {
                                        var b = this.source;
                                        if (!(b.current == b.targetAnchor && b.before == a)) {
                                            b.targetAnchor && d(b.targetAnchor, b.before) && b._removeItemClass(d(b.targetAnchor, b.before), b.before ? "After" : "Before");
                                            s.prototype._markTargetAnchor.call(b,
                                                a);
                                            var c = a ? b.targetAnchor : d(b.targetAnchor, b.before);
                                            a = 0;
                                            c || (c = b.targetAnchor, a = h.contentBox(c).w + this.arrowDim.w / 2 + 2);
                                            c = h.position(c, !0);
                                            a = Math.floor(c.x - this.arrowDim.w / 2 + a);
                                            h.style(this.bottomMarker, "visibility", "visible");
                                            h.style(this.topMarker, "visibility", "visible");
                                            h.style(this.bottomMarker, {
                                                left: a + "px",
                                                top: g + c.y + "px"
                                            });
                                            h.style(this.topMarker, {
                                                left: a + "px",
                                                top: c.y - this.arrowDim.h + "px"
                                            });
                                            b.targetAnchor && d(b.targetAnchor, b.before) && b._addItemClass(d(b.targetAnchor, b.before), b.before ? "After" : "Before")
                                        }
                                    }),
                                    _unmarkTargetAnchor: b.hitch(this, function() {
                                        var a = this.source;
                                        a.targetAnchor && (a.targetAnchor && d(a.targetAnchor, a.before) && a._removeItemClass(d(a.targetAnchor, a.before), a.before ? "After" : "Before"), this._hide(this.bottomMarker), this._hide(this.topMarker), s.prototype._unmarkTargetAnchor.call(a))
                                    }),
                                    destroy: b.hitch(this, function() {
                                        e.disconnect(this._source_conn);
                                        e.unsubscribe(this._source_sub);
                                        s.prototype.destroy.call(this.source);
                                        this.bottomMarker && (h.destroy(this.bottomMarker), delete this.bottomMarker);
                                        this.topMarker && (h.destroy(this.topMarker), delete this.topMarker)
                                    }),
                                    onDndCancel: b.hitch(this, function() {
                                        s.prototype.onDndCancel.call(this.source);
                                        this._hide(this.bottomMarker);
                                        this._hide(this.topMarker)
                                    })
                                });
                                this._source_conn = e.connect(this.source, "onDndDrop", this, "_onDndDrop");
                                this._source_sub = e.subscribe("/dnd/drop/before", this, "_onDndDropBefore");
                                this.source.startup()
                            }
                        },
                        _hide: function(a) {
                            h.style(a, {
                                top: "-10000px",
                                visibility: "hidden"
                            })
                        },
                        _onDndDropBefore: function(a, b, c) {
                            g.manager().target === this.source &&
                                (this.source._targetNode = this.source.targetAnchor, this.source._beforeTarget = this.source.before, b = this.grid.views.views, a = b[a.viewIndex], b = b[this.index], b != a && (a.convertColPctToFixed(), b.convertColPctToFixed()))
                        },
                        _onDndDrop: function(a, b, c) {
                            if (g.manager().target !== this.source) g.manager().source === this.source && (this._removingColumn = !0);
                            else {
                                this._hide(this.bottomMarker);
                                this._hide(this.topMarker);
                                c = h.marginBox(b[0]).w;
                                if (a.viewIndex !== this.index) {
                                    var d = this.grid.views.views,
                                        e = d[a.viewIndex],
                                        d = d[this.index];
                                    e.viewWidth && "auto" != e.viewWidth && e.setColumnsWidth(e.getColumnsWidth() - c);
                                    d.viewWidth && "auto" != d.viewWidth && d.setColumnsWidth(d.getColumnsWidth())
                                }
                                c = this.source._targetNode;
                                e = this.source._beforeTarget;
                                !this.grid.isLeftToRight() && (e = !e);
                                var d = this.grid.layout,
                                    f = this.index;
                                delete this.source._targetNode;
                                delete this.source._beforeTarget;
                                d.moveColumn(a.viewIndex, f, b[0] ? h.attr(b[0], "idx") : null, c ? h.attr(c, "idx") : null, e)
                            }
                        },
                        renderHeader: function() {
                            this.headerContentNode.innerHTML = this.header.generateHtml(this._getHeaderContent);
                            this.flexCells && (this.contentWidth = this.getContentWidth(), this.headerContentNode.firstChild.style.width = this.contentWidth);
                            w.fire(this, "onAfterRow", [-1, this.structure.cells, this.headerContentNode])
                        },
                        _getHeaderContent: function(a) {
                            var b = a.name || a.grid.getCellName(a);
                            /^\s+$/.test(b) && (b = "\x26nbsp;");
                            var c = ['\x3cdiv class\x3d"dojoxGridSortNode'];
                            a.index != a.grid.getSortIndex() ? c.push('"\x3e') : c = c.concat([" ", 0 < a.grid.sortInfo ? "dojoxGridSortUp" : "dojoxGridSortDown", '"\x3e\x3cdiv class\x3d"dojoxGridArrowButtonChar"\x3e',
                                0 < a.grid.sortInfo ? "\x26#9650;" : "\x26#9660;", '\x3c/div\x3e\x3cdiv class\x3d"dojoxGridArrowButtonNode" role\x3d"presentation"\x3e\x3c/div\x3e', '\x3cdiv class\x3d"dojoxGridColCaption"\x3e'
                            ]);
                            c = c.concat([b, "\x3c/div\x3e\x3c/div\x3e"]);
                            return c.join("")
                        },
                        resize: function() {
                            this.adaptHeight();
                            this.adaptWidth()
                        },
                        hasHScrollbar: function(a) {
                            var b = this._hasHScroll || !1;
                            if (void 0 == this._hasHScroll || a) this.noscroll ? this._hasHScroll = !1 : (a = h.style(this.scrollboxNode, "overflow"), this._hasHScroll = "hidden" == a ? !1 : "scroll" ==
                                a ? !0 : this.scrollboxNode.offsetWidth - this.getScrollbarWidth() < this.contentNode.offsetWidth);
                            b !== this._hasHScroll && this.grid.update();
                            return this._hasHScroll
                        },
                        hasVScrollbar: function(a) {
                            var b = this._hasVScroll || !1;
                            if (void 0 == this._hasVScroll || a) this.noscroll ? this._hasVScroll = !1 : (a = h.style(this.scrollboxNode, "overflow"), this._hasVScroll = "hidden" == a ? !1 : "scroll" == a ? !0 : this.scrollboxNode.scrollHeight > this.scrollboxNode.clientHeight);
                            b !== this._hasVScroll && this.grid.update();
                            return this._hasVScroll
                        },
                        convertColPctToFixed: function() {
                            var a = !1;
                            this.grid.initialWidth = "";
                            var b = n("th", this.headerContentNode),
                                c = d.map(b, function(b, c) {
                                    var d = b.style.width;
                                    h.attr(b, "vIdx", c);
                                    if (d && "%" == d.slice(-1)) a = !0;
                                    else if (d && "px" == d.slice(-2)) return window.parseInt(d, 10);
                                    return h.contentBox(b).w
                                });
                            return a ? (d.forEach(this.grid.layout.cells, function(a, b) {
                                if (a.view == this) {
                                    var d = a.view.getHeaderCellNode(a.index);
                                    if (d && h.hasAttr(d, "vIdx")) {
                                        var e = window.parseInt(h.attr(d, "vIdx"));
                                        this.setColWidth(b, c[e]);
                                        h.removeAttr(d, "vIdx")
                                    }
                                }
                            }, this), !0) : !1
                        },
                        adaptHeight: function(a) {
                            if (!this.grid._autoHeight) {
                                var b =
                                    this.domNode.style.height && parseInt(this.domNode.style.height.replace(/px/, ""), 10) || this.domNode.clientHeight;
                                if (!a && (a = this.noscroll)) a: {
                                    for (var c = 0; c < this.grid.views.views.length; ++c)
                                        if (a = this.grid.views.views[c], a !== this && a.hasHScrollbar()) {
                                            a = !0;
                                            break a
                                        }
                                    a = !1
                                }
                                a && (b -= q.getScrollbar().h);
                                w.setStyleHeightPx(this.scrollboxNode, b)
                            }
                            this.hasVScrollbar(!0)
                        },
                        adaptWidth: function() {
                            this.flexCells && (this.contentWidth = this.getContentWidth(), this.headerContentNode.firstChild.style.width = this.contentWidth);
                            var a =
                                this.scrollboxNode.offsetWidth - this.getScrollbarWidth();
                            this._removingColumn ? (a = Math.min(a, this.getColumnsWidth()) + "px", this._removingColumn = !1) : a = Math.max(a, this.getColumnsWidth()) + "px";
                            this.contentNode.style.width = a;
                            this.hasHScrollbar(!0)
                        },
                        setSize: function(a, b) {
                            var c = this.domNode.style,
                                d = this.headerNode.style;
                            a && (c.width = a, d.width = a);
                            c.height = 0 <= b ? b + "px" : ""
                        },
                        renderRow: function(a) {
                            var b = this.createRowNode(a);
                            this.buildRow(a, b);
                            return b
                        },
                        createRowNode: function(a) {
                            var b = document.createElement("div");
                            b.className = this.classTag + "Row";
                            this instanceof k.grid._RowSelector ? h.attr(b, "role", "presentation") : (h.attr(b, "role", "row"), "none" != this.grid.selectionMode && b.setAttribute("aria-selected", "false"));
                            b[w.gridViewTag] = this.id;
                            b[w.rowIndexTag] = a;
                            return this.rowNodes[a] = b
                        },
                        buildRow: function(a, b) {
                            this.buildRowContent(a, b);
                            this.styleRow(a, b)
                        },
                        buildRowContent: function(a, b) {
                            b.innerHTML = this.content.generateHtml(a, a);
                            this.flexCells && this.contentWidth && (b.firstChild.style.width = this.contentWidth);
                            w.fire(this,
                                "onAfterRow", [a, this.structure.cells, b])
                        },
                        rowRemoved: function(a) {
                            0 <= a && this._cleanupRowWidgets(this.getRowNode(a));
                            this.grid.edit.save(this, a);
                            delete this.rowNodes[a]
                        },
                        getRowNode: function(a) {
                            return this.rowNodes[a]
                        },
                        getCellNode: function(a, b) {
                            var c = this.getRowNode(a);
                            if (c) return this.content.getCellNode(c, b)
                        },
                        getHeaderCellNode: function(a) {
                            if (this.headerContentNode) return this.header.getCellNode(this.headerContentNode, a)
                        },
                        styleRow: function(a, b) {
                            b._style = void 0 == b.style.cssText ? b.getAttribute("style") :
                                b.style.cssText;
                            this.styleRowNode(a, b)
                        },
                        styleRowNode: function(a, b) {
                            b && this.doStyleRowNode(a, b)
                        },
                        doStyleRowNode: function(a, b) {
                            this.grid.styleRowNode(a, b)
                        },
                        updateRow: function(a) {
                            var b = this.getRowNode(a);
                            b && (b.style.height = "", this.buildRow(a, b));
                            return b
                        },
                        updateRowStyles: function(a) {
                            this.styleRowNode(a, this.getRowNode(a))
                        },
                        lastTop: 0,
                        firstScroll: 0,
                        _nativeScroll: !1,
                        doscroll: function(b) {
                            if (13 <= a("ff") || a("chrome")) this._nativeScroll = !0;
                            b = this.grid.isLeftToRight();
                            if (2 > this.firstScroll) {
                                if (!b && 1 == this.firstScroll ||
                                    b && 0 === this.firstScroll) {
                                    var c = h.marginBox(this.headerNodeContainer);
                                    a("ie") ? this.headerNodeContainer.style.width = c.w + this.getScrollbarWidth() + "px" : a("mozilla") && (this.headerNodeContainer.style.width = c.w - this.getScrollbarWidth() + "px", this.scrollboxNode.scrollLeft = b ? this.scrollboxNode.clientWidth - this.scrollboxNode.scrollWidth : this.scrollboxNode.scrollWidth - this.scrollboxNode.clientWidth)
                                }
                                this.firstScroll++
                            }
                            this.headerNode.scrollLeft = this.scrollboxNode.scrollLeft;
                            b = this.scrollboxNode.scrollTop;
                            b !==
                                this.lastTop && this.grid.scrollTo(b);
                            this._nativeScroll = !1
                        },
                        setScrollTop: function(a) {
                            this.lastTop = a;
                            this._nativeScroll || (this.scrollboxNode.scrollTop = a);
                            return this.scrollboxNode.scrollTop
                        },
                        doContentEvent: function(a) {
                            if (this.content.decorateEvent(a)) this.grid.onContentEvent(a)
                        },
                        doHeaderEvent: function(a) {
                            if (this.header.decorateEvent(a)) this.grid.onHeaderEvent(a)
                        },
                        dispatchContentEvent: function(a) {
                            return this.content.dispatchEvent(a)
                        },
                        dispatchHeaderEvent: function(a) {
                            return this.header.dispatchEvent(a)
                        },
                        setColWidth: function(a, b) {
                            this.grid.setCellWidth(a, b + "px")
                        },
                        update: function() {
                            if (this.domNode) {
                                this.content.update();
                                this.grid.update();
                                var a = this.scrollboxNode.scrollLeft;
                                this.scrollboxNode.scrollLeft = a;
                                this.headerNode.scrollLeft = a
                            }
                        }
                    });
                    var y = f("dojox.grid._GridAvatar", B, {
                            construct: function() {
                                var a = l.doc,
                                    b = a.createElement("table");
                                b.cellPadding = b.cellSpacing = "0";
                                b.className = "dojoxGridDndAvatar";
                                b.style.position = "absolute";
                                b.style.zIndex = 1999;
                                b.style.margin = "0px";
                                var c = a.createElement("tbody"),
                                    d = a.createElement("tr"),
                                    e = a.createElement("td"),
                                    f = a.createElement("td");
                                d.className = "dojoxGridDndAvatarItem";
                                f.className = "dojoxGridDndAvatarItemImage";
                                f.style.width = "16px";
                                var k = this.manager.source;
                                if (k.creator) k = k._normalizedCreator(k.getItem(this.manager.nodes[0].id).data, "avatar").node;
                                else {
                                    var k = this.manager.nodes[0].cloneNode(!0),
                                        n, m;
                                    "tr" == k.tagName.toLowerCase() ? (n = a.createElement("table"), m = a.createElement("tbody"), m.appendChild(k), n.appendChild(m), k = n) : "th" == k.tagName.toLowerCase() && (n = a.createElement("table"), m =
                                        a.createElement("tbody"), a = a.createElement("tr"), n.cellPadding = n.cellSpacing = "0", a.appendChild(k), m.appendChild(a), n.appendChild(m), k = n)
                                }
                                k.id = "";
                                e.appendChild(k);
                                d.appendChild(f);
                                d.appendChild(e);
                                h.style(d, "opacity", 0.9);
                                c.appendChild(d);
                                b.appendChild(c);
                                this.node = b;
                                b = g.manager();
                                this.oldOffsetY = b.OFFSET_Y;
                                b.OFFSET_Y = 1
                            },
                            destroy: function() {
                                g.manager().OFFSET_Y = this.oldOffsetY;
                                this.inherited(arguments)
                            }
                        }),
                        v = g.manager().makeAvatar;
                    g.manager().makeAvatar = function() {
                        return void 0 !== this.source.viewIndex &&
                            !h.hasClass(l.body(), "dijit_a11y") ? new y(this) : v.call(g.manager())
                    };
                    return c
                })
        },
        "dojox/html/metrics": function() {
            define("dojo/_base/kernel dojo/_base/lang dojo/_base/sniff dojo/ready dojo/_base/unload dojo/_base/window dojo/dom-geometry".split(" "), function(p, m, k, f, d, b, e) {
                var a = m.getObject("dojox.html.metrics", !0),
                    n = m.getObject("dojox");
                a.getFontMeasurements = function() {
                    var a = {
                            "1em": 0,
                            "1ex": 0,
                            "100%": 0,
                            "12pt": 0,
                            "16px": 0,
                            "xx-small": 0,
                            "x-small": 0,
                            small: 0,
                            medium: 0,
                            large: 0,
                            "x-large": 0,
                            "xx-large": 0
                        },
                        c;
                    k("ie") &&
                        (c = b.doc.documentElement.style.fontSize || "", c || (b.doc.documentElement.style.fontSize = "100%"));
                    var d = b.doc.createElement("div"),
                        e = d.style;
                    e.position = "absolute";
                    e.left = "-100px";
                    e.top = "0";
                    e.width = "30px";
                    e.height = "1000em";
                    e.borderWidth = "0";
                    e.margin = "0";
                    e.padding = "0";
                    e.outline = "0";
                    e.lineHeight = "1";
                    e.overflow = "hidden";
                    b.body().appendChild(d);
                    for (var f in a) e.fontSize = f, a[f] = 16 * Math.round(12 * d.offsetHeight / 16) / 12 / 1E3;
                    k("ie") && (b.doc.documentElement.style.fontSize = c);
                    b.body().removeChild(d);
                    return a
                };
                var l =
                    null;
                a.getCachedFontMeasurements = function(b) {
                    if (b || !l) l = a.getFontMeasurements();
                    return l
                };
                var c = null,
                    s = {};
                a.getTextBox = function(a, d, f) {
                    var l, k;
                    if (c) l = c;
                    else {
                        l = c = b.doc.createElement("div");
                        var g = b.doc.createElement("div");
                        g.appendChild(l);
                        k = g.style;
                        k.overflow = "scroll";
                        k.position = "absolute";
                        k.left = "0px";
                        k.top = "-10000px";
                        k.width = "1px";
                        k.height = "1px";
                        k.visibility = "hidden";
                        k.borderWidth = "0";
                        k.margin = "0";
                        k.padding = "0";
                        k.outline = "0";
                        b.body().appendChild(g)
                    }
                    l.className = "";
                    k = l.style;
                    k.borderWidth = "0";
                    k.margin =
                        "0";
                    k.padding = "0";
                    k.outline = "0";
                    if (1 < arguments.length && d)
                        for (var n in d) n in s || (k[n] = d[n]);
                    2 < arguments.length && f && (l.className = f);
                    l.innerHTML = a;
                    k = e.position(l);
                    k.w = l.parentNode.scrollWidth;
                    return k
                };
                var t = 16,
                    u = 16;
                a.getScrollbar = function() {
                    return {
                        w: t,
                        h: u
                    }
                };
                a._fontResizeNode = null;
                a.initOnFontResize = function(c) {
                    var d = a._fontResizeNode = b.doc.createElement("iframe");
                    c = d.style;
                    c.position = "absolute";
                    c.width = "5em";
                    c.height = "10em";
                    c.top = "-10000px";
                    c.display = "none";
                    k("ie") ? d.onreadystatechange = function() {
                        "complete" ==
                        d.contentWindow.document.readyState && (d.onresize = d.contentWindow.parent[n._scopeName].html.metrics._fontresize)
                    } : d.onload = function() {
                        d.contentWindow.onresize = d.contentWindow.parent[n._scopeName].html.metrics._fontresize
                    };
                    d.setAttribute("src", "javascript:'\x3chtml\x3e\x3chead\x3e\x3cscript\x3eif(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}\x3c/script\x3e\x3c/head\x3e\x3cbody\x3e\x3c/body\x3e\x3c/html\x3e'");
                    b.body().appendChild(d);
                    a.initOnFontResize = function() {}
                };
                a.onFontResize =
                    function() {};
                a._fontresize = function() {
                    a.onFontResize()
                };
                d.addOnUnload(function() {
                    var b = a._fontResizeNode;
                    b && (k("ie") && b.onresize ? b.onresize = null : b.contentWindow && b.contentWindow.onresize && (b.contentWindow.onresize = null), a._fontResizeNode = null)
                });
                f(function() {
                    try {
                        var c = b.doc.createElement("div");
                        c.style.cssText = "top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
                        b.body().appendChild(c);
                        t = c.offsetWidth - c.clientWidth;
                        u = c.offsetHeight - c.clientHeight;
                        b.body().removeChild(c);
                        delete c
                    } catch (d) {}
                    "fontSizeWatch" in p.config && p.config.fontSizeWatch && a.initOnFontResize()
                });
                return a
            })
        },
        "dojox/grid/_Builder": function() {
            define("../main dojo/_base/array dojo/_base/lang dojo/_base/window dojo/_base/event dojo/_base/sniff dojo/_base/connect dojo/dnd/Moveable dojox/html/metrics ./util dojo/_base/html dojo/dom-geometry".split(" "), function(p, m, k, f, d, b, e, a, n, l, c, s) {
                var t = p.grid,
                    u = function(a) {
                        for (; a && "TABLE" != a.tagName; a = a.parentNode);
                        return a
                    },
                    q = function(a) {
                        var b = a.toUpperCase();
                        return function(a) {
                            return a.tagName !=
                                b
                        }
                    },
                    w = l.rowIndexTag,
                    h = l.gridViewTag,
                    r = t._Builder = k.extend(function(a) {
                        a && (this.view = a, this.grid = a.grid)
                    }, {
                        view: null,
                        _table: '\x3ctable class\x3d"dojoxGridRowTable" border\x3d"0" cellspacing\x3d"0" cellpadding\x3d"0" role\x3d"presentation"',
                        getTableArray: function() {
                            var a = [this._table];
                            this.view.viewWidth && a.push([' style\x3d"width:', this.view.viewWidth, ';"'].join(""));
                            a.push("\x3e");
                            return a
                        },
                        generateCellMarkup: function(a, b, c, d) {
                            var e = [],
                                f;
                            d ? (f = a.index != a.grid.getSortIndex() ? "" : 0 < a.grid.sortInfo ? 'aria-sort\x3d"ascending"' :
                                'aria-sort\x3d"descending"', a.id || (a.id = this.grid.id + "Hdr" + a.index), f = ['\x3cth tabIndex\x3d"-1" aria-readonly\x3d"true" role\x3d"columnheader"', f, ' id\x3d"', a.id, '"']) : f = ['\x3ctd tabIndex\x3d"-1" role\x3d"gridcell"', this.grid.editable && !a.editable ? 'aria-readonly\x3d"true"' : ""];
                            a.colSpan && f.push(' colspan\x3d"', a.colSpan, '"');
                            a.rowSpan && f.push(' rowspan\x3d"', a.rowSpan, '"');
                            f.push(' class\x3d"dojoxGridCell ');
                            a.classes && f.push(a.classes, " ");
                            c && f.push(c, " ");
                            e.push(f.join(""));
                            e.push("");
                            f = ['" idx\x3d"',
                                a.index, '" style\x3d"'
                            ];
                            b && ";" != b[b.length - 1] && (b += ";");
                            f.push(a.styles, b || "", a.hidden ? "display:none;" : "");
                            a.unitWidth && f.push("width:", a.unitWidth, ";");
                            e.push(f.join(""));
                            e.push("");
                            f = ['"'];
                            a.attrs && f.push(" ", a.attrs);
                            f.push("\x3e");
                            e.push(f.join(""));
                            e.push("");
                            e.push(d ? "\x3c/th\x3e" : "\x3c/td\x3e");
                            return e
                        },
                        isCellNode: function(a) {
                            return Boolean(a && a != f.doc && c.attr(a, "idx"))
                        },
                        getCellNodeIndex: function(a) {
                            return a ? Number(c.attr(a, "idx")) : -1
                        },
                        getCellNode: function(a, b) {
                            for (var c = 0, d;
                                (d = a.firstChild &&
                                    ((a.firstChild.rows || 0)[c] || a.firstChild.childNodes[c])) && d.cells; c++)
                                for (var e = 0, f; f = d.cells[e]; e++)
                                    if (this.getCellNodeIndex(f) == b) return f;
                            return null
                        },
                        findCellTarget: function(a, b) {
                            for (var c = a; c && (!this.isCellNode(c) || c.offsetParent && h in c.offsetParent.parentNode && c.offsetParent.parentNode[h] != this.view.id) && c != b;) c = c.parentNode;
                            return c != b ? c : null
                        },
                        baseDecorateEvent: function(a) {
                            a.dispatch = "do" + a.type;
                            a.grid = this.grid;
                            a.sourceView = this.view;
                            a.cellNode = this.findCellTarget(a.target, a.rowNode);
                            a.cellIndex =
                                this.getCellNodeIndex(a.cellNode);
                            a.cell = 0 <= a.cellIndex ? this.grid.getCell(a.cellIndex) : null
                        },
                        findTarget: function(a, b) {
                            for (var c = a; c && c != this.domNode && (!(b in c) || h in c && c[h] != this.view.id);) c = c.parentNode;
                            return c != this.domNode ? c : null
                        },
                        findRowTarget: function(a) {
                            return this.findTarget(a, w)
                        },
                        isIntraNodeEvent: function(a) {
                            try {
                                return a.cellNode && a.relatedTarget && c.isDescendant(a.relatedTarget, a.cellNode)
                            } catch (b) {
                                return !1
                            }
                        },
                        isIntraRowEvent: function(a) {
                            try {
                                var b = a.relatedTarget && this.findRowTarget(a.relatedTarget);
                                return !b && -1 == a.rowIndex || b && a.rowIndex == b.gridRowIndex
                            } catch (c) {
                                return !1
                            }
                        },
                        dispatchEvent: function(a) {
                            return a.dispatch in this ? this[a.dispatch](a) : !1
                        },
                        domouseover: function(a) {
                            a.cellNode && a.cellNode != this.lastOverCellNode && (this.lastOverCellNode = a.cellNode, this.grid.onMouseOver(a));
                            this.grid.onMouseOverRow(a)
                        },
                        domouseout: function(a) {
                            if (a.cellNode && (a.cellNode == this.lastOverCellNode && !this.isIntraNodeEvent(a, this.lastOverCellNode)) && (this.lastOverCellNode = null, this.grid.onMouseOut(a), !this.isIntraRowEvent(a))) this.grid.onMouseOutRow(a)
                        },
                        domousedown: function(a) {
                            if (a.cellNode) this.grid.onMouseDown(a);
                            this.grid.onMouseDownRow(a)
                        },
                        _getTextDirStyle: function(a, b, c) {
                            return ""
                        }
                    });
                p = t._ContentBuilder = k.extend(function(a) {
                    r.call(this, a)
                }, r.prototype, {
                    update: function() {
                        this.prepareHtml()
                    },
                    prepareHtml: function() {
                        for (var a = this.grid.get, b = this.view.structure.cells, c = 0, d; d = b[c]; c++)
                            for (var e = 0, f; f = d[e]; e++) f.get = f.get || void 0 == f.value && a, f.markup = this.generateCellMarkup(f, f.cellStyles, f.cellClasses, !1), !this.grid.editable && f.editable && (this.grid.editable = !0)
                    },
                    generateHtml: function(a, b) {
                        var c = this.getTableArray(),
                            d, e = this.view.structure.cells,
                            f = this.grid.getItem(b);
                        l.fire(this.view, "onBeforeRow", [b, e]);
                        for (var h = 0, k; k = e[h]; h++)
                            if (!k.hidden && !k.header) {
                                c.push(!k.invisible ? "\x3ctr\x3e" : '\x3ctr class\x3d"dojoxGridInvisible"\x3e');
                                for (var n = 0, m, q, s; m = k[n]; n++) q = m.markup, d = m.customClasses = [], s = m.customStyles = [], q[5] = m.format(b, f), q[1] = d.join(" "), q[3] = s.join(";"), (d = m.textDir || this.grid.textDir) && (q[3] += this._getTextDirStyle(d, m, b)), c.push.apply(c, q);
                                c.push("\x3c/tr\x3e")
                            }
                        c.push("\x3c/table\x3e");
                        return c.join("")
                    },
                    decorateEvent: function(a) {
                        a.rowNode = this.findRowTarget(a.target);
                        if (!a.rowNode) return !1;
                        a.rowIndex = a.rowNode[w];
                        this.baseDecorateEvent(a);
                        a.cell = this.grid.getCell(a.cellIndex);
                        return !0
                    }
                });
                var B = t._HeaderBuilder = k.extend(function(a) {
                    this.moveable = null;
                    r.call(this, a)
                }, r.prototype, {
                    _skipBogusClicks: !1,
                    overResizeWidth: 4,
                    minColWidth: 1,
                    update: function() {
                        this.tableMap ? this.tableMap.mapRows(this.view.structure.cells) : this.tableMap = new t._TableMap(this.view.structure.cells)
                    },
                    generateHtml: function(a,
                        b) {
                        var c, d = this.getTableArray(),
                            e = this.view.structure.cells;
                        l.fire(this.view, "onBeforeRow", [-1, e]);
                        for (var f = 0, h; h = e[f]; f++)
                            if (!h.hidden) {
                                d.push(!h.invisible ? "\x3ctr\x3e" : '\x3ctr class\x3d"dojoxGridInvisible"\x3e');
                                for (var k = 0, n, m; n = h[k]; k++) n.customClasses = [], n.customStyles = [], this.view.simpleStructure && (n.draggable && (n.headerClasses ? -1 == n.headerClasses.indexOf("dojoDndItem") && (n.headerClasses += " dojoDndItem") : n.headerClasses = "dojoDndItem"), n.attrs ? -1 == n.attrs.indexOf("dndType\x3d'gridColumn_") &&
                                    (n.attrs += " dndType\x3d'gridColumn_" + this.grid.id + "'") : n.attrs = "dndType\x3d'gridColumn_" + this.grid.id + "'"), m = this.generateCellMarkup(n, n.headerStyles, n.headerClasses, !0), m[5] = void 0 != b ? b : a(n), m[3] = n.customStyles.join(";"), (c = n.textDir || this.grid.textDir) && (m[3] += this._getTextDirStyle(c, n, b)), m[1] = n.customClasses.join(" "), d.push(m.join(""));
                                d.push("\x3c/tr\x3e")
                            }
                        d.push("\x3c/table\x3e");
                        return d.join("")
                    },
                    getCellX: function(a) {
                        var b;
                        b = q("th");
                        for (var c = a.target; c && b(c); c = c.parentNode);
                        (b = c) ? (b = s.position(b),
                            a = a.clientX - b.x) : a = a.layerX;
                        return a
                    },
                    decorateEvent: function(a) {
                        this.baseDecorateEvent(a);
                        a.rowIndex = -1;
                        a.cellX = this.getCellX(a);
                        return !0
                    },
                    prepareResize: function(a, b) {
                        do {
                            var c = a.cellIndex;
                            a.cellNode = c ? a.cellNode.parentNode.cells[c + b] : null;
                            a.cellIndex = a.cellNode ? this.getCellNodeIndex(a.cellNode) : -1
                        } while (a.cellNode && "none" == a.cellNode.style.display);
                        return Boolean(a.cellNode)
                    },
                    canResize: function(a) {
                        if (!a.cellNode || 1 < a.cellNode.colSpan) return !1;
                        a = this.grid.getCell(a.cellIndex);
                        return !a.noresize && a.canResize()
                    },
                    overLeftResizeArea: function(a) {
                        if (c.hasClass(f.body(), "dojoDndMove")) return !1;
                        if (b("ie")) {
                            var d = a.target;
                            if (c.hasClass(d, "dojoxGridArrowButtonNode") || c.hasClass(d, "dojoxGridArrowButtonChar") || c.hasClass(d, "dojoxGridColCaption")) return !1
                        }
                        return this.grid.isLeftToRight() ? 0 < a.cellIndex && 0 < a.cellX && a.cellX < this.overResizeWidth && this.prepareResize(a, -1) : a.cellNode && 0 < a.cellX && a.cellX < this.overResizeWidth
                    },
                    overRightResizeArea: function(a) {
                        if (c.hasClass(f.body(), "dojoDndMove")) return !1;
                        if (b("ie")) {
                            var d =
                                a.target;
                            if (c.hasClass(d, "dojoxGridArrowButtonNode") || c.hasClass(d, "dojoxGridArrowButtonChar") || c.hasClass(d, "dojoxGridColCaption")) return !1
                        }
                        return this.grid.isLeftToRight() ? a.cellNode && a.cellX >= a.cellNode.offsetWidth - this.overResizeWidth : 0 < a.cellIndex && a.cellX >= a.cellNode.offsetWidth - this.overResizeWidth && this.prepareResize(a, -1)
                    },
                    domousemove: function(a) {
                        if (!this.moveable) {
                            var b = this.overRightResizeArea(a) ? "dojoxGridColResize" : this.overLeftResizeArea(a) ? "dojoxGridColResize" : "";
                            b && !this.canResize(a) &&
                                (b = "dojoxGridColNoResize");
                            c.toggleClass(a.sourceView.headerNode, "dojoxGridColNoResize", "dojoxGridColNoResize" == b);
                            c.toggleClass(a.sourceView.headerNode, "dojoxGridColResize", "dojoxGridColResize" == b);
                            b && d.stop(a)
                        }
                    },
                    domousedown: function(a) {
                        this.moveable || ((this.overRightResizeArea(a) || this.overLeftResizeArea(a)) && this.canResize(a) ? this.beginColumnResize(a) : (this.grid.onMouseDown(a), this.grid.onMouseOverRow(a)))
                    },
                    doclick: function(a) {
                        return this._skipBogusClicks ? (d.stop(a), !0) : !1
                    },
                    colResizeSetup: function(a,
                        d) {
                        var e = c.contentBox(a.sourceView.headerNode);
                        if (d) {
                            this.lineDiv = document.createElement("div");
                            var l = c.position(a.sourceView.headerNode, !0),
                                h = c.contentBox(a.sourceView.domNode),
                                k = a.pageX;
                            !this.grid.isLeftToRight() && 8 > b("ie") && (k -= n.getScrollbar().w);
                            c.style(this.lineDiv, {
                                top: l.y + "px",
                                left: k + "px",
                                height: h.h + e.h + "px"
                            });
                            c.addClass(this.lineDiv, "dojoxGridResizeColLine");
                            this.lineDiv._origLeft = k;
                            f.body().appendChild(this.lineDiv)
                        }
                        for (var l = [], h = this.tableMap.findOverlappingNodes(a.cellNode), k = 0, m; m = h[k]; k++) l.push({
                            node: m,
                            index: this.getCellNodeIndex(m),
                            width: m.offsetWidth
                        });
                        h = a.sourceView;
                        m = this.grid.isLeftToRight() ? 1 : -1;
                        for (var q = a.grid.views.views, k = [], s = h.idx + m, r; r = q[s]; s += m) k.push({
                            node: r.headerNode,
                            left: window.parseInt(r.headerNode.style.left)
                        });
                        m = h.headerContentNode.firstChild;
                        return {
                            scrollLeft: a.sourceView.headerNode.scrollLeft,
                            view: h,
                            node: a.cellNode,
                            index: a.cellIndex,
                            w: c.contentBox(a.cellNode).w,
                            vw: e.w,
                            table: m,
                            tw: c.contentBox(m).w,
                            spanners: l,
                            followers: k
                        }
                    },
                    beginColumnResize: function(b) {
                        this.moverDiv = document.createElement("div");
                        c.style(this.moverDiv, {
                            position: "absolute",
                            left: 0
                        });
                        f.body().appendChild(this.moverDiv);
                        c.addClass(this.grid.domNode, "dojoxGridColumnResizing");
                        var d = this.moveable = new a(this.moverDiv),
                            l = this.colResizeSetup(b, !0);
                        d.onMove = k.hitch(this, "doResizeColumn", l);
                        e.connect(d, "onMoveStop", k.hitch(this, function() {
                            this.endResizeColumn(l);
                            l.node.releaseCapture && l.node.releaseCapture();
                            this.moveable.destroy();
                            delete this.moveable;
                            this.moveable = null;
                            c.removeClass(this.grid.domNode, "dojoxGridColumnResizing")
                        }));
                        b.cellNode.setCapture && b.cellNode.setCapture();
                        d.onMouseDown(b)
                    },
                    doResizeColumn: function(a, b, d) {
                        var e = d.l,
                            e = {
                                deltaX: e,
                                w: a.w + (this.grid.isLeftToRight() ? e : -e),
                                vw: a.vw + e,
                                tw: a.tw + e
                            };
                        this.dragRecord = {
                            inDrag: a,
                            mover: b,
                            leftTop: d
                        };
                        e.w >= this.minColWidth && (b ? c.style(this.lineDiv, "left", this.lineDiv._origLeft + e.deltaX + "px") : this.doResizeNow(a, e))
                    },
                    endResizeColumn: function(a) {
                        if (this.dragRecord) {
                            var d = this.dragRecord.leftTop,
                                d = this.grid.isLeftToRight() ? d.l : -d.l,
                                d = d + (Math.max(a.w + d, this.minColWidth) - (a.w + d));
                            b("webkit") && a.spanners.length && (d += c._getPadBorderExtents(a.spanners[0].node).w);
                            this.doResizeNow(a, {
                                deltaX: d,
                                w: a.w + d,
                                vw: a.vw + d,
                                tw: a.tw + d
                            });
                            delete this.dragRecord
                        }
                        c.destroy(this.lineDiv);
                        c.destroy(this.moverDiv);
                        c.destroy(this.moverDiv);
                        delete this.moverDiv;
                        this._skipBogusClicks = !0;
                        a.view.update();
                        this._skipBogusClicks = !1;
                        this.grid.onResizeColumn(a.index)
                    },
                    doResizeNow: function(a, c) {
                        a.view.convertColPctToFixed();
                        if (a.view.flexCells && !a.view.testFlexCells()) {
                            var d = u(a.node);
                            d && (d.style.width = "")
                        }
                        for (var e,
                                f, d = 0; e = a.spanners[d]; d++) f = e.width + c.deltaX, 0 < f && (e.node.style.width = f + "px", a.view.setColWidth(e.index, f));
                        if (this.grid.isLeftToRight() || !b("ie"))
                            for (d = 0; e = a.followers[d]; d++) f = e.left + c.deltaX, e.node.style.left = f + "px";
                        a.node.style.width = c.w + "px";
                        a.view.setColWidth(a.index, c.w);
                        a.view.headerNode.style.width = c.vw + "px";
                        a.view.setColumnsWidth(c.tw);
                        this.grid.isLeftToRight() || (a.view.headerNode.scrollLeft = a.scrollLeft + c.deltaX)
                    }
                });
                t._TableMap = k.extend(function(a) {
                    this.mapRows(a)
                }, {
                    map: null,
                    mapRows: function(a) {
                        if (a.length) {
                            this.map = [];
                            var b;
                            for (b = 0; a[b]; b++) this.map[b] = [];
                            for (var c = 0; b = a[c]; c++)
                                for (var d = 0, e = 0, f, l; f = b[d]; d++) {
                                    for (; this.map[c][e];) e++;
                                    this.map[c][e] = {
                                        c: d,
                                        r: c
                                    };
                                    l = f.rowSpan || 1;
                                    f = f.colSpan || 1;
                                    for (var h = 0; h < l; h++)
                                        for (var k = 0; k < f; k++) this.map[c + h][e + k] = this.map[c][e];
                                    e += f
                                }
                        }
                    },
                    dumpMap: function() {
                        for (var a = 0, b; b = this.map[a]; a++)
                            for (var c = 0; b[c]; c++);
                    },
                    getMapCoords: function(a, b) {
                        for (var c = 0, d; d = this.map[c]; c++)
                            for (var e = 0, f; f = d[e]; e++)
                                if (f.c == b && f.r == a) return {
                                    j: c,
                                    i: e
                                };
                        return {
                            j: -1,
                            i: -1
                        }
                    },
                    getNode: function(a, b, c) {
                        return (a =
                            a && a.rows[b]) && a.cells[c]
                    },
                    _findOverlappingNodes: function(a, b, c) {
                        var d = [];
                        b = this.getMapCoords(b, c);
                        c = 0;
                        for (var e; e = this.map[c]; c++) c != b.j && (e = (e = e[b.i]) ? this.getNode(a, e.r, e.c) : null) && d.push(e);
                        return d
                    },
                    findOverlappingNodes: function(a) {
                        return this._findOverlappingNodes(u(a), 0 <= a.parentNode.rowIndex ? a.parentNode.rowIndex : m.indexOf(a.parentNode.parentNode.childNodes, a.parentNode), 0 <= a.cellIndex ? a.cellIndex : m.indexOf(a.parentNode.cells, a))
                    }
                });
                return {
                    _Builder: r,
                    _HeaderBuilder: B,
                    _ContentBuilder: p
                }
            })
        },
        "dojox/grid/_ViewManager": function() {
            define(["dojo/_base/declare", "dojo/_base/sniff", "dojo/dom-class"], function(p, m, k) {
                return p("dojox.grid._ViewManager", null, {
                    constructor: function(f) {
                        this.grid = f
                    },
                    defaultWidth: 200,
                    views: [],
                    resize: function() {
                        this.onEach("resize")
                    },
                    render: function() {
                        this.onEach("render")
                    },
                    addView: function(f) {
                        f.idx = this.views.length;
                        this.views.push(f)
                    },
                    destroyViews: function() {
                        for (var f = 0, d; d = this.views[f]; f++) d.destroy();
                        this.views = []
                    },
                    getContentNodes: function() {
                        for (var f = [], d = 0, b; b =
                            this.views[d]; d++) f.push(b.contentNode);
                        return f
                    },
                    forEach: function(f) {
                        for (var d = 0, b; b = this.views[d]; d++) f(b, d)
                    },
                    onEach: function(f, d) {
                        d = d || [];
                        for (var b = 0, e; e = this.views[b]; b++) f in e && e[f].apply(e, d)
                    },
                    normalizeHeaderNodeHeight: function() {
                        for (var f = [], d = 0, b; b = this.views[d]; d++) b.headerContentNode.firstChild && f.push(b.headerContentNode);
                        this.normalizeRowNodeHeights(f)
                    },
                    normalizeRowNodeHeights: function(f) {
                        var d = 0,
                            b = [];
                        if (this.grid.rowHeight) d = this.grid.rowHeight;
                        else {
                            if (1 >= f.length) return;
                            for (var e = 0,
                                    a; a = f[e]; e++) k.contains(a, "dojoxGridNonNormalizedCell") || (b[e] = a.firstChild.offsetHeight, d = Math.max(d, b[e]));
                            d = 0 <= d ? d : 0;
                            (m("mozilla") || 8 < m("ie")) && d && d++
                        }
                        for (e = 0; a = f[e]; e++) b[e] != d && (a.firstChild.style.height = d + "px")
                    },
                    resetHeaderNodeHeight: function() {
                        for (var f = 0, d; d = this.views[f]; f++)
                            if (d = d.headerContentNode.firstChild) d.style.height = ""
                    },
                    renormalizeRow: function(f) {
                        for (var d = [], b = 0, e, a;
                            (e = this.views[b]) && (a = e.getRowNode(f)); b++) a.firstChild.style.height = "", d.push(a);
                        this.normalizeRowNodeHeights(d)
                    },
                    getViewWidth: function(f) {
                        return this.views[f].getWidth() || this.defaultWidth
                    },
                    measureHeader: function() {
                        this.resetHeaderNodeHeight();
                        this.forEach(function(d) {
                            d.headerContentNode.style.height = ""
                        });
                        var f = 0;
                        this.forEach(function(d) {
                            f = Math.max(d.headerNode.offsetHeight, f)
                        });
                        return f
                    },
                    measureContent: function() {
                        var f = 0;
                        this.forEach(function(d) {
                            f = Math.max(d.domNode.offsetHeight, f)
                        });
                        return f
                    },
                    findClient: function(f) {
                        f = this.grid.elasticView || -1;
                        if (0 > f)
                            for (var d = 1, b; b = this.views[d]; d++)
                                if (b.viewWidth) {
                                    for (d =
                                        1; b = this.views[d]; d++)
                                        if (!b.viewWidth) {
                                            f = d;
                                            break
                                        }
                                    break
                                }
                        0 > f && (f = Math.floor(this.views.length / 2));
                        return f
                    },
                    arrange: function(f, d) {
                        var b, e, a, k = this.views.length,
                            l = this,
                            c = 0 >= d ? k : this.findClient(),
                            s = function(a, b) {
                                var c = a.domNode.style,
                                    d = a.headerNode.style;
                                l.grid.isLeftToRight() ? (c.left = b + "px", d.left = b + "px") : (c.right = b + "px", 4 > m("ff") ? d.right = b + a.getScrollbarWidth() + "px" : d.right = b + "px", !m("webkit") && "auto" != d.width && (d.width = parseInt(d.width, 10) - a.getScrollbarWidth() + "px"));
                                c.top = "0px";
                                d.top = 0
                            };
                        for (b = 0;
                            (e =
                                this.views[b]) && b < c; b++) a = this.getViewWidth(b), e.setSize(a, 0), s(e, f), a = e.headerContentNode && e.headerContentNode.firstChild ? e.getColumnsWidth() + e.getScrollbarWidth() : e.domNode.offsetWidth, f += a;
                        b++;
                        for (var p = d, u = k - 1;
                            (e = this.views[u]) && b <= u; u--) a = this.getViewWidth(u), e.setSize(a, 0), a = e.domNode.offsetWidth, p -= a, s(e, p);
                        c < k && (e = this.views[c], a = Math.max(1, p - f), e.setSize(a + "px", 0), s(e, f));
                        return f
                    },
                    renderRow: function(f, d, b) {
                        for (var e = [], a = 0, k, l;
                            (k = this.views[a]) && (l = d[a]); a++) k = k.renderRow(f), l.appendChild(k),
                            e.push(k);
                        b || this.normalizeRowNodeHeights(e)
                    },
                    rowRemoved: function(f) {
                        this.onEach("rowRemoved", [f])
                    },
                    updateRow: function(f, d) {
                        for (var b = 0, e; e = this.views[b]; b++) e.updateRow(f);
                        d || this.renormalizeRow(f)
                    },
                    updateRowStyles: function(f) {
                        this.onEach("updateRowStyles", [f])
                    },
                    setScrollTop: function(f) {
                        for (var d = f, b = 0, e; e = this.views[b]; b++) d = e.setScrollTop(f), m("ie") && (e.headerNode && e.scrollboxNode) && (e.headerNode.scrollLeft = e.scrollboxNode.scrollLeft);
                        return d
                    },
                    getFirstScrollingView: function() {
                        for (var f = 0, d; d =
                            this.views[f]; f++)
                            if (d.hasHScrollbar() || d.hasVScrollbar()) return d;
                        return null
                    }
                })
            })
        },
        "dojox/grid/_RowManager": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/dom-class"], function(p, m, k) {
                return p("dojox.grid._RowManager", null, {
                    constructor: function(f) {
                        this.grid = f
                    },
                    linesToEms: 2,
                    overRow: -2,
                    prepareStylingRow: function(f, d) {
                        return {
                            index: f,
                            node: d,
                            odd: Boolean(f & 1),
                            selected: !!this.grid.selection.isSelected(f),
                            over: this.isOver(f),
                            customStyles: "",
                            customClasses: "dojoxGridRow"
                        }
                    },
                    styleRowNode: function(f,
                        d) {
                        var b = this.prepareStylingRow(f, d);
                        this.grid.onStyleRow(b);
                        this.applyStyles(b)
                    },
                    applyStyles: function(f) {
                        f.node.className = f.customClasses;
                        var d = f.node.style.height,
                            b = f.node,
                            e = f.customStyles + ";" + (f.node._style || "");
                        void 0 == b.style.cssText ? b.setAttribute("style", e) : b.style.cssText = e;
                        f.node.style.height = d
                    },
                    updateStyles: function(f) {
                        this.grid.updateRowStyles(f)
                    },
                    setOverRow: function(f) {
                        var d = this.overRow;
                        this.overRow = f;
                        d != this.overRow && (m.isString(d) || 0 <= d) && this.updateStyles(d);
                        this.updateStyles(this.overRow)
                    },
                    isOver: function(f) {
                        return this.overRow == f && !k.contains(this.grid.domNode, "dojoxGridColumnResizing")
                    }
                })
            })
        },
        "dojox/grid/_FocusManager": function() {
            define("dojo/_base/array dojo/_base/lang dojo/_base/declare dojo/_base/connect dojo/_base/event dojo/_base/sniff dojo/query ./util dojo/_base/html".split(" "), function(p, m, k, f, d, b, e, a, n) {
                return k("dojox.grid._FocusManager", null, {
                    constructor: function(a) {
                        this.grid = a;
                        this.cell = null;
                        this.rowIndex = -1;
                        this._connects = [];
                        this._headerConnects = [];
                        this.headerMenu = this.grid.headerMenu;
                        this._connects.push(f.connect(this.grid.domNode, "onfocus", this, "doFocus"));
                        this._connects.push(f.connect(this.grid.domNode, "onblur", this, "doBlur"));
                        this._connects.push(f.connect(this.grid.domNode, "mousedown", this, "_mouseDown"));
                        this._connects.push(f.connect(this.grid.domNode, "mouseup", this, "_mouseUp"));
                        this._connects.push(f.connect(this.grid.domNode, "oncontextmenu", this, "doContextMenu"));
                        this._connects.push(f.connect(this.grid.lastFocusNode, "onfocus", this, "doLastNodeFocus"));
                        this._connects.push(f.connect(this.grid.lastFocusNode,
                            "onblur", this, "doLastNodeBlur"));
                        this._connects.push(f.connect(this.grid, "_onFetchComplete", this, "_delayedCellFocus"));
                        this._connects.push(f.connect(this.grid, "postrender", this, "_delayedHeaderFocus"))
                    },
                    destroy: function() {
                        p.forEach(this._connects, f.disconnect);
                        p.forEach(this._headerConnects, f.disconnect);
                        delete this.grid;
                        delete this.cell
                    },
                    _colHeadNode: null,
                    _colHeadFocusIdx: null,
                    _contextMenuBindNode: null,
                    tabbingOut: !1,
                    focusClass: "dojoxGridCellFocus",
                    focusView: null,
                    initFocusView: function() {
                        this.focusView =
                            this.grid.views.getFirstScrollingView() || this.focusView || this.grid.views.views[0];
                        this._initColumnHeaders()
                    },
                    isFocusCell: function(a, b) {
                        return this.cell == a && this.rowIndex == b
                    },
                    isLastFocusCell: function() {
                        return this.cell ? this.rowIndex == this.grid.rowCount - 1 && this.cell.index == this.grid.layout.cellCount - 1 : !1
                    },
                    isFirstFocusCell: function() {
                        return this.cell ? 0 === this.rowIndex && 0 === this.cell.index : !1
                    },
                    isNoFocusCell: function() {
                        return 0 > this.rowIndex || !this.cell
                    },
                    isNavHeader: function() {
                        return !!this._colHeadNode
                    },
                    getHeaderIndex: function() {
                        return this._colHeadNode ? p.indexOf(this._findHeaderCells(), this._colHeadNode) : -1
                    },
                    _focusifyCellNode: function(d) {
                        var c = this.cell && this.cell.getNode(this.rowIndex);
                        if (c && (n.toggleClass(c, this.focusClass, d), d)) {
                            d = this.scrollIntoView();
                            try {
                                if (b("webkit") || !this.grid.edit.isEditing()) a.fire(c, "focus"), d && (this.cell.view.scrollboxNode.scrollLeft = d)
                            } catch (e) {}
                        }
                    },
                    _delayedCellFocus: function() {
                        if (!this.isNavHeader() && this.grid.focused) {
                            var b = this.cell && this.cell.getNode(this.rowIndex);
                            if (b) try {
                                this.grid.edit.isEditing() || (n.toggleClass(b, this.focusClass, !0), this._colHeadNode && this.blurHeader(), a.fire(b, "focus"))
                            } catch (c) {}
                        }
                    },
                    _delayedHeaderFocus: function() {
                        this.isNavHeader() && this.focusHeader()
                    },
                    _initColumnHeaders: function() {
                        p.forEach(this._headerConnects, f.disconnect);
                        this._headerConnects = [];
                        for (var a = this._findHeaderCells(), b = 0; b < a.length; b++) this._headerConnects.push(f.connect(a[b], "onfocus", this, "doColHeaderFocus")), this._headerConnects.push(f.connect(a[b], "onblur", this, "doColHeaderBlur"))
                    },
                    _findHeaderCells: function() {
                        for (var a = e("th", this.grid.viewsHeaderNode), b = [], d = 0; d < a.length; d++) {
                            var f = a[d],
                                k = n.hasAttr(f, "tabIndex"),
                                m = n.attr(f, "tabIndex");
                            k && 0 > m && b.push(f)
                        }
                        return b
                    },
                    _setActiveColHeader: function(a, b, d) {
                        this.grid.domNode.setAttribute("aria-activedescendant", a.id);
                        null != d && (0 <= d && d != b) && n.toggleClass(this._findHeaderCells()[d], this.focusClass, !1);
                        n.toggleClass(a, this.focusClass, !0);
                        this._colHeadNode = a;
                        this._colHeadFocusIdx = b;
                        this._scrollHeader(this._colHeadFocusIdx)
                    },
                    scrollIntoView: function() {
                        var a =
                            this.cell ? this._scrollInfo(this.cell) : null;
                        if (!a || !a.s) return null;
                        var b = this.grid.scroller.findScrollTop(this.rowIndex);
                        a.n && a.sr && (a.n.offsetLeft + a.n.offsetWidth > a.sr.l + a.sr.w ? a.s.scrollLeft = a.n.offsetLeft + a.n.offsetWidth - a.sr.w : a.n.offsetLeft < a.sr.l && (a.s.scrollLeft = a.n.offsetLeft));
                        a.r && a.sr && (b + a.r.offsetHeight > a.sr.t + a.sr.h ? this.grid.setScrollTop(b + a.r.offsetHeight - a.sr.h) : b < a.sr.t && this.grid.setScrollTop(b));
                        return a.s.scrollLeft
                    },
                    _scrollInfo: function(a, b) {
                        if (a) {
                            var d = a.view.scrollboxNode,
                                e = {
                                    w: d.clientWidth,
                                    l: d.scrollLeft,
                                    t: d.scrollTop,
                                    h: d.clientHeight
                                },
                                f = a.view.getRowNode(this.rowIndex);
                            return {
                                c: a,
                                s: d,
                                sr: e,
                                n: b ? b : a.getNode(this.rowIndex),
                                r: f
                            }
                        }
                        return null
                    },
                    _scrollHeader: function(a) {
                        var c = null;
                        if (this._colHeadNode) {
                            var d = this.grid.getCell(a);
                            if (!d) return;
                            c = this._scrollInfo(d, d.getNode(0))
                        }
                        c && (c.s && c.sr && c.n) && (c.n.offsetLeft + c.n.offsetWidth > c.sr.l + c.sr.w ? c.s.scrollLeft = c.n.offsetLeft + c.n.offsetWidth - c.sr.w : c.n.offsetLeft < c.sr.l ? c.s.scrollLeft = c.n.offsetLeft : 7 >= b("ie") && (d && d.view.headerNode) &&
                            (d.view.headerNode.scrollLeft = c.s.scrollLeft))
                    },
                    _isHeaderHidden: function() {
                        var a = this.focusView;
                        if (!a)
                            for (var b = 0, d; d = this.grid.views.views[b]; b++)
                                if (d.headerNode) {
                                    a = d;
                                    break
                                }
                        return a && "none" == n.getComputedStyle(a.headerNode).display
                    },
                    colSizeAdjust: function(a, b, d) {
                        var e = this._findHeaderCells(),
                            f = this.focusView;
                        if (!f || !f.header.tableMap.map)
                            for (var k = 0, n; n = this.grid.views.views[k]; k++)
                                if (n.header.tableMap.map) {
                                    f = n;
                                    break
                                }
                        k = e[b];
                        f && !(b == e.length - 1 && 0 === b) && (f.content.baseDecorateEvent(a), a.cellNode = k,
                            a.cellIndex = f.content.getCellNodeIndex(a.cellNode), a.cell = 0 <= a.cellIndex ? this.grid.getCell(a.cellIndex) : null, f.header.canResize(a) && (b = {
                                l: d
                            }, a = f.header.colResizeSetup(a, !1), f.header.doResizeColumn(a, null, b), f.update()))
                    },
                    styleRow: function(a) {},
                    setFocusIndex: function(a, b) {
                        this.setFocusCell(this.grid.getCell(b), a)
                    },
                    setFocusCell: function(a, c) {
                        a && !this.isFocusCell(a, c) && (this.tabbingOut = !1, this._colHeadNode && this.blurHeader(), this._colHeadNode = this._colHeadFocusIdx = null, this.focusGridView(), this._focusifyCellNode(!1),
                            this.cell = a, this.rowIndex = c, this._focusifyCellNode(!0));
                        if (b("opera")) setTimeout(m.hitch(this.grid, "onCellFocus", this.cell, this.rowIndex), 1);
                        else this.grid.onCellFocus(this.cell, this.rowIndex)
                    },
                    next: function() {
                        if (this.cell) {
                            var a = this.rowIndex,
                                b = this.cell.index + 1,
                                d = this.grid.layout.cellCount - 1,
                                e = this.grid.rowCount - 1;
                            b > d && (b = 0, a++);
                            a > e && (b = d, a = e);
                            if (this.grid.edit.isEditing() && (d = this.grid.getCell(b), !this.isLastFocusCell() && (!d.editable || this.grid.canEdit && !this.grid.canEdit(d, a)))) {
                                this.cell = d;
                                this.rowIndex =
                                    a;
                                this.next();
                                return
                            }
                            this.setFocusIndex(a, b)
                        }
                    },
                    previous: function() {
                        if (this.cell) {
                            var a = this.rowIndex || 0,
                                b = (this.cell.index || 0) - 1;
                            0 > b && (b = this.grid.layout.cellCount - 1, a--);
                            0 > a && (b = a = 0);
                            if (this.grid.edit.isEditing()) {
                                var d = this.grid.getCell(b);
                                if (!this.isFirstFocusCell() && !d.editable) {
                                    this.cell = d;
                                    this.rowIndex = a;
                                    this.previous();
                                    return
                                }
                            }
                            this.setFocusIndex(a, b)
                        }
                    },
                    move: function(a, b) {
                        var d = 0 > b ? -1 : 1;
                        if (this.isNavHeader()) {
                            var e = this._findHeaderCells(),
                                f = currentIdx = p.indexOf(e, this._colHeadNode);
                            for (currentIdx +=
                                b; 0 <= currentIdx && currentIdx < e.length && "none" == e[currentIdx].style.display;) currentIdx += d;
                            0 <= currentIdx && currentIdx < e.length && this._setActiveColHeader(e[currentIdx], currentIdx, f)
                        } else if (this.cell) {
                            var k = this.grid.scroller,
                                e = this.rowIndex,
                                f = this.grid.rowCount - 1,
                                m = Math.min(f, Math.max(0, e + a));
                            a && (0 < a ? m > k.getLastPageRow(k.page) && this.grid.setScrollTop(this.grid.scrollTop + k.findScrollTop(m) - k.findScrollTop(e)) : 0 > a && m <= k.getPageRow(k.page) && this.grid.setScrollTop(this.grid.scrollTop - k.findScrollTop(e) -
                                k.findScrollTop(m)));
                            for (var k = this.grid.layout.cellCount - 1, h = this.cell.index, r = Math.min(k, Math.max(0, h + b)), B = this.grid.getCell(r); 0 <= r && r < k && B && !0 === B.hidden;) r += d, B = this.grid.getCell(r);
                            if (!B || !0 === B.hidden) r = h;
                            d = B.getNode(m);
                            !d && a ? 0 <= m + a && m + a <= f && this.move(0 < a ? ++a : --a, b) : (!d || "none" === n.style(d, "display")) && b ? 0 <= r + b && r + b <= k && this.move(a, 0 < b ? ++b : --b) : (this.setFocusIndex(m, r), a && this.grid.updateRow(e))
                        }
                    },
                    previousKey: function(a) {
                        this.grid.edit.isEditing() ? (d.stop(a), this.previous()) : !this.isNavHeader() &&
                            !this._isHeaderHidden() ? (this.grid.domNode.focus(), d.stop(a)) : (this.tabOut(this.grid.domNode), null != this._colHeadFocusIdx && (n.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx], this.focusClass, !1), this._colHeadFocusIdx = null), this._focusifyCellNode(!1))
                    },
                    nextKey: function(a) {
                        a.target === this.grid.domNode && null == this._colHeadFocusIdx ? (this.focusHeader(), d.stop(a)) : this.isNavHeader() ? (this.blurHeader(), this.findAndFocusGridCell() || this.tabOut(this.grid.lastFocusNode), this._colHeadNode = this._colHeadFocusIdx =
                            null) : this.grid.edit.isEditing() ? (d.stop(a), this.next()) : this.tabOut(this.grid.lastFocusNode)
                    },
                    tabOut: function(a) {
                        this.tabbingOut = !0;
                        a.focus()
                    },
                    focusGridView: function() {
                        a.fire(this.focusView, "focus")
                    },
                    focusGrid: function(a) {
                        this.focusGridView();
                        this._focusifyCellNode(!0)
                    },
                    findAndFocusGridCell: function() {
                        var a = !0,
                            b = 0 === this.grid.rowCount;
                        this.isNoFocusCell() && !b ? (b = 0, this.grid.getCell(b).hidden && (b = this.isNavHeader() ? this._colHeadFocusIdx : 0), this.setFocusIndex(0, b)) : this.cell && !b ? (this.focusView && !this.focusView.rowNodes[this.rowIndex] &&
                            this.grid.scrollToRow(this.rowIndex), this.focusGrid()) : a = !1;
                        this._colHeadNode = this._colHeadFocusIdx = null;
                        return a
                    },
                    focusHeader: function() {
                        var a = this._findHeaderCells(),
                            b = this._colHeadFocusIdx;
                        this._isHeaderHidden() ? this.findAndFocusGridCell() : this._colHeadFocusIdx || (this.isNoFocusCell() ? this._colHeadFocusIdx = 0 : this._colHeadFocusIdx = this.cell.index);
                        for (this._colHeadNode = a[this._colHeadFocusIdx]; this._colHeadNode && 0 <= this._colHeadFocusIdx && this._colHeadFocusIdx < a.length && "none" == this._colHeadNode.style.display;) this._colHeadFocusIdx++,
                            this._colHeadNode = a[this._colHeadFocusIdx];
                        this._colHeadNode && "none" != this._colHeadNode.style.display ? (this.headerMenu && this._contextMenuBindNode != this.grid.domNode && (this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode), this.headerMenu.bindDomNode(this.grid.domNode), this._contextMenuBindNode = this.grid.domNode), this._setActiveColHeader(this._colHeadNode, this._colHeadFocusIdx, b), this._scrollHeader(this._colHeadFocusIdx), this._focusifyCellNode(!1)) : this.findAndFocusGridCell()
                    },
                    blurHeader: function() {
                        n.removeClass(this._colHeadNode,
                            this.focusClass);
                        n.removeAttr(this.grid.domNode, "aria-activedescendant");
                        if (this.headerMenu && this._contextMenuBindNode == this.grid.domNode) {
                            var a = this.grid.viewsHeaderNode;
                            this.headerMenu.unBindDomNode(this.grid.domNode);
                            this.headerMenu.bindDomNode(a);
                            this._contextMenuBindNode = a
                        }
                    },
                    doFocus: function(a) {
                        a && a.target != a.currentTarget ? d.stop(a) : this._clickFocus || (this.tabbingOut || this.focusHeader(), this.tabbingOut = !1, d.stop(a))
                    },
                    doBlur: function(a) {
                        d.stop(a)
                    },
                    doContextMenu: function(a) {
                        this.headerMenu || d.stop(a)
                    },
                    doLastNodeFocus: function(a) {
                        this.tabbingOut ? this._focusifyCellNode(!1) : 0 < this.grid.rowCount ? (this.isNoFocusCell() && this.setFocusIndex(0, 0), this._focusifyCellNode(!0)) : this.focusHeader();
                        this.tabbingOut = !1;
                        d.stop(a)
                    },
                    doLastNodeBlur: function(a) {
                        d.stop(a)
                    },
                    doColHeaderFocus: function(a) {
                        this._setActiveColHeader(a.target, n.attr(a.target, "idx"), this._colHeadFocusIdx);
                        this._scrollHeader(this.getHeaderIndex());
                        d.stop(a)
                    },
                    doColHeaderBlur: function(a) {
                        n.toggleClass(a.target, this.focusClass, !1)
                    },
                    _mouseDown: function(a) {
                        this._clickFocus =
                            dojo.some(this.grid.views.views, function(b) {
                                return b.scrollboxNode === a.target
                            })
                    },
                    _mouseUp: function(a) {
                        this._clickFocus = !1
                    }
                })
            })
        },
        "dojox/grid/_EditManager": function() {
            define("dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/_base/connect dojo/_base/sniff ./util".split(" "), function(p, m, k, f, d, b) {
                return k("dojox.grid._EditManager", null, {
                    constructor: function(b) {
                        this.grid = b;
                        this.connections = !d("ie") ? [] : [f.connect(document.body, "onfocus", p.hitch(this, "_boomerangFocus"))];
                        this.connections.push(f.connect(this.grid,
                            "onBlur", this, "apply"));
                        this.connections.push(f.connect(this.grid, "prerender", this, "_onPreRender"))
                    },
                    info: {},
                    destroy: function() {
                        m.forEach(this.connections, f.disconnect)
                    },
                    cellFocus: function(b, a) {
                        this.grid.singleClickEdit || this.isEditRow(a) ? this.setEditCell(b, a) : this.apply();
                        (this.isEditing() || b && b.editable && b.alwaysEditing) && this._focusEditor(b, a)
                    },
                    rowClick: function(b) {
                        this.isEditing() && !this.isEditRow(b.rowIndex) && this.apply()
                    },
                    styleRow: function(b) {
                        b.index == this.info.rowIndex && (b.customClasses += " dojoxGridRowEditing")
                    },
                    dispatchEvent: function(b) {
                        var a = b.cell;
                        return (a = a && a.editable ? a : 0) && a.dispatchEvent(b.dispatch, b)
                    },
                    isEditing: function() {
                        return void 0 !== this.info.rowIndex
                    },
                    isEditCell: function(b, a) {
                        return this.info.rowIndex === b && this.info.cell.index == a
                    },
                    isEditRow: function(b) {
                        return this.info.rowIndex === b
                    },
                    setEditCell: function(b, a) {
                        !this.isEditCell(a, b.index) && (this.grid.canEdit && this.grid.canEdit(b, a)) && this.start(b, a, this.isEditRow(a) || b.editable)
                    },
                    _focusEditor: function(d, a) {
                        b.fire(d, "focus", [a])
                    },
                    focusEditor: function() {
                        this.isEditing() &&
                            this._focusEditor(this.info.cell, this.info.rowIndex)
                    },
                    _boomerangWindow: 500,
                    _shouldCatchBoomerang: function() {
                        return this._catchBoomerang > (new Date).getTime()
                    },
                    _boomerangFocus: function() {
                        this._shouldCatchBoomerang() && (this.grid.focus.focusGrid(), this.focusEditor(), this._catchBoomerang = 0)
                    },
                    _doCatchBoomerang: function() {
                        d("ie") && (this._catchBoomerang = (new Date).getTime() + this._boomerangWindow)
                    },
                    start: function(b, a, d) {
                        this._isValidInput() && (this.grid.beginUpdate(), this.editorApply(), this.isEditing() && !this.isEditRow(a) &&
                            (this.applyRowEdit(), this.grid.updateRow(a)), d ? (this.info = {
                                cell: b,
                                rowIndex: a
                            }, this.grid.doStartEdit(b, a), this.grid.updateRow(a)) : this.info = {}, this.grid.endUpdate(), this.grid.focus.focusGrid(), this._focusEditor(b, a), this._doCatchBoomerang())
                    },
                    _editorDo: function(b) {
                        var a = this.info.cell;
                        if (a && a.editable) a[b](this.info.rowIndex)
                    },
                    editorApply: function() {
                        this._editorDo("apply")
                    },
                    editorCancel: function() {
                        this._editorDo("cancel")
                    },
                    applyCellEdit: function(b, a, d) {
                        this.grid.canEdit(a, d) && this.grid.doApplyCellEdit(b,
                            d, a.field)
                    },
                    applyRowEdit: function() {
                        this.grid.doApplyEdit(this.info.rowIndex, this.info.cell.field)
                    },
                    apply: function() {
                        this.isEditing() && this._isValidInput() && (this.grid.beginUpdate(), this.editorApply(), this.applyRowEdit(), this.info = {}, this.grid.endUpdate(), this.grid.focus.focusGrid(), this._doCatchBoomerang())
                    },
                    cancel: function() {
                        this.isEditing() && (this.grid.beginUpdate(), this.editorCancel(), this.info = {}, this.grid.endUpdate(), this.grid.focus.focusGrid(), this._doCatchBoomerang())
                    },
                    save: function(b, a) {
                        var d =
                            this.info.cell;
                        this.isEditRow(b) && ((!a || d.view == a) && d.editable) && d.save(d, this.info.rowIndex)
                    },
                    restore: function(b, a) {
                        var d = this.info.cell;
                        this.isEditRow(a) && (d.view == b && d.editable) && d.restore(this.info.rowIndex)
                    },
                    _isValidInput: function() {
                        var b = (this.info.cell || {}).widget;
                        if (!b || !b.isValid) return !0;
                        b.focused = !0;
                        return b.isValid(!0)
                    },
                    _onPreRender: function() {
                        this.isEditing() && (this.info.value = this.info.cell.getValue())
                    }
                })
            })
        },
        "dojox/grid/Selection": function() {
            define(["dojo/_base/declare", "dojo/_base/array",
                "dojo/_base/lang", "dojo/dom-attr"
            ], function(p, m, k, f) {
                return p("dojox.grid.Selection", null, {
                    constructor: function(d) {
                        this.grid = d;
                        this.selected = [];
                        this.setMode(d.selectionMode)
                    },
                    mode: "extended",
                    selected: null,
                    updating: 0,
                    selectedIndex: -1,
                    rangeStartIndex: -1,
                    setMode: function(d) {
                        this.selected.length && this.deselectAll();
                        this.mode = "extended" != d && "multiple" != d && "single" != d && "none" != d ? "extended" : d
                    },
                    onCanSelect: function(d) {
                        return this.grid.onCanSelect(d)
                    },
                    onCanDeselect: function(d) {
                        return this.grid.onCanDeselect(d)
                    },
                    onSelected: function(d) {},
                    onDeselected: function(d) {},
                    onChanging: function() {},
                    onChanged: function() {},
                    isSelected: function(d) {
                        return "none" == this.mode ? !1 : this.selected[d]
                    },
                    getFirstSelected: function() {
                        if (!this.selected.length || "none" == this.mode) return -1;
                        for (var d = 0, b = this.selected.length; d < b; d++)
                            if (this.selected[d]) return d;
                        return -1
                    },
                    getNextSelected: function(d) {
                        if ("none" == this.mode) return -1;
                        d += 1;
                        for (var b = this.selected.length; d < b; d++)
                            if (this.selected[d]) return d;
                        return -1
                    },
                    getSelected: function() {
                        for (var d = [], b = 0, e = this.selected.length; b < e; b++) this.selected[b] && d.push(b);
                        return d
                    },
                    getSelectedCount: function() {
                        for (var d = 0, b = 0; b < this.selected.length; b++) this.selected[b] && d++;
                        return d
                    },
                    _beginUpdate: function() {
                        if (0 === this.updating) this.onChanging();
                        this.updating++
                    },
                    _endUpdate: function() {
                        this.updating--;
                        if (0 === this.updating) this.onChanged()
                    },
                    select: function(d) {
                        "none" != this.mode && ("multiple" != this.mode ? (this.deselectAll(d), this.addToSelection(d)) : this.toggleSelect(d))
                    },
                    addToSelection: function(d) {
                        if ("none" !=
                            this.mode)
                            if (k.isArray(d)) m.forEach(d, this.addToSelection, this);
                            else if (d = Number(d), this.selected[d]) this.selectedIndex = d;
                        else if (!1 !== this.onCanSelect(d)) {
                            this.selectedIndex = d;
                            var b = this.grid.getRowNode(d);
                            b && f.set(b, "aria-selected", "true");
                            this._beginUpdate();
                            this.selected[d] = !0;
                            this.onSelected(d);
                            this._endUpdate()
                        }
                    },
                    deselect: function(d) {
                        if ("none" != this.mode)
                            if (k.isArray(d)) m.forEach(d, this.deselect, this);
                            else if (d = Number(d), this.selectedIndex == d && (this.selectedIndex = -1), this.selected[d] && !1 !==
                            this.onCanDeselect(d)) {
                            var b = this.grid.getRowNode(d);
                            b && f.set(b, "aria-selected", "false");
                            this._beginUpdate();
                            delete this.selected[d];
                            this.onDeselected(d);
                            this._endUpdate()
                        }
                    },
                    setSelected: function(d, b) {
                        this[b ? "addToSelection" : "deselect"](d)
                    },
                    toggleSelect: function(d) {
                        k.isArray(d) ? m.forEach(d, this.toggleSelect, this) : this.setSelected(d, !this.selected[d])
                    },
                    _range: function(d, b, e) {
                        var a = 0 <= d ? d : b;
                        d = b;
                        a > d && (d = a, a = b);
                        for (b = a; b <= d; b++) e(b)
                    },
                    selectRange: function(d, b) {
                        this._range(d, b, k.hitch(this, "addToSelection"))
                    },
                    deselectRange: function(d, b) {
                        this._range(d, b, k.hitch(this, "deselect"))
                    },
                    insert: function(d) {
                        this.selected.splice(d, 0, !1);
                        this.selectedIndex >= d && this.selectedIndex++
                    },
                    remove: function(d) {
                        this.selected.splice(d, 1);
                        this.selectedIndex >= d && this.selectedIndex--
                    },
                    deselectAll: function(d) {
                        for (var b in this.selected) b != d && !0 === this.selected[b] && this.deselect(b)
                    },
                    clickSelect: function(d, b, e) {
                        if ("none" != this.mode) {
                            this._beginUpdate();
                            if ("extended" != this.mode) this.select(d);
                            else {
                                if (!e || 0 > this.rangeStartIndex) this.rangeStartIndex =
                                    d;
                                b || this.deselectAll(d);
                                e ? this.selectRange(this.rangeStartIndex, d) : b ? this.toggleSelect(d) : this.addToSelection(d)
                            }
                            this._endUpdate()
                        }
                    },
                    clickSelectEvent: function(d) {
                        this.clickSelect(d.rowIndex, dojo.isCopyKey(d), d.shiftKey)
                    },
                    clear: function() {
                        this._beginUpdate();
                        this.deselectAll();
                        this._endUpdate()
                    }
                })
            })
        },
        "dojox/grid/DataSelection": function() {
            define(["dojo/_base/declare", "./_SelectionPreserver", "./Selection"], function(p, m, k) {
                return p("dojox.grid.DataSelection", k, {
                    constructor: function(f) {
                        f.keepSelection &&
                            (this.preserver = new m(this))
                    },
                    destroy: function() {
                        this.preserver && this.preserver.destroy()
                    },
                    getFirstSelected: function() {
                        var f = k.prototype.getFirstSelected.call(this);
                        return -1 == f ? null : this.grid.getItem(f)
                    },
                    getNextSelected: function(f) {
                        f = this.grid.getItemIndex(f);
                        f = k.prototype.getNextSelected.call(this, f);
                        return -1 == f ? null : this.grid.getItem(f)
                    },
                    getSelected: function() {
                        for (var f = [], d = 0, b = this.selected.length; d < b; d++) this.selected[d] && f.push(this.grid.getItem(d));
                        return f
                    },
                    addToSelection: function(f) {
                        if ("none" !=
                            this.mode) {
                            var d = null,
                                d = "number" == typeof f || "string" == typeof f ? f : this.grid.getItemIndex(f);
                            k.prototype.addToSelection.call(this, d)
                        }
                    },
                    deselect: function(f) {
                        if ("none" != this.mode) {
                            var d = null,
                                d = "number" == typeof f || "string" == typeof f ? f : this.grid.getItemIndex(f);
                            k.prototype.deselect.call(this, d)
                        }
                    },
                    deselectAll: function(f) {
                        var d = null;
                        f || "number" == typeof f ? (d = "number" == typeof f || "string" == typeof f ? f : this.grid.getItemIndex(f), k.prototype.deselectAll.call(this, d)) : this.inherited(arguments)
                    }
                })
            })
        },
        "dojox/grid/_SelectionPreserver": function() {
            define(["dojo/_base/declare",
                "dojo/_base/connect", "dojo/_base/lang", "dojo/_base/array"
            ], function(p, m, k, f) {
                return p("dojox.grid._SelectionPreserver", null, {
                    constructor: function(d) {
                        this.selection = d;
                        var b = this.grid = d.grid;
                        this.reset();
                        this._connects = [m.connect(b, "_setStore", this, "reset"), m.connect(b, "_addItem", this, "_reSelectById"), m.connect(d, "onSelected", k.hitch(this, "_selectById", !0)), m.connect(d, "onDeselected", k.hitch(this, "_selectById", !1)), m.connect(d, "deselectAll", this, "reset")]
                    },
                    destroy: function() {
                        this.reset();
                        f.forEach(this._connects,
                            m.disconnect);
                        delete this._connects
                    },
                    reset: function() {
                        this._selectedById = {}
                    },
                    _reSelectById: function(d, b) {
                        d && this.grid._hasIdentity && (this.selection.selected[b] = this._selectedById[this.grid.store.getIdentity(d)])
                    },
                    _selectById: function(d, b) {
                        if ("none" != this.selection.mode && this.grid._hasIdentity) {
                            var e = b,
                                a = this.grid;
                            if ("number" == typeof b || "string" == typeof b) e = (e = a._by_idx[b]) && e.item;
                            e && (this._selectedById[a.store.getIdentity(e)] = !!d);
                            return e
                        }
                    }
                })
            })
        },
        "esri/dijit/editing/TemplatePickerItem": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has dojo/sniff dojo/dom-style dijit/_Widget dijit/_Templated dojox/gfx ../../symbols/jsonUtils ../../kernel".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c) {
                    return p([e, a], {
                        declaredClass: "esri.dijit.editing.TemplatePickerItem",
                        templateString: "\x3cdiv class\x3d'item' style\x3d'text-align: center;'\x3e\x3cdiv class\x3d'itemSymbol' dojoAttachPoint\x3d'_surfaceNode'\x3e\x3c/div\x3e\x3cdiv class\x3d'itemLabel'\x3e${label}\x3c/div\x3e\x3c/div\x3e",
                        startup: function() {
                            this._started || (this.inherited(arguments), this._surface = this._draw(this._surfaceNode, this.symbol, this.surfaceWidth, this.surfaceHeight, this.template))
                        },
                        _draw: function(a,
                            c, d, e, k) {
                            if (c && "textsymbol" !== c.type) {
                                a = n.createSurface(a, d, e);
                                if (9 > f("ie")) {
                                    var h = a.getEventSource();
                                    b.set(h, "position", "relative");
                                    b.set(h.parentNode, "position", "relative")
                                }
                                c = !this.legendOverride && this._getDrawingToolShape(c, k) || l.getShapeDescriptors(c);
                                var r;
                                try {
                                    r = a.createShape(c.defaultShape).setFill(c.fill).setStroke(c.stroke)
                                } catch (p) {
                                    a.clear();
                                    a.destroy();
                                    return
                                }
                                var g = r.getBoundingBox();
                                c = g.width;
                                k = g.height;
                                var h = -(g.x + c / 2),
                                    g = -(g.y + k / 2),
                                    y = a.getDimensions(),
                                    h = {
                                        dx: h + y.width / 2,
                                        dy: g + y.height / 2
                                    };
                                if (c > d || k > e) g = c / d > k / e, d = ((g ? d : e) - 5) / (g ? c : k), m.mixin(h, {
                                    xx: d,
                                    yy: d
                                });
                                r.applyTransform(h);
                                return a
                            }
                        },
                        _getDrawingToolShape: function(a, b) {
                            var c;
                            switch (b ? b.drawingTool || null : null) {
                                case "esriFeatureEditToolArrow":
                                    c = {
                                        type: "path",
                                        path: "M 10,1 L 3,8 L 3,5 L -15,5 L -15,-2 L 3,-2 L 3,-5 L 10,1 E"
                                    };
                                    break;
                                case "esriFeatureEditToolLeftArrow":
                                    c = {
                                        type: "path",
                                        path: "M -15,1 L -8,8 L -8,5 L 10,5 L 10,-2 L -8,-2 L -8,-5 L -15,1 E"
                                    };
                                    break;
                                case "esriFeatureEditToolRightArrow":
                                    c = {
                                        type: "path",
                                        path: "M 10,1 L 3,8 L 3,5 L -15,5 L -15,-2 L 3,-2 L 3,-5 L 10,1 E"
                                    };
                                    break;
                                case "esriFeatureEditToolUpArrow":
                                    c = {
                                        type: "path",
                                        path: "M 1,-10 L 8,-3 L 5,-3 L 5,15 L -2,15 L -2,-3 L -5,-3 L 1,-10 E"
                                    };
                                    break;
                                case "esriFeatureEditToolDownArrow":
                                    c = {
                                        type: "path",
                                        path: "M 1,15 L 8,8 L 5,8 L 5,-10 L -2,-10 L -2,8 L -5,8 L 1,15 E"
                                    };
                                    break;
                                case "esriFeatureEditToolTriangle":
                                    c = {
                                        type: "path",
                                        path: "M -10,14 L 2,-10 L 14,14 L -10,14 E"
                                    };
                                    break;
                                case "esriFeatureEditToolRectangle":
                                    c = {
                                        type: "path",
                                        path: "M -10,-10 L 10,-10 L 10,10 L -10,10 L -10,-10 E"
                                    };
                                    break;
                                case "esriFeatureEditToolCircle":
                                    c = {
                                        type: "circle",
                                        cx: 0,
                                        cy: 0,
                                        r: 10
                                    };
                                    break;
                                case "esriFeatureEditToolEllipse":
                                    c = {
                                        type: "ellipse",
                                        cx: 0,
                                        cy: 0,
                                        rx: 10,
                                        ry: 5
                                    };
                                    break;
                                case "esriFeatureEditToolFreehand":
                                    c = "simplelinesymbol" === a.type || "cartographiclinesymbol" === a.type ? {
                                        type: "path",
                                        path: "m -11, -7c-1.5,-3.75 7.25,-9.25 12.5,-7c5.25,2.25 6.75,9.75 3.75,12.75c-3,3 -3.25,2.5 -9.75,5.25c-6.5,2.75 -7.25,14.25 2,15.25c9.25,1 11.75,-4 13.25,-6.75c1.5,-2.75 3.5,-11.75 12,-6.5"
                                    } : {
                                        type: "path",
                                        path: "M 10,-13 c3.1,0.16667 4.42564,2.09743 2.76923,3.69231c-2.61025,2.87179 -5.61025,5.6718 -6.14358,6.20513c-0.66667,0.93333 -0.46667,1.2 -0.53333,1.93333c-0.00001,0.86666 0.6,1.66667 1.13334,2c1.03077,0.38462 2.8,0.93333 3.38974,1.70769c0.47693,0.42564 0.87693,0.75897 1.41026,1.75897c0.13333,1.06667 -0.46667,2.86667 -1.8,3.8c-0.73333,0.73333 -3.86667,2.66666 -4.86667,3.13333c-0.93333,0.8 -7.4,3.2 -7.6,3.06667c-1.06667,0.46667 -4.73333,1.13334 -5.2,1.26667c-1.6,0.33334 -4.6,0.4 -6.25128,0.05128c-1.41539,-0.18462 -2.34872,-2.31796 -1.41539,-4.45129c0.93333,-1.73333 1.86667,-3.13333 2.64615,-3.85641c1.28718,-1.47692 2.57437,-2.68204 3.88718,-3.54359c0.88718,-1.13845 1.8,-1.33333 2.26666,-2.45641c0.33334,-0.74359 0.37949,-1.7641 0.06667,-2.87692c-0.66666,-1.46666 -1.66666,-1.86666 -2.98975,-2.2c-1.27692,-0.26666 -2.12307,-0.64102 -3.27692,-1.46666c-0.66667,-1.00001 -1.01538,-3.01539 0.73333,-4.06667c1.73333,-1.2 3.6,-1.93333 4.93333,-2.2c1.33333,-0.46667 4.84104,-1.09743 5.84103,-1.23076c1.60001,-0.46667 6.02564,-0.50257 7.29231,-0.56924z"
                                    };
                                    break;
                                default:
                                    return null
                            }
                            return {
                                defaultShape: c,
                                fill: a.getFill(),
                                stroke: a.getStroke()
                            }
                        },
                        _repaint: function(a) {
                            a ? (a.getStroke && a.setStroke && a.setStroke(a.getStroke()), a.getFill && a.setFill && a.setFill(a.getFill()), a.children && m.isArray(a.children) && k.forEach(a.children, this._repaint, this)) : this._surface = this._draw(this._surfaceNode, this.symbol, this.surfaceWidth, this.surfaceHeight, this.template)
                        },
                        destroy: function() {
                            this._surface && (this._surface.destroy(), delete this._surface);
                            this.inherited(arguments)
                        }
                    })
                })
        },
        "widgets/Edit/utils": function() {
            define(["dojo/_base/lang", "dojo/_base/array", "jimu/utils"], function(p, m, k) {
                _ignoreCaseToGetFieldObject = function(f, d) {
                    var b = null;
                    f && f.fields && m.some(f.fields, function(e) {
                        if (e.name.toLowerCase() === d.toLowerCase()) return b = e, !0
                    });
                    return b
                };
                _ignoreCaseToGetOrUpdateAttrByFieldKey = function(f, d, b) {
                    var e = null;
                    if (f && f.attributes)
                        for (var a in f.attributes)
                            if (f.attributes.hasOwnProperty(a) && "function" !== typeof f.attributes[a] && a.toLowerCase() === d.toLowerCase()) {
                                e = b ? f.attributes[a] =
                                    b : f.attributes[a];
                                break
                            }
                    return e
                };
                return {
                    getFieldInfosFromWebmap: function(f, d) {
                        var b = null,
                            e = d.getLayerInfoByTopLayerId(f);
                        e && (e = e.getPopupInfo()) && e.fieldInfos && (b = p.clone(e.fieldInfos));
                        b && m.forEach(b, function(a) {
                            a.format && (a.format.dateFormat && a.format.dateFormat.toLowerCase() && 0 <= a.format.dateFormat.toLowerCase().indexOf("time")) && (a.format.time = !0)
                        });
                        return b
                    },
                    getLocaleDateTime: function(f) {
                        return k.localizeDate(new Date(f), {
                            fullYear: !0,
                            formatLength: "medium"
                        })
                    },
                    getAttrByFieldKey: function(f, d) {
                        return _ignoreCaseToGetOrUpdateAttrByFieldKey(f,
                            d)
                    },
                    setAttrByFieldKey: function(f, d, b) {
                        return _ignoreCaseToGetOrUpdateAttrByFieldKey(f, d, b)
                    },
                    ignoreCaseToGetFieldKey: function(f, d) {
                        var b = null,
                            e = _ignoreCaseToGetFieldObject(f, d);
                        e && (b = e.name);
                        return b
                    },
                    ignoreCaseToGetFieldObject: function(f, d) {
                        return _ignoreCaseToGetFieldObject(f, d)
                    }
                }
            })
        },
        "widgets/Edit/FilterEditor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-construct dijit/_TemplatedMixin dijit/_WidgetBase".split(" "), function(p, m, k, f, d, b) {
                return p([b, d], {
                    name: "FilterEditor",
                    baseClass: "jimu-widget-FilterEditor",
                    declaredClass: "jimu.dijit.FilterEditor",
                    templateString: "\x3cdiv style\x3d'width:100%'\x3e\x3cdiv data-dojo-attach-point\x3d'filterEditorDiv'\x3e\x3c/div\x3e\x3c/div\x3e",
                    _settings: null,
                    _editWidget: null,
                    _origGetItemsFromLayerFunc: null,
                    postCreate: function() {
                        this.nls = this._editWidget.nls;
                        this._createFilterTool()
                    },
                    _createFilterTool: function() {
                        var b = f.create("label", {
                            innerHTML: "Feature Layers"
                        });
                        f.place(b, this.filterEditorDiv);
                        this._createLayerFilter();
                        this._createTemplateFilter()
                    },
                    _createLayerFilter: function() {
                        this.selectDropDown = f.create("select", {
                            "class": "flDropDown"
                        });
                        f.place(this.selectDropDown, this.filterEditorDiv);
                        this.selectDropDown.onchange = m.hitch(this, function() {
                            this._onLayerFilterChanged()
                        });
                        var b = f.create("option", {
                            value: "all",
                            innerHTML: "All"
                        });
                        f.place(b, this.selectDropDown);
                        for (var a, b = 0; b < this._editWidget._layerObjectsParaForTempaltePicker.length; b++) a = this._editWidget._layerObjectsParaForTempaltePicker[b], a = f.create("option", {
                            value: a.id,
                            innerHTML: a.name
                        }), f.place(a,
                            this.selectDropDown)
                    },
                    _createTemplateFilter: function() {
                        this.filterTextBox = f.create("input", {
                            "class": "searchtextbox",
                            type: "text",
                            placeholder: this.nls.searchTemplates
                        }, this.filterEditorDiv);
                        this.filterTextBox.onkeyup = m.hitch(this, function() {
                            this._onTempalteFilterChanged()
                        });
                        var b = this._editWidget.editor.templatePicker;
                        this._origGetItemsFromLayerFunc = b._getItemsFromLayer;
                        b._getItemsFromLayer = m.hitch(this, function() {
                            var a;
                            a = this._origGetItemsFromLayerFunc.apply(b, arguments);
                            var d = this.filterTextBox.value;
                            d && (a = k.filter(a, function(a) {
                                var b = !1,
                                    e = RegExp(d, "ig");
                                a.hasOwnProperty("label") && a.label.match(e) && 0 < a.label.match(e).length && (b = !0);
                                a.hasOwnProperty("template") && a.template.hasOwnProperty("name") && a.template.name.match(e) && 0 < a.template.name.match(e).length && (b = !0);
                                return b
                            }));
                            0 === a.length && (this._editWidget.editor.templatePicker.grid.noDataMessage = this.nls.noAvailableTempaltes);
                            return a
                        })
                    },
                    _onLayerFilterChanged: function() {
                        var b = this._editWidget.editor.templatePicker;
                        b.clearSelection();
                        var a = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
                        "" !== a && ("All" === a ? (b.attr("featureLayers", this._editWidget._layerObjectsParaForTempaltePicker), "" === this.filterTextBox.value ? b.attr("grouping", !0) : b.attr("grouping", !1)) : (a = this._editWidget.map.getLayer(this.selectDropDown.value), b.attr("featureLayers", [a]), b.attr("grouping", !1)), b.update())
                    },
                    _onTempalteFilterChanged: function() {
                        var b = this.filterTextBox.value;
                        "All" === this.selectDropDown.options[this.selectDropDown.selectedIndex].text && "" === b ? this._editWidget.editor.templatePicker.attr("grouping", !0) : this._editWidget.editor.templatePicker.attr("grouping", !1);
                        this._editWidget.editor.templatePicker.update()
                    }
                })
            })
        },
        "widgets/Edit/RelatedRecordsEditor": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/on dojo/query dojo/Deferred ./utils dijit/_TemplatedMixin dijit/_WidgetBase esri/undoManager esri/OperationBase esri/graphic esri/tasks/query esri/tasks/QueryTask esri/tasks/RelationshipQuery esri/layers/FeatureLayer esri/dijit/AttributeInspector jimu/dijit/LoadingIndicator jimu/LayerInfos/LayerInfos".split(" "),
                function(p, m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g) {
                    var y = p([l, n], {
                        baseClass: "related-records-editor",
                        templateString: "\x3cdiv\x3e\x3cdiv class\x3d'operation-box' data-dojo-attach-point\x3d'operationBox'\x3e\x3cdiv class\x3d'previos-btn feature-action' data-dojo-attach-point\x3d'previouBtn'data-dojo-attach-event\x3d'click:_onPreviouBtnClick'\x3e\x3c/div\x3e\x3cdiv class\x3d'operation-title' data-dojo-attach-point\x3d'operationTitle'\x3e\x3c/div\x3e\x3cdiv class\x3d'add-new-btn' data-dojo-attach-point\x3d'addNewBtn'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'content-box' data-dojo-attach-point\x3d'contentBox'\x3e\x3c/div\x3e\x3c/div\x3e",
                        editorATI: null,
                        originalFeature: null,
                        originalLayer: null,
                        originalJimuLayerInfo: null,
                        layerInfosObj: null,
                        undoManager: null,
                        refDomNode: null,
                        _temporaryData: null,
                        tableInfosParam: null,
                        postCreate: function() {
                            this._init();
                            f.place(this.domNode, this.refDomNode, "after");
                            window.isRTL ? f.addClass(this.previouBtn, "icon-arrow-forward") : f.addClass(this.previouBtn, "icon-arrow-back");
                            this.loading = (new B({
                                hidden: !0
                            })).placeAt(this.domNode);
                            this._clearPage();
                            this.showFirstPage({
                                feature: this.originalFeature,
                                oriJimuLayerInfo: this.originalJimuLayerInfo
                            })
                        },
                        _init: function() {
                            this.refDomNode = this.editorATI.domNode;
                            this.originalLayer = this.originalFeature.getLayer();
                            this.layerInfosObj = g.getInstanceSync();
                            this.originalJimuLayerInfo = this.layerInfosObj.getLayerInfoById(this.originalLayer.id);
                            this.undoManager = new c;
                            this._temporaryData = {
                                eventHandles: [],
                                dijits: []
                            }
                        },
                        destroy: function() {
                            this._clearPage();
                            this.inherited(arguments)
                        },
                        _getRelatedTableInfoArray: function(a) {
                            var b = new e,
                                c = [];
                            a.getRelatedTableInfoArray("esriRelRoleOrigin").then(m.hitch(this, function(a) {
                                k.forEach(a,
                                    function(a) {
                                        this._findTableInfoFromTableInfosParam(a) && c.push(a)
                                    }, this);
                                b.resolve(c)
                            }));
                            return b
                        },
                        _getRelatedRecordsByQuery: function(a) {
                            var b = new e,
                                c = new u,
                                d = new q(a.destJimuLayerInfo.getUrl()),
                                f = a.destJimuLayerInfo.layerObject.relationships.keyField,
                                g = a.oriJimuLayerInfo.layerObject.objectIdField;
                            c.where = f ? f + " \x3d " + a.feature.attributes[f] : g + " \x3d " + a.feature.attributes[g];
                            c.outFields = ["*"];
                            d.execute(c, m.hitch(this, function(a) {
                                b.resolve(a)
                            }));
                            return b
                        },
                        _getRelatedRecordsByRelatedQuery: function(a) {
                            var b =
                                new e,
                                c = new w,
                                d = this._getOriRelationshipByDestLayer(a);
                            c.outFields = ["*"];
                            c.relationshipId = d.id;
                            var f = a.feature.attributes[a.oriJimuLayerInfo.layerObject.objectIdField];
                            c.objectIds = [f];
                            a.oriJimuLayerInfo.layerObject.queryRelatedFeatures(c, m.hitch(this, function(a) {
                                (a = a[f] && a[f].features) ? b.resolve(a): b.resolve([])
                            }), m.hitch(this, function() {
                                b.resolve([])
                            }));
                            return b
                        },
                        _getOriRelationshipByDestLayer: function(a) {
                            var b = null;
                            k.some(a.oriJimuLayerInfo.layerObject.relationships, function(c) {
                                if (c.relatedTableId ===
                                    a.destJimuLayerInfo.layerObject.layerId) return b = c, !0
                            }, this);
                            return b
                        },
                        _getDestRelationshipByDestLayer: function(a) {
                            var b = null;
                            k.some(a.destJimuLayerInfo.layerObject.relationships, function(c) {
                                if (c.relatedTableId === a.oriJimuLayerInfo.layerObject.layerId) return b = c, !0
                            }, this);
                            return b
                        },
                        _createATI: function(a) {
                            var b = null,
                                c = this._findTableInfoFromTableInfosParam(a.destJimuLayerInfo);
                            c && (b = new y.ATI({
                                layerInfos: [c],
                                hideNavButtons: !0
                            }, f.create("div")), b.startup(), this._temporaryData.dijits.push(b));
                            c = d(b,
                                "delete", m.hitch(this, this._onDeleteBtnClick, a));
                            this._temporaryData.eventHandles.push(c);
                            c = d(b, "attribute-change", m.hitch(this, this._onAttributeChange, a));
                            this._temporaryData.eventHandles.push(c);
                            return b
                        },
                        _findTableInfoFromTableInfosParam: function(a) {
                            var b = null;
                            k.some(this.tableInfosParam, function(c) {
                                if (c.featureLayer.id === a.id) return b = c, !0
                            }, this);
                            return b
                        },
                        _addNewRelatedRecord: function(b) {
                            var c = new e,
                                d = {},
                                f = b.destJimuLayerInfo.layerObject,
                                g = this._getOriRelationshipByDestLayer(b),
                                h = this._getDestRelationshipByDestLayer(b);
                            k.forEach(f.fields, function(a) {
                                "esriFieldTypeDate" === a.type && (d[a.name] = (new Date).valueOf())
                            }, this);
                            g.keyField && h.keyField && (g = a.ignoreCaseToGetFieldKey(b.oriJimuLayerInfo.layerObject, g.keyField), h = a.ignoreCaseToGetFieldKey(b.destJimuLayerInfo.layerObject, h.keyField), g && h && (d[h] = b.feature.attributes[g]));
                            var l = new t(null, null, d, null);
                            f.applyEdits([l], null, null, m.hitch(this, function(a) {
                                var b = a[0];
                                if (b.success && b.objectId) {
                                    a = new u;
                                    var d = new q(f.url);
                                    a.where = f.objectIdField + " \x3d " + b.objectId;
                                    a.outFields = ["*"];
                                    d.execute(a, m.hitch(this, function(a) {
                                        (a = a.features[0]) ? c.resolve(a): (l.attributes[f.objectIdField] = b.objectId, c.resolve(l))
                                    }), m.hitch(this, function() {
                                        c.reject()
                                    }))
                                } else c.reject()
                            }), m.hitch(this, function() {
                                c.reject()
                            }));
                            return c
                        },
                        _deleteRelatedRecord: function(a) {
                            var b = new e;
                            a.destJimuLayerInfo.layerObject.applyEdits(null, null, [a.relatedFeature], m.hitch(this, function() {
                                b.resolve()
                            }), m.hitch(this, function() {
                                b.reject()
                            }));
                            return b
                        },
                        _updateRelatedRecord: function(a, b) {
                            var c = new e,
                                d = a.destJimuLayerInfo.layerObject,
                                f = a.relatedFeature;
                            f.attributes[b.fieldName] = b.fieldValue;
                            d.applyEdits(null, [f], null, m.hitch(this, function() {
                                c.resolve()
                            }), m.hitch(this, function() {
                                c.reject()
                            }));
                            return c
                        },
                        _getDisplayTitleOfRelatedRecord: function(b, c) {
                            var d = a.getAttrByFieldKey(c, b.destJimuLayerInfo.layerObject.displayField);
                            if (d) {
                                var e = a.ignoreCaseToGetFieldObject(b.destJimuLayerInfo.layerObject, b.destJimuLayerInfo.layerObject.displayField);
                                e && (e.type && "esriFieldTypeDate" === e.type) && (d = a.getLocaleDateTime(d))
                            } else d = "";
                            return d
                        },
                        showRelatedRecords: function(a) {
                            this._setOperationTitle(a.destJimuLayerInfo.layerObject._name ?
                                a.destJimuLayerInfo.layerObject._name : a.destJimuLayerInfo.layerObject.name);
                            this._clearPage();
                            this.loading.show();
                            this._getRelatedRecordsByRelatedQuery(a).then(m.hitch(this, function(b) {
                                this._showAddNewBtn(a);
                                0 < b.length ? this._setTitle(this.nls.relatedRecords) : this._setTitle(this.nls.noRelatedRecotds, "font-normal");
                                k.forEach(b, function(b, c) {
                                    var e = this._getDisplayTitleOfRelatedRecord(a, b),
                                        e = f.create("div", {
                                            "class": "item record-item " + (0 === c % 2 ? "oddLine" : "evenLine"),
                                            innerHTML: e
                                        }, this.contentBox),
                                        e = d(e,
                                            "click", m.hitch(this, function() {
                                                this._addOperation(y.OPERATION_SHOW_RELATED_RECORDS, a);
                                                this.showInspector(this._createOperationData(a.feature, a.oriJimuLayerInfo, a.destJimuLayerInfo, b))
                                            }));
                                    this._temporaryData.eventHandles.push(e)
                                }, this);
                                this.loading.hide()
                            }))
                        },
                        showInspector: function(a) {
                            var b = (a.destJimuLayerInfo.layerObject._name ? a.destJimuLayerInfo.layerObject._name : a.destJimuLayerInfo.layerObject.name) + ": " + this._getDisplayTitleOfRelatedRecord(a, a.relatedFeature);
                            this._setOperationTitle(b);
                            this._clearPage();
                            this.loading.show();
                            (b = this._createATI(a)) && f.place(b.domNode, this.contentBox);
                            var b = a.destJimuLayerInfo.layerObject.objectIdField,
                                c = new u;
                            c.where = b + " \x3d " + a.relatedFeature.attributes[b];
                            a.destJimuLayerInfo.layerObject.selectFeatures(c, h.SELECTION_NEW, m.hitch(this, function() {
                                this.loading.hide()
                            }));
                            this.showRelatedTables(this._createOperationData(a.relatedFeature, a.destJimuLayerInfo, null, null), a)
                        },
                        showRelatedTables: function(a, b) {
                            this._getRelatedTableInfoArray(a.oriJimuLayerInfo).then(m.hitch(this,
                                function(c) {
                                    0 < c.length && this._setTitle(this.nls.relatedTables);
                                    k.forEach(c, function(c, e) {
                                        var g = f.create("div", {
                                                "class": "item table-item " + (0 === e % 2 ? "oddLine" : "evenLine"),
                                                innerHTML: c.title
                                            }, this.contentBox),
                                            g = d(g, "click", m.hitch(this, function() {
                                                c.getLayerObject().then(m.hitch(this, function() {
                                                    b ? this._addOperation(y.OPERATION_SHOW_INSPECTOR, b) : this._addOperation(y.OPERATION_FIRST, a);
                                                    this._changeRefDomNode();
                                                    this.showRelatedRecords(this._createOperationData(a.feature, a.oriJimuLayerInfo, c, null))
                                                }))
                                            }));
                                        this._temporaryData.eventHandles.push(g)
                                    }, this)
                                }))
                        },
                        showFirstPage: function(a) {
                            this._clearPage();
                            this._revertRefDomNode();
                            this.showRelatedTables(a)
                        },
                        _onAddNewBtnClick: function(a) {
                            this.loading.show();
                            this._addNewRelatedRecord(a).then(m.hitch(this, function(b) {
                                this.loading.hide();
                                this._addOperation(y.OPERATION_SHOW_RELATED_RECORDS, a);
                                this.showInspector(this._createOperationData(a.feature, a.oriJimuLayerInfo, a.destJimuLayerInfo, b))
                            }), m.hitch(this, function() {
                                this.loading.hide()
                            }))
                        },
                        _onDeleteBtnClick: function(a) {
                            this.loading.show();
                            this._deleteRelatedRecord(a).then(m.hitch(this, function() {
                                this.loading.hide();
                                this._onPreviouBtnClick()
                            }), m.hitch(this, function() {
                                this.loading.hide()
                            }))
                        },
                        _onAttributeChange: function(a, b) {
                            this.loading.show();
                            this._updateRelatedRecord(a, b).then(m.hitch(this, function() {
                                this.loading.hide()
                            }), m.hitch(this, function() {
                                this.loading.hide()
                            }))
                        },
                        _createOperationData: function(a, b, c, d) {
                            return {
                                feature: a,
                                oriJimuLayerInfo: b,
                                destJimuLayerInfo: c,
                                relatedFeature: d
                            }
                        },
                        _addOperation: function(a, b) {
                            this.undoManager.add(new y.Operation(a,
                                b, this))
                        },
                        _onPreviouBtnClick: function() {
                            this.undoManager.undo()
                        },
                        _clearPage: function() {
                            f.empty(this.contentBox);
                            f.setStyle(this.addNewBtn, "display", "none");
                            k.forEach(this._temporaryData.eventHandles, function(a) {
                                a && a.remove && a.remove()
                            }, this);
                            this._temporaryData.eventHandles = [];
                            k.forEach(this._temporaryData.dijits, function(a) {
                                a && a.destroy && a.destroy()
                            }, this);
                            this._temporaryData.dijits = []
                        },
                        _changeRefDomNode: function() {
                            f.setStyle(this.refDomNode, "display", "none");
                            f.setStyle(this.operationBox, "display",
                                "block");
                            f.addClass(this.domNode, "fix-height-mode");
                            this.previouBtn.title = window.jimuNls.common.back;
                            this.addNewBtn.title = window.jimuNls.common.newText
                        },
                        _revertRefDomNode: function() {
                            f.setStyle(this.refDomNode, "display", "block");
                            f.setStyle(this.operationBox, "display", "none");
                            f.removeClass(this.domNode, "fix-height-mode")
                        },
                        _showAddNewBtn: function(a) {
                            var b = a.destJimuLayerInfo.layerObject;
                            "Table" === b.type && (b.getEditCapabilities && b.getEditCapabilities().canCreate) && (f.setStyle(this.addNewBtn, "display",
                                "block"), a = d(this.addNewBtn, "click", m.hitch(this, this._onAddNewBtnClick, a)), this._temporaryData.eventHandles.push(a))
                        },
                        _setTitle: function(a, b) {
                            a && f.create("div", {
                                "class": "title-box " + (b ? b : ""),
                                innerHTML: a
                            }, this.contentBox)
                        },
                        _setOperationTitle: function(a) {
                            f.setAttr(this.operationTitle, "innerHTML", a);
                            f.setAttr(this.operationTitle, "title", a)
                        }
                    });
                    y.Operation = p([s], {
                        constructor: function(a, b, c) {
                            this.operationName = a;
                            this.operationData = b;
                            this.relatedRecordsEditor = c
                        },
                        performUndo: function() {
                            switch (this.operationName) {
                                case y.OPERATION_SHOW_RELATED_TABLES:
                                    return this.relatedRecordsEditor.showRelatedTables(this.operationData);
                                case y.OPERATION_SHOW_RELATED_RECORDS:
                                    return this.relatedRecordsEditor.showRelatedRecords(this.operationData);
                                case y.OPERATION_SHOW_INSPECTOR:
                                    return this.relatedRecordsEditor.showInspector(this.operationData);
                                default:
                                    return this.relatedRecordsEditor.showFirstPage(this.operationData)
                            }
                        }
                    });
                    y.ATI = p([r], {
                        constructor: function() {
                            this._aiConnects = [];
                            this._selection = [];
                            this._toolTips = []
                        }
                    });
                    m.mixin(y, {
                        OPERATION_SHOW_RELATED_TABLES: "showRelatedTables",
                        OPERATION_SHOW_RELATED_RECORDS: "showRelatedRecords",
                        OPERATION_SHOW_INSPECTOR: "showInspector",
                        OPERATION_FIRST: "first"
                    });
                    return y
                })
        },
        "widgets/Edit/_build-generate_module": function() {
            define(["dojo/text!./Widget.html", "dojo/text!./css/style.css", "dojo/i18n!./nls/strings"], function() {})
        },
        "url:dijit/templates/ProgressBar.html": '\x3cdiv class\x3d"dijitProgressBar dijitProgressBarEmpty" role\x3d"progressbar"\r\n\t\x3e\x3cdiv  data-dojo-attach-point\x3d"internalProgress" class\x3d"dijitProgressBarFull"\r\n\t\t\x3e\x3cdiv class\x3d"dijitProgressBarTile" role\x3d"presentation"\x3e\x3c/div\r\n\t\t\x3e\x3cspan style\x3d"visibility:hidden"\x3e\x26#160;\x3c/span\r\n\t\x3e\x3c/div\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"labelNode" class\x3d"dijitProgressBarLabel" id\x3d"${id}_label"\x3e\x3c/div\r\n\t\x3e\x3cspan data-dojo-attach-point\x3d"indeterminateHighContrastImage"\r\n\t\t   class\x3d"dijitInline dijitProgressBarIndeterminateHighContrastImage"\x3e\x3c/span\r\n\x3e\x3c/div\x3e\r\n',
        "url:esri/dijit/editing/templates/AttachmentEditor.html": "\x3cdiv class\x3d\"attachmentEditor\"\x3e\r\n    \x3cbr /\x3e\r\n    \x3cdiv\x3e\r\n        \x3cb\x3e${NLS_attachments}\x3c/b\x3e\r\n        \x3chr /\x3e\r\n        \x3cdiv dojoAttachPoint\x3d\"_attachmentError\" style\x3d'color:red;display:none'\x3e\x3c/div\x3e\r\n        \x3cbr /\x3e\r\n        \x3cspan dojoAttachPoint\x3d'_attachmentList' style\x3d'word-wrap: break-word;'\x3e\x3c/span\x3e\r\n        \x3cbr\x3e\x3cbr\x3e\r\n        \x3cdiv data-dojo-type\x3d\"dijit/ProgressBar\" dojoAttachPoint\x3d\"_attachmentProgress\" indeterminate\x3d\"true\" style\x3d'display:none'\x3e\x3c/div\x3e\r\n        \x3cbr /\x3e        \r\n        \x3cform dojoAttachPoint\x3d'_uploadForm'\x3e ${NLS_add}:\x26nbsp;\x26nbsp;\x3cinput type\x3d'file' name\x3d'attachment' dojoAttachPoint\x3d'_uploadField' /\x3e \x3c/form\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e",
        "url:dijit/templates/Calendar.html": '\x3cdiv class\x3d"dijitCalendarContainer dijitInline" role\x3d"presentation" aria-labelledby\x3d"${id}_mddb ${id}_year"\x3e\r\n\t\x3cdiv class\x3d"dijitReset dijitCalendarMonthContainer" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv class\x3d\'dijitReset dijitCalendarArrow dijitCalendarDecrementArrow\' data-dojo-attach-point\x3d"decrementMonth"\x3e\r\n\t\t\t\x3cimg src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitCalendarIncrementControl dijitCalendarDecrease" role\x3d"presentation"/\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"decreaseArrowNode" class\x3d"dijitA11ySideArrow"\x3e-\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv class\x3d\'dijitReset dijitCalendarArrow dijitCalendarIncrementArrow\' data-dojo-attach-point\x3d"incrementMonth"\x3e\r\n\t\t\t\x3cimg src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitCalendarIncrementControl dijitCalendarIncrease" role\x3d"presentation"/\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"increaseArrowNode" class\x3d"dijitA11ySideArrow"\x3e+\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv data-dojo-attach-point\x3d"monthNode" class\x3d"dijitInline"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\x3ctable cellspacing\x3d"0" cellpadding\x3d"0" role\x3d"grid" data-dojo-attach-point\x3d"gridNode"\x3e\r\n\t\t\x3cthead\x3e\r\n\t\t\t\x3ctr role\x3d"row"\x3e\r\n\t\t\t\t${!dayCellsHtml}\r\n\t\t\t\x3c/tr\x3e\r\n\t\t\x3c/thead\x3e\r\n\t\t\x3ctbody data-dojo-attach-point\x3d"dateRowsNode" data-dojo-attach-event\x3d"ondijitclick: _onDayClick" class\x3d"dijitReset dijitCalendarBodyContainer"\x3e\r\n\t\t\t\t${!dateRowsHtml}\r\n\t\t\x3c/tbody\x3e\r\n\t\x3c/table\x3e\r\n\t\x3cdiv class\x3d"dijitReset dijitCalendarYearContainer" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv class\x3d"dijitCalendarYearLabel"\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"previousYearLabelNode" class\x3d"dijitInline dijitCalendarPreviousYear" role\x3d"button"\x3e\x3c/span\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"currentYearLabelNode" class\x3d"dijitInline dijitCalendarSelectedYear" role\x3d"button" id\x3d"${id}_year"\x3e\x3c/span\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"nextYearLabelNode" class\x3d"dijitInline dijitCalendarNextYear" role\x3d"button"\x3e\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:esri/dijit/templates/AttributeInspector.html": '\x3cdiv class\x3d"esriAttributeInspector"\x3e\r\n    \x3cdiv class\x3d"atiLayerName" dojoAttachPoint\x3d"layerName"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiAttributes" dojoAttachPoint\x3d"attributeTable"\x3e\x3c/div\x3e\r\n    \x3cdiv dojoAttachPoint\x3d"attachmentEditor"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiEditorTrackingInfo" dojoAttachPoint\x3d"editorTrackingInfoDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiButtons" dojoAttachPoint\x3d"editButtons"\x3e\r\n        \x3cbutton  dojoType\x3d"dijit.form.Button" class\x3d"atiButton atiDeleteButton"  dojoAttachPoint\x3d"deleteBtn" dojoAttachEvent\x3d"onClick: onDeleteBtn" showLabel\x3d"true" type\x3d"button"\x3e${NLS_deleteFeature}\x3c/button\x3e\r\n        \x3cdiv class\x3d"atiNavButtons" dojoAttachPoint\x3d"navButtons"\x3e\r\n            \x3cdiv class\x3d"atiNavMessage" dojoAttachPoint\x3d"navMessage"\x3e\x3c/div\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiFirstIcon" dojoAttachPoint\x3d"firstFeatureButton" dojoAttachEvent\x3d"onClick: onFirstFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_first}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiPrevIcon" dojoAttachPoint\x3d"prevFeatureButton" dojoAttachEvent\x3d"onClick: onPreviousFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_previous}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiNextIcon" dojoAttachPoint\x3d"nextFeatureButton" dojoAttachEvent\x3d"onClick: onNextFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_next}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiLastIcon" dojoAttachPoint\x3d"lastFeatureButton" dojoAttachEvent\x3d"onClick: onLastFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_last}\x3c/button\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:dojox/grid/resources/View.html": '\x3cdiv class\x3d"dojoxGridView" role\x3d"presentation"\x3e\r\n\t\x3cdiv class\x3d"dojoxGridHeader" dojoAttachPoint\x3d"headerNode" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv dojoAttachPoint\x3d"headerNodeContainer" style\x3d"width:9000em" role\x3d"presentation"\x3e\r\n\t\t\t\x3cdiv dojoAttachPoint\x3d"headerContentNode" role\x3d"row"\x3e\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\x3cinput type\x3d"checkbox" class\x3d"dojoxGridHiddenFocus" dojoAttachPoint\x3d"hiddenFocusNode" aria-hidden\x3d"true" /\x3e\r\n\t\x3cinput type\x3d"checkbox" class\x3d"dojoxGridHiddenFocus" aria-hidden\x3d"true" /\x3e\r\n\t\x3cdiv class\x3d"dojoxGridScrollbox" dojoAttachPoint\x3d"scrollboxNode" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv class\x3d"dojoxGridContent" dojoAttachPoint\x3d"contentNode" hidefocus\x3d"hidefocus" role\x3d"presentation"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:dojox/grid/resources/_Grid.html": '\x3cdiv hidefocus\x3d"hidefocus" role\x3d"grid" dojoAttachEvent\x3d"onmouseout:_mouseOut"\x3e\r\n\t\x3cdiv class\x3d"dojoxGridMasterHeader" dojoAttachPoint\x3d"viewsHeaderNode" role\x3d"presentation"\x3e\x3c/div\x3e\r\n\t\x3cdiv class\x3d"dojoxGridMasterView" dojoAttachPoint\x3d"viewsNode" role\x3d"presentation"\x3e\x3c/div\x3e\r\n\t\x3cdiv class\x3d"dojoxGridMasterMessages" style\x3d"display: none;" dojoAttachPoint\x3d"messagesNode"\x3e\x3c/div\x3e\r\n\t\x3cspan dojoAttachPoint\x3d"lastFocusNode" tabindex\x3d"0"\x3e\x3c/span\x3e\r\n\x3c/div\x3e\r\n',
        "url:esri/dijit/editing/templates/TemplatePicker.html": '\x3cdiv class\x3d"templatePicker"\x3e\r\n\r\n  \x3ctable dojoType\x3d"dojox.grid.DataGrid" noDataMessage\x3d"${emptyMessage}" selectionMode\x3d"none" autoHeight\x3d"${_rows}" autoWidth\x3d"${_autoWidth}"\r\n         query\x3d"{ query: \'*\' }" dojoAttachPoint\x3d"grid" class\x3d"grid"\x3e\r\n  \x3c/table\x3e\r\n  \r\n\x3c/div\x3e',
        "url:esri/dijit/editing/templates/Editor.html": '\x3cdiv class\x3d"esriEditor"\x3e\r\n    \x3cdiv class\x3d"esriTemplatePicker" dojoAttachPoint\x3d"templatePickerDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriDrawingToolbar" dojoAttachPoint\x3d"drawingToolbarDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"progressBar" dojoAttachPoint\x3d"progressBar" indeterminate\x3d"true" dojoType\x3d"dijit.ProgressBar" /\x3e\r\n\x3c/div\x3e',
        "url:widgets/Edit/Widget.html": '\x3cdiv style\x3d"width:100%; height:100%; min-width:280px;min-width:240px;"\x3e\r\n  \x3cdiv\x3e\r\n    ${nls.title}\x3cbr\x3e\x3cbr\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:widgets/Edit/css/style.css": '.jimu-widget-edit-infoWindow .related-records-editor {}.jimu-widget-edit-infoWindow .related-records-editor.fix-height-mode{height: 235px;}.jimu-widget-edit-infoWindow.esriPopupMaximized .related-records-editor.fix-height-mode{height: 100%;}.jimu-widget-edit-infoWindow .related-records-editor .operation-box {border-bottom: 1px solid #DDDDDD; height: 28px; line-height: 18px; text-align: center; position: absolute; left: 0; right: 0; font-family: "Avenir Heavy"; font-size: 16px;}.jimu-widget-edit-infoWindow .related-records-editor .previos-btn{float: left; cursor: pointer; height: 100%; line-height: 17px; margin-left: 20px;}.jimu-rtl .jimu-widget-edit-infoWindow .related-records-editor .previos-btn{float: right; margin-right: 20px; margin-left: auto;}.jimu-widget-edit-infoWindow .related-records-editor .operation-title{display: inline-block; max-width: 80%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}.jimu-widget-edit-infoWindow .related-records-editor .add-new-btn{display: none; float: right; cursor: pointer; margin-right: 20px; background-image: url("images/add_normal.svg"); background-repeat: no-repeat; width: 16px; height: 16px;}.jimu-rtl .jimu-widget-edit-infoWindow .related-records-editor .add-new-btn{float: left; margin-right: auto; margin-left: 20px;}.jimu-widget-edit-infoWindow .related-records-editor .add-new-btn:hover{background-image: url("images/add_hover.svg");}.jimu-widget-edit-infoWindow .related-records-editor.fix-height-mode .content-box{position: absolute; top: 45px; bottom: 0; left: 10px; right: 0px; overflow-y: auto; overflow-x: hidden;}.jimu-widget-edit-infoWindow .related-records-editor .content-box .title-box{font-family: "Avenir Heavy"; height: 34px; line-height: 34px; padding-left: 10px; padding-right: 10px;}.jimu-widget-edit-infoWindow .related-records-editor .content-box .title-box.font-normal{font-weight: normal; color: #666666;}.jimu-widget-edit-infoWindow .related-records-editor .content-box .item{position: relative; height: 30px; line-height: 30px; width: 100%; background-color: #ffffff; color: #000000; padding-left: 10px; padding-right: 10px; background-image: url("images/edit_default.svg"); background-repeat: no-repeat; background-position: right 10px center;}.jimu-rtl .jimu-widget-edit-infoWindow .related-records-editor .content-box .item{background-position: left 10px center;}.jimu-widget-edit-infoWindow .related-records-editor .content-box .item.oddLine{background-color: #f3f3f3;}.jimu-widget-edit-infoWindow .related-records-editor .content-box .item:hover{cursor: pointer; border-color: rgba(0, 0, 0, 1.0); font-family: "Avenir Heavy"; background-image: url("images/edit_hover.svg");}.jimu-widget-edit-infoWindow .related-records-editor .content-box .item .edit-icon{position: absolute; right: 5px; top: 7px;}.jimu-rtl .jimu-widget-edit-infoWindow .related-records-editor .content-box .item .edit-icon{right: auto; left: 10px;}.jimu-widget-edit-infoWindow .related-records-editor .esriAttributeInspector{padding-right: 2px;}.jimu-widget-edit-infoWindow .related-records-editor .esriAttributeInspector .atiLayerName{display: none;}.jimu-widget-FilterEditor {}.jimu-widget-FilterEditor .flDropDown {width: 100%; -webkit-appearance: menulist-button; height: 30px; border-radius: 4px; border: 1px solid #b9b9b9; color: #838383; margin-top: 2px; margin-bottom: 10px;}.jimu-widget-FilterEditor .searchtextbox {border: 1px solid #b9b9b9; color: #838383; width: 100%; padding: 5px; margin-bottom: 1px; border-radius: 4px 4px 0px 0px;}.jimu-widget-FilterEditor .searchtextbox:focus {border: 1px solid #838383;}.jimu-widget-FilterEditor .searchtextbox:hover {border: 1px solid #838383;}.jimu-widget-edit {position: relative;}.jimu-widget-edit .jimu-loading-shelter .loading-container {width: 48px;}.jimu-widget-edit .templatePicker {position: absolute; width: 100%; bottom: 53px;}.jimu-widget-edit .dojoxGridRow {border: 0;}.jimu-widget-edit .dojoxGridScrollbox {overflow-x: hidden;}.jimu-widget-edit .templatePicker .grid .dojoxGridCell {border: 0px solid #FFFFFF;}.jimu-widget-edit .esriEditor {position: absolute; bottom: 0; height: 30px; width: 100%;}.jimu-widget-edit .esriDrawingToolbar {position: absolute; right: 0; left: 0; bottom: 0; min-height: 50px;}.jimu-widget-edit-infoWindow .esriAttributeInspector {width: 100%;}.jimu-widget-edit-infoWindow .esriAttributeInspector .atiAttributes table {width: 100%;}.jimu-widget-edit-infoWindow .esriAttributeInspector .atiLabel {}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitTextBox {width: 100%; border-color: #dddddd; margin: 3px auto;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitInputField {}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitTextBox .dijitInputInner {}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitTextBoxFocused {border-color: #afafaf !important; box-shadow: 0 0 0 #ffffff !important;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitTextBoxHover{background-color: #ffffff; background-image: none; border-color: #afafaf !important;}.jimu-widget-edit-infoWindow .esriAttributeInspector .atiRichTextField{}.jimu-widget-edit-infoWindow .esriAttributeInspector div.dijitEditorIFrameContainer {height: 78px;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitTextBox.dijitTextArea {height: 32px;}.jimu-widget-edit-infoWindow .esriAttributeInspector .atiButtons {padding-top: 10px; height: 35px;}.jimu-widget-edit-infoWindow .esriAttributeInspector .atiButton {margin: 0 0 0 10px; float: none; width: auto; float: right;}.jimu-rtl .jimu-widget-edit-infoWindow .esriAttributeInspector .atiButton {margin: 0 10px 0 0px; float: left;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitButtonNode{border: 1px solid #979797; color: #000000; border-radius: 0px; background-color: #ffffff; background-image: none;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitButtonText{height: 22px; min-width: 60px; line-height: 22px;}.jimu-widget-edit-infoWindow .esriAttributeInspector .dijitButtonNode:hover{border: 1px solid #555555; font-family: "Avenir Heavy";}',
        "*now": function(p) {
            p(['dojo/i18n!*preload*widgets/Edit/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])
        }
    }
});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/i18n!esri/nls/jsapi dojo/on dojo/query dojo/json dojo/Deferred dojo/aspect dojo/promise/all dijit/_WidgetsInTemplateMixin jimu/BaseWidget jimu/MapManager jimu/LayerInfos/LayerInfos jimu/dijit/LoadingShelter jimu/utils jimu/portalUrlUtils jimu/SelectionManager esri/dijit/editing/Editor esri/dijit/Popup esri/dijit/editing/TemplatePicker esri/geometry/Extent esri/geometry/Point esri/renderers/jsonUtils dijit/form/Button ./utils ./FilterEditor ./RelatedRecordsEditor".split(" "), function(p,
    m, k, f, d, b, e, a, n, l, c, s, t, u, q, w, h, r, B, g, y, v, x, z, E, A, D, G, F) {
    return p([t, s], {
        name: "Edit",
        baseClass: "jimu-widget-edit",
        editor: null,
        _defaultStartStr: "",
        _defaultAddPointStr: "",
        _mapInfoStorage: null,
        _jimuLayerInfos: null,
        editPopup: null,
        _configEditor: null,
        _layerObjectsParaForTempaltePicker: null,
        _createOverDef: null,
        _releaseEventArrayAfterActive: null,
        _releaseEventArrayAfterClose: null,
        _canCreateLayersAreAllInvisibleFlag: null,
        _layerInfoParamArrayUseForRervertRenderre: null,
        layerInfosParam: null,
        tableInfosParam: null,
        layerInfosParamClone: null,
        tableInfosParamClone: null,
        _tableInfoParamDef: null,
        startup: function() {
            this.inherited(arguments);
            this.editPopup = new y(null, f.create("div", {
                "class": "jimu-widget-edit-infoWindow"
            }, null, this.map.root));
            this.loading = new w({
                hidden: !0
            });
            this.loading.placeAt(this.domNode)
        },
        _init: function() {
            this._mapInfoStorage = {
                resetInfoWindow: null,
                snappingTolerance: null,
                editorATIonLayerSelectionChange: null
            };
            this._editorMapClickHandlers = [];
            this._layerObjectsParaForTempaltePicker = [];
            this._configEditor =
                m.clone(this.config.editor);
            this._releaseEventArrayAfterActive = [];
            this._releaseEventArrayAfterClose = [];
            this._canCreateLayersAreAllInvisibleFlag = !1;
            this._layerInfoParamArrayUseForRervertRenderre = [];
            this._createOverDef = new n;
            this._tableInfoParamDef = new n
        },
        onOpen: function() {
            this._init();
            q.getInstance(this.map, this.map.itemInfo).then(m.hitch(this, function(a) {
                this._jimuLayerInfos = a;
                "BoxTheme" === this.appConfig.theme.name ? (a = 1050, this.loading.show()) : a = 1;
                setTimeout(m.hitch(this, function() {
                    this.loading.hidden ||
                        this.loading.hide();
                    this.widgetManager.activateWidget(this);
                    this._createEditor()
                }), a);
                this._getTableInfosParam().then(m.hitch(this, function(a) {
                    this.tableInfosParam = a;
                    this.tableInfosParamClone = this._cloneLayerOrTableInfosParam(this.tableInfosParam);
                    this._tableInfoParamDef.resolve()
                }))
            }))
        },
        beginEditingByFeatures: function(a, b) {
            if (0 !== a.length) {
                var c = a[0];
                "point" !== c.geometry.type && c.geometry.getExtent().getCenter();
                this._createOverDef.then(m.hitch(this, function() {
                    "active" !== this.state && this.widgetManager.activateWidget(this);
                    k.forEach(this._jimuLayerInfos.getLayerInfoArray(), function(a) {
                        a.layerObject && a.layerObject.clearSelection && B.getInstance().clearSelection(a.layerObject)
                    }, this);
                    B.getInstance().setSelection(b, a).then(m.hitch(this, function() {
                        this.editor._updatePopupButtons(a);
                        this.editor._onEditFeature(a)
                    }))
                }))
            }
        },
        onActive: function() {
            this.disableWebMapPopup();
            this._bindEventAfterActive()
        },
        onDeActive: function() {
            this.enableWebMapPopup();
            this._releaseEventAfterActive()
        },
        disableWebMapPopup: function() {
            var a = u.getInstance();
            a.disableWebMapPopup();
            this.map.infoWindow.hide();
            this.map.setInfoWindow(this.editPopup);
            this._enableMapClickHandler();
            null === this._mapInfoStorage.resetInfoWindow && (this._mapInfoStorage.resetInfoWindow = a.resetInfoWindow, this.own(b(this.map.infoWindow, "show", m.hitch(this, function() {
                window.appInfo.isRunInMobile && (this.map.infoWindow.maximize(), setTimeout(m.hitch(this, function() {
                    f.addClass(this.editPopup.domNode, "esriPopupMaximized")
                }), 1))
            }))));
            a.resetInfoWindow = m.hitch(this, function() {});
            this.map.snappingManager &&
                void 0 !== this._configEditor.snappingTolerance && (this._mapInfoStorage.snappingTolerance = this.map.snappingManager.tolerance, this.map.snappingManager.tolerance = this._configEditor.snappingTolerance)
        },
        enableWebMapPopup: function() {
            var a = u.getInstance(),
                b = a.getMapInfoWindow();
            this._mapInfoStorage.resetInfoWindow && (this.map.setInfoWindow(b.bigScreen), a.isMobileInfoWindow = !1, a.resetInfoWindow = m.hitch(a, this._mapInfoStorage.resetInfoWindow), this._mapInfoStorage.resetInfoWindow = null, a.resetInfoWindow(), this._disableMapClickHandler(),
                this.editPopup.hide(), this.editor._clearSelection(), a.enableWebMapPopup());
            this.map.snappingManager && null !== this._mapInfoStorage.snappingTolerance && (this.map.snappingManager.tolerance = this._mapInfoStorage.snappingTolerance)
        },
        _enableMapClickHandler: function() {
            this.editor && (this._editorMapClickHandlers.push(this.editor._mapClickHandler), this.editor._enableMapClickHandler(), this._editorMapClickHandlers.push(this.editor._mapClickHandler))
        },
        _disableMapClickHandler: function() {
            this.editor && (this.editor._disableMapClickHandler(),
                k.forEach(this._editorMapClickHandlers, function(a) {
                    a && a.remove && a.remove()
                }, this), this._editorMapClickHandlers = [])
        },
        _cloneLayerOrTableInfosParam: function(a) {
            var b = [];
            k.forEach(a, function(a) {
                var c = a.featureLayer;
                a.featureLayer = null;
                var d = m.clone(a);
                d.featureLayer = c;
                a.featureLayer = c;
                b.push(d)
            }, this);
            return b
        },
        _getDefaultFieldInfos: function(a) {
            (a = D.getFieldInfosFromWebmap(a, this._jimuLayerInfos)) && (a = k.filter(a, function(a) {
                return a.visible || a.isEditable
            }));
            return a
        },
        _getDefaultLayerInfoById: function(a) {
            var b = {
                featureLayer: {}
            };
            b.featureLayer.id = a;
            b.disableGeometryUpdate = !1;
            if ((a = this._getDefaultFieldInfos(a)) && 0 < a.length) b.fieldInfos = a;
            return b
        },
        _getDefaultTableInfos: function() {
            var a = [],
                b = this._jimuLayerInfos.getTableInfoArray();
            k.forEach(b, function(b) {
                b = this._getDefaultLayerInfoById(b.id);
                a.push(b)
            }, this);
            return a
        },
        _getDefaultLayerInfos: function() {
            for (var a = [], b = this.map.graphicsLayerIds.length - 1; 0 <= b; b--) {
                var c = this.map.getLayer(this.map.graphicsLayerIds[b]);
                "Feature Layer" === c.type && c.url && (c = this._getDefaultLayerInfoById(c.id),
                    a.push(c))
            }
            return a
        },
        _converConfiguredLayerInfos: function(a) {
            function b(a, c) {
                for (var d = null, e = 0; e < a.graphicsLayerIds.length; e++) {
                    var f = a.getLayer(a.graphicsLayerIds[e]);
                    if (f && f.url && r.removeProtocol(f.url.toLowerCase()) === r.removeProtocol(c.toLowerCase())) {
                        d = f;
                        break
                    }
                }
                return d
            }
            k.forEach(a, function(a) {
                if (!a.featureLayer.id && a.featureLayer.url) {
                    var c = b(this.map, a.featureLayer.url);
                    c && (a.featureLayer.id = c.id)
                }
                var d = [],
                    e = D.getFieldInfosFromWebmap(a.featureLayer.id, this._jimuLayerInfos);
                k.forEach(a.fieldInfos,
                    function(a) {
                        var b;
                        b = null;
                        if (e)
                            for (var c = 0; c < e.length; c++)
                                if (a.fieldName === e[c].fieldName) {
                                    e[c].label = a.label;
                                    e[c].isEditableSettingInWebmap = e[c].isEditable;
                                    e[c].isEditable = a.isEditable;
                                    b = e[c];
                                    break
                                }
                        if (void 0 === a.visible) b ? (b.isEditable || b.isEditableSettingInWebmap || b.visible) && d.push(b) : d.push(a);
                        else if (a.visible || a.isEditable) b ? d.push(b) : d.push(a)
                    }, this);
                0 !== d.length && (a.fieldInfos = d)
            }, this);
            return a
        },
        _getLayerInfosParam: function() {
            var a, b = [];
            a = this._configEditor.layerInfos ? 0 < this._configEditor.layerInfos.length ?
                this._converConfiguredLayerInfos(this._configEditor.layerInfos) : this._getDefaultLayerInfos() : [];
            k.forEach(a, function(a) {
                var c = this.map.getLayer(a.featureLayer.id);
                c && (c.visible && c.isEditable && c.isEditable()) && (a.featureLayer = c, b.push(a));
                !this._canCreateLayersAreAllInvisibleFlag && (c && c.isEditable && c.isEditable() && c.getEditCapabilities && c.getEditCapabilities() && !c.visible) && (this._canCreateLayersAreAllInvisibleFlag = !0)
            }, this);
            this.layerInfosParam = b;
            this.layerInfosParamClone = this._cloneLayerOrTableInfosParam(this.layerInfosParam);
            return b
        },
        _getTemplatePicker: function(a) {
            this._layerObjectsParaForTempaltePicker = [];
            k.forEach(a, function(a) {
                a.featureLayer && (a.featureLayer.getEditCapabilities && a.featureLayer.getEditCapabilities().canCreate) && this._layerObjectsParaForTempaltePicker.push(a.featureLayer)
            }, this);
            this._defaultTempaltePickerEmpeyStr = d.widgets.templatePicker.creationDisabled;
            this._canCreateLayersAreAllInvisibleFlag && (d.widgets.templatePicker.creationDisabled = this.nls.noCanCreateLayerAreCurrentlyVisible);
            a = new v({
                featureLayers: this._layerObjectsParaForTempaltePicker,
                grouping: !0,
                rows: "auto",
                columns: "auto",
                style: (this._configEditor.toolbarVisible ? "" : "bottom: 0px") + ";" + (this._configEditor.useFilterEdit ? "top: 115px" : "top: 18px")
            }, f.create("div", {}, this.domNode));
            a.startup();
            return a
        },
        _getSettingsParam: function() {
            var a = {
                    map: this.map,
                    createOptions: {
                        polygonDrawTools: [g.CREATE_TOOL_ARROW, g.CREATE_TOOL_AUTOCOMPLETE, g.CREATE_TOOL_CIRCLE, g.CREATE_TOOL_ELLIPSE, g.CREATE_TOOL_RECTANGLE, g.CREATE_TOOL_TRIANGLE, g.CREATE_TOOL_POLYGON, g.CREATE_TOOL_FREEHAND_POLYGON],
                        polylineDrawTools: [g.CREATE_TOOL_POLYLINE,
                            g.CREATE_TOOL_FREEHAND_POLYLINE
                        ]
                    }
                },
                b;
            for (b in this._configEditor) a[b] = this._configEditor[b];
            a.layerInfos = this._getLayerInfosParam();
            a.templatePicker = this._getTemplatePicker(a.layerInfos);
            void 0 !== this._configEditor.popupTolerance && (a.singleSelectionTolerance = this._configEditor.popupTolerance);
            return a
        },
        _createEditor: function() {
            var a = {
                settings: this._getSettingsParam()
            };
            this._worksBeforeCreate(a.settings);
            this.editor = new g(a, f.create("div", {}, this.domNode));
            this.editor.startup();
            this._worksAfterCreate(a.settings)
        },
        _addButtonToInspector: function() {
            var a = new A({
                label: this.nls.close,
                "class": " atiButton closeButton"
            }, f.create("div"));
            f.place(a.domNode, this.editor.attributeInspector.deleteBtn.domNode, "before");
            this.own(b(a, "click", m.hitch(this, function() {
                this.editPopup.hide()
            })))
        },
        _addFilterEditor: function(a) {
            this._configEditor.useFilterEdit && (this._filterEditor = new G({
                _settings: a,
                _editWidget: this
            }, f.create("div", {}, this.domNode)))
        },
        _worksBeforeCreate: function(a) {
            var b = "\x3cbr/\x3e(" + this.nls.pressStr + "\x3cb\x3e" +
                this.nls.ctrlStr + "\x3c/b\x3e " + this.nls.snapStr + ")";
            this._defaultStartStr = d.toolbars.draw.start;
            this._defaultAddPointStr = d.toolbars.draw.addPoint;
            d.toolbars.draw.start += b;
            d.toolbars.draw.addPoint += b;
            k.forEach(a.layerInfos, function(a) {
                var b = this._jimuLayerInfos.getLayerInfoByTopLayerId(a.featureLayer.id);
                b && (a.featureLayer._name = a.featureLayer.name, a.featureLayer.name = b.title)
            }, this);
            this._changeToServiceRenderer(a)
        },
        _worksAfterCreate: function(a) {
            this._addButtonToInspector();
            this._configEditor.toolbarVisible &&
                this._disableDeleteBtnInToolbar();
            this.editPopup.resize(500, 251);
            this.editor.templatePicker.update(!0);
            this._addFilterEditor(a);
            this._bindEventsAfterCreate(a);
            this._createOverDef.resolve()
        },
        _worksAfterClose: function() {
            d.toolbars.draw.start = this._defaultStartStr;
            d.toolbars.draw.addPoint = this._defaultAddPointStr;
            d.widgets.templatePicker.creationDisabled = this._defaultTempaltePickerEmpeyStr;
            var a = this.map.getLayer("labels");
            a && a.show();
            this._filterEditor && this._filterEditor.destroy();
            this._revertToLayerRenderer();
            this._releaseEventAfterClose()
        },
        _bindEventsAfterCreate: function(a) {
            this.own(b(this.editor.editToolbar, "graphic-move-stop", m.hitch(this, this._onGraphicMoveStop)));
            this.own(b(this.editor.attributeInspector, "next", m.hitch(this, this._onNextOfEditorATI)));
            var c = b(this.editPopup, "show", m.hitch(this, this._onEditorPopupShow));
            this._releaseEventArrayAfterClose.push(c);
            c = b(this.editPopup, "hide", m.hitch(this, this._onEditorPopupHide));
            this._releaseEventArrayAfterClose.push(c);
            k.forEach(a.layerInfos, function(a) {
                c =
                    b(a.featureLayer, "selection-complete", m.hitch(this, this._onLayerSelectionChange));
                this._releaseEventArrayAfterClose.push(c)
            }, this)
        },
        _releaseEventAfterClose: function() {
            k.forEach(this._releaseEventArrayAfterClose, function(a) {
                a.remove()
            }, this);
            this._releaseEventArrayAfterClose = []
        },
        _bindEventAfterActive: function() {
            var a = l.before(this.map, "onClick", m.hitch(this, this._beforeMapClick));
            this._releaseEventArrayAfterActive.push(a)
        },
        _releaseEventAfterActive: function() {
            k.forEach(this._releaseEventArrayAfterActive,
                function(a) {
                    a.remove()
                }, this);
            this._releaseEventArrayAfterActive = []
        },
        _changeToServiceRenderer: function(b) {
            k.forEach(b.layerInfos, function(b) {
                if (b.featureLayer._json) {
                    var c = b.featureLayer.renderer,
                        d = c.toJson(),
                        e = a.parse(b.featureLayer._json).drawingInfo.renderer;
                    h.isEqual(d, e) || (b._layerRenderer = c, this._layerInfoParamArrayUseForRervertRenderre.push(b), b.featureLayer.setRenderer(E.fromJson(e)), b.featureLayer.redraw())
                }
            }, this)
        },
        _revertToLayerRenderer: function() {
            k.forEach(this._layerInfoParamArrayUseForRervertRenderre,
                function(a) {
                    a._layerRenderer && (a.featureLayer.setRenderer(a._layerRenderer), a.featureLayer.redraw())
                }, this);
            this._layerInfoParamArrayUseForRervertRenderre = []
        },
        _updateSelectedFeature: function(a) {
            a && (a.getLayer().applyEdits(null, [a]), this.editor._clearSelection())
        },
        _autoApplyEditWhenGeometryIsModified: function() {
            var a = this.editor.editToolbar.getCurrentState(),
                b = a && a.graphic;
            this._configEditor.autoApplyEditWhenGeometryIsMoved && (this._checkStickyMoveTolerance() ? this._updateSelectedFeature(b) : a.isModified &&
                "point" !== b.geometry.type && this._updateSelectedFeature(b))
        },
        _checkStickyMoveTolerance: function() {
            var a = !0,
                b = this.editor.editToolbar.getCurrentState();
            if (b = b && b.graphic) this._isOutStickyMoveToleranceCheckedByMoveTrack(b) || (this._revertGraphicPosition(b), a = !1), delete b._moveTrack, delete b._originalGeometryAtMoveStart;
            return a
        },
        _isOutStickyMoveToleranceCheckedByOriginalGeometry: function(a) {
            var b, c, d, e = !0;
            "point" === a.geometry.type ? (b = a._originalGeometryAtMoveStart, c = a.geometry) : a.geometry.getExtent &&
                a._originalGeometryAtMoveStart.getExtent && (b = a._originalGeometryAtMoveStart.getExtent().getCenter(), c = a.geometry.getExtent().getCenter());
            this._configEditor.stickyMoveTolerance && (b && c) && (d = this.map.extent.getWidth(), d /= this.map.width, d *= this._configEditor.stickyMoveTolerance, a = new x(0, 0, d, d, a.spatialReference), a = a.centerAt(b), a.contains(c) && (e = !1));
            return e
        },
        _isOutStickyMoveToleranceCheckedByMoveTrack: function(a) {
            var b = !0,
                c;
            c = a._moveTrack;
            var d;
            c && (d = new z(c.x, c.y, a.spatialReference));
            this._configEditor.stickyMoveTolerance &&
                d && (c = this.map.extent.getWidth(), c /= this.map.width, c *= this._configEditor.stickyMoveTolerance, a = new x(-c / 2, -c / 2, c, c, a.spatialReference), a.contains(d) && (b = !1));
            return b
        },
        _revertGraphicPosition: function(a) {
            var b = a._moveTrack;
            if (b) {
                switch (a.geometry.type) {
                    case "point":
                        a.geometry.x -= b.x;
                        a.geometry.y += b.y;
                        break;
                    case "polygon":
                        k.forEach(a.geometry.rings, function(a) {
                            k.forEach(a, function(a) {
                                a[0] -= b.x;
                                a[1] += b.y
                            })
                        });
                        break;
                    case "polyline":
                        k.forEach(a.geometry.paths, function(a) {
                            k.forEach(a, function(a) {
                                a[0] -= b.x;
                                a[1] += b.y
                            })
                        });
                        break;
                    case "multiPoint":
                        k.forEach(a.geometry.points, function(a) {
                            a[0] -= b.x;
                            a[1] += b.y
                        });
                        break;
                    default:
                        return
                }
                this._configEditor.autoApplyEditWhenGeometryIsMoved || k.forEach(this.editor.editToolbar._getAffectedTools("MOVE"), function(a) {
                    a.suspend()
                }, this);
                "point" === a.geometry.type && this.editor._clearSelection();
                a.draw()
            }
        },
        _recordsSelectedFeatureInfoWhenMoveStart: function(a) {
            if ((a = a && a.graphic) && a.geometry) a._originalGeometryAtMoveStart = m.clone(a.geometry)
        },
        _recordsSelectedFeatureInfoWhenMoveStop: function(a) {
            var b =
                a && a.graphic;
            a = a && a.transform;
            var c = this.map.extent.getWidth() / this.map.width;
            b && a && (b._moveTrack || (b._moveTrack = {
                x: 0,
                y: 0
            }), b._moveTrack.x += a.dx * c, b._moveTrack.y += a.dy * c)
        },
        _getSelectionFeatuers: function() {
            var a = [];
            k.forEach(this.layerInfosParam, function(b) {
                b = b.featureLayer.getSelectedFeatures();
                a = a.concat(b)
            });
            return a
        },
        _canDeleteSelectionFeatures: function() {
            var a = !0,
                b = this._getSelectionFeatuers();
            0 === b.length ? a = !1 : k.some(b, function(b) {
                var c = b.getLayer && b.getLayer();
                if (!c || !c.getEditCapabilities({
                        feature: b
                    }).canDelete) return a = !1, !0
            }, this);
            return a
        },
        _createRelatedRecordsEditor: function(a) {
            if (a) {
                var b = f.create("div", {
                    style: "position: relative"
                });
                f.place(b, this.editor.attributeInspector.domNode, "after");
                var c = (new w({})).placeAt(b);
                this._tableInfoParamDef.then(m.hitch(this, function() {
                    try {
                        this._relatedRecordsEditor && (this._relatedRecordsEditor.destroy(), this._relatedRecordsEditor = null), this._relatedRecordsEditor = new F({
                            originalFeature: a,
                            editorATI: this.editor.attributeInspector,
                            tableInfosParam: this.layerInfosParamClone.concat(this.tableInfosParamClone),
                            nls: m.mixin(m.clone(this.nls), window.jimuNls.common)
                        }), c.destroy()
                    } catch (b) {
                        console.warn(b.message), c.destroy(), this._enableToAnswerEventForEditorATI()
                    }
                }))
            }
        },
        _disableToAnswerEventForEditorATI: function() {
            this._mapInfoStorage.editorATIonLayerSelectionChange || (this._mapInfoStorage.editorATIonLayerSelectionChange = this.editor.attributeInspector.onLayerSelectionChange, this.editor.attributeInspector.onLayerSelectionChange = m.hitch(this, function() {}))
        },
        _enableToAnswerEventForEditorATI: function() {
            this._mapInfoStorage.editorATIonLayerSelectionChange &&
                (this.editor.attributeInspector.onLayerSelectionChange = m.hitch(this.editor.attributeInspector, this._mapInfoStorage.editorATIonLayerSelectionChange), this._mapInfoStorage.editorATIonLayerSelectionChange = null)
        },
        _getTableInfosParam: function() {
            var a, b = [],
                d = [];
            a = this._configEditor.tableInfos ? 0 < this._configEditor.tableInfos.length ? this._converConfiguredLayerInfos(this._configEditor.tableInfos) : this._getDefaultTableInfos() : [];
            k.forEach(a, function(a) {
                var c = this._jimuLayerInfos.getTableInfoById(a.featureLayer.id);
                c && (a.jimuTableInfo = c, b.push(c.getLayerObject()))
            }, this);
            return c(b).then(m.hitch(this, function() {
                k.forEach(a, function(a) {
                    if (a.jimuTableInfo) {
                        var b = a.jimuTableInfo.layerObject,
                            c = a.jimuTableInfo.getCapabilitiesOfWebMap(),
                            c = c && -1 === c.toLowerCase().indexOf("editing") ? !1 : !0;
                        b && (b.visible && b.isEditable && b.isEditable() && c) && (a.featureLayer = a.jimuTableInfo.layerObject, delete a.jimuTableInfo, d.push(a))
                    }
                }, this);
                return d
            }))
        },
        _updateDeleteBtnInToolbar: function() {
            this._canDeleteSelectionFeatures() ? this._enableDeleBtnInToolbar() :
                this._disableDeleteBtnInToolbar()
        },
        _disableDeleteBtnInToolbar: function() {
            this._configEditor.toolbarVisible && e("[class~\x3ddeleteFeatureIcon]", this.editor.domNode).style("display", "none")
        },
        _enableDeleBtnInToolbar: function() {
            this._configEditor.toolbarVisible && e("[class~\x3ddeleteFeatureIcon]", this.editor.domNode).style("display", "inline-block")
        },
        _update: function() {
            this.editor && this.editor.templatePicker.update(!0)
        },
        resize: function() {
            this._update()
        },
        onClose: function() {
            this.editor && this.editor.destroy();
            this.editor = null;
            this._worksAfterClose()
        },
        onNormalize: function() {
            setTimeout(m.hitch(this, this._update), 100)
        },
        onMinimize: function() {},
        onMaximize: function() {
            setTimeout(m.hitch(this, this._update), 100)
        },
        reClickMap: function(a) {
            this._createOverDef.then(m.hitch(this, function() {
                this.map.onClick(a)
            }))
        },
        _onGraphicMoveStart: function(a) {
            this._recordsSelectedFeatureInfoWhenMoveStart(a)
        },
        _onGraphicMoveStop: function(a) {
            this._recordsSelectedFeatureInfoWhenMoveStop(a);
            this._autoApplyEditWhenGeometryIsModified(a)
        },
        _onGraphicChangeStop: function(a) {
            this._autoApplyEditWhenGeometryIsModified(a)
        },
        _beforeMapClick: function() {
            this._configEditor.autoApplyEditWhenGeometryIsMoved || this._checkStickyMoveTolerance()
        },
        _onEditorPopupShow: function() {
            var a = this.editor.attributeInspector._currentFeature;
            this._disableToAnswerEventForEditorATI();
            this._createRelatedRecordsEditor(a)
        },
        _onEditorPopupHide: function() {
            this._enableToAnswerEventForEditorATI()
        },
        _onNextOfEditorATI: function(a) {
            this._createRelatedRecordsEditor(a.feature)
        },
        _onLayerSelectionChange: function() {
            this._configEditor.toolbarVisible && this._updateDeleteBtnInToolbar()
        }
    })
});