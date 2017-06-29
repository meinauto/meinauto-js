"use strict";

/** @var {(jQuery|function)} $ */

/**
 * @namespace
 * @typedef {Object} MeinAutoJs
 */
var MeinAutoJs = window.MeinAutoJs || {};
if ({} === MeinAutoJs) {throw new Error('Could not initialize framework!');}
if (typeof MeinAutoJs.core === 'undefined') {MeinAutoJs.core = {};}

/**
 * @class
 * @classdesc The module manager for dependencies and class autoloads
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Manager
 * @constructs
 */
MeinAutoJs.core.Manager = new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @alias {MeinAutoJs.core.Manager}
     */
    var _ = this;

    /**
     * @description path to module class root directory will be set on construct
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @type {string}
     */
    var moduleUri = '';

    /**
     * @description set module type before autoload can do this
     * @memberOf MeinAutoJs.core.Manager
     * @type {string}
     * @default
     */
    _.type = 'MeinAutoJs.core.Manager';

    /**
     * @description stored modules in DIC
     * @memberOf MeinAutoJs.core.Manager
     * @type {MeinAutoJs.core.Manager.Module[]}
     */
    _.modules = [];

    /**
     * @description initialize manager for DIC and autoload
     * @memberOf MeinAutoJs.core.Manager
     */
    _.construct = function (uri) {
        moduleUri = uri || '';

        _.add([
            MeinAutoJs.core.System.type,
            _.type,
            'MeinAutoJs.core.Extend',
            'MeinAutoJs.core.Controller',
            'MeinAutoJs.core.App'
        ]);
    };

    /**
     * @description register a module into DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {Object} module the module object with module class
     * @returns {(void|function)}
     */
    var register = function (module) {
        var type = '';

        if (typeof module !== 'undefined' &&
            typeof module.type !== 'undefined'
        ) {
            type = module.type;
        }

        if (null !== getModule(type)) {
            console.warn('Module is already loaded!');
            return;
        }

        if (MeinAutoJs.core.System.type === type) {
            _.modules.push(createModule(MeinAutoJs.core.System));
            delete MeinAutoJs.core.System.construct;
            return;
        } else if (_.type === type) {
            _.modules.push(createModule(_));
            delete _.construct;
            return;
        }

        var isAppLoad = false;
        if (-1 < type.indexOf('MeinAutoJs.app.')) {
            isAppLoad = true;
        }

        var namespace = MeinAutoJs.core.System.getNamespace(type);

        var classUri = moduleUri;
        if (true === isAppLoad) {
            /**
             * @type {{appPath: string}}
             */
            var configuration = MeinAutoJs.core.System.getConfiguration();
            classUri = configuration.appPath;
            namespace = namespace.replace(/app\//, '');
        }

        var moduleUrl = classUri + '/' +
            namespace + '.js?' +
            String((new Date()).getTime());

        createModuleDOM(type);

        return $.get(moduleUrl)
            .done(function () {
                var importedClass = getModuleDOM(type),
                    layoutUri = null;

                importedClass.type = type;

                _.modules.push(createModule(importedClass));

                if (importedClass.type === type) {
                    if (typeof importedClass.extend !== 'undefined' &&
                        typeof importedClass.extend === 'string'
                    ) {
                        _.add(importedClass.extend);
                        return; // only pre register module for inheritance
                    } else {
                        var inheritModule = getModuleByExtend(type);
                        if (null !== inheritModule) {
                            var inheritClass = extend(
                                inheritModule.class,
                                importedClass
                            );

                            removeModule(importedClass.type, true);

                            importedClass = inheritClass;
                        }
                    }

                    if (typeof importedClass.construct === 'undefined') {
                        importedClass.construct = function () {};
                    }

                    if (typeof importedClass.construct.parentClass !== 'undefined' &&
                        typeof importedClass.construct.parentClass === 'function'
                    ) {
                        importedClass.construct.parentClass(module);
                    }

                    importedClass.construct(module);

                    delete importedClass.construct;

                    if (null !== (layoutUri = getLayout(importedClass, true))) {
                        var $link = $('<link/>').attr({
                            'rel': 'stylesheet',
                            'href': layoutUri
                        });

                        $('head').append($link);
                    }

                    if (true === (MeinAutoJs.core.System.testing || false)) {
                        test(type, isAppLoad);
                    }
                }
            })
            .fail(function (error) {
                console.error(
                    error.status + ' ' + error.statusText +
                    ' - Could not load module "' + namespace + '"!'
                );
            });
    };

    /**
     * @description if test runner is activated try to find a test unit
     *  for every module class autoload
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @param {boolean} isAppLoad indicate module class as an app
     * @throws {Error} if module class could not be cloned
     * @tutorial MODULE-TEST-RUNNER
     */
    var test = function (type, isAppLoad) {
        var namespace = MeinAutoJs.core.System.getNamespace(type),
            testCase = type.replace(/MeinAutoJs\./, 'MeinAutoJs.test.') + 'Test';

        var testUrl = moduleUri.replace(/module/, 'test/module') +
            '/' + namespace + 'Test.js?' +
            String((new Date()).getTime());

        if (true === isAppLoad) {
            testUrl = testUrl.replace(/module/, '');
        } else {
            return; // test runner applies to apps
        }

        var clone = function(moduleClass) {
            if (null !== moduleClass) {
                var inheritClass = new function () {};

                $.each(moduleClass, function (property, mixed) {
                    inheritClass[property] = mixed;
                });

                return inheritClass;
            } else {
                throw new Error('Can not clone module class as test reference!');
            }
        };

        $.get(testUrl)
            .done(function () {
                var moduleClass = getModuleDOM(type),
                    moduleClassTest = getModuleDOM(testCase);

                console.info('Test for module "' + namespace + '" loaded.');

                if (0 < Object.keys(moduleClassTest).length) {
                    $.each(moduleClassTest, function (i) {
                        var test = moduleClassTest[i];
                        if (typeof test === 'function' && /^test.*/.test(i)) {
                            MeinAutoJs.test.Unit.test(testCase + '.' + i, function(assert) {
                                return test(assert, clone(moduleClass));
                            });
                        }
                    });
                } else {
                    console.warn('Test "' + testCase + '" has no test methods!');
                }
            })
            .fail(function (error) {
                console.error(
                    error.status + ' ' + error.statusText +
                    ' - Could not load test for module "' + namespace + '"!'
                );
            });
    };

    /**
     * @description inherit a module from another
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {MeinAutoJs.core.Manager.Module.class} inheritClass the inherited wrapper
     * @param {MeinAutoJs.core.Manager.Module.class} moduleClass the parent class
     * @returns {(null|MeinAutoJs.core.Manager.Module.class)}
     */
    var extend = function (inheritClass, moduleClass) {
        return MeinAutoJs.core.Extend.inherit(inheritClass, moduleClass);
    };

    /**
     * @description if module class use a layout then try to autoload the stylesheet
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {function} module the module class
     * @param {boolean} module.layout if module has layout
     * @param {string} module.type as module class name
     * @param {boolean} cache bust the cache to get module stylesheet fresh
     * @returns {(null|string)}
     */
    var getLayout = function (module, cache) {
        cache = cache || false;

        var layoutUri = null;

        if (module.hasOwnProperty('layout') &&
            true === module.layout
        ) {
            /**
             * @type {{moduleLayout: string}}
             */
            var configuration = MeinAutoJs.core.System.getConfiguration();

            /**
             * @type {string}
             */
            var namespace = MeinAutoJs.core.System.getNamespace(module.type);

            layoutUri = configuration.moduleLayout + '/' +
                namespace.toLowerCase() + '.css' +
                ((true === cache) ? '?' + String((new Date()).getTime()) : '');

            $.ajax(layoutUri, {method: 'head'})
                .fail(function (error) {
                    console.error(
                        error.status + ' ' + error.statusText +
                        ' - Could not load layout for module "' + namespace + '"!'
                    );
                });
        }

        return layoutUri;
    };

    /**
     * @description create a module object around the module class
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {function} module the module class
     * @param {string} module.type as module class name
     * @returns {MeinAutoJs.core.Manager.Module}
     * @throws {Error} if module could not be created
     */
    var createModule = function (module) {
        if (typeof module === 'function' && typeof module.type !== 'string') {
            throw new Error('Could not create module!');
        }

        /**
         * @typedef {Object} MeinAutoJs.core.Manager.Module
         * @see MeinAutoJs.core.Manager.Module.class
         */
        return {
            "type": module.type,
            "class": module
        };
    };

    /**
     * @description prepare module class namespace before class autoload
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     */
    var createModuleDOM = function (type) {
        var classScope = window,
            classPath = type.split('.');

        $(classPath).each(function (i) {
            if (typeof classScope[classPath[i]] === 'undefined') {
                classScope[classPath[i]] = {};
            }
            classScope = classScope[classPath[i]];
        });
    };

    /**
     * @description get module from DOM reference
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {(Window|MeinAutoJs.core.Manager.Module.class)}
     */
    var getModuleDOM = function(type) {
        var classScope = window,
            classPath = type.split('.');

        $(classPath).each(function (i, className) {
            if (className in classScope) {
                classScope = classScope[className];
            }
        });

        return classScope;
    };

    /**
     * @description get module from DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {(null|MeinAutoJs.core.Manager.Module)}
     */
    var getModule = function (type) {
        var module = null;

        $(_.modules).each(function () {
            var moduleClass = this;
            if (type === moduleClass.type) {
                module = this;
            }
        });

        return module;
    };

    /**
     * @description get module by extend from DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {(null|MeinAutoJs.core.Manager.Module)}
     */
    var getModuleByExtend = function (type) {
        var inheritModule = null;

        $(MeinAutoJs.core.Manager.modules).each(function () {
            var module = this,
                moduleClass = module.class;

            if (type === moduleClass.extend) {
                inheritModule = module;
            }
        });

        return inheritModule;
    };

    /**
     * @description remove module from DOM reference
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {boolean}
     */
    var removeModuleDOM = function(type) {
        var classScope = window,
            classPath = type.split('.'),
            success = false;

        $(classPath).each(function (i, className) {
            if (className in classScope) {
                if (1 === Object.keys(classScope[className]).length &&
                    classPath.length - 2 === i
                ) {
                    delete classScope[className];
                    success = true;
                } else if (classPath.length - 1 === i) {
                    delete classScope[className];
                    success = true;
                } else {
                    classScope = classScope[className];
                }
            } else {
                classScope = null;
            }
        });

        return success;
    };

    /**
     * @description remove module from DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @param {boolean=} silent do not message about remove
     * @returns {boolean}
     */
    var removeModule = function (type, silent) {
        var success = false,
            namespace = MeinAutoJs.core.System.getNamespace(type),
            layoutUri = null;

        silent = silent || false;

        $(_.modules).each(function (i) {
            var module = this;

            if (type === module.type && true === removeModuleDOM(type)) {
                var moduleClass = _.modules[i].class;

                if (null !== (layoutUri = getLayout(moduleClass, false))) {
                    $('head link[href^="' + layoutUri + '"]').remove();
                }

                $(_.modules[i]).off();

                _.modules.splice(i);

                success = true;

                if (false === silent) {
                    console.info('Module "' + namespace + '" successful removed.');
                }
            }
        });

        return success;
    };

    /**
     * @description add module
     * @memberOf MeinAutoJs.core.Manager
     * @param {(string|Array)} type as module class name
     * @param {Object=} parameters an object of construction parameters
     * @returns {function}
     * @example MeinAutoJs.core.Manager.add('MeinAutoJs.namespace.part.ClassName', {})
     *  .done(function () {})
     *  .fail(function () {});
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.add = function (type, parameters) {
        var $resolver;
        if (Array.isArray(type)) {
            $(type).each(function () {
                if (Array.isArray(this)) {
                    $resolver = register({type: this[0], parameters: this[1]});
                } else {
                    $resolver = register({type: this, parameters: parameters});
                }
            });
        } else if (typeof type === 'string') {
            $resolver = register({type: type, parameters: parameters});
        } else {
            console.error('Could not add module "' + type + '; Parameter "type" must be a string or array!');
        }

        return $resolver;
    };

    /**
     * @description remove module
     * @memberOf MeinAutoJs.core.Manager
     * @param {string} type as module class name
     * @returns {boolean}
     * @example MeinAutoJs.core.Manager.remove('MeinAutoJs.namespace.part.ClassName');
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.remove = function (type) {
        if (Array.isArray(type)) {
            var done = false;
            $(type).each(function () {
                done = removeModule(type);
                if (false === done) {
                    console.error('Could not remove module "' + type + '".');
                }
            });
            return done;
        } else if (typeof type === 'string') {
            return removeModule(type);
        } else {
            console.error('Could not remove module "' + type + '; Parameter "type" must be a string or array!');
        }
    };

    /**
     * @description get module
     * @memberOf MeinAutoJs.core.Manager
     * @param {string} type as module class name
     * @returns {(null|MeinAutoJs.core.Manager.Module)}
     * @example MeinAutoJs.core.Manager.get('MeinAutoJs.namespace.part.ClassName');
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.get = function (type) {
        return getModule(type);
    };
};
