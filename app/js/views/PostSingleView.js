(function (window, $, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.PostSingle = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry page',
        template: _.template($('#template-post-single').html()),
        initialize: function (model) {
            this.model = model;
            this.render();
        },
        render: function () {
            var data = this.model.toJSON();

            data.permalink = App.Helpers.urlFromModel(this.model);

            this.$el.html(this.template(data));
            return this;
        },
        close: function () {
            this.model = null;
            this.remove();
        }
    });
})(window, jQuery, _, Backbone);
