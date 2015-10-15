Ext.define('Visualytics.view.dashboard.timeline.sprites.Tick', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_tick',
	requires: [
		'Visualytics.view.dashboard.timeline.sprites.Flag'
	],
	config: {
		width: 3,
		height: 25,
		flags: null
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();
		var height = this.getHeight();
		var flags = this.getFlags();

		if (flags) {
			// Add each flag
			// TODO: Handle multiple flags correctly
			flags.forEach(function (flag, i) {
				this.add({
					type: 'timeline_flag',
					color: flag.color,
					height: 100 + i * 30
				});
			}, this);
		}
		else {
			// Only add a tick if there is no flags
			this.add({
				type: 'rect',
				x: -width / 2,
				y: -height / 2,
				width: width,
				height: height,
				fillStyle: '#333'
			});
		}
	}
});
