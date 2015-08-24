/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Visualytics.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Visualytics.view.main.MainController',
        'Visualytics.view.dashboard.Dashboard'
    ],

    controller: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [
        {
            title: 'Dashboard',
            iconCls: 'x-fa fa-home',
            layout: 'fit',
            items: [{
                xtype: 'dashboard'
            }]
        }, {
            title: 'Settings',
            iconCls: 'x-fa fa-cog',
            html: 'sup'
        }
    ]
});
