"use strict";

/**
 * @class
 * @lends MeinAutoJs.test.app.tool.TestsTest
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.TestsTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Tests} has a control
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasControl = function (assert) {
        var $control = $('[data-application="tool.Tests"]');

        assert.ok($control.length > 0, 'has control');
    };
});
