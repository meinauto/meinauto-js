"use strict";

/**
 * @class
 * @classdesc The core app loader to load apps into DIC by
 *  the module {@link MeinAutoJs.core.Manager}
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.App
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.core.App', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.App
     * @private
     * @alias {MeinAutoJs.core.App}
     */
    var _ = this;

    /**
     * @description stored app views
     * @memberOf MeinAutoJs.core.App
     * @type {Array.<HTMLElement>}
     */
    _.collection = [];

    /**
     * @description initialize all described apps on view
     * @memberOf MeinAutoJs.core.App
     * @event MeinAutoJs.core.App#initialize
     */
    _.construct = function () {
        $(_).on('initialize', function () {
            initialize();
        });
    };

    /**
     * @description initialize app modules
     * @memberOf MeinAutoJs.core.App
     * @private
     */
    var initialize = function () {
        var $apps = $('[data-application]');

        $apps.each(function () {
            var appModule = 'MeinAutoJs.app.' + $(this).data('application');

            _.collection.push(this);

            MeinAutoJs.core.Manager.add(appModule);
        });
    };
});
