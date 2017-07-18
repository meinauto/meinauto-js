"use strict";

/**
 * @interface
 * @classdesc Module class interface representation
 * @typedef {function} MeinAutoJs.core.Manager.Module.class
 * @lends MeinAutoJs.core.Manager.Module.class
 * @constructs
 * @tutorial MODULE-ORCHESTRATION-SYSTEM
 * @see if the module class is initialized by DOM application
 *  the reference is appended to
 *  class property MeinAutoJs.core.Manager.Module.class.__markup__
 */
MeinAutoJs.define('MeinAutoJs.core.Manager.Module.class', new function () {
    /**
     * @description bind public properties or methods from inner scope
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @private
     * @alias {MeinAutoJs.core.Manager.Module.class}
     * @example var _ = this;
     */
    var _ = this;

    /**
     * @description the manager assigns this property automatically
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {string}
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.type = 'MeinAutoJs.core.Manager.Module.class';

    /**
     * @description extend from another module class;
     *  this property is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {string}
     */
    _.extend = 'MeinAutoJs.core.Manager.Module.class';

    /**
     * @description bind a stylesheet on module;
     *  if true then add sass css file to ui library;
     *  this property is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {boolean}
     * @see '/src/lib/ui/template/module.scss.template'
     * @see MeinAutoJs.core.Manager.Module.class.__layout__ the css reference
     */
    _.layout = false;

    /**
     * @description construct the module class;
     *  the method get destroyed by manager after module is loaded;
     *  this method is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @typedef {function} MeinAutoJs.core.Manager.Module.class.construct
     */
    _.construct = function () {};
});
