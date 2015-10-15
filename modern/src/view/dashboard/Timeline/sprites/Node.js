Ext.define('Visualytics.view.dashboard.timeline.sprites.Node', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_node',
	config: {
		radius: 20,
		lineWidth: 6,
		flags: null
	},
	constructor: function () {
		this.callParent(arguments);

		this.add({
			type: 'circle',
			r: this.getRadius() - this.getLineWidth() / 2,
			fillStyle: '#eee', //: '#555',
			strokeStyle: '#333',
			lineWidth: this.getLineWidth()
		});

		var flags = this.getFlags();
		if (flags) {
			flags.forEach(function (flag, i) {
				// TODO: Handle multiple flags correctly
				this.add({
					type: 'timeline_flag',
					color: flag.color,
					height: 100 + i * 30
				});
			}, this);
		}
	}
});
