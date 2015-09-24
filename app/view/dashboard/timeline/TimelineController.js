Ext.define('Visualytics.view.dashboard.timeline.TimelineController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.timeline',

	onResize: function (draw, size) {
		this.getView().redraw(draw, size);
	}
});
