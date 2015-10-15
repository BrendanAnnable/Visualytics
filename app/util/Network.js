Ext.define('Visualytics.util.Network', {
	singleton: true,
	alternateClassName: 'Visualytics.Network',
	mixins: {
		observable: 'Ext.mixin.Observable'
	},
	socket: null,
	state: null,
	constructor: function (config) {
		this.mixins.observable.constructor.call(this, config);
		this.setupSocket();
	},
	setupSocket: function () {
		this.socket = io.connect('http://192.168.242.179:8765');
		this.socket.on('state', function (state) {
			this.state = state;
			this.fireEvent('state', state);
		}.bind(this));
	}
});
