(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        
        //REQUEST
        //load pending jobcards
        this.loadSuppliers = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/supplier");
        };

        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item/stock-nonstock-item");
        };
        
        this.savePurchaseOrderRequest = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/save", data);
        };
        
        this.getStockQty = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/stock-qty/" + item);
        };
        //load pending purchase order
        this.loadPendingPurchaseOrderByNumber = function (number) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/load-pending-purchase-order/" + number);
        };


//      APPROVE
        this.loadPendingPurchaseOrder = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-approve/pending-purchase-order");
        };
//
        this.savePurchaseOrderApprove = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-approve/save", data);
        };
       
       //delete Purchase Order
        this.deletePurchaseOrder = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-approve/delete/"+indexNo);
        };
//        //load pending jobcards
//        this.pendingJobCards = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
//        };
//
//
//
//        this.deleteJobItems = function (indexNo) {
//            return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/job-item/delete-job-items/" + indexNo);
//        };
//
//        this.getJobItemHistory = function (indexNo) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
//        };
    };

    angular.module("appModule")
            .service("PurchaseOrderRequestService", service);
}());