(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load pending jobcards
        this.finishedJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/customer-satisfaction/get-finished-job-cards");
        };
         this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };
        this.save = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/customer-satisfaction/save-customer-satisfaction", data);
        };
    };

    angular.module("appModule")
            .service("customerSatisfactionService", service);
}());