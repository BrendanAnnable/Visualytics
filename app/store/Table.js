Ext.define('Visualytics.store.Table', {
	extend: 'Ext.data.Store',

	alias: 'store.table',
	storeId: 'table',

	model: 'Visualytics.model.Table',

	data: { items: [
		{ id: 1, color: '#eee', progress: 1 },
		{ id: 2, color: '#eee', progress: 2 },
		{ id: 3, color: '#eee', progress: 2 },
		{ id: 4, color: '#eee', progress: 3 }
	]},

	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			rootProperty: 'items'
		}
	}
});


