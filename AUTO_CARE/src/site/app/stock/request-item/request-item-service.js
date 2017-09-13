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

        this.loadBay = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/bay");
        };

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-invoice-pending-job-card");
        };

        this.getPackageItems = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item/get-package-items/" + indexNo);
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };

        this.getBayIssueHistory = function (indexNo,status) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/find-bay-item-issue/" + indexNo + "/" + status);
        };
        
        this.getBayIssueHistoryByDate = function (indexNo,status) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/find-bay-item-issue-by-date/" + indexNo + "/" + status);
        };
        
        this.checkItemJobCard = function (item, status, selectedJobCardIndexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/check-item/" + item + "/" + status + "/" + selectedJobCardIndexNo);
        };
        
        this.checkItemBay = function (bayIssueIndexNo, status) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/check-item/" + bayIssueIndexNo + "/" + status);
        };

        this.findByItemStockItmQty = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/get-stock-item-qty-by-stock");
        };

        this.findByItemNonStockItmQty = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/get-non-stock-item-qty-by-stock");
        };

    };

    angular.module("appModule")
            .service("requestItemService", service);
}());