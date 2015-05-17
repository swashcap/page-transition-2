(function (window, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.PageView = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry page',
        template: _.template($('#template-page').html()),

        initialize: function (model) {
            this.model = model;
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(window, _, Backbone);
