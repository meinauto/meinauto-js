"use strict";

/**
 * @class
 * @classdesc The core controller to handle the viewport {@link MeinAutoJs.display.Renderer}
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Controller
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.core.Controller', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.Controller
     * @private
     * @alias {MeinAutoJs.core.Controller}
     */
    var _ = this;

    /**
     * @description extend base controller
     * @memberOf MeinAutoJs.core.Controller
     * @type {string}
     */
    _.extend = 'MeinAutoJs.abstract.Controller';

    /**
     * @description initialize renderer
     * @memberOf MeinAutoJs.core.Controller
     */
    _.construct = function () {
        MeinAutoJs.core.Manager.add('MeinAutoJs.display.Renderer');
    };
});
