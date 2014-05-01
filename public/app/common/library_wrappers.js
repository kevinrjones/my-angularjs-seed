var RSK = RSK || {};
RSK.Services = RSK.Services || {};

var wrapper = angular.module('wrapper', []);

wrapper.factory('_', function() {
    return window._; // assumes wrapper has already been loaded on the page
});

wrapper.factory('moment', function() {
    return window.moment(); // assumes moment has already been loaded on the page
});
