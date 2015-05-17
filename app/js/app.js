(function (window, _, Backbone) {
    'use strict';

    _.mixin({
        'kebabCase': function (word) {
            return word .trim().toLowerCase().replace(' ', '-');
        }
    });

    var posts = [{
        title: 'Pellentesque Imperdiet Tempor Varius',
        excerpt: 'Pellentesque blandit, ipsum in imperdiet venenatis, mi elit faucibus odio, id condimentum ante enim sed lectus. Aliquam et odio non odio pellentesque pulvinar.',
        date: new Date(2015, 4, 2)
    }, {
        title: 'Vestibulum a erat dolor',
        excerpt: 'Integer pretium risus sit amet nisl volutpat nec venenatis magna egestas. Ut bibendum felis eu tellus laoreet eleifend.',
        date: new Date(2015, 4, 10)
    }, {
        title: 'Nam pulvinar',
        excerpt: 'Auctor tortor, eu iaculis leo vestibulum quis. In euismod risus ac purus vehicula et fermentum ligula consectetur. Vivamus condimentum tempus lacinia.',
        date: new Date(2015, 4, 9)
    }, {
        title: 'Curabitur vestibulum, enim in',
        excerpt: 'Tempor bibendum, ante diam venenatis tellus, eu sollicitudin libero ex eget lacus. Phasellus eu erat at enim rhoncus varius eget vitae urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        date: new Date(2015, 4, 8)
    }, {
        title: 'Quisque sit amet mattis tortor',
        excerpt: 'Sed porttitor finibus consectetur. Proin metus metus, volutpat nec porta non, semper et risus. Proin aliquam odio vel efficitur consequat.',
        date: new Date(2015, 4, 7)
    }, {
        title: 'Donec non venenatis nisl',
        excerpt: 'Sed eleifend tortor et maximus vulputate. Etiam condimentum fermentum massa eu elementum. Vivamus eros nisl, lobortis sed auctor nec, pharetra sit amet nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: new Date(2015, 4, 6)
    }];

    var App = window.App || {};

    var Store = {
        _models: [],
        _collections: [],
        initialize: function () {
            var self = this;
            var collection = new App.Collections.Posts();

            _.each(posts, function (post) {
                var model = new App.Models.Post(post);

                collection.add(model);
                self._models.push(model);
            });

            this._collections.push(collection);
        }
    };
    var Controller = {
        _view: null,
        _model: null,
        _collection: null,

        setup: function (type, options) {
            this.reset();

            switch (type) {
                case 'home':
                    this._collection =
                        _.find(Store._collections, function (collection) {
                            return collection instanceof App.Collections.Posts;
                        });

                        console.log(this._collection);

                    this._view = App.Views.PostListView;
                    break;
                case 'post':
                    this._model = _.find(Store._models, function (model) {
                        return (
                            model instanceof App.Models.Post &&
                            _(model.get('title')).kebabCase() === options
                        );
                    });
                    this._view = App.Views.PostView;
                    break;
                case 'page':
                    this._model = _.find(Store._models, function (model) {
                        return (
                            model instanceof App.Models.Page &&
                            _(model.get('title')).kebabCase() === options
                        );
                    });
                    this._view = App.Views.PageView;
                    break;
            }
        },
        reset: function () {
            if (this._view) {
                this._view = null;
            }
            if (this._model) {
                this._model = null;
            }
            if (this._collection) {
                this._collection = null;
            }
        }
    };

    App.init = function () {
        var appView = new App.Views.AppView();
        var view;

        Store.initialize();

        this.Router.on('route:home', function () {
            Controller.setup('home');

            view = new Controller._view(Controller._collection);
            appView.render(view);
        });
        this.Router.on('route:page', function (title) {
            Controller.setup('page', title);
            console.log('Page route.', title);
        });
        this.Router.on('route.post', function (year, month, title) {
            Controller.setup('post', title);
            console.log('Post route', title);
        });

        Backbone.history.start({pushState: true});
    };

    App.Views = {};
    App.Models = {};
    App.Collections = {};
    App.Helpers = {
        formatDate: function (date) {
            return window.moment(date).fromNow();
        }
    };

    window.App = App;
})(window, _, Backbone);
