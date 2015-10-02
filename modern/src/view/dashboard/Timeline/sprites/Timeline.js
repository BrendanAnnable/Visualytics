Ext.define('Visualytics.view.dashboard.timeline.sprites.Timeline', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline',
	requires: [
		'Visualytics.view.dashboard.timeline.sprites.Milestone',
		'Visualytics.view.dashboard.timeline.sprites.Tick'
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

		this.add({
			type: 'rect',
			x: -width / 2,
			y: -barHeight / 2,
			width: width,
			height: barHeight,
			fillStyle: '#333'
		});

		var milestones = this.getMilestones();
		var milestoneRadius = this.getMilestoneRadius();
		var numMilestones = milestones.length;

		var flags = this.getFlags();
		var flagMap = this.getFlagMap(flags);

		var spacing = width / (numMilestones + 1);

		milestones.forEach(function (milestoneInfo, i) {

			var milestone = this.add({
				type: 'timeline_milestone',
				text: milestoneInfo.label,
				finished: true,
				radius: milestoneRadius,
				translationX: spacing * (2 * i - numMilestones) / 2
			});

			var numTicks = milestoneInfo.numTicks;
			var tickWidth = this.getTickWidth();
			var tickHeight = this.getTickHeight();
			var innerSpacing = spacing - 2 * milestoneRadius;
			var totalTickWidth = numTicks * tickWidth;
			var tickSpacing = (innerSpacing - totalTickWidth) / (numTicks + 1) + tickWidth;

			for (var j = 0; j < numTicks; j++) {
				milestone.add({
					type: 'timeline_tick',
					translationX: milestoneRadius + tickSpacing * (j + 1) - tickWidth / 2,
					width: tickWidth,
					height: tickHeight,
					flags: flagMap[i + '-' + j]
				});
			}
		}, this);

		this.add({
			type: 'timeline_milestone',
			text: 'Finished',
			translationX: spacing * numMilestones / 2
		});
	},
	getFlagMap: function (flags) {
		return flags.reduce(function (map, flag) {
			var hash = flag.milestone + '-' + flag.tick;
			if (!map[hash]) {
				map[hash] = [];
			}
			map[hash].push(flag);
			return map;
		}, {});
	}
});
