"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.TestsTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Tests} has a control
     * @memberOf MeinAutoJs.test.app.tool.TestsTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasControl = function (assert) {
        var $control = $('[data-application="tool.Tests"]');

        assert.ok($control.length > 0, 'has control');
    };
});
