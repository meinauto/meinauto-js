"use strict";

/**
 * @class test controller core module
 */
MeinAutoJs.define('MeinAutoJs.test.core.ControllerTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.core.ControllerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Controller} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.core.Controller' === moduleClass.type,
            'is MeinAutoJs.core.Controller'
        );
    };
});
