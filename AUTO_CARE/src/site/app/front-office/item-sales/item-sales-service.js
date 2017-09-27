(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };

        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
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
        //invoice save
        this.savePaymentVoucher = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/save-payment-voucher", data);
        };
       
    };

    angular.module("appModule")
            .service("itemSalesService", service);
}());