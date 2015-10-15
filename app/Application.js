/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.define('Visualytics.draw.sprite.Sprite', {
	override: 'Ext.draw.sprite.Sprite',
	getMatrix: function () {
		return this.attr.matrix;
	},
	getWorldMatrix: function () {
		var matrix = this.attr.matrix.clone();
		var parent = this.getParent();
		while (parent && (parent instanceof Ext.draw.sprite.Sprite)) {
			matrix.prependMatrix(parent.matrix || parent.attr && parent.attr.matrix);
			parent = parent.getParent();
		}
		return matrix;
	},
	getRelativeTo: function (sprite) {
		return sprite.getWorldMatrix().inverse().appendMatrix(this.getWorldMatrix());
	},
	moveTo: function (composite) {
		var newLocal = this.getRelativeTo(composite).split();
		var x = newLocal.translateX;
		var y = newLocal.translateY;
		var angle = newLocal.rotation;

		composite.add(this);
		var oldDuration = this.fx.getDuration();

		this.fx.setDuration(0);
		flag3.setAttributes({translationX: x, translationY: y, rotationRads: angle});
		this.fx.setDuration(oldDuration);

		return this;
	}
});

Ext.define('Visualytics.draw.sprite.Composite', {
	override: 'Ext.draw.sprite.Composite',
	add: function (sprite) {
		if (sprite.isSprite) {
			var parent = sprite.getParent();
			if (parent && parent instanceof Ext.draw.sprite.Composite) {
				parent.removeSprite(sprite);
			}
		}

		sprite = this.callParent(arguments);

		if (sprite.isSprite) {
			var parent = sprite.getParent();
			if (!parent) {
				sprite.setParent(this);
				sprite.setSurface(this.getSurface());
			}
		}
		return sprite;
	},
	removeSprite: function (sprite) {
		this.sprites.splice(this.sprites.indexOf(sprite), 1);
		delete this.sprites.map[sprite.id];
		sprite.setParent(null);
		sprite.setSurface(null);
	}
});

Ext.define('Visualytics.Application', {
    extend: 'Ext.app.Application',

	requires: [
		'Visualytics.util.Network'
	],
    
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
