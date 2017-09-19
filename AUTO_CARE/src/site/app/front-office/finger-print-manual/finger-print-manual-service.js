(function () {
    'use strict';

    var service = function (systemConfig, $http) {


        this.loadEmolyee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };
        
        this.loadCurrentBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/branch/current-branch");
        };
        
        this.saveFingerPrint = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/finger-print/manual-save",data);
        };
        
        this.loadFingerPrintMashine = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/finger-print/load-mashine");
        };
        
        this.loadData = function (date) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/finger-print/load-data/"+date);
        };

        //load 
//        this.loadBay = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/master/bay");
//        };
//
//        this.loadItems = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
//        };
//
//        this.loadItemUnits = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
//        };
//
//        this.saveBayItemIssue = function (data) {
//            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/save-bay-item-issue", data);
//        };
//
//        this.deleteBayItemIssue = function (indexNo) {
//            return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/delete-bay-item-issue/" + indexNo);
//        };
//
//        this.getBayIssueHistory = function (indexNo, status) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/bay-item-issue/find-bay-item-issue/" + indexNo + "/" + status);
//        };


    };

    angular.module("appModule")
            .service("fingerPrintService", service);
}());