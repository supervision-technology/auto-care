(function () {
    'use strict';

    var service = function (systemConfig, $http) {
  
        //load appointment
        this.loadAppointment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment");
        };
        
        //load not approved appointment
        this.loadPendingAppointment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/pending/"+"0");
        };
        
        //load not approved appointment by branch
        this.loadPendingAppointmentByBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/pending-appointment/"+"0");
        };
        
        //load approved appointment by branch
        this.loadApprovedAppointment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/approved-appointment/"+"1");
        };

        //save appointment
        this.saveAppointment = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/appointment/save", data);
        };
        
        //item
        this.loadItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item");
        };
       
        //appointment item
        this.loadAppointmentItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/item");
        };
        
        //branch
        this.loadBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/branch");
        };
        
        //price category
        this.loadPriceCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/priceCategory");
        };
        
        //price category details
        this.loadPriceCategoryDetails = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/price-categiry-details/find-by-item/"+item);
        };
        
        //vehicle
        this.loadVehicle = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/vehicle");
        };
        
        //vehicle type
        this.loadVehicleType = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/vehicle-type");
        };
        
        //client
        this.loadClient = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/client");
        };


    };

    angular.module("appModule")
            .service("appointmentService", service);
}());