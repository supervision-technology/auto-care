(function () {
    var service = function ($http, systemConfig) {
        //master data
        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/vehicle");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/item");
        };

        //pending weight
        this.getJobHistory = function (vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-history/" + vehicle);
        };

        this.getJobItemHistory = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-item-history/" + jobCard);
        };

        this.saveJobCard = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/insert-detail", data);
        };


        //cleint search
        this.loadClients = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/client");
        };
        
        this.saveClients = function () {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/client/insert-detail");
        };
    };

    angular.module("appModule")
            .service("VehicleEntranceService", service);
}());