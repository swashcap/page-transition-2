(function (window, Backbone) {
    'use strict';

    var App = window.App || {};
    var basedir = App.Helpers.stripLeadingSlash(App.Helpers.getBasedir());
    var routes = {};

    routes[basedir] = 'home';
    routes[basedir + 'post/:year/:month/:title/'] = 'post';
    routes[basedir + 'page/:title/'] = 'page';

    var Router = Backbone.Router.extend({
        routes: routes
    });

    App.Router = new Router();

    window.App = App;
})(window, Backbone);
