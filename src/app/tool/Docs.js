"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.app === 'undefined') {MeinAutoJs.app = {};}
if (typeof MeinAutoJs.app.tool === 'undefined') {MeinAutoJs.app.tool = {};}

/**
 * @class
 * @classdesc doc runner control
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.tool.Docs
 * @constructs
 */
MeinAutoJs.app.tool.Docs = new function () {
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
        var $docsRunner = $('[data-application="tool.Docs"]');

        $docsRunner.on('click', function () {
            location.search = 'docs';
        });
    };
};
