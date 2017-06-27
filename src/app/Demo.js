"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.app === 'undefined') {MeinAutoJs.app = {};}

/**
 * @class
 * @classdesc a application demo
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.Demo
 * @constructs
 */
MeinAutoJs.app.Demo = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.Demo
     * @private
     * @alias {MeinAutoJs.app.Demo}
     */
    var _ = this;

    /**
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.Demo
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description initialize application demo
     * @memberOf MeinAutoJs.display.Renderer
     */
    _.construct = function () {
        renderDemo();
    };

    /**
     * @description render demo
     * @memberOf MeinAutoJs.app.Demo
     * @private
     */
    var renderDemo = function () {
        var $demo = $('[data-application="Demo"]');

        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');

        var color = 1,
            interval = 0,
            render = function () {
                $demo.find('h1').prop('class', 'color-' + color);

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
};
