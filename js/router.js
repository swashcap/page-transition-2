(function (window, Backbone) {
    'use strict';

    var App = window.App || {};

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'post/:year/:month/:title/': 'post',
            'page/:title/': 'page'
        }
    });

    App.Router = new Router();

    window.App = App;
})(window, Backbone);
