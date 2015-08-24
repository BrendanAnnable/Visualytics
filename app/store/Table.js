Ext.define('Visualytics.store.Table', {
	extend: 'Ext.data.Store',

	alias: 'store.table',
	storeId: 'table',

	model: 'Visualytics.model.Table',

	data: { items: [
		{ id: 1, color: '#4285f4' },
		{ id: 2, color: '#db4437' },
		{ id: 3, color: '#f4b400' },
		{ id: 4, color: '#0f9d58' }
	]},

	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			rootProperty: 'items'
		}
	}
});


