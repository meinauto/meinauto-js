"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}
if (typeof MeinAutoJs.test.app.tool === 'undefined') {MeinAutoJs.test.app.tool = {};}

/**
 * @class
 */
MeinAutoJs.test.app.tool.TestsTest = new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Tests} has a control
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.Tests} moduleClass
     */
    this.testHasControl = function (assert, moduleClass) {
        var $control = $('[data-application="tool.Tests"]');

        assert.ok($control.length > 0, "has control");
    };
};
