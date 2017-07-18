"use strict";

/**
 * @class test extend core module
 * @lends MeinAutoJs.test.core.ExtendTest
 */
MeinAutoJs.define('MeinAutoJs.test.core.ExtendTest', new function () {
    /**
     * @type {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.core.ExtendTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.core.ExtendTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Extend} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.core.Extend' === moduleClass.type,
            'is MeinAutoJs.core.Extend'
        );
    };

    /**
     * @description test use inherit method with wrong parameters
     * @memberOf MeinAutoJs.test.core.ExtendTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Extend} moduleClass
     */
    this.testExtendWithWrongParameters = function (assert, moduleClass) {
        var errorMessage = 'Could not extend module! Expected two <Object>\'s as module class to extend.';

        assert.throws(
            function () {
                moduleClass.inherit(1);
            },
            new Error(errorMessage),
            'inherit with wrong count of parameters fails'
        );

        assert.throws(
            function () {
                moduleClass.inherit(1, 1);
            },
            new Error(errorMessage),
            'inherit with wrong parameter types fails'
        );

        assert.throws(
            function () {
                moduleClass.inherit(new function () {});
            },
            new Error(errorMessage),
            'inherit with only an inherit class object but no parent class object fails'
        );

        assert.throws(
            function () {
                moduleClass.inherit(new function () {}, 1);
            },
            new Error(errorMessage),
            'inherit with only an inherit class object but parent class object of wrong type fails'
        );
    };

    /**
     * @description test use inherit method with correct parameters
     * @memberOf MeinAutoJs.test.core.ExtendTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Extend} moduleClass
     */
    this.testExtendWithCorrectParameters = function (assert, moduleClass) {
        var parentClass = new function () {
            this.a = 1;

            this.b = 1;
        };

        var inheritClass = new function () {
            this.b = 2;
        };

        var inheritedClass = moduleClass.inherit(inheritClass, parentClass);

        assert.ok(typeof inheritedClass === 'object', 'inherit of parent class as valid class object');

        assert.ok(1 === inheritedClass.a, 'inherited property of parent class object is setted');

        assert.ok(2 === inheritedClass.b, 'not parent property is setted at inherited property');
    };

    /**
     * @description test extend a module by another with manager
     * @memberOf MeinAutoJs.test.core.ExtendTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.core.Extend} moduleClass
     */
    this.testExtendModuleByAnotherWithManager = function (assert, moduleClass) {
        var assertAsync = assert.async();

        manager.add(moduleClass.type).done(function () {
            manager.add('MeinAutoJs.mock.InheritModule').done(function (module) {
                assert.ok('MeinAutoJs.mock.InheritModule' === module.type, 'test inherit module type');

                assert.ok('MeinAutoJs.mock.AbstractModule' === module.extend, 'test inherit module extend type');

                assert.ok(1 === module.aProperty, 'test abstract property is in inherited class');

                assertAsync();

                manager.remove('MeinAutoJs.mock.InheritModule');
            });
        });
    };
});
