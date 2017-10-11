(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };
       
        this.loadEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };

        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadItemUnits = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item-unit");
        };


        this.getClientVehicles = function (index) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/get-client-vehicles/" + index);
        };

        this.getClientBalance = function (index) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/get-client-balance/" + index);
        };

        this.getClientOverPayment = function (index) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/get-client-over-payment/" + index);
        };

        this.getBalanceInvoiceCount = function (index) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/get-balance-invoice-count/" + index);
        };

        this.getBalanceInvoiceList = function (index) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/get-balance-invoice/" + index);
        };

        this.loadBank = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/bank");
        };

        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/branch");
        };

        this.loadCardType = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/card_type");
        };
        this.loadBranchByBank = function (bank) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/find-by-branch/" + bank);
        };

        this.getQuickSeacrhStockItemAndNonStockItem = function (itemKey) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/quick-stock-item-non-stock-item/" + itemKey);
        };

        this.findByAvailableStockQty = function (itemIndexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/get-item-qty-by-stocks/" + itemIndexNo);
        };

        //save
        this.saveItemSale = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/item-sale/save-item-sale", data);
        };

    };

    angular.module("appModule")
            .service("itemSalesService", service);
}());