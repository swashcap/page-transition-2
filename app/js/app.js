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
    }, {
        title: 'Suspendisse non Auctor Neque',
        excerpt: 'Fusce eget turpis mi. Fusce in nisl tellus. In at libero posuere ipsum sollicitudin mollis. Mauris a neque id nisl ultrices rhoncus in et justo.',
        date: new Date(2015, 4, 16),
        content: '<p>Vivamus hendrerit arcu dui, vel tristique tellus dictum non. Proin placerat mauris ac ex cursus tempus. Nulla facilisi. Vestibulum nulla lectus, venenatis sit amet lacinia non, lacinia at ipsum.</p><p>Integer ac neque vel massa fringilla tincidunt. In a feugiat tortor. Suspendisse feugiat sit amet sapien quis gravida. Duis pharetra odio a suscipit commodo. Aliquam pretium nibh quis metus convallis facilisis. Praesent ullamcorper ultricies posuere.</p>'
    }, {
        title: 'Cras Elementum Massa Placerat',
        excerpt: 'Finibus risus at, pellentesque est. Integer purus ante, facilisis at volutpat non, pharetra vitae orci. Nulla sollicitudin tortor in odio vestibulum, ac vulputate sem consectetur. Etiam vehicula mattis egestas.',
        date: new Date(2015, 4, 15),
        content: '<blockquote>Phasellus ornare nec dolor quis cursus.</blockquote><p>Nulla imperdiet ipsum sit amet viverra elementum. Nam molestie, tellus id pharetra faucibus, nunc ligula dapibus nisi, sollicitudin consectetur nisl dolor ut ipsum. Nulla ultrices imperdiet tincidunt. Suspendisse a faucibus mi. Sed varius sollicitudin mattis. Nam dictum vitae mi a sagittis.</p><p>Quisque auctor, felis sed mattis finibus, ante mi maximus leo, ullamcorper fringilla nulla sem ut dui. Donec fermentum, sapien a rutrum dignissim, purus magna porta ex, non placerat tortor neque pharetra ligula.</p>'
    }, {
        title: 'Etiam Bibendum',
        excerpt: 'Vulputate imperdiet aenean vulputate efficitur turpis vitae feugiat. Duis sed condimentum orci, eget accumsan neque. Nunc mattis, diam ac posuere rhoncus, ligula justo faucibus elit, posuere feugiat elit elit ut nisi.',
        date: new Date(2015, 4, 14),
        content: '<p>In elementum arcu eget est cursus convallis. Quisque pretium purus quis nisi hendrerit, sit amet tempor lorem suscipit. Nulla lobortis pulvinar volutpat. Pellentesque laoreet commodo lobortis. In semper, purus vitae lobortis venenatis, velit felis rhoncus purus, placerat pharetra eros tellus ut quam.</p>'
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
                    this._view = App.Views.PostSingle;
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
            this._view = this._model = this._collection = null;
        }
    };

    App.init = function () {
        this._appView = new App.Views.AppView();

        Store.initialize();

        // Make header links use Router
        $('header[role="banner"] a').click(function (e) {
            e.preventDefault();

            App.Router.navigate(
                App.Helpers.stripLeadingSlash($(e.target).attr('href')),
                {trigger: true}
            );
        });

        // Wire up routes to `Controller`
        this.Router.on('route:home', function () {
            App.transitionTo('home');
        });
        this.Router.on('route:page', function (title) {
            App.transitionTo('page', title);
        });
        this.Router.on('route:post', function (year, month, title) {
            App.transitionTo('post', title);
        });

        Backbone.history.start({pushState: false});
    };
    App.transitionTo = function (route, options) {
        var data;

        Controller.setup(route, options);

        data = Controller._collection ? Controller._collection : Controller._model;

        this._appView.render(new Controller._view(data));
    };

    App.Views = {};
    App.Models = {};
    App.Collections = {};
    App.Helpers = {
        formatDate: function (date) {
            return window.moment(date).fromNow();
        },
        stripLeadingSlash: function (string) {
            // if (string.charAt(0) === '/') {
            //     string = string.slice(1);
            // }

            return string;
        },
        urlFromModel: function (model) {
            var url = '';
            var date, title;

            if (model instanceof Backbone.Model) {
                title = _(model.get('title')).kebabCase();

                if (model instanceof App.Models.Post) {
                    date = model.get('date');

                    url = '/post/' + moment(date).format('YYYY/MM');
                    url += '/' + title + '/';
                } else if (model instanceof App.Models.Page) {
                    url = '/page/' + title + '/';
                } else {
                    url = '/' + title + '/';
                }
            }

            return url;
        }
    };

    window.App = App;
})(window, _, Backbone, window.moment);
