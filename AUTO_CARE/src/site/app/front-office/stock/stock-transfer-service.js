(function () {
    'use strict';

    var service = function (systemConfig, $http) {
        
        //REQUEST
        //load supplier
        this.loadSuppliers = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/supplier");
        };
        
        //load branch
        this.loadBranches = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/branch");
        };
        //load stock
        this.loadStock = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/stock");
        };
//      load items
        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item/stock-nonstock-item");
        };
//        
        this.saveExternalTransferOut = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/stock-transfer/external/save-branch-transfer-out", data);
        };
        //get pending transfer branch and stock
        this.getPendingTransferByBranchAndStore = function (branch,store) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/stock-transfer/external/pending-transfer-order/"+branch+"/"+store);
        };
        //get stock qty
        this.getItemStockQty = function (branch,item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/stock-transfer/external/get-item-qty/"+branch+"/"+item);
        };
        //get stock qty with store
        this.getItemStockQtyByStore = function (branch,item,store) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/stock-transfer/external/get-item-qty-by-stock/"+branch+"/"+item+"/"+store);
        };
           //save branch transfer in
        this.saveExternalTransferIn = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/stock-transfer/external/save-branch-transfer-in", data);
        };
//        
//        this.getStockQty = function (item) {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/stock-qty/" + item);
//        };
//
//
////      APPROVE
//        this.loadPendingPurchaseOrder = function () {
//            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-approve/pending-purchase-order");
//        };
////
//        this.savePurchaseOrderApprove = function (data) {
//            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-approve/save", data);
//        };
////        //load pending jobcards
////        this.pendingJobCards = function () {
////            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-pending-job-cards");
////        };
////
////
////
////        this.deleteJobItems = function (indexNo) {
////            return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/job-item/delete-job-items/" + indexNo);
////        };
////
////        this.getJobItemHistory = function (indexNo) {
////            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/job-item/find-by-job-card-items/" + indexNo);
////        };
    };

    angular.module("appModule")
            .service("StockTransferService", service);
}());
