(function () {
    'use strict';

    var app = angular.module('app');


    var remoteServiceName = '[Change Me]';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        appErrorPrefix: '[Seed Error] ', //Configure the exceptionHandler decorator
        docTitle: '[Doc Titile - Change Me]: ',
        events: events,
        remoteServiceName: remoteServiceName,
        version: '1.0.0'
    };

    app.value('config', config);
    
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);


})();