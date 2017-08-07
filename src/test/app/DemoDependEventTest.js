"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDependEventTest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.DemoDependEventTest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.DemoDependEventTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test {@link MeinAutoJs.app.DemoDependEvent} has a text
     * @memberOf MeinAutoJs.test.app.DemoDependEventTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     */
    this.testHasText = function (assert) {
        var $demo = $('[data-application="DemoDependEvent"]');

        assert.ok($demo.text().indexOf('MeinAutoJs Demo on Event') > 0, 'has text');
    };

    /**
     * @description test {@link MeinAutoJs.app.DemoDependEvent} has a text
     * @memberOf MeinAutoJs.test.app.DemoDependEventTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoDependEvent} moduleClass
     */
    // this.testMarkupWrapperIsReady = function (assert, moduleClass) {
    //     var assertAsync = assert.async(),
    //         $demo = $('[data-application="DemoDependEvent"]');
    //
    //     manager.add(moduleClass.type).done(function () {
    //         manager.ready(moduleClass.type + '.wrap.Markup', function (module) {
    //             module.$demo = $demo;
    //
    //             assert.ok(false, 'fail');
    //
    //             assertAsync();
    //         });
    //
    //         manager.add(moduleClass.type + '.wrap.Markup');
    //     });
    // };
});
