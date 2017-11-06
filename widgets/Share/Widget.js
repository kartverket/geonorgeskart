// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({
    cache: {
        "jimu/shareUtils": function() {
            define("dojo/_base/lang esri/request dojo/promise/all jimu/shared/basePortalUrlUtils dojo/Deferred esri/lang jimu/portalUtils jimu/Role jimu/utils".split(" "), function(e, k, l, h, d, a, b, c, g) {
                var n = {
                    _isUserOwnTheApp: function(a) {
                        return a && a.username && a.username === window.appInfo.appOwner ? !0 : !1
                    },
                    getItemByUserAndItemId: function(b, f, p, c) {
                        var g = new d;
                        c = h.getStandardPortalUrl(c);
                        c = c + "/sharing/rest/content/users/" + (f ? f.username ? f.username : f.email : p.email);
                        if (a.isDefined(b.folderId) &&
                            "/" !== b.folderId || a.isDefined(b.ownerFolder) && "/" !== b.ownerFolder) c += "/" + (b.folderId || b.ownerFolder);
                        c += "/items/" + b.id;
                        k({
                            url: c,
                            handleAs: "json",
                            content: {
                                f: "json"
                            },
                            callbackParamName: "callback"
                        }).then(e.hitch(this, function(a) {
                            g.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            g.reject(a)
                        }));
                        return g
                    },
                    _getProfile: function(a, f) {
                        var b = new d,
                            c = h.getUserUrl(f, a.owner);
                        k({
                            url: c,
                            handleAs: "json",
                            content: {
                                f: "json"
                            },
                            callbackParamName: "callback"
                        }).then(e.hitch(this, function(a) {
                            b.resolve(a)
                        }), e.hitch(this,
                            function(a) {
                                console.error(a);
                                b.reject(a)
                            }));
                        return b
                    },
                    _unshareItemById: function(a, f, b) {
                        var c = new d;
                        b = h.getStandardPortalUrl(b);
                        b += "/sharing/rest/content/items/" + f + "/unshare";
                        f = {
                            f: "json"
                        };
                        f = e.mixin(f, a);
                        k({
                            url: b,
                            handleAs: "json",
                            content: f,
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            c.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    },
                    canSharePublic: function(a) {
                        return a.selfUrl && (!0 === a.canSharePublic || !1 === a.canSharePublic) ? a.canSharePublic :
                            !0
                    },
                    unshareItemsByUser: function(a, f, b) {
                        var c = new d;
                        b = h.getStandardPortalUrl(b);
                        b += "/sharing/rest/content/users/" + a + "/unshareItems";
                        a = {
                            f: "json"
                        };
                        a = e.mixin(a, f);
                        k({
                            url: b,
                            handleAs: "json",
                            content: a,
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            c.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    },
                    unshareItems: function(a, f, b) {
                        var c = new d;
                        b = h.getStandardPortalUrl(b);
                        b += "/sharing/rest/content/users/" + (f.owner || a.email) + "/unshareItems";
                        a = {
                            f: "json"
                        };
                        a = e.mixin(a, f);
                        k({
                            url: b,
                            handleAs: "json",
                            content: a,
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            c.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    },
                    shareItemsByUser: function(a, f, b) {
                        var c = new d;
                        b = h.getStandardPortalUrl(b);
                        b += "/sharing/rest/content/users/" + a + "/shareItems";
                        a = {
                            f: "json"
                        };
                        a = e.mixin(a, f);
                        k({
                            url: b,
                            handleAs: "json",
                            content: a,
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            c.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    },
                    shareItems: function(a, f, b) {
                        var c = new d;
                        b = h.getStandardPortalUrl(b);
                        b += "/sharing/rest/content/users/" + (f.owner || a.email) + "/shareItems";
                        a = {
                            f: "json"
                        };
                        a = e.mixin(a, f);
                        k({
                            url: b,
                            handleAs: "json",
                            content: a,
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            c.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    },
                    getItemsGroups: function(a, f) {
                        var b = new d,
                            c = h.getStandardPortalUrl(f),
                            c = c + ("/sharing/rest/content/items/" + a.id + "/groups");
                        k({
                            url: c,
                            handleAs: "json",
                            content: {
                                f: "json"
                            },
                            callbackParamName: "callback"
                        }, {
                            usePost: !0
                        }).then(e.hitch(this, function(a) {
                            b.resolve(a)
                        }), e.hitch(this, function(a) {
                            console.error(a);
                            b.reject(a)
                        }));
                        return b
                    },
                    isSharedToPublic: function(a) {
                        return window.isXT ? !1 : null === a ? !0 : "undefined" !== typeof a && "undefined" !== typeof a.item && "undefined" !== typeof a.item.access && "public" === a.item.access ? !0 : !1
                    },
                    isShowSocialMediaLinks: function(a) {
                        return window.isXT ? !0 : null === a ? !0 : "undefined" !== typeof a && "undefined" !== typeof a.item && "undefined" !==
                            typeof a.item.access && "private" === a.item.access ? !1 : !0
                    },
                    getItemShareInfo: function(a) {
                        var f = new d,
                            c = "";
                        if (window.isXT) return f.resolve(null);
                        c = g.urlToObject(window.top.location.href).query || {};
                        c = c.id || c.appid;
                        if ("undefined" === typeof c || "" === c) return f.resolve(null);
                        b.getPortal(a).getItemById(c).then(e.hitch(this, function(a) {
                            var b = {};
                            b.item = a;
                            b.item && ("undefined" === typeof b.item.sharing && b.item.access) && (b.item.sharing = {
                                access: b.item.access
                            });
                            f.resolve(b)
                        }), e.hitch(this, function(a) {
                            console.log(a);
                            f.resolve(null)
                        }));
                        return f
                    },
                    getShareInfo: function(a) {
                        var f = b.getPortal(a),
                            c = new d,
                            m = "";
                        if (window.isXT) return c.resolve(null);
                        m = g.urlToObject(window.top.location.href).query || {};
                        m = m.id || m.appid;
                        if ("undefined" === typeof m || "" === m) return c.resolve(null);
                        l({
                            getUser: f.getUser(),
                            loadSelfInfo: f.loadSelfInfo(),
                            getItem: f.getItemById(m)
                        }).then(e.hitch(this, function(f) {
                            var b = {};
                            b.item = f.getItem;
                            b.item && (b.item.ownerFolder && b.item.ownerFolder.length && "/" !== b.item.ownerFolder) && (b.item.folderId = b.item.ownerFolder);
                            "undefined" ===
                            typeof b.item.sharing && b.item.access && (b.item.sharing = {
                                access: b.item.access
                            });
                            b.user = f.getUser;
                            n._setUserRole(f.loadSelfInfo, b);
                            b.currentUser = b.user;
                            b.isAdmin = !1;
                            b.userRole && (b.userRole.isAdmin() || b.userRole.isCustom() && b.userRole.canUpdateOrgItems()) ? (b.isAdmin = !0, b.item.owner !== b.currentUser.name ? n._getProfile(b.item, a).then(e.hitch(this, function(a) {
                                b.itemUser = a;
                                b.itemUser.orgId !== b.currentUser.orgId && (b.isAdmin = !1);
                                c.resolve(b)
                            })) : (b.itemUser = b.currentUser, c.resolve(b))) : (b.currentUser && (b.itemUser =
                                b.currentUser), c.resolve(b))
                        }), e.hitch(this, function(a) {
                            console.log(a);
                            c.resolve(null)
                        }));
                        return c
                    },
                    _setUserRole: function(a, b) {
                        b.userPortalUrl = a.urlKey ? a.urlKey + "." + a.customBaseUrl : this.portalUrl;
                        a && (!a.code && !a.message) && (b.organization = a);
                        if (a && a.user) b.userRole = new c({
                                id: a.user.roleId ? a.user.roleId : a.user.role,
                                role: a.user.role
                            }), b._isCustomRole = b.userRole.isCustom(), b._roleCanShareToGroup = b._isCustomRole && b.userRole.canShareItemToGroup(), b._roleCanShareToOrg = b._isCustomRole && b.userRole.canShareItemToOrg(),
                            b._roleCanSharePublic = b._isCustomRole && b.userRole.canShareItemToPublic(), b._roleCanShare = b._roleCanShareToGroup || b._roleCanShareToOrg || b._roleCanShareToPublic, b._roleCanUpdateItems = b._isCustomRole && b.userRole.canUpdateOrgItems(), b._roleCanShareOthersItemsToGroup = b._isCustomRole && b.userRole.canShareOthersItemsToGroup(), b._roleCanShareOthersItemsToOrg = b._isCustomRole && b.userRole.canShareOthersItemsToOrg(), b._roleCanShareOthersItemsToPublic = b._isCustomRole && b.userRole.canShareOthersItemsToPublic(), b._roleCanShareOthersItems =
                            b._isCustomRole && (b.userRole.canShareOthersItemsToGroup() || b.userRole.canShareOthersItemsToOrg() || b._roleCanShareOthersItemsToPublic), b._orgUserCanSharePublicOrOverride = b.organization && (!0 === b.organization.canSharePublic && (!b._isCustomRole || b._roleCanSharePublic || b._roleCanShareOthersItemsToPublic) || b.userRole.isAdmin());
                        else return !1
                    },
                    getItemById: function(a, b) {
                        var c = new d,
                            g = h.getStandardPortalUrl(b),
                            g = g + ("/sharing/rest/content/items/" + a.id);
                        k({
                            url: g,
                            handleAs: "json",
                            content: {
                                f: "json"
                            },
                            callbackParamName: "callback"
                        }).then(e.hitch(this,
                            function(a) {
                                c.resolve(a)
                            }), e.hitch(this, function(a) {
                            console.error(a);
                            c.reject(a)
                        }));
                        return c
                    }
                };
                return n
            })
        },
        "jimu/Role": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/json", "esri/lang"], function(e, k, l, h, d) {
                return e(null, {
                    id: null,
                    baseRole: null,
                    name: null,
                    description: null,
                    privileges: [],
                    privilegeObj: null,
                    constructor: function(a) {
                        a = a || {};
                        this.id = a.id;
                        this.baseRole = a.role;
                        this.name = a.name;
                        this.description = a.description
                    },
                    _initPrivilegesObject: function() {
                        this.privilegeObj = {
                            portal: {
                                admin: {
                                    inviteUsers: !1,
                                    disableUsers: !1,
                                    viewUsers: !1,
                                    updateUsers: !1,
                                    deleteUsers: !1,
                                    changeUserRoles: !1,
                                    viewGroups: !1,
                                    updateGroups: !1,
                                    deleteGroups: !1,
                                    reassignGroups: !1,
                                    assignToGroups: !1,
                                    manageEnterpriseGroups: !1,
                                    viewItems: !1,
                                    updateItems: !1,
                                    deleteItems: !1,
                                    reassignItems: !1,
                                    manageLicenses: !1
                                },
                                publisher: {
                                    publishFeatures: !1,
                                    publishTiles: !1,
                                    publishScenes: !1
                                },
                                user: {
                                    createGroup: !1,
                                    joinGroup: !1,
                                    joinNonOrgGroup: !1,
                                    createItem: !1,
                                    shareToGroup: !1,
                                    shareToOrg: !1,
                                    shareToPublic: !1,
                                    shareGroupToOrg: !1,
                                    shareGroupToPublic: !1
                                }
                            },
                            features: {
                                user: {
                                    edit: !1,
                                    fullEdit: !1
                                }
                            },
                            opendata: {
                                user: {
                                    openDataAdmin: !1,
                                    designateGroup: !1
                                }
                            },
                            premium: {
                                user: {
                                    geocode: !1,
                                    networkanalysis: !1,
                                    spatialanalysis: !1,
                                    geoenrichment: !1,
                                    demographics: !1,
                                    elevation: !1
                                }
                            },
                            marketplace: {
                                admin: {
                                    manage: !1,
                                    purchase: !1,
                                    startTrial: !1
                                }
                            }
                        }
                    },
                    _readPrivileges: function(a) {
                        d.isDefined(a) && a instanceof Array && l.forEach(a, k.hitch(this, function(a) {
                            this._readPrivilege(a)
                        }))
                    },
                    _readPrivilege: function(a) {
                        this._applyEffectToAction(!0, a)
                    },
                    _applyEffectToAction: function(a, b) {
                        switch (b) {
                            case "portal:admin:inviteUsers":
                                this.privilegeObj.portal.admin.inviteUsers =
                                    a;
                                break;
                            case "portal:admin:disableUsers":
                                this.privilegeObj.portal.admin.disableUsers = a;
                                break;
                            case "portal:admin:viewUsers":
                                this.privilegeObj.portal.admin.viewUsers = a;
                                break;
                            case "portal:admin:updateUsers":
                                this.privilegeObj.portal.admin.updateUsers = a;
                                break;
                            case "portal:admin:deleteUsers":
                                this.privilegeObj.portal.admin.deleteUsers = a;
                                break;
                            case "portal:admin:changeUserRoles":
                                this.privilegeObj.portal.admin.changeUserRoles = a;
                                break;
                            case "portal:admin:viewGroups":
                                this.privilegeObj.portal.admin.viewGroups =
                                    a;
                                break;
                            case "portal:admin:updateGroups":
                                this.privilegeObj.portal.admin.updateGroups = a;
                                break;
                            case "portal:admin:deleteGroups":
                                this.privilegeObj.portal.admin.deleteGroups = a;
                                break;
                            case "portal:admin:reassignGroups":
                                this.privilegeObj.portal.admin.reassignGroups = a;
                                break;
                            case "portal:admin:assignToGroups":
                                this.privilegeObj.portal.admin.assignToGroups = a;
                                break;
                            case "portal:admin:manageEnterpriseGroups":
                                this.privilegeObj.portal.admin.manageEnterpriseGroups = a;
                                break;
                            case "portal:admin:viewItems":
                                this.privilegeObj.portal.admin.viewItems =
                                    a;
                                break;
                            case "portal:admin:updateItems":
                                this.privilegeObj.portal.admin.updateItems = a;
                                break;
                            case "portal:admin:deleteItems":
                                this.privilegeObj.portal.admin.deleteItems = a;
                                break;
                            case "portal:admin:reassignItems":
                                this.privilegeObj.portal.admin.reassignItems = a;
                                break;
                            case "portal:admin:manageLicenses":
                                this.privilegeObj.portal.admin.manageLicenses = a;
                                break;
                            case "portal:publisher:publishFeatures":
                                this.privilegeObj.portal.publisher.publishFeatures = a;
                                break;
                            case "portal:publisher:publishTiles":
                                this.privilegeObj.portal.publisher.publishTiles =
                                    a;
                                break;
                            case "portal:publisher:publishScenes":
                                this.privilegeObj.portal.publisher.publishScenes = a;
                                break;
                            case "portal:user:createGroup":
                                this.privilegeObj.portal.user.createGroup = a;
                                break;
                            case "portal:user:joinGroup":
                                this.privilegeObj.portal.user.joinGroup = a;
                                break;
                            case "portal:user:joinNonOrgGroup":
                                this.privilegeObj.portal.user.joinNonOrgGroup = a;
                                break;
                            case "portal:user:createItem":
                                this.privilegeObj.portal.user.createItem = a;
                                break;
                            case "portal:user:shareToGroup":
                                this.privilegeObj.portal.user.shareToGroup =
                                    a;
                                break;
                            case "portal:user:shareToOrg":
                                this.privilegeObj.portal.user.shareToOrg = a;
                                break;
                            case "portal:user:shareToPublic":
                                this.privilegeObj.portal.user.shareToPublic = a;
                                break;
                            case "portal:user:shareGroupToOrg":
                                this.privilegeObj.portal.user.shareGroupToOrg = a;
                                break;
                            case "portal:user:shareGroupToPublic":
                                this.privilegeObj.portal.user.shareGroupToPublic = a;
                                break;
                            case "features:user:edit":
                                this.privilegeObj.features.user.edit = a;
                                break;
                            case "features:user:fullEdit":
                                this.privilegeObj.features.user.fullEdit = a;
                                break;
                            case "opendata:user:openDataAdmin":
                                this.privilegeObj.opendata.user.openDataAdmin = a;
                                break;
                            case "opendata:user:designateGroup":
                                this.privilegeObj.opendata.user.designateGroup = a;
                                break;
                            case "premium:user:geocode":
                                this.privilegeObj.premium.user.geocode = a;
                                break;
                            case "premium:user:networkanalysis":
                                this.privilegeObj.premium.user.networkanalysis = a;
                                break;
                            case "premium:user:spatialanalysis":
                                this.privilegeObj.premium.user.spatialanalysis = a;
                                break;
                            case "premium:user:geoenrichment":
                                this.privilegeObj.premium.user.geoenrichment =
                                    a;
                                break;
                            case "premium:user:demographics":
                                this.privilegeObj.premium.user.demographics = a;
                                break;
                            case "premium:user:elevation":
                                this.privilegeObj.premium.user.elevation = a;
                                break;
                            case "marketplace:admin:purchase":
                                this.privilegeObj.marketplace.admin.purchase = a;
                                break;
                            case "marketplace:admin:manage":
                                this.privilegeObj.marketplace.admin.manage = a;
                                break;
                            case "marketplace:admin:startTrial":
                                this.privilegeObj.marketplace.admin.startTrial = a
                        }
                    },
                    _applyToAll: function(a) {
                        this.privilegeObj.portal.admin.inviteUsers = a;
                        this.privilegeObj.portal.admin.disableUsers =
                            a;
                        this.privilegeObj.portal.admin.viewUsers = a;
                        this.privilegeObj.portal.admin.updateUsers = a;
                        this.privilegeObj.portal.admin.deleteUsers = a;
                        this.privilegeObj.portal.admin.changeUserRoles = a;
                        this.privilegeObj.portal.admin.viewGroups = a;
                        this.privilegeObj.portal.admin.updateGroups = a;
                        this.privilegeObj.portal.admin.deleteGroups = a;
                        this.privilegeObj.portal.admin.reassignGroups = a;
                        this.privilegeObj.portal.admin.assignToGroups = a;
                        this.privilegeObj.portal.admin.manageEnterpriseGroups = a;
                        this.privilegeObj.portal.admin.viewItems =
                            a;
                        this.privilegeObj.portal.admin.updateItems = a;
                        this.privilegeObj.portal.admin.deleteItems = a;
                        this.privilegeObj.portal.admin.reassignItems = a;
                        this.privilegeObj.portal.admin.manageLicenses = a;
                        this.privilegeObj.portal.publisher.publishFeatures = a;
                        this.privilegeObj.portal.publisher.publishTiles = a;
                        this.privilegeObj.portal.publisher.publishScenes = a;
                        this.privilegeObj.portal.user.createGroup = a;
                        this.privilegeObj.portal.user.joinGroup = a;
                        this.privilegeObj.portal.user.joinNonOrgGroup = a;
                        this.privilegeObj.portal.user.createItem =
                            a;
                        this.privilegeObj.portal.user.shareToGroup = a;
                        this.privilegeObj.portal.user.shareToOrg = a;
                        this.privilegeObj.portal.user.shareToPublic = a;
                        this.privilegeObj.portal.user.shareGroupToOrg = a;
                        this.privilegeObj.portal.user.shareGroupToPublic = a;
                        this.privilegeObj.features.user.edit = a;
                        this.privilegeObj.opendata.user.openDataAdmin = a;
                        this.privilegeObj.opendata.user.designateGroup = a;
                        this.privilegeObj.premium.user.geocode = a;
                        this.privilegeObj.premium.user.networkanalysis = a;
                        this.privilegeObj.premium.user.spatialanalysis =
                            a;
                        this.privilegeObj.premium.user.geoenrichment = a;
                        this.privilegeObj.premium.user.demographics = a;
                        this.privilegeObj.premium.user.elevation = a;
                        this.privilegeObj.marketplace.admin.purchase = a;
                        this.privilegeObj.marketplace.admin.manage = a;
                        this.privilegeObj.marketplace.admin.startTrial = a
                    },
                    _buildPrivilegesArray: function() {
                        var a = [];
                        !0 === this.privilegeObj.portal.admin.inviteUsers && a.push("portal:admin:inviteUsers");
                        !0 === this.privilegeObj.portal.admin.disableUsers && a.push("portal:admin:disableUsers");
                        !0 === this.privilegeObj.portal.admin.viewUsers &&
                            a.push("portal:admin:viewUsers");
                        !0 === this.privilegeObj.portal.admin.updateUsers && a.push("portal:admin:updateUsers");
                        !0 === this.privilegeObj.portal.admin.deleteUsers && a.push("portal:admin:deleteUsers");
                        !0 === this.privilegeObj.portal.admin.changeUserRoles && a.push("portal:admin:changeUserRoles");
                        !0 === this.privilegeObj.portal.admin.viewGroups && a.push("portal:admin:viewGroups");
                        !0 === this.privilegeObj.portal.admin.updateGroups && a.push("portal:admin:updateGroups");
                        !0 === this.privilegeObj.portal.admin.deleteGroups &&
                            a.push("portal:admin:deleteGroups");
                        !0 === this.privilegeObj.portal.admin.reassignGroups && a.push("portal:admin:reassignGroups");
                        !0 === this.privilegeObj.portal.admin.assignToGroups && a.push("portal:admin:assignToGroups");
                        !0 === this.privilegeObj.portal.admin.manageEnterpriseGroups && a.push("portal:admin:manageEnterpriseGroups");
                        !0 === this.privilegeObj.portal.admin.viewItems && a.push("portal:admin:viewItems");
                        !0 === this.privilegeObj.portal.admin.updateItems && a.push("portal:admin:updateItems");
                        !0 === this.privilegeObj.portal.admin.deleteItems &&
                            a.push("portal:admin:deleteItems");
                        !0 === this.privilegeObj.portal.admin.reassignItems && a.push("portal:admin:reassignItems");
                        !0 === this.privilegeObj.portal.admin.manageLicenses && a.push("portal:admin:manageLicenses");
                        !0 === this.privilegeObj.portal.publisher.publishFeatures && a.push("portal:publisher:publishFeatures");
                        !0 === this.privilegeObj.portal.publisher.publishTiles && a.push("portal:publisher:publishTiles");
                        !0 === this.privilegeObj.portal.publisher.publishScenes && a.push("portal:publisher:publishScenes");
                        !0 === this.privilegeObj.portal.user.createGroup && a.push("portal:user:createGroup");
                        !0 === this.privilegeObj.portal.user.joinGroup && a.push("portal:user:joinGroup");
                        !0 === this.privilegeObj.portal.user.joinNonOrgGroup && a.push("portal:user:joinNonOrgGroup");
                        !0 === this.privilegeObj.portal.user.createItem && a.push("portal:user:createItem");
                        !0 === this.privilegeObj.portal.user.shareToGroup && a.push("portal:user:shareToGroup");
                        !0 === this.privilegeObj.portal.user.shareToOrg && a.push("portal:user:shareToOrg");
                        !0 === this.privilegeObj.portal.user.shareToPublic &&
                            a.push("portal:user:shareToPublic");
                        !0 === this.privilegeObj.portal.user.shareGroupToOrg && a.push("portal:user:shareGroupToOrg");
                        !0 === this.privilegeObj.portal.user.shareGroupToPublic && a.push("portal:user:shareGroupToPublic");
                        !0 === this.privilegeObj.features.user.edit && a.push("features:user:edit");
                        !0 === this.privilegeObj.features.user.fullEdit && a.push("features:user:fullEdit");
                        !0 === this.privilegeObj.opendata.user.openDataAdmin && a.push("opendata:user:openDataAdmin");
                        !0 === this.privilegeObj.opendata.user.designateGroup &&
                            a.push("opendata:user:designateGroup");
                        !0 === this.privilegeObj.premium.user.geocode && a.push("premium:user:geocode");
                        !0 === this.privilegeObj.premium.user.networkanalysis && a.push("premium:user:networkanalysis");
                        !0 === this.privilegeObj.premium.user.spatialanalysis && a.push("premium:user:spatialanalysis");
                        !0 === this.privilegeObj.premium.user.geoenrichment && a.push("premium:user:geoenrichment");
                        !0 === this.privilegeObj.premium.user.demographics && a.push("premium:user:demographics");
                        !0 === this.privilegeObj.premium.user.elevation &&
                            a.push("premium:user:elevation");
                        !0 === this.privilegeObj.marketplace.admin.purchase && a.push("marketplace:admin:purchase");
                        !0 === this.privilegeObj.marketplace.admin.manage && a.push("marketplace:admin:manage");
                        !0 === this.privilegeObj.marketplace.admin.startTrial && a.push("marketplace:admin:startTrial");
                        return a
                    },
                    isUser: function() {
                        return d.isDefined(this.id) && ("org_user" === this.id || "account_user" === this.id)
                    },
                    isPublisher: function() {
                        return d.isDefined(this.id) && ("org_publisher" === this.id || "account_publisher" ===
                            this.id)
                    },
                    isAdmin: function() {
                        return d.isDefined(this.id) && ("org_admin" === this.id || "account_admin" === this.id)
                    },
                    isBasedOnUser: function() {
                        return this.isUser() || d.isDefined(this.baseRole) && ("org_user" === this.baseRole || "account_user" === this.baseRole)
                    },
                    isBasedOnPublisher: function() {
                        return this.isPublisher() || d.isDefined(this.baseRole) && ("org_publisher" === this.baseRole || "account_publisher" === this.baseRole)
                    },
                    isBasedOnAdmin: function() {
                        return this.isAdmin() || d.isDefined(this.baseRole) && ("org_admin" === this.baseRole ||
                            "account_admin" === this.baseRole)
                    },
                    isCustom: function() {
                        return !this.isUser() && !this.isPublisher() && !this.isAdmin() && d.isDefined(this.id) && 0 < this.id.length
                    },
                    canInviteUsers: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.inviteUsers
                    },
                    canDisableUsers: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.disableUsers
                    },
                    canViewUsers: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.viewUsers
                    },
                    canUpdateUsers: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.updateUsers
                    },
                    canDeleteUsers: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.deleteUsers
                    },
                    canChangeUserRoles: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.changeUserRoles
                    },
                    canViewOrgGroups: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.viewGroups
                    },
                    canUpdateOrgGroups: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.updateGroups
                    },
                    canDeleteOrgGroups: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.deleteGroups
                    },
                    canReassignOrgGroups: function() {
                        return this.privilegeObj &&
                            this.privilegeObj.portal.admin.reassignGroups
                    },
                    canAssignUsersToOrgGroups: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.assignToGroups
                    },
                    canManageEnterpriseGroups: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.manageEnterpriseGroups
                    },
                    canViewOrgItems: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.viewItems
                    },
                    canUpdateOrgItems: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.updateItems
                    },
                    canDeleteOrgItems: function() {
                        return this.privilegeObj &&
                            this.privilegeObj.portal.admin.deleteItems
                    },
                    canReassignOrgItems: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.reassignItems
                    },
                    canManageLicenses: function() {
                        return this.privilegeObj && this.privilegeObj.portal.admin.manageLicenses
                    },
                    canCreateGroup: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.createGroup
                    },
                    canJoinOrgGroup: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.joinGroup
                    },
                    canJoinNonOrgGroup: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.joinNonOrgGroup
                    },
                    canPublishFeatures: function() {
                        return this.privilegeObj && this.privilegeObj.portal.publisher.publishFeatures
                    },
                    canPublishTiles: function() {
                        return this.privilegeObj && this.privilegeObj.portal.publisher.publishTiles
                    },
                    canPublishScenes: function() {
                        return this.privilegeObj && this.privilegeObj.portal.publisher.publishScenes
                    },
                    canCreateItem: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.createItem
                    },
                    canShareItemToGroup: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.shareToGroup
                    },
                    canShareItemToOrg: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.shareToOrg
                    },
                    canShareItemToPublic: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.shareToPublic
                    },
                    canShareGroupToOrg: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.shareGroupToOrg
                    },
                    canShareGroupToPublic: function() {
                        return this.privilegeObj && this.privilegeObj.portal.user.shareGroupToPublic
                    },
                    canEditFeatures: function() {
                        return this.privilegeObj && this.privilegeObj.features.user.edit
                    },
                    canEditFeaturesFullControl: function() {
                        return this.privilegeObj && this.privilegeObj.features.user.fullEdit
                    },
                    canManageOpenData: function() {
                        return this.privilegeObj && this.privilegeObj.opendata.user.openDataAdmin
                    },
                    canDesignateOpenDataGroups: function() {
                        return this.privilegeObj && this.privilegeObj.opendata.user.designateGroup
                    },
                    canUseGeocode: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.geocode
                    },
                    canUseNetworkAnalysis: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.networkanalysis
                    },
                    canUseSpatialAnalysis: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.spatialanalysis
                    },
                    canUseGeoenrichment: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.geoenrichment
                    },
                    canUseDemographics: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.demographics
                    },
                    canUseElevation: function() {
                        return this.privilegeObj && this.privilegeObj.premium.user.elevation
                    },
                    canPurchaseMarketplace: function() {
                        return this.privilegeObj && this.privilegeObj.marketplace.admin.purchase
                    },
                    canManageMarketplace: function() {
                        return this.privilegeObj && this.privilegeObj.marketplace.admin.manage
                    },
                    canTrialMarketplace: function() {
                        return this.privilegeObj && this.privilegeObj.marketplace.admin.startTrial
                    },
                    setPrivileges: function(a) {
                        this.privileges = a;
                        this._initPrivilegesObject();
                        d.isDefined(a) && this._readPrivileges(a)
                    },
                    stringify: function() {
                        return h.stringify({
                            id: this.id,
                            name: this.name,
                            description: this.description,
                            privileges: this._buildPrivilegesArray()
                        })
                    },
                    stringifyRole: function() {
                        return h.stringify({
                            id: this.id,
                            name: this.name,
                            description: this.description
                        })
                    },
                    stringifyPrivileges: function() {
                        return h.stringify({
                            privileges: this._buildPrivilegesArray()
                        })
                    },
                    stringifyPretty: function() {
                        return h.stringify({
                            id: this.id,
                            name: this.name,
                            description: this.description,
                            privileges: this._buildPrivilegesArray()
                        }, null, "  ")
                    }
                })
            })
        },
        "jimu/dijit/ShareLink": function() {
            define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/_base/lang dojo/_base/array dojo/dom-class dojo/on dojo/topic dojo/query jimu/utils dojo/_base/config dojo/cookie esri/urlUtils dojo/text!./templates/ShareLink.html dojo/string dijit/form/Select dijit/form/NumberTextBox dojo/dom-attr dojo/Deferred esri/request esri/tasks/query esri/tasks/QueryTask esri/symbols/PictureMarkerSymbol esri/graphic esri/layers/GraphicsLayer jimu/dijit/FeaturelayerChooserFromMap jimu/dijit/LayerChooserFromMapWithDropbox dijit/form/TextBox dijit/form/Textarea dijit/form/RadioButton dijit/form/Select dijit/form/CheckBox dijit/form/NumberTextBox dijit/form/SimpleTextarea dijit/form/ValidationTextBox".split(" "),
                function(e, k, l, h, d, a, b, c, g, n, s, f, p, m, v, r, t, w, q, H, C, I, y, D, E, F, G, J) {
                    return e([k, l, h], {
                        templateString: v,
                        declaredClass: "jimu.dijit.ShareLink",
                        bitlyUrl: "http://api.bit.ly/v3/shorten?login\x3darcgisdev\x26apiKey\x3dR_18b3867d45854ba98d9e0e7c20dbf6d3",
                        bitlyUrlSSL: "https://api-ssl.bitly.com/v3/shorten?login\x3darcgisdev\x26apiKey\x3dR_18b3867d45854ba98d9e0e7c20dbf6d3",
                        share: {
                            shareEmailSubject: "",
                            shareTwitterTxt: "",
                            languages: "ar cs da de en el es et fi fr he hr it ja ko lt lv nb nl pl pt-br pt-pt ro ru sr sv th tr zh-cn vi zh-hk zh-tw".split(" "),
                            DEFAULT_MOBILE_LAYOUT: 600
                        },
                        _hasZoomLevelMarkerAdded: !1,
                        _hasMapScaleMarkerAdded: !1,
                        _hasAddMarkerMarkerAdded: !1,
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this.nls = window.jimuNls.shareLink;
                            this.nls.symbol = window.jimuNls.common.symbol;
                            this.nls.label = window.jimuNls.common.label;
                            this.nls.WKID = window.jimuNls.common.wkid || "wkid";
                            this.nls.popupTitle = window.jimuNls.shareLink.popupTitle || "Pop-up title";
                            this.nls.zoomLevel = window.jimuNls.shareLink.zoomLevel || "Zoom level";
                            this.share.shareEmailSubject =
                                this.nls.shareEmailSubject + " ${appTitle} ";
                            this.share.shareTwitterTxt = this.nls.shareEmailSubject + "${appTitle}\n"
                        },
                        postCreate: function() {
                            this.inherited(arguments);
                            this._initUI();
                            this._initMap();
                            this._showSocialMediaLinksByConfig()
                        },
                        constructor: function(a) {
                            a && (this._portalUrl = a.portalUrl, this._isOnline = a.isOnline, this._appTitle = a.appTitle, this._isShowBackBtn = a.isShowBackBtn, this._isShowSocialMediaLinks = a.isShowSocialMediaLinks, this._isSharedToPublic = a.isSharedToPublic, this._isShowFindLocation = a.isShowFindLocation,
                                this._config = a.config)
                        },
                        startup: function() {
                            this.baseHrefUrl = this.getBaseHrefUrl(this._portalUrl);
                            "undefined" === typeof this.optionSrc && (this.optionSrc = "currentMapExtent");
                            this.updateUrl(null);
                            this._initOptions();
                            this._initOptionsEvent()
                        },
                        destroy: function() {
                            this._cleanMarkerStatus();
                            this._mapClickHandler && (this._mapClickHandler = null);
                            this.inherited(arguments)
                        },
                        onShareToPublicChanged: function(a) {
                            this._isSharedToPublic = a;
                            this._isOnline && this.updateUrl(null);
                            this._isSharedToPublic ? b.add(this.shareTips,
                                "displaynone") : b.remove(this.shareTips, "displaynone")
                        },
                        onCloseContainer: function() {
                            this._cleanMarkerStatus()
                        },
                        updateShareLinkOptionsUI: function(a) {
                            a && "undefined" !== typeof a.isShowFindLocation && this.findLocationRow && (!1 === a.isShowFindLocation ? b.add(this.findLocationRow, "displaynone") : !0 === a.isShowFindLocation && b.remove(this.findLocationRow, "displaynone"))
                        },
                        _initMap: function() {
                            window.isBuilder ? (this.own(g.subscribe("app/mapLoaded", d.hitch(this, this._onMapLoaded))), this.own(g.subscribe("app/mapChanged",
                                d.hitch(this, this._onMapLoaded)))) : (this.own(g.subscribe("mapLoaded", d.hitch(this, this._onMapLoaded))), this.own(g.subscribe("mapChanged", d.hitch(this, this._onMapLoaded))));
                            window._widgetManager.map && (this.map = window._widgetManager.map, this._mapEventUpdateUrls(), this._addGraphicsLayer())
                        },
                        _onMapLoaded: function(a) {
                            this.map = a;
                            this._mapEventUpdateUrls();
                            this._addGraphicsLayer()
                        },
                        _mapEventUpdateUrls: function() {
                            this.map && (this.own(c(this.map, "pan-end", d.hitch(this, function() {
                                    this._mapEventHandler("pan-end")
                                }))),
                                this.own(c(this.map, "resize", d.hitch(this, function() {
                                    this._mapEventHandler("resize")
                                }))), this.own(c(this.map, "zoom-end", d.hitch(this, function() {
                                    this._mapEventHandler("zoom-end")
                                }))))
                        },
                        _mapEventHandler: function() {
                            this._isShareLinkOptionsShow() && this.updateUrl()
                        },
                        _showSocialMediaLinksByConfig: function() {
                            this._config && this._config.socialMedias && ("undefined" !== typeof this._config.socialMedias.email && !1 === this._config.socialMedias.email && b.add(this.emailShare, "displaynone"), "undefined" !== typeof this._config.socialMedias.facebook &&
                                !1 === this._config.socialMedias.facebook && b.add(this.FacebookShare, "displaynone"), "undefined" !== typeof this._config.socialMedias.twitter && !1 === this._config.socialMedias.twitter && b.add(this.TwitterShare, "displaynone"), "undefined" !== typeof this._config.socialMedias.googlePlus && !1 === this._config.socialMedias.googlePlus && b.add(this.googlePlusShare, "displaynone"))
                        },
                        _initUI: function() {
                            this._isShowBackBtn ? (q.set(this.backBtn, "title", window.jimuNls.common.back), this.own(c(this.backBtn, "click", d.hitch(this,
                                this._toggleLinkOptions)))) : b.add(this.backBtn, "displaynone");
                            !1 === this._isShowSocialMediaLinks && b.toggle(this.socialNetworkLinks, "displaynone");
                            !0 === this._isSharedToPublic && b.toggle(this.shareTips, "displaynone");
                            this.own(c(this.linkOptions, "click", d.hitch(this, this._toggleLinkOptions)));
                            this._setInputsClicktoSelect(this._linkUrlTextBox);
                            this.own(c(this.googlePlusShare, "click", d.hitch(this, this._toGooglePlus)));
                            this._setInputsClicktoSelect(this._embedCodeTextArea);
                            this._sizeOptions = new t({
                                options: [{
                                    label: this.nls.smallSize,
                                    value: "small",
                                    selected: !0
                                }, {
                                    label: this.nls.mediumSize,
                                    value: "medium",
                                    selected: !1
                                }, {
                                    label: this.nls.largeSize,
                                    value: "large",
                                    selected: !1
                                }, {
                                    label: this.nls.customSize,
                                    value: "custom",
                                    selected: !1
                                }],
                                "class": "sizeOptionsSelect"
                            });
                            this._sizeOptions.placeAt(this.SizeSelect);
                            this.own(c(this._sizeOptions, "change", function(a) {
                                switch (a) {
                                    case "small":
                                        this._widthTextBox.set("value", 300);
                                        this._heightTextBox.set("value", 200);
                                        b.add(this.CustomSizeContainer, "disable");
                                        this._updateEmbedCodeFrameSize();
                                        break;
                                    case "medium":
                                        this._widthTextBox.set("value",
                                            800);
                                        this._heightTextBox.set("value", 600);
                                        b.add(this.CustomSizeContainer, "disable");
                                        this._updateEmbedCodeFrameSize();
                                        break;
                                    case "large":
                                        this._widthTextBox.set("value", 1080);
                                        this._heightTextBox.set("value", 720);
                                        b.add(this.CustomSizeContainer, "disable");
                                        this._updateEmbedCodeFrameSize();
                                        break;
                                    case "custom":
                                        b.remove(this.CustomSizeContainer, "disable")
                                }
                            }.bind(this)));
                            this._widthTextBox = new w({
                                "class": "sizeTextBox inputsText",
                                value: 300,
                                constraints: {
                                    pattern: "#",
                                    places: 0
                                }
                            });
                            this._widthTextBox.placeAt(this.CustomSizeContainer,
                                1);
                            this.own(c(this._widthTextBox, "change", function(a) {
                                200 > a ? this._widthTextBox.set("value", 200 > a ? 200 : a) : this._updateEmbedCodeFrameSize()
                            }.bind(this)));
                            this._heightTextBox = new w({
                                "class": "sizeTextBox inputsText",
                                value: 200,
                                constraints: {
                                    pattern: "#",
                                    places: 0
                                }
                            });
                            this._heightTextBox.placeAt(this.CustomSizeContainer, 3);
                            this.own(c(this._heightTextBox, "change", function(a) {
                                200 > a ? this._heightTextBox.set("value", 200 > a ? 200 : a) : this._updateEmbedCodeFrameSize()
                            }.bind(this)));
                            this.mobileLayout.set("value", this.share.DEFAULT_MOBILE_LAYOUT);
                            this.updateShareLinkOptionsUI({
                                isShowFindLocation: this._isShowFindLocation
                            });
                            this._setInputsClicktoSelect(this.preview)
                        },
                        _setLinkUrl: function(a) {
                            this._linkUrlTextBox.set("value", a);
                            q.set(this._linkUrlTextBox.domNode, "data-old", a)
                        },
                        _setEmbedCode: function(a) {
                            var b = '\x3ciframe width\x3d"' + this._widthTextBox.value + '" height\x3d"' + this._heightTextBox.value + '" frameborder\x3d"0" scrolling\x3d"no" allowfullscreen src\x3d"';
                            this._embedCodeTextArea.set("value", b + a + '"\x3e\x3c/iframe\x3e');
                            q.set(this._embedCodeTextArea.domNode,
                                "data-old-shortened", a)
                        },
                        _updateEmbedCodeFrameSize: function(a) {
                            a = this._embedCodeTextArea.get("value");
                            a = a.replace(/width=\"[0-9]*\"/i, 'width\x3d"' + this._widthTextBox.value + '"');
                            a = a.replace(/height=\"[0-9]*\"/i, 'height\x3d"' + this._heightTextBox.value + '"');
                            this._embedCodeTextArea.set("value", a)
                        },
                        _initOptions: function() {
                            var z = [],
                                g = this.map.getLevel();
                            "number" === typeof g && -1 !== g ? b.remove(this.chooseCenterWithLevelRow, "displaynone") : b.add(this.chooseCenterWithLevelRow, "displaynone");
                            z = [];
                            this.setlanguage_languages.removeOption(this.setlanguage_languages.getOptions());
                            a.forEach(this.share.languages, function(a) {
                                var b = {
                                    label: a,
                                    value: a
                                };
                                b.selected = a === f.locale ? !0 : !1;
                                z.push(b)
                            });
                            this.setlanguage_languages.addOption(z);
                            g = "";
                            try {
                                g = JSON.parse(p("esri_auth")).token
                            } catch (e) {
                                console.log("ShareLink can't parse Auth:" + e)
                            }
                            g && this.authtoken.set("value", g);
                            g = new G({
                                createMapResponse: this.map.webMapResponse,
                                showLayerFromFeatureSet: !1,
                                onlyShowVisible: !1,
                                updateWhenLayerInfosIsShowInMapChanged: !1
                            });
                            b.add(g.domNode, "share-layerChooser-dropbox");
                            this.layerChooserFromMapWithDropbox =
                                new J({
                                    layerChooser: g
                                });
                            this.layerChooserFromMapWithDropbox.placeAt(this.queryFeature_layer);
                            this.own(c(this.layerChooserFromMapWithDropbox, "selection-change", d.hitch(this, this._updateQueryFeature_Layer)));
                            "undefined" !== typeof this.map.spatialReference && "undefined" !== typeof this.map.spatialReference.wkid && this.addMarker_spatialReference.set("value", this.map.spatialReference.wkid)
                        },
                        _initOptionsEvent: function() {
                            var a = s.has("ie") || s.has("edge") ? "change" : "KeyUp",
                                b = n(".shareRadios", this.domNode);
                            this.own(c(b,
                                "change", d.hitch(this, function(a) {
                                    this.optionSrc = q.get(a.srcElement || a.target, "data-id");
                                    this.updateUrl()
                                })));
                            b = n(".shareCheckBoxes", this.domNode);
                            this.own(c(b, "click", d.hitch(this, function() {
                                this.updateUrl()
                            })));
                            this.own(c(this.chooseCenterWithLevel_levels, "change", d.hitch(this, function() {
                                this.updateUrl()
                            })));
                            this.own(c(this.chooseCenterWithScale_scales, "change", d.hitch(this, function() {
                                this.updateUrl()
                            })));
                            this.own(c(this.setlanguage_languages, "change", d.hitch(this, function() {
                                this.updateUrl()
                            })));
                            this.own(c(this.findLocation_input, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.queryFeature_field, "change", d.hitch(this, this._updateQueryFeature_Value)));
                            this.own(c(this.queryFeature_value, "change", d.hitch(this, this.updateUrl)));
                            this.own(c(this.mobileLayout, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.authtoken, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.addMarker_marker, "click", d.hitch(this, function(a) {
                                this._onMarkersClick(a)
                            })));
                            this.own(c(this.addMarker_spatialReference, "change",
                                d.hitch(this, this.updateUrl)));
                            this.own(c(this.addMarker_title, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.addMarker_symbolURL, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.addMarker_label, a, d.hitch(this, this.updateUrl)));
                            this.own(c(this.addMarker_level, "change", d.hitch(this, this.updateUrl)));
                            this.own(c(this.chooseCenterWithLevel_marker, "click", d.hitch(this, function(a) {
                                this._onMarkersClick(a)
                            })));
                            this.own(c(this.chooseCenterWithScale_marker, "click", d.hitch(this, function(a) {
                                this._onMarkersClick(a)
                            })))
                        },
                        _onMarkersClick: function(a) {
                            this._unselectMarkerBtn();
                            this._selectMarkerBtn(a);
                            this._hidePopup();
                            this._removeGraphicsLayer();
                            this._mapClickHandler = c.once(this.map, "click", d.hitch(this, this._onMapClick))
                        },
                        _onMapClick: function(a) {
                            var b = a.mapPoint;
                            this._addGraphicsLayerMarker(a);
                            "chooseCenterWithLevel" === this.optionSrc ? this._hasZoomLevelMarkerAdded = !1 : "chooseCenterWithScale" === this.optionSrc ? this._hasMapScaleMarkerAdded = !1 : "addMarker" === this.optionSrc && (this._hasAddMarkerMarkerAdded = !1);
                            this._unselectMarkerBtn();
                            this.updateUrl(b);
                            this._showPopup()
                        },
                        _hidePopup: function() {
                            g.publish("ShareLink/onHideContainer")
                        },
                        _showPopup: function() {
                            g.publish("ShareLink/onShowContainer")
                        },
                        _updateResUrls: function(a) {
                            "currentMapExtent" === this.optionSrc ? (a = this.getMapExtent(this.map), this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "extent", a, !0)) : "chooseCenterWithLevel" === this.optionSrc ? (!1 === this._hasZoomLevelMarkerAdded && (this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "center", this.getMapCenter(this.map, a), !0), a && (a.x && a.y) && (this._hasZoomLevelMarkerAdded = !0)), this.resultUrl = this._addQueryParamToUrl(this.resultUrl, "level", this._getMapLevel(), !0)) : "chooseCenterWithScale" === this.optionSrc ? (!1 === this._hasMapScaleMarkerAdded && (this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "center", this.getMapCenter(this.map, a), !0), a && (a.x && a.y) && (this._hasMapScaleMarkerAdded = !0)), this.resultUrl = this._addQueryParamToUrl(this.resultUrl, "scale", this._getMapScale(), !0)) : "findLocation" === this.optionSrc ? (a = this.findLocation_input.get("value"),
                                this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "find", a, !0)) : "queryFeature" === this.optionSrc ? this._updateUrlByQueryFeatures() : "addMarker" === this.optionSrc && (!1 === this._hasAddMarkerMarkerAdded ? (this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "marker", this.getMapCenter(this.map, a, null, this._getWkid()), !0), this.resultUrl += ",", a && (a.x && a.y) && (this._hasAddMarkerMarkerAdded = !0, this._lastAddMarkerParamObj = a)) : (this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "marker", this.getMapCenter(this.map,
                                this._lastAddMarkerParamObj, null, this._getWkid()), !0), this.resultUrl += ","), this.resultUrl += encodeURIComponent(this.addMarker_title.get("value") || ""), this.resultUrl += ",", this.resultUrl += encodeURIComponent(this.addMarker_symbolURL.get("value") || ""), this.resultUrl += ",", this.resultUrl += encodeURIComponent(this.addMarker_label.get("value") || ""), a = this._getMapLevel(), this.resultUrl = "number" === typeof a && -1 !== a ? this._addQueryParamToUrl(this.resultUrl, "level", this._getMapLevel(), !0) : this._addQueryParamToUrl(this.resultUrl,
                                "scale", this._getMapScale(), !0));
                            this.resultUrl = this._removeQueryParamFromUrl(this.resultUrl, "mobileBreakPoint", !0);
                            this.resultUrl = this._removeQueryParamFromUrl(this.resultUrl, "locale", !0);
                            this.resultUrl = this._removeQueryParamFromUrl(this.resultUrl, "token", !0);
                            this.overwirteMobileLayout.checked && (this.resultUrl = this._addQueryParamToUrl(this.resultUrl, "mobileBreakPoint", this.mobileLayout.getValue(), !0));
                            this.setlanguage.checked && (this.resultUrl = this._addQueryParamToUrl(this.resultUrl, "locale", this.setlanguage_languages.getValue(), !0));
                            this.auth.checked && (this.resultUrl = this._addQueryParamToUrl(this.resultUrl, "token", this.authtoken.getValue(), !0))
                        },
                        _updateUrlByQueryFeatures: function() {
                            var a = this._getIdFromLayerChoose() || "",
                                b = this.queryFeature_field.get("value"),
                                c = this.queryFeature_value.get("value");
                            this.resultUrl = this._addQueryParamToUrl(this.baseHrefUrl, "query", a, !0);
                            b && (this.resultUrl += ",", this.resultUrl += b, c && (this.resultUrl += ",", this.resultUrl += c))
                        },
                        _updateQueryFeature_Layer: function() {
                            this._updateUrlByQueryFeatures();
                            this._updateQueryFeature_Field();
                            this._updateQueryFeature_Value();
                            this.updateUrl()
                        },
                        _updateQueryFeature_Field: function() {
                            var b = this._getFieldsFromLayerChoose(),
                                c = [];
                            this.queryFeature_field.removeOption(this.queryFeature_field.getOptions());
                            a.forEach(b, d.hitch(this, function(a) {
                                -1 < "esriFieldTypeString esriFieldTypeOID esriFieldTypeSmallInteger esriFieldTypeInteger esriFieldTypeSingle esriFieldTypeDouble".split(" ").indexOf(a.type) && c.push({
                                    label: a.name,
                                    value: a.name
                                })
                            }));
                            this.queryFeature_field.addOption(c);
                            this._updateUrlByQueryFeatures();
                            this._updateQueryFeature_Value();
                            this.updateUrl()
                        },
                        _updateQueryFeature_Value: function() {
                            var a = [],
                                b = this.queryFeature_field.get("value");
                            a.push(b);
                            this._query(a, this._getUrlFromLayerChoose(), this.map).then(d.hitch(this, function(a) {
                                var c = [],
                                    c = this._getQueryedValues(b, a);
                                this.queryFeature_value.removeOption(this.queryFeature_value.getOptions());
                                this.queryFeature_value.addOption(c);
                                this._updateUrlByQueryFeatures();
                                this.updateUrl()
                            }))
                        },
                        _getIdFromLayerChoose: function() {
                            var a =
                                null,
                                b = this.layerChooserFromMapWithDropbox.getSelectedItem();
                            b && (b.layerInfo && b.layerInfo.id) && (a = b.layerInfo.id);
                            return a
                        },
                        _getFieldsFromLayerChoose: function() {
                            var a = [],
                                b = this.layerChooserFromMapWithDropbox.getSelectedItem();
                            b && (b.layerInfo && b.layerInfo.layerObject && b.layerInfo.layerObject.fields) && (a = b.layerInfo.layerObject.fields);
                            return a
                        },
                        _getUrlFromLayerChoose: function() {
                            var a = "",
                                b = this.layerChooserFromMapWithDropbox.getSelectedItem();
                            b && b.url && (a = b.url);
                            return a
                        },
                        _updateLinkOptionsUI: function() {
                            n(".optionsMore",
                                this.domNode).style("display", "none");
                            n("." + this.optionSrc + "_optionsMore", this.domNode).style("display", "block");
                            this.overwirteMobileLayout.checked && n(".share-options-overwirteMobileLayout_optionsMore", this.domNode).style("display", "block");
                            this.setlanguage.checked && n(".share-options-language_optionsMore", this.domNode).style("display", "block");
                            this.auth.checked && n(".share-options-auth_optionsMore", this.domNode).style("display", "block")
                        },
                        _fixUrlIfIsOnline: function(a) {
                            if (this._isOnline && this._isSharedToPublic) {
                                var b =
                                    window.top.location.protocol,
                                    c = this._getUrlQueryString(a);
                                a = this._getOnlinePublicUrl(a);
                                a = b + "//" + a + "/apps/webappviewer/index.html" + c
                            }
                            return a
                        },
                        updateUrl: function(a) {
                            this._updateResUrls(a);
                            this._updateLinkOptionsUI();
                            this.preview.set("value", this._fixUrlIfIsOnline(this.resultUrl));
                            null === a && this._generateShortenUrl()
                        },
                        _generateShortenUrl: function() {
                            var a = this.preview.get("value");
                            try {
                                this.isUseShortenUrl() ? this.shortenUrl(a, this.bitlyUrl, this.bitlyUrlSSL).then(d.hitch(this, function(a) {
                                        this._useShortenUrl(a)
                                    }),
                                    d.hitch(this, function(b) {
                                        this._useLengthenUrl(a, b)
                                    })) : this._useLengthenUrl(a)
                            } catch (b) {
                                console.error(b)
                            }
                        },
                        _useShortenUrl: function(a) {
                            this.shortenedUrl = a;
                            this._setLinkUrl(a);
                            this._setEmbedCode(a)
                        },
                        _useLengthenUrl: function(a) {
                            a = a || "";
                            this._setLinkUrl(a);
                            this._setEmbedCode(a)
                        },
                        _toFacebook: function() {
                            var a = "http://www.facebook.com/sharer/sharer.php?s\x3d100\x26u\x3d" + encodeURIComponent(this._linkUrlTextBox.get("value")) + "\x26t\x3d" + encodeURIComponent(s.stripHTML(this.socialNetworkTitle(this._appTitle)));
                            window.open(a, "_blank")
                        },
                        _toTwitter: function() {
                            var a = r.substitute(this.share.shareTwitterTxt, {
                                    appTitle: s.stripHTML(this._appTitle)
                                }),
                                b = this._linkUrlTextBox.get("value");
                            window.open("http://twitter.com/home?status\x3d" + encodeURIComponent(a + b + "\n@ArcGISOnline"), "_blank")
                        },
                        _toEmail: function() {
                            var a = "mailto:?subject\x3d" + r.substitute(this.share.shareEmailSubject, {
                                    appTitle: s.stripHTML(this._appTitle)
                                }),
                                b = this.preview.get("value"),
                                a = a + ("\x26body\x3d" + encodeURIComponent(this.nls.shareEmailTxt1) + "%0D%0A%0D%0A" +
                                    s.stripHTML(this._appTitle)),
                                a = a + ("%0D%0A" + encodeURIComponent(b)),
                                a = a + ("%0D%0A%0D%0A" + encodeURIComponent(this.nls.shareEmailTxt2)),
                                a = a + ("%0D%0A%0D%0A" + encodeURIComponent(this.nls.shareEmailTxt3));
                            window.top.location.href = a
                        },
                        _toGooglePlus: function() {
                            var a = this._linkUrlTextBox.get("value"),
                                a = "http://plus.google.com/share?url\x3d" + encodeURIComponent(a);
                            window.open(a, "_blank")
                        },
                        _toggleLinkOptions: function() {
                            var a = n(".shareOptionsWrapper", this.domNode.parentNode || this.domNode.parentElement),
                                c = n(".shareUrlsWrapper",
                                    this.domNode),
                                f = n(".shareLinkOptionsWrapper", this.domNode);
                            this._isShareLinkOptionsShow() ? (g.publish("ShareLink/onHideLinkOptions"), this._cleanMarkerStatus(), this._generateShortenUrl()) : g.publish("ShareLink/onShowLinkOptions");
                            a && a[0] && b.toggle(a[0], "displaynone");
                            b.toggle(c[0], "displaynone");
                            b.toggle(f[0], "displaynone")
                        },
                        _moreOptionsExpandCollapse: function() {
                            b.toggle(this.MoreOptionsContainer, "displaynone");
                            b.toggle(this.MoreOptionsIcon, "rotate")
                        },
                        _setInputsClicktoSelect: function(a) {
                            q.set(a, "onclick",
                                "this.select()");
                            q.set(a, "onmouseup", "return false;")
                        },
                        isUseShortenUrl: function() {
                            return location.hostname.endWith("esri.com") || location.hostname.endWith("arcgis.com") ? !0 : !1
                        },
                        shortenUrl: function(a, b, c) {
                            var f = new H;
                            "https:" === location.protocol && (b = c);
                            b += "\x26longUrl\x3d" + escape(a) + "\x26format\x3djson";
                            C({
                                url: b,
                                handleAs: "json",
                                callbackParamName: "callback"
                            }).then(d.hitch(this, function(a) {
                                a && 200 === a.status_code && a.data && a.data.url && 0 < a.data.url.length ? f.resolve(a.data.url) : f.reject(a)
                            }), d.hitch(this,
                                function(a) {
                                    console.log("can't fetch shortenUrl " + a);
                                    f.reject(a)
                                }));
                            return f
                        },
                        socialNetworkTitle: function(a) {
                            100 < a.length && (a = a.substring(0, 97) + "...");
                            return a
                        },
                        getMapExtent: function(a) {
                            a = a.extent;
                            return null !== a ? this._roundValue(a.xmin, 1E4) + "," + this._roundValue(a.ymin, 1E4) + "," + this._roundValue(a.xmax, 1E4) + "," + this._roundValue(a.ymax, 1E4) + "," + a.spatialReference.wkid : ""
                        },
                        _roundValue: function(a, b) {
                            return Math.round(a * b) / b
                        },
                        getMapCenter: function(a, b, c, f) {
                            c = c ? c : ",";
                            var d = null;
                            b && b.x && b.y ? d = b : a.extent.getCenter() &&
                                (d = a.extent.getCenter());
                            a = f || d.spatialReference.wkid;
                            return null !== d ? this._roundValue(d.x, 1E4) + c + this._roundValue(d.y, 1E4) + c + a : ""
                        },
                        _getMapLevel: function() {
                            return this.map.getLevel()
                        },
                        _getMapScale: function() {
                            return this.map.getScale()
                        },
                        _getWkid: function() {
                            return this.addMarker_spatialReference.get("value") || ""
                        },
                        _query: function(a, b, c) {
                            var f = new I;
                            f.where = "1\x3d1";
                            f.outSpatialReference = c.spatialReference;
                            f.outFields = a;
                            return (new y(b)).execute(f)
                        },
                        _getQueryedValues: function(b, c) {
                            var f = [];
                            a.forEach(c.features,
                                d.hitch(this, function(a) {
                                    a = a.attributes[b] + "";
                                    f.push({
                                        label: a,
                                        value: a
                                    })
                                }));
                            return f
                        },
                        getBaseHrefUrl: function(a) {
                            var b = "HTML3D" === window.appInfo.appType ? "webappviewer3d" : "webappviewer",
                                c = "";
                            window.isXT ? c = window.location.protocol + "//" + window.location.host + window.appInfo.appPath : (c = s.urlToObject(window.location.href).query || {}, c = c.appid ? a + "apps/" + b + "/index.html?appid\x3d" + c.appid : c.id ? a + "apps/" + b + "/index.html?id\x3d" + c.id : window.top.location.href);
                            return c
                        },
                        _addGraphicsLayer: function() {
                            !window.isBuilder &&
                                "undefined" === typeof this._graphicsLayer && (this._graphicsLayer = new F, this.map.addLayer(this._graphicsLayer))
                        },
                        _removeGraphicsLayer: function() {
                            !window.isBuilder && "undefined" !== typeof this._graphicsLayer && (this._graphicsLayer.remove(this._markerGraphic), this._markerGraphic = null)
                        },
                        _addGraphicsLayerMarker: function(a) {
                            !window.isBuilder && "undefined" !== typeof this._graphicsLayer && (this._markerGraphic = this._getMarkerGraphic(a.mapPoint), this._graphicsLayer.add(this._markerGraphic))
                        },
                        _getMarkerGraphic: function(a) {
                            var b =
                                new D(require.toUrl("jimu") + "/images/EsriBluePinCircle26.png", 26, 26);
                            b.setOffset(0, 12);
                            return new E(a, b)
                        },
                        _unselectMarkerBtn: function() {
                            for (var a = n(".markers", this.domNode), c = 0, f = a.length; c < f; c++) b.remove(a[c], "selected")
                        },
                        _selectMarkerBtn: function(a) {
                            b.add(a.srcElement || a.target, "selected")
                        },
                        _cleanMarkerStatus: function() {
                            this._mapClickHandler && this._mapClickHandler.remove && this._mapClickHandler.remove();
                            this._unselectMarkerBtn();
                            this._removeGraphicsLayer()
                        },
                        _isShareLinkOptionsShow: function() {
                            var a =
                                n(".shareLinkOptionsWrapper", this.domNode);
                            return !b.contains(a[0], "displaynone")
                        },
                        _getUrlQueryString: function(a) {
                            var b = ""; - 1 !== a.indexOf("?") && (b = a.substring(a.indexOf("?")));
                            return b
                        },
                        _getOnlinePublicUrl: function() {
                            var a = "www.arcgis.com",
                                b = this._portalUrl;
                            b && "string" === typeof b && (-1 < b.indexOf("devext.arcgis.com") ? a = "devext.arcgis.com" : -1 < b.indexOf("qaext.arcgis.com") && (a = "qaext.arcgis.com"));
                            return a
                        },
                        _addQueryParamToUrl: function(a, b, c, f) {
                            a = m.urlToObject(a);
                            a.query || (a.query = {});
                            a.query[b] = c;
                            b = a.path;
                            for (var d in a.query) c = a.query[d], !0 === f && (c = encodeURIComponent(c)), b = b === a.path ? b + "?" + d + "\x3d" + c : b + "\x26" + d + "\x3d" + c;
                            return b
                        },
                        _removeQueryParamFromUrl: function(a, b, c) {
                            a = m.urlToObject(a);
                            a.query && delete a.query[b];
                            b = a.path;
                            for (var f in a.query) {
                                var d = a.query[f];
                                !0 === c && (d = encodeURIComponent(d));
                                b = b === a.path ? b + "?" + f + "\x3d" + d : b + "\x26" + f + "\x3d" + d
                            }
                            return b
                        }
                    })
                })
        },
        "jimu/dijit/FeaturelayerChooserFromMap": function() {
            define(["dojo/_base/declare", "dojo/Deferred", "dojo/_base/html", "dojo/_base/lang", "./LayerChooserFromMap"],
                function(e, k, l, h, d) {
                    return e([d], {
                        baseClass: "jimu-featurelayer-chooser-from-map",
                        declaredClass: "jimu.dijit.FeaturelayerChooserFromMap",
                        types: null,
                        showLayerFromFeatureSet: !1,
                        showTable: !1,
                        onlyShowVisible: !1,
                        ignoredFeaturelayerIds: null,
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this.ignoredFeaturelayerIds || (this.ignoredFeaturelayerIds = []);
                            this.basicFilter = h.hitch(this, this.basicFilter);
                            this.filter = d.createFeaturelayerFilter(this.types, this.showLayerFromFeatureSet, this.showTable)
                        },
                        postCreate: function() {
                            this.inherited(arguments);
                            l.addClass(this.domNode, "jimu-basic-layer-chooser-from-map")
                        },
                        basicFilter: function(a) {
                            var b = new k;
                            0 <= this.ignoredFeaturelayerIds.indexOf(a.id) ? b.resolve(!1) : this.onlyShowVisible && "Table" !== a.getLayerType() ? b.resolve(a.isShowInMap()) : b.resolve(!0);
                            return b
                        },
                        getHandledItem: function(a) {
                            var b = this.inherited(arguments),
                                c = a && a.layerInfo,
                                c = c && c.layerObject;
                            b.url = c && c.url || "";
                            return b
                        }
                    })
                })
        },
        "jimu/dijit/LayerChooserFromMap": function() {
            define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/Evented dojo/on dojo/store/Memory dojo/Deferred dojo/store/Observable dijit/tree/ObjectStoreModel dojo/promise/all dojo/_base/lang dojo/_base/html dojo/_base/array jimu/utils jimu/dijit/_Tree jimu/LayerInfos/LayerInfos jimu/dijit/LoadingIndicator".split(" "),
                function(e, k, l, h, d, a, b, c, g, n, s, f, p, m, v, r, t, w) {
                    var q = e([k, l, h, d], {
                        templateString: '\x3cdiv style\x3d"width:100%;"\x3e\x3cdiv data-dojo-attach-point\x3d"errorTipSection" class\x3d"error-tip-section"\x3e\x3cspan class\x3d"jimu-icon jimu-icon-error"\x3e\x3c/span\x3e\x3cspan class\x3d"jimu-state-error-text" data-dojo-attach-point\x3d"errTip"\x3e${nls.noLayersTip}\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e',
                        _store: null,
                        _id: 0,
                        _treeClass: "layer-chooser-tree",
                        createMapResponse: null,
                        multiple: !1,
                        onlyShowVisible: !1,
                        updateWhenLayerInfosIsShowInMapChanged: !1,
                        postMixInProperties: function() {
                            this.nls = window.jimuNls.basicLayerChooserFromMap
                        },
                        postCreate: function() {
                            this.inherited(arguments);
                            p.addClass(this.domNode, "jimu-basic-layer-chooser-from-map");
                            this.multiple = !!this.multiple;
                            this.shelter = new w({
                                hidden: !0
                            });
                            this.shelter.placeAt(this.domNode);
                            this.shelter.startup();
                            this._createTree();
                            this.basicFilter = f.hitch(this, this.basicFilter);
                            this.filter = q.andCombineFilters([this.basicFilter, this.filter]);
                            this.createMapResponse &&
                                this.setCreateMapResponse(this.createMapResponse)
                        },
                        basicFilter: function(a) {
                            var b = new c;
                            this.onlyShowVisible ? b.resolve(a.isShowInMap()) : b.resolve(!0);
                            return b
                        },
                        filter: function(a) {
                            a = new c;
                            a.resolve(!0);
                            return a
                        },
                        getSelectedItems: function() {
                            var a = this.tree.getSelectedItems();
                            return m.map(a, f.hitch(this, function(a) {
                                return this.getHandledItem(a)
                            }))
                        },
                        getAllItems: function() {
                            var a = this.tree.getAllItems(),
                                b = [];
                            m.forEach(a, f.hitch(this, function(a) {
                                "root" !== a.id && (a = this.getHandledItem(a), b.push(a))
                            }));
                            return b
                        },
                        getHandledItem: function(a) {
                            return {
                                name: a.name,
                                layerInfo: a.layerInfo
                            }
                        },
                        _isLeafItem: function(a) {
                            return a.isLeaf
                        },
                        setCreateMapResponse: function(b) {
                            this.createMapResponse = b;
                            t.getInstance(this.createMapResponse.map, this.createMapResponse.itemInfo).then(f.hitch(this, function(b) {
                                this.layerInfosObj = b;
                                this.own(a(this.layerInfosObj, "layerInfosChanged", f.hitch(this, this._onLayerInfosChanged)));
                                this.updateWhenLayerInfosIsShowInMapChanged && this.own(a(this.layerInfosObj, "layerInfosIsShowInMapChanged", f.hitch(this,
                                    this._onLayerInfosIsShowInMapChanged)));
                                this._buildTree(this.layerInfosObj)
                            }))
                        },
                        _onLayerInfosChanged: function(a, b) {
                            this._buildTree(this.layerInfosObj);
                            this.emit("update")
                        },
                        _onLayerInfosIsShowInMapChanged: function(a) {
                            this._buildTree(this.layerInfosObj);
                            this.emit("update")
                        },
                        _buildTree: function(a) {
                            this._clear();
                            p.setStyle(this.errorTipSection, "display", "block");
                            var b = a.getLayerInfoArray(),
                                b = b.concat(a.getTableInfoArray());
                            0 !== b.length && (p.setStyle(this.errorTipSection, "display", "none"), m.forEach(b, f.hitch(this,
                                function(a) {
                                    this._addDirectLayerInfo(a)
                                })))
                        },
                        _addDirectLayerInfo: function(a) {
                            a && a.getLayerObject().then(f.hitch(this, function() {
                                this._addItem("root", a)
                            }), f.hitch(this, function(a) {
                                console.error(a)
                            }))
                        },
                        _clear: function() {
                            var a = this._store.query({
                                parent: "root"
                            });
                            m.forEach(a, f.hitch(this, function(a) {
                                a && "root" !== a.id && this._store.remove(a.id)
                            }))
                        },
                        _addItem: function(a, b) {
                            var c = null,
                                d = b.getLayerType(),
                                g = this.filter(b);
                            s({
                                layerType: d,
                                valid: g
                            }).then(f.hitch(this, function(d) {
                                if (d.valid) {
                                    var g = f.hitch(this, function(f,
                                            g) {
                                            this._id++;
                                            c = {
                                                name: b.title || "",
                                                parent: a,
                                                layerInfo: b,
                                                type: d.layerType,
                                                layerClass: b.layerObject.declaredClass,
                                                id: this._id.toString(),
                                                isLeaf: f,
                                                hasChildren: g
                                            };
                                            this._store.add(c)
                                        }),
                                        e = b.getSubLayers(),
                                        p = 0 === e.length;
                                    p ? g(p, !1) : (e = m.map(e, f.hitch(this, function(a) {
                                        return this.filter(a)
                                    })), s(e).then(f.hitch(this, function(a) {
                                        (a = m.some(a, function(a) {
                                            return a
                                        })) && g(p, a)
                                    })))
                                }
                            }))
                        },
                        _getRootItem: function() {
                            return {
                                id: "root",
                                name: "Map Root",
                                type: "root",
                                isLeaf: !1,
                                hasChildren: !0
                            }
                        },
                        _createTree: function() {
                            var a = this._getRootItem(),
                                a = new b({
                                    data: [a],
                                    getChildren: function(a) {
                                        return this.query({
                                            parent: a.id
                                        })
                                    }
                                });
                            this._store = new g(a);
                            a = new n({
                                store: this._store,
                                query: {
                                    id: "root"
                                },
                                mayHaveChildren: f.hitch(this, this._mayHaveChildren)
                            });
                            this.tree = new r({
                                multiple: this.multiple,
                                model: a,
                                showRoot: !1,
                                isLeafItem: f.hitch(this, this._isLeafItem),
                                style: {
                                    width: "100%"
                                },
                                onOpen: f.hitch(this, function(a, b) {
                                    "root" !== a.id && this._onTreeOpen(a, b)
                                }),
                                onClick: f.hitch(this, function(a, b, c) {
                                    this._onTreeClick(a, b, c);
                                    this.emit("tree-click", a, b, c)
                                }),
                                getIconStyle: f.hitch(this,
                                    function(a, b) {
                                        var c = null;
                                        if (!a || "root" === a.id) return null;
                                        var f = {
                                                width: "20px",
                                                height: "20px",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center center",
                                                backgroundImage: ""
                                            },
                                            d = window.location.protocol + "//" + window.location.host + require.toUrl("jimu"),
                                            g = this._getIconImageName(a, b);
                                        g && (f.backgroundImage = "url(" + d + "/css/images/" + g + ")", c = f);
                                        return c
                                    })
                            });
                            p.addClass(this.tree.domNode, this._treeClass);
                            this.tree.placeAt(this.shelter.domNode, "before")
                        },
                        _mayHaveChildren: function(a) {
                            return a.hasChildren
                        },
                        _getIconImageName: function(a,
                            b) {
                            var c = "";
                            if ("ArcGISDynamicMapServiceLayer" === a.type || "ArcGISTiledMapServiceLayer" === a.type) c = b ? "mapserver_open.png" : "mapserver_close.png";
                            else if ("GroupLayer" === a.type) c = b ? "group_layer2.png" : "group_layer1.png";
                            else if ("FeatureLayer" === a.type) {
                                var f = v.getTypeByGeometryType(a.layerInfo.layerObject.geometryType);
                                "point" === f ? c = "point_layer1.png" : "polyline" === f ? c = "line_layer1.png" : "polygon" === f && (c = "polygon_layer1.png")
                            } else c = "Table" === a.type ? "table.png" : "ArcGISImageServiceLayer" === a.type || "ArcGISImageServiceVectorLayer" ===
                                a.type ? "image_layer.png" : b ? "mapserver_open.png" : "mapserver_close.png";
                            return c
                        },
                        _onTreeOpen: function(a, b) {
                            if ("root" !== a.id) {
                                var c = [],
                                    d = [],
                                    c = a.layerInfo.getSubLayers();
                                a.checked || (this.shelter.show(), d = m.map(c, f.hitch(this, function(a) {
                                    return a.getLayerObject()
                                })), s(d).then(f.hitch(this, function() {
                                    this.domNode && (m.forEach(c, f.hitch(this, function(b) {
                                        this._addItem(a.id, b)
                                    })), a.checked = !0, this.shelter.hide())
                                }), f.hitch(this, function(a) {
                                    console.error(a);
                                    this.shelter.hide()
                                })))
                            }
                        },
                        _onTreeClick: function(a,
                            b, c) {},
                        destroy: function() {
                            this.shelter && this.shelter.destroy();
                            this.tree && this.tree.destroy();
                            this.shelter = null;
                            this.tree.destroy();
                            this.inherited(arguments)
                        }
                    });
                    q.createFilterByLayerType = function(a) {
                        f.isArrayLike(a) || (a = []);
                        return function(b) {
                            var f = new c;
                            if (0 === a.length) f.resolve(!0);
                            else {
                                var d = [];
                                b.traversal(function(a) {
                                    d.push(a.getLayerType())
                                });
                                s(d).then(function(b) {
                                    for (var c = 0; c < b.length; c++)
                                        for (var d = 0; d < a.length; d++)
                                            if (b[c] === a[d]) {
                                                f.resolve(!0);
                                                return
                                            }
                                    f.resolve(!1)
                                }, function(a) {
                                    console.error(a);
                                    f.reject(a)
                                })
                            }
                            return f
                        }
                    };
                    q.createFeaturelayerFilter = function(a, b, f) {
                        var d = ["point", "polyline", "polygon"];
                        a && 0 < a.length ? (a = m.filter(a, function(a) {
                            return 0 <= d.indexOf(a)
                        }), 0 === a.length && (a = d)) : a = d;
                        return function(d) {
                            var g = new c,
                                e = d.getLayerType();
                            d = d.getLayerObject();
                            s({
                                layerType: e,
                                layerObject: d
                            }).then(function(c) {
                                var d = c.layerType;
                                c = c.layerObject;
                                "ArcGISDynamicMapServiceLayer" === d ? g.resolve(!0) : "ArcGISTiledMapServiceLayer" === d ? g.resolve(!0) : "GroupLayer" === d ? g.resolve(!0) : "FeatureCollection" === d ? g.resolve(!0) :
                                    "FeatureLayer" === d ? (d = v.getTypeByGeometryType(c.geometryType), d = 0 <= m.indexOf(a, d), c.url ? (c = v.isFeaturelayerUrlSupportQuery(c.url, c.capabilities), g.resolve(d && c)) : g.resolve(b && d)) : "Table" === d ? (c = v.isFeaturelayerUrlSupportQuery(c.url, c.capabilities), g.resolve(f && c)) : g.resolve(!1)
                            }, function(a) {
                                console.log(a);
                                g.reject(a)
                            });
                            return g
                        }
                    };
                    q.createImageServiceLayerFilter = function(a) {
                        return function(b) {
                            var f = new c,
                                d = b.getLayerType();
                            b = b.getLayerObject();
                            s({
                                layerType: d,
                                layerObject: b
                            }).then(function(b) {
                                var c =
                                    b.layerType;
                                "ArcGISImageServiceLayer" === c || "ArcGISImageServiceVectorLayer" === c ? a ? v.isImageServiceSupportQuery(b.layerObject.capabilities) ? f.resolve(!0) : f.resolve(!1) : f.resolve(!0) : f.resolve(!1)
                            }, function(a) {
                                console.log(a);
                                f.reject(a)
                            });
                            return f
                        }
                    };
                    q.createQueryableLayerFilter = function() {
                        var a = q.createFeaturelayerFilter(["point", "polyline", "polygon"], !1, !0),
                            b = q.createImageServiceLayerFilter(!0);
                        return q.orCombineFilters([a, b])
                    };
                    q.andCombineFilters = function(a) {
                        return q._combineFilters(a, !0)
                    };
                    q.orCombineFilters =
                        function(a) {
                            return q._combineFilters(a, !1)
                        };
                    q._combineFilters = function(a, b) {
                        return function(f) {
                            var d = new c,
                                g = m.map(a, function(a) {
                                    return a(f)
                                });
                            s(g).then(function(a) {
                                var c = !1,
                                    c = b ? m.every(a, function(a) {
                                        return a
                                    }) : m.some(a, function(a) {
                                        return a
                                    });
                                d.resolve(c)
                            }, function(a) {
                                console.error(a);
                                d.reject(a)
                            });
                            return d
                        }
                    };
                    return q
                })
        },
        "dojo/store/Observable": function() {
            define(["../_base/kernel", "../_base/lang", "../when", "../_base/array"], function(e, k, l, h) {
                e = function(d) {
                    function a(a, b) {
                        var c = d[a];
                        c && (d[a] = function(g) {
                            var h;
                            "put" === a && (h = d.getIdentity(g));
                            if (e) return c.apply(this, arguments);
                            e = !0;
                            try {
                                var k = c.apply(this, arguments);
                                l(k, function(a) {
                                    b("object" == typeof a && a || g, h)
                                });
                                return k
                            } finally {
                                e = !1
                            }
                        })
                    }
                    var b = [],
                        c = 0;
                    d = k.delegate(d);
                    d.notify = function(a, f) {
                        c++;
                        for (var d = b.slice(), g = 0, e = d.length; g < e; g++) d[g](a, f)
                    };
                    var g = d.query;
                    d.query = function(a, f) {
                        f = f || {};
                        var e = g.apply(this, arguments);
                        if (e && e.forEach) {
                            var m = k.mixin({}, f);
                            delete m.start;
                            delete m.count;
                            var n = d.queryEngine && d.queryEngine(a, m),
                                r = c,
                                t = [],
                                w;
                            e.observe = function(a,
                                g) {
                                1 == t.push(a) && b.push(w = function(a, b) {
                                    l(e, function(e) {
                                        var m = e.length != f.count,
                                            p, k;
                                        if (++r != c) throw Error("Query is out of date, you must observe() the query prior to any data modifications");
                                        var s, l = -1,
                                            q = -1;
                                        if (void 0 !== b) {
                                            var w = [].concat(e);
                                            n && !a && (w = n(e));
                                            p = 0;
                                            for (k = e.length; p < k; p++) {
                                                var B = e[p];
                                                if (d.getIdentity(B) == b && !(0 > w.indexOf(B))) {
                                                    s = B;
                                                    l = p;
                                                    (n || !a) && e.splice(p, 1);
                                                    break
                                                }
                                            }
                                        }
                                        if (n) {
                                            if (a && (n.matches ? n.matches(a) : n([a]).length)) p = -1 < l ? l : e.length, e.splice(p, 0, a), q = h.indexOf(n(e), a), e.splice(p, 1), f.start &&
                                                0 == q || !m && q == e.length ? q = -1 : e.splice(q, 0, a)
                                        } else a && (void 0 !== b ? q = l : f.start || (q = d.defaultIndex || 0, e.splice(q, 0, a)));
                                        if ((-1 < l || -1 < q) && (g || !n || l != q)) {
                                            m = t.slice();
                                            for (p = 0; e = m[p]; p++) e(a || s, l, q)
                                        }
                                    })
                                });
                                var m = {};
                                m.remove = m.cancel = function() {
                                    var c = h.indexOf(t, a); - 1 < c && (t.splice(c, 1), t.length || b.splice(h.indexOf(b, w), 1))
                                };
                                return m
                            }
                        }
                        return e
                    };
                    var e;
                    a("put", function(a, b) {
                        d.notify(a, b)
                    });
                    a("add", function(a) {
                        d.notify(a)
                    });
                    a("remove", function(a) {
                        d.notify(void 0, a)
                    });
                    return d
                };
                k.setObject("dojo.store.Observable",
                    e);
                return e
            })
        },
        "dijit/tree/ObjectStoreModel": function() {
            define("dojo/_base/array dojo/aspect dojo/_base/declare dojo/Deferred dojo/_base/lang dojo/when ../Destroyable".split(" "), function(e, k, l, h, d, a, b) {
                return l("dijit.tree.ObjectStoreModel", b, {
                    store: null,
                    labelAttr: "name",
                    labelType: "text",
                    root: null,
                    query: null,
                    constructor: function(a) {
                        d.mixin(this, a);
                        this.childrenCache = {}
                    },
                    getRoot: function(b, g) {
                        if (this.root) b(this.root);
                        else {
                            var e = this.store.query(this.query);
                            e.then && this.own(e);
                            a(e, d.hitch(this, function(a) {
                                if (1 !=
                                    a.length) throw Error("dijit.tree.ObjectStoreModel: root query returned " + a.length + " items, but must return exactly one");
                                this.root = a[0];
                                b(this.root);
                                e.observe && e.observe(d.hitch(this, function(a) {
                                    this.onChange(a)
                                }), !0)
                            }), g)
                        }
                    },
                    mayHaveChildren: function() {
                        return !0
                    },
                    getChildren: function(b, g, e) {
                        var h = this.store.getIdentity(b);
                        if (this.childrenCache[h]) a(this.childrenCache[h], g, e);
                        else {
                            var f = this.childrenCache[h] = this.store.getChildren(b);
                            f.then && this.own(f);
                            f.observe && this.own(f.observe(d.hitch(this, function(g,
                                e, n) {
                                this.onChange(g);
                                e != n && a(f, d.hitch(this, "onChildrenChange", b))
                            }), !0));
                            a(f, g, e)
                        }
                    },
                    isItem: function() {
                        return !0
                    },
                    getIdentity: function(a) {
                        return this.store.getIdentity(a)
                    },
                    getLabel: function(a) {
                        return a[this.labelAttr]
                    },
                    newItem: function(a, b, d, e) {
                        return this.store.put(a, {
                            parent: b,
                            before: e
                        })
                    },
                    pasteItem: function(a, b, n, k, f, p) {
                        var m = new h;
                        if (b === n && !k && !p) return m.resolve(!0), m;
                        b && !k ? this.getChildren(b, d.hitch(this, function(d) {
                            d = [].concat(d);
                            var f = e.indexOf(d, a);
                            d.splice(f, 1);
                            this.onChildrenChange(b, d);
                            m.resolve(this.store.put(a, {
                                overwrite: !0,
                                parent: n,
                                oldParent: b,
                                before: p
                            }))
                        })) : m.resolve(this.store.put(a, {
                            overwrite: !0,
                            parent: n,
                            oldParent: b,
                            before: p
                        }));
                        return m
                    },
                    onChange: function() {},
                    onChildrenChange: function() {},
                    onDelete: function() {}
                })
            })
        },
        "jimu/dijit/_Tree": function() {
            define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dojo/text!./templates/_TreeNode.html dojo/_base/lang dojo/_base/html dojo/_base/array dojo/_base/event dojo/query dojo/aspect dojo/on dojo/Evented dijit/registry dijit/Tree jimu/utils".split(" "),
                function(e, k, l, h, d, a, b, c, g, n, s, f, p, m, v) {
                    var r = e([m._TreeNode, f], {
                        templateString: h,
                        declaredClass: "jimu._TreeNode",
                        isLeaf: !1,
                        groupId: "",
                        postCreate: function() {
                            this.inherited(arguments);
                            a.addClass(this.domNode, "jimu-tree-node");
                            this.isLeaf = !!this.isLeaf;
                            this.groupId ? (this.checkNode = a.toDom('\x3cinput type\x3d"radio" /\x3e'), this.checkNode.name = this.groupId) : this.checkNode = a.toDom('\x3cinput type\x3d"checkbox" /\x3e');
                            a.addClass(this.checkNode, "jimu-tree-check-node");
                            a.place(this.checkNode, this.contentNode,
                                "first");
                            this.own(s(this.checkNode, "click", d.hitch(this, this._onClick)));
                            this.isLeaf ? this.groupId ? a.setStyle(this.checkNode, "display", "none") : a.setStyle(this.checkNode, "display", "inline") : a.setStyle(this.checkNode, "display", "none");
                            this.isLeaf ? a.addClass(this.domNode, "jimu-tree-leaf-node") : a.addClass(this.domNode, "jimu-tree-not-leaf-node")
                        },
                        select: function() {
                            this.isLeaf && (this.checkNode.checked = !0, a.addClass(this.domNode, "jimu-tree-selected-leaf-node"))
                        },
                        unselect: function() {
                            this.isLeaf && (this.checkNode.checked = !1, a.removeClass(this.domNode, "jimu-tree-selected-leaf-node"))
                        },
                        toggleSelect: function() {
                            this.isLeaf && (this.checkNode.checked ? this.unselect() : this.select())
                        },
                        _onClick: function(a) {
                            (a.target || a.srcElement) === this.checkNode ? this.tree._onCheckNodeClick(this, this.checkNode.checked, a) : this.tree._onClick(this, a)
                        },
                        _onChange: function() {
                            this.isLeaf && setTimeout(d.hitch(this, function() {
                                this.checkNode.checked ? this.emit("tn-select", this) : this.emit("tn-unselect", this)
                            }), 100)
                        },
                        destroy: function() {
                            delete this.tree;
                            this.inherited(arguments)
                        }
                    });
                    return e([m, f], {
                        declaredClass: "jimu._Tree",
                        openOnClick: !0,
                        multiple: !0,
                        uniqueId: "",
                        showRoot: !1,
                        postMixInProperties: function() {
                            this.inherited(arguments);
                            this.uniqueId = "tree_" + v.getRandomString()
                        },
                        postCreate: function() {
                            this.inherited(arguments);
                            a.addClass(this.domNode, "jimu-tree");
                            this.own(n.before(this, "onClick", d.hitch(this, this._jimuBeforeClick)));
                            this.rootLoadingIndicator && a.setStyle(this.rootLoadingIndicator, "display", "none");
                            this.dndController.singular = !0
                        },
                        removeItem: function(a) {
                            this.model.store.remove(a)
                        },
                        getAllItems: function() {
                            var a = this.getAllTreeNodeWidgets();
                            return b.map(a, d.hitch(this, function(a) {
                                var b = a.item;
                                b.selected = a.checkNode.checked;
                                return b
                            }))
                        },
                        getSelectedItems: function() {
                            var a = this.getAllTreeNodeWidgets(),
                                a = b.filter(a, d.hitch(this, function(a) {
                                    return a.checkNode.checked
                                }));
                            return b.map(a, d.hitch(this, function(a) {
                                return a.item
                            }))
                        },
                        getFilteredItems: function(a) {
                            var c = this.getAllTreeNodeWidgets(),
                                c = b.map(c, d.hitch(this, function(a) {
                                    var b = a.item;
                                    b.selected = a.checkNode.checked;
                                    return b
                                }));
                            return b.filter(c,
                                d.hitch(this, function(b) {
                                    return a(b)
                                }))
                        },
                        getTreeNodeByItemId: function(a) {
                            for (var b = this._getAllTreeNodeDoms(), c = 0; c < b.length; c++) {
                                var d = p.byNode(b[c]);
                                if (d.item.id.toString() === a.toString()) return d
                            }
                            return null
                        },
                        selectItem: function(a) {
                            (a = this.getTreeNodeByItemId(a)) && a.isLeaf && this.selectNodeWidget(a)
                        },
                        unselectItem: function(a) {
                            (a = this.getTreeNodeByItemId(a)) && a.isLeaf && a.unselect()
                        },
                        getAllLeafTreeNodeWidgets: function() {
                            var a = this.getAllTreeNodeWidgets();
                            return b.filter(a, d.hitch(this, function(a) {
                                return a.isLeaf
                            }))
                        },
                        getAllTreeNodeWidgets: function() {
                            var a = this._getAllTreeNodeDoms();
                            return b.map(a, d.hitch(this, function(a) {
                                return p.byNode(a)
                            }))
                        },
                        isLeafItem: function(a) {
                            return a && a.isLeaf
                        },
                        _getAllTreeNodeDoms: function() {
                            return g(".dijitTreeNode", this.domNode)
                        },
                        _createTreeNode: function(a) {
                            a.isLeaf = this.isLeafItem(a.item);
                            this.multiple || (a.groupId = this.uniqueId);
                            return new r(a)
                        },
                        _onTreeNodeSelect: function(a) {
                            this.emit("item-select", {
                                item: a.item,
                                treeNode: a
                            })
                        },
                        _onTreeNodeUnselect: function(a) {
                            this.emit("item-unselect", {
                                item: a.item,
                                treeNode: a
                            })
                        },
                        selectNodeWidget: function(a) {
                            this.multiple || this.unselectAllLeafNodeWidgets();
                            a.select()
                        },
                        _jimuBeforeClick: function(b, c, d) {
                            c.isLeaf && (a.hasClass(d.target || d.srcElement, "jimu-tree-check-node") || (this.multiple ? c.toggleSelect() : this.selectNodeWidget(c)));
                            return arguments
                        },
                        _onCheckNodeClick: function(a, b, f) {
                            !this.multiple && b && this.unselectAllLeafNodeWidgets();
                            c.stop(f);
                            this.focusNode(a);
                            setTimeout(d.hitch(this, function() {
                                b ? this.selectNodeWidget(a) : a.unselect();
                                this.onClick(a.item,
                                    a, f)
                            }), 0)
                        },
                        unselectAllLeafNodeWidgets: function() {
                            var a = this.getAllLeafTreeNodeWidgets();
                            b.forEach(a, d.hitch(this, function(a) {
                                a.unselect()
                            }))
                        }
                    })
                })
        },
        "dijit/Tree": function() {
            define("dojo/_base/array dojo/aspect dojo/cookie dojo/_base/declare dojo/Deferred dojo/promise/all dojo/dom dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/errors/create dojo/fx dojo/has dojo/_base/kernel dojo/keys dojo/_base/lang dojo/on dojo/topic dojo/touch dojo/when ./a11yclick ./focus ./registry ./_base/manager ./_Widget ./_TemplatedMixin ./_Container ./_Contained ./_CssStateMixin ./_KeyNavMixin dojo/text!./templates/TreeNode.html dojo/text!./templates/Tree.html ./tree/TreeStoreModel ./tree/ForestStoreModel ./tree/_dndSelector dojo/query!css2".split(" "),
                function(e, k, l, h, d, a, b, c, g, n, s, f, p, m, v, r, t, w, q, H, C, I, y, D, E, F, G, J, z, L, M, B, P, N, O) {
                    function x(a) {
                        return r.delegate(a.promise || a, {
                            addCallback: function(a) {
                                this.then(a)
                            },
                            addErrback: function(a) {
                                this.otherwise(a)
                            }
                        })
                    }
                    var K = h("dijit._TreeNode", [E, F, G, J, z], {
                        item: null,
                        isTreeNode: !0,
                        label: "",
                        _setLabelAttr: function(a) {
                            this.labelNode["html" == this.labelType ? "innerHTML" : "innerText" in this.labelNode ? "innerText" : "textContent"] = a;
                            this._set("label", a);
                            p("dojo-bidi") && this.applyTextDir(this.labelNode)
                        },
                        labelType: "text",
                        isExpandable: null,
                        isExpanded: !1,
                        state: "NotLoaded",
                        templateString: M,
                        baseClass: "dijitTreeNode",
                        cssStateNodes: {
                            rowNode: "dijitTreeRow"
                        },
                        _setTooltipAttr: {
                            node: "rowNode",
                            type: "attribute",
                            attribute: "title"
                        },
                        buildRendering: function() {
                            this.inherited(arguments);
                            this._setExpando();
                            this._updateItemClasses(this.item);
                            this.isExpandable && this.labelNode.setAttribute("aria-expanded", this.isExpanded);
                            this.setSelected(!1)
                        },
                        _setIndentAttr: function(a) {
                            var b = Math.max(a, 0) * this.tree._nodePixelIndent + "px";
                            n.set(this.domNode,
                                "backgroundPosition", b + " 0px");
                            n.set(this.rowNode, this.isLeftToRight() ? "paddingLeft" : "paddingRight", b);
                            e.forEach(this.getChildren(), function(b) {
                                b.set("indent", a + 1)
                            });
                            this._set("indent", a)
                        },
                        markProcessing: function() {
                            this.state = "Loading";
                            this._setExpando(!0)
                        },
                        unmarkProcessing: function() {
                            this._setExpando(!1)
                        },
                        _updateItemClasses: function(a) {
                            var b = this.tree,
                                c = b.model;
                            b._v10Compat && a === c.root && (a = null);
                            this._applyClassAndStyle(a, "icon", "Icon");
                            this._applyClassAndStyle(a, "label", "Label");
                            this._applyClassAndStyle(a,
                                "row", "Row");
                            this.tree._startPaint(!0)
                        },
                        _applyClassAndStyle: function(a, b, d) {
                            var f = "_" + b + "Class";
                            b += "Node";
                            var g = this[f];
                            this[f] = this.tree["get" + d + "Class"](a, this.isExpanded);
                            c.replace(this[b], this[f] || "", g || "");
                            n.set(this[b], this.tree["get" + d + "Style"](a, this.isExpanded) || {})
                        },
                        _updateLayout: function() {
                            var a = this.getParent(),
                                a = !a || !a.rowNode || "none" == a.rowNode.style.display;
                            c.toggle(this.domNode, "dijitTreeIsRoot", a);
                            c.toggle(this.domNode, "dijitTreeIsLast", !a && !this.getNextSibling())
                        },
                        _setExpando: function(a) {
                            var b = ["dijitTreeExpandoLoading", "dijitTreeExpandoOpened", "dijitTreeExpandoClosed", "dijitTreeExpandoLeaf"];
                            a = a ? 0 : this.isExpandable ? this.isExpanded ? 1 : 2 : 3;
                            c.replace(this.expandoNode, b[a], b);
                            this.expandoNodeText.innerHTML = ["*", "-", "+", "*"][a]
                        },
                        expand: function() {
                            if (this._expandDeferred) return x(this._expandDeferred);
                            this._collapseDeferred && (this._collapseDeferred.cancel(), delete this._collapseDeferred);
                            this.isExpanded = !0;
                            this.labelNode.setAttribute("aria-expanded", "true");
                            (this.tree.showRoot || this !== this.tree.rootNode) &&
                            this.containerNode.setAttribute("role", "group");
                            c.add(this.contentNode, "dijitTreeContentExpanded");
                            this._setExpando();
                            this._updateItemClasses(this.item);
                            this == this.tree.rootNode && this.tree.showRoot && this.tree.domNode.setAttribute("aria-expanded", "true");
                            var a = f.wipeIn({
                                    node: this.containerNode,
                                    duration: D.defaultDuration
                                }),
                                b = this._expandDeferred = new d(function() {
                                    a.stop()
                                });
                            k.after(a, "onEnd", function() {
                                b.resolve(!0)
                            }, !0);
                            a.play();
                            return x(b)
                        },
                        collapse: function() {
                            if (this._collapseDeferred) return x(this._collapseDeferred);
                            this._expandDeferred && (this._expandDeferred.cancel(), delete this._expandDeferred);
                            this.isExpanded = !1;
                            this.labelNode.setAttribute("aria-expanded", "false");
                            this == this.tree.rootNode && this.tree.showRoot && this.tree.domNode.setAttribute("aria-expanded", "false");
                            c.remove(this.contentNode, "dijitTreeContentExpanded");
                            this._setExpando();
                            this._updateItemClasses(this.item);
                            var a = f.wipeOut({
                                    node: this.containerNode,
                                    duration: D.defaultDuration
                                }),
                                b = this._collapseDeferred = new d(function() {
                                    a.stop()
                                });
                            k.after(a, "onEnd",
                                function() {
                                    b.resolve(!0)
                                }, !0);
                            a.play();
                            return x(b)
                        },
                        indent: 0,
                        setChildItems: function(c) {
                            var d = this.tree,
                                f = d.model,
                                g = [],
                                m = d.focusedChild,
                                p = this.getChildren();
                            e.forEach(p, function(a) {
                                G.prototype.removeChild.call(this, a)
                            }, this);
                            this.defer(function() {
                                e.forEach(p, function(a) {
                                    if (!a._destroyed && !a.getParent()) {
                                        d.dndController.removeTreeNode(a);
                                        var c = function(a) {
                                            var b = f.getIdentity(a.item),
                                                u = d._itemNodesMap[b];
                                            1 == u.length ? delete d._itemNodesMap[b] : (b = e.indexOf(u, a), -1 != b && u.splice(b, 1));
                                            e.forEach(a.getChildren(),
                                                c)
                                        };
                                        c(a);
                                        if (d.persist) {
                                            var u = e.map(a.getTreePath(), function(a) {
                                                    return d.model.getIdentity(a)
                                                }).join("/"),
                                                g;
                                            for (g in d._openedNodes) g.substr(0, u.length) == u && delete d._openedNodes[g];
                                            d._saveExpandedNodes()
                                        }
                                        d.lastFocusedChild && !b.isDescendant(d.lastFocusedChild, d.domNode) && delete d.lastFocusedChild;
                                        m && !b.isDescendant(m, d.domNode) && d.focus();
                                        a.destroyRecursive()
                                    }
                                })
                            });
                            this.state = "Loaded";
                            c && 0 < c.length ? (this.isExpandable = !0, e.forEach(c, function(a) {
                                var b = f.getIdentity(a),
                                    c = d._itemNodesMap[b],
                                    u;
                                if (c)
                                    for (var e =
                                            0; e < c.length; e++)
                                        if (c[e] && !c[e].getParent()) {
                                            u = c[e];
                                            u.set("indent", this.indent + 1);
                                            break
                                        }
                                u || (u = this.tree._createTreeNode({
                                    item: a,
                                    tree: d,
                                    isExpandable: f.mayHaveChildren(a),
                                    label: d.getLabel(a),
                                    labelType: d.model && d.model.labelType || "text",
                                    tooltip: d.getTooltip(a),
                                    ownerDocument: d.ownerDocument,
                                    dir: d.dir,
                                    lang: d.lang,
                                    textDir: d.textDir,
                                    indent: this.indent + 1
                                }), c ? c.push(u) : d._itemNodesMap[b] = [u]);
                                this.addChild(u);
                                (this.tree.autoExpand || this.tree._state(u)) && g.push(d._expandNode(u))
                            }, this), e.forEach(this.getChildren(),
                                function(a) {
                                    a._updateLayout()
                                })) : this.isExpandable = !1;
                            this._setExpando && this._setExpando(!1);
                            this._updateItemClasses(this.item);
                            c = a(g);
                            this.tree._startPaint(c);
                            return x(c)
                        },
                        getTreePath: function() {
                            for (var a = this, b = []; a && a !== this.tree.rootNode;) b.unshift(a.item), a = a.getParent();
                            b.unshift(this.tree.rootNode.item);
                            return b
                        },
                        getIdentity: function() {
                            return this.tree.model.getIdentity(this.item)
                        },
                        removeChild: function(a) {
                            this.inherited(arguments);
                            var b = this.getChildren();
                            0 == b.length && (this.isExpandable = !1,
                                this.collapse());
                            e.forEach(b, function(a) {
                                a._updateLayout()
                            })
                        },
                        makeExpandable: function() {
                            this.isExpandable = !0;
                            this._setExpando(!1)
                        },
                        setSelected: function(a) {
                            this.labelNode.setAttribute("aria-selected", a ? "true" : "false");
                            c.toggle(this.rowNode, "dijitTreeRowSelected", a)
                        },
                        focus: function() {
                            I.focus(this.focusNode)
                        }
                    });
                    p("dojo-bidi") && K.extend({
                        _setTextDirAttr: function(a) {
                            if (a && (this.textDir != a || !this._created)) this._set("textDir", a), this.applyTextDir(this.labelNode), e.forEach(this.getChildren(), function(b) {
                                b.set("textDir",
                                    a)
                            }, this)
                        }
                    });
                    var A = h("dijit.Tree", [E, L, F, z], {
                        baseClass: "dijitTree",
                        store: null,
                        model: null,
                        query: null,
                        label: "",
                        showRoot: !0,
                        childrenAttr: ["children"],
                        paths: [],
                        path: [],
                        selectedItems: null,
                        selectedItem: null,
                        openOnClick: !1,
                        openOnDblClick: !1,
                        templateString: B,
                        persist: !1,
                        autoExpand: !1,
                        dndController: O,
                        dndParams: "onDndDrop itemCreator onDndCancel checkAcceptance checkItemAcceptance dragThreshold betweenThreshold".split(" "),
                        onDndDrop: null,
                        itemCreator: null,
                        onDndCancel: null,
                        checkAcceptance: null,
                        checkItemAcceptance: null,
                        dragThreshold: 5,
                        betweenThreshold: 0,
                        _nodePixelIndent: 19,
                        _publish: function(a, b) {
                            w.publish(this.id, r.mixin({
                                tree: this,
                                event: a
                            }, b || {}))
                        },
                        postMixInProperties: function() {
                            this.tree = this;
                            this.autoExpand && (this.persist = !1);
                            this._itemNodesMap = {};
                            !this.cookieName && this.id && (this.cookieName = this.id + "SaveStateCookie");
                            this.expandChildrenDeferred = new d;
                            this.pendingCommandsPromise = this.expandChildrenDeferred.promise;
                            this.inherited(arguments)
                        },
                        postCreate: function() {
                            this._initState();
                            var a = this;
                            this.own(t(this.containerNode,
                                t.selector(".dijitTreeNode", q.enter),
                                function(b) {
                                    a._onNodeMouseEnter(y.byNode(this), b)
                                }), t(this.containerNode, t.selector(".dijitTreeNode", q.leave), function(b) {
                                a._onNodeMouseLeave(y.byNode(this), b)
                            }), t(this.containerNode, t.selector(".dijitTreeRow", C.press), function(b) {
                                a._onNodePress(y.getEnclosingWidget(this), b)
                            }), t(this.containerNode, t.selector(".dijitTreeRow", C), function(b) {
                                a._onClick(y.getEnclosingWidget(this), b)
                            }), t(this.containerNode, t.selector(".dijitTreeRow", "dblclick"), function(b) {
                                a._onDblClick(y.getEnclosingWidget(this),
                                    b)
                            }));
                            this.model || this._store2model();
                            this.own(k.after(this.model, "onChange", r.hitch(this, "_onItemChange"), !0), k.after(this.model, "onChildrenChange", r.hitch(this, "_onItemChildrenChange"), !0), k.after(this.model, "onDelete", r.hitch(this, "_onItemDelete"), !0));
                            this.inherited(arguments);
                            if (this.dndController) {
                                r.isString(this.dndController) && (this.dndController = r.getObject(this.dndController));
                                for (var b = {}, c = 0; c < this.dndParams.length; c++) this[this.dndParams[c]] && (b[this.dndParams[c]] = this[this.dndParams[c]]);
                                this.dndController = new this.dndController(this, b)
                            }
                            this._load();
                            this.onLoadDeferred = x(this.pendingCommandsPromise);
                            this.onLoadDeferred.then(r.hitch(this, "onLoad"))
                        },
                        _store2model: function() {
                            this._v10Compat = !0;
                            m.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
                            var a = {
                                id: this.id + "_ForestStoreModel",
                                store: this.store,
                                query: this.query,
                                childrenAttrs: this.childrenAttr
                            };
                            this.params.mayHaveChildren && (a.mayHaveChildren = r.hitch(this, "mayHaveChildren"));
                            this.params.getItemChildren &&
                                (a.getChildren = r.hitch(this, function(a, b, c) {
                                    this.getItemChildren(this._v10Compat && a === this.model.root ? null : a, b, c)
                                }));
                            this.model = new N(a);
                            this.showRoot = Boolean(this.label)
                        },
                        onLoad: function() {},
                        _load: function() {
                            this.model.getRoot(r.hitch(this, function(a) {
                                var b = this.rootNode = this.tree._createTreeNode({
                                    item: a,
                                    tree: this,
                                    isExpandable: !0,
                                    label: this.label || this.getLabel(a),
                                    labelType: this.model.labelType || "text",
                                    textDir: this.textDir,
                                    indent: this.showRoot ? 0 : -1
                                });
                                this.showRoot ? (this.domNode.setAttribute("aria-multiselectable", !this.dndController.singular), this.rootLoadingIndicator.style.display = "none") : (b.rowNode.style.display = "none", this.domNode.setAttribute("role", "presentation"), this.domNode.removeAttribute("aria-expanded"), this.domNode.removeAttribute("aria-multiselectable"), this["aria-label"] ? (b.containerNode.setAttribute("aria-label", this["aria-label"]), this.domNode.removeAttribute("aria-label")) : this["aria-labelledby"] && (b.containerNode.setAttribute("aria-labelledby", this["aria-labelledby"]), this.domNode.removeAttribute("aria-labelledby")),
                                    b.labelNode.setAttribute("role", "presentation"), b.labelNode.removeAttribute("aria-selected"), b.containerNode.setAttribute("role", "tree"), b.containerNode.setAttribute("aria-expanded", "true"), b.containerNode.setAttribute("aria-multiselectable", !this.dndController.singular));
                                this.containerNode.appendChild(b.domNode);
                                a = this.model.getIdentity(a);
                                this._itemNodesMap[a] ? this._itemNodesMap[a].push(b) : this._itemNodesMap[a] = [b];
                                b._updateLayout();
                                this._expandNode(b).then(r.hitch(this, function() {
                                    this._destroyed ||
                                        (this.rootLoadingIndicator.style.display = "none", this.expandChildrenDeferred.resolve(!0))
                                }))
                            }), r.hitch(this, function(a) {
                                console.error(this, ": error loading root: ", a)
                            }))
                        },
                        getNodesByItem: function(a) {
                            if (!a) return [];
                            a = r.isString(a) ? a : this.model.getIdentity(a);
                            return [].concat(this._itemNodesMap[a])
                        },
                        _setSelectedItemAttr: function(a) {
                            this.set("selectedItems", [a])
                        },
                        _setSelectedItemsAttr: function(a) {
                            var b = this;
                            return this.pendingCommandsPromise = this.pendingCommandsPromise.always(r.hitch(this, function() {
                                var c =
                                    e.map(a, function(a) {
                                        return !a || r.isString(a) ? a : b.model.getIdentity(a)
                                    }),
                                    d = [];
                                e.forEach(c, function(a) {
                                    d = d.concat(b._itemNodesMap[a] || [])
                                });
                                this.set("selectedNodes", d)
                            }))
                        },
                        _setPathAttr: function(a) {
                            return a.length ? x(this.set("paths", [a]).then(function(a) {
                                return a[0]
                            })) : x(this.set("paths", []).then(function(a) {
                                return a[0]
                            }))
                        },
                        _setPathsAttr: function(b) {
                            function c(a, b) {
                                var f = a.shift(),
                                    g = e.filter(b, function(a) {
                                        return a.getIdentity() == f
                                    })[0];
                                if (g) return a.length ? d._expandNode(g).then(function() {
                                    return c(a,
                                        g.getChildren())
                                }) : g;
                                throw new A.PathError("Could not expand path at " + f);
                            }
                            var d = this;
                            return x(this.pendingCommandsPromise = this.pendingCommandsPromise.always(function() {
                                return a(e.map(b, function(a) {
                                    a = e.map(a, function(a) {
                                        return a && r.isObject(a) ? d.model.getIdentity(a) : a
                                    });
                                    if (a.length) return c(a, [d.rootNode]);
                                    throw new A.PathError("Empty path");
                                }))
                            }).then(function(a) {
                                d.set("selectedNodes", a);
                                return d.paths
                            }))
                        },
                        _setSelectedNodeAttr: function(a) {
                            this.set("selectedNodes", [a])
                        },
                        _setSelectedNodesAttr: function(a) {
                            this.dndController.setSelection(a)
                        },
                        expandAll: function() {
                            function b(d) {
                                return c._expandNode(d).then(function() {
                                    var c = e.filter(d.getChildren() || [], function(a) {
                                        return a.isExpandable
                                    });
                                    return a(e.map(c, b))
                                })
                            }
                            var c = this;
                            return x(b(this.rootNode))
                        },
                        collapseAll: function() {
                            function b(d) {
                                var f = e.filter(d.getChildren() || [], function(a) {
                                        return a.isExpandable
                                    }),
                                    f = a(e.map(f, b));
                                return !d.isExpanded || d == c.rootNode && !c.showRoot ? f : f.then(function() {
                                    return c._collapseNode(d)
                                })
                            }
                            var c = this;
                            return x(b(this.rootNode))
                        },
                        mayHaveChildren: function() {},
                        getItemChildren: function() {},
                        getLabel: function(a) {
                            return this.model.getLabel(a)
                        },
                        getIconClass: function(a, b) {
                            return !a || this.model.mayHaveChildren(a) ? b ? "dijitFolderOpened" : "dijitFolderClosed" : "dijitLeaf"
                        },
                        getLabelClass: function() {},
                        getRowClass: function() {},
                        getIconStyle: function() {},
                        getLabelStyle: function() {},
                        getRowStyle: function() {},
                        getTooltip: function() {
                            return ""
                        },
                        _onDownArrow: function(a, b) {
                            var c = this._getNext(b);
                            c && c.isTreeNode && this.focusNode(c)
                        },
                        _onUpArrow: function(a, b) {
                            var c = b.getPreviousSibling();
                            if (c)
                                for (b = c; b.isExpandable &&
                                    b.isExpanded && b.hasChildren();) c = b.getChildren(), b = c[c.length - 1];
                            else if (c = b.getParent(), this.showRoot || c !== this.rootNode) b = c;
                            b && b.isTreeNode && this.focusNode(b)
                        },
                        _onRightArrow: function(a, b) {
                            b.isExpandable && !b.isExpanded ? this._expandNode(b) : b.hasChildren() && (b = b.getChildren()[0]) && b.isTreeNode && this.focusNode(b)
                        },
                        _onLeftArrow: function(a, b) {
                            if (b.isExpandable && b.isExpanded) this._collapseNode(b);
                            else {
                                var c = b.getParent();
                                c && (c.isTreeNode && (this.showRoot || c !== this.rootNode)) && this.focusNode(c)
                            }
                        },
                        focusLastChild: function() {
                            var a =
                                this._getLast();
                            a && a.isTreeNode && this.focusNode(a)
                        },
                        _getFirst: function() {
                            return this.showRoot ? this.rootNode : this.rootNode.getChildren()[0]
                        },
                        _getLast: function() {
                            for (var a = this.rootNode; a.isExpanded;) {
                                var b = a.getChildren();
                                if (!b.length) break;
                                a = b[b.length - 1]
                            }
                            return a
                        },
                        _getNext: function(a) {
                            if (a.isExpandable && a.isExpanded && a.hasChildren()) return a.getChildren()[0];
                            for (; a && a.isTreeNode;) {
                                var b = a.getNextSibling();
                                if (b) return b;
                                a = a.getParent()
                            }
                            return null
                        },
                        childSelector: ".dijitTreeRow",
                        isExpandoNode: function(a,
                            c) {
                            return b.isDescendant(a, c.expandoNode) || b.isDescendant(a, c.expandoNodeText)
                        },
                        _onNodePress: function(a, b) {
                            this.focusNode(a)
                        },
                        __click: function(a, b, c, d) {
                            var f = this.isExpandoNode(b.target, a);
                            a.isExpandable && (c || f) ? this._onExpandoClick({
                                node: a
                            }) : (this._publish("execute", {
                                item: a.item,
                                node: a,
                                evt: b
                            }), this[d](a.item, a, b), this.focusNode(a));
                            b.stopPropagation();
                            b.preventDefault()
                        },
                        _onClick: function(a, b) {
                            this.__click(a, b, this.openOnClick, "onClick")
                        },
                        _onDblClick: function(a, b) {
                            this.__click(a, b, this.openOnDblClick,
                                "onDblClick")
                        },
                        _onExpandoClick: function(a) {
                            a = a.node;
                            this.focusNode(a);
                            a.isExpanded ? this._collapseNode(a) : this._expandNode(a)
                        },
                        onClick: function() {},
                        onDblClick: function() {},
                        onOpen: function() {},
                        onClose: function() {},
                        _getNextNode: function(a) {
                            m.deprecated(this.declaredClass + "::_getNextNode(node) is deprecated. Use _getNext(node) instead.", "", "2.0");
                            return this._getNext(a)
                        },
                        _getRootOrFirstNode: function() {
                            m.deprecated(this.declaredClass + "::_getRootOrFirstNode() is deprecated. Use _getFirst() instead.", "",
                                "2.0");
                            return this._getFirst()
                        },
                        _collapseNode: function(a) {
                            a._expandNodeDeferred && delete a._expandNodeDeferred;
                            if ("Loading" != a.state && a.isExpanded) {
                                var b = a.collapse();
                                this.onClose(a.item, a);
                                this._state(a, !1);
                                this._startPaint(b);
                                return b
                            }
                        },
                        _expandNode: function(a) {
                            if (a._expandNodeDeferred) return a._expandNodeDeferred;
                            var b = this.model,
                                c = a.item,
                                f = this;
                            a._loadDeferred || (a.markProcessing(), a._loadDeferred = new d, b.getChildren(c, function(b) {
                                    a.unmarkProcessing();
                                    a.setChildItems(b).then(function() {
                                        a._loadDeferred.resolve(b)
                                    })
                                },
                                function(b) {
                                    console.error(f, ": error loading " + a.label + " children: ", b);
                                    a._loadDeferred.reject(b)
                                }));
                            b = a._loadDeferred.then(r.hitch(this, function() {
                                var b = a.expand();
                                this.onOpen(a.item, a);
                                this._state(a, !0);
                                return b
                            }));
                            this._startPaint(b);
                            return b
                        },
                        focusNode: function(a) {
                            var b = this.domNode.scrollLeft;
                            this.focusChild(a);
                            this.domNode.scrollLeft = b
                        },
                        _onNodeMouseEnter: function() {},
                        _onNodeMouseLeave: function() {},
                        _onItemChange: function(a) {
                            var b = this.model.getIdentity(a);
                            if (b = this._itemNodesMap[b]) {
                                var c = this.getLabel(a),
                                    d = this.getTooltip(a);
                                e.forEach(b, function(b) {
                                    b.set({
                                        item: a,
                                        label: c,
                                        tooltip: d
                                    });
                                    b._updateItemClasses(a)
                                })
                            }
                        },
                        _onItemChildrenChange: function(a, b) {
                            var c = this.model.getIdentity(a);
                            (c = this._itemNodesMap[c]) && e.forEach(c, function(a) {
                                a.setChildItems(b)
                            })
                        },
                        _onItemDelete: function(a) {
                            a = this.model.getIdentity(a);
                            var c = this._itemNodesMap[a];
                            c && (e.forEach(c, function(a) {
                                this.dndController.removeTreeNode(a);
                                var c = a.getParent();
                                c && c.removeChild(a);
                                this.lastFocusedChild && !b.isDescendant(this.lastFocusedChild, this.domNode) &&
                                    delete this.lastFocusedChild;
                                this.focusedChild && !b.isDescendant(this.focusedChild, this.domNode) && this.focus();
                                a.destroyRecursive()
                            }, this), delete this._itemNodesMap[a])
                        },
                        _initState: function() {
                            this._openedNodes = {};
                            if (this.persist && this.cookieName) {
                                var a = l(this.cookieName);
                                a && e.forEach(a.split(","), function(a) {
                                    this._openedNodes[a] = !0
                                }, this)
                            }
                        },
                        _state: function(a, b) {
                            if (!this.persist) return !1;
                            var c = e.map(a.getTreePath(), function(a) {
                                return this.model.getIdentity(a)
                            }, this).join("/");
                            if (1 === arguments.length) return this._openedNodes[c];
                            b ? this._openedNodes[c] = !0 : delete this._openedNodes[c];
                            this._saveExpandedNodes()
                        },
                        _saveExpandedNodes: function() {
                            if (this.persist && this.cookieName) {
                                var a = [],
                                    b;
                                for (b in this._openedNodes) a.push(b);
                                l(this.cookieName, a.join(","), {
                                    expires: 365
                                })
                            }
                        },
                        destroy: function() {
                            this._curSearch && (this._curSearch.timer.remove(), delete this._curSearch);
                            this.rootNode && this.rootNode.destroyRecursive();
                            this.dndController && !r.isString(this.dndController) && this.dndController.destroy();
                            this.rootNode = null;
                            this.inherited(arguments)
                        },
                        destroyRecursive: function() {
                            this.destroy()
                        },
                        resize: function(a) {
                            a && g.setMarginBox(this.domNode, a);
                            this._nodePixelIndent = g.position(this.tree.indentDetector).w || this._nodePixelIndent;
                            this.expandChildrenDeferred.then(r.hitch(this, function() {
                                this.rootNode.set("indent", this.showRoot ? 0 : -1);
                                this._adjustWidths()
                            }))
                        },
                        _outstandingPaintOperations: 0,
                        _startPaint: function(a) {
                            this._outstandingPaintOperations++;
                            this._adjustWidthsTimer && (this._adjustWidthsTimer.remove(), delete this._adjustWidthsTimer);
                            var b = r.hitch(this,
                                function() {
                                    this._outstandingPaintOperations--;
                                    0 >= this._outstandingPaintOperations && (!this._adjustWidthsTimer && this._started) && (this._adjustWidthsTimer = this.defer("_adjustWidths"))
                                });
                            H(a, b, b)
                        },
                        _adjustWidths: function() {
                            this._adjustWidthsTimer && (this._adjustWidthsTimer.remove(), delete this._adjustWidthsTimer);
                            this.containerNode.style.width = "auto";
                            this.containerNode.style.width = this.domNode.scrollWidth > this.domNode.offsetWidth ? "auto" : "100%"
                        },
                        _createTreeNode: function(a) {
                            return new K(a)
                        },
                        focus: function() {
                            this.lastFocusedChild ?
                                this.focusNode(this.lastFocusedChild) : this.focusFirstChild()
                        }
                    });
                    p("dojo-bidi") && A.extend({
                        _setTextDirAttr: function(a) {
                            a && this.textDir != a && (this._set("textDir", a), this.rootNode.set("textDir", a))
                        }
                    });
                    A.PathError = s("TreePathError");
                    A._TreeNode = K;
                    return A
                })
        },
        "dijit/tree/TreeStoreModel": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang"], function(e, k, l, h) {
                return l("dijit.tree.TreeStoreModel", null, {
                    store: null,
                    childrenAttrs: ["children"],
                    newItemIdAttr: "id",
                    labelAttr: "",
                    root: null,
                    query: null,
                    deferItemLoadingUntilExpand: !1,
                    constructor: function(d) {
                        h.mixin(this, d);
                        this.connects = [];
                        d = this.store;
                        if (!d.getFeatures()["dojo.data.api.Identity"]) throw Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
                        d.getFeatures()["dojo.data.api.Notification"] && (this.connects = this.connects.concat([k.after(d, "onNew", h.hitch(this, "onNewItem"), !0), k.after(d, "onDelete", h.hitch(this, "onDeleteItem"), !0), k.after(d, "onSet", h.hitch(this, "onSetItem"), !0)]))
                    },
                    destroy: function() {
                        for (var d; d =
                            this.connects.pop();) d.remove()
                    },
                    getRoot: function(d, a) {
                        this.root ? d(this.root) : this.store.fetch({
                            query: this.query,
                            onComplete: h.hitch(this, function(a) {
                                if (1 != a.length) throw Error("dijit.tree.TreeStoreModel: root query returned " + a.length + " items, but must return exactly one");
                                this.root = a[0];
                                d(this.root)
                            }),
                            onError: a
                        })
                    },
                    mayHaveChildren: function(d) {
                        return e.some(this.childrenAttrs, function(a) {
                            return this.store.hasAttribute(d, a)
                        }, this)
                    },
                    getChildren: function(d, a, b) {
                        var c = this.store;
                        if (c.isItemLoaded(d)) {
                            for (var g = [], n = 0; n < this.childrenAttrs.length; n++) var k = c.getValues(d, this.childrenAttrs[n]),
                                g = g.concat(k);
                            var f = 0;
                            this.deferItemLoadingUntilExpand || e.forEach(g, function(a) {
                                c.isItemLoaded(a) || f++
                            });
                            0 == f ? a(g) : e.forEach(g, function(d, e) {
                                c.isItemLoaded(d) || c.loadItem({
                                    item: d,
                                    onItem: function(b) {
                                        g[e] = b;
                                        0 == --f && a(g)
                                    },
                                    onError: b
                                })
                            })
                        } else {
                            var p = h.hitch(this, arguments.callee);
                            c.loadItem({
                                item: d,
                                onItem: function(c) {
                                    p(c, a, b)
                                },
                                onError: b
                            })
                        }
                    },
                    isItem: function(d) {
                        return this.store.isItem(d)
                    },
                    fetchItemByIdentity: function(d) {
                        this.store.fetchItemByIdentity(d)
                    },
                    getIdentity: function(d) {
                        return this.store.getIdentity(d)
                    },
                    getLabel: function(d) {
                        return this.labelAttr ? this.store.getValue(d, this.labelAttr) : this.store.getLabel(d)
                    },
                    newItem: function(d, a, b) {
                        var c = {
                                parent: a,
                                attribute: this.childrenAttrs[0]
                            },
                            g;
                        this.newItemIdAttr && d[this.newItemIdAttr] ? this.fetchItemByIdentity({
                                identity: d[this.newItemIdAttr],
                                scope: this,
                                onItem: function(e) {
                                    e ? this.pasteItem(e, null, a, !0, b) : (g = this.store.newItem(d, c)) && void 0 != b && this.pasteItem(g, a, a, !1, b)
                                }
                            }) : (g = this.store.newItem(d, c)) && void 0 !=
                            b && this.pasteItem(g, a, a, !1, b)
                    },
                    pasteItem: function(d, a, b, c, g) {
                        var h = this.store,
                            k = this.childrenAttrs[0];
                        a && e.forEach(this.childrenAttrs, function(b) {
                            if (h.containsValue(a, b, d)) {
                                if (!c) {
                                    var f = e.filter(h.getValues(a, b), function(a) {
                                        return a != d
                                    });
                                    h.setValues(a, b, f)
                                }
                                k = b
                            }
                        });
                        if (b)
                            if ("number" == typeof g) {
                                var f = h.getValues(b, k).slice();
                                f.splice(g, 0, d);
                                h.setValues(b, k, f)
                            } else h.setValues(b, k, h.getValues(b, k).concat(d))
                    },
                    onChange: function() {},
                    onChildrenChange: function() {},
                    onDelete: function() {},
                    onNewItem: function(d,
                        a) {
                        a && this.getChildren(a.item, h.hitch(this, function(b) {
                            this.onChildrenChange(a.item, b)
                        }))
                    },
                    onDeleteItem: function(d) {
                        this.onDelete(d)
                    },
                    onSetItem: function(d, a) {
                        if (-1 != e.indexOf(this.childrenAttrs, a)) this.getChildren(d, h.hitch(this, function(a) {
                            this.onChildrenChange(d, a)
                        }));
                        else this.onChange(d)
                    }
                })
            })
        },
        "dijit/tree/ForestStoreModel": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "./TreeStoreModel"], function(e, k, l, h, d) {
                return k("dijit.tree.ForestStoreModel",
                    d, {
                        rootId: "$root$",
                        rootLabel: "ROOT",
                        query: null,
                        constructor: function(a) {
                            this.root = {
                                store: this,
                                root: !0,
                                id: a.rootId,
                                label: a.rootLabel,
                                children: a.rootChildren
                            }
                        },
                        mayHaveChildren: function(a) {
                            return a === this.root || this.inherited(arguments)
                        },
                        getChildren: function(a, b, c) {
                            a === this.root ? this.root.children ? b(this.root.children) : this.store.fetch({
                                query: this.query,
                                onComplete: h.hitch(this, function(a) {
                                    this.root.children = a;
                                    b(a)
                                }),
                                onError: c
                            }) : this.inherited(arguments)
                        },
                        isItem: function(a) {
                            return a === this.root ? !0 : this.inherited(arguments)
                        },
                        fetchItemByIdentity: function(a) {
                            if (a.identity == this.root.id) {
                                var b = a.scope || l.global;
                                a.onItem && a.onItem.call(b, this.root)
                            } else this.inherited(arguments)
                        },
                        getIdentity: function(a) {
                            return a === this.root ? this.root.id : this.inherited(arguments)
                        },
                        getLabel: function(a) {
                            return a === this.root ? this.root.label : this.inherited(arguments)
                        },
                        newItem: function(a, b, c) {
                            return b === this.root ? (this.onNewRootItem(a), this.store.newItem(a)) : this.inherited(arguments)
                        },
                        onNewRootItem: function() {},
                        pasteItem: function(a, b, c, d, e) {
                            if (b ===
                                this.root && !d) this.onLeaveRoot(a);
                            this.inherited(arguments, [a, b === this.root ? null : b, c === this.root ? null : c, d, e]);
                            if (c === this.root) this.onAddToRoot(a)
                        },
                        onAddToRoot: function(a) {
                            console.log(this, ": item ", a, " added to root")
                        },
                        onLeaveRoot: function(a) {
                            console.log(this, ": item ", a, " removed from root")
                        },
                        _requeryTop: function() {
                            var a = this.root.children || [];
                            this.store.fetch({
                                query: this.query,
                                onComplete: h.hitch(this, function(b) {
                                    this.root.children = b;
                                    if (a.length != b.length || e.some(a, function(a, d) {
                                            return b[d] != a
                                        })) this.onChildrenChange(this.root,
                                        b)
                                })
                            })
                        },
                        onNewItem: function(a, b) {
                            this._requeryTop();
                            this.inherited(arguments)
                        },
                        onDeleteItem: function(a) {
                            -1 != e.indexOf(this.root.children, a) && this._requeryTop();
                            this.inherited(arguments)
                        },
                        onSetItem: function(a, b, c, d) {
                            this._requeryTop();
                            this.inherited(arguments)
                        }
                    })
            })
        },
        "dijit/tree/_dndSelector": function() {
            define("dojo/_base/array dojo/_base/declare dojo/_base/kernel dojo/_base/lang dojo/dnd/common dojo/dom dojo/mouse dojo/on dojo/touch ../a11yclick ./_dndContainer".split(" "), function(e, k, l, h, d, a, b, c,
                g, n, s) {
                return k("dijit.tree._dndSelector", s, {
                    constructor: function() {
                        this.selection = {};
                        this.anchor = null;
                        this.events.push(c(this.tree.domNode, g.press, h.hitch(this, "onMouseDown")), c(this.tree.domNode, g.release, h.hitch(this, "onMouseUp")), c(this.tree.domNode, g.move, h.hitch(this, "onMouseMove")), c(this.tree.domNode, n.press, h.hitch(this, "onClickPress")), c(this.tree.domNode, n.release, h.hitch(this, "onClickRelease")))
                    },
                    singular: !1,
                    getSelectedTreeNodes: function() {
                        var a = [],
                            b = this.selection,
                            c;
                        for (c in b) a.push(b[c]);
                        return a
                    },
                    selectNone: function() {
                        this.setSelection([]);
                        return this
                    },
                    destroy: function() {
                        this.inherited(arguments);
                        this.selection = this.anchor = null
                    },
                    addTreeNode: function(a, b) {
                        this.setSelection(this.getSelectedTreeNodes().concat([a]));
                        b && (this.anchor = a);
                        return a
                    },
                    removeTreeNode: function(b) {
                        var c = e.filter(this.getSelectedTreeNodes(), function(c) {
                            return !a.isDescendant(c.domNode, b.domNode)
                        });
                        this.setSelection(c);
                        return b
                    },
                    isTreeNodeSelected: function(a) {
                        return a.id && !!this.selection[a.id]
                    },
                    setSelection: function(a) {
                        var b =
                            this.getSelectedTreeNodes();
                        e.forEach(this._setDifference(b, a), h.hitch(this, function(a) {
                            a.setSelected(!1);
                            this.anchor == a && delete this.anchor;
                            delete this.selection[a.id]
                        }));
                        e.forEach(this._setDifference(a, b), h.hitch(this, function(a) {
                            a.setSelected(!0);
                            this.selection[a.id] = a
                        }));
                        this._updateSelectionProperties()
                    },
                    _setDifference: function(a, b) {
                        e.forEach(b, function(a) {
                            a.__exclude__ = !0
                        });
                        var c = e.filter(a, function(a) {
                            return !a.__exclude__
                        });
                        e.forEach(b, function(a) {
                            delete a.__exclude__
                        });
                        return c
                    },
                    _updateSelectionProperties: function() {
                        var a =
                            this.getSelectedTreeNodes(),
                            b = [],
                            c = [];
                        e.forEach(a, function(a) {
                            var d = a.getTreePath();
                            c.push(a);
                            b.push(d)
                        }, this);
                        a = e.map(c, function(a) {
                            return a.item
                        });
                        this.tree._set("paths", b);
                        this.tree._set("path", b[0] || []);
                        this.tree._set("selectedNodes", c);
                        this.tree._set("selectedNode", c[0] || null);
                        this.tree._set("selectedItems", a);
                        this.tree._set("selectedItem", a[0] || null)
                    },
                    onClickPress: function(a) {
                        if (!this.current || !this.current.isExpandable || !this.tree.isExpandoNode(a.target, this.current)) {
                            "mousedown" == a.type &&
                                b.isLeft(a) && a.preventDefault();
                            var c = "keydown" == a.type ? this.tree.focusedChild : this.current;
                            if (c) {
                                var g = d.getCopyKeyState(a),
                                    e = c.id;
                                !this.singular && !a.shiftKey && this.selection[e] ? this._doDeselect = !0 : (this._doDeselect = !1, this.userSelect(c, g, a.shiftKey))
                            }
                        }
                    },
                    onClickRelease: function(a) {
                        this._doDeselect && (this._doDeselect = !1, this.userSelect("keyup" == a.type ? this.tree.focusedChild : this.current, d.getCopyKeyState(a), a.shiftKey))
                    },
                    onMouseMove: function() {
                        this._doDeselect = !1
                    },
                    onMouseDown: function() {},
                    onMouseUp: function() {},
                    _compareNodes: function(a, b) {
                        if (a === b) return 0;
                        if ("sourceIndex" in document.documentElement) return a.sourceIndex - b.sourceIndex;
                        if ("compareDocumentPosition" in document.documentElement) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
                        if (document.createRange) {
                            var c = doc.createRange();
                            c.setStartBefore(a);
                            var d = doc.createRange();
                            d.setStartBefore(b);
                            return c.compareBoundaryPoints(c.END_TO_END, d)
                        }
                        throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
                    },
                    userSelect: function(a,
                        b, c) {
                        if (this.singular) this.anchor == a && b ? this.selectNone() : (this.setSelection([a]), this.anchor = a);
                        else if (c && this.anchor) {
                            b = this._compareNodes(this.anchor.rowNode, a.rowNode);
                            c = this.anchor;
                            0 > b ? b = c : (b = a, a = c);
                            for (c = []; b != a;) c.push(b), b = this.tree._getNext(b);
                            c.push(a);
                            this.setSelection(c)
                        } else this.selection[a.id] && b ? this.removeTreeNode(a) : b ? this.addTreeNode(a, !0) : (this.setSelection([a]), this.anchor = a)
                    },
                    getItem: function(a) {
                        return {
                            data: this.selection[a],
                            type: ["treeNode"]
                        }
                    },
                    forInSelectedItems: function(a,
                        b) {
                        b = b || l.global;
                        for (var c in this.selection) a.call(b, this.getItem(c), c, this)
                    }
                })
            })
        },
        "dijit/tree/_dndContainer": function() {
            define("dojo/aspect dojo/_base/declare dojo/dom-class dojo/_base/lang dojo/on dojo/touch".split(" "), function(e, k, l, h, d, a) {
                return k("dijit.tree._dndContainer", null, {
                    constructor: function(b, c) {
                        this.tree = b;
                        this.node = b.domNode;
                        h.mixin(this, c);
                        this.containerState = "";
                        l.add(this.node, "dojoDndContainer");
                        this.events = [d(this.node, a.enter, h.hitch(this, "onOverEvent")), d(this.node, a.leave,
                            h.hitch(this, "onOutEvent")), e.after(this.tree, "_onNodeMouseEnter", h.hitch(this, "onMouseOver"), !0), e.after(this.tree, "_onNodeMouseLeave", h.hitch(this, "onMouseOut"), !0), d(this.node, "dragstart, selectstart", function(a) {
                            a.preventDefault()
                        })]
                    },
                    destroy: function() {
                        for (var a; a = this.events.pop();) a.remove();
                        this.node = this.parent = null
                    },
                    onMouseOver: function(a) {
                        this.current = a
                    },
                    onMouseOut: function() {
                        this.current = null
                    },
                    _changeState: function(a, c) {
                        var d = "dojoDnd" + a,
                            e = a.toLowerCase() + "State";
                        l.replace(this.node, d +
                            c, d + this[e]);
                        this[e] = c
                    },
                    _addItemClass: function(a, c) {
                        l.add(a, "dojoDndItem" + c)
                    },
                    _removeItemClass: function(a, c) {
                        l.remove(a, "dojoDndItem" + c)
                    },
                    onOverEvent: function() {
                        this._changeState("Container", "Over")
                    },
                    onOutEvent: function() {
                        this._changeState("Container", "")
                    }
                })
            })
        },
        "jimu/dijit/LayerChooserFromMapWithDropbox": function() {
            define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dojo/Evented dojo/Deferred dijit/popup dijit/_WidgetBase dijit/_TemplatedMixin dojo/text!./templates/LayerChooserFromMapWithDropbox.html jimu/LayerInfos/LayerInfos".split(" "),
                function(e, k, l, h, d, a, b, c, g, n, s) {
                    return e([c, g, d], {
                        templateString: n,
                        baseClass: "jimu-layer-chooser-from-map-withdropbox",
                        declaredClass: "jimu.dijit.LayerChooserFromMapWithDropbox",
                        _selectedItem: null,
                        _isLayerChooserShow: !1,
                        layerInfosObj: null,
                        layerChooser: null,
                        postCreate: function() {
                            this.inherited(arguments);
                            this.layerInfosObj = s.getInstanceSync();
                            this.layerChooser.domNode.style.zIndex = 1;
                            this.layerChooser.tree.domNode.style.borderTop = "0";
                            this.own(h(this.layerChooser, "tree-click", k.hitch(this, this._onTreeClick)));
                            this.own(h(this.layerChooser, "update", k.hitch(this, this._onLayerChooserUpdate)));
                            this.own(h(document.body, "click", k.hitch(this, this._onBodyClicked)))
                        },
                        destroy: function() {
                            this.hideLayerChooser();
                            this.layerChooser && this.layerChooser.destroy();
                            this.layerChooser = null;
                            this.inherited(arguments)
                        },
                        getLayerChooser: function() {
                            return this.layerChooser
                        },
                        setSelectedLayer: function(b) {
                            var c = new a;
                            if (b) {
                                var d = this.layerInfosObj.getLayerInfoById(b.id);
                                d ? this.layerChooser.filter(d).then(k.hitch(this, function(a) {
                                    a ?
                                        (this._onSelectNewItem({
                                            layerInfo: d,
                                            name: d.title,
                                            url: b.url
                                        }), c.resolve(!0)) : c.resolve(!1)
                                }), k.hitch(this, function() {
                                    c.resolve(!1)
                                })) : c.resolve(!1)
                            } else this._onSelectNewItem(null), c.resolve(!0);
                            return c
                        },
                        getSelectedItem: function() {
                            return this._selectedItem
                        },
                        getSelectedItems: function() {
                            return [this._selectedItem]
                        },
                        _onBodyClicked: function(a) {
                            a = a.target || a.srcElement;
                            a === this.domNode || l.isDescendant(a, this.domNode) || a === this.layerChooser.domNode || l.isDescendant(a, this.layerChooser.domNode) || this.hideLayerChooser()
                        },
                        _onDropDownClick: function(a) {
                            a.stopPropagation();
                            a.preventDefault();
                            this._isLayerChooserShow ? this.hideLayerChooser() : this.showLayerChooser()
                        },
                        _getSelectedItems: function() {
                            return this.layerChooser.getSelectedItems()
                        },
                        showLayerChooser: function() {
                            this.layerChooser.domNode.style.width = this.domNode.clientWidth + 2 + "px";
                            b.open({
                                parent: this,
                                popup: this.layerChooser,
                                around: this.domNode
                            });
                            var a = this.layerChooser.domNode.parentNode;
                            a && l.addClass(a, "jimu-layer-chooser-from-map-withdropbox-popup");
                            this._isLayerChooserShow = !0
                        },
                        hideLayerChooser: function() {
                            b.close(this.layerChooser);
                            this._isLayerChooserShow = !1
                        },
                        _onLayerChooserUpdate: function() {
                            this._selectedItem && this.layerChooser.onlyShowVisible && !this._selectedItem.layerInfo.isShowInMap() && (this._selectedItem = null, this.emit("selection-change", []))
                        },
                        _onSelectNewItem: function(a) {
                            var b = k.getObject("layerInfo.id", !1, this._selectedItem) || -1,
                                c = k.getObject("layerInfo.id", !1, a) || -1,
                                b = b !== c;
                            this._selectedItem = a;
                            this.hideLayerChooser();
                            a = k.getObject("layerInfo.title", !1, this._selectedItem) ||
                                "";
                            this.layerNameNode.innerHTML = a;
                            a = k.getObject("layerInfo.layerObject", !1, this._selectedItem);
                            b && this.emit("selection-change", [a])
                        },
                        _onTreeClick: function() {
                            var a = this._getSelectedItems();
                            this._onSelectNewItem(0 < a.length ? a[0] : null)
                        }
                    })
                })
        },
        "dijit/form/Textarea": function() {
            define(["dojo/_base/declare", "dojo/dom-style", "./_ExpandingTextAreaMixin", "./SimpleTextarea"], function(e, k, l, h) {
                return e("dijit.form.Textarea", [h, l], {
                    baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea",
                    cols: "",
                    buildRendering: function() {
                        this.inherited(arguments);
                        k.set(this.textbox, {
                            overflowY: "hidden",
                            overflowX: "auto",
                            boxSizing: "border-box",
                            MsBoxSizing: "border-box",
                            WebkitBoxSizing: "border-box",
                            MozBoxSizing: "border-box"
                        })
                    }
                })
            })
        },
        "dijit/form/_ExpandingTextAreaMixin": function() {
            define("dojo/_base/declare dojo/dom-construct dojo/has dojo/_base/lang dojo/on dojo/_base/window ../Viewport".split(" "), function(e, k, l, h, d, a, b) {
                l.add("textarea-needs-help-shrinking", function() {
                    var b = a.body(),
                        d = k.create("textarea", {
                            rows: "5",
                            cols: "20",
                            value: " ",
                            style: {
                                zoom: 1,
                                fontSize: "12px",
                                height: "96px",
                                overflow: "hidden",
                                visibility: "hidden",
                                position: "absolute",
                                border: "5px solid white",
                                margin: "0",
                                padding: "0",
                                boxSizing: "border-box",
                                MsBoxSizing: "border-box",
                                WebkitBoxSizing: "border-box",
                                MozBoxSizing: "border-box"
                            }
                        }, b, "last"),
                        e = d.scrollHeight >= d.clientHeight;
                    b.removeChild(d);
                    return e
                });
                return e("dijit.form._ExpandingTextAreaMixin", null, {
                    _setValueAttr: function() {
                        this.inherited(arguments);
                        this.resize()
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        var a = this.textbox;
                        a.style.overflowY = "hidden";
                        this.own(d(a, "focus, resize", h.hitch(this, "_resizeLater")))
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this.own(b.on("resize", h.hitch(this, "_resizeLater")));
                        this._resizeLater()
                    },
                    _onInput: function(a) {
                        this.inherited(arguments);
                        this.resize()
                    },
                    _estimateHeight: function() {
                        var a = this.textbox;
                        a.rows = (a.value.match(/\n/g) || []).length + 1
                    },
                    _resizeLater: function() {
                        this.defer("resize")
                    },
                    resize: function() {
                        function a() {
                            var c = !1;
                            "" === b.value && (b.value = " ", c = !0);
                            var d = b.scrollHeight;
                            c && (b.value = "");
                            return d
                        }
                        var b =
                            this.textbox;
                        "hidden" == b.style.overflowY && (b.scrollTop = 0);
                        if (!this.busyResizing) {
                            this.busyResizing = !0;
                            if (a() || b.offsetHeight) {
                                var d = a() + Math.max(b.offsetHeight - b.clientHeight, 0),
                                    e = d + "px";
                                e != b.style.height && (b.style.height = e, b.rows = 1);
                                if (l("textarea-needs-help-shrinking")) {
                                    var f = a(),
                                        h = b.style.minHeight,
                                        k = 4,
                                        v = b.scrollTop;
                                    b.style.minHeight = e;
                                    for (b.style.height = "auto"; 0 < d;) {
                                        b.style.minHeight = Math.max(d - k, 4) + "px";
                                        e = a();
                                        f -= e;
                                        d -= f;
                                        if (f < k) break;
                                        f = e;
                                        k <<= 1
                                    }
                                    b.style.height = d + "px";
                                    b.style.minHeight = h;
                                    b.scrollTop =
                                        v
                                }
                                b.style.overflowY = a() > b.clientHeight ? "auto" : "hidden";
                                "hidden" == b.style.overflowY && (b.scrollTop = 0)
                            } else this._estimateHeight();
                            this.busyResizing = !1
                        }
                    }
                })
            })
        },
        "dijit/form/SimpleTextarea": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/sniff", "./TextBox"], function(e, k, l, h) {
                return e("dijit.form.SimpleTextarea", h, {
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
                        l("ie") && this.cols && k.add(this.textbox, "dijitTextAreaCols")
                    },
                    filter: function(d) {
                        d && (d = d.replace(/\r/g, ""));
                        return this.inherited(arguments)
                    },
                    _onInput: function(d) {
                        if (this.maxLength) {
                            var a = parseInt(this.maxLength),
                                b = this.textbox.value.replace(/\r/g, ""),
                                a = b.length - a;
                            if (0 < a) {
                                var c = this.textbox;
                                if (c.selectionStart) {
                                    var e = c.selectionStart,
                                        h = 0;
                                    l("opera") && (h = (this.textbox.value.substring(0, e).match(/\r/g) || []).length);
                                    this.textbox.value = b.substring(0, e - a - h) + b.substring(e - h);
                                    c.setSelectionRange(e - a, e - a)
                                } else this.ownerDocument.selection && (c.focus(), b = this.ownerDocument.selection.createRange(), b.moveStart("character", -a), b.text = "", b.select())
                            }
                        }
                        this.inherited(arguments)
                    }
                })
            })
        },
        "dijit/form/RadioButton": function() {
            define(["dojo/_base/declare", "./CheckBox", "./_RadioButtonMixin"], function(e, k, l) {
                return e("dijit.form.RadioButton", [k, l], {
                    baseClass: "dijitRadio"
                })
            })
        },
        "dijit/form/_RadioButtonMixin": function() {
            define("dojo/_base/array dojo/_base/declare dojo/dom-attr dojo/_base/lang dojo/query!css2 ../registry".split(" "), function(e, k, l, h, d, a) {
                return k("dijit.form._RadioButtonMixin", null, {
                    type: "radio",
                    _getRelatedWidgets: function() {
                        var b = [];
                        d("input[type\x3dradio]", this.focusNode.form || this.ownerDocument).forEach(h.hitch(this, function(c) {
                            c.name == this.name && c.form == this.focusNode.form && (c = a.getEnclosingWidget(c)) && b.push(c)
                        }));
                        return b
                    },
                    _setCheckedAttr: function(a) {
                        this.inherited(arguments);
                        this._created && a && e.forEach(this._getRelatedWidgets(), h.hitch(this, function(a) {
                            a != this && a.checked && a.set("checked", !1)
                        }))
                    },
                    _getSubmitValue: function(a) {
                        return null == a ? "on" : a
                    },
                    _onClick: function(a) {
                        if (this.checked || this.disabled) return a.stopPropagation(), a.preventDefault(), !1;
                        if (this.readOnly) return a.stopPropagation(), a.preventDefault(), e.forEach(this._getRelatedWidgets(), h.hitch(this, function(a) {
                            l.set(this.focusNode || this.domNode, "checked", a.checked)
                        })), !1;
                        var c = !1,
                            d;
                        e.some(this._getRelatedWidgets(),
                            function(a) {
                                return a.checked ? (d = a, !0) : !1
                            });
                        this.checked = !0;
                        d && (d.checked = !1);
                        if (!1 === this.onClick(a) || a.defaultPrevented) c = !0;
                        this.checked = !1;
                        d && (d.checked = !0);
                        c ? a.preventDefault() : this.set("checked", !0);
                        return !c
                    }
                })
            })
        },
        "widgets/Share/_build-generate_module": function() {
            define(["dojo/text!./Widget.html", "dojo/i18n!./nls/strings"], function() {})
        },
        "url:jimu/dijit/templates/ShareLink.html": '\x3cdiv class\x3d"shareLink"\x3e\r\n  \x3cdiv class\x3d"shareLinkOptionsWrapper displaynone"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"backBtn" class\x3d"backBtn"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"subTitle"\x3e${nls.linkOptionsUrlParameters}\x3c/div\x3e\r\n    \x3cform data-id\x3d"shareOptionsRadios" data-dojo-attach-point\x3d"shareOptionsRadios"\x3e\r\n      \x3cfieldset\x3e\r\n        \x3cdiv class\x3d"optionsRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"currentMapExtent" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"currentMapExtent" data-dojo-type\x3d"dijit.form.RadioButton" data-dojo-props\x3d\'checked:true\' checked\x3e\r\n          \x3cdiv class\x3d"labels" data-forid\x3d"currentMapExtent"\x3e${nls.currentMapExtent}\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsRow" data-dojo-attach-point\x3d"chooseCenterWithLevelRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"chooseCenterWithLevel" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"chooseCenterWithLevel" data-dojo-type\x3d"dijit.form.RadioButton"\x3e\r\n          \x3cdiv class\x3d"labels" data-forid\x3d"chooseCenterWithLevel"\x3e${nls.chooseCenterWithLevel}\x3c/div\x3e\r\n          \x3cdiv class\x3d"optionsMore chooseCenterWithLevel_optionsMore"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"chooseCenterWithLevel_marker" class\x3d"markers"\x3e\x3c/div\x3e\r\n            \x3cselect data-dojo-attach-point\x3d"chooseCenterWithLevel_levels" class\x3d"shareSelects" style\x3d"display: none !important;" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"chooseCenterWithScale" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"chooseCenterWithScale" data-dojo-type\x3d"dijit.form.RadioButton"\x3e\r\n          \x3cdiv class\x3d"labels"\x3e${nls.chooseCenterWithScale}\x3c/div\x3e\r\n          \x3cdiv class\x3d"optionsMore chooseCenterWithScale_optionsMore"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"chooseCenterWithScale_marker" class\x3d"markers"\x3e\x3c/div\x3e\r\n            \x3cselect data-dojo-attach-point\x3d"chooseCenterWithScale_scales" class\x3d"shareSelects" style\x3d"display: none !important;" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n        \x3cdiv class\x3d"optionsRow" data-dojo-attach-point\x3d"findLocationRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"findLocation" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"findLocation" data-dojo-type\x3d"dijit.form.RadioButton"\x3e\r\n          \x3cdiv class\x3d"labels"\x3e${nls.findLocation}\x3c/div\x3e\r\n          \x3cdiv class\x3d"optionsMore findLocation_optionsMore"\x3e\r\n            \x3cdiv class\x3d"moreOptions"\x3e\r\n              \x3cinput data-dojo-attach-point\x3d"findLocation_input" data-dojo-type\x3d"dijit.form.TextBox" placeholder\x3d"${nls.findLocation_inputPlaceholder}"\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"queryFeature" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"queryFeature" data-dojo-type\x3d"dijit.form.RadioButton"\x3e\r\n          \x3cdiv class\x3d"labels"\x3e${nls.queryFeature}\x3c/div\x3e\r\n          \x3cdiv class\x3d"optionsMore queryFeature_optionsMore"\x3e\r\n            \x3cdiv class\x3d"moreOptions"\x3e\r\n              \x3cdiv data-dojo-attach-point\x3d"queryFeature_layer" name\x3d"queryFeature_layer" class\x3d"queryFeature_layer"\x3e\x3c/div\x3e\r\n              \x3cselect data-dojo-attach-point\x3d"queryFeature_field" name\x3d"queryFeature_field" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n              \x3cselect data-dojo-attach-point\x3d"queryFeature_value" name\x3d"queryFeature_value" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsRow"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"addMarker" class\x3d"shareRadios jimu-float-leading" type\x3d"radio" name\x3d"radios" data-id\x3d"addMarker" data-dojo-type\x3d"dijit.form.RadioButton"\x3e\r\n          \x3cdiv class\x3d"labels"\x3e${nls.addMarker}\x3c/div\x3e\r\n          \x3cdiv class\x3d"optionsMore addMarker_optionsMore"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"addMarker_marker" class\x3d"markers"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"moreOptions addMarker_moreOptions"\x3e\r\n              \x3cdiv class\x3d"moreOptionsRow"\x3e\r\n                \x3clabel\x3e${nls.WKID}\x3c/label\x3e\r\n                \x3cinput data-dojo-attach-point\x3d"addMarker_spatialReference" name\x3d"spatialReference" data-dojo-type\x3d"dijit.form.TextBox"\x3e\r\n              \x3c/div\x3e\r\n              \x3cdiv class\x3d"moreOptionsRow"\x3e\r\n                \x3clabel\x3e${nls.popupTitle}\x3c/label\x3e\r\n                \x3cinput data-dojo-attach-point\x3d"addMarker_title" data-dojo-type\x3d"dijit.form.TextBox" placeholder\x3d"${nls.addMarker_titlePlaceholder}"\x3e\r\n              \x3c/div\x3e\r\n              \x3cdiv class\x3d"moreOptionsRow"\x3e\r\n                \x3clabel\x3e${nls.symbol}\x3c/label\x3e\r\n                \x3cinput data-dojo-attach-point\x3d"addMarker_symbolURL" data-dojo-type\x3d"dijit.form.TextBox" placeholder\x3d"${nls.addMarker_symbolURL}"\x3e\r\n              \x3c/div\x3e\r\n              \x3cdiv class\x3d"moreOptionsRow"\x3e\r\n                \x3clabel\x3e${nls.label}\x3c/label\x3e\r\n                \x3cinput data-dojo-attach-point\x3d"addMarker_label" data-dojo-type\x3d"dijit.form.TextBox" placeholder\x3d"${nls.addMarker_label}"\x3e\r\n              \x3c/div\x3e\r\n              \x3cdiv class\x3d"moreOptionsRow displaynone"\x3e\r\n                \x3clabel\x3e${nls.zoomLevel}\x3c/label\x3e\r\n                \x3cdiv class\x3d"table-for-select"\x3e\r\n                  \x3cselect data-dojo-attach-point\x3d"addMarker_level" name\x3d"addMarker_level" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n                \x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/fieldset\x3e\r\n    \x3c/form\x3e\r\n\r\n    \x3cfieldset\x3e\r\n      \x3cdiv class\x3d"optionsRow shareClearFix"\x3e\r\n        \x3cinput data-id\x3d"share-options-overwirteMobileLayout" data-dojo-attach-point\x3d"overwirteMobileLayout" class\x3d"shareCheckBoxes jimu-float-leading" data-dojo-type\x3d"dijit.form.CheckBox" type\x3d"checkbox"\x3e\r\n        \x3cdiv class\x3d"labels"\x3e${nls.overwirteMobileLayout}\x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsMore share-options-overwirteMobileLayout_optionsMore"\x3e\r\n          \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" required\x3d"true"\r\n                 data-dojo-attach-point\x3d"mobileLayout" data-dojo-props\x3d\'style:{width:"100px"}, constraints:{min:300}\'/\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"optionsRow shareClearFix"\x3e\r\n        \x3cinput data-id\x3d"share-options-language" data-dojo-attach-point\x3d"setlanguage" class\x3d"shareCheckBoxes jimu-float-leading" data-dojo-type\x3d"dijit.form.CheckBox" type\x3d"checkbox"\x3e\r\n        \x3cdiv class\x3d"labels"\x3e${nls.language}\x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsMore share-options-language_optionsMore"\x3e\r\n          \x3cselect data-dojo-attach-point\x3d"setlanguage_languages" class\x3d"shareSelects" style\x3d"display:inline-block;" data-dojo-type\x3d"dijit/form/Select"\x3e\x3c/select\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"optionsRow shareClearFix"\x3e\r\n        \x3cinput data-id\x3d"share-options-auth" data-dojo-attach-point\x3d"auth" class\x3d"shareCheckBoxes jimu-float-leading" data-dojo-type\x3d"dijit.form.CheckBox" type\x3d"checkbox"\x3e\r\n        \x3cdiv class\x3d"labels"\x3e${nls.auth}\x3c/div\x3e\r\n        \x3cdiv  class\x3d"optionsMore share-options-auth_optionsMore"\x3e\r\n          \x3cinput data-dojo-attach-point\x3d"authtoken" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d\'required:true\'/\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"optionsRow shareClearFix"\x3e\r\n        \x3cdiv class\x3d"subTitle"\x3e${nls.linkPreview}\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"preview" class\x3d"preview inputsText" data-dojo-type\x3d"dijit/form/SimpleTextarea" data-dojo-props\x3d\'required:true,readOnly:true\'\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/fieldset\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"shareUrlsWrapper"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"Text"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"linkShare" data-dojo-attach-point\x3d"LinkShareContainer"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"LinkText" class\x3d"subTitle linkToApp"\x3e${nls.shareLinkText}\x3c/div\x3e\r\n      \x3cinput data-dojo-attach-point\x3d"_linkUrlTextBox" class\x3d"shareLinkUrl inputsText" data-dojo-type\x3d"dijit/form/TextBox" data-dojo-props\x3d\'required:true,readOnly:true\'/\x3e\r\n      \x3cdiv class\x3d"shareClearFix"\x3e\r\n        \x3cspan class\x3d"optionsText jimu-float-leading" data-dojo-attach-point\x3d"linkOptions"\x3e${nls.linkOptions}\x3c/span\x3e\r\n        \x3cdiv class\x3d"shareLinkIcons jimu-float-trailing" data-dojo-attach-point\x3d"socialNetworkLinks"\x3e\r\n          \x3cdiv class\x3d"socialNetworkIcons email" data-dojo-attach-event\x3d"click:_toEmail" data-dojo-attach-point\x3d"emailShare" title\x3d"${nls.email}"\x3e\x3c/div\x3e\r\n          \x3cdiv class\x3d"socialNetworkIcons facebook" data-dojo-attach-event\x3d"click:_toFacebook" data-dojo-attach-point\x3d"FacebookShare" title\x3d"${nls.facebook}"\x3e\x3c/div\x3e\r\n          \x3cdiv class\x3d"socialNetworkIcons twitter" data-dojo-attach-event\x3d"click:_toTwitter" data-dojo-attach-point\x3d"TwitterShare" title\x3d"${nls.twitter}"\x3e\x3c/div\x3e\r\n          \x3cdiv class\x3d"socialNetworkIcons googlePlus" data-dojo-attach-point\x3d"googlePlusShare" title\x3d"${nls.googlePlus}"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"embedShare" data-dojo-attach-point\x3d"EmbedShareContainer"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"embedText" class\x3d"subTitle"\x3e${nls.embed}\x3c/div\x3e\r\n      \x3cinput data-dojo-attach-point\x3d"_embedCodeTextArea" class\x3d"shareEmbedCode inputsText" data-dojo-type\x3d"dijit/form/SimpleTextarea" data-dojo-props\x3d\'required:true,readOnly:true\'/\x3e\r\n      \x3cdiv class\x3d"moreOptions" data-dojo-attach-event\x3d"click:_moreOptionsExpandCollapse"\x3e\r\n        \x3cdiv class\x3d"moreOptionsIcon" data-dojo-attach-point\x3d"MoreOptionsIcon"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"optionsText"\x3e${nls.more}\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"MoreOptionsContainer" class\x3d"moreOptionsContainer inputsText displaynone"\x3e\r\n        \x3cdiv class\x3d"sizeSelect" data-dojo-attach-point\x3d"SizeSelect"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"customSize disable" data-dojo-attach-point\x3d"CustomSizeContainer"\x3e\r\n          \x3cdiv class\x3d"timesConnector"\x3eX\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv class\x3d"shareTips" data-dojo-attach-point\x3d"shareTips"\x3e\r\n      \x3c!--\x3cdiv class\x3d"infoIcon"\x3e\x3c/div\x3e--\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"shareTipsText" class\x3d"shareTipsText"\x3e${nls.shareToWebTips}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:jimu/dijit/templates/_TreeNode.html": '\x3cdiv class\x3d"dijitTreeNode" role\x3d"presentation"\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"rowNode" class\x3d"dijitTreeRow" role\x3d"presentation"\x3e\r\n\t\t\x3cspan data-dojo-attach-point\x3d"expandoNode" class\x3d"dijitInline dijitTreeExpando" role\x3d"presentation"\x3e\x3c/span\x3e\r\n\t\t\x3cspan data-dojo-attach-point\x3d"expandoNodeText" class\x3d"dijitExpandoText" role\x3d"presentation"\x3e\x3c/span\x3e\r\n\t\t\x3cspan data-dojo-attach-point\x3d"contentNode" class\x3d"dijitTreeContent" role\x3d"presentation"\x3e\r\n\t\t\t\x3cspan role\x3d"presentation" class\x3d"dijitInline dijitIcon dijitTreeIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"labelNode,focusNode" class\x3d"dijitTreeLabel" role\x3d"treeitem" tabindex\x3d"-1" aria-selected\x3d"false"\x3e\x3c/span\x3e\r\n\t\t\x3c/span\x3e\r\n\t\x3c/div\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"containerNode" class\x3d"dijitTreeNodeContainer" role\x3d"presentation" style\x3d"display: none;"\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
        "url:dijit/templates/TreeNode.html": '\x3cdiv class\x3d"dijitTreeNode" role\x3d"presentation"\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"rowNode" class\x3d"dijitTreeRow" role\x3d"presentation"\r\n\t\t\x3e\x3cspan data-dojo-attach-point\x3d"expandoNode" class\x3d"dijitInline dijitTreeExpando" role\x3d"presentation"\x3e\x3c/span\r\n\t\t\x3e\x3cspan data-dojo-attach-point\x3d"expandoNodeText" class\x3d"dijitExpandoText" role\x3d"presentation"\x3e\x3c/span\r\n\t\t\x3e\x3cspan data-dojo-attach-point\x3d"contentNode"\r\n\t\t\tclass\x3d"dijitTreeContent" role\x3d"presentation"\x3e\r\n\t\t\t\x3cspan role\x3d"presentation" class\x3d"dijitInline dijitIcon dijitTreeIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan data-dojo-attach-point\x3d"labelNode,focusNode" class\x3d"dijitTreeLabel" role\x3d"treeitem"\r\n\t\t\t\t   tabindex\x3d"-1" aria-selected\x3d"false" id\x3d"${id}_label"\x3e\x3c/span\x3e\r\n\t\t\x3c/span\r\n\t\x3e\x3c/div\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"containerNode" class\x3d"dijitTreeNodeContainer" role\x3d"presentation"\r\n\t\t style\x3d"display: none;" aria-labelledby\x3d"${id}_label"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:dijit/templates/Tree.html": '\x3cdiv role\x3d"tree"\x3e\r\n\t\x3cdiv class\x3d"dijitInline dijitTreeIndent" style\x3d"position: absolute; top: -9999px" data-dojo-attach-point\x3d"indentDetector"\x3e\x3c/div\x3e\r\n\t\x3cdiv class\x3d"dijitTreeExpando dijitTreeExpandoLoading" data-dojo-attach-point\x3d"rootLoadingIndicator"\x3e\x3c/div\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"containerNode" class\x3d"dijitTreeContainer" role\x3d"presentation"\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
        "url:jimu/dijit/templates/LayerChooserFromMapWithDropbox.html": '\x3cdiv\x3e\r\n  \x3ctable data-dojo-attach-event\x3d"onclick: _onDropDownClick"\x3e\r\n    \x3ccolgroup\x3e\r\n      \x3ccol width\x3d"10px"\x3e\x3c/col\x3e\r\n      \x3ccol width\x3d"auto"\x3e\x3c/col\x3e\r\n      \x3ccol width\x3d"30px"\x3e\x3c/col\x3e\r\n    \x3c/colgroup\x3e\r\n    \x3ctbody\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd\x3e\x3c/td\x3e\r\n        \x3ctd\x3e\r\n          \x3cdiv class\x3d"layer-name jimu-ellipsis" data-dojo-attach-point\x3d"layerNameNode"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3ctd\x3e\r\n          \x3cdiv class\x3d"drop-select jimu-float-trailing" data-dojo-attach-point\x3d"dropArrowNode"\x3e\r\n            \x3cdiv class\x3d"jimu-icon jimu-icon-down-arrow-8"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n    \x3c/tbody\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e\r\n',
        "url:widgets/Share/Widget.html": '\x3cdiv style\x3d"width:100%;min-width:230px;min-height:245px;"\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"container"\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
        "*now": function(e) {
            e(['dojo/i18n!*preload*widgets/Share/nls/Widget*["ar","cs","da","de","en","el","es","et","fi","fr","he","hr","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])
        }
    }
});
define("dojo/_base/declare dojo/_base/lang jimu/BaseWidget jimu/portalUrlUtils jimu/shareUtils jimu/dijit/ShareLink jimu/dijit/LoadingShelter jimu/dijit/Message".split(" "), function(e, k, l, h, d, a, b, c) {
    return e([l], {
        name: "Share",
        baseClass: "jimu-widget-share share-container",
        _isShowFindLocation: !0,
        onOpen: function() {
            this.widgetManager.activateWidget(this);
            d.getItemShareInfo(this.appConfig.portalUrl).then(k.hitch(this, function(a) {
                a = d.isSharedToPublic(a);
                if (this.shareLink && this.shareLink.onShareToPublicChanged) this.shareLink.onShareToPublicChanged(a)
            }))
        },
        onClose: function() {
            if (this.shareLink) this.shareLink.onCloseContainer()
        },
        onDeActive: function() {},
        _disableWebMapPopup: function() {},
        _enableWebMapPopup: function() {},
        postCreate: function() {
            this.inherited(arguments);
            this.shelter = new b({
                hidden: !0
            });
            this.shelter.placeAt(this.domNode);
            this.shelter.startup()
        },
        startup: function() {
            this.inherited(arguments);
            this.shelter.show();
            this._isShowFindLocation = this._findSearchWidget(this.appConfig);
            d.getItemShareInfo(this.appConfig.portalUrl).then(k.hitch(this, function(b) {
                this.shareLink =
                    new a({
                        portalUrl: this.appConfig.portalUrl,
                        appTitle: this.appConfig.title,
                        isOnline: h.isOnline(window.top.location.href),
                        isShowSocialMediaLinks: !0,
                        isSharedToPublic: d.isSharedToPublic(b),
                        isShowBackBtn: !0,
                        config: this.config,
                        isShowFindLocation: this._isShowFindLocation
                    });
                this.shareLink.placeAt(this.container)
            }), k.hitch(this, function(a) {
                new c({
                    message: a.message
                })
            })).always(k.hitch(this, function() {
                this.shelter.hide()
            }))
        },
        onAppConfigChanged: function(a) {
            this._isShowFindLocation = this._findSearchWidget(a);
            this.shareLink &&
                this.shareLink.updateShareLinkOptionsUI && this.shareLink.updateShareLinkOptionsUI({
                    isShowFindLocation: this._isShowFindLocation
                })
        },
        _findSearchWidget: function(a) {
            a = a.getConfigElementsByName("Search");
            return 0 < a.length && a[0].visible
        }
    })
});