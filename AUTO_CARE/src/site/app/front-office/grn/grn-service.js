(function () {
    'use strict';

    var service = function (systemConfig, $http) {

//        request
//        load Approved Purchase Order
        this.loadApprovedPurchaseOrder = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/grn/approve-purchasse-order");
        };
        //load Suppliers
        this.loadSuppliers = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/supplier");
        };
//        load Suppliers
        this.loadItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/item/stock-nonstock-item");
        };
        this.saveGrnReceive = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/grn/save-grn-recieve", data);
        };


//        approve
//        load pending grn list
        this.loadPendingGrnList = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/grn/pending-grn-list");
        };
//        load Approved Purchase Order item only
        this.loadApprovedPurchaseOrderItemList = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/grn/approve-purchase-order-item-list");
        };
//      grn approve
        this.saveGrnApprove = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/grn/save-grn-approve", data);
        };
//       
//      direct GRN
        this.getStockQty = function (item) {
            return $http.get(systemConfig.apiUrl + "/api/care-point/transaction/purchase-order-request/stock-qty/" + item);
        };
//      save Direct Grn
        this.saveDirectGrn = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/transaction/grn/save-direct-grn", data);
        };





//          print
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
            .service("GrnService", service);
}());

