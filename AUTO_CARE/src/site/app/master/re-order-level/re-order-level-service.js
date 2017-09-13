(function () {
    var service = function ($http, systemConfig) {

        //load common master files
        this.loadReOrderLevel = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/reOrderLevel");
        };
        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item//stock-nonstock-item");
        };
        this.loadBranches = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/branch");
        };

        //save functions
        this.save = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/reOrderLevel/save", data);
        };

    };

    angular.module("appModule")
            .service("reOrderLevelService", service);
}());