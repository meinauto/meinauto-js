"use strict";

/**
 * @class test manager core module
 */
MeinAutoJs.define('MeinAutoJs.test.core.ManagerTest', new function () {
    /**
     * @type {string}
     */
    var moduleAutoloadPath = '/meinauto-js/web/js/module';

    /**
     * @description test has pre setted type string
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testHasPreSettedType = function (assert, moduleClass) {
        assert.ok(
            typeof moduleClass.type === 'string',
            'pre setted type is string'
        );

        assert.ok(
            'MeinAutoJs.core.Manager' === moduleClass.type,
            'is MeinAutoJs.core.Manager'
        );
    };

    /**
     * @description test has and get not existing module fail
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testNotExistingModuleFail = function (assert, moduleClass) {
        var manager = moduleClass;

        manager.construct(moduleAutoloadPath, true);

        assert.ok(
            false === manager.has('MeinAutoJs.core.NotExistingModule'),
            'has not existing module fails'
        );

        assert.ok(
            null === manager.get('MeinAutoJs.core.NotExistingModule'),
            'get not existing module fails'
        );
    };

    /**
     * @description test remove not existing module fail
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testRemoveNotExistingModuleFail = function (assert, moduleClass) {
        var manager = moduleClass;

        manager.construct(moduleAutoloadPath, true);

        assert.ok(
            false === manager.remove('MeinAutoJs.core.NotExistingModule'),
            'remove not existing module fails'
        );
    };

    /**
     * @description test has and get existing module success
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testExistingModuleSuccess = function (assert, moduleClass) {
        var assertAsync = assert.async(),
            manager = moduleClass;

        manager.construct(moduleAutoloadPath, true);

        manager.add('MeinAutoJs.mock.ExistingModule').done(function (module) {
            assert.ok(
                true === manager.has(module.type),
                'add and has existing module'
            );

            assert.ok(
                module === manager.get(module.type).class,
                'get existing module'
            );

            module.setFoo('bar');

            assert.ok(
                'bar' === module.foo,
                'set property of existing module class'
            );

            assertAsync();
        });
    };

    /**
     * @description test remove existing module success
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testRemoveExistingModuleSuccess = function (assert, moduleClass) {
        var assertAsync = assert.async(),
            manager = moduleClass;

        manager.construct(moduleAutoloadPath, true);

        manager.add('MeinAutoJs.mock.ExistingModule').done(function (module) {
            assert.ok(
                true === manager.remove(module.type),
                'add and remove existing module'
            );

            assertAsync();
        });
    };

    /**
     * @description test ready existing module success
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Manager} moduleClass
     */
    this.testReadyExistingModuleSuccess = function (assert, moduleClass) {
        var assertAsync = assert.async(),
            manager = moduleClass;

        manager.construct(moduleAutoloadPath, true);

        manager.ready('MeinAutoJs.mock.ExistingModule', function (module) {
            assert.ok(
                true === manager.has(module.type),
                'ready existing module'
            );

            assertAsync();
        });

        manager.add('MeinAutoJs.mock.ExistingModule');
    };

    /**
     * @description teardown the created test method objects
     * @memberOf MeinAutoJs.test.core.ManagerTest
     */
    this.teardown = function () {
        //removeModuleDOM('MeinAutoJs.mock.ExistingModule');
    };

    /**
     * @description remove a test mock created namespace
     * @memberOf MeinAutoJs.test.core.ManagerTest
     * @param {string} type
     * @return {boolean}
     */
    var removeModuleDOM = function(type) {
        var classScope = window,
            classPath = type.split('.'),
            success = false;

        $(classPath).each(function (i, className) {
            if (null !== classScope && className in classScope) {
                if (classPath.length - 1 === i) {
                    delete classScope[className];
                    success = true;
                } else {
                    classScope = classScope[className];
                }
            } else {
                classScope = null;
            }
        });

        return success;
    };
});
