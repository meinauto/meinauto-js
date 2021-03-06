# The Module Orchestration System (MOS)

*Module Description*

All modules stored in a Dependency Injection Container – in following called DIC

- listen to event when module class is ready registered into DIC;
the event will be fired on manager everytime if a module class get registered.

```javascript
MeinAutoJs.core.Manager.ready('MeinAutoJs.app.MockApp', function (module) {
    var MockApp = module;
});
```

- register a module class into DIC and receive a promise resolver

```javascript
/**
 * @param {string} type as module class name
 * @param {Object=} parameters optional object of construction parameters
 * @returns {Deferred}
 */
MeinAutoJs.core.Manager.add('MeinAutoJs.app.MockApp', {})
    .done(function (module) {
        /**
        * @alias {MeinAutoJs.app.MockApp}
        */
        var MockApp = module;
    })
    .fail(function() {/* on module fail... */});
```

- has a module class in DIC

```javascript
if (true === MeinAutoJs.core.Manager.has('MeinAutoJs.app.MockApp')) {}
```

- get a module class from DIC

```javascript
/**
 * @alias {MeinAutoJs.app.MockApp} MockApp
 */
var MockApp = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp').class;
```

- remove a module class from DIC

```javascript
if (true === MeinAutoJs.core.Manager.remove('MeinAutoJs.app.MockApp')) {}
```

## The Module Autoload Declaration (MAD)

For example there is a [module template][module-template](../../../src/module/template/Module.js.template).

First initializing point of the autoloaded module class could be an application 
markup or a direct object call from another javascripts to access the module by DIC.

### Append autoloader run script to document head or body bottom

```html
<head>
    <script src="../src/lib/init/Run.js"></script>
</head>
```

or

```html
<body>
    <!-- some markup... -->
    <script src="../src/lib/init/Run.js"></script>
</body>
```

### Automated unit testing for modules with [QUnit][qunit]

For automated testing use the integrated test runner:

* [Module Test Runner][MTR](../test/MODULE-TEST-RUNNER.md)

### Define an initializing point for an autoloaded class.

```html
<body>
    <!-- markup... -->
    <div class="hidden" data-application="MockApp"></div>
    <!-- further markup... -->
</body>
```

or with construction parameters

```html
<body>
    <!-- markup... -->
    <div class="hidden" data-application="MockApp" data-parameters='{"a": true}'></div>
    <!-- further markup... -->
</body>
```

### Create class file

    example:
    ./src/app/MockApp.js

```javascript
"use strict";

/**
 * @class
 * @classdesc my class description here
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.MockApp
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.MockApp', new function () {
    /**
     * @description bind public properties or methods
     * @memberOf MeinAutoJs.app.MockApp
     * @private
     * @alias {MeinAutoJs.app.MockApp}
     */
    var _ = this;

    /**
     * @description initialize application mock
     * @memberOf MeinAutoJs.app.MockApp
     * @public
     */
    _.construct = function () {
        $(_).on('custom.event', function() {
            doSomething();
        });
    };
    
    /**
     * @description do something with class event
     * @memberOf MeinAutoJs.app.MockApp
     * @private
     */
    var doSomething = function() {
        var $mockAppViewport = $('[data-application="MockApp"]');
        
        $mockAppViewport.removeClass('hidden');
        
        // do something
    };
});
```

### Function as first class citizen

Bind class scope to private variable to set on this public interfaces:

```javascript
/**
* @alias {MeinAutoJs.app.MockApp}
*/
var _ = this;
```

It is optional to define the autoload class method for module construction.

### Define class autoload constructor

This construct method get destroyed after module is loaded.

Describe the class autoload construction:

```javascript
/**
 * @public
 */
_.construct = function () {
    // do something
};
```

### Define class events

Bind custom events to class scope

```javascript
/**
 * @public
 */
_.construct = function () {
    $(_).on('custom:event', function() {
        doSomething();
    });
};

/**
 * @event MeinAutoJs.app.MockApp#custom:event
 * @private
 */
var doSomething = function() {
    var $mockAppViewport = $('[data-application="MockApp"]');
    // do something
};
```

Trigger custom events at outside the class scope;

e.g.

```javascript
/**
 * @fires MeinAutoJs.app.MockApp#custom:event
 */
console.log(
    $(MeinAutoJs.app.MockApp).trigger('custom:event', {})
);
```

### Define autoload dependency classes

    example:
    ./src/app/MockApp/controller/Doing.js
    ./src/app/MockApp/model/Data.js
    ./src/app/MockApp/view/Page.js

```javascript
/**
 * init
 */
_.construct = function () {
    MeinAutoJs.core.Manager.add([
        'MeinAutoJs.app.MockApp.controller.Doing',
        'MeinAutoJs.app.MockApp.model.Data',
        'MeinAutoJs.app.MockApp.view.Page'
    ]).done(function () {
        $(_).trigger('custom:event', {});
    });
    
    $(_).on('custom:event', function(event, parameters) {
        doSomething(parameters);
    });
};

/**
 * do something by class event
 * @param {Object} parameters
 */
var doSomething = function(parameters) {
  /** @alias {MeinAutoJs.app.MockApp.controller.Doing} */
  var controller = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp.controller.Doing').class;
  
  /** @alias {MeinAutoJs.app.MockApp.model.Data} */
  var model = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp.model.Data').class;
  
  /** @alias {MeinAutoJs.app.MockApp.view.Page} */
  var view = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp.view.Page').class;
};
```

## Extend classes with object inheritance

### Define an abstract class

    example:
    ./src/module/abstract/Controller.js

```javascript
"use strict";

/**
 * @class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.abstract.Controller
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.abstract.Controller', new function () {
    /**
     * @alias {MeinAutoJs.abstract.Controller}
     */
    var _ = this;
    
    /**
     * @type {number}
     */
    _.aProperty = 1;
    
    /**
     * @type {number}
     */
    _.bProperty = 1;
    
    /**
     * @return {boolean}
     */
    _.aMethod = function () {
        return true;
    };
    
    /**
     * init
     */
    _.construct = function () {
        // do something parent
    };
});
```

### Define an inherited class

    example:
    ./src/app/MockApp/controller/Doing.js

```javascript
"use strict";

/**
 * @class
 * @implements {MeinAutoJs.core.Manager.Module.class}
 * @typedef {function} MeinAutoJs.app.MockApp.controller.Doing
 * @constructs
 */
MeinAutoJs.define('MeinAutoJs.app.MockApp.controller.Doing', new function () {
    /**
     * @alias {MeinAutoJs.app.MockApp.controller.Doing}
     */
    var _ = this;
    
    /**
     * @type {string}
     */
    _.extend = 'MeinAutoJs.abstract.Controller';

    /**
     * @type {number}
     */
    _.bProperty = 2;
    
    /**
     * init
     */
    _.construct = function () {
        // do something inherit
    };
});
```

Results as a class that inherits all public properties and methods from the abstract class.

The inherited class is instantiated into the DIC, the abstract class is not instantiated.

If the parent class has a construct method it will call first the parent constructor.

At least the inherit constructor is called.

If an inherited public property / method is set, it doesn't set the parent public property / method.

```javascript
MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp.controller.Doing').class;
```

```
{
    type: 'MeinAutoJs.app.MockApp.controller.Doing',
    extend: 'MeinAutoJs.abstract.Controller',
    aProperty: 1,
    bProperty: 2,
    aMethod: function () {return true;}
}
```

[MTR]: https://github.com/meinauto/meinauto-js/blob/master/doc/tutorials/test/MODULE-TEST-RUNNER.md
[module-template]: https://github.com/meinauto/meinauto-js/blob/master/src/module/template/Module.js.template
[qunit]: https://qunitjs.com
