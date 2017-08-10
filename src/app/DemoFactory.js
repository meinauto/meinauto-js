"use strict";

/** @module app/DemoFactory */

/**
 * @class
 * @classdesc an application demo as a factory
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.DemoFactory
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.DemoFactory', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @alias {MeinAutoJs.app.DemoFactory}
     */
    var _ = this;

    /**
     * @description the circle model
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @alias {MeinAutoJs.app.DemoFactory.model.Circle}
     * @see MeinAutoJs.app.DemoFactory.model.Circle
     */
    var Circle;

    /**
     * @description holds the created circles
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @type {Array.<MeinAutoJs.app.DemoFactory.model.Circle>}
     */
    var circles = [];

    /**
     * @description autoload stylesheet for display
     * @memberOf MeinAutoJs.app.DemoFactory
     * @type {boolean}
     */
    _.layout = true;

    /**
     * @description the application DOM
     * @memberOf MeinAutoJs.app.DemoFactory
     * @type {?jQuery}
     */
    _.$demoFactoryApp = null;

    /**
     * @description construct the module class
     * @memberOf MeinAutoJs.app.DemoFactory
     * @param {Object} module the request parameters
     */
    _.construct = function (module) {
        if (typeof module === 'undefined' ||
            !module.hasOwnProperty('parameters')
        ) {
            throw new Error('Missing construction parameters object!');
        }

        /**
         * @type {{data: {
         *  amount: number,
         *  size: string,
         *  background: string,
         *  border: string
         * }}}
         */
        var parameters = module.parameters;

        _.$demoFactoryApp = $('[data-application="DemoFactory"]');

        prepareCircleModel(parameters);
        showCreateCirclesControl();
    };

    /**
     * @description render circles
     * @memberOf MeinAutoJs.app.DemoFactory
     * @throws {Error} if no circles was constructed through factory class construct
     */
    _.renderCircles = function () {
        if (0 === circles.length) {
            throw new Error('No circles constructed yet!');
        }

        $(circles).each(function () {
            var circle = this;

            _.$demoFactoryApp.append(circle.get());
        });
    };

    /**
     * @description show create circle control button
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     */
    var showCreateCirclesControl = function () {
        var $control = _.$demoFactoryApp.find('button').removeClass('hidden');

        $control.on('click', function () {
            _.renderCircles();
        });
    };

    /**
     * @description prepare circle model
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @param {Object} parameters to build circles
     */
    var prepareCircleModel = function (parameters) {
        /**
         * @type {number}
         */
        var amount = 0;

        /**
         * @type {Object}
         */
        var options = {};

        if (typeof parameters !== 'undefined' &&
            parameters.hasOwnProperty('data') &&
            parameters.data.hasOwnProperty('amount') &&
            parameters.data.hasOwnProperty('size') &&
            parameters.data.hasOwnProperty('background') &&
            parameters.data.hasOwnProperty('border')
        ) {
            amount = parameters.data.amount;
            options = {
                size: parameters.data.size,
                background: parameters.data.background,
                border: parameters.data.border
            };

            _.__manager__.add('MeinAutoJs.app.DemoFactory.model.Circle')
                .done(function (module) {
                    Circle = module;

                    handleCircles(amount, options);
                });
        } else {
            throw new Error('Missing construction parameters object properties!');
        }
    };

    /**
     * @description handle created circles
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @param {number} amount as int
     * @param {Object} options for creation
     */
    var handleCircles = function (amount, options) {
        $(new Array(amount)).each(function (i) {
            circles.push(createCircle(
                i,
                options.size[i],
                options.background[i],
                options.border[i]
            ));
        });
    };

    /**
     * @description create a new circle
     * @memberOf MeinAutoJs.app.DemoFactory
     * @private
     * @param {number} id as int
     * @param {string} size set the size
     * @param {string} background set the background
     * @param {string} border set the border
     * @returns {MeinAutoJs.app.DemoFactory.model.Circle}
     * @throws {Error} if the circle {@link MeinAutoJs.app.DemoFactory.model.Circle.create}
     *  method is not called
     */
    var createCircle = function (id, size, background, border) {
        var circle = new Circle.constructor();

        try {
            circle
                .create(id, _)
                .setSize(size)
                .setBackgroundColor(background)
                .setBorderColor(border)
            ;
        } catch (error) {
            MeinAutoJs.console.error(error);
        }

        return circle;
    };
});
