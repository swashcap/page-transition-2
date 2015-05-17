(function (window, _, $) {
    'use strict';

    var App = window.App || {};

    App.Views.PostView = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry',
        template: _.template($('#template-post').html()),
        initialize: function (model) {
            this.model = model;
            this.render();
        },
        render: function () {
            var model = this.model.toJSON();

            if (model.date) {
                model.date = App.Helpers.formatDate(model.date);
            }

            this.$el.html(this.template(model));

            return this;
        },
        events: {
            'click a': 'goToPost'
        },
        goToPost: function (e) {
            e.preventDefault();

            console.log(this);
        }
    });
})(window, _, jQuery);
