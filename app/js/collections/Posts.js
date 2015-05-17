(function (window, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Collections.Posts = Backbone.Collection.extend({
        model: App.Models.Post,
        comparator: function (a, b) {
            var aDate = a.get('date');
            var bDate = b.get('date');

            if (aDate instanceof Date && bDate instanceof Date) {
                return aDate.getTime() < bDate.getTime() ? 1 : -1;
            } else {
                return 0;
            }
        },
        url: '/posts'
    });
})(window, Backbone);
