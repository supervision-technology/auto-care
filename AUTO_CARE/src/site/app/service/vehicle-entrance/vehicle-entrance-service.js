(function () {
    var service = function ($http, systemConfig) {
        this.loadVehicle = function (){
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle");
        };
        this.loadClient = function (){
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client");
        };
        this.newClient = function (data){
            return $http.post(systemConfig.apiUrl + "/api/care-point/service/zmaster/client/save-client" , data);
        };
        this.vehicleSerachByIndex = function (indexNo){
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/search-vehicle/" + indexNo);
        };
        this.getClientByIndexNo = function (client){
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/client/search-client/" + client);
        };
        this.saveJob = function (data){
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/job-card/save-job-card" , data);
        };
        this.updateVehicle = function (data){
            return $http.post(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/save-vehicle" , data);
        };


    };
    angular.module("appModule")
            .service("vehicleEntranceService", service);
}());