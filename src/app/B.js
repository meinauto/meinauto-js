"use strict";

/**
 * @class
 * @classdesc test b
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.B
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.B', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.B
     * @private
     * @alias {MeinAutoJs.app.B}
     */
    var _ = this;

    /**
     * @description test a class
     * @memberOf MeinAutoJs.app.B
     * @alias {?MeinAutoJs.app.A}
     * @see MeinAutoJs.app.A
     */
    var A = null;

    /**
     * @description test c class
     * @memberOf MeinAutoJs.app.B
     * @alias {?MeinAutoJs.app.C}
     * @see MeinAutoJs.app.C
     */
    var C = null;

    /**
     * @description test d class
     * @memberOf MeinAutoJs.app.B
     * @alias {?MeinAutoJs.app.D}
     * @see MeinAutoJs.app.D
     */
    var D = null;

    /**
     * @description test e class
     * @memberOf MeinAutoJs.app.B
     * @alias {?MeinAutoJs.app.E}
     * @see MeinAutoJs.app.E
     */
    var E = null;

    /**
     * @description get dependent classes
     * @memberOf MeinAutoJs.app.B
     */
    _.getDependencies = function () {
        return [A, C, D, E];
    };

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.B
     */
    _.construct = function () {
        _.__manager__.ready('MeinAutoJs.app.A', function (module) {
            A = module;
        });

        _.__manager__.ready('MeinAutoJs.app.C', function (module) {
            C = module;
        });

        _.__manager__.ready('MeinAutoJs.app.D', function (module) {
            D = module;
        });

        _.__manager__.ready('MeinAutoJs.app.E', function (module) {
            E = module;
        });

        _.__manager__.add([
            'MeinAutoJs.app.A',
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.D',
            'MeinAutoJs.app.E'
        ]).done(function () {
            $(_).trigger('done');
        });
    };
});
