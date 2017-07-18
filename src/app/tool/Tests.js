"use strict";

/** @module app/tool */

/**
 * @class
 * @classdesc test runner control
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.tool.Tests
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.tool.Tests', new function () {
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

        $testRunner.removeClass('hidden');

        $testRunner.on('click', function () {
            location.search = 'tests';
        });
    };
});
