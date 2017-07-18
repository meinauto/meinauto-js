"use strict";

/**
 * @class
 * @classdesc a test mock to represent an existing module class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.mock.ExistingModule
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.mock.ExistingModule', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @private
     * @alias {MeinAutoJs.mock.ExistingModule}
     */
    var _ = this;

    /**
     * @description test property foo
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @type {?string}
     * @default
     */
    _.foo = null;

    /**
     * @description test set property foo
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     */
    _.setFoo = function (bar) {
        _.foo = bar;
    };
});
