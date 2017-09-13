(function () {
    var service = function ($http, systemConfig) {
        this.loadVehicle = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };

        this.loadClient = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };

        this.loadCustomerType = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/customer-type");
        };

        this.newClient = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/service/zmaster/client/save-client", data);
        };

        this.vehicleSerachByIndex = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/search-vehicle/" + indexNo);
        };

        this.vehicleSerachByVehicleNo = function (vehicleNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/search-vehicle-vehicleNo/" + vehicleNo);
        };
        this.findByVehicleNo = function (vehicleNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/vehicle/find-by-vehicle-no/" + vehicleNo);
        };

        this.getClientByIndexNo = function (client) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client/search-client/" + client);
        };

        this.saveJob = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/save-job-card", data);
        };

        this.getJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-client-history/" + indexNo);
        };
        
        this.searchPendingJobCard = function (VehicleNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-job-detail-by-vehicle-no/" + VehicleNo);
        };

        this.updateVehicle = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/save-vehicle", data);
        };

        this.loadVehicleType = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle-type");
        };

        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/price-category");
        };

        this.getLastJobCardVehicleAttenctions = function (vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/vehicle-attenctions/find-last-job-card/" + vehicle);
        };

        this.getVehicleAttenctionsCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/vehicle-attenctions/vehicle-attenctions-category");
        };

        this.getVehicleAttenctions = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/vehicle-attenctions");
        };

        this.imageUpload = function () {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/upload-image");
        };

        this.imageDownloard = function (jobCard) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/image-names/" + jobCard);
        };
        this.vehicleSearchByClient = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/search-vehicle-client/" + indexNo);
        };
        this.getVehicleHistory = function (vehicleNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-history/" + vehicleNo);
        };
    };
    angular.module("appModule")
            .service("vehicleEntranceService", service);
}());