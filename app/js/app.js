(function (window, _, Backbone, moment) {
    'use strict';

    /**
     * Add a 'kebab' case function to Underscore.
     *
     * @{@link  http://stackoverflow.com/a/13297540}
     */
    _.mixin({
        'kebabCase': function (word) {
            return word
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z-]/g, '')
                .toLowerCase();
        }
    });

    var posts = [{
        title: 'Pellentesque Imperdiet Tempor Varius',
        excerpt: 'Pellentesque blandit, ipsum in imperdiet venenatis, mi elit faucibus odio, id condimentum ante enim sed lectus. Aliquam et odio non odio pellentesque pulvinar.',
        date: new Date(2015, 4, 2),
        content: ''
    }, {
        title: 'Vestibulum a erat dolor',
        excerpt: 'Integer pretium risus sit amet nisl volutpat nec venenatis magna egestas. Ut bibendum felis eu tellus laoreet eleifend.',
        date: new Date(2015, 4, 10),
        content: ''
    }, {
        title: 'Nam pulvinar',
        excerpt: 'Auctor tortor, eu iaculis leo vestibulum quis. In euismod risus ac purus vehicula et fermentum ligula consectetur. Vivamus condimentum tempus lacinia.',
        date: new Date(2015, 4, 9),
        content: ''
    }, {
        title: 'Curabitur vestibulum, enim in',
        excerpt: 'Tempor bibendum, ante diam venenatis tellus, eu sollicitudin libero ex eget lacus. Phasellus eu erat at enim rhoncus varius eget vitae urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        date: new Date(2015, 4, 8),
        content: ''
    }, {
        title: 'Quisque sit amet mattis tortor',
        excerpt: 'Sed porttitor finibus consectetur. Proin metus metus, volutpat nec porta non, semper et risus. Proin aliquam odio vel efficitur consequat.',
        date: new Date(2015, 4, 7),
        content: ''
    }, {
        title: 'Donec non venenatis nisl',
        excerpt: 'Sed eleifend tortor et maximus vulputate. Etiam condimentum fermentum massa eu elementum. Vivamus eros nisl, lobortis sed auctor nec, pharetra sit amet nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: new Date(2015, 4, 6),
        content: ''
    }];

    var pages = [{
        title: 'Pellentesque Sed Condimentum Sem',
        slug: 'link-1',
        content: '<p>Nullam magna erat, <em>faucibus vel tortor</em> non, posuere porttitor diam. Mauris dapibus mi at ante commodo interdum ut vitae nibh. Pellentesque et sem ullamcorper, consectetur lacus vel, rutrum justo.</p><p>Quisque risus magna, ultricies sed sollicitudin id, condimentum ac erat. Sed <strong>diam est</strong>, maximus nec faucibus a, laoreet quis ex. Sed tempor hendrerit nibh, nec auctor nisl vehicula non. Mauris ornare nec libero et blandit.</p><p>Vivamus suscipit, sapien vel facilisis ullamcorper, orci massa porta felis, sed fermentum lectus neque eget metus. Nam ac vehicula nisi, non luctus purus. Mauris in arcu ut <a href="#">velit pulvinar ultrices nec at mi</a>. Suspendisse placerat purus non elementum molestie. In tincidunt iaculis maximus. In in nunc porta, ultricies neque at, placerat nunc.</p><p>Etiam eleifend turpis augue, volutpat aliquam ipsum interdum eu. Cras et faucibus odio, nec aliquet ex.</p>'
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

            _.each(pages, function (page) {
                self._models.push(new App.Models.Page(page));
            });
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

                    this._view = App.Views.PostListView;
                    break;
                case 'post':
                    this._model = _.find(Store._models, function (model) {
                        return (
                            model instanceof App.Models.Post &&
                            _(model.get('title')).kebabCase() === options
                        );
                    });
                    this._view = App.Views.PostSingleView;
                    break;
                case 'page':
                    this._model = _.find(Store._models, function (model) {
                        return model instanceof App.Models.Page;
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
        var transitionTo = function (route, options) {
            Controller.setup(route, options);

            if (view) {
                view.close();
            }

            view = new Controller._view(
                Controller._collection ? Controller._collection : Controller._model
            );
            appView.render(view);
        };
        var view;

        Store.initialize();

        this.Router.on('route:home', function () {
            transitionTo('home');
        });
        this.Router.on('route:page', function (title) {
            transitionTo('page', title);
        });
        this.Router.on('route.post', function (year, month, title) {
            transitionTo('post', title);
        });

        // Make header links use Router
        $('header[role="banner"] a').click(function (e) {
            e.preventDefault();

            var $el = $(e.target);

            // console.log($el.attr('href'));

            App.Router.navigate(
                App.Helpers.stripLeadingSlash($el.attr('href')),
                {trigger: true}
            );
        });

        Backbone.history.start({pushState: false});
    };

    App.Views = {};
    App.Models = {};
    App.Collections = {};
    App.Helpers = {
        formatDate: function (date) {
            return window.moment(date).fromNow();
        },
        stripLeadingSlash: function (string) {
            if (string.charAt(0) === '/') {
                string = string.slice(1);
            }

            return string;
        },
        urlFromModel: function (model) {
            var url = '';
            var date, title;

            if (model instanceof Backbone.Model) {
                date = model.get('date');
                title = model.get('title');

                url = moment(date).format('YYYY/MM');
                url += '/' + _(title).kebabCase() + '/';
            }

            return url;
        }
    };

    window.App = App;
})(window, _, Backbone, window.moment);
