(function () {
    var service = function ($http, systemConfig) {
        this.loadVehicleByVehicleNo = function (vehicleNo){
            return $http.get(systemConfig.apiUrl + "/api/care-point/service/zmaster/vehicle/search-vehicle" + vehicleNo);
        };


    };
    angular.module("appModule")
            .service("vehicleEntranceService", service);
}());