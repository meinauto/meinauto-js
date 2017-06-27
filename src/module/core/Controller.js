"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.core === 'undefined') {MeinAutoJs.core = {};}

/**
 * @class
 * @classdesc The core controller to handle the viewport renderer
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Controller
 * @constructs
 */
MeinAutoJs.core.Controller = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.Controller
     * @private
     * @alias {MeinAutoJs.core.Controller}
     */
    var _ = this;

    /**
     * @description initialize renderer
     * @memberOf MeinAutoJs.core.Controller
     */
    _.construct = function () {
        MeinAutoJs.core.Manager.add('MeinAutoJs.display.Renderer');
    };
};
