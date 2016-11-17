(function () {
    //module
    angular.module("priceCategoryModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("priceCategoryModule")
            .factory("priceCategoryFactory", function ($http, systemConfig) {
                var factory = {};
        
                return factory;
            });
    //controller
    angular.module("priceCategoryModule")
            .controller("priceCategoryController", function ($scope, $log, priceCategoryFactory, Notification) {
                
            });
}());