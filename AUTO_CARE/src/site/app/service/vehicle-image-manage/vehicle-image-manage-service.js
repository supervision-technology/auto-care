(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        this.loadVehicles = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/priceCategory");
        };

        this.pendingJobCards = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-invoice-pending-job-card");
        };

        this.loadVehicleImages = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/image-names/" + jobCard);
        };
        this.removeVehicleImage = function (imageName) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/remove-image/" + imageName);
        };
    };

    angular.module("appModule")
            .service("vehicleImageService", service);
}());