(function (window, _, Backbone) {
    'use strict';

    var App = window.App || {};

    App.Views.PostListView = Backbone.View.extend({
        initialize: function (collection) {
            this.collection = collection;
            this.views = [];
            this.render();
        },
        render: function () {
            var self = this;

            if (this.collection) {
                _.forEach(this.collection.models, function (model) {
                    var view = new App.Views.PostView(model);

                    self.views.push(view);
                    self.$el.append(view.$el);
                });
            }

            return this;
        },
        close: function () {
            _.each(this.views, function (view) {
                view.close();
            });

            this.collection = null;
            this.remove();
        }
    });
})(window, _, Backbone);
