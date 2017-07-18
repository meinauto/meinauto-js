"use strict";

/** @module app/DemoDependPromise */
/** @module app/DemoDependPromise/wrap/Markup */

/**
 * @class
 * @classdesc an application demo event dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependPromise.wrap.Markup
 * @lends MeinAutoJs.app.DemoDependPromise.wrap.Markup
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
     * @description initialize application demo dependency
     * @memberOf MeinAutoJs.app.DemoDependPromise.wrap.Markup
     */
    _.construct = function () {
        wrapMarkup();
    };

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.DemoDependPromise.wrap.Markup
     * @private
     */
    var wrapMarkup = function () {
        var $demo = $('[data-application="DemoDependPromise"]');

        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
});
