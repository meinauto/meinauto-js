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
     * @description setted true to test the manager by unit tests
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @type {boolean}
     * @default
     */
    var testing = false;

    /**
     * @description stored type names to prepare modules for DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @type {Array.<string>}
     */
    var prepared = [];

    /**
     * @description collection of queued requests
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @type {jQuery}
     */
    var $requests = $({});

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
     * @param {string} uri the module uri path
     * @param {boolean=} testRun if true then manager can be
     *  manually handled by tests
     */
    _.construct = function (uri, testRun) {
        moduleUri = uri || '';
        testing = testRun || false;

        if (false === testing) {
            _.add([
                MeinAutoJs.core.System.type,
                _.type,
                'MeinAutoJs.core.Extend',
                'MeinAutoJs.core.Controller',
                'MeinAutoJs.core.App'
            ]);
        }
    };

    /**
     * @description register a module into DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {Object} module an object with module class construction parameters
     * @param {string} module.type as module class name
     * @param {Object=} module.parameters an object of construction parameters
     * @returns {(void|Deferred)}
     * @throws {Error} if any module class construct exceptions are thrown
     * @todo refactor too long method {@link MeinAutoJs.core.Manager~register}
     */
    var register = function (module) {
        /**
         * @type {{systemTests: boolean, appPath: string}}
         */
        var configuration = MeinAutoJs.core.System.getConfiguration();

        /**
         * @description indicates that the system core module itself will be tested
         * @type {boolean}
         */
        var withSystemTests = configuration.systemTests || false;

        /**
         * @description type as module class name
         * @type {string}
         */
        var type = '';

        if (typeof module !== 'undefined' &&
            typeof module.type !== 'undefined'
        ) {
            type = module.type;
        }

        /* return resolver if module is already called or loaded */
        if (null !== getModule(type)) {
            return $.Deferred(function () {
                var $defer = this;
                $defer.resolve(getModule(type).class);
            });
        } else if (-1 === prepared.indexOf(type)) {
            prepared.push(type);
        } else if (-1 < prepared.indexOf(type) &&
            null === getModule(type)
        ) {
            return $.Deferred(function () {
                var $defer = this;
                _.ready(type, function (module) {
                    $defer.resolve(module);
                });
            });
        }

        if (MeinAutoJs.core.System.type === type) {
            /**
             * @description get module class manager
             * @memberOf MeinAutoJs.core.System
             * @see MeinAutoJs.core.Manager.Module.class.__manager__
             * @return {MeinAutoJs.core.Manager}
             */
            MeinAutoJs.core.System.__manager__ = _;
            _.modules.push(createModule(MeinAutoJs.core.System));
            delete MeinAutoJs.core.System.construct;
            if (true === withSystemTests &&
                true === Boolean(sessionStorage.getItem('runTests'))
            ) {
                test({type: MeinAutoJs.core.System.type}, false, true);
            }
            return;
        } else if (_.type === type) {
            _.modules.push(createModule(_));
            delete _.construct;
            if (true === withSystemTests &&
                true === Boolean(sessionStorage.getItem('runTests'))
            ) {
                test({type: type}, false, true);
            }
            return;
        }

        var isAppLoad = false;
        if (-1 < type.indexOf('MeinAutoJs.app.')) {
            isAppLoad = true;
        }

        var namespace = MeinAutoJs.core.System.getNamespace(type);

        var classUri = moduleUri;
        if (true === isAppLoad) {
            classUri = configuration.appPath;
            namespace = namespace.replace(/app\//, '');
        }

        var moduleUrl = classUri + '/' +
            namespace + '.js?' +
            String((new Date()).getTime());

        var layoutUri = null;

        var request = {
            url: moduleUrl,
            // if highlighted as unused property beforeSend bug:
            // https://youtrack.jetbrains.com/issue/WEB-19393
            beforeSend: function(request) {
                request.setRequestHeader(
                    'Cache-Control',
                    'no-cache, no-store, must-revalidate'
                );
                request.setRequestHeader(
                    'Pragma',
                    'no-cache'
                );
                request.setRequestHeader(
                    'Expires',
                    '0'
                );
            }
        };

        return registerRequest(request).then(function () {
            /**
             * @type {MeinAutoJs.core.Manager.Module.class}
             */
            var importedClass = getModuleDOM(type);

            if (true === testing && MeinAutoJs.core.Manager.has(type)) {
                // create a module class as mock for manager in test cases
                var mockClass = MeinAutoJs.core.Manager.get(type).class;
                importedClass = new mockClass.constructor();
            }

            importedClass.type = type;

            /**
             * @see MeinAutoJs.core.Manager.Module.class.__manager__
             */
            importedClass.__manager__ = _;

            _.modules.push(createModule(importedClass));

            if (typeof importedClass.extend !== 'undefined' &&
                typeof importedClass.extend === 'string'
            ) {
                return _.add(importedClass.extend); // only pre register module for inheritance
            } else {
                var inheritModule = getModuleByExtend(type);

                if (null !== inheritModule) {
                    var inheritClass = extend(
                        inheritModule.class,
                        importedClass
                    );

                    removeModule(importedClass.type);

                    importedClass = inheritClass;
                    type = importedClass.type;
                }
            }

            if (typeof module.parameters !== 'undefined' &&
                typeof module.parameters.app !== 'undefined' &&
                true === isAppLoad
            ) {
                /**
                 * @see MeinAutoJs.core.Manager.Module.class.__markup__
                 */
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

            return importedClass;
        })
        .then(function (importedClass) {
            if (typeof importedClass.construct === 'undefined') {
                importedClass.construct = function () {};
            }

            if (typeof importedClass.construct.parentClass !== 'undefined' &&
                typeof importedClass.construct.parentClass === 'function'
            ) {
                try {
                    importedClass.construct.parentClass(module);
                } catch (error) {
                    MeinAutoJs.console.error(error);
                }
            }

            try {
                importedClass.construct(module);
            } catch (error) {
                MeinAutoJs.console.error(error);
            }

            delete importedClass.construct;

            return importedClass;
        })
        .then(function (importedClass) {
            if (true === (MeinAutoJs.core.System.testing || false)) {
                test(module, isAppLoad, withSystemTests);
            }

            return importedClass;
        })
        .then(function (importedClass) {
            /**
             * @description fires to event if module is ready
             * @fires MeinAutoJs.core.Manager#ready:callback
             */
            $(_).trigger('ready:callback', importedClass);

            return importedClass;
        })
        .fail(function (error) {
            MeinAutoJs.console.error(
                (error.status || '0') + ' ' + (error.statusText || 'Error') +
                ' - Could not load' +
                ((isAppLoad) ? ' app' : '') + ' module "' +
                namespace + '"!'
            );
        });
    };

    /**
     * @description if test runner is activated try to find a test unit
     *  for every module class autoload
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {Object} module an object with module class construction parameters
     * @param {boolean} isAppLoad indicate module class as an app
     * @param {boolean} withSystemTests indicate to include core modules into test runner
     * @returns {void}
     * @throws {Error} if module class could not be cloned for test isolation
     * @tutorial MODULE-TEST-RUNNER
     * @todo refactor too long method test {@link MeinAutoJs.core.Manager~test}
     */
    var test = function (module, isAppLoad, withSystemTests) {
        if (true === testing) {return;} // if tests are testing the manager themself

        var type = module.type,
            parameters = module.parameters
        ;

        var namespace = MeinAutoJs.core.System.getNamespace(type),
            testCase = type.replace(/MeinAutoJs\./, 'MeinAutoJs.test.') + 'Test';

        var testUrl = moduleUri.replace(/module/, 'test/module') +
            '/' + namespace + 'Test.js?' +
            String((new Date()).getTime());

        if (true === isAppLoad) {
            testUrl = testUrl.replace(/module/, '');
        } else if (false === withSystemTests) {
            return; // test runner applies only to apps
        }

        /**
         * @description clone module class as copy from constructor per isolated test method
         * @param {MeinAutoJs.core.Manager.Module.class} moduleClass
         * @returns {MeinAutoJs.core.Manager.Module.class}
         * @throws {Error} module class failed to clone for test
         */
        var clone = function(moduleClass) {
            if (null !== moduleClass) {
                var inheritClass = new moduleClass.constructor();

                inheritClass.type = type;

                if (typeof parameters !== 'undefined' &&
                    true === isAppLoad
                ) {
                    inheritClass.__markup__ = parameters.app;
                }

                return inheritClass;
            } else {
                throw new Error('Can not clone module class "' + type + '" for test!');
            }
        };

        /**
         * @returns {MeinAutoJs.core.Manager}
         */
        var getManagerMock = function () {
            var manager = _,
                mock = new manager.constructor();

            mock.construct(moduleUri, true);

            delete mock.construct;

            return mock;
        };

        registerRequest({url: testUrl})
            .done(function () {
                var moduleClass = getModuleDOM(type),
                    moduleClassTest = getModuleDOM(testCase);

                var $testSetup = $.Deferred(),
                    $testCases = $testSetup.then(function (deferTestCase) {
                    if (typeof deferTestCase.setup !== 'undefined' &&
                        typeof deferTestCase.setup === 'function'
                    ) {
                        deferTestCase.setup(getManagerMock());
                    }

                    return deferTestCase;
                });

                var $testTeardown = $testCases.then(function (deferTestCase) {
                    if (0 < Object.keys(deferTestCase).length) {
                        var hasTestMethods = 0;
                        $.each(deferTestCase, function (testMethod) {
                            var test = deferTestCase[testMethod];
                            if (typeof test === 'function' && /^test.*/.test(String(testMethod))) {
                                MeinAutoJs.test.Unit.test(testCase + '. ' + testMethod, function (assert) {
                                    try {
                                        return test(assert, clone(moduleClass));
                                    } catch (error) {
                                        MeinAutoJs.console.error(error);
                                    }
                                });
                                hasTestMethods++;
                            }
                        });

                        if (0 === hasTestMethods) {
                            MeinAutoJs.console.warn('Test "' + testCase + '" has no test methods!');
                        }
                    }

                    return deferTestCase;
                });

                $testTeardown.done(function (deferTestCase) {
                    if (typeof deferTestCase.teardown !== 'undefined' &&
                        typeof deferTestCase.teardown === 'function'
                    ) {
                        deferTestCase.teardown();
                    }
                });

                $testSetup.resolve(moduleClassTest);
            })
            .fail(function (error) {
                MeinAutoJs.console.error(
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
     * @param {MeinAutoJs.core.Manager.Module.class} inheritClass the inherit class
     * @param {MeinAutoJs.core.Manager.Module.class} moduleClass the parent class
     * @returns {?MeinAutoJs.core.Manager.Module.class}
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
     * @returns {?string}
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
                })(namespace.substr(namespace.lastIndexOf('/') + 1)),
                reNamespace = (namespace.substr(0, namespace.lastIndexOf('/') + 1)) +
                layoutClassName;

            layoutUri = configuration.moduleLayout + '/' +
                reNamespace.toLowerCase() + '.css' +
                ((true === cacheBust) ? '?' + String((new Date()).getTime()) : '');

            registerRequest({url: layoutUri, method: 'head'})
                .fail(function (error) {
                    MeinAutoJs.console.error(
                        error.status + ' ' + error.statusText +
                        ' - Could not load layout for module "' + namespace + '"!'
                    );
                });
        }

        return layoutUri;
    };

    /**
     * @description register an asynchronous request
     * @memberOf MeinAutoJs.core.Manager
     * @param {Object} request a jQuery ajax request object definition
     * @return {Deferred}
     * @see http://api.jquery.com/jQuery.ajax/
     * @see http://api.jquery.com/jQuery.queue/
     */
    var registerRequest = function(request) {
        var $async,
            $defer = $.Deferred(),
            $resolver = $defer.promise();

        var registerCall = function (pipe) {
            $async = $.ajax(request);
            $async
                .done($defer.resolve)
                .fail($defer.reject)
                .then(pipe, pipe);
        };

        $requests.queue(registerCall);

        $resolver.abort = function(statusText) {
            if ($async) {
                return $async.abort(statusText);
            }

            var $queue = $requests.queue(),
                index = $.inArray(registerCall, $queue),
                context = request.context || request
            ;

            if (-1 < index) {
                $queue.splice(index, 1);
            }

            $defer.rejectWith(
                context,
                [
                    $resolver,
                    statusText,
                    ''
                ]
            );

            return $resolver;
        };

        return $resolver;
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
     * @returns {?MeinAutoJs.core.Manager.Module.class}
     * @throws {Error} if module class is not of type {Object}
     */
    var getModuleDOM = function(type) {
        var classScope = null,
            classPath = type.split('.');

        classScope = window; // set initial DOM crawl pointer

        $(classPath).each(function (i, className) {
            if (className in classScope) {
                classScope = classScope[className];
            }
        });

        if (typeof classScope !== 'object') {
            throw new Error(
                'Could not find module class "' + type + '" as <Object>; got instead "' + typeof classScope + '"'
            );
        }

        if (classScope instanceof Window) {
            classScope = null;
        }

        return classScope;
    };

    /**
     * @description get module from DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {?MeinAutoJs.core.Manager.Module}
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
     * @returns {?MeinAutoJs.core.Manager.Module}
     */
    var getModuleByExtend = function (type) {
        var inheritModule = null;

        $(_.modules).each(function () {
            var module = this,
                moduleClass = module.class;

            if (moduleClass.hasOwnProperty('extend') &&
                type === moduleClass.extend
            ) {
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
            if (null !== classScope) {
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
            }
        });

        return success;
    };

    /**
     * @description remove module from DIC
     * @memberOf MeinAutoJs.core.Manager
     * @private
     * @param {string} type as module class name
     * @returns {boolean}
     */
    var removeModule = function (type) {
        var success = false,
            layoutUri = null;

        $(_.modules).each(function (i) {
            var module = this;

            if (false === testing) {
                removeModuleDOM(type);
            }

            if (type === module.type) {
                var moduleClass = _.modules[i].class;

                if (null !== (layoutUri = getLayout(moduleClass, false))) {
                    $('head link[href^="' + layoutUri + '"]').remove();
                }

                $(_.modules[i]).off();

                _.modules.splice(i, 1);

                var preparedType = prepared.indexOf(type);
                if (preparedType > -1) {
                    prepared.splice(preparedType);
                }

                success = true;
            }
        });

        return success;
    };

    /**
     * @description ready module;
     *  the callback will be triggered if the named type
     *  of the module class is ready
     * @memberOf MeinAutoJs.core.Manager
     * @param {(string|Array.<string>)} type as module class name
     * @param {function} callback runs after module class is ready
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     * @see MeinAutoJs.core.Manager#ready:callback
     * @example MeinAutoJs.core.Manager
     *  .ready('MeinAutoJs.namespace.part.ClassName', function (module) {});
     * @example MeinAutoJs.core.Manager.ready([
     *      'MeinAutoJs.namespace.part.ClassNameA',
     *      'MeinAutoJs.namespace.part.ClassNameB',
     *      'MeinAutoJs.namespace.part.ClassNameC',
     * ], function (module) {});
     */
    _.ready = function (type, callback) {
        /**
         * @description set callback on ready event
         * @memberOf MeinAutoJs.core.Manager.ready
         * @private
         * @param {string} type as module class name
         * @param {function} callback runs after module class is ready
         */
        var onCallback = function (type, callback) {
            /**
             * @description listen to event when module is ready
             * @event MeinAutoJs.core.Manager#ready:callback
             */
            $(_).on('ready:callback', function (event, module) {
                if (type === module.type) {
                    /**
                     * @description the callback runs after module class is ready
                     * @callback MeinAutoJs.core.Manager.ready
                     * @param {MeinAutoJs.core.Manager.Module.class} module the module class
                     */
                    callback(module);
                }
            });
        };

        var onReadyError = function () {
            MeinAutoJs.console.error(
                'Parameter "type" must be a <string> or <Array> and "callback" a <function>!'
            );
        };

        if (Array.isArray(type)) {
            $(type).each(function () {
                if (typeof this === 'string' &&
                    typeof callback === 'function'
                ) {
                    if (true === _.has(this)) {
                        callback(_.get(this).class);
                    } else {
                        onCallback(this, callback);
                    }
                } else {
                    onReadyError();
                }
            });
        } else if (typeof type === 'string' &&
            typeof callback === 'function'
        ) {
            if (true === _.has(type)) {
                callback(_.get(type).class);
            } else {
                onCallback(type, callback);
            }
        } else {
            onReadyError();
        }
    };

    /**
     * @description remove module
     * @memberOf MeinAutoJs.core.Manager
     * @param {(string|Array.<string>)} type as module class name
     * @returns {boolean}
     * @example MeinAutoJs.core.Manager.remove('MeinAutoJs.namespace.part.ClassName');
     * @example MeinAutoJs.core.Manager.remove([
     *      'MeinAutoJs.namespace.part.ClassNameA',
     *      'MeinAutoJs.namespace.part.ClassNameB',
     *      'MeinAutoJs.namespace.part.ClassNameC'
     *  ]);
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.remove = function (type) {
        var onRemoveError = function (type) {
            MeinAutoJs.console.error('Could not remove module "' + type + '".');
        };

        if (Array.isArray(type)) {
            var done = false;
            $(type).each(function () {
                done = removeModule(type);
                if (false === done) {
                    onRemoveError(type);
                }
            });
            return done;
        } else if (typeof type === 'string') {
            return removeModule(type);
        } else {
            onRemoveError(type);
        }
    };

    /**
     * @description add module
     * @memberOf MeinAutoJs.core.Manager
     * @param {(string|Array.<string>|Array.Array.<string, Object>)} type as module class name
     * @param {Object=} parameters an object of construction parameters
     * @returns {Deferred}
     * @example MeinAutoJs.core.Manager.add('MeinAutoJs.namespace.part.ClassName');
     * @example MeinAutoJs.core.Manager.add('MeinAutoJs.namespace.part.ClassName', {})
     *  .done(function (module) {})
     *  .fail(function () {});
     * @example MeinAutoJs.core.Manager.add([
     *      'MeinAutoJs.namespace.part.ClassNameA',
     *      'MeinAutoJs.namespace.part.ClassNameB',
     *      'MeinAutoJs.namespace.part.ClassNameC'
     * ], {})
     *  .done(function (module) {})
     *  .fail(function () {});
     * @example MeinAutoJs.core.Manager.add([
     *      ['MeinAutoJs.namespace.part.ClassNameA', {}],
     *      ['MeinAutoJs.namespace.part.ClassNameB', {}],
     *      ['MeinAutoJs.namespace.part.ClassNameC', {}]
     * ])
     *  .done(function (module) {})
     *  .fail(function () {});
     * @tutorial MODULE-ORCHESTRATION-SYSTEM
     */
    _.add = function (type, parameters) {
        var $resolver,
            onAddError = function (type) {
                MeinAutoJs.console.error('Could not add module "' + type + ';' +
                    ' parameter "type" must be a <string> or <Array>!' +
                    ' and "parameters" if given; then as an <Object>'
                );
            };

        if (Array.isArray(type)) {
            $(type).each(function () {
                if (Array.isArray(this)) {
                    if (typeof this[0] === 'string' && typeof this[1] === 'object') {
                        $resolver = register({type: this[0], parameters: this[1]});
                    } else {
                        onAddError(this[0]);
                    }
                } else if (typeof this === 'string') {
                    $resolver = register({type: this, parameters: parameters});
                } else {
                    onAddError(this);
                }
            });
        } else if (typeof type === 'string') {
            $resolver = register({type: type, parameters: parameters});
        } else {
            onAddError(type);
        }

        if (typeof $resolver === 'undefined') {
            $resolver = $.Deferred(function () {
                this.reject(); // if nothing resolvable then reject immediately on return
            });
        }

        return $resolver;
    };

    /**
     * @description get module
     * @memberOf MeinAutoJs.core.Manager
     * @param {string} type as module class name
     * @returns {?MeinAutoJs.core.Manager.Module}
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
