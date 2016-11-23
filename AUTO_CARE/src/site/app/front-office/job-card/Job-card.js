(function () {
    //module
    angular.module("jobCardModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("jobCardModule")
            .factory("jobCardFactory", function ($http, systemConfig) {
                var factory = {};
        
                return factory;
            });
    //controller
    angular.module("jobCardModule")
            .controller("jobCardController", function ($scope, $log, jobCardFactory, Notification) {
                
            });
}());


