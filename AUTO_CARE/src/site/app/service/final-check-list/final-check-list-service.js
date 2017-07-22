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
        
        this.loadBays = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/bay/get-bays-by-branch-is-view");
        };

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-default-check-list-pending-job-card");
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

        //load default final check list
        this.loadDefaultFinalItemCheck = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item-check");
        };

        this.getDefaultFinalCheckList = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item-check/find-by-default-final-check-list/" + jobCard);
        };

        this.getDefaultFinalCheckListChecked = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-item-check/default-final-check-list-check", data);
        };

        this.findJobCard = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-job-card/" + jobCard);
        };
        
        this.findByVehicleAssignmentDetails = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/vehicle-assignment/find-by-job-card/" + jobCard);
        };

    };

    angular.module("appModule")
            .service("finalCheckListService", service);
}());