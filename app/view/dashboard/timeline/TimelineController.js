Ext.define('Visualytics.view.dashboard.timeline.TimelineController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.timeline',

	onResize: function (drawContainer, size) {
		this.getView().redraw(drawContainer, size);
	}
});
