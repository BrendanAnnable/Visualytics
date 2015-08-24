Ext.define('Visualytics.view.dashboard.Dashboard', {
	extend: 'Ext.container.Container',
	requires: 'Visualytics.view.dashboard.TableOverview',
	xtype: 'dashboard',
	title: 'Dashboard!',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1
	},
	items: [{
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		defaults: {
			flex: 1
		},
		items: [{
			xtype: 'table_overview',
			tableId: 1
		}, {
			xtype: 'table_overview',
			tableId: 2
		}]
	}, {
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		defaults: {
			flex: 1
		},
		items: [{
			xtype: 'table_overview',
			tableId: 3
		}, {
			xtype: 'table_overview',
			tableId: 4
		}]
	}]
});
