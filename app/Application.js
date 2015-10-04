/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.define('Visualytics.draw.sprite.Sprite', function () {
	var matrix = Ext.create('Ext.draw.Matrix');
	return {
		override: 'Ext.draw.sprite.Sprite',
		getMatrix: function () {
			return this.attr.matrix;
		},
		getWorldMatrix: function () {
			matrix.reset();
			var parent = this.getParent();
			while (parent && (parent instanceof Ext.draw.sprite.Sprite)) {
				matrix.prependMatrix(parent.matrix || parent.attr && parent.attr.matrix);
				parent = parent.getParent();
			}
			return matrix;
		}
	}
}());

Ext.define('Visualytics.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Visualytics',

    stores: [
        'Visualytics.store.Table'
    ],
    
    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
