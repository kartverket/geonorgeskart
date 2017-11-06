// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "url:widgets/Print/templates/Print.html": '\x3cdiv class\x3d"gis_PrintDijit"\x3e\r\n    \x3cdiv class\x3d"formContainer"\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"printSettingsFormDijit"\x3e\r\n            \x3ctable cellspacing\x3d"5" style\x3d"width:100%;"\x3e\r\n                \x3ctr data-dojo-attach-point\x3d"titleTr"\x3e\r\n                    \x3ctd style\x3d"width:65px;"\x3e\r\n                        ${nls.title}:\r\n                    \x3c/td\x3e\r\n                    \x3ctd\x3e\r\n                        \x3cinput type\x3d"text" data-dojo-attach-point\x3d"titleNode" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d"name:\'title\',trim:true,required:true,style:\'width:100%;\'" /\x3e\r\n                    \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n                \x3ctr style\x3d"display: none"\x3e\r\n                    \x3ctd\x3e\r\n                        ${nls.layout}:\r\n                    \x3c/td\x3e\r\n                    \x3ctd\x3e\r\n                        \x3cinput type\x3d"select" data-dojo-type\x3d"dijit/form/Select" data-dojo-props\x3d"name:\'layout\',style:\'width:100%;\'"\r\n                        data-dojo-attach-point\x3d"layoutDijit" data-dojo-attach-event\x3d"Change:onLayoutChange"/\x3e\r\n                    \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n                \x3ctr style\x3d"display: none"\x3e\r\n                    \x3ctd\x3e\r\n                        ${nls.format}:\r\n                    \x3c/td\x3e\r\n                    \x3ctd\x3e\r\n                        \x3cinput type\x3d"select" data-dojo-type\x3d"dijit/form/Select" data-dojo-props\x3d"name:\'format\',style:\'width:100%;\'"\r\n                        data-dojo-attach-point\x3d"formatDijit" /\x3e\r\n                    \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n            \x3c/table\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"buttonActionBar jimu-align-trailing"\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/DropDownButton" data-dojo-attach-point\x3d"advancedButtonDijit" data-dojo-props\x3d"iconClass:\'settingsIcon\',showLabel:true" style\x3d"display: none"\x3e\r\n            \x3cspan\x3e\r\n                ${nls.settings}\r\n            \x3c/span\x3e\r\n            \x3cdiv data-dojo-type\x3d"dijit/TooltipDialog" class\x3d"gis_PrintDijit"\x3e\r\n                \x3cdiv style\x3d"width:250px;"\x3e\r\n                    \x3cdiv style\x3d"font-weight:bold;"\x3e\r\n                        ${nls.mapScaleExtent}:\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"preserveFormDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5"\x3e\r\n                            \x3ctr\x3e\r\n                                \x3ctd style\x3d"vertical-align:middle;"\x3e\r\n                                    ${nls.preserve}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"printWidgetMapScale" data-dojo-type\x3d"dijit/form/RadioButton" data-dojo-props\x3d"name:\'preserveScale\',checked:true,value:\'true\'"\r\n                                    /\x3e\x3clabel data-dojo-attach-point\x3d"printWidgetMapScaleLabel"\x3e${nls.mapScale}\x3c/label\x3e\r\n                                    \x3cbr /\x3e\r\n                                    \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"printWidgetMapExtent" data-dojo-type\x3d"dijit/form/RadioButton" data-dojo-props\x3d"name:\'preserveScale\',value:\'false\'"\r\n                                    /\x3e\x3clabel data-dojo-attach-point\x3d"printWidgetMapExtentLabel"\x3e${nls.mapExtent}\x3c/label\x3e\r\n                                \x3c/td\x3e\r\n                                \x3ctr\x3e\r\n                                    \x3ctd\x3e\r\n                                        ${nls.forceScale}:\r\n                                    \x3c/td\x3e\r\n                                    \x3ctd\x3e\r\n                                        \x3cinput type\x3d"radio" data-dojo-type\x3d"dijit/form/RadioButton" data-dojo-props\x3d"name:\'preserveScale\',value:\'force\',checked:false"/\x3e \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-props\x3d"name:\'forcedScale\',required:false,style:\'width:100px;\'" data-dojo-attach-point\x3d"forceScaleNTB"/\x3e \x3ca href\x3d"#" data-dojo-attach-event\x3d"click:getCurrentMapScale"\x3e${nls.getCurrentScale}\x3c/a\x3e\r\n                                    \x3c/td\x3e\r\n                                \x3c/tr\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv style\x3d"font-weight:bold;" data-dojo-attach-point\x3d"labelsTitleNode"\x3e\r\n                        ${nls.labels}:\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"labelsFormDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5"\x3e\r\n                            \x3ctr\x3e\r\n                                \x3ctd style\x3d"vertical-align:middle;"\x3e\r\n                                    ${nls.showLabels}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"checkbox" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"name:\'showLabels\',value:true,checked:true" /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv style\x3d"font-weight:bold;"\x3e\r\n                        ${nls.mapMetadata}:\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"layoutMetadataDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5" style\x3d"width:100%;"\x3e\r\n                            \x3ctr data-dojo-attach-point\x3d"authorTr"\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.author}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"text" data-dojo-attach-point\x3d"authorNode" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d"name:\'author\',trim:true,required:false,style:\'width:100%;\'" data-dojo-attach-point\x3d"authorTB"\r\n                                    /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                            \x3ctr data-dojo-attach-point\x3d"copyrightTr"\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.copyright}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"text" data-dojo-attach-point\x3d"copyrightNode" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d"name:\'copyright\',trim:true,required:false,style:\'width:100%;\'" /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"customTextElementsDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5" style\x3d"width:100%;" data-dojo-attach-point\x3d"customTextElementsTable"\x3e\r\n\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"layoutFormDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5"\x3e\r\n                            \x3ctr data-dojo-attach-point\x3d"legendTr"\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.lncludeLegend}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"checkbox" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"name:\'legend\',value:true,checked:true"\r\n                                    /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv style\x3d"font-weight:bold;"\x3e\r\n                        ${nls.mapOnlyOptions}:\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"mapOnlyFormDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5"\x3e\r\n                            \x3ctr\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.width}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-props\x3d"name:\'width\',required:true,value:670,style:\'width:100px;\'"\r\n                                    /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                            \x3ctr\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.height}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-props\x3d"name:\'height\',required:true,value:500,style:\'width:100px;\'"\r\n                                    /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv style\x3d"font-weight:bold;"\x3e\r\n                        ${nls.printQualityOptions}:\r\n                    \x3c/div\x3e\r\n                    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"mapQualityFormDijit"\x3e\r\n                        \x3ctable cellspacing\x3d"5"\x3e\r\n                            \x3ctr\x3e\r\n                                \x3ctd\x3e\r\n                                    ${nls.dpi}:\r\n                                \x3c/td\x3e\r\n                                \x3ctd\x3e\r\n                                    \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-props\x3d"name:\'dpi\',required:true,value:96,style:\'width:100px;\'"\r\n                                    /\x3e\r\n                                \x3c/td\x3e\r\n                            \x3c/tr\x3e\r\n                        \x3c/table\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"busyLabel:\'printing\',iconClass:\'printIcon\'"\r\n        data-dojo-attach-event\x3d"onClick:print" data-dojo-attach-point\x3d"printButtonDijit"\x3e\r\n            ${nls.print}\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3c!-- \x3chr calss\x3d"spacer"\x3e --\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"printResultsNode" class\x3d"resultsContainer"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"clearActionBarNode" class\x3d"buttonActionBar"\r\n    style\x3d"display:none;padding:0;"\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/Button" data-dojo-props\x3d"iconClass:\'clearIcon\'"\r\n        data-dojo-attach-event\x3d"onClick:clearResults"\x3e\r\n            ${nls.clearList}\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:widgets/Print/templates/PrintResult.html": '\x3cdiv class\x3d"printResult" data-dojo-attach-point\x3d"resultNode" data-dojo-attach-event\x3d"onclick:_openPrint"\x3e\r\n  \x3ctable class\x3d"printResultTable"\x3e\r\n    \x3ctr\x3e\r\n      \x3ctd width\x3d"25px"\x3e\r\n        \x3cspan class\x3d"bold"\x3e${count}.\x3c/span\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd width\x3d"30px"\x3e\r\n        \x3cimg src\x3d"${icon}"\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd data-dojo-attach-point\x3d"nameNode"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"progressBar" data-dojo-type\x3d"dijit/ProgressBar" data-dojo-props\x3d\'value:Infinity\'\x3e\x3c/div\x3e\r\n        \x3cspan data-dojo-attach-point\x3d"successNode" class\x3d"bold" style\x3d"display:none;"\x3e${docName}\x3c/span\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"errNode" style\x3d"display:none;"\x3e\r\n          \x3cspan class\x3d"bold"\x3e${nls.printError}\x3c/span\x3e\r\n          \x3cdiv class\x3d"jimu-icon jimu-icon-error jimu-float-trailing"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e\r\n'
    }
});
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin esri/tasks/PrintTask esri/tasks/PrintParameters esri/tasks/PrintTemplate esri/request esri/lang esri/arcgis/utils dojo/_base/lang dojo/_base/array dojo/_base/html dojo/dom-style dojo/dom-construct dojo/dom-class dojo/promise/all dojo/Deferred jimu/portalUrlUtils dojo/text!./templates/Print.html dojo/text!./templates/PrintResult.html dojo/aspect dojo/query jimu/LayerInfos/LayerInfos jimu/dijit/LoadingShelter jimu/dijit/Message jimu/utils dijit/form/ValidationTextBox dijit/form/Form dijit/form/Select dijit/form/NumberTextBox dijit/form/Button dijit/form/CheckBox dijit/ProgressBar dijit/form/DropDownButton dijit/TooltipDialog dijit/form/RadioButton esri/IdentityManager dojo/store/Memory".split(" "),
    function(p, q, r, s, z, A, B, t, C, D, d, g, c, h, E, u, F, v, w, m, G, n, x, H, I, J, y, K) {
        m = p([q, r, s], {
            widgetsInTemplate: !0,
            templateString: m,
            map: null,
            count: 1,
            results: [],
            authorText: null,
            copyrightText: null,
            defaultTitle: null,
            defaultFormat: null,
            defaultLayout: null,
            baseClass: "gis_PrintDijit",
            pdfIcon: require.toUrl("./widgets/Print/images/pdf.png"),
            imageIcon: require.toUrl("./widgets/Print/images/image.png"),
            printTaskURL: null,
            printTask: null,
            async: !1,
            _currentTemplateInfo: null,
            postCreate: function() {
                this.inherited(arguments);
                this.printTask =
                    new z(this.printTaskURL, {
                        async: this.async
                    });
                this.printparams = new A;
                this.printparams.map = this.map;
                this.printparams.outSpatialReference = this.map.spatialReference;
                this.shelter = new I({
                    hidden: !0
                });
                this.shelter.placeAt(this.domNode);
                this.shelter.startup();
                this.shelter.show();
                this.titleNode.set("value", this.defaultTitle);
                this.authorNode.set("value", this.defaultAuthor);
                this.copyrightNode.set("value", this.defaultCopyright);
                var a = w.setHttpProtocol(this.printTaskURL),
                    b = w.getNewPrintUrl(this.appConfig.portalUrl);
                this._isNewPrintUrl = a === b || /sharing\/tools\/newPrint$/.test(a);
                a = x("input", this.printWidgetMapScale.domNode)[0];
                b = x("input", this.printWidgetMapExtent.domNode)[0];
                y.combineRadioCheckBoxWithLabel(a, this.printWidgetMapScaleLabel);
                y.combineRadioCheckBoxWithLabel(b, this.printWidgetMapExtentLabel);
                "MAP_ONLY" === this.defaultLayout ? c.setStyle(this.titleTr, "display", "none") : c.setStyle(this.titleTr, "display", "");
                this._hasLabelLayer() ? (c.setStyle(this.labelsFormDijit.domNode, "display", ""), c.setStyle(this.labelsTitleNode,
                    "display", "")) : (c.setStyle(this.labelsFormDijit.domNode, "display", "none"), c.setStyle(this.labelsTitleNode, "display", "none"));
                H.getInstance(this.map, this.map.itemInfo).then(d.hitch(this, function(a) {
                    this.layerInfosObj = a;
                    return F([this._getPrintTaskInfo(), this._getLayerTemplatesInfo()]).then(d.hitch(this, function(a) {
                        var b = a[0];
                        if ((a = a[1]) && !a.error) {
                            if ((a = a && a.results) && 0 < a.length) g.some(a, d.hitch(this, function(a) {
                                    return a && "Output_JSON" === a.paramName ? this.templateInfos = a.value : !1
                                })), this.templateInfos &&
                                0 < this.templateInfos.length && (this.templateNames = g.map(this.templateInfos, function(a) {
                                    return a.layoutTemplate
                                }))
                        } else console.warn("Get Layout Templates Info Error", a && a.error);
                        !C.isDefined(b) || b && b.error ? this._handleError(b.error) : this._handlePrintInfo(b)
                    }))
                })).always(d.hitch(this, function() {
                    this.shelter.hide()
                }));
                this.printTask._getPrintDefinition && n.after(this.printTask, "_getPrintDefinition", d.hitch(this, "printDefInspector"), !1);
                this.printTask._createOperationalLayers && (n.after(this.printTask,
                    "_createOperationalLayers", d.hitch(this, "_fixInvalidSymbol")), n.after(this.printTask, "_createOperationalLayers", d.hitch(this, "_excludeInvalidLegend")))
            },
            _hasLabelLayer: function() {
                return g.some(this.map.graphicsLayerIds, function(a) {
                    return (a = this.map.getLayer(a)) && "esri.layers.LabelLayer" === a.declaredClass
                }, this)
            },
            _getPrintTaskInfo: function() {
                var a = new v;
                this._isNewPrintUrl ? a.resolve({
                    isGPPrint: !1
                }) : t({
                    url: this.printTaskURL,
                    content: {
                        f: "json"
                    },
                    callbackParamName: "callback",
                    handleAs: "json",
                    timeout: 6E4
                }).then(d.hitch(this,
                    function(b) {
                        a.resolve({
                            isGPPrint: !0,
                            data: b
                        })
                    }), d.hitch(this, function(b) {
                    a.resolve({
                        error: b
                    })
                }));
                return a
            },
            _getLayerTemplatesInfo: function() {
                var a = new v,
                    b = this.printTaskURL.split("/"),
                    c = b.indexOf("GPServer");
                if (-1 < c) {
                    var k = null,
                        k = /Utilities\/PrintingTools\/GPServer/.test(this.printTaskURL) ? b.slice(0, c + 1).join("/") + "/" + encodeURIComponent("Get Layout Templates Info Task") + "/execute" : b.slice(0, c + 1).join("/") + "/" + encodeURIComponent("Get Layout Templates Info") + "/execute";
                    t({
                        url: k,
                        content: {
                            f: "json"
                        },
                        callbackParamName: "callback",
                        handleAs: "json",
                        timeout: 6E4
                    }).then(d.hitch(this, function(b) {
                        a.resolve(b)
                    }), d.hitch(this, function(b) {
                        a.resolve({
                            error: b
                        })
                    }))
                } else a.resolve(null);
                return a
            },
            _fixInvalidSymbol: function(a) {
                g.forEach(a, function(a) {
                    "map_graphics" === a.id && (a = d.getObject("featureCollection.layers", !1, a)) && 0 < a.length && g.forEach(a, function(a) {
                        a && (a.featureSet && "esriGeometryPoint" === a.featureSet.geometryType) && g.forEach(a.featureSet.features, function(a) {
                            a && (a.symbol && !a.symbol.style) && (a.symbol.style = "esriSMSSquare")
                        })
                    })
                }, this);
                return a
            },
            _excludeInvalidLegend: function(a) {
                function b(a) {
                    return g.filter(a.subLayerIds, d.hitch(this, function(b) {
                        return (b = this.layerInfosObj.getLayerInfoById(a.id + "_" + b)) && b.getShowLegendOfWebmap()
                    }))
                }
                if (this.printTask.allLayerslegend) {
                    for (var c = this.printTask.allLayerslegend, k = [], l = 0; l < c.length; l++) {
                        var f = c[l],
                            e = this.map.getLayer(f.id),
                            h = this.layerInfosObj.getLayerInfoById(f.id),
                            m = e && e.declaredClass && "esri.layers.GraphicsLayer" !== e.declaredClass,
                            e = !e.renderer || e.renderer && !e.renderer.hasVisualVariables(),
                            h = h && h.getShowLegendOfWebmap();
                        m && (e && h) && (f.subLayerIds && (f.subLayerIds = d.hitch(this, b, f)()), k.push(f))
                    }
                    this.printTask.allLayerslegend = k
                }
                return a
            },
            printDefInspector: function(a) {
                "force" === this.preserve.preserveScale && (a.mapOptions.scale = this.preserve.forcedScale);
                return a
            },
            _handleError: function(a) {
                console.log("print widget load error: ", a);
                new J({
                    message: a.message || a
                })
            },
            onLayoutChange: function(a) {
                var b = this.templateNames && this.templateNames.indexOf(a); - 1 < b ? (c.empty(this.customTextElementsTable), a =
                    this._currentTemplateInfo = this.templateInfos[b], (b = d.getObject("layoutOptions.customTextElements", !1, a)) && 0 < b.length && g.forEach(b, d.hitch(this, function(a) {
                        for (var b in a) {
                            var d = this.customTextElementsTable.insertRow(-1);
                            d.insertCell(-1).appendChild(c.toDom(b + ": "));
                            d.insertCell(-1).appendChild((new K({
                                name: b,
                                trim: !0,
                                required: !1,
                                value: a[b],
                                style: "width:100%"
                            })).domNode)
                        }
                    })), d.getObject("layoutOptions.hasAuthorText", !1, a) ? c.setStyle(this.authorTr, "display", "") : c.setStyle(this.authorTr, "display", "none"),
                    d.getObject("layoutOptions.hasCopyrightText", !1, a) ? c.setStyle(this.copyrightTr, "display", "") : c.setStyle(this.copyrightTr, "display", "none"), d.getObject("layoutOptions.hasTitleText", !1, a) ? c.setStyle(this.titleTr, "display", "") : c.setStyle(this.titleTr, "display", "none"), d.getObject("layoutOptions.hasLegend", !1, a) ? c.setStyle(this.legendTr, "display", "") : c.setStyle(this.legendTr, "display", "none")) : "MAP_ONLY" === a ? (c.setStyle(this.authorTr, "display", "none"), c.setStyle(this.copyrightTr, "display", "none"), c.setStyle(this.titleTr,
                    "display", "none"), c.setStyle(this.legendTr, "display", "none"), this._currentTemplateInfo = {
                    layoutOptions: {
                        hasTitleText: !1,
                        hasCopyrightText: !1,
                        hasAuthorText: !1,
                        hasLegend: !1
                    }
                }) : (c.setStyle(this.authorTr, "display", ""), c.setStyle(this.copyrightTr, "display", ""), c.setStyle(this.titleTr, "display", ""), c.setStyle(this.legendTr, "display", ""), this._currentTemplateInfo = {
                    layoutOptions: {
                        hasTitleText: !0,
                        hasCopyrightText: !0,
                        hasAuthorText: !0,
                        hasLegend: !0
                    }
                })
            },
            _getMapAttribution: function() {
                var a = this.map.attribution;
                return a &&
                    a.domNode ? c.getProp(a.domNode, "textContent") : ""
            },
            _handlePrintInfo: function(a) {
                if (a.isGPPrint) {
                    a = a.data;
                    h.set(this.layoutDijit.domNode.parentNode.parentNode, "display", "");
                    h.set(this.formatDijit.domNode.parentNode.parentNode, "display", "");
                    h.set(this.advancedButtonDijit.domNode, "display", "");
                    var b = g.filter(a.parameters, function(a) {
                        return "Layout_Template" === a.name
                    });
                    if (0 === b.length) console.log('print service parameters name for templates must be "Layout_Template"');
                    else {
                        var c = g.map(b[0].choiceList, function(a) {
                            return {
                                label: a,
                                value: a
                            }
                        });
                        c.sort(function(a, b) {
                            return a.label > b.label ? 1 : b.label > a.label ? -1 : 0
                        });
                        this.layoutDijit.addOption(c);
                        this.defaultLayout ? this.layoutDijit.set("value", this.defaultLayout) : this.layoutDijit.set("value", b[0].defaultValue);
                        a = g.filter(a.parameters, function(a) {
                            return "Format" === a.name
                        });
                        0 === a.length ? console.log('print service parameters name for format must be "Format"') : (b = g.map(a[0].choiceList, function(a) {
                            return {
                                label: a,
                                value: a
                            }
                        }), b.sort(function(a, b) {
                            return a.label > b.label ? 1 : b.label > a.label ? -1 :
                                0
                        }), this.formatDijit.addOption(b), this.defaultFormat ? this.formatDijit.set("value", this.defaultFormat) : this.formatDijit.set("value", a[0].defaultValue))
                    }
                } else h.set(this.layoutDijit.domNode.parentNode.parentNode, "display", "none"), h.set(this.formatDijit.domNode.parentNode.parentNode, "display", "none"), h.set(this.advancedButtonDijit.domNode, "display", "none")
            },
            print: function() {
                if (this.printSettingsFormDijit.isValid()) {
                    var a = this.printSettingsFormDijit.get("value");
                    d.mixin(a, this.layoutMetadataDijit.get("value"));
                    d.mixin(a, this.labelsFormDijit.get("value"));
                    this.preserve = this.preserveFormDijit.get("value");
                    d.mixin(a, this.preserve);
                    this.layoutForm = this.layoutFormDijit.get("value");
                    var b = this.mapQualityFormDijit.get("value"),
                        c = this.mapOnlyFormDijit.get("value");
                    d.mixin(c, b);
                    var k = this.customTextElementsDijit.get("value"),
                        b = [],
                        l;
                    for (l in k) {
                        var f = {};
                        f[l] = k[l];
                        b.push(f)
                    }
                    f = this._currentTemplateInfo;
                    l = d.getObject("layoutOptions.hasAuthorText", !1, f);
                    var k = d.getObject("layoutOptions.hasCopyrightText", !1, f),
                        e = d.getObject("layoutOptions.hasLegend", !1, f),
                        f = d.getObject("layoutOptions.hasTitleText", !1, f),
                        m = [];
                    e && (0 < this.layoutForm.legend.length && this.layoutForm.legend[0]) && (e = D.getLegendLayers({
                        map: this.map,
                        itemInfo: this.map.itemInfo
                    }), m = g.map(e, function(a) {
                        return {
                            layerId: a.layer.id
                        }
                    }));
                    e = new B;
                    e.format = a.format;
                    e.layout = a.layout;
                    e.preserveScale = "true" === a.preserveScale || "force" === a.preserveScale;
                    e.label = a.title;
                    e.exportOptions = c;
                    e.showLabels = a.showLabels && a.showLabels[0];
                    e.layoutOptions = {
                        authorText: l ? a.author : "",
                        copyrightText: k ? a.copyright ||
                            this._getMapAttribution() : "",
                        legendLayers: m,
                        titleText: f ? a.title : "",
                        customTextElements: b
                    };
                    this.printparams.template = e;
                    this.printparams.extraParameters = {
                        printFlag: !0
                    };
                    c = this.printTask.execute(this.printparams);
                    (new L({
                        count: this.count.toString(),
                        icon: "PDF" === a.format ? this.pdfIcon : this.imageIcon,
                        docName: a.title,
                        title: a.format + ", " + a.layout,
                        fileHandle: c,
                        nls: this.nls
                    })).placeAt(this.printResultsNode, "last").startup();
                    h.set(this.clearActionBarNode, "display", "block");
                    this.count++
                } else this.printSettingsFormDijit.validate()
            },
            clearResults: function() {
                E.empty(this.printResultsNode);
                h.set(this.clearActionBarNode, "display", "none");
                this.count = 1
            },
            updateAuthor: function(a) {
                (a = a || "") && this.authorTB && this.authorTB.set("value", a)
            },
            getCurrentMapScale: function() {
                this.forceScaleNTB.set("value", this.map.getScale())
            }
        });
        var L = p([q, r, s], {
            widgetsInTemplate: !0,
            templateString: G,
            url: null,
            postCreate: function() {
                this.inherited(arguments);
                this.progressBar.set("label", this.nls.creatingPrint);
                this.fileHandle.then(d.hitch(this, "_onPrintComplete"),
                    d.hitch(this, "_onPrintError"))
            },
            _onPrintComplete: function(a) {
                a.url ? (this.url = a.url, c.setStyle(this.progressBar.domNode, "display", "none"), c.setStyle(this.successNode, "display", "inline-block"), u.add(this.resultNode, "printResultHover")) : this._onPrintError(this.nls.printError)
            },
            _onPrintError: function(a) {
                console.log(a);
                c.setStyle(this.progressBar.domNode, "display", "none");
                c.setStyle(this.errNode, "display", "block");
                u.add(this.resultNode, "printResultError");
                c.setAttr(this.domNode, "title", a.details || a.message ||
                    "")
            },
            _openPrint: function() {
                null !== this.url && window.open(this.url)
            }
        });
        return m
    });