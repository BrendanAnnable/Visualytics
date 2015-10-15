Ext.define('Visualytics.view.dashboard.timeline.sprites.Flag', {
	extend: 'Ext.draw.sprite.Composite',
	alias: 'sprite.timeline_flag',
	config: {
		width: 3,
		height: 100,
		offset: 25 / 2,
		baseWidth: 4,
		flagWidth: 30,
		flagHeight: 20,
		flagCutAngleDeg: 45,
		color: '#f00',
		up: true
	},
	constructor: function () {
		this.callParent(arguments);

		var width = this.getWidth();
		var height = this.getHeight();
		var color = this.getColor();

		if (!this.getUp()) {
			this.setAttributes({
				scalingCenterY: 0,
				scalingY: -1
			});
		}

		// Flag pole
		this.add({
			type: 'rect',
			x: -width / 2,
			y: -height,
			width: width,
			height: height + this.getOffset(),
			fillStyle: color
		});

		// Flag pole base
		this.add({
			type: 'circle',
			r: this.getBaseWidth(),
			fillStyle: '#fff',
			strokeStyle: color,
			lineWidth: this.getBaseWidth() / 2
		});

		var flagWidth = this.getFlagWidth();
		var flagHeight = this.getFlagHeight();
		var flagHeightHalf = flagHeight / 2;
		var tanAngle = Math.tan(this.getFlagCutAngleDeg() * Math.PI / 180);
		var cutWidth = flagHeightHalf / tanAngle;

		// Flag
		this.add({
			type: 'path',
			path: Ext.String.format(
				'm {0} {1} h {3} l {4} {6} l {5} {6} h {2}',
				width / 2, -height + 1, -flagWidth, flagWidth, -cutWidth, cutWidth, flagHeightHalf
			),
			fillStyle: color,
			lineWidth: 1
		});
	}
});
