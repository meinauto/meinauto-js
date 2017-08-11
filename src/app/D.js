"use strict";

/**
 * @class
 * @classdesc test d
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.D
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.D', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.D
     * @private
     * @alias {MeinAutoJs.app.D}
     */
    var _ = this;

    /**
     * @description test a class
     * @memberOf MeinAutoJs.app.D
     * @alias {?MeinAutoJs.app.A}
     * @see MeinAutoJs.app.A
     */
    var A = null;

    /**
     * @description test b class
     * @memberOf MeinAutoJs.app.D
     * @alias {?MeinAutoJs.app.B}
     * @see MeinAutoJs.app.B
     */
    var B = null;

    /**
     * @description test c class
     * @memberOf MeinAutoJs.app.D
     * @alias {?MeinAutoJs.app.C}
     * @see MeinAutoJs.app.C
     */
    var C = null;

    /**
     * @description test e class
     * @memberOf MeinAutoJs.app.D
     * @alias {?MeinAutoJs.app.E}
     * @see MeinAutoJs.app.E
     */
    var E = null;

    /**
     * @description get dependent classes
     * @memberOf MeinAutoJs.app.D
     */
    _.getDependencies = function () {
        return [A, B, C, E];
    };

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.D
     */
    _.construct = function () {
        _.__manager__.ready('MeinAutoJs.app.A', function (module) {
            A = module;
        });

        _.__manager__.ready('MeinAutoJs.app.B', function (module) {
            B = module;
        });

        _.__manager__.ready('MeinAutoJs.app.C', function (module) {
            C = module;
        });

        _.__manager__.ready('MeinAutoJs.app.E', function (module) {
            E = module;
        });

        _.__manager__.add([
            'MeinAutoJs.app.A',
            'MeinAutoJs.app.B',
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.E'
        ]).done(function () {
            $(_).trigger('done');
        });
    };
});
