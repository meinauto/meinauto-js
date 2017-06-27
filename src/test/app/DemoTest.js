"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}
if (typeof MeinAutoJs.test.app.tool === 'undefined') {MeinAutoJs.test.app.tool = {};}

/**
 * @class
 */
MeinAutoJs.test.app.DemoTest = new function () {
    /**
     * test MeinAutoJs.test.app.DemoTest has a text
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoTest} moduleClass
     */
    this.testHasText = function (assert, moduleClass) {
        var $demo = $('[data-application="Demo"]');
        assert.ok($demo.text().length > 0, "has text");
    };
};
