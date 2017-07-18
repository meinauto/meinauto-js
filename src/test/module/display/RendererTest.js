"use strict";

/**
 * @class test renderer display module
 * @lends MeinAutoJs.test.display.RendererTest
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
});
