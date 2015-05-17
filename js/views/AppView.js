(function ($, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.AppView = Backbone.View.extend({
        template: _.template($('#template-app').html()),
        initialize: function () {
            this.setElement($('main'));
            this.$el.html(this.template());
            this.$container = this.$el.find('#app');
            this.render();
        },
        render: function (view) {
            // console.log(view);

            if (view instanceof Backbone.View) {
                this.$container.append(view.$el);
            }

            return this;
        },
        events: {
            'click header[role="banner"] a': 'navigate'
        },
        navigate: function (e) {
            e.preventDefault();

            var href = $(e.target).attr('href');

            if (href) {
                App.Router.navigate(href, {trigger: true});
            }
        }
    });
})(jQuery, _, Backbone);
