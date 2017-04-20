(function () {
    angular.module("appModule")
            .factory("purchaseOrderRequestModel", function (PurchaseOrderRequestService, PurchaseOrderRequestModelFactory, $q) {
                function purchaseOrderRequestModel() {
                    this.constructor();
                }

                purchaseOrderRequestModel.prototype = {

                    data: {},
                    tempData: {},
                    summaryData: {},
                    //master data lists
                    suppliers: [],
                    allItems: [],
                    supplierItems: [],

                    constructor: function () {
                        var that = this;
                        this.data = PurchaseOrderRequestModelFactory.newData();
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();
                        this.summaryData = PurchaseOrderRequestModelFactory.summaryData();

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
                    },
                    addData:function (){
                        this.data.purchaseOrderItemList.push(this.tempData);
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();
                        this.summaryCalculator();
                    },
                    getItemName:function (indexNo){
                       var itemName = null;
                        angular.forEach(this.supplierItems, function (value) {
                            if (value.indexNo === indexNo) {
                                itemName = value.name;
                                return;
                            }
                        });
                        return itemName;
                    },
                    summaryCalculator:function (){
                       var qty=0;
                       var val=0;
                       var discount=0;
                       var itemValue=0;
                        angular.forEach(this.data.purchaseOrderItemList, function (value) {
                            qty=parseFloat(qty)+parseFloat(value.qty);
                            val+=value.value;
                            discount+=value.discountValue;
                            itemValue+=value.netValue;
                        });
                        this.summaryData.qty=qty;
                        this.summaryData.value=val;
                        this.summaryData.discountValue=discount;
                        this.data.itemValue=itemValue;
                        this.data.grandTotal=itemValue;
                    }
                };
                return purchaseOrderRequestModel;
            });
}());
