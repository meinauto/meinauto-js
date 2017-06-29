"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}
if (typeof MeinAutoJs.test.app.Demo === 'undefined') {MeinAutoJs.test.app.Demo = {};}
if (typeof MeinAutoJs.test.app.Demo.wrap === 'undefined') {MeinAutoJs.test.app.Demo.wrap = {};}

/**
 * @class
 */
MeinAutoJs.test.app.Demo.wrap.MarkupTest = new function () {
    /**
     * @description test {@link MeinAutoJs.app.Demo.wrap.Markup} has wrapped the text in headline
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.test.app.Demo.wrap.MarkupTest} moduleClass
     */
    this.testHasWrappedTextInHeadline = function (assert, moduleClass) {
        var $demo = $('[data-application="Demo"]');

        assert.ok($demo.find('h1').length > 0, "has wrapped text in headline");
    };
};
