"use strict";

/**
 * @class test app core module
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

    /**
     * @description test if the {@link MeinAutoJs.core.App#app:initialize}
     *  event has been fired
     * @memberOf MeinAutoJs.test.core.AppTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.App} moduleClass
     */
    this.testAreAppsInitialized = function (assert, moduleClass) {
        moduleClass.construct();

        $(moduleClass).trigger('app:initialize');

        assert.ok(
            0 < moduleClass.collection.length,
            'event "app:initialize" has been fired'
        );
    };
});
