# The Module Test Runner (MTR)

*Test Runner Description*

The Test Runner will try to run tests for all modules stored in DIC

## The Module Test Autoload Declaration (MTAD)

For an example there is a [test template](../../../src/test/module/template/ModuleTest.js.template)

### Automated unit testing for modules with [QUnit][qunit]

    load system with get parameter "tests" like
    
    e.g.
    https://hostname/?tests
    
to disable the test suit send

    e.g.
    https://hostname/?tests-stop

#### Add unit test per module

    example:
    ./src/test/app/MockAppTest.js

```javascript
"use strict";

/**
 * @class
 */
MeinAutoJs.define('MeinAutoJs.test.app.MockApp', new function () {
    /**
     * @description test {@link MeinAutoJs.app.MockApp.layout} is setted
     * @param {MeinAutoJs.test.Unit.assert} assert the assertion interface
     * @param {MeinAutoJs.app.MockApp} moduleClass the process isolated module class
     */
    this.testHasLayout = function (assert, moduleClass) {
        assert.ok(moduleClass.layout, "has layout");
    };
});
```

##### Access application module class as isolated process

Get the app module class as an isolated process to make changes without apply to running module class in DIC

```javascript
this.testModuleClassIsolated = function (assert, moduleClass) {
    var mockApp = moduleClass;
    
    assert.ok(mockApp.type === 'MeinAutoJs.app.MockApp', "access module class as isolated process");
};
```

##### Access application module class from DIC

Get the app module class from DIC

```javascript
this.testModuleClassDIC = function (assert, moduleClass) {
    var mockApp = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp');
    
    assert.ok(mockApp.type === 'MeinAutoJs.app.MockApp', "access module class from DIC");
};
```

##### Access application in DOM

Get the app module representation from DOM

```javascript
this.testModuleApplicationDOM = function (assert, moduleClass) {
    var $mockApp = $('[data-application="MockApp"]');
    
    assert.ok($mockApp.length === 1, "access module class from DOM");
};
```


[qunit]: https://qunitjs.com
