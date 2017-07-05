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
     * @description initialize app modules and reference module class to DOM application
     * @memberOf MeinAutoJs.core.App
     * @private
     */
    var initialize = function () {
        var $apps = $('[data-application]');

        $apps.each(function () {
            var $app = $(this),
                appModule = 'MeinAutoJs.app.' + $app.data('application');

            _.collection.push(this);

            MeinAutoJs.core.Manager.add(appModule, {app: this}).done(function () {
                /**
                 * @description the DOM representation of the app module
                 * @type {MeinAutoJs.core.Manager.Module.class.__markup__}
                 * @property appDOM.__class__
                 */
                var appDOM = $app.get(0);

                /**
                 * @description each [data-application] attribute selector got appended
                 *  a property <HTMLElement>.__class__ to access
                 *  the module class {@link MeinAutoJs.core.Manager.Module.class} from DOM
                 */
                appDOM.constructor.prototype.__class__ = MeinAutoJs.core.Manager.get(appModule).class;
            });
        });
    };
});
