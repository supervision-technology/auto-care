(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load pending jobcards
        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
        };
    };

    angular.module("appModule")
            .service("customerSatisfactionService", service);
}());