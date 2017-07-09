"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {{core: Object}} MeinAutoJs
 */
var MeinAutoJs = {core: {}};

/**
 * @class
 * @classdesc Initial loaded class as running system
 *  to register the module {@link MeinAutoJs.core.Manager};
 *  the test runner and the doc runner
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.System
 * @constructs
 */
MeinAutoJs.core.System = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.System
     * @private
     * @alias {MeinAutoJs.core.System}
     */
    var _ = this;

    /**
     * @description the system configuration
     *  {@link MeinAutoJs.core.System~configuration}
     * @memberOf MeinAutoJs.core.System
     * @private
     * @type {Object}
     */
    var configuration;

    /**
     * @description path to module class root directory
     * @memberOf MeinAutoJs.core.System
     * @private
     * @type {string}
     */
    var moduleUri;

    /**
     * @description path to documentation framework directory
     * @memberOf MeinAutoJs.core.System
     * @private
     * @type {string}
     */
    var docFrameworkUri;

    /**
     * @description path to test framework directory
     * @memberOf MeinAutoJs.core.System
     * @private
     * @type {string}
     */
    var testFrameworkUnitUri;

    /**
     * @description path to test framework theme
     * @memberOf MeinAutoJs.core.System
     * @private
     * @type {string}
     */
    var testFrameworkThemeUri;

    /**
     * @description set module type before autoload can do this
     * @memberOf MeinAutoJs.core.System
     * @type {string}
     * @default
     */
    _.type = 'MeinAutoJs.core.System';

    /**
     * @description is the testing framework is activated
     * @memberOf MeinAutoJs.core.System
     * @type {boolean}
     * @default
     */
    _.testing = false;

    /**
     * @description initialize manager, test and documentation framework
     * @memberOf MeinAutoJs.core.System
     */
    _.construct = function () {
        configure(function () {
            register({type: 'MeinAutoJs.core.Manager'});
            registerTestFramework();
            registerDocFramework();
        });
    };

    /**
     * @description configure system pathes
     * @memberOf MeinAutoJs.core.System
     * @private
     * @param {function} registerCallback the callback to register
     *  module manager, test and doc framework
     */
    var configure = function (registerCallback) {
        /**
         * @type {string}
         */
        var configPath = 'js/config/parameters.json';

        if (typeof window.MeinAutoJsConfigurationPath !== 'undefined') {
            /**
             * @typedef {string} MeinAutoJsConfigurationPath
             */
            configPath = window.MeinAutoJsConfigurationPath;
        }

        $.get(configPath)
            .done(function (data) {
                /**
                 * @type {{
                         *  modulePath: string,
                         *  docFramework: string,
                         *  testFrameworkUnit: string,
                         *  testFrameworkTheme: string
                         * }}
                 */
                configuration = data;
                moduleUri = configuration.modulePath;
                docFrameworkUri = configuration.docFramework;
                testFrameworkUnitUri = configuration.testFrameworkUnit;
                testFrameworkThemeUri = configuration.testFrameworkTheme;

                if (typeof registerCallback === 'function') {
                    /**
                     * @description define new module class
                     *  {@link MeinAutoJs.core.System~define}
                     * @memberOf MeinAutoJs
                     * @typedef {function} MeinAutoJs.define
                     */
                    MeinAutoJs.define = define;

                    registerCallback();
                }
            })
            .fail(function (error) {
                console.error(
                    error.status + ' ' + error.statusText +
                    ' - Could not load configuration!'
                );
            });
    };

    /**
     * @description register module manager
     * @memberOf MeinAutoJs.core.System
     * @private
     * @param {Object} module the module object with module class
     * @param {string} module.type as module class name
     */
    var register = function (module) {
        var type = module.type;

        var namespace = _.getNamespace(type);

        var moduleUrl = moduleUri + '/' +
            namespace + '.js?' + String((new Date()).getTime());

        $.get(moduleUrl)
            .done(function () {
                $(MeinAutoJs.core.Manager).on('ready:manager', function () {
                    MeinAutoJs.core.Manager.construct(moduleUri);
                }).trigger('ready:manager', module).off('ready:manager');
            })
            .fail(function (error) {
                console.error(
                    error.status + ' ' + error.statusText +
                    ' - Could not load module "' + namespace + '"!'
                );
            });
    };

    /**
     * @description register documentation framework
     * @memberOf MeinAutoJs.core.System
     * @private
     * @example "?docs" add url get parameter to start doc runner
     * @example "?docs-stop" add url get parameter to stop doc runner
     */
    var registerDocFramework = function () {
        var docRunner = 'jsdoc';

        if (-1 < location.search.indexOf('docs-stop')) {
            sessionStorage.removeItem('runDocs');
            $('> iframe', '#' + docRunner).remove();
        } else if (true === Boolean(sessionStorage.getItem('runDocs')) ||
            -1 < location.search.indexOf('docs')
        ) {
            $('body').prepend('<section class="docs">' +
                '<div id="' + docRunner + '"></div>' +
            '</section>');

            sessionStorage.setItem('runDocs', true);

            $(function() {
                var refreshTimeout = 10240,
                    refreshInterval = 0,
                    refreshFrame = function () {
                        $('> iframe', '#' + docRunner).get(0).contentDocument.location.reload();
                    };

                $('<button/>').prop({
                    'id': 'doc-runner-control'
                }).css({
                    position: 'fixed',
                    zIndex: 1001,
                    top: '.5rem',
                    right: '6rem',
                    display: 'inline',
                    width: '6rem',
                    textTransform: 'uppercase'
                }).text('running').appendTo('#' + docRunner);

                $('<iframe/>').attr({
                    'src': docFrameworkUri,
                    'frameborder': 0
                }).css({
                    background: 'white',
                    border: '0 none',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }).appendTo('#' + docRunner);

                setTimeout(function () {
                    var $runnerControl = $('#doc-runner-control').on('click', function () {
                        location.search = 'docs-stop';
                    }).on('mouseover', function () {
                        $(this).text('exit');
                    });

                    $('> iframe', '#' + docRunner).on('mouseover mouseenter', function () {
                        clearInterval(refreshInterval);
                        refreshInterval = 0;
                        $runnerControl.text('stopped');
                    }).on('mouseout mouseleave', function () {
                        clearInterval(refreshInterval);
                        refreshInterval = setInterval(refreshFrame, refreshTimeout);
                        $runnerControl.text('running');
                    });

                    refreshInterval = setInterval(refreshFrame, refreshTimeout);
                }, refreshTimeout / 10);
            });
        }
    };

    /**
     * @description register test framework
     * @memberOf MeinAutoJs.core.System
     * @private
     * @example "?tests" add url get parameter to start test runner
     * @example "?tests-stop" add url get parameter to stop test runner
     */
    var registerTestFramework = function () {
        if (-1 < location.search.indexOf('tests-stop')) {
            sessionStorage.removeItem('runTests');
        } else if (true === Boolean(sessionStorage.getItem('runTests')) ||
            -1 < location.search.indexOf('tests')
        ) {
            $.ajax(testFrameworkThemeUri, {method: 'head'})
                .fail(function (error) {
                    console.error(
                        error.status + ' ' + error.statusText +
                        ' - Could not load layout for test framework!'
                    );
                });

            var $link = $('<link/>').attr({
                'rel': 'stylesheet',
                'href': testFrameworkThemeUri
            });

            $('head').append($link);

            $('body').prepend('<section class="debug">' +
                '<div id="qunit"></div>' +
                '<div id="qunit-fixture"></div>' +
            '</section>');

            $.getScript(testFrameworkUnitUri)
                .done(function () {
                    /**
                     * @description test framework integration
                     * @memberOf MeinAutoJs
                     * @type {{Unit: QUnit}}
                     */
                    MeinAutoJs.test = {
                        Unit: window.QUnit || {}
                    };

                    _.testing = true;
                });

            $('<button/>').prop({
                'id': 'test-runner-control'
            }).css({
                position: 'fixed',
                zIndex: 1001,
                top: '.5rem',
                right: '1rem',
                display: 'inline',
                width: '3rem',
                textTransform: 'uppercase'
            }).text('✖').appendTo('.debug');

            $(document).on('click', '#test-runner-control', function () {
                location.search = 'tests-stop';
            });

            sessionStorage.setItem('runTests', true);
        }
    };

    /**
     * @description prepare module class namespace before class autoload
     * @memberOf MeinAutoJs.core.System
     * @private
     * @param {string} type as module class name
     * @param {function} moduleClass as module class function
     */
    var createModuleDOM = function (type, moduleClass) {
        var classScope = window,
            classPath = type.split('.');

        $(classPath).each(function (i) {
            if (typeof classScope[classPath[i]] === 'undefined') {
                classScope[classPath[i]] = {};
                if (classPath.length -1 === i) {
                    classScope[classPath[i]] = moduleClass;
                }
            } else if (typeof classScope[classPath[i]] === 'object' &&
                Object.keys(classScope[classPath[i]]).length > 0
            ) {
                if (classPath.length -1 === i) {
                    $.extend(true, classScope[classPath[i]], moduleClass);
                }
            }
            classScope = classScope[classPath[i]];
        });
    };

    /**
     * @description define a new module by type and module class
     * @memberOf MeinAutoJs.core.System
     * @private
     * @param {string} type as module class name
     * @param {function} moduleClass as module class function
     * @throws {Error} module class definition wrong
     */
    var define = function (type, moduleClass) {
        if (typeof type !== 'string') {
            throw new Error('The module class type must be of type <string>.');
        }

        if (typeof moduleClass !== 'undefined' &&
            (typeof moduleClass === 'function' || typeof moduleClass === 'object')
        ) {
            createModuleDOM(type, moduleClass);
        } else {
            throw new Error('The module class must be of type <function> or <object>.');
        }
    };

    /**
     * @description get namespace pattern as module path from dot notated path
     * @memberOf MeinAutoJs.core.System
     * @param {string} type as module class name
     * @returns {string}
     * @example MeinAutoJs.core.System.getNamespace('MeinAutoJs.namespace.part.ClassName');
     *  // returns: nameSpace/part/ClassName
     */
    _.getNamespace = function (type) {
        return String(type)
            .replace(/MeinAutoJs\./, '')
            .replace(/\.+/g, '/');
    };

    /**
     * @description returns the system configuration
     * @memberOf MeinAutoJs.core.System
     * @return {Object}
     */
    _.getConfiguration = function () {
        return configuration;
    };
};

MeinAutoJs.core.System.construct();
