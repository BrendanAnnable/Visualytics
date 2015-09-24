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
			flags.forEach(function () {
				this.add({
					type: 'timeline_flag'
				});
			}, this);
		}
		else {
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
