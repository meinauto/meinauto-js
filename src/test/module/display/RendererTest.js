"use strict";

/**
 * @class test renderer display module
 */
MeinAutoJs.define('MeinAutoJs.test.display.RendererTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.display.RendererTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.display.Renderer} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.display.Renderer' === moduleClass.type,
            'is MeinAutoJs.display.Renderer'
        );
    };

    /**
     * @description test is display available
     * @memberOf MeinAutoJs.test.display.RendererTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.display.Renderer} moduleClass
     */
    this.testIsDisplayAvailable = function (assert, moduleClass) {
        moduleClass.construct();

        assert.ok(
            moduleClass.display.hasClass('display'),
            'display target viewport is available'
        );
    };
});
