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
        //load re order item
        this.loadReOrderItem = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/getOrderRequestItems");
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
       //Branches stock
        this.getBranchesStock = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/load-stock-in-branches/"+item);
        };
       //Branches stock
        this.getMainBranchAvailableStock = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/get-main-branch-available-stock/"+item);
        };
        
        
        
//        print
        this.listParameters = function (report) {
            return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report-parameters", JSON.stringify(report));
        };

        this.reportData = function (reportName) {
            return $http.get(systemConfig.apiUrl + "/api/v1/report/report-viewer/invoice-report-data/" + reportName);
        };
        this.getReportUrl = function (report, params, reportValues) {
            var url = systemConfig.apiUrl + "/api/v1/report/report-viewer/report";

            var action = btoa(report.fileName);
            url = url + "?action=" + action;

            angular.forEach(reportValues, function (value, key) {
                url = url + "&" + key + "=" + value;
            });

            return url;
        };

        this.viewReport = function (report, params, reportValues) {
            return $http.get(this.getReportUrl(report, params, reportValues), {responseType: 'arraybuffer'});
        };
    };

    angular.module("appModule")
            .service("PurchaseOrderRequestService", service);
}());