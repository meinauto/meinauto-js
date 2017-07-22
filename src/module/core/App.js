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
     * @description stored app views; the DOM representations
     *  of the app module classes
     * @memberOf MeinAutoJs.core.App
     * @type {Array.<HTMLElement>}
     */
    _.collection = [];

    /**
     * @description initialize all described apps on view;
     *  this event is the point where core modules and
     *  their dependencies are done and from now on only
     *  app modules will add dependencies to DIC
     *  {@link MeinAutoJs.core.Manager.modules}
     * @memberOf MeinAutoJs.core.App
     * @event MeinAutoJs.core.App#app:initialize
     */
    _.construct = function () {
        $(_).on('app:initialize', function () {
            initialize();
        });
    };

    /**
     * @description initialize app modules and reference module
     *  class to DOM application
     * @memberOf MeinAutoJs.core.App
     * @private
     */
    var initialize = function () {
        var $apps = $('[data-application]');

        $apps.each(function () {
            var $app = $(this),
                parameters = $app.data('parameters'),
                appModule = 'MeinAutoJs.app.' + $app.data('application');

            _.collection.push(this);

            MeinAutoJs.core.Manager.add(appModule, {
                app: this,
                data: parameters
            }).done(function () {
                /**
                 * @description each [data-application] attribute selector got appended
                 *  a property <HTMLElement>.__class__ to access
                 *  the module class {@link MeinAutoJs.core.Manager.Module.class}
                 *  by reference from DOM
                 */
                $app.prop('__class__', MeinAutoJs.core.Manager.get(appModule).class);
            });
        });
    };
});
