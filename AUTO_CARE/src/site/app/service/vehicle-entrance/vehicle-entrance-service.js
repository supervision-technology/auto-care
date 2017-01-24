(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/vehicle");
        };

        //pending weight
        this.getJobHistory = function (vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-history/" + vehicle);
        };

        this.getJobItemHistory = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-item-history/" + jobCard);
        };

        this.saveJobCard = function () {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/insert-detail");
        };
    };

    angular.module("appModule")
            .service("VehicleEntranceService", service);
}());