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

		this.drawTable(surface, width, height);

		surface.renderFrame();
	},
	drawTable: function (surface, width, height) {
		var padding = width * height * 0.5 * 0.0004;
		surface.add({
			type: 'rect',
			fillStyle: this.getViewModel().get('table.color'),
			radius: 15,
			width: width - 2 * padding,
			height: height - 2 * padding,
			x: padding,
			y: padding,
			strokeStyle: '#333',
			lineWidth: Math.min(10, padding)
		});
		surface.add({
			type: 'text',
			text: 'Table ' + this.getViewModel().get('table.id'),
			x: width / 2,
			y: height / 3.5,
			fontSize: 24,
			fillStyle: '#000',
			textAlign: 'center'
		});
		this.drawProgress(surface, width, height);
	},
	drawProgress: function (surface, width, height) {
		var widthBetween = width / 7;
		var radius = width * 0.07;
		var n = 4;
		surface.add({
			type: 'line',
			strokeStyle: '#888',
			lineWidth: 10,
			fromX: width / 2 - 1.5 * (widthBetween / 2 + 2 * radius),
			fromY: height / 2,
			toX: width / 2 + 1.5 * (widthBetween / 2 + 2 * radius),
			toY: height / 2
		});
		var progress = this.getViewModel().get('table.progress');
		var activities = [
			{offset: -1.5, color: progress === 1 ? '#db4437' : '#555'},
			{offset: -0.5, color: progress === 2 ? '#f4b400' : '#555'},
			{offset: 0.5, color: progress === 3 ? '#0f9d58' : '#555'},
			{offset: 1.5, color: progress === 4 ? '#0f9d58' : '#555'}
		];
		activities.forEach(function (activity) {
			surface.add({
				type: 'circle',
				fillStyle: activity.color,
				r: radius,
				x: width / 2 + activity.offset * (widthBetween / 2 + 2 * radius),
				y: height / 2
			});
		});
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
