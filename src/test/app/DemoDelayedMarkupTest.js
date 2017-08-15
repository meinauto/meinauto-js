"use strict";

/**
 * @class test delayed demo markup
 */
MeinAutoJs.define('MeinAutoJs.test.app.DemoDelayedMarkupTest', new function () {
    /**
     * @description test delayed demo markup
     * @memberOf MeinAutoJs.test.app.DemoDelayedMarkupTest
     * @param {MeinAutoJs.test.Unit.assert} assert
     * @param {MeinAutoJs.app.DemoDelayedMarkup} moduleClass
     */
    this.testDelayedDemoMarkup = function (assert, moduleClass) {
        var assertAsync = assert.async();

        moduleClass.construct();

        moduleClass.$markup = $('<div/>');

        setTimeout(function () {
            assert.ok(
                0 < moduleClass.$markup.find('ul').length,
                'get delayed markup'
            );

            assertAsync();
        }, 2048);
    };
});
