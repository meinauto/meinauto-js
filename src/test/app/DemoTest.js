"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}

/**
 * @class
 */
MeinAutoJs.test.app.DemoTest = new function () {
    /**
     * @description test {@link MeinAutoJs.app.Demo} has a text
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoTest} moduleClass
     */
    this.testHasText = function (assert, moduleClass) {
        var $demo = $('[data-application="Demo"]');

        assert.ok($demo.text() === 'MeinAuto JS Demo', "has text");
    };
};
