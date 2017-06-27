## The Module Test Runner (MTR)

*Test Runner Description*

The Test Runner will try to run tests for all modules stored in DIC

### The Module Test Autoload Declaration (MTAD)

For an example there is a [test template](../../../src/test/module/template/ModuleTest.js.template)

#### Automated unit testing for modules with [QUnit][qunit]

    load system with get parameter "tests" like
    
    e.g.
    https://hostname/?tests
    
to disable the test suit send

    e.g.
    https://hostname/?tests-stop

##### Add unit test per module

    example:
    ./src/test/app/MockAppTest.js

```javascript
"use strict";

if (typeof MeinAutoJs.test.app === 'undefined') {MeinAutoJs.test.app = {};}

/**
 * @class
 */
MeinAutoJs.test.app.MockApp = new function () {
    /**
     * test MeinAutoJs.app.MockApp.layout is setted
     * @param {MeinAutoJs.test.Unit.assert} assert the assertion interface
     * @param {MeinAutoJs.app.MockApp} moduleClass the process isolated module class
     */
    this.testHasLayout = function (assert, moduleClass) {
        assert.ok(moduleClass.layout, "has layout");
    };
};
```


[qunit]: https://qunitjs.com
