Ext.define('Visualytics.view.dashboard.TableOverview', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.draw.Container',
		'Visualytics.view.dashboard.TableOverviewController'
	],
	xtype: 'table_overview',
	controller: 'tableoverview',
	layout: 'fit',
	style: {
		background: 'red'
	},
	listeners: {
		resize: 'onResize'
	},
	items: [{
		xtype: 'draw',
		reference: 'canvas',
		resizeHandler: function (size) {
			// call default handler otherwise nothing will display!
			this.defaultResizeHandler.apply(this, arguments);

			var surface = this.getSurface();
			var width = size.width;
			var height = size.height;

			surface.removeAll(true);
			surface.setSize(width, height);

			surface.add({
				type: 'ellipse',
				fillStyle: '#4285f4',
				rx: width / 4,
				ry: height / 4,
				cx: width / 4,
				cy: height / 4
			});
			surface.add({
				type: 'ellipse',
				fillStyle: '#db4437',
				rx: width / 4,
				ry: height / 4,
				cx: 3 * width / 4,
				cy: height / 4
			});
			surface.add({
				type: 'ellipse',
				fillStyle: '#f4b400',
				rx: width / 4,
				ry: height / 4,
				cx: width / 4,
				cy: 3 * height / 4
			});
			surface.add({
				type: 'ellipse',
				fillStyle: '#0f9d58',
				rx: width / 4,
				ry: height / 4,
				cx: 3 * width / 4,
				cy: 3 * height / 4
			});
		}
	}]
});
