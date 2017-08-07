"use strict";

/**
 * @class placeholder for abstract controller
 */
MeinAutoJs.define('MeinAutoJs.test.abstract.ControllerTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.abstract.ControllerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.abstract.Controller} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.abstract.Controller' === moduleClass.type,
            'is MeinAutoJs.abstract.Controller'
        );
    };
});
