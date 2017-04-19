(function () {
    angular.module("appModule")
            .factory("purchaseOrderRequestModel", function (PurchaseOrderRequestService, PurchaseOrderRequestModelFactory, $q) {
                function purchaseOrderRequestModel() {
                    this.constructor();
                }

                purchaseOrderRequestModel.prototype = {

                    data: {},
                    //master data lists
                    suppliers: [],

                    constructor: function () {
                        var that = this;
                        this.data = PurchaseOrderRequestModelFactory.newData();
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();

                        PurchaseOrderRequestService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });
//
//                        invoiceService.loadItems()
//                                .success(function (data) {
//                                    that.items = data;
//                                });
//                        invoiceService.loadVehicles()
//                                .success(function (data) {
//                                    that.vehicles = data;
//                                });
//
//                        invoiceService.loadItemUnits()
//                                .success(function (data) {
//                                    that.itemUnits = data;
//                                });
                    },
                    supplierLable: function (model) {
                        var label;
                        angular.forEach(this.suppliers, function (value) {
                            if (value.indexNo === model) {
                                label = value.indexNo + ' - ' + value.name;
                                return;
                            }
                        });
                        console.log(label);
                        return label;
                    }
                };
                return purchaseOrderRequestModel;
            });
}());
