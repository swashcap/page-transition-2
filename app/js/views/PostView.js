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
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        events: {
            'click a': 'goToPost'
        },
        goToPost: function (e) {
            e.preventDefault();

            console.log(this)
        }
    });
})(window, _, jQuery);
