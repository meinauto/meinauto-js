"use strict";

/** @module app/tool */

/**
 * @class
 * @classdesc doc runner control
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.tool.Docs
 * @lends MeinAutoJs.app.tool.Docs
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.tool.Docs', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.tool.Docs
     * @private
     * @alias {MeinAutoJs.app.tool.Docs}
     */
    var _ = this;

    /**
     * @description initialize doc runner control
     * @memberOf MeinAutoJs.app.tool.Docs
     */
    _.construct = function () {
        renderDocs();
    };

    /**
     * @description render documentation runner
     * @memberOf MeinAutoJs.app.tool.Docs
     * @private
     */
    var renderDocs = function () {
        var $docRunner = $('[data-application="tool.Docs"]');

        $docRunner.removeClass('hidden');

        $docRunner.on('click', function () {
            location.search = 'docs';
        });
    };
});
