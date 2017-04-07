(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.getInvoiceByJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/jobcard-invoice/find-by-job-card/" + indexNo);
        };
        
        this.getJobItemHistory = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
        };
    };

    angular.module("appModule")
            .service("paymentMethodService", service);
}());