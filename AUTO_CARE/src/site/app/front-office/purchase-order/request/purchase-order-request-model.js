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
                    allItems: [],
                    supplierItems: [],

                    constructor: function () {
                        var that = this;
                        this.data = PurchaseOrderRequestModelFactory.newData();
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();

                        PurchaseOrderRequestService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });
                        PurchaseOrderRequestService.loadItems()
                                .success(function (data) {
                                    that.allItems = data;
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
                        return label;
                    },
                    loadItem: function (supplier) {
                        var that = this;
                        this.supplierItems=[];
                        angular.forEach(this.allItems, function (value) {
                            if (value.supplier === supplier) {
                                that.supplierItems.push(value);
                            }
                        });
                        console.log(that.supplierItems);
                    },
                    validateBarcode: function (barcode) {
                        var selectItem = null;
                        angular.forEach(this.supplierItems, function (value) {
                            if (value.barcode === barcode) {
                                selectItem = value;
                                return;
                            }
                        });
                        if (selectItem) {
                            this.tempData.item = selectItem.indexNo;
                            this.tempData.price = selectItem.costPrice;
                        } else {
                            this.tempData.item = null;
                        }
                    },
                    itemLable: function (index) {
                        var label;
                        angular.forEach(this.supplierItems, function (value) {
                            if (value.indexNo === index) {
                                label = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    setItemDetail:function (indexNo){
                        var selectItem = null;
                        angular.forEach(this.supplierItems, function (value) {
                            if (value.indexNo === indexNo) {
                                selectItem = value;
                                return;
                            }
                        });
                        if (selectItem) {
                            this.tempData.barcode = selectItem.barcode;
                            this.tempData.price = selectItem.costPrice;
                        } else {
                            this.tempData.item = null;
                        }
                    }
                };
                return purchaseOrderRequestModel;
            });
}());
