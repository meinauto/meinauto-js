"use strict";

/**
 * @class test external namespace module class example
 */
MAJS.define('A.test.app.ExternalNamespaceTest', new function () {
    /**
     * @description test has assigned module class type by manager
     * @memberOf A.test.app.ExternalNamespaceTest
     * @param {A.test.Unit.assert} assert
     * @param {A.app.ExternalNamespace} moduleClass
     */
    this.testHasAssignedTypeByManager = function (assert, moduleClass) {
        assert.ok(
            'A.app.ExternalNamespace' === moduleClass.type,
            'is A.app.ExternalNamespace'
        );
    };
});
