Ext.define('Visualytics.view.dashboard.TableOverview', {
	extend: 'Ext.Panel',
	requires: 'Ext.draw.Container',
	xtype: 'table_overview',
	layout: 'fit',
	items: [{
		xtype: 'draw',
		width: 200,
		height: 200,
		sprites: [{
			type: 'circle',
			fillStyle: '#79BB3F',
			r: 100,
			x: 100,
			y: 100
		}]
	}]
});
