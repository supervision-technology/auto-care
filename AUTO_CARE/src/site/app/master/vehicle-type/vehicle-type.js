(function () {
    //module
    angular.module("vehicleTypeModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("vehicleTypeModule")
            .factory("vehicleTypeFactory", function ($http, systemConfig) {
                var factory = {};
        
                return factory;
            });
    //controller
    angular.module("vehicleTypeModule")
            .controller("vehicleTypeController", function ($scope, $log, vehicleTypeFactory, Notification) {
                
            });
}());