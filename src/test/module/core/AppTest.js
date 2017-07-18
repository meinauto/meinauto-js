"use strict";

/**
 * @class test app core module
 * @lends MeinAutoJs.test.core.AppTest
 */
MeinAutoJs.define('MeinAutoJs.test.core.AppTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.core.AppTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.App} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.core.App' === moduleClass.type,
            'is MeinAutoJs.core.App'
        );
    };
});
