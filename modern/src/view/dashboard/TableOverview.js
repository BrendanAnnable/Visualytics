Ext.define('Visualytics.view.dashboard.TableOverview', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.draw.Container',
		'Visualytics.view.dashboard.TableOverviewController',
		'Visualytics.view.dashboard.TableOverviewModel'
	],
	xtype: 'table_overview',
	controller: 'tableoverview',
	viewModel: 'tableoverview',
	layout: 'fit',
	config: {
		tableId: null
	},
	style: {
		background: 'red'
	},
	listeners: {
		resize: 'onResize'
	},
	items: [{
		xtype: 'draw',
		reference: 'canvas'
	}],
	redraw: function (width, height) {
		var canvas = this.lookupReference('canvas');
		var surface = canvas.getSurface();

		canvas.setSize(width, height);
		surface.removeAll(true);
		surface.setSize(width, height);
		surface.setRect([0, 0, width, height]);

		var padding = 30;
		surface.add({
			type: 'rect',
			fillStyle: this.getViewModel().get('table.color'),
			radius: 15,
			width: width - 2 * padding,
			height: height - 2 * padding,
			x: padding,
			y: padding,
			strokeStyle: '#333',
			lineWidth: 15
		});

		surface.renderFrame();
	},
	initialize: function () {
		var viewModel = this.getViewModel();

		viewModel.set('table', viewModel.getStore('table').findRecord('id', this.getTableId()));
		viewModel.bind('{table.color}', function (color) {
			var surface = this.lookupReference('canvas').getSurface();
			surface.getItems().forEach(function (sprite) {
				sprite.setAttributes({fillStyle: color});
			});
			surface.renderFrame();
		}, this);

		this.callParent();
	}
});
