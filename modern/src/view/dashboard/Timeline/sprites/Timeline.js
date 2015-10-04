Ext.define('Visualytics.view.dashboard.timeline.sprites.Timeline', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline',
	requires: [
		'Ext.draw.Point',
		'Visualytics.view.dashboard.timeline.sprites.Edge',
		'Visualytics.view.dashboard.timeline.sprites.Node'
	],
	config: {
		width: 500,
		barHeight: 10,
		edges: null,
		nodeRadius: 20,
		tickWidth: 3,
		tickHeight: 25,
		flags: null
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();

		var edges = this.getEdges();
		var nodeRadius = this.getNodeRadius();
		var numEdges = edges.length;
		var numNodes = numEdges + 1;
		var flags = this.getFlags();

		var edgeWidth = width / numEdges;

		for (var i = 0; i < numNodes; i++) {
			var nodePosition = this.getNodePosition(edgeWidth, i, numNodes);

			if (i < numEdges) {
				var edge = edges[i];
				var nextNodePosition = this.getNodePosition(edgeWidth, i + 1, numNodes);
				this.add({
					type: 'timeline_edge',
					text: edge.label,
					from: nodePosition,
					to: nextNodePosition,
					numTicks: edge.numTicks,
					tickWidth: this.getTickWidth(),
					tickHeight: this.getTickHeight(),
					edgeWidth: this.getBarHeight(),
					flags: flags.filter(function (flag) {
						return flag.edge === i;
					}),
					innerOffset: nodeRadius
				});
			}

			this.add({
				type: 'timeline_node',
				translationX: nodePosition.x,
				translationY: nodePosition.y,
				radius: nodeRadius
			});
		}
	},
	getNodePosition: function (edgeWidth, i, n) {
		var nodeX = edgeWidth * this.getNodePositionMultiplier(i, n);
		var nodeY = 0;//40 * Math.pow(this.getNodePositionMultiplier(i, n), 2) - 100;
		return Ext.create('Ext.draw.Point', nodeX, nodeY);
	},
	getNodePositionMultiplier: function (i, n) {
		return i - (n - 1) / 2;
	},
	getEdgePositionMultiplier: function (w, i, n) {
		return i - n / 2;
	}
});
