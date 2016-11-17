(function () {
    //module
    angular.module("vehicleModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("vehicleModule")
            .factory("vehicleFactory", function ($http, systemConfig) {
                var factory = {};
        
                return factory;
            });
    //controller
    angular.module("vehicleModule")
            .controller("vehicleController", function ($scope, $log, vehicleFactory, Notification) {
                
            });
}());


