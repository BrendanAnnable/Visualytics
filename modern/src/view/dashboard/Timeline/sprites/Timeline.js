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
		var flags = this.getFlags();
		var numMilestones = milestones.length;
		var sectionWidth = width / (numMilestones + 1);
		var flagMap = flags.reduce(function (map, flag) {
			var hash = flag.milestone + '-' + flag.tick;
			if (!map[hash]) {
				map[hash] = [];
			}
			map[hash].push(flag);
			return map;
		}, {});

		var milestoneRadius = this.getMilestoneRadius();

		milestones.forEach(function (milestoneInfo, i) {

			var milestone = this.add({
				type: 'timeline_milestone',
				text: milestoneInfo.label,
				radius: milestoneRadius,
				translationX: sectionWidth * (2 * i - numMilestones) / 2
			});

			var numTicks = milestoneInfo.numTicks;
			var tickWidth = this.getTickWidth();
			var tickHeight = this.getTickHeight();
			var tickSectionWidth = sectionWidth - 2 * milestoneRadius;
			var totalTickWidth = numTicks * tickWidth;
			var tickSpacing = (tickSectionWidth - totalTickWidth) / (numTicks + 1) + tickWidth;

			for (var j = 0; j < numTicks; j++) {
				var tickX = milestoneRadius + tickSpacing * (j + 1) - tickWidth / 2;
				var hash = i + '-' + j;
				milestone.add({
					type: 'timeline_tick',
					translationX: tickX,
					width: tickWidth,
					height: tickHeight,
					flags: flagMap[hash]
				});
			}
		}, this);

		this.add({
			type: 'timeline_milestone',
			text: 'Finished',
			translationX: sectionWidth * numMilestones / 2
		});
	}
});
