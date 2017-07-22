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
     * @private
     * @type {Object}
     */
    var foo = {};

    /**
     * @description test set property foo.first
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     * @returns {this}
     */
    _.setFooFirst = function (bar) {
        foo.first = bar;

        return _;
    };

    /**
     * @description test set property foo.second
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     * @returns {this}
     */
    _.setFooSecond = function (bar) {
        foo.second = bar;

        return _;
    };

    /**
     * @description test set property foo.third
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     * @returns {this}
     */
    _.setFooThird = function (bar) {
        foo.third = bar;

        return _;
    };

    /**
     * @description test set property foo.fourth
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     * @returns {this}
     */
    _.setFooFourth = function (bar) {
        foo.fourth = bar;

        return _;
    };

    /**
     * @description test set property foo.fifth
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @param {string} bar
     * @returns {this}
     */
    _.setFooFifth = function (bar) {
        foo.fifth = bar;

        return _;
    };

    /**
     * @description get foo object
     * @memberOf MeinAutoJs.mock.ExistingModule
     * @returns {Object}
     */
    _.getFoo = function () {
        return foo;
    };
});
