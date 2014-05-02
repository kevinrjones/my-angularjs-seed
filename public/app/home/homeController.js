(function () {
    'use strict';
    var controllerId = "HomeController";

    angular.module('app').controller(controllerId, ["$scope", "common", HomeController]);

    function HomeController($scope, common) {

        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.startDate = new Date();
        vm.date = new Date();

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () {
                    log('Activated Main Page');
                });
        }

    }
})();