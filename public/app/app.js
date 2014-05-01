(function () {

    'use strict';

    var app = angular.module('app', [
        'ngCookies',
        'common',
        'localization',

        'seedServices',

        'ui.router',
        'ui.bootstrap']);

    app.run(['$rootScope', '$location', '$state', '$stateParams', 'authenticate', function ($rootScope, $location, $state, $stateParams, authenticate) {
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            if ((typeof(next.data.authenticate) === "undefined" || next.data.authenticate)
                && !authenticate.isAuthenticated()) {
                $location.path("/login");
            }
        });
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

})();