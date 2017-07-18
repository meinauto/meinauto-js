"use strict";

/**
 * @class
 * @classdesc a test mock to represent an inherited module class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.mock.InheritModule
 * @lends MeinAutoJs.mock.InheritModule
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.mock.InheritModule', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.mock.InheritModule
     * @private
     * @alias {MeinAutoJs.mock.InheritModule}
     */
    var _ = this;

    /**
     * @description test extend abstract module
     * @memberOf MeinAutoJs.mock.InheritModule
     * @type {string}
     */
    _.extend = 'MeinAutoJs.mock.AbstractModule';

    /**
     * @description test b property
     * @memberOf MeinAutoJs.mock.InheritModule
     * @type {number}
     * @default
     */
    _.bProperty = 2;
});
