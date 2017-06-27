"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}
if (typeof MeinAutoJs.test.app.tool === 'undefined') {MeinAutoJs.test.app.tool = {};}

/**
 * @class
 */
MeinAutoJs.test.app.tool.DateTimeTest = new function () {
    /**
     * test MeinAutoJs.app.tool.DateTime.layout is setted
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.DateTime} moduleClass
     */
    this.testHasLayout = function (assert, moduleClass) {
        assert.ok(moduleClass.layout, "has layout");
    };
};
