"use strict";

/** @module app/DemoDependEvent */
/** @module app/DemoDependEvent/wrap/Markup */

/**
 * @class
 * @classdesc an application demo event dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependEvent.wrap.Markup
 * @lends MeinAutoJs.app.DemoDependEvent.wrap.Markup
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
     * @description initialize application demo dependency
     * @memberOf MeinAutoJs.app.DemoDependEvent.wrap.Markup
     */
    _.construct = function () {
        wrapMarkup();
    };

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.DemoDependEvent.wrap.Markup
     * @private
     */
    var wrapMarkup = function () {
        var $demo = $('[data-application="DemoDependEvent.wrap.Markup"]');

        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
});
