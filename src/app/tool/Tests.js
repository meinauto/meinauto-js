"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.app === 'undefined') {MeinAutoJs.app = {};}
if (typeof MeinAutoJs.app.tool === 'undefined') {MeinAutoJs.app.tool = {};}

/** @module app/tool */

/**
 * @class
 * @classdesc test runner control
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.tool.Tests
 * @constructs
 */
MeinAutoJs.app.tool.Tests = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.tool.Tests
     * @private
     * @alias {MeinAutoJs.app.tool.Tests}
     */
    var _ = this;

    /**
     * @description initialize test runner control
     * @memberOf MeinAutoJs.app.tool.Tests
     */
    _.construct = function () {
        renderTests();
    };

    /**
     * @description render test runner
     * @memberOf MeinAutoJs.app.tool.Tests
     * @private
     */
    var renderTests = function () {
        var $testRunner = $('[data-application="tool.Tests"]');

        $testRunner.on('click', function () {
            location.search = 'tests';
        });
    };
};
