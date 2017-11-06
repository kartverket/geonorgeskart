// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "widgets/Bookmark/ImageNode": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/html dijit/_WidgetBase dijit/_TemplatedMixin dojo/on dojo/query jimu/utils dojo/mouse".split(" "), function(k, e, b, f, n, l, g, p) {
                return k([f, n], {
                    templateString: '\x3cdiv class\x3d"jimu-img-node"\x3e\x3c/div\x3e',
                    constructor: function(b, e) {},
                    postCreate: function() {
                        this.box = b.create("div", {
                            "class": "node-box"
                        }, this.domNode);
                        b.create("img", {
                            src: this.img
                        }, this.box);
                        b.create("div", {
                            "class": "node-label",
                            innerHTML: p.sanitizeHTML(this.label),
                            title: this.label
                        }, this.domNode);
                        this.own(l(this.domNode, "click", e.hitch(this, this.onClick)))
                    },
                    onClick: function() {
                        g(".jimu-img-node", this.getParent().domNode).removeClass("jimu-state-selected");
                        g(this.domNode).addClass("jimu-state-selected")
                    },
                    highLight: function() {
                        g(".jimu-img-node", this.getParent().domNode).removeClass("jimu-state-selected");
                        g(this.domNode).addClass("jimu-state-selected")
                    },
                    startup: function() {}
                })
            })
        },
        "widgets/Bookmark/_build-generate_module": function() {
            define(["dojo/text!./Widget.html",
                "dojo/text!./css/style.css", "dojo/i18n!./nls/strings"
            ], function() {})
        },
        "url:widgets/Bookmark/Widget.html": '\x3cdiv\x3e\r\n\t\x3cdiv class\x3d"jimu-r-row add-section"\x3e\r\n\t\t\x3cinput class\x3d"jimu-input input-bookmark-name" data-dojo-attach-point\x3d"bookmarkName" type\x3d"text" placeholder\x3d"${nls.placeholderBookmarkName}"\x3e\r\n\t\t\x3cdiv class\x3d"btn-add" data-dojo-attach-point\x3d"btnAdd" data-dojo-attach-event\x3d"onclick:_onAddBtnClicked"\x3e\x3cdiv class\x3d"jimu-center-img"\x3e\x3c/div\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\x3cdiv class\x3d"jimu-state-error" data-dojo-attach-point\x3d"errorNode"\x3e\x26nbsp;\x3c/div\x3e\t\t\r\n\t\x3cdiv class\x3d"bookmark-list" data-dojo-attach-point\x3d"bookmarkListNode"\x3e\r\n\t\t\r\n\t\x3c/div\x3e\r\n\r\n\t\x3cdiv class\x3d"jimu-r-row play-section"\x3e\r\n\t\t\x3cdiv class\x3d"col-1-2"\x3e\r\n\t\t\t\x3cdiv class\x3d"jimu-btn btn-play" data-dojo-attach-point\x3d"btnPlay" data-dojo-attach-event\x3d"onclick:_onPlayBtnClicked"\x3e${nls.labelPlay}\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv class\x3d"col-1-2"\x3e\r\n\t\t\t\x3cdiv class\x3d"jimu-btn btn-delete" data-dojo-attach-point\x3d"btnDelete" data-dojo-attach-event\x3d"onclick:_onDeleteBtnClicked"\x3e${nls.labelDelete}\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\r\n\x3c/div\x3e\r\n',
        "url:widgets/Bookmark/css/style.css": ".jimu-img-node{font-size: 12px; position: relative; float: left; border-radius: 4px; color: #686868; overflow: hidden;}.jimu-img-node .node-box{position: absolute; top: 0; bottom: 32px; left: 0; width: 100%; border-radius: 4px; overflow: hidden;}.jimu-img-node img{width: 100%; height: 100%; cursor: pointer;}.jimu-img-node .node-label{position: absolute; width: 100%; left: 0; bottom: 0; height: 30px; text-align: center; overflow: hidden; text-overflow: ellipsis;}.jimu-img-node:hover{color: #51b1fe;}.jimu-img-node.jimu-state-selected .node-label{background-color: #d9dde0;}.jimu-widget-bookmark{width: 100%; height: 100%; overflow: hidden; position: relative;}.jimu-widget-bookmark .add-section{position: relative; height: 30px; margin-top: 7px; overflow: visible;}.jimu-widget-bookmark .input-bookmark-name{border-top-right-radius: 0; border-bottom-right-radius: 0; position: absolute; left: 0; top: 0; width: 100%;}.jimu-widget-bookmark .btn-add{position: absolute; right: 1px; top: 1px; bottom: 1px; width: 30px; z-index: 2; border-top-right-radius: 2px; border-bottom-right-radius: 2px; background-color: #d9dde0; cursor: pointer;}.jimu-widget-bookmark .btn-add .jimu-center-img{border-top: 1px solid rgba(255, 255, 255, 0.2); background-image: url(images/add.png);}.jimu-widget-bookmark .jimu-state-error{margin-top: 4px; visibility: hidden;}.jimu-widget-bookmark .bookmark-list{position: absolute; top: 60px; bottom: 35px; width: 100%;}.jimu-widget-bookmark .play-section{overflow: hidden; margin-top: 20px; position: absolute; bottom: 0;}.jimu-widget-bookmark .jimu-btn{float: none; margin: auto; width: 100%;}.FoldableTheme.green .jimu-widget-bookmark .btn-add{background-color: #80dbc5;}.FoldableTheme.cyan .jimu-widget-bookmark .btn-add{background-color: #d5d5d4;}.jimu-rtl .jimu-widget-bookmark .btn-add{left: 1px; right: auto;}",
        "*now": function(k) {
            k(['dojo/i18n!*preload*widgets/Bookmark/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])
        }
    }
});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html jimu/BaseWidget dojo/on dojo/aspect dojo/string esri/SpatialReference ./ImageNode jimu/dijit/TileLayoutContainer jimu/utils libs/storejs/store".split(" "), function(k, e, b, f, n, l, g, p, q, r, s, m, h) {
    return k([n], {
        baseClass: "jimu-widget-bookmark",
        name: "Bookmark",
        bookmarks: [],
        currentIndex: -1,
        _canDelete: !1,
        _canPlay: !1,
        _playStatus: "none",
        startup: function() {
            this.inherited(arguments);
            this.bookmarkList = new s({
                strategy: "fixWidth",
                itemSize: {
                    width: 100,
                    height: 92
                },
                hmargin: 15,
                vmargin: 5
            }, this.bookmarkListNode);
            this.appConfig.map["3D"] ? (f.setStyle(this.btnPlay, "display", ""), g.after(this.map, "onCameraChangeEnd", e.hitch(this, this._onFlytoEnd), !0), g.after(this.map, "onCameraChangeBreak", e.hitch(this, this._onFlytoBreak), !0)) : f.setStyle(this.btnPlay, "display", "none");
            this.bookmarkList.startup();
            this.own(l(this.bookmarkName, "keydown", e.hitch(this, function(a) {
                13 === (void 0 !== a.keyCode ? a.keyCode : a.which) && this._onAddBtnClicked()
            })))
        },
        onOpen: function() {
            var a =
                this._getLocalCache();
            this.bookmarks = 0 < a.length ? a : this.appConfig.map["3D"] ? e.clone(this.config.bookmarks3D) : e.clone(this.config.bookmarks2D);
            0 === this.bookmarks.length && this._readBookmarksInWebmap();
            this.displayBookmarks()
        },
        onClose: function() {
            this.bookmarks = [];
            this.currentIndex = -1
        },
        onMinimize: function() {
            this.resize()
        },
        onMaximize: function() {
            this.resize()
        },
        resize: function() {
            this.bookmarkList && this.bookmarkList.resize()
        },
        destroy: function() {
            this.bookmarkList.destroy();
            this.inherited(arguments)
        },
        displayBookmarks: function() {
            this._processDuplicateName(this.bookmarks);
            var a = [];
            this.bookmarkList.empty();
            b.forEach(this.bookmarks, function(c) {
                a.push(this._createBookMarkNode(c))
            }, this);
            this.bookmarkList.addItems(a);
            this._switchDeleteBtn();
            this._switchPlayBtn();
            this.resize()
        },
        _readBookmarksInWebmap: function() {
            this.map.itemInfo && (this.map.itemInfo.itemData && this.map.itemInfo.itemData.bookmarks) && b.forEach(this.map.itemInfo.itemData.bookmarks, function(a) {
                a.isInWebmap = !0;
                this.bookmarks.push(a)
            }, this)
        },
        _switchDeleteBtn: function() {
            -1 < this.currentIndex && !this.bookmarks[this.currentIndex].isInWebmap ?
                (f.removeClass(this.btnDelete, "jimu-state-disabled"), this._canDelete = !0) : (f.addClass(this.btnDelete, "jimu-state-disabled"), this._canDelete = !1)
        },
        _switchPlayBtn: function() {
            1 < this.bookmarks.length ? (f.removeClass(this.btnPlay, "jimu-state-disabled"), this._canPlay = !0) : (f.addClass(this.btnPlay, "jimu-state-disabled"), this._canPlay = !1)
        },
        _switchPlayStatus: function(a) {
            this._playStatus = a;
            this.btnPlay.innerHTML = "none" === this._playStatus || "stop" === this._playStatus ? m.stripHTML(this.nls.labelPlay) : m.stripHTML(this.nls.labelStop)
        },
        _createBookMarkNode: function(a) {
            var c;
            c = a.thumbnail ? m.processUrlInWidgetConfig(a.thumbnail, this.folderUrl) : this.folderUrl + "images/thumbnail_great_wall.png";
            c = new r({
                img: c,
                label: a.displayName
            });
            l(c.domNode, "click", e.hitch(this, e.partial(this._onBookmarkClick, a)));
            return c
        },
        _getKeysKey: function() {
            return this.appConfig.map["3D"] ? this.name + ".3D" : this.name + ".2D"
        },
        _saveAllToLocalCache: function() {
            var a = [];
            b.forEach(h.get(this._getKeysKey()), function(a) {
                h.remove(a)
            }, this);
            b.forEach(this.bookmarks, function(c) {
                var d =
                    this._getKeysKey() + "." + c.displayName;
                a.push(d);
                h.set(d, c)
            }, this);
            h.set(this._getKeysKey(), a)
        },
        _getLocalCache: function() {
            var a = [];
            if (!h.get(this._getKeysKey())) return a;
            b.forEach(h.get(this._getKeysKey()), function(c) {
                c.startWith(this._getKeysKey()) && a.push(h.get(c))
            }, this);
            return a
        },
        _onFlytoEnd: function(a) {
            "stop" === this._playStatus || "none" === this._playStatus || (this.currentIndex + 1 === this.bookmarkList.items.length ? this._switchPlayStatus("stop") : (this.currentIndex++, this.bookmarkList.items[this.currentIndex].highLight(),
                setTimeout(e.hitch(this, this._setCamera, this.bookmarks[this.currentIndex]), this.config.stopTime)))
        },
        _onFlytoBreak: function() {
            "playing" === this._playStatus && this._switchPlayStatus("stop")
        },
        _onAddBtnClicked: function() {
            0 === p.trim(this.bookmarkName.value).length ? (f.setStyle(this.errorNode, {
                visibility: "visible"
            }), this.errorNode.innerHTML = m.stripHTML(this.nls.errorNameNull)) : (this._createBookmark(), f.setStyle(this.errorNode, {
                    visibility: "hidden"
                }), this.errorNode.innerHTML = "\x26nbsp;", this.bookmarkName.value =
                "", this.displayBookmarks())
        },
        _onPlayBtnClicked: function() {
            this._canPlay && ("playing" === this._playStatus ? this._switchPlayStatus("stop") : (this._switchPlayStatus("playing"), this.currentIndex = 0, this._switchDeleteBtn(), this.bookmarkList.items[this.currentIndex].highLight(), this._setCamera(this.bookmarks[this.currentIndex])))
        },
        _createBookmark: function() {
            var a;
            this.appConfig.map["3D"] ? (a = this.map.getCamera(new q(4326)), a = {
                name: this.bookmarkName.value,
                camera: [a.x, a.y, a.z, a.heading, a.tilt]
            }) : a = {
                name: this.bookmarkName.value,
                displayName: this.bookmarkName.value,
                extent: this.map.extent.toJson()
            };
            this.bookmarks.push(a);
            this._saveAllToLocalCache();
            this.resize()
        },
        _onDeleteBtnClicked: function() {
            this._canDelete && -1 !== this.currentIndex && (b.some(this.bookmarks, function(a, c) {
                if (c === this.currentIndex) return this.bookmarks.splice(c, 1), !0
            }, this), this._saveAllToLocalCache(), this.resize(), this.currentIndex = -1, this.displayBookmarks())
        },
        _onBookmarkClick: function(a) {
            b.some(this.bookmarks, function(c, d) {
                if (c.displayName === a.displayName) return this.currentIndex =
                    d, !0
            }, this);
            this._switchDeleteBtn();
            this.appConfig.map["3D"] ? this._setCamera(a) : require(["esri/geometry/Extent"], e.hitch(this, function(c) {
                var d = a.extent;
                d.spatialReference ? new q(d.spatialReference) : new q({
                    wkid: 4326
                });
                this.map.setExtent(new c(d))
            }))
        },
        _setCamera: function(a) {
            this.map.setCamera(a.camera, this.config.flyTime)
        },
        _processDuplicateName: function(a) {
            var c = [],
                d = {};
            b.forEach(a, function(a) {
                var b = a.name;
                b in d ? d[b]++ : d[b] = 0;
                if (0 < d[b]) {
                    var e = b + "(" + d[b] + ")";
                    e in d ? (d[e]++, d[b]++) : d[e] = 0;
                    a.displayName =
                        0 < d[e] ? b + "(" + d[b] + ")" : e
                } else a.displayName = b;
                c.push(a)
            }, this);
            a = c
        }
    })
});