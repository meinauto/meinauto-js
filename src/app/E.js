"use strict";

/**
 * @class
 * @classdesc test e
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.E
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.E', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.E
     * @private
     * @alias {MeinAutoJs.app.E}
     */
    var _ = this;

    /**
     * @description test a class
     * @memberOf MeinAutoJs.app.E
     * @alias {?MeinAutoJs.app.A}
     * @see MeinAutoJs.app.A
     */
    var A = null;

    /**
     * @description test b class
     * @memberOf MeinAutoJs.app.E
     * @alias {?MeinAutoJs.app.B}
     * @see MeinAutoJs.app.B
     */
    var B = null;

    /**
     * @description test c class
     * @memberOf MeinAutoJs.app.E
     * @alias {?MeinAutoJs.app.C}
     * @see MeinAutoJs.app.C
     */
    var C = null;

    /**
     * @description test d class
     * @memberOf MeinAutoJs.app.E
     * @alias {?MeinAutoJs.app.D}
     * @see MeinAutoJs.app.D
     */
    var D = null;

    /**
     * @description get dependent classes
     * @memberOf MeinAutoJs.app.E
     */
    _.getDependencies = function () {
        return [A, B, C, D];
    };

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.E
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

        _.__manager__.ready('MeinAutoJs.app.D', function (module) {
            D = module;
        });

        _.__manager__.add([
            'MeinAutoJs.app.A',
            'MeinAutoJs.app.B',
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.D'
        ]).done(function () {
            $(_).trigger('done');
        });
    };
});
