(function (window, _, $) {
    'use strict';

    var App = window.App || {};

    App.Views.PostView = Backbone.View.extend({
        tagName: 'article',
        className: 'hentry article--post',
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
            model.permalink = App.Helpers.urlFromModel(this.model);

            this.$el.html(this.template(model));

            return this;
        },
        events: {
            'click a': 'goToPost'
        },
        goToPost: function (e) {
            e.preventDefault();

            App.Router.navigate(
                App.Helpers.stripLeadingSlash($(e.target).attr('href')),
                {trigger: true}
            );
        },
        close: function () {
            this.model = null;
            this.remove();
        }
    });
})(window, _, jQuery);
