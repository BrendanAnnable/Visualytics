Ext.define('Visualytics.view.dashboard.TableOverviewController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.tableoverview',

	onResize: function () {
		this.resize();
	},

	resize: function () {
		var view = this.getView();
		var canvas = this.lookupReference('canvas');

		var width = view.el.getWidth();
		var height = view.el.getHeight();

		if (canvas.getWidth() !== width || canvas.getHeight() !== height) {

			canvas.setSize(width, height);

		}
	}

});

