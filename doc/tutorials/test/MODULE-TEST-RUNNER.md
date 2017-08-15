# The Module Test Runner (MTR)

*Test Runner Description*

The Test Runner will try to run tests for all modules stored in DIC

## The Module Test Autoload Declaration (MTAD)

For an example there is a [test template][test-template](../../../src/test/module/template/ModuleTest.js.template)

### Automated unit testing for modules with [QUnit][qunit]

    load system with get parameter "tests" like
    
    e.g.
    http://localhost/meinauto-js/web/?tests
    
to disable the test suit send

    e.g.
    http://localhost/meinauto-js/web/?tests-stop

#### Add unit test per module

    example:
    ./src/test/app/MockAppTest.js

```javascript
"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.MockAppTest', new function () {
    /**
     * @description test {@link MeinAutoJs.app.MockApp.layout} is setted
     * @memberOf MeinAutoJs.test.app.MockAppTest
     * @param {MeinAutoJs.test.Unit.assert} assert the assertion interface
     * @param {MeinAutoJs.app.MockApp} moduleClass the process isolated module class
     */
    this.testHasLayout = function (assert, moduleClass) {
        assert.ok(moduleClass.layout, "has layout");
    };
});
```

##### Access application module class as an isolated process

Get the app module class as an isolated process to make changes without apply to running module class in DIC

```javascript
this.testModuleClassIsolated = function (assert, moduleClass) {
    var mockApp = moduleClass;
    
    assert.ok('MeinAutoJs.app.MockApp' === mockApp.type, 'access module class as isolated process');
};
```

##### Access application module class from DIC

Get the app module class from DIC

```javascript
this.testModuleClassDIC = function (assert) {
    var mockApp = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp');
    
    assert.ok('MeinAutoJs.app.MockApp' === mockApp.type, 'access module class from DIC');
};
```

##### Access application in DOM

Get the app module representation from DOM

```javascript
this.testModuleApplicationDOM = function (assert) {
    var $mockApp = $('[data-application="MockApp"]');
    
    assert.ok(0 < $mockApp.length, 'access module class from DOM');
};
```

#### Setup and teardown test cases

```javascript
this.setup = function () {
  // setup something at module class scope variables or other ways
};

this.teardown = function () {
    // teardown something
};
```

##### Deferred setup and teardown

```javascript
this.setup = function () {
    // it is possible to return a deferred object to 
    // delay the test case setup since something is done
    return $.Deferred(function () {
        var $defer = this;
        setTimeout(function () {
            $defer.resolve();
        }, 1024); // example for a deferred test case setup
    });
};

this.teardown = function () {
    // it is possible to return a deferred object to 
    // delay the test case teardown since something is done
    return $.Deferred(function () {
        var $defer = this;
        setTimeout(function () {
            $defer.resolve();
        }, 1024); // example for a deferred test case teardown
    });
};
```

##### Use class autoload and dependency manager as an isolated instance

For an example there is a [test template][test-template](../../../src/test/module/template/ModuleTest.js.template)

```javascript
/**
 * @description an optional DIC manager instance that is isolated
 *  for this test case
 * @private
 * @alias {MeinAutoJs.core.Manager}
 * @see MeinAutoJs.core.Manager
 */
var manager;

/**
 * @param {MeinAutoJs.core.Manager} managerInstance the DIC manager
 *  as an isolated instance
 */
this.setup = function (managerInstance) {
    manager = managerInstance;
};
```

#### Access the manager and application markup from inner module class scope

For better test case accessibility the manager and markup from implementation can be accessed by inner module class scope.

This means that in test cases the isolated module class instance own manager property 
are overridden by a isolated test case manager instance and the markup can be overridden per test method.

The manager and markup properties are described at the module class interface "MeinAutoJs.core.Manager.Module.class" 
can be found in the generated documentation.

```javascript
"use strict";

/**
 * @class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.BetterTestableModuleClass
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.abstract.Controller', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.BetterTestableModuleClass
     * @private
     * @alias {MeinAutoJs.app.BetterTestableModuleClass}
     */
    var _ = this;
    
    /**
     * @description a model dependency
     * @memberOf MeinAutoJs.app.BetterTestableModuleClass
     * @private
     * @alias {MeinAutoJs.app.BetterTestableModuleClass.model.Dependency}
     * @see MeinAutoJs.app.BetterTestableModuleClass.model.Dependency
     */
    var Dependency;
    
    /**
     * @description initialize module class
     * @memberOf MeinAutoJs.app.BetterTestableModuleClass
     */
    _.construct = function () {
        _.__manager__
            .add('MeinAutoJs.app.BetterTestableModuleClass.model.Dependency')
            .done(function (module) {
                Dependency = module;
                
                var renderedContent = Dependency.getContent();
                
                $(_.__markup__).find('div.better-testable-dom-element').html(renderedContent);
            });
    };
});
```

At test cases use the isolated manager instance with the isolated module class instance;

All modules that added to the isolated manager instance are also isolated inside this manager.

```javascript
"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.BetterTestableModuleClassTest', new function () {
    /**
     * @description an optional DIC manager instance that is isolated
     *  for this test case
     * @memberOf MeinAutoJs.test.app.BetterTestableModuleClassTest
     * @private
     * @alias {MeinAutoJs.core.Manager}
     * @see MeinAutoJs.core.Manager
     */
    var manager;
    
    /**
     * @description mocked markup for test
     * @memberOf MeinAutoJs.test.app.BetterTestableModuleClassTest
     * @private
     */
    var $mockMarkup;
    
    /**
     * @description setup the manager instance
     * @memberOf MeinAutoJs.test.app.BetterTestableModuleClassTest
     * @param {MeinAutoJs.core.Manager} managerInstance the DIC manager
     *  as an isolated instance
     */
    this.setup = function (managerInstance) {
        manager = managerInstance;
        
        $mockMarkup = $('<div/>').addClass('test-dom-mock')
            .append($('<div/>').addClass('better-testable-dom-element'))
        ;
    };
    
    /**
     * @description test {@link MeinAutoJs.app.BetterTestableModuleClass} model dependency
     * @memberOf MeinAutoJs.test.app.BetterTestableModuleClassTest
     * @param {MeinAutoJs.test.Unit.assert} assert the assertion interface
     * @param {MeinAutoJs.app.BetterTestableModuleClass} moduleClass the process isolated module class
     */
    this.testHasConstructedDependency = function (assert, moduleClass) {
        var assertAsync = assert.async();
        
        // use the mocked manager instance
        manager
            .add(moduleClass.type)
            .done(function (betterTestableModuleClass) {
                
                // set the mocked markup to module class instance markup reference
                betterTestableModuleClass.__markup__ = $mockMarkup;
                
                manager.ready(
                    'MeinAutoJs.app.BetterTestableModuleClass.model.Dependency', 
                    function(betterTestableModuleClassModelDependency) {
                        assert.ok(
                            'MeinAutoJs.app.BetterTestableModuleClass.model.Dependency' === betterTestableModuleClassModelDependency.type,
                            'module class model dependency loaded'
                        );
                        
                        var $content = $(betterTestableModuleClass.__markup__).find('div.better-testable-dom-element');
                        
                        assert.ok(0 < $content.length, 'content found in markup');
                        
                        assertAsync();
                    })
                    .fail(function(error) {
                        assert.notOk(true, 'failed to load module class dependency with error: ' + JSON.stringify(error));
                        
                        assertAsync();
                    })
                ;
            });
    };
});
```

[test-template]: https://github.com/xeroxzone/meinauto-js/blob/master/src/test/module/template/ModuleTest.js.template
[qunit]: https://qunitjs.com
