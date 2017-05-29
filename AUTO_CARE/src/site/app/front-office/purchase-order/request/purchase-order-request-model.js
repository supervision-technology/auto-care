(function () {
    angular.module("appModule")
            .factory("purchaseOrderRequestModel", function (PurchaseOrderRequestService, Notification, PurchaseOrderRequestModelFactory, $q) {
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
                    branchesStockList: [],

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
                        this.supplierItems = [];
                        angular.forEach(this.allItems, function (value) {
                            if (value.supplier === supplier) {
                                that.supplierItems.push(value);
                            }
                        });
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
                            this.getStockQty(selectItem.indexNo);

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
                    setItemDetail: function (indexNo) {
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
                            this.getStockQty(selectItem.indexNo);
//                            this.getBranchesStock(selectItem.indexNo);
                        } else {
                            this.tempData.item = null;

                        }
                    },
                    //model dialog
                    getBranchesStock: function () {
                        var that = this;
                        var item = this.tempData.item;
                        console.log(item);
                        PurchaseOrderRequestService.getBranchesStock(item)
                                .success(function (data) {
                                    that.branchesStockList = data;
                                    console.log(data);
                                });
                               
                    }
                    , addData: function () {
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Select Item for Add Purchase Order Item !");
                        }
                        if (!that.tempData.price) {
                            saveConfirmation = false;
                            Notification.error("Select price for Add Purchase Order Item !");
                        }
                        if (!that.tempData.qty) {
                            saveConfirmation = false;
                            Notification.error("Select Qty for Add Purchase Order Item !");
                        }
                        if (!that.tempData.netValue) {
                            saveConfirmation = false;
                            Notification.error("Invalide Format");
                        }
                        if (saveConfirmation) {
                            this.data.purchaseOrderItemList.push(this.tempData);
                            this.tempData = PurchaseOrderRequestModelFactory.tempData();
                            this.summaryCalculator();
                        }

                    },

                    edit: function (indexNo) {
                        this.tempData = this.data.purchaseOrderItemList[indexNo];
                        this.data.purchaseOrderItemList.splice(indexNo, 1);
                        this.summaryCalculator();
                    },

                    delete: function (indexNo) {
                        this.data.purchaseOrderItemList.splice(indexNo, 1);
                        this.summaryCalculator();
                    },

                    getItemName: function (indexNo) {
                        var itemName = null;
                        angular.forEach(this.supplierItems, function (value) {
                            if (value.indexNo === indexNo) {
                                itemName = value.name;
                                return;
                            }
                        });
                        return itemName;
                    },
                    summaryCalculator: function () {
                        var qty = 0;
                        var val = 0;
                        var discount = 0;
                        var itemValue = 0;
                        angular.forEach(this.data.purchaseOrderItemList, function (value) {
                            qty = parseFloat(qty) + parseFloat(value.qty);
                            val = parseFloat(val) + parseFloat(value.value);
                            discount = parseFloat(discount) + parseFloat(value.discountValue);
                            itemValue = parseFloat(itemValue) + parseFloat(value.netValue);
                        });
                        this.summaryData.qty = qty;
                        this.summaryData.value = val;
                        this.summaryData.discountValue = discount;
                        this.data.itemValue = itemValue;
                        this.data.grandTotal = itemValue;
                    },
                    summaryCalculatorForLoad: function () {
                        var qty = 0;
                        var val = 0;
                        var discount = 0;
                        var itemValue = 0;
                        angular.forEach(this.data.purchaseOrderItemList, function (value) {
                            qty = parseFloat(qty) + parseFloat(value.qty);
                            val = parseFloat(val) + parseFloat(value.value);
                            discount = parseFloat(discount) + parseFloat(value.discountValue);
                            itemValue = parseFloat(itemValue) + parseFloat(value.netValue);
                        });
                        this.summaryData.qty = qty;
                        this.summaryData.value = val;
                        this.summaryData.discountValue = discount;
                        this.data.itemValue = itemValue;
                    },
                    getStockQty: function (item) {
                        var that = this;
                        if (item) {
                            PurchaseOrderRequestService.getStockQty(item)
                                    .success(function (data) {
                                        that.tempData.stockQty = data;
                                    });
                        }
                    },
                    savePurchaseOrderRequest: function () {
                        var defer = $q.defer();
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.data.supplier) {
                            saveConfirmation = false;
                            Notification.error("Select Supplier for Save Purchase Order Request!");
                        }
                        if (!that.data.date) {
                            saveConfirmation = false;
                            Notification.error("Select Date for Save Purchase Order Request !");
                        }
                        if (!that.data.deliverDate) {
                            saveConfirmation = false;
                            Notification.error("Select DeliverDate for Save Purchase Order Request !");
                        }
                        if (that.data.purchaseOrderItemList.length === 0) {
                            saveConfirmation = false;
                            Notification.error("Add Purchase Order Item for Save Purchase Order Request !");
                        }
                        if (that.tempData.netValue) {
                            saveConfirmation = false;
                            Notification.error("Remove Editing Item for save Purchase Order Request !");
                        }
                        if (that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Remove Editing Item for save Purchase Order Request !");
                        }

                        if (saveConfirmation) {
                            PurchaseOrderRequestService.savePurchaseOrderRequest(JSON.stringify(this.data))
                                    .success(function (data) {
                                        defer.resolve();
                                    })
                                    .error(function (data) {
                                        defer.reject();
                                    });
                            return defer.promise;
                        }
                    },
                    clear: function () {
                        this.data = PurchaseOrderRequestModelFactory.newData();
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();
                        this.summaryData = PurchaseOrderRequestModelFactory.summaryData();
                    }
                    , loadPendingPurchaseOrderByNumber: function () {
                        var that = this;

                        this.tempData = PurchaseOrderRequestModelFactory.tempData();
                        this.summaryData = PurchaseOrderRequestModelFactory.summaryData();

                        PurchaseOrderRequestService.loadPendingPurchaseOrderByNumber(this.data.number)
                                .success(function (data) {
                                    that.data = data;
                                    that.summaryCalculatorForLoad();
                                    if (!that.data.number) {
                                        Notification.error('Not Found Purchase Order for this Number !');
                                    } else {
                                        Notification.info('This Purchasse Order status is ' + that.data.status + ".");
                                    }
                                });
                        return that.data.number;
                    }
                };
                return purchaseOrderRequestModel;
            });
}());
