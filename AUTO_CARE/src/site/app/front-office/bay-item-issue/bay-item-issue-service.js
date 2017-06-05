(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load 
        this.loadBay = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/bay");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.saveBayItemIssue = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/save-bay-item-issue", data);
        };

        this.deleteBayItemIssue = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/delete-bay-item-issue/" + indexNo);
        };

        this.getBayIssueHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/find-bay-item-issue/" + indexNo);
        };

        this.findByItemStockItmQty = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/get-non-stock-item-qty-by-stock");
        };
    };

    angular.module("appModule")
            .service("bayItemIssueService", service);
}());