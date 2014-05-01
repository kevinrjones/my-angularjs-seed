(function () {

    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());


    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routes', function ($stateProvider, $urlRouterProvider, $locationProvider, routes) {
        $locationProvider.html5Mode(true);

        routes.forEach(function (r) {
            $stateProvider.state(r.name, r.config);
        });
    }]);

    function getRoutes() {
        return [
            {
                name: 'home',
                config: {
                    url: '/',
                    templateUrl: '/app/entries/index.html',
                    data: {
                        authenticate: true
                    }
                }},
            {
                name: 'login',
                config: {
                    url: '/login',
                    templateUrl: '/app/authenticate/login.html',
                    data: {
                        authenticate: false
                    }
                }
            },
            {
                name: 'logout',
                config: {
                    url: '/logout',
                    templateUrl: '/app/authenticate/login.html',
                    data: {
                        authenticate: false
                    }
                }
            },
            {
                name: 'something',
                config: {
                    url: '/something:id',
                    templateUrl: 'partials/something.html',
                    data: {
                        authenticate: false
                    }
                }
            },
            {
                name: 'otherwise',
                config: {
                    redirectTo: '/'
                }
            }
        ];
    }

})();