"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.tool.DocsTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.tool.Docs} has a control
     * @memberOf MeinAutoJs.test.app.tool.DocsTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasControl = function (assert) {
        var $control = $('[data-application="tool.Docs"]');

        assert.ok($control.length > 0, 'has control');
    };
});
