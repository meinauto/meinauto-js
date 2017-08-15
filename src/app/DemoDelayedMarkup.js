"use strict";

/**
 * @class
 * @classdesc delayed demo markup
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDelayedMarkup
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoDelayedMarkup', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoDelayedMarkup
     * @private
     * @alias {MeinAutoJs.app.DemoMarkup}
     */
    var _ = this;

    /**
     * @description markup element
     * @memberOf MeinAutoJs.app.DemoDelayedMarkup
     * @type {?jQuery}
     */
    _.$markup = null;

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.DemoDelayedMarkup
     */
    _.construct = function () {
        _.$markup = $('[data-application="DemoDelayedMarkup"]');

        createElements();
    };

    /**
     * @description create elements
     * @memberOf MeinAutoJs.app.DemoDelayedMarkup
     * @private
     */
    var createElements = function () {
        var $elements = $('<ul/>'),
            $first = $('<li/>').text('first'),
            $second = $('<li/>').text('second')
        ;

        $elements.append($first, $second);

        var $defer = $.Deferred()
            .done(function () {
                _.$markup.append($elements);
            });

        setTimeout(function () {
            $defer.resolve();
        }, 2048);
    };
});
