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

    /**
     * @description test markup wrapper class dependency is done
     * @memberOf MeinAutoJs.test.app.DemoDependPromiseTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoDependPromise} moduleClass
     */
    this.testMarkupWrapperIsDone = function (assert, moduleClass) {
        var assertAsync = assert.async(),
            $demo = $('<div/>').addClass('test-mock').append(
                $('<h1/>').addClass('color-event-1')
            );

        manager.add(moduleClass.type, {app: $demo.get(0)}).done(function () {
            manager.add(moduleClass.type + '.wrap.Markup').done(function () {
                assert.ok(manager.has(moduleClass.type), 'markup wrapper is done');

                assertAsync();

                manager.remove(moduleClass.type);
            });
        });
    };
});
