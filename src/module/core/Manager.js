"use strict";

/**
 * @class
 * @classdesc The module manager for dependencies and class autoloads
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.core.Manager
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.core.Manager', new function () {
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
     * @param {string} module.type as module class name
     * @param {Object=} module.parameters an object of construction parameters
     * @returns {(void|function)}
     * @todo refactor too long method {@link MeinAutoJs.core.Manager~register}
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

        var layoutUri = null;

        return $.getScript(moduleUrl)
            .then(function () {
                var importedClass = getModuleDOM(type);

                importedClass.type = type;

                _.modules.push(createModule(importedClass));

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

                if (typeof module.parameters !== 'undefined' &&
                    typeof module.parameters.app !== 'undefined' &&
                    true === isAppLoad
                ) {
                    importedClass.__markup__ = module.parameters.app;
                }

                if (null !== (layoutUri = getLayout(importedClass, true))) {
                    var $link = $('<link/>').attr({
                        'rel': 'stylesheet',
                        'href': layoutUri
                    });

                    importedClass.__layout__ = $link.get(0);

                    $('head').append($link);
                }

                if (true === (MeinAutoJs.core.System.testing || false)) {
                    test(type, isAppLoad);
                }
            })
            .then(function () {
                var importedClass = getModuleDOM(type);

                /**
                 * @description fires to event if module is ready
                 * @fires MeinAutoJs.core.Manager#ready:callback
                 */
                $(_).trigger('ready:callback', importedClass);

                return importedClass;
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
     * @todo refactor too long method test {@link MeinAutoJs.core.Manager~test}
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

        /**
         * @description clone module class as copy from constructor per isolated test method
         * @param {MeinAutoJs.core.Manager.Module.class} moduleClass
         * @returns {*}
         * @throws {Error} module class failed to clone for test
         */
        var clone = function(moduleClass) {
            if (null !== moduleClass) {
                var inheritClass = new moduleClass.constructor();

                inheritClass.type = type;

                delete inheritClass.construct;

                return inheritClass;
            } else {
                throw new Error('Can not clone module class "' + type + '" for test!');
            }
        };

        $.getScript(testUrl)
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
     * @see MeinAutoJs.core.Extend
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
     * @param {boolean} cacheBust bust the cache to get module stylesheet fresh
     * @returns {(null|string)}
     */
    var getLayout = function (module, cacheBust) {
        cacheBust = cacheBust || false;

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

            /**
             * @type {string}
             */
            var layoutClassName = (function (toDashesLowerCase) {
                return toDashesLowerCase
                    .replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                    .toLowerCase();
            })(namespace.substr(namespace.lastIndexOf('/') + 1));

            namespace = (namespace.substr(0, namespace.lastIndexOf('/') + 1)) +
                layoutClassName;

            layoutUri = configuration.moduleLayout + '/' +
                namespace.toLowerCase() + '.css' +
                ((true === cacheBust) ? '?' + String((new Date()).getTime()) : '');

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
         * @type {{type: string, class: MeinAutoJs.core.Manager.Module.class}}
         * @see MeinAutoJs.core.Manager.Module.class
         */
        return {
            "type": module.type,
            "class": module
        };
    };

    /**
     * @description get module from DOM reference
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {(Window|MeinAutoJs.core.Manager.Module.class)}
     * @throws {Error} if module class is not of type {Object}
     */
    var getModuleDOM = function(type) {
        var classScope = window,
            classPath = type.split('.');

        $(classPath).each(function (i, className) {
            if (className in classScope) {
                classScope = classScope[className];
            }
        });

        if (typeof classScope !== 'object') {
            throw new Error('Could not find module class "' + type + '" as <object>; got instead "' + typeof classScope + '"');
        }

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
     * @description remove module from DOM reference;
     *  also if the parent namespace is empty it will be also deleted
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
     * @description ready module;
     *  the callback will be triggered if the named type
     *  of the module class is ready
     * @memberOf MeinAutoJs.core.Manager
     * @param {string} type as module class name
     * @param {function} callback runs after module class is ready
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.ready = function (type, callback) {
        if (true === _.has(type)) {
            callback(_.get(type).class);
        } else {
            /**
             * @description listen to event when module is ready
             * @event MeinAutoJs.core.Manager#ready:callback
             * @example MeinAutoJs.core.Manager
             *  .ready('MeinAutoJs.namespace.part.ClassName', function (module) {});
             */
            $(_).on('ready:callback', function (event, module) {
                if (type === module.type) {
                    callback(module);
                }
            });
        }
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
     * @description add module
     * @memberOf MeinAutoJs.core.Manager
     * @param {(string|Array.<string>)} type as module class name
     * @param {Object=} parameters an object of construction parameters
     * @returns {(Deferred|function)}
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
            console.error('Could not add module "' + type + '; parameter "type" must be a <string> or <array>!');
        }

        return $resolver;
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

    /**
     * @description has module
     * @memberOf MeinAutoJs.core.Manager
     * @param {string} type as module class name
     * @returns {boolean}
     * @example MeinAutoJs.core.Manager.has('MeinAutoJs.namespace.part.ClassName');
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.has = function (type) {
        return null !== getModule(type);
    };
});
