Ext.define('Visualytics.view.dashboard.timeline.sprites.Tick', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_tick',
	requires: [
	],
	config: {
		width: 3,
		height: 25
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();
		var height = this.getHeight();

		this.add({
			type: 'rect',
			x: -width / 2,
			y: -height / 2,
			width: width,
			height: height,
			fillStyle: '#333'
		});
	}
});
