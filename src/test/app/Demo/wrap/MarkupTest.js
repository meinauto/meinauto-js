"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.Demo.wrap.MarkupTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.Demo.wrap.Markup} has wrapped the text in headline
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.test.app.Demo.wrap.MarkupTest} moduleClass
     */
    this.testHasWrappedTextInHeadline = function (assert, moduleClass) {
        var $demo = $('[data-application="Demo"]');

        assert.ok($demo.find('h1').length > 0, "has wrapped text in headline");
    };
});
