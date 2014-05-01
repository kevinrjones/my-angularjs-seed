(function () {
    'use strict';

    var controllerId = "AuthenticationController";
    var app = angular.module('app');

    app.directive("authenticate", ['localize', '$location', 'authenticate', 'common', function (localize, $location, authenticate, common) {
        return {
            restrict: 'E',
            scope: {
                mainclass: "@"
            },
            replace: true,
            link: function(scope){
                var getLogFn = common.logger.getLogFn;
                var log = getLogFn("authenticateDirective");

                var errorMessage = localize.getLocalizedString("UserAlreadyExists");

                scope.isError = false;
                scope.isRegistering = false;
                scope.ErrorMessage = "LogonError";

                scope.isSignedIn = function () {
                    return authenticate.isAuthenticated();
                };
                scope.showRegisterUI = function (show) {
                    scope.isRegistering = show;
                };
                scope.signout = function () {
                    var promise = authenticate.signOut();
                    promise
                        .success(function () {
                            console.log("signOut success");
                        }).error(function () {
                            console.log("error");
                        });

                };
                scope.signin = function (user) {
                    log("sign in", null, false);
                    var promise = authenticate.signIn(user);
                    promise
                        .success(function (data, status, header) {
                            $location.path("/");
                        }).error(function () {
                            scope.isError = true;
                            scope.ErrorMessage = "LogonError";
                            console.log("error");
                        });
                };
                scope.register = function (user) {
                    var promise = authenticate.register(user);
                    promise
                        .success(function (data, status, header) {
                            $location.path("/");
                        }).error(function (message, errorCode) {
                            scope.isError = true;
                            if (errorCode == 409) {
                                errorMessage = localize.getLocalizedString("UserAlreadyExists");
                                $.growl.error({ message: errorMessage });
                            } else {
                                errorMessage = localize.getLocalizedString("LogonError");
                            }
                        });
                };

                scope.getErrorMessage = function () {
                    return errorMessage;
                };

            },
            template: '<div>' +
                '    <div class="{{mainclass}}" ng-show="!isRegistering">' +
                '        <div id="manageUserUi" class="userManager">' +
                '            <span class="close" ng-click="showManageUserUi()"></span>' +
                '            <form name="authenticateSignInForm" id="authenticateSignInForm" novalidate>' +
                '                <div ng-hide="isSignedIn()">' +
                '                    <div>' +
                '                        <input id="authn_userName" type="text" placeholder="email" ng-model="user.email" required />' +
                '                    </div>' +
                '                    <div>' +
                '                        <input id="authn_userPassword" type="password" placeholder="password" ng-model="user.password" required />' +
                '                    </div>' +
                '                    <div>' +
                '                        <button class="btn" ng-click="signin(user)" ng-disabled="authenticateSignInForm.$invalid || user.isSignedIn" >Sign In</button>' +
                '                    </div>' +
                '                     <div class="registerHolder">' +
                '                         <a href="javascript:void(0)" ng-click="showRegisterUI(true)">Register</a>' +
                '                     </div>' +
                '                    <div class="alert alert-error" ng-show="isError" data-i18n="{{ ErrorMessage }}"></div>' +
                '                </div>' +
                '                <div ng-show="isSignedIn()">' +
                '                    <button class="btn" ng-click="signout()">Sign out</button>' +
                '                </div>' +
                '            </form>' +
                '        </div>' +
                '    </div>' +
                '    <div class="{{mainclass}}" ng-show="isRegistering">' +
                '        <div id="manageUserUi" class="userManager">' +
                '            <span class="close" ng-click="showManageUserUi()"></span>' +
                '            <form name="authenticateRegisterForm" id="authenticateRegisterForm" novalidate>' +
                '                <div ng-hide="isSignedIn()">' +
                '                    <div>' +
                '                        <input id="authn_userName" type="text" placeholder="email" ng-model="user.email" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_name" type="text" placeholder="name" ng-model="user.name" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_userPassword" type="password" placeholder="password" ng-model="user.password" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_repeatPassword" type="password" placeholder="repeat password" ng-model="user.repeatpassword" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <button id="authn_register" ng-click="register(user)" ng-disabled="authenticateRegisterForm.$invalid" class="btn">Register</button>' +
                '                     </div>' +
                '                     <div class="registerHolder">' +
                '                         <a href="javascript:void(0)" ng-click="showRegisterUI(false)">Sign In</a>' +
                '                     </div>' +
                '                     <div class="alert alert-error" ng-show="isError" ng-bind="getErrorMessage()"></div>' +
                '                </div>' +
                '            </form>' +
                '        </div>' +
                '    </div>' +
                '</div>'
        };
    }]);


    app.directive('tsDatePicker', ['localize', function () {
        var getStartDate = function (dateFrom) {
            var day = dateFrom.getDay();
            var monday = dateFrom.getDate() - day + 1;
            return new Date(dateFrom.getFullYear(), dateFrom.getMonth(), monday);
        };
        return {
            restrict: 'E',
            template: '<span>{{ "WeekCommencing" | i18n }}: </span><input type="text"/><button data-ng-click="showDate()"><i class="glyphicon glyphicon-calendar"></i></button>',
            scope: {
                date: "=",
                daily: "@",
                id: "@"
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                var datepicker;
                var visible = false;
                var button = element.find('button');
                var startDate;
                var daily = scope.daily == "false" ? false : true;

                scope.showDate = function () {
                    if (visible) {
                        datepicker.datepicker('destroy');
                        visible = false;
                    } else {
                        datepicker.datepicker('show');
                        visible = true;
                    }
                };
                datepicker = element.find('input').datepicker({
                    dateFormat: 'DD, d  MM, yy',
                    beforeShow: function () {
                        visible = true;
                    },
                    onSelect: function (date, evt) {
                        var selectedDate = new Date(evt.selectedYear, evt.selectedMonth, evt.selectedDay);
                        if (!daily) {
                            startDate = getStartDate(selectedDate);
                        } else {
                            startDate = selectedDate;
                        }
                        scope.$apply(function () {
                            console.log("in apply: ", datepicker);
                            scope.date = new Date(datepicker.datepicker("setDate", startDate).val());
                        });
                        visible = false;
                    },
                    onClose: function () {
                        visible = false;
                    }
                });
                if (!daily) {
                    startDate = getStartDate(new Date());
                } else {
                    startDate = new Date();
                }
                scope.date = new Date(datepicker.datepicker("setDate", startDate).val());
            }
        }
    }]);

    app.directive("navbar", ['localize', function () {
        return {
            restrict: 'E',
            scope: {
                title: "@"
            },
            transclude: true,
            replace: true,
            template: '<div class="navbar navbar-fixed-top">' +
                '          <div class="navbar-inner">' +
                '              <a class="navbar-brand" href="/">' +
                '                  <span class="title">{{ title }}</span>' +
                '              </a>' +
                '              <div class="nav-collapse">' +
                '                  <ul class="nav" ng-transclude></ul>' +
                '              </div>' +
                '              <div class="nav pull-right">' +
                '                  <ul class="nav">' +
                '                      <li class="active"><a href="/logout">Sign out</a></li>' +
                '                  </ul>' +
                '              </div>' +
                '        </div>' +
                '    </div>'
        };
    }]);

}());



