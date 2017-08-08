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
     * @description test markup wrapper class dependency is ready
     * @memberOf MeinAutoJs.test.app.DemoDependEventTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoDependEvent} moduleClass
     */
    this.testMarkupWrapperIsReady = function (assert, moduleClass) {
        var assertAsync = assert.async(),
            $demo = $('<div/>').addClass('test-mock').append(
                $('<h1/>').addClass('color-event-1')
            );

        manager.add(moduleClass.type, {app: $demo.get(0)}).done(function () {
            manager.ready(moduleClass.type + '.wrap.Markup', function () {
                assert.ok(manager.has(moduleClass.type), 'markup wrapper is ready');

                assertAsync();

                manager.remove('MeinAutoJs.app.DemoDependEvent');
            });

            manager.add(moduleClass.type + '.wrap.Markup');
        });
    };
});
