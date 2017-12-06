define([
    "dojo/_base/declare",
    "dojo/_base/html",
    "esri/dijit/Legend"
], function(
    declare,
    html,
    Legend
) {
    function CustomPrint() {
        this.legend = null;
    }

    CustomPrint.prototype.initializeLegendFor = function (map, domNode) {
        this.destroy();

        // let legend listen on map
        var legendParams = {
            map: map
        };

        // create a hidden legend appended to the domNode
        this.legend = new Legend(legendParams, html.create("div", { style: { display: 'none' } }, domNode));
        this.legend.startup();
    };

    CustomPrint.prototype.getLegendHtml = function (map) {
        if(this.legend === null) {
            return null;
        }

        return this.legend.domNode.innerHTML;
    };

    CustomPrint.prototype.destroy = function () {
        if(this.legend !== null) {
            this.legend.destroy();
            this.legend = null;
        }
    };

    return new CustomPrint();
});