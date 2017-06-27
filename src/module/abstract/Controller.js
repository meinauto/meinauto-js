"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.abstract === 'undefined') {MeinAutoJs.abstract = {};}

/**
 * @class
 * @classdesc An abstract controller class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.abstract.Controller
 * @constructs
 * @abstract
 */
MeinAutoJs.abstract.Controller = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.abstract.Controller
     * @private
     * @alias {MeinAutoJs.abstract.Controller}
     */
    var _ = this;
};
