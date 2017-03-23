(function () {
    var service = function ($http, systemConfig) {

        //load common master files
        this.loadCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/category");
        };

        this.loadSubCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/sub-category");
        };

        this.loadBrand = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/brand");
        };

        this.loadItemDepartment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-departments");
        };
        
        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/priceCategory");
        };

        //load master files
        this.loadItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };

        this.loadItemUnit = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.loadPackageItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/service_selections");
        };


        //save functions
        this.saveItem = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/item/save-item", data);
        };

        this.saveItemUnit = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/item-unit/save-unit", data);
        };

        this.savePackageItem = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/package-item/save-package", data);
        };
        
        this.getPackageItems = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item/get-package-items/" + indexNo);
        };


        //delete functions
        this.deleteItem = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/item/delete-item/" + indexNo);
        };

        this.deleteItemUnit = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/item-unit/save-unit/" + indexNo);
        };
        
        this.deletePackageItem = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/package-item/delete-package/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("itemService", service);
}());