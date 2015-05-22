(function ($, _, Backbone) {
    'use strict';

    var App = window.App || {};

    var isAnimating = false;
    var ACTIVE_CLASS = 'is-active';
    var ENTERING_CLASS = 'is-entering';
    var LEAVING_CLASS = 'is-leaving';
    var PARENT_CLASS = 'is-parent';
    var ANIMATION_END_EVENTS = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

    App.Views.AppView = Backbone.View.extend({
        initialize: function () {
            this.setElement($('main'));

            this.$pane1 = this.$el.find('.pane-1');
            this.$pane2 = this.$el.find('.pane-2');

            this.$pane1.addClass(ACTIVE_CLASS);

            this._view1 = null;
            this._view2 = null;

            this.render();
        },
        render: function (view) {
            var isActive1 = this.$pane1.hasClass(ACTIVE_CLASS);
            var isActive2 = this.$pane2.hasClass(ACTIVE_CLASS);

            if (view && view instanceof Backbone.View) {
                if (this._view1 === null && this._view2 === null) {
                    this._view1 = view;
                    this.$pane1.append(this._view1.$el);
                } else if (isActive2) {
                    if (this._view1) {
                        this._view1.close();
                    }
                    this._view1 = view;
                    this.$pane1.append(this._view1.$el);

                    this.$pane1.addClass(PARENT_CLASS);
                    this.$pane2.addClass(PARENT_CLASS);

                    this.animate(this.$pane2, this.$pane1);
                } else if (isActive1) {
                    if (this._view2) {
                        this._view2.close();
                    }
                    this._view2 = view;
                    this.$pane2.append(this._view2.$el);

                    this.$pane1.removeClass(PARENT_CLASS);
                    this.$pane2.removeClass(PARENT_CLASS);

                    this.animate(this.$pane1, this.$pane2);
                }
            }

            return this;
        },
        animate: function ($currentPane, $nextPane) {
            var isNextDone = false;
            var isCurrentDone = false;

            if (isAnimating) {
                return this;
            }

            isAnimating = true;

            $nextPane
                .addClass(ACTIVE_CLASS + ' ' + ENTERING_CLASS)
                .one(ANIMATION_END_EVENTS, function () {
                    $nextPane.removeClass(ENTERING_CLASS);
                    $currentPane.removeClass(ACTIVE_CLASS);
                    isNextDone = true;
                    if (isCurrentDone) {
                        isAnimating = false;
                    }
                });

            $currentPane
                .addClass(LEAVING_CLASS)
                .one(ANIMATION_END_EVENTS, function () {
                    $currentPane.removeClass(LEAVING_CLASS);
                    isCurrentDone = true;
                    if (isNextDone) {
                        isAnimating = false;
                    }
                });
        },

        /** @todo  Implement `close` method */
        close: _.noop
    });
})(jQuery, _, Backbone);
