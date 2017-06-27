"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}
if (typeof MeinAutoJs.test.app.tool === 'undefined') {MeinAutoJs.test.app.tool = {};}

/**
 * @class
 */
MeinAutoJs.test.app.tool.DocsTest = new function () {
    /**
     * test MeinAutoJs.app.tool.Docs has a control
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.tool.Docs} moduleClass
     */
    this.testHasControl = function (assert, moduleClass) {
        var $control = $('[data-application="tool.Docs"]');
        assert.ok($control.length > 0, "has control");
    };
};
