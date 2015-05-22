(function (window, $, _) {
    'use strict';

    var App = window.App || {};

    App.Views.PostSingle = App.Views.PageView.extend({
        template: _.template($('#template-post-single').html()),
        render: function () {
            var data = this.model.toJSON();

            data.permalink = App.Helpers.urlFromModel(this.model);

            if (data.date) {
                data.date = App.Helpers.formatDate(data.date);
            }

            this.$el.html(this.template(data));
            return this;
        }
    });
})(window, jQuery, _);
