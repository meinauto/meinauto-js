"use strict";

/** @module app/Demo */
/** @module app/Demo/wrap/Markup */

/**
 * @class
 * @classdesc an application demo dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.Demo.wrap.Markup
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.Demo.wrap.Markup', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     * @private
     * @alias {MeinAutoJs.app.Demo}
     */
    var _ = this;

    /**
     * @description initialize application demo dependency
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     */
    _.construct = function () {
        wrapMarkup();
    };

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     * @private
     */
    var wrapMarkup = function () {
        var $demo = $('[data-application="Demo"]');

        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
});
