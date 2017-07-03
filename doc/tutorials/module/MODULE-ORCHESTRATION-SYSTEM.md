## The Module Orchestration System (MOS)

*Module Description*

All modules stored in a Dependency Injection Container – in following called DIC

- register a module into DIC and receive a promise resolver

```javascript
MeinAutoJs.core.Manager.add('MeinAutoJs.app.MockApp')
    .done(function () {/* on module done */})
    .fail(function() {/* on module fail */});
```

- get a module from DIC

```javascript
var MockApp = MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp');
```

- remove a module from DIC

```javascript
MeinAutoJs.core.Manager.remove('MeinAutoJs.app.MockApp');
```

### The Module Autoload Declaration (MAD)

For an example there is a [module template](../../../src/module/template/Module.js.template).

First initializing point for the autoloader could be an application 
markup or a direct object call from another javascripts.

#### Append autoloader run script to document head

```html
<head>
    <script src="../src/lib/init/Run.js"></script>
</head>
```

#### Automated unit testing for modules with [QUnit][qunit]

For automated testing use the integrated test runner:

* [Module Test Runner](../test/MODULE-TEST-RUNNER.md)

#### Define an initializing point for an autoloaded class.

```html
<body>
    <div class="hidden" data-application="MockApp"></div>
</body>
```

#### Create class file

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
     * @alias {MeinAutoJs.app.MockApp}
     */
    var _ = this;

    /**
     * init
     */
    _.construct = function () {
        $(_).on('custom.event', function() {
            doSomething();
        });
    };
    
    /**
     * do something with class event
     */
    var doSomething = function() {
        var $mockAppViewport = $('[data-application="MockApp"]');
        
        $mockAppViewport.removeClass('hidden');
        
        // do something
    };
});
```

#### Function as first class citizen

Bind class scope to private variable to set on this public interfaces:

```javascript
/**
* @alias {MeinAutoJs.app.MockApp}
*/
var _ = this;
```

Define the autoload class method for module construction:

This method get destroyed after module is loaded.

#### define class autoload constructor

Describe the class autoload construction:

```javascript
/**
 * init
 */
_.construct = function () {
    // do something
};
```

#### define class events

Bind custom events to class scope

```javascript
/**
 * init
 */
_.construct = function () {
    $(_).on('custom.event', function() {
        doSomething();
    });
};

/**
 * do something with class event
 */
var doSomething = function() {
    var $mockAppViewport = $('[data-application="MockApp"]');
    // do something
};
```

Trigger custom events in class scope

```javascript
$(MeinAutoJs.app.MockApp).trigger('custom.event', {});
```

#### define autoload dependency classes

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
        $(_).trigger('custom.event');
    });
    
    $(_).on('custom.event', function() {
        doSomething();
    });
};

/**
 * do something with class event
 */
var doSomething = function() {
  /** @type {MeinAutoJs.app.MockApp.controller.Doing} */
  var controller = MeinAutoJs.app.MockApp.controller.Doing;
  
  /** @type {MeinAutoJs.app.MockApp.model.Data} */
  var model = MeinAutoJs.app.MockApp.model.Data;
  
  /** @type {MeinAutoJs.app.MockApp.view.Page} */
  var view = MeinAutoJs.app.MockApp.view.Page;
};
```

### extend classes as object inheritance

#### define an abstract class

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

#### define an inherited class

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

If a inherited public property / method is set, it doesn't set the parent public property / method.

```javascript
MeinAutoJs.core.Manager.get('MeinAutoJs.app.MockApp.controller.Doing');
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


[qunit]: https://qunitjs.com
