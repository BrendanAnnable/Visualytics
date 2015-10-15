Ext.define('Visualytics.view.dashboard.timeline.Timeline', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.draw.Container',
		'Visualytics.view.dashboard.timeline.TimelineController',
		'Visualytics.view.dashboard.timeline.sprites.Timeline'
	],
	xtype: 'timeline',
	controller: 'timeline',
	layout: 'fit',
	items: [{
		xtype: 'draw',
		reference: 'canvas',
		layout: 'fit',
		gradients: [{
			id: 'flag',
			type: 'linear',
			stops: [{
				offset: 0,
				color: '#d00'
			}, {
				offset: 1,
				color: '#f44'
			}]
		}],
		listeners: {
			bodyresize: 'onResize'
		}
	}],
	state: {
		edges: [],
		flags: []
	},
	size: null,
	resize: function (drawContainer, size) {
		this.size = size;
		this.redraw();
	},
	redraw: function () {
		var drawContainer = this.lookupReference('canvas');
		var surface = drawContainer.getSurface();
		var size = this.size;

		surface.removeAll(true);

		var timeline = surface.add({
			type: 'timeline',
			width: size.width * 0.9,
			translationX: size.width / 2,
			translationY: size.height / 2,
			edges: this.state.edges,
			flags: this.state.flags
		});
		timeline.init();
		surface.renderFrame();
	}
});
