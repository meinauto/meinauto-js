"use strict";

/**
 * @class
 * @classdesc Extend a module by module {@link MeinAutoJs.core.Manager~register} a module
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Extend
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
     * @param {MeinAutoJs.core.Manager.Module.class} inheritClass the inherited wrapper
     * @param {MeinAutoJs.core.Manager.Module.class} moduleClass the parent class
     * @returns {(null|MeinAutoJs.core.Manager.Module.class)}
     */
    _.inherit = function (inheritClass, moduleClass) {
        if (null !== inheritClass && null !== moduleClass) {
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
        }

        return inheritClass;
    };
});
