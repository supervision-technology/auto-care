(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load pending jobcards
        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };
        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
        };

        this.getPackageItems = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item/get-package-items/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("ServiceSelectionService", service);
}());