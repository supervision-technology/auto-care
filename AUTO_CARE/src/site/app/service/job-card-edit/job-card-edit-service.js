(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-default-check-list-pending-job-card");
        };

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/priceCategory");
        };

        this.findJobCard = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-job-card/" + jobCard);
        };

        this.loadEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };

        this.loadCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/category");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-all-item");
        };

        this.loadItemsCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-category");
        };

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };

        this.changeJobCard = function (jobCardData, employee) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/update-price-category-details/" + employee, jobCardData);
        };
    };

    angular.module("appModule")
            .service("jobCardEditService", service);
}());