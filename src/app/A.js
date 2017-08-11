"use strict";

/**
 * @class
 * @classdesc test a
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.A
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.A', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.A
     * @private
     * @alias {MeinAutoJs.app.A}
     */
    var _ = this;

    /**
     * @description test b class
     * @memberOf MeinAutoJs.app.A
     * @alias {?MeinAutoJs.app.B}
     * @see MeinAutoJs.app.B
     */
    var B = null;

    /**
     * @description test c class
     * @memberOf MeinAutoJs.app.A
     * @alias {?MeinAutoJs.app.C}
     * @see MeinAutoJs.app.C
     */
    var C = null;

    /**
     * @description test d class
     * @memberOf MeinAutoJs.app.A
     * @alias {?MeinAutoJs.app.D}
     * @see MeinAutoJs.app.D
     */
    var D = null;

    /**
     * @description test e class
     * @memberOf MeinAutoJs.app.A
     * @alias {?MeinAutoJs.app.E}
     * @see MeinAutoJs.app.E
     */
    var E = null;

    /**
     * @description get dependent classes
     * @memberOf MeinAutoJs.app.A
     */
    _.getDependencies = function () {
        return [B, C, D, E];
    };

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.A
     */
    _.construct = function () {
        _.__manager__.ready('MeinAutoJs.app.B', function (module) {
            B = module;
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
            'MeinAutoJs.app.B',
            'MeinAutoJs.app.C',
            'MeinAutoJs.app.D',
            'MeinAutoJs.app.E'
        ]).done(function () {
            $(_).trigger('done');
        });
    };
});
