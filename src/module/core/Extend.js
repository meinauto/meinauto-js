"use strict";

/**
 * @class
 * @classdesc Extend a module by module {@link MeinAutoJs.core.Manager~register} a module
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Extend
 * @lends MeinAutoJs.core.Extend
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.core.Extend', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.Extend
     * @private
     * @alias {MeinAutoJs.core.Extend}
     */
    var _ = this;

    /**
     * @description exclude this property or method names from inheritance
     * @memberOf MeinAutoJs.core.Extend
     * @private
     * @type {Array}
     */
    var excludeProperties = ['construct', 'type', 'extend'];

    /**
     * @description inherit a module from another
     * @memberOf MeinAutoJs.core.Extend
     * @param {MeinAutoJs.core.Manager.Module.class} inheritClass the inherit class
     * @param {MeinAutoJs.core.Manager.Module.class} moduleClass the parent class
     * @returns {MeinAutoJs.core.Manager.Module.class}
     * @throws {Error} if module class is not an object
     */
    _.inherit = function (inheritClass, moduleClass) {
        if (typeof inheritClass === 'object' && typeof moduleClass === 'object') {
            $.each(moduleClass, function (property, mixed) {
                if (-1 === excludeProperties.indexOf(property) &&
                    !(property in inheritClass)
                ) {
                    inheritClass[property] = mixed;
                }
            });

            if (typeof moduleClass.construct !== 'undefined' &&
                typeof moduleClass.construct === 'function'
            ) {
                inheritClass.construct.parentClass = moduleClass.construct;

                delete moduleClass.construct;
            }
        } else {
            throw new Error('Could not extend module! Expected two <Object>\'s as module class to extend.');
        }

        return inheritClass;
    };
});
