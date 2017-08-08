"use strict";

/** @module app/DemoDependPromise */

/**
 * @class
 * @classdesc an application demo with a promise dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependPromise
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoDependPromise', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @private
     * @alias {MeinAutoJs.app.DemoDependPromise}
     */
    var _ = this;

    /**
     * @description the markup class
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @private
     * @alias {MeinAutoJs.app.DemoDependPromise.wrap.Markup}
     * @see MeinAutoJs.app.DemoDependPromise.wrap.Markup
     */
    var Markup;

    /**
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description initialize application demo
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @requires module:app/DemoDependPromise/wrap/Markup
     */
    _.construct = function () {
        _.__manager__
            .add('MeinAutoJs.app.DemoDependPromise.wrap.Markup')
            .done(function (module) {
                Markup = module;

                renderDemo();
            })
            .fail(function () {
                MeinAutoJs.console.error(
                    'Could not load dependency "MeinAutoJs.app.DemoDependPromise.wrap.Markup"'
                );
            });
    };

    /**
     * @description render demo
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @private
     */
    var renderDemo = function () {
        var $demo = $(_.__markup__);

        Markup.wrapMarkup($demo);

        var color = 1,
            interval = 0,
            render = function () {
                if (null !== _.$demo) {
                    $demo.find('h1').prop('class', 'color-promise-' + color);

                    if (interval > 0) {return;}
                    interval = setTimeout(function () {
                        $(_).trigger('interval');
                    }, 1000);

                    color++;

                    if (5 < color) {
                        color = 1;
                    }
                }
            };

        $(_).on('interval', function () {
            clearTimeout(interval);
            interval = 0;

            if (true === _.__manager__.has(_.type)) {
                render();
            } else {
                _.__manager__
                    .remove('MeinAutoJs.app.DemoDependPromise.wrap.Markup');
            }
        });

        render();
    };
});
