"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependEvent.wrap.MarkupTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.DemoDependEvent.wrap.Markup}
     *  has wrapped the text in headline
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasWrappedTextInHeadline = function (assert) {
        var $demo = $('[data-application="DemoDependEvent"]');

        assert.ok($demo.find('h1').length > 0, 'has wrapped text in headline');
    };
});
