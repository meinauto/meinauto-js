"use strict";

/** @module app/DemoDependPromise */
/** @module app/DemoDependPromise/wrap/Markup */

/**
 * @class
 * @classdesc an application demo promise dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependPromise.wrap.Markup
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoDependPromise.wrap.Markup', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoDependPromise.wrap.Markup
     * @private
     * @alias {MeinAutoJs.app.DemoDependPromise.wrap.Markup}
     */
    var _ = this;

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.DemoDependPromise.wrap.Markup
     * @param {jQuery} $demo the demo markup
     */
    _.wrapMarkup = function ($demo) {
        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
});
