"use strict";

/** @module app/DemoDependEvent */
/** @module app/DemoDependEvent/wrap/Markup */

/**
 * @class
 * @classdesc an application demo event dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependEvent.wrap.Markup
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoDependEvent.wrap.Markup', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoDependEvent.wrap.Markup
     * @private
     * @alias {MeinAutoJs.app.DemoDependEvent.wrap.Markup}
     */
    var _ = this;

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.DemoDependEvent.wrap.Markup
     * @param {jQuery} $demo the demo markup
     */
    _.wrapMarkup = function ($demo) {
        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
});
