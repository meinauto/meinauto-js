"use strict";

/**
 * @class test b
 */
MeinAutoJs.define('MeinAutoJs.test.app.BTest', new function () {
    /**
     * @description the manager mock
     * @memberOf MeinAutoJs.test.app.BTest
     * @alias {MeinAutoJs.core.Manager}
     */
    var manager;

    /**
     * @description setup the manager
     * @memberOf MeinAutoJs.test.app.BTest
     * @param {MeinAutoJs.core.Manager} managerInstance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
    };

    /**
     * @description test has assigned module class type by manager
     * @memberOf MeinAutoJs.test.app.BTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.B} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'MeinAutoJs.app.B' === moduleClass.type,
            'is MeinAutoJs.app.B'
        );
    };

    /**
     * @description test has not constructed dependencies
     * @memberOf MeinAutoJs.test.app.BTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.B} moduleClass
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
     * @memberOf MeinAutoJs.test.app.BTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.B} moduleClass
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
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.D',
            'MeinAutoJs.app.E'
        ]).done(function () {
            manager.ready('MeinAutoJs.app.A', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.B',
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
            });

            manager.ready('MeinAutoJs.app.E', function (module) {
                checkDependency(module, [
                    'MeinAutoJs.app.A',
                    'MeinAutoJs.app.B',
                    'MeinAutoJs.app.C',
                    'MeinAutoJs.app.D'
                ]);

                assertAsync();
            });
        });
    };
});
