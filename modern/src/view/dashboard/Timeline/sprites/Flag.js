Ext.define('Visualytics.view.dashboard.timeline.sprites.Flag', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_flag',
	config: {
		width: 3,
		height: 100,
		offset: 25 / 2,
		up: true
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();
		var height = this.getHeight();

		if (!this.getUp()) {
			this.setAttributes({
				scalingCenterY: 0,
				scalingY: -1
			});
		}

		this.add({
			type: 'rect',
			x: -width / 2,
			y: -height,
			width: width,
			height: height + this.getOffset(),
			fillStyle: '#f00'
		});

		this.add({
			type: 'circle',
			r: 4,
			fillStyle: '#fff',
			strokeStyle: '#f00',
			lineWidth: 2
		});

		this.add({
			type: 'path',
			path: Ext.String.format('m {0} -{1} h 30 l -10 10 l 10 10 h -30', width / 2, height - 1),
			fillStyle: 'url(#flag)',
			strokeStyle: '#d00',
			lineWidth: 1
		});
	}
});
