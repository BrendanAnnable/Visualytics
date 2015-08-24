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

	//formulas: {
	//	first: function (get) {
	//		return get('table').getById(1);
	//	}
	//}


});

