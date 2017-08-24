"use strict";

/**
 * @class
 * @classdesc an external namespace module example
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} A.app.ExternalNamespace
 * @constructs
 */
MAJS.define('A.app.ExternalNamespace', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf A.app.ExternalNamespace
     * @private
     * @alias {A.app.ExternalNamespace}
     */
    var _ = this;

    /**
     * @description construct the module class
     * @memberOf A.app.ExternalNamespace
     */
    _.construct = function () {
        _.__manager__.add('A.app.ExternalNamespace.Dependency', {externalNamespace: _});
    };

    /**
     * @description the external namespace module dependency can
     *  get something from this method
     * @memberOf A.app.ExternalNamespace
     * @returns {boolean}
     */
    _.getSomething = function () {
        return true;
    };
});
