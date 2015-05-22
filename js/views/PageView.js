(function (window, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.PageView = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry article--page',
        template: _.template($('#template-page').html()),
        initialize: function (model) {
            this.model = model;
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .article__navigation a': 'navigateBack'
        },
        navigateBack: function (e) {
            e.preventDefault();

            App.Router.navigate(App.Helpers.getBasedir(), {trigger: true});
        },
        close: function () {
            this.model = null;
            this.remove();
        }
    });
})(window, _, Backbone);
