﻿(function () {
    'use strict';

    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', 'common', 'config', shell]);

    function shell($rootScope, common, config) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        var events = config.events;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();

        function activate() {
            logSuccess('Seed Angular loaded!', null, true);
            common.activateController([], controllerId)
                .then(function () {
                    vm.showSplash = false;
                });
        }

        function toggleSpinner(on) {
            vm.isBusy = on;
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                toggleSpinner(true);
                console.log('$stateChangeStart');
            }
        );

        $rootScope.$on(events.controllerActivateSuccess,
            function (data) {
                console.log("spinner off");
                toggleSpinner(false);
            }
        );

        $rootScope.$on(events.spinnerToggle,
            function (data) {
                console.log("spinner 'show'");
                toggleSpinner(data.show);
            }
        );

    };
})();