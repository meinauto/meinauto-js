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
        MeinAutoJs.core.Manager
            .add('MeinAutoJs.app.DemoDependPromise.wrap.Markup')
            .done(function () {
                renderDemo();
            })
            .fail(function () {
                console.error('Could not load dependency "MeinAutoJs.app.DemoDependPromise.wrap.Markup"');
            });
    };

    /**
     * @description render demo
     * @memberOf MeinAutoJs.app.DemoDependPromise
     * @private
     */
    var renderDemo = function () {
        var $demo = $('[data-application="DemoDependPromise"]');

        var color = 1,
            interval = 0,
            render = function () {
                $demo.find('h1').prop('class', 'color-promise-' + color);

                if (interval > 0) {return;}
                interval = setTimeout(function () {
                    $(_).trigger('interval');
                }, 1000);

                color++;

                if (5 < color) {
                    color = 1;
                }
            };

        $(_).on('interval', function () {
            clearTimeout(interval);
            interval = 0;

            if (null !== MeinAutoJs.core.Manager.get(_.type)) {
                render();
            }
        });

        render();
    };
});
