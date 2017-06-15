(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadItemCheckDetails = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-check-details");
        };

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-item-check-by-job-card/" + indexNo);
        };

        //load pending jobcards
        this.getItemCheckDetails = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item-check/find-by-job-item/" + item);
        };

        this.checkedItem = function (indexNo, status) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item-check/checked-job-item/" + indexNo + "/" + status);
        };

    };

    angular.module("appModule")
            .service("finalCheckListService", service);
}());