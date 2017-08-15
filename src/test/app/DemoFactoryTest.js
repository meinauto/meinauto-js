"use strict";

/**
 * @class test demo factory
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoFactoryTest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @type {?jQuery}
     */
    var $mockApp = null;

    /**
     * @description setup the manager and variables
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;

        $mockApp = $('<div/>').addClass('app-demo-factory-mock')
            .html('<button class="hidden"></button>');
    };

    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.app.DemoFactory' === moduleClass.type,
            'is MeinAutoJs.app.DemoFactory'
        );
    };

    /**
     * @description test factory class with wrong construction parameters
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory} moduleClass
     */
    this.testWithWrongConstructionParameters = function (assert, moduleClass) {
        assert.throws(
            function() {
                moduleClass.construct();
            },
            new Error('Missing construction parameters object!'),
            'exception was thrown on missing construction parameters object'
        );

        assert.throws(
            function() {
                moduleClass.construct({
                    parameters: {}
                });
            },
            new Error('Missing construction parameters object properties!'),
            'exception was thrown on missing construction parameters object properties'
        );
    };

    /**
     * @description test render circles without construct the factory class
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory} moduleClass
     */
    this.testRenderCirclesWithoutConstruct = function (assert, moduleClass) {
        assert.throws(
            function() {
                moduleClass.renderCircles();
            },
            new Error('No circles constructed yet!'),
            'exception was thrown on not constructed factory class'
        );
    };

    /**
     * @description test render circles with circle model
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory} moduleClass
     */
    this.testRenderCirclesWithCircleModel = function (assert, moduleClass) {
        var assertAsync = assert.async();

        manager.add(moduleClass.type, {
            data: {
                "amount": 2,
                "size": ["5rem", "4rem"],
                "background": ["red", "green"],
                "border": ["black", "black"]
            }
        }).done(function (module) {
            module.$demoFactoryApp = $mockApp;

            manager.ready('MeinAutoJs.app.DemoFactory.model.Circle', function () {
                var $button = module.$demoFactoryApp.find('button');

                $button.on('click', function () {
                    try {
                        module.renderCircles();

                        assert.ok(
                            2 === module.$demoFactoryApp.find('.circle').length,
                            'get rendered circles'
                        );

                        assertAsync();
                    } catch (error) {
                        MeinAutoJs.console.error(error);
                    }
                });

                // awaiting user click interaction
                setTimeout(function () {
                    $button.trigger('click');
                }, 1000);
            });
        }).fail(function () {
            assert.notOk(false, 'could not load module');

            assertAsync();
        });
    };
});
