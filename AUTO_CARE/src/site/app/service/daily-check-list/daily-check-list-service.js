(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.saveCheckList = function (dailyCheckdData) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/daily-check-list/save-check-list", dailyCheckdData);
        };

        this.saveCheckSubItems = function (dailyCheckdDataIndexNo, checkSubItems) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/daily-check-list/save-check-sub-item/" + dailyCheckdDataIndexNo, checkSubItems);
        };

        this.loadSubItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/sub-item");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };

        this.findByItems = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/sub-item/group-by-item/" + item);
        };
        this.loadCheckedListByDate = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/daily-check-list/loadByDate");
        };
    };

    angular.module("appModule")
            .service("dailyCheckListService", service);
}());