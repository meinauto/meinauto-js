"use strict";

/**
 * @interface
 * @classdesc Module class interface representation
 * @typedef {function} MeinAutoJs.core.Manager.Module.class
 * @constructs
 * @tutorial MODULE-ORCHESTRATION-SYSTEM
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
     * @description the manager assign this property
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {string}
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.type = 'MeinAutoJs.core.Manager.Module.class';

    /**
     * @description bind a stylesheet on module;
     *  if true then add sass css file to ui library;
     *  this property is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @type {boolean}
     * @see '/src/lib/ui/template/module.scss.template'
     */
    _.layout = false;

    /**
     * @description construct the super class;
     *  the method get destroyed by manager after module is loaded;
     *  this method is optional
     * @memberOf MeinAutoJs.core.Manager.Module.class
     * @typedef {function} MeinAutoJs.core.Manager.Module.class.construct
     */
    _.construct = function () {};
});
