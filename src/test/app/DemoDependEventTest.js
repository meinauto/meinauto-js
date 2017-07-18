"use strict";

/**
 * @class
 * @lends MeinAutoJs.test.app.DemoDependEventTest
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependEventTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.DemoDependEvent} has a text
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasText = function (assert, module) {
        var $demo = $('[data-application="DemoDependEvent"]');

        assert.ok($demo.text().indexOf('MeinAutoJs Demo on Event') > 0, 'has text');
    };
});
