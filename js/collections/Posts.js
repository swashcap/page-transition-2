(function (window, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Collections.Posts = Backbone.Collection.extend({
        model: App.Models.Post
    });
})(window, Backbone);
