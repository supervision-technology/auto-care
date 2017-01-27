(function () {
    var service = function ($http, systemConfig) {
    //master data
       this.loadItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };
       this.loadDepartment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-departments");
        };
        this.loadCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/category");
        };
        this.loadSubCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/sub-category");
        }; 
        this.loadItemUnit = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };
        this.loadBrand = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/brand");
        };
        this.loadPackageItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item");
        };
    
    };

    angular.module("appModule")
            .service("ItemService", service);
}());
