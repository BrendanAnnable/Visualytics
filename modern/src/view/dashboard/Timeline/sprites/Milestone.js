Ext.define('Visualytics.view.dashboard.timeline.sprites.Milestone', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_milestone',
	config: {
		text: null,
		radius: 20,
		finished: false
	},
	constructor: function () {
		this.callParent(arguments);

		this.add({
			type: 'circle',
			r: this.getRadius(),
			fillStyle: this.getFinished() ? '#eee': '#555',
			strokeStyle: '#333',
			lineWidth: 6
		});

		var text = this.getText();
		if (text) {
			this.add({
				type: 'text',
				text: text,
				textAlign: 'center',
				textBaseline: 'top',
				fontSize: '1.2em',
				translationY: this.getRadius() + 10
			});
		}
	}
});
