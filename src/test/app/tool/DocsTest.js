"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.DocsTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Docs} has a control
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.Docs} moduleClass
     */
    this.testHasControl = function (assert, moduleClass) {
        var $control = $('[data-application="tool.Docs"]');

        assert.ok($control.length > 0, "has control");
    };
});
