"use strict";

/**
 * @class test e
 */
MeinAutoJs.define('MeinAutoJs.test.app.ETest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.ETest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.ETest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.app.ETest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.E} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.app.E' === moduleClass.type,
            'is MeinAutoJs.app.E'
        );
    };

    /**
     * @description test has not constructed dependencies
     * @memberOf MeinAutoJs.test.app.ETest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.E} moduleClass
     */
    this.testHasNotConstructedDependencies = function (assert, moduleClass) {
        var dependencies = moduleClass.getDependencies(),
            hasNoLoadedClasses = true
        ;

        $(dependencies).each(function () {
            if (null !== this) {
                hasNoLoadedClasses = false;
            }
        });

        assert.ok(
            hasNoLoadedClasses,
            'no dependencies because of no construction'
        );
    };

    /**
     * @description test has constructed dependencies
     * @memberOf MeinAutoJs.test.app.ETest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.E} moduleClass
     */
    this.testHasConstructedDependencies = function (assert, moduleClass) {
        var assertAsync = assert.async();

        var checkDependency = function (module, expect) {
            var classDepends = module.getDependencies();

            $(classDepends).each(function () {
                if (null !== this) {
                    assert.ok(-1 < expect.indexOf(this.type), module.type + ' dependency ' + this.type + ' ready');
                } else {
                    assert.notOk(null === this, module.type + ' dependency not ready');
                }
            });
        };

        manager.add([
            moduleClass.type,
            'MeinAutoJs.app.A',
            'MeinAutoJs.app.B',
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.D'
        ]).done(function () {
            manager.ready('MeinAutoJs.app.A', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.B',
                    'MeinAutoJs.app.C',
                    'MeinAutoJs.app.D',
                    'MeinAutoJs.app.E'
                ]);
            });

            manager.ready('MeinAutoJs.app.B', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.A',
                    'MeinAutoJs.app.C',
                    'MeinAutoJs.app.D',
                    'MeinAutoJs.app.E'
                ]);
            });

            manager.ready('MeinAutoJs.app.C', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.A',
                    'MeinAutoJs.app.B',
                    'MeinAutoJs.app.D',
                    'MeinAutoJs.app.E'
                ]);
            });

            manager.ready('MeinAutoJs.app.D', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.A',
                    'MeinAutoJs.app.B',
                    'MeinAutoJs.app.C',
                    'MeinAutoJs.app.E'
                ]);

                assertAsync();
            });
        });
    };
});
