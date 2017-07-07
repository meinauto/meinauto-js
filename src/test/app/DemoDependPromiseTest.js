"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependPromiseTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.DemoDependPromise} has a text
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasText = function (assert) {
        var $demo = $('[data-application="DemoDependPromise"]');

        assert.ok($demo.text().indexOf('MeinAutoJs Demo with Promise') > 0, "has text");
    };
});
