Ext.define('Visualytics.view.dashboard.TableOverviewModel', {
	extend: 'Ext.app.ViewModel',
	require: 'Visualytics.store.Table',
	alias: 'viewmodel.tableoverview',

	stores: {
		table: 'table'
	},

	data: {
		table: ''
	}
});

