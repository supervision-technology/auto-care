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
        
        this.getClientByIndexNo = function (client) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client/search-client/" + client);
        };
        
        this.saveJob = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/save-job-card", data);
        };
        
        this.getJobCard = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-client-history/" + indexNo);
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

//        this.imageUplord = function (formData) {
//            var xhr = new XMLHttpRequest();
//            xhr.open("POST", systemConfig.apiUrl + "/api/care-point/transaction/job-card/image-uplod");
//            xhr.send(formData);
//
//        };
    };
    angular.module("appModule")
            .service("vehicleEntranceService", service);
}());