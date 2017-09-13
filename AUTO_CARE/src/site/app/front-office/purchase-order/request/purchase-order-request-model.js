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
                    reOrderData: {},
                    reOrderTempData: {},
                    //master data lists
                    suppliers: [],
                    allItems: [],
                    supplierItems: [],
                    branchesStockList: [],
                    reOrderItems: [],
                    mainBranchAvailableStock: 0.0,

                    constructor: function () {
                        var that = this;
                        this.data = PurchaseOrderRequestModelFactory.newData();
                        this.tempData = PurchaseOrderRequestModelFactory.tempData();
                        this.summaryData = PurchaseOrderRequestModelFactory.summaryData();
                        this.reOrderData = PurchaseOrderRequestModelFactory.reOrderData();
                        this.reOrderTempData = PurchaseOrderRequestModelFactory.reOrderTempData();

                        PurchaseOrderRequestService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });
                        PurchaseOrderRequestService.loadItems()
                                .success(function (data) {
                                    that.allItems = data;
                                });
                        that.loadReOrderItem();
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
                            this.tempData.price = selectItem.supplierPrice;
                            this.tempData.discount = selectItem.discount;
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
                    itemLableByAllItem: function (index) {
                        var label;
                        angular.forEach(this.allItems, function (value) {
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
                            this.tempData.price = selectItem.supplierPrice;
                            this.tempData.discount = selectItem.discount;
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
                        PurchaseOrderRequestService.getBranchesStock(item)
                                .success(function (data) {
                                    that.branchesStockList = data;
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
                    getItem: function (indexNo) {
                        var item = null;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === indexNo) {
                                item = value;
                                return;
                            }
                        });
                        return item;
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
                    },
                    loadReOrderItem: function () {
//                        var defer = $q.defer();
                        var that = this;
                        PurchaseOrderRequestService.loadReOrderItem()
                                .success(function (data) {
                                    that.reOrderItems = data;
                                    console.log(data);
                                    console.log("data");
//                                    defer.resolve();
                                });
//                                .error(function (data) {
//                                    defer.reject();
//                                });
//                        return defer.promise;
                    },
                    selectAllReOrderItem: function (reOrderIndexNo) {
                        var that = this;
                        angular.forEach(this.reOrderItems, function (value) {
                            if (reOrderIndexNo === value.reOrderIndexNo) {

                                var item = that.getItem(value.item);
                                that.loadItem(value.supplierId);
                                that.data.supplier = value.supplierId;
                                var detail = {
                                    "indexNo": null,
                                    "purchaseOrder": null,
                                    "item": value.item,
                                    "barcode": item.barcode,
                                    "price": item.supplierPrice,
                                    "qty": value.netRequiredQty,
                                    "value": parseFloat(item.supplierPrice) * parseFloat(value.netRequiredQty),
                                    "discount": item.discount,
                                    "discountValue": (parseFloat(value.netRequiredQty) * parseFloat(item.supplierPrice)) * parseFloat(item.discount) / 100,
                                    "netValue": parseFloat(item.supplierPrice) * parseFloat(value.netRequiredQty) - (parseFloat(value.netRequiredQty) * parseFloat(item.supplierPrice)) * parseFloat(item.discount) / 100,
                                    "stockQty": value.stockQty,
                                    "orderQty": value.netRequiredQty,
                                    "recieveQty": 0,
                                    "balanceQty": value.netRequiredQty,
                                    "status": "PENDING"
                                };
                                that.data.purchaseOrderItemList.push(detail);
                                return;
                            }
                        });
                        this.summaryCalculator();
                    },
                    editReOrderItem: function (reOrderIndexNo) {
                        var that = this;

                        angular.forEach(this.reOrderItems, function (value, key) {
                            if (reOrderIndexNo === value.reOrderIndexNo) {
                                console.log(key);
                                that.reOrderTempData = value;
//                                that.reOrderItems.splice(key, 1);
                            }

                            return;
                        });
                    },
                    setEditableReOrderItem: function () {
                        var confirmation = true;
                        if (!this.reOrderTempData.item) {
                            confirmation = false;
                            Notification.error('Not Found ReOrder Editable Item !');
                        }
                        if (this.reOrderTempData.netRequiredQty < 0) {
                            confirmation = false;
                            Notification.error('Wrong Quantity !');
                        }
                        if (this.reOrderTempData.netRequiredQty > this.reOrderTempData.totalOrder) {
                            Notification.error('Quantity Out of Range !');
                            confirmation = false;
                        }
                        if (confirmation) {


                            var that = this;
                            var value = this.reOrderTempData;
                            var item = that.getItem(value.item);
                            that.loadItem(value.supplierId);
                            that.data.supplier = value.supplierId;
                            var detail = {
                                "indexNo": null,
                                "purchaseOrder": null,
                                "item": value.item,
                                "barcode": item.barcode,
                                "price": item.supplierPrice,
                                "qty": value.netRequiredQty,
                                "value": parseFloat(item.supplierPrice) * parseFloat(value.netRequiredQty),
                                "discount": item.discount,
                                "discountValue": (parseFloat(value.netRequiredQty) * parseFloat(item.supplierPrice)) * parseFloat(item.discount) / 100,
                                "netValue": parseFloat(item.supplierPrice) * parseFloat(value.netRequiredQty) - (parseFloat(value.netRequiredQty) * parseFloat(item.supplierPrice)) * parseFloat(item.discount) / 100,
                                "stockQty": value.stockQty,
                                "orderQty": value.netRequiredQty,
                                "recieveQty": 0,
                                "balanceQty": value.netRequiredQty,
                                "status": "PENDING"
                            };
                            that.data.purchaseOrderItemList.push(detail);
                            this.reOrderTempData = PurchaseOrderRequestModelFactory.reOrderTempData();
                            this.summaryCalculator();
                        }
                    }

                };
                return purchaseOrderRequestModel;
            });
}());
