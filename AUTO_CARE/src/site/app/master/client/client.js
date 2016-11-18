(function () {
    //module
    angular.module("clientModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("clientModule")
            .factory("clientFactory", function ($http, systemConfig) {
                var factory = {};
        
                return factory;
            });
    //controller
    angular.module("clientModule")
            .controller("clientController", function ($scope, $log, clientFactory, Notification) {
                
            });
}());

