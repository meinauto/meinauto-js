"use strict";

/** @module app/tool */

/**
 * @class
 * @classdesc date time renderer
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.tool.DateTime
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.tool.DateTime', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.tool.DateTime
     * @private
     * @alias {MeinAutoJs.app.tool.DateTime}
     */
    var _ = this;

    /**
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.tool.DateTime
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description initialize date time renderer
     * @memberOf MeinAutoJs.app.tool.DateTime
     */
    _.construct = function () {
        renderDateTime();
    };

    /**
     * @description render local date time string
     * @memberOf MeinAutoJs.app.tool.DateTime
     * @private
     */
    var renderDateTime = function () {
        var $dateTimeDisplay = $('[data-application="tool.DateTime"]');

        var interval = 0,
            render = function () {
            $dateTimeDisplay.html('<span class="date-time">' + (new Date()).toLocaleString() + '</span>');

            if (interval > 0) {return;}
            interval = setTimeout(function () {
                $(_).trigger('interval');
            }, 1000);
        };

        $(_).on('interval', function () {
            clearTimeout(interval);
            interval = 0;

            if (true === MeinAutoJs.core.Manager.has(_.type)) {
                render();
            }
        });

        render();
    };
});
