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
            var model = this.model.toJSON();

            this.$el.append(this.template(model));

            return this;
        },
        close: function () {
            this.model = null;
            this.remove();
        }
    });
})(window, _, Backbone);
