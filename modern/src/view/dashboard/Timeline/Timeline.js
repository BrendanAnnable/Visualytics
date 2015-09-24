Ext.define('Visualytics.view.dashboard.timeline.Timeline', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.draw.Container',
		'Visualytics.view.dashboard.timeline.TimelineController'
	],
	xtype: 'timeline',
	controller: 'timeline',
	layout: 'fit',
	items: [{
		xtype: 'draw',
		layout: 'fit',
		reference: 'draw',
		listeners: {
			bodyresize: 'onResize'
		}
	}],
	redraw: function (draw, size) {
		var surface = draw.getSurface();

		surface.removeAll(true);

		var timeline = this.drawTimeline(surface, {
			width: size.width * 0.9
		});
		timeline.setAttributes({
			translationX: size.width / 2,
			translationY: 3 * size.height / 4
		});
		surface.add(timeline);
	},
	drawTimeline: function (parent, config) {
		Ext.applyIf(config, {
			width: 320
		});

		var timeline = parent.add({
			type: 'composite'
		});

		var mainTicks = [
			{label: 'Case Information', numTicks: 5},
			{label: 'Issues & Evidence', numTicks: 8},
			{label: 'Goals & Actions', numTicks: 4},
			{label: 'Goals & Actions', numTicks: 2}
		];

		var flags = [
			{mainTick: 0, tick: 3},
			{mainTick: 0, tick: 1},
			{mainTick: 1, tick: 6},
			{mainTick: 1, tick: 2},
			{mainTick: 2, tick: 3}
		];

		this.drawTicks(timeline, {
			width: config.width,
			mainTicks: mainTicks,
			flags: flags
		});

		return timeline;
	},
	drawTicks: function (parent, config) {
		Ext.applyIf(config, {
			width: 320,
			height: 10,
			mainTickRadius: 20,
			tickWidth: 3,
			tickHeight: 25,
			flags: []
		});

		var baseline = parent.add({
			type: 'composite'
		});

		baseline.add({
			type: 'rect',
			x: -config.width / 2,
			y: -config.height / 2,
			width: config.width,
			height: config.height,
			fillStyle: '#333'
			//strokeStyle: '#000',
			//lineWidth: 2
		});

		var numMainTicks = config.mainTicks.length;
		var sectionWidth = config.width / numMainTicks;
		var flagMap = config.flags.reduce(function (map, flag) {
			var hash = flag.mainTick + '-' + flag.tick;
			if (!map[hash]) {
				map[hash] = [];
			}
			map[hash].push(flag);
			return map;
		}, {});
		config.mainTicks.forEach(function (mainTick, i) {
			var mainTickX = sectionWidth * (2 * i - numMainTicks + 1) / 2;
			var mainTickContainer = baseline.add({
				type: 'composite',
				translationX: mainTickX
			});
			mainTickContainer.add({
				type: 'circle',
				r: config.mainTickRadius,
				fillStyle: '#333'
				//strokeStyle: '#000',
				//lineWidth: 2
			});
			mainTickContainer.add({
				type: 'text',
				text: mainTick.label,
				textAlign: 'center',
				textBaseline: 'top',
				fontSize: '1.2em',
				translationY: config.mainTickRadius + 10
			});
			var numTicks = mainTick.numTicks;
			var tickSectionWidth = sectionWidth - 2 * config.mainTickRadius;
			var totalTickWidth = numTicks * config.tickWidth;
			var tickSpacing = (tickSectionWidth - totalTickWidth) / (numTicks + 1) + config.tickWidth;
			for (var j = 0; j < numTicks; j++) {
				var tickX = config.mainTickRadius + tickSpacing * (j + 1) - config.tickWidth / 2;
				var tick = mainTickContainer.add({
					type: 'composite',
					translationX: tickX
				});
				tick.add({
					type: 'rect',
					x: -config.tickWidth / 2,
					y: -config.tickHeight / 2,
					width: config.tickWidth,
					height: config.tickHeight,
					fillStyle: '#333'
				});
				var hash = i + '-' + j;
				var flags = flagMap[hash];
				if (flags) {
					flags.forEach(function (flag) {
						this.drawFlag(tick, {
							flag: flag
						});
					}, this);
				}
			}
		}, this);

		return baseline;
	},
	drawFlag: function (parent, config) {
		Ext.applyIf(config, {
			width: 3,
			height: 100
		});
		var flag = parent.add({
			type: 'composite'
		});

		flag.add({
			type: 'rect',
			x: -config.width / 2,
			y: -config.height,
			width: config.width,
			height: config.height,
			fillStyle: '#f00'
		});

		flag.add({
			type: 'path',
			path: 'm 0 -100 l 30 0 l -10 10 l 10 10 l -30 0',
			fillStyle: '#d00'
		});


		return flag
	}
});
