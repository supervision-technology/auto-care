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
       
        this.saveBalancePaymentVoucher = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/payment-voucher/save-balance-payment-voucher", data);
        };

        this.loadBranchByBank = function (bank) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/find-by-branch/" + bank);
        };




//        //load pending jobcards
//        this.pendingJobCards = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-invoice-pending-job-card");
//        };
//
//
//
//        this.loadEmployee = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
//        };
//
//
//
//
//        this.getJobItemHistory = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
//        };
//
//
//        //get client over payments
//        this.getClientOverPayment = function (cllient) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/client-get-over-payment/" + cllient);
//        };
//
//        this.loadInvoiceData = function (invoiceNumber) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/get-invoice-details/" + invoiceNumber);
//        };
//
//        //vehicle select get job card
//        this.getInvoiceByJobCard = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/find-by-job-card/" + indexNo);
//        };
//
//
//
//
//        //invoice viewer and print
//        this.listParameters = function (report) {
//            return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report-parameters", JSON.stringify(report));
//        };
//
//        this.reportData = function (reportName) {
//            return $http.get(systemConfig.apiUrl + "/api/v1/report/report-viewer/invoice-report-data/" + reportName);
//        };
//
//        this.getReportUrl = function (report, params, reportValues) {
//            var url = systemConfig.apiUrl + "/api/v1/report/report-viewer/report";
//
//            var action = btoa(report.fileName);
//            url = url + "?action=" + action;
//
//            angular.forEach(reportValues, function (value, key) {
//                url = url + "&" + key + "=" + value;
//            });
//
//            return url;
//        };
//
//        this.viewReport = function (report, params, reportValues) {
//            return $http.get(this.getReportUrl(report, params, reportValues), {responseType: 'arraybuffer'});
//        };

    };

    angular.module("appModule")
            .service("paymentVoucherService", service);
}());