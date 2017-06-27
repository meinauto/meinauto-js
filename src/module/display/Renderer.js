"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.display === 'undefined') {MeinAutoJs.display = {};}

/**
 * @class
 * @classdesc The renderer handles the display viewport and main screen for app views
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.display.Renderer
 * @constructs
 */
MeinAutoJs.display.Renderer = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.display.Renderer
     * @private
     * @alias {MeinAutoJs.display.Renderer}
     */
    var _ = this;

    /**
     * @description define append selector for display viewport
     * @memberOf MeinAutoJs.display.Renderer
     * @private
     * @type {string}
     * @default
     */
    var displayViewport = 'body';

    /**
     * @description autoload stylesheet for display and main screen
     * @memberOf MeinAutoJs.display.Renderer
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description the display is the initial target for the viewport
     * @memberOf MeinAutoJs.display.Renderer
     * @type {MeinAutoJs.display.Renderer.Display}
     */
    _.display = {};

    /**
     * @description initialize display
     * @memberOf MeinAutoJs.display.Renderer
     * @fires MeinAutoJs.core.App#initialize
     */
    _.construct = function () {
        $(MeinAutoJs.core.App).trigger('initialize');

        _.display = initDisplay();
    };

    /**
     * @description initialize the display viewport
     * @memberOf MeinAutoJs.display.Renderer
     * @private
     * @returns {MeinAutoJs.display.Renderer.Display}
     */
    var initDisplay = function () {
        /**
         * @typedef {Object} MeinAutoJs.display.Renderer.Display
         */
        return $(displayViewport)
            .addClass('display')
            .show();
    };
};
