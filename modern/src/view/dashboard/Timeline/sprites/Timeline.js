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
	init: function () {
		var width = this.getWidth();

		var edges = this.getEdges();
		var nodeRadius = this.getNodeRadius();
		var numEdges = edges.length;
		var numNodes = numEdges + 1;
		var flags = this.getFlags();

		var edgeWidth = width / numEdges;

		for (var i = 0; i < numNodes; i++) {
			var nodePosition = this.getNodePosition(edgeWidth, i, numNodes);
			var prevNodePosition = this.getNodePosition(edgeWidth, i - 1, numNodes);
			var nextNodePosition = this.getNodePosition(edgeWidth, i + 1, numNodes);

			if (i < numEdges) {
				var edge = edges[i];
				window['edge' + i] = this.add({
					type: 'timeline_edge',
					text: edge.label,
					from: nodePosition,
					to: nextNodePosition,
					numTicks: edge.numTicks,
					tickWidth: this.getTickWidth(),
					tickHeight: this.getTickHeight(),
					edgeWidth: this.getBarHeight(),
					flags: flags.filter(function (flag) {
						return flag.edge === i && flag.tick > 0;
					}),
					innerOffset: nodeRadius
				});
			}

			var angle = Math.atan2(nextNodePosition.y - prevNodePosition.y, nextNodePosition.x - prevNodePosition.x);
			this.add({
				type: 'timeline_node',
				translationX: nodePosition.x,
				translationY: nodePosition.y,
				rotationRads: angle,
				rotationCenterX: 0,
				rotationCenterY: 0,
				radius: nodeRadius,
				flags: flags.filter(function (flag) {
					return flag.edge === i && flag.tick === 0;
				})
			});
		}
	},
	getNodePosition: function (edgeWidth, i, n) {
		var nodeX = edgeWidth * this.getNodePositionMultiplier(i, n);
		var nodeY = 200 * Math.pow(this.getNodePositionMultiplier(i, n) / n, 2);
		return Ext.create('Ext.draw.Point', nodeX, nodeY);
	},
	getNodePositionMultiplier: function (i, n) {
		return i - (n - 1) / 2;
	},
	getEdgePositionMultiplier: function (w, i, n) {
		return i - n / 2;
	}
});
