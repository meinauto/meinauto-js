"use strict";

/** @module app/DemoDependEvent */

/**
 * @class
 * @classdesc an application demo with an event dependency
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoDependEvent
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoDependEvent', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @private
     * @alias {MeinAutoJs.app.DemoDependEvent}
     */
    var _ = this;

    /**
     * @description the markup class
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @private
     * @alias {MeinAutoJs.app.DemoDependEvent.wrap.Markup}
     * @see MeinAutoJs.app.DemoDependEvent.wrap.Markup
     */
    var Markup;

    /**
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description the application demo DOM
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @type {?jQuery}
     */
    _.$demo = null;

    /**
     * @description initialize application demo
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @requires module:app/DemoDependEvent/wrap/Markup
     */
    _.construct = function () {
        MeinAutoJs.core.Manager
            .ready('MeinAutoJs.app.DemoDependEvent.wrap.Markup', function (module) {
                Markup = module;

                renderDemo();
            });
    };

    /**
     * @description render demo
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @private
     */
    var renderDemo = function () {
        _.$demo = $('[data-application="DemoDependEvent"]');

        Markup.wrapMarkup(_.$demo);

        var color = 1,
            interval = 0,
            render = function () {
                _.$demo.find('h1').prop('class', 'color-event-' + color);

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

            if (false === MeinAutoJs.core.Manager
                    .has('MeinAutoJs.app.DemoDependEvent')
            ) {
                MeinAutoJs.core.Manager
                    .remove('MeinAutoJs.app.DemoDependEvent.wrap.Markup');
            } else if (true === MeinAutoJs.core.Manager
                    .has('MeinAutoJs.app.DemoDependEvent.wrap.Markup')
            ) {
                render();
            }
        });

        render();
    };
});
