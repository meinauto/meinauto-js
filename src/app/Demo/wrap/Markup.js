"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.app === 'undefined') {MeinAutoJs.app = {};}
if (typeof MeinAutoJs.app.Demo === 'undefined') {MeinAutoJs.app.Demo = {};}
if (typeof MeinAutoJs.app.Demo.wrap === 'undefined') {MeinAutoJs.app.Demo.wrap = {};}

/**
 * @class
 * @classdesc a application demo
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.Demo.wrap.Markup
 * @constructs
 */
MeinAutoJs.app.Demo.wrap.Markup = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     * @private
     * @alias {MeinAutoJs.app.Demo}
     */
    var _ = this;

    /**
     * @description initialize application demo
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     */
    _.construct = function () {
        wrapMarkup();
    };

    /**
     * @description wrap the demo markup with headline tag
     * @memberOf MeinAutoJs.app.Demo.wrap.Markup
     * @private
     */
    var wrapMarkup = function () {
        var $demo = $('[data-application="Demo"]');

        var title = $demo.text();

        $demo.html('<h1>' + title + '</h1>');

        $demo.removeClass('hidden');
    };
};
