"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependPromiseTest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.DemoDependPromiseTest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.DemoDependPromiseTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test {@link MeinAutoJs.app.DemoDependPromise} has a text
     * @memberOf MeinAutoJs.test.app.DemoDependPromiseTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasText = function (assert) {
        var $demo = $('[data-application="DemoDependPromise"]');

        assert.ok($demo.text().indexOf('MeinAutoJs Demo with Promise') > 0, 'has text');
    };
});
