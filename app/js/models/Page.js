(function (window, $, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Models.Page = Backbone.Model.extend({
        defaults: {
            content: '',
            slug: '',
            title: ''
        }
    });
})(window, jQuery, Backbone);
