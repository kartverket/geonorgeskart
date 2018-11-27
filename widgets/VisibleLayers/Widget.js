define(['dojo/_base/declare',
	'jimu/BaseWidget'
],
function(declare, BaseWidget) {
	var clazz = declare([BaseWidget], {
		name: 'VisibleLayers',
		baseClass: 'jimu-widget-visiblelayers',

		startup: function() {
			this.inherited(arguments);
			var that = this;

			for (var i = 0; i < this.map.layerIds.length; i++) {
				this.map.getLayer(this.map.layerIds[i]).on("visibility-change", function(event) {
					that.updateHTML(that.getFinalCount());
					that.positionAllCounts();
				});
			}
		},

		getCategoriesByLayerId: function(id) {
			var categories = [];
			for (var i = 0; i < this.config.categories.length; i++) {
				for (var j = 0; j < this.config.categories[i].layers.length; j++) {
					if (this.config.categories[i].layers[j].id === id) {
						categories.push(this.config.categories[i].name);
					}
				}
			}
			return categories;
		},

		getFinalCount: function() {
			var result = {
				"basis": 0,
				"outdoors": 0,
				"marine": 0,
				"heritage": 0,
				"transport": 0,
				"security": 0,
				"geology": 0,
				"agriculture": 0,
				"energy": 0,
				"plan": 0,
				"nature": 0,
				"pollution": 0
			};

			for (var i = 0; i < this.map.layerIds.length; i++) {
				var categories = this.getCategoriesByLayerId(this.map.layerIds[i]);
				for (var j = 0; j < categories.length; j++) {
					if (this.map.getLayer(this.map.layerIds[i]).visible) {
						result[categories[j]] += 1;
					}
				}
			}
			return result;
		},

		updateHTML: function(categoryCounts) {
			for (var key in categoryCounts) {
				if (categoryCounts[key] > 0) {
					this["visibleLayers_" + key].innerHTML = categoryCounts[key];
				}
				else {
					this["visibleLayers_" + key].innerHTML = "";
				}
			}
		},

		getPositionOfSubjectTab: function(tabName) {
			var element = document.querySelector("div.icon-node[title='" + tabName + "']");

			var rectangle = element.getBoundingClientRect();

			console.log(rectangle);

			return rectangle;
		},

		positionAllCounts: function() {
			for (var i = 0; i < this.config.categories.length; i++) {
				var domRectangle = this.getPositionOfSubjectTab(this.config.categories[i].domTitle);

				this["visibleLayers_" + this.config.categories[i].name].style.top = (domRectangle.top + 3) + "px";
				this["visibleLayers_" + this.config.categories[i].name].style.left = (domRectangle.right - 10) + "px";
			}
		}

	});
	return clazz;
});