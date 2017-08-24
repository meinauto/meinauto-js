"use strict";

/**
 * @class
 * @classdesc an external namespace dependency module example
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} A.app.ExternalNamespace.Dependency
 * @constructs
 */
MeinAutoJs.define('A.app.ExternalNamespace.Dependency', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf A.app.ExternalNamespace.Dependency
     * @private
     * @alias {A.app.ExternalNamespace.Dependency}
     */
    var _ = this;

    /**
     * @description external namespace module reference
     * @memberOf A.app.ExternalNamespace.Dependency
     * @alias {?A.app.ExternalNamespace}
     * @see A.app.ExternalNamespace
     */
    var ExternalNamespace = null;

    /**
     * @description store the return value
     *  of this dependency caller module class
     * @memberOf A.app.ExternalNamespace.Dependency
     * @type {boolean}
     */
    _.dependencyCallerMethodCalled = false;

    /**
     * @description construct the module class
     * @memberOf A.app.ExternalNamespace.Dependency
     * @param {Object} module the request parameters
     */
    _.construct = function (module) {
        if (!module.parameters.hasOwnProperty('externalNamespace')) {
            throw new Error('Missing parameter "externalNamespace"!');
        }

        ExternalNamespace = module.parameters.externalNamespace;

        accessSomethingFromExternalNamespaceModule();
    };

    /**
     * @description example of access to this dependency
     *  caller module class
     * @memberOf A.app.ExternalNamespace.Dependency
     * @private
     */
    var accessSomethingFromExternalNamespaceModule = function () {
        _.dependencyCallerMethodCalled = ExternalNamespace.getSomething();
    };
});
