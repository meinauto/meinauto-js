"use strict";

/**
 * @class test factory model
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoFactory.model.CircleTest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest.model.CircleTest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.DemoFactoryTest.model.CircleTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.app.DemoFactory.model.CircleTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory.model.Circle} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.app.DemoFactory.model.Circle' === moduleClass.type,
            'is MeinAutoJs.app.DemoFactory.model.Circle'
        );
    };

    /**
     * @description test set or get model without create
     * @memberOf MeinAutoJs.test.app.DemoFactory.model.CircleTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory.model.Circle} moduleClass
     */
    this.testSetOrGetModelWithoutCreate = function (assert, moduleClass) {
        assert.throws(
            function() {
                moduleClass.setSize('1rem');
            },
            new Error('Firstly use the create method!'),
            'exception was thrown on set model before create'
        );

        assert.throws(
            function() {
                moduleClass.get();
            },
            new Error('Firstly use the create method!'),
            'exception was thrown on get model before create'
        );
    };

    /**
     * @description test create model without factory class
     * @memberOf MeinAutoJs.test.app.DemoFactory.model.CircleTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory.model.Circle} moduleClass
     */
    this.testCreateModelWithoutFactoryClass = function (assert, moduleClass) {
        assert.throws(
            function() {
                moduleClass.create(1);
            },
            new Error('Only can create from factory class!'),
            'exception was thrown on create without factory class'
        );
    };

    /**
     * @description test create model with factory class
     * @memberOf MeinAutoJs.test.app.DemoFactory.model.CircleTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoFactory.model.Circle} moduleClass
     */
    this.testCreateModelWithFactoryClass = function (assert, moduleClass) {
        var assertAsync = assert.async();

        manager.add('MeinAutoJs.app.DemoFactory', {
            data: {
                "amount": 1,
                "size": ["5rem"],
                "background": ["red"],
                "border": ["black"]
            }
        }).done(function (module) {
            moduleClass.create(1, module);

            moduleClass.setBackgroundColor('rgb(255, 165, 0)');

            var $circle = moduleClass.get();

            assert.ok(1 === $circle.length, 'create and get a model by factory');

            assert.ok(
                'rgb(255, 165, 0)' === $circle.css('background-color'),
                'set a model by factory'
            );

            assertAsync();
        });
    };
});
