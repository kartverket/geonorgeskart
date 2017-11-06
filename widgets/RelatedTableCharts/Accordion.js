// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dijit/_WidgetBase dojo/_base/declare dojo/Evented dojo/_base/array dojo/_base/lang dojo/on dojo/query dojo/dom-construct dojo/dom-class dojo/dom-style dojo/dom-attr ./ChartLayout jimu/utils".split(" "),function(p,q,r,n,h,s,f,k,c,t,u,v,w){return q([p,r],{openPanels:[],chartArray:[],constructor:function(){},postCreate:function(){this.inherited(arguments)},initAccordionPane:function(){var a,b;(this.config.charts.highlightedChartIndex||0===this.config.charts.highlightedChartIndex)&&-1===n.indexOf(this.openPanels,
"Chart"+this.config.charts.highlightedChartIndex)&&this.openPanels.push("Chart"+this.config.charts.highlightedChartIndex);a=k.create("div",{"class":"esriCTAccordionWrapper"},this.node);this.chartArray=[];n.forEach(this.config.charts,h.hitch(this,function(g,d){var e,f,l,m;m="Chart"+d;l=k.create("div",{"class":"esriCTChartRow",chartIndex:m},a);e=w.sanitizeHTML(g.chartConfig.sectionTitle);e=k.create("div",{"class":"esriCTChartTitle",innerHTML:e,title:e},l);f=k.create("div",{"class":"esriCTChartContent"},
l);g.chartData&&g.selectedFeature?(b=new v({nls:this.nls,config:g},k.create("div",{},f)),b.onChartCreated=h.hitch(this,function(){this.openPanels.length?-1===this.openPanels.indexOf(m)&&c.add(f,"esriCTHidden"):0!==d&&c.add(f,"esriCTHidden")}),b.onChartResize=h.hitch(this,function(){this.openPanels.length&&this._setFocusOnChart()}),this.chartArray.push(b),b.startup(),s(e,"click",h.hitch(this,function(a){c.contains(a.currentTarget,"esriCTChartSelected")?c.contains(a.currentTarget,"esriCTChartHighlighted")?
this._toggleSelectedChart(a.currentTarget,!0):(this.config.charts.highlightedChartIndex=d,this._highlightChart(a.currentTarget,d)):(this.config.charts.highlightedChartIndex=d,this._toggleSelectedChart(a.currentTarget,!1))}))):(this.chartArray.push(null),c.add(l,"esriCTDisabledRow"),c.add(f,"esriCTHidden"));-1!==this.openPanels.indexOf(m)&&this._toggleSelectedChart(e,!1);0===d&&!this.openPanels.length&&(this.config.charts.highlightedChartIndex=d,this._toggleSelectedChart(e,!1))}))},_setFocusOnChart:function(){var a,
b;a=this.config.charts.highlightedChartIndex;a=f(".esriCTChartRow",this.node)[a];b=f(".esriCTResultsPanel")[0];a&&b&&(b.scrollTop=a.offsetTop-81)},_toggleSelectedChart:function(a,b){var g,d,e;g=f(".esriCTChartContent",a.parentElement)[0];d=u.get(a.parentElement,"chartIndex");e=d.split("Chart")[1];b?(c.add(g,"esriCTHidden"),c.remove(a,"esriCTChartSelected"),-1!==this.openPanels.indexOf(d)&&this.openPanels.splice(this.openPanels.indexOf(d),1)):(this.config.charts[e].chartData&&(c.remove(g,"esriCTHidden"),
c.add(a,"esriCTChartSelected"),this.chartArray[e]&&this.chartArray[e].resizeChart(0),this.config.charts.highlightedChartIndex===parseInt(e,10)&&this._highlightChart(a,e)),-1===this.openPanels.indexOf(d)&&this.openPanels.push(d))},_highlightChart:function(a,b){this.emit("chartSelected",b);f(".esriCTChartHighlighted").length&&(c.remove(f(".esriCTChartHighlighted")[0],"esriCTSelectedChartBorder"),c.remove(f(".esriCTChartHighlighted")[0],"esriCTChartHighlighted"));c.add(a,"esriCTChartHighlighted");c.add(a,
"esriCTSelectedChartBorder");t.set(a,"border-color",this.config.selectedThemeColor)},resizeContents:function(){n.forEach(this.chartArray,h.hitch(this,function(a,b){a&&a.config.chartData&&-1!==this.openPanels.indexOf("Chart"+b)&&a.resizeChart(300)}))}})});