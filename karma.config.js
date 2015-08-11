// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

'use strict';

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/lodash/lodash.js',

            'angular-lodash.js',
            'test/apiSpec.js',
            'test/serviceSpec.js',
            'test/ngFilterSpec.js',
            'test/filterSpec.js'
        ],

        preprocessors: {/*None*/},

        // list of files / patterns to exclude
        exclude: [],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};