(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
        };

        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };

        this.loadEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };

        this.loadBank = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/bank");
        };

        this.loadCardType = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/card_type");
        };
        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/branch");
        };

        this.loadBranchByBank = function (bank) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/find-by-branch/" + bank);
        };

        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
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

        //vehicle select get job card
        this.getInvoiceByJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/find-by-job-card/" + indexNo);
        };

    };

    angular.module("appModule")
            .service("invoiceService", service);
}());