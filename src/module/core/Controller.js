"use strict";

/**
 * @class
 * @classdesc The core controller to handle the viewport {@link MeinAutoJs.display.Renderer}
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @augments {MeinAutoJs.abstract.Controller}
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
     * @description initialize renderer
     * @memberOf MeinAutoJs.core.Controller
     */
    _.construct = function () {
        MeinAutoJs.core.Manager.add('MeinAutoJs.display.Renderer');
    };
});
