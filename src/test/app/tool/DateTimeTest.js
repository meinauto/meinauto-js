"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.DateTimeTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.DateTime.layout} is setted
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.DateTime} moduleClass
     */
    this.testHasLayout = function (assert, moduleClass) {
        assert.ok(moduleClass.layout, "has layout");
    };
});
