Ext.define('Visualytics.view.dashboard.Dashboard', {
	extend: 'Ext.container.Container',
	requires: 'Visualytics.view.dashboard.timeline.Timeline',
	xtype: 'dashboard',
	layout: 'fit',
	items: [{
		xtype: 'timeline'
	}]
});
