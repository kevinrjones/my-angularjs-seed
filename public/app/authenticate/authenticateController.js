

(function () {
    'use strict';
    var controllerId = "AuthenticateController";


    angular.module('app').controller(controllerId, ['$scope', 'authenticate', 'common', AuthenticateController]);
    function AuthenticateController($scope, authenticate, common) {


        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () {
                    log('Activated Authentication Page');
                });
        }


        authenticate.signOut();
    }
})();

