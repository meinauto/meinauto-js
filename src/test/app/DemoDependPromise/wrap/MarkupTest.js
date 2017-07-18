"use strict";

/**
 * @class
 * @lends MeinAutoJs.test.app.DemoDependPromise.wrap.MarkupTest
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependPromise.wrap.MarkupTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.DemoDependPromise.wrap.Markup}
     *  has wrapped the text in headline
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasWrappedTextInHeadline = function (assert) {
        var $demo = $('[data-application="DemoDependPromise"]');

        assert.ok($demo.find('h1').length > 0, 'has wrapped text in headline');
    };
});
