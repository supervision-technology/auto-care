(function () {
    var service = function ($http, systemConfig) {

        //load common master files
        this.loadCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/category");
        };

        this.loadItemCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-category");
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

        this.findItemByItemType = function (itemType) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item/find-by-item-type/" + itemType);
        };

        this.loadSupplier = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/supplier");
        };

        this.loadItemUnit = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };

        this.loadPackageItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/service_selections");
        };

        this.loadItemUnitByItem = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit/find-by-item/" + item);
        };

        this.loadConsumableItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/consumable-item");
        };

        this.loadItemCheckDetails = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-check-detail");
        };

        this.getPackageItems = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/package-item/get-package-items/" + indexNo);
        };

        this.loadPriceCategoryDetailByItem = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/price-categiry-details/find-by-item/" + item);
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

        this.saveConsumableItem = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/consumable-item/save-consumable", data);
        };

        this.saveItemCheckDetail = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/item-check-detail/save-item-check-detail", data);
        };

        this.saveMPriceCategoryDetails = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/price-categiry-details/insert-detail", data);
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

        this.deleteConsumableItem = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/consumable-item/delete-consumable/" + indexNo);
        };

        this.deleteItemCheckDetail = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/item-check-detail/delete-item-check-detail/" + indexNo);
        };

        this.deleteMPriceCategoryDetails = function (indexNo) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/price-categiry-details/delete-detail/" + indexNo);
        };


    };

    angular.module("appModule")
            .service("itemService", service);
}());