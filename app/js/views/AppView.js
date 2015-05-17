(function ($, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.AppView = Backbone.View.extend({
        template: _.template($('#template-app').html()),
        initialize: function () {
            this.setElement($('main'));
            this.$el.html(this.template());
            this.$container = this.$el.find('#app');
            this._view = null;
            this.render();
        },
        render: function (view) {
            if (view && view instanceof Backbone.View) {
                if (this._view) {
                    this._view.remove();
                }

                this._view = view;
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
