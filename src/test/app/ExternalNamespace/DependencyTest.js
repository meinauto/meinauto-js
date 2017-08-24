"use strict";

/**
 * @class test external namespace module class dependency example
 */
MeinAutoJs.define('A.test.app.ExternalNamespace.DependencyTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf A.test.app.ExternalNamespace.DependencyTest
     * @param {A.test.Unit.assert} assert
     * @param {A.app.ExternalNamespace.Dependency} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'A.app.ExternalNamespace.Dependency' === moduleClass.type,
            'is A.app.ExternalNamespace.Dependency'
        );
    };
});
