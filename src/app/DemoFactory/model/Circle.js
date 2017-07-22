"use strict";

/** @module app/DemoFactory */
/** @module app/DemoFactory/model/Circle */

/**
 * @class
 * @classdesc a model to be created by factory
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoFactory.model.Circle
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoFactory.model.Circle', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @private
     * @alias {MeinAutoJs.app.DemoFactory.model.Circle}
     */
    var _ = this;

    /**
     * @description the circle element
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @private
     * @type {?jQuery}
     */
    var $circle = null;

    /**
     * @description throws an error if the create method was not called
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @private
     * @throws {Error} if the create method was not called
     *  before use of setters or getters
     */
    var onCreateError = function () {
        throw new Error('Firstly use the create method!');
    };

    /**
     * @description create a circle
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @requires module:app/DemoFactory
     * @param {number} id as int
     * @param {MeinAutoJs.app.DemoFactory} factory the creator class
     * @param {string} factory.type check for correct factory class type
     * @returns {this}
     * @throws {Error} if the create method
     *  is not called from the correct factory class type
     */
    _.create = function (id, factory) {
        if (typeof factory === 'undefined' ||
            (factory.hasOwnProperty('type') &&
                'MeinAutoJs.app.DemoFactory' !== factory.type)
        ) {
            throw new Error('Only can create from factory class!');
        }

        $circle = $('<div/>');

        $circle
            .prop({
                id: 'circle-' + id
            })
            .addClass('circle')
        ;

        delete _.create;

        return _;
    };

    /**
     * @description set circle size
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @param {string} size the width and height proportion
     * @returns {this}
     */
    _.setSize = function (size) {
        if (null === $circle) {onCreateError();}

        $circle
            .css({
                width: size,
                height: size
            })
        ;

        return _;
    };

    /**
     * @description set circle background color
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @param {string} color for the background
     * @returns {this}
     */
    _.setBackgroundColor = function (color) {
        if (null === $circle) {onCreateError();}

        $circle
            .css({
                backgroundColor: color,
                borderWidth: '.1rem',
                borderStyle: 'solid'
            })
        ;

        return _;
    };

    /**
     * @description set circle border color
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @param {string} color for the border
     * @returns {this}
     */
    _.setBorderColor = function (color) {
        if (null === $circle) {onCreateError();}

        $circle
            .css({
                borderColor: color
            })
        ;

        return _;
    };

    /**
     * @description get a circle after create and setted parameters
     * @memberOf MeinAutoJs.app.DemoFactory.model.Circle
     * @returns {jQuery}
     */
    _.get = function () {
        if (null === $circle) {onCreateError();}

        return $circle;
    };
});
