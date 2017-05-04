(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.getInvoiceByJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/find-by-job-card/" + indexNo);
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };

        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };

        this.loadVehicleType = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle-type");
        };

        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/price-category");
        };

        this.loadBankAndBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/bankbranch");
        };

        //invoice save
        this.saveInvoice = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/save-invoice", data);
        };

        //get client over payments
        this.getClientOverPayment = function (cllient) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/client-get-over-payment/" + cllient);
        };
        
        this.loadInvoiceData = function (invoiceNumber) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/get-invoice-details/" + invoiceNumber);
        };
        
        
    };

    angular.module("appModule")
            .service("invoiceService", service);
}());