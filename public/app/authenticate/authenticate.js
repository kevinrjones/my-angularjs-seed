(function () {
    'use strict';
    var serviceId = "authenticate";

    var app = angular.module('app');

    app.factory(serviceId, ["$http", "$cookies", authenticate]);

    function authenticate($http, $cookies) {

        var authenticated = $cookies.user ? true : false;

        var isAuthenticated = function (value) {
            if (arguments.length != 0) {
                authenticated = value;
            }
            return authenticated;
        };

        var signIn = function (userData) {
            if (!userData) {
                throw "No data to suppled for login"
            }
            var promise = $http.post("/login", userData);
            promise.success(function () {
                isAuthenticated(true);
            }).error(function () {
                console.log("error");
            });
            return promise;

        };

        var signOut = function () {
            var promise = $http.get("/logout");
            promise.success(function () {
                isAuthenticated(false);
            }).error(function () {
                console.log("error");
            });

            return promise;
        };


        var register = function (userData) {
            if (!userData) {
                throw "No data supplied for registration"
            }
            var promise = $http.post("/register", userData);
            promise.success(function () {
                isAuthenticated(true);
            });
            return promise;

        };

        return {
            signIn: signIn,
            signOut: signOut,
            isAuthenticated: isAuthenticated,
            register: register
        }
    }
})();



