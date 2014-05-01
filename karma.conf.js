// Karma configuration
// Generated on Wed Sep 25 2013 11:07:43 GMT+0100 (GMT Daylight Time)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            "public/javascript/lib/jquery/jquery-2.0.0.js",
            "public/javascript/lib/underscore/underscore.js",
            "public/javascript/lib/angular/angular.js",
            "public/javascript/lib/angular/angular-resource.js",
            "public/javascript/lib/localize/localize.js",
            'public/javascript/timesheet/services/library_wrappers.js',
            'public/javascript/timesheet/services/slipsservice.js',
            'public/javascript/timesheet/services/services.js',
            'public/javascript/timesheet/entries/**/*.js',
            'public/javascript/timesheet/directives/**/*.js',
            'public/javascript/timesheet/app.js',
            'public/test/lib/angular-mocks/angular-mocks.js',
            'public/test/lib/sinon-1.7.1/sinon.js',
            'public/test/spec/SpecHelper.js',
            'public/test/spec/*Spec.js'
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: false,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
