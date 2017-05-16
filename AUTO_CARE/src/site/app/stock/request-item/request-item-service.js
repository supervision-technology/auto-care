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

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
        };

        this.getPackageItems = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item/get-package-items/" + indexNo);
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };

        this.checkItem = function (item, status, selectedJobCardIndexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/check-item/" + item + "/" + status + "/" + selectedJobCardIndexNo);
        };

        this.findByItemStockItmQty = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/get-item-qty-by-stock");
        };
    };

    angular.module("appModule")
            .service("requestItemService", service);
}());