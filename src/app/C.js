"use strict";

/**
 * @class
 * @classdesc test c
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.C
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.C', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.C
     * @private
     * @alias {MeinAutoJs.app.C}
     */
    var _ = this;

    /**
     * @description test a class
     * @memberOf MeinAutoJs.app.C
     * @alias {?MeinAutoJs.app.A}
     * @see MeinAutoJs.app.A
     */
    var A = null;

    /**
     * @description test b class
     * @memberOf MeinAutoJs.app.C
     * @alias {?MeinAutoJs.app.B}
     * @see MeinAutoJs.app.B
     */
    var B = null;

    /**
     * @description test d class
     * @memberOf MeinAutoJs.app.C
     * @alias {?MeinAutoJs.app.D}
     * @see MeinAutoJs.app.D
     */
    var D = null;

    /**
     * @description test e class
     * @memberOf MeinAutoJs.app.C
     * @alias {?MeinAutoJs.app.E}
     * @see MeinAutoJs.app.E
     */
    var E = null;

    /**
     * @description get dependent classes
     * @memberOf MeinAutoJs.app.C
     */
    _.getDependencies = function () {
        return [A, B, D, E];
    };

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.C
     */
    _.construct = function () {
        _.__manager__.ready('MeinAutoJs.app.A', function (module) {
            A = module;
        });

        _.__manager__.ready('MeinAutoJs.app.B', function (module) {
            B = module;
        });

        _.__manager__.ready('MeinAutoJs.app.D', function (module) {
            D = module;
        });

        _.__manager__.ready('MeinAutoJs.app.E', function (module) {
            E = module;
        });

        _.__manager__.add([
            'MeinAutoJs.app.A',
            'MeinAutoJs.app.B',
            'MeinAutoJs.app.D',
            'MeinAutoJs.app.E'
        ]).done(function () {
            $(_).trigger('done');
        });
    };
});
