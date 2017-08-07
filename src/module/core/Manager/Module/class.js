"use strict";

/**
 * @interface
 * @classdesc Module class interface representation
 * @typedef {function} MeinAutoJs.core.Manager.Module.class
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
     * @typedef {string} MeinAutoJs.core.Manager.Module.class.type
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.type = 'MeinAutoJs.core.Manager.Module.class';

    /**
     * @description extend from another module class;
     *  this property is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {string}
     * @typedef {string} MeinAutoJs.core.Manager.Module.class.extend
     */
    _.extend = 'MeinAutoJs.core.Manager.Module.class';

    /**
     * @description bind a stylesheet on module;
     *  if true then add sass css file to ui library;
     *  this property is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {boolean}
     * @typedef {boolean} MeinAutoJs.core.Manager.Module.class.layout
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

    /**
     * @description get the module class manager interface;
     *  the manager assigns this method automatically;
     *  the usage of this method is optional but better for
     *  test cases with mocked manager instance
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @typedef {MeinAutoJs.core.Manager} MeinAutoJs.core.Manager.Module.class.getManager
     */
    _.getManager = function () {};
});
