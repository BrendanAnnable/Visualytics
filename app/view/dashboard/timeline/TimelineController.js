Ext.define('Visualytics.view.dashboard.timeline.TimelineController', {
	extend: 'Ext.app.ViewController',
	requires: 'Visualytics.util.Network',
	alias: 'controller.timeline',

	init: function () {
		Visualytics.Network.on('state', function (state) {
			var view = this.getView();
			view.state = state;
			view.redraw();
		}, this);
	},

	onResize: function (drawContainer, size) {
		this.getView().resize(drawContainer, size);
	}
});
