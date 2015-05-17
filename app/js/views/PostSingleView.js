(function (window, $, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.PostSingle = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry post-single',
        template: _.template($('#template-post-single').html()),
        initialize: function (model) {
            this.model = model;
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        close: function () {
            this.model = null;
            this.remove();
        }
    });
})(window, jQuery, _, Backbone);
