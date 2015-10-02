Ext.define('Visualytics.view.dashboard.timeline.sprites.Timeline', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline',
	requires: [
		'Ext.draw.Point',
		'Visualytics.view.dashboard.timeline.sprites.Edge',
		'Visualytics.view.dashboard.timeline.sprites.Node'
	],
	config: {
		width: 3,
		barHeight: 10,
		milestones: null,
		milestoneRadius: 20,
		tickWidth: 3,
		tickHeight: 25,
		flags: null
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();
		var barHeight = this.getBarHeight();

		var milestones = this.getMilestones();
		var milestoneRadius = this.getMilestoneRadius();
		var numMilestones = milestones.length;
		var numNodes = numMilestones + 1;
		var flags = this.getFlags();

		var edgeWidth = width / numMilestones;

		for (var i = 0; i < numNodes; i++) {
			var nodePosition = this.getNodePosition(edgeWidth, i, numNodes);

			if (i < numMilestones) {
				var milestoneInfo = milestones[i];
				var nextNodePosition = this.getNodePosition(edgeWidth, i + 1, numNodes);
				this.add({
					type: 'timeline_edge',
					text: milestoneInfo.label,
					from: nodePosition,
					to: nextNodePosition,
					numTicks: milestoneInfo.numTicks,
					tickWidth: this.getTickWidth(),
					tickHeight: this.getTickHeight(),
					flags: flags.filter(function (flag) {
						return flag.milestone === i;
					}),
					innerOffset: milestoneRadius
				});
			}

			this.add({
				type: 'timeline_node',
				translationX: nodePosition.x,
				translationY: nodePosition.y,
				radius: milestoneRadius
			});
		}
	},
	getNodePosition: function (edgeWidth, i, n) {
		var nodeX = edgeWidth * this.getNodePositionMultiplier(i, n);
		var nodeY = 40 * Math.pow(this.getNodePositionMultiplier(i, n), 2) - 100;
		return Ext.create('Ext.draw.Point', nodeX, nodeY);
	},
	getNodePositionMultiplier: function (i, n) {
		return i - (n - 1) / 2;
	},
	getEdgePositionMultiplier: function (w, i, n) {
		return i - n / 2;
	}
});
