(function () {
    'use strict';

    var service = function (systemConfig, $http) {

        //load appointment
        this.loadAppointment = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment");
        };
        
        //load rejected appointment by branch
        this.loadAppointmentByBranch = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/all-appointment");
        };

        //load approved appointment by branch
//        this.loadApprovedAppointment = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/approved-appointment/" + "0");
//        };

        //save appointment
        this.saveAppointment = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/appointment/save", data);
        };

        //delete appointment
        this.deleteAppointment = function (indexNo) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/appointment/delete-appointment/" + indexNo);
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
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/price-categiry-details/find-by-item/" + item);
        };

        //price category by vehicle
        this.getPriceCategoryByVehicle = function (vehicle) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/vehicle-price-category/" + vehicle);
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

        //load bay details
        this.loadBayDetails = function (branch, date) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/bay-details/" + branch + "/" + date);
        };

        //load bay
        this.loadBay = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/appointment/all-bay/" + indexNo);
        };




    };

    angular.module("appModule")
            .service("appointmentService", service);
}());