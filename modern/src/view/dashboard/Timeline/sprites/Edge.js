Ext.define('Visualytics.view.dashboard.timeline.sprites.Edge', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_edge',
	requires: [
		'Visualytics.view.dashboard.timeline.sprites.Tick',
		'Visualytics.view.dashboard.timeline.sprites.Flag'
	],
	width: null,
	config: {
		text: null,
		textX: 0,
		textY: 20,
		from: null,
		to: null,
		edgeWidth: 10,
		numTicks: 0,
		tickWidth: 3,
		tickHeight: 25,
		flags: null,
		innerOffset: 0
	},
	constructor: function () {
		this.callParent(arguments);

		var from = this.getFrom();
		var to = this.getTo();

		var mid = to.clone().add(from).div(2);
		var diff = to.clone().sub(from);

		var angle = Math.atan2(diff.y, diff.x);
		var width = this.width = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
		var barHeight = this.getEdgeWidth();

		this.setAttributes({
			translationX: mid.x,
			translationY: mid.y,
			rotationCenterX: 0,
			rotationCenterY: 0,
			rotationRads: angle
		});

		this.add({
			type: 'rect',
			x: -width / 2,
			y: -barHeight / 2,
			width: width,
			height: barHeight,
			fillStyle: '#333'
		});

		var text = this.getText();
		if (text) {
			this.add({
				type: 'text',
				text: text,
				textAlign: 'center',
				textBaseline: 'top',
				fontSize: '1.2em',
				translationX: this.getTextX(),
				translationY: this.getTextY()
			});
		}

		this.addTicks();
	},
	addTicks: function () {
		var numTicks = this.getNumTicks();
		var tickWidth = this.getTickWidth();
		var flagMap = this.getFlagMap(this.getFlags());

		var innerWidth = this.width - 2 * this.getInnerOffset() + tickWidth;
		var tickSpacing = innerWidth / (numTicks + 1);

		for (var i = 0; i < numTicks; i++) {
			var scaleX = i - (numTicks - 1) / 2;
			this.add({
				type: 'timeline_tick',
				translationX: tickSpacing * scaleX,
				width: tickWidth,
				height: this.getTickHeight()
			});
			var flags = flagMap[i];
			if (flags) {
				// TODO: Handle multiple flags correctly
				flags.forEach(function () {
					this.add({
						translationX: tickSpacing * scaleX,
						type: 'timeline_flag'
					});
				}, this);
			}
		}
	},
	getFlagMap: function (flags) {
		return flags.reduce(function (map, flag) {
			var hash = flag.tick;
			if (!map[hash]) {
				map[hash] = [];
			}
			map[hash].push(flag);
			return map;
		}, {});
	}
});
