(function (window) {
    'use strict';

    var App = window.App || {};

    App.Models.Post = Backbone.Model.extend({
        defaults: {
            title: '',
            excerpt: '',
            date: new Date(),
            author: ''
        }
    });
})(window);
