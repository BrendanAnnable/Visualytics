Ext.define('Visualytics.view.dashboard.Dashboard', {
	extend: 'Ext.container.Container',
	requires: 'Visualytics.view.dashboard.TableOverview',
	xtype: 'dashboard',
	title: 'Dashboard!',
	layout: 'hbox',
	defaults: {
		flex: 1
	},
	items: [{
		layout: 'vbox',
		defaults: {
			flex: 1
		},
		items: [{
			xtype: 'table_overview'
		}, {
			xtype: 'table_overview'
		}]
	}, {
		layout: 'vbox',
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
