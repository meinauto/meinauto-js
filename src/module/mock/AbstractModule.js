"use strict";

/**
 * @class
 * @classdesc a test mock to represent an abstract module class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.mock.AbstractModule
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.mock.AbstractModule', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.mock.AbstractModule
     * @private
     * @alias {MeinAutoJs.mock.AbstractModule}
     */
    var _ = this;

    /**
     * @description test a property
     * @memberOf MeinAutoJs.mock.AbstractModule
     * @type {number}
     * @default
     */
    _.aProperty = 1;

    /**
     * @description test b property
     * @memberOf MeinAutoJs.mock.AbstractModule
     * @type {number}
     * @default
     */
    _.bProperty = 1;
});
