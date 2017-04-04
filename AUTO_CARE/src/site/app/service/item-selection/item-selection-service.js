(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load pending jobcards
        this.loadCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/category");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.saveJobItems = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-item/save-job-items", data);
        };

        this.deleteJobItems = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/job-item/delete-job-items/" + indexNo);
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };

        this.findJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-job-card/" + indexNo);
        };

        this.findByCategoryAndItems = function (category, priceCategory) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item/find-item-by-category/" + category + "/" + priceCategory);
        };
    };

    angular.module("appModule")
            .service("ItemSelectionService", service);
}());