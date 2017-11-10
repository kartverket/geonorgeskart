define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/Deferred',
    'jimu/BaseWidget',
    'jimu/utils',
    'jimu/portalUtils',
    'jimu/dijit/Message',
    "dojo/dom-style",
    'dojo/query',
    'dojo/NodeList-dom'
  ],
  function(
    declare,
    lang,
    html,
    Deferred,
    BaseWidget,
    utils,
    PortalUtils,
    Message,
    domStyle,
    query) {
    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-url-layer-controller",
      name: "Url Layer Controller",

      postCreate: function() {
        this.inherited(arguments);
        console.log("Hello from Url Layer Controller");
        alert("Managed to add to app");
      },

      onClose: function() {
      }

    });

    return clazz;
  });