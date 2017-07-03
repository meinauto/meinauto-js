"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.TestsTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Tests} has a control
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.Tests} moduleClass
     */
    this.testHasControl = function (assert, moduleClass) {
        var $control = $('[data-application="tool.Tests"]');

        assert.ok($control.length > 0, "has control");
    };
});
