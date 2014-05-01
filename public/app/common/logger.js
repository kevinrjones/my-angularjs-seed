(function () {
    'use strict';

    angular.module('common').factory('logger', ['$log', logger]);

    function logger($log) {
        var service = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId, fnName) {
            fnName = fnName || 'log';
            switch (fnName.toLowerCase()) { // convert aliases
                case 'success':
                    fnName = 'logSuccess';
                    break;
                case 'error':
                    fnName = 'logError';
                    break;
                case 'warn':
                    fnName = 'logWarning';
                    break;
                case 'warning':
                    fnName = 'logWarning';
                    break;
            }

            var logFn = service[fnName] || service.log;
            return function (msg, data, showToast) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        }

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'info');
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logSuccess(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'success');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message, data, source, showPopup, type) {
            var write = (type === 'error') ? $log.error : $log.log;
            source = source ? '[' + source + '] ' : '';
            write(source, message, data);
            if (showPopup) {
                if (type === 'error') {
                    $.growl.error({message: message});
                    console.error(message);
                } else if (type === 'warning') {
                    $.growl.warning({message: message});
                    console.warn(message);
                } else if (type === 'success') {
                    $.growl.notice({message: message});
                    console.log(message)
                } else {
                    $.growl({title: 'Notification', message: message});
                }
            } else {
                if (type === 'error') {
                    console.error(message);
                } else if (type === 'warning') {
                    console.warn(message);
                } else if (type === 'success') {
                    console.log(message)
                } else {
                    console.log(message)
                }
            }
        }
    }
})();