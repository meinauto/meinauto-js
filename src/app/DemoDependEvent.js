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
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description initialize application demo
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @requires module:app/DemoDependEvent/wrap/Markup
     */
    _.construct = function () {
        if (true === MeinAutoJs.core.Manager.has('MeinAutoJs.app.DemoDependEvent.wrap.Markup')) {
            renderDemo();
        } else {
            $(MeinAutoJs.core.Manager).on('ready', function (event, module) {
                if ('MeinAutoJs.app.DemoDependEvent.wrap.Markup' === module.type) {
                    renderDemo();
                }
            });
        }
    };

    /**
     * @description render demo
     * @memberOf MeinAutoJs.app.DemoDependEvent
     * @private
     */
    var renderDemo = function () {
        var $demo = $('[data-application="DemoDependEvent"]');

        $demo.removeClass('hidden');

        var color = 1,
            interval = 0,
            render = function () {
                $demo.find('h1').prop('class', 'color-event-' + color);

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

            if (null !== MeinAutoJs.core.Manager.get('MeinAutoJs.app.DemoDependEvent.wrap.Markup')) {
                render();
            }
        });

        render();
    };
});
