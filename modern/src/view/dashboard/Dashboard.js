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
			xtype: 'table_overview'
		}, {
			xtype: 'table_overview'
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
			xtype: 'table_overview'
		}, {
			xtype: 'table_overview'
		}]
	}]
});
