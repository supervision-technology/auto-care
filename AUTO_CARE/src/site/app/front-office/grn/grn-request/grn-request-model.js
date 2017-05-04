(function () {
    angular.module("appModule")
            .factory("GrnModel", function (GrnService, grnModelFactory, $q, $timeout, Notification) {
                function GrnModel() {
                    this.constructor();
                }

                GrnModel.prototype = {

                    //model factory data
                    data: {},
                    tempData: {},
                    pendingPurchaseOrderList: [],
                    purchaseOrderItemList: [],
                    suppliers: [],
                    items: [],
                    grandTotalValue: 0.00,
                    itemTotalQty: 0.00,
                    itemTotalCount: 0,
                    selectedDetailIndex: -1,
                    selectedPONumber: -1,
                    totalGrnQty: 0.00,
                    approvedPurchaseOrderList: [],

                    constructor: function () {
                        var that = this;
                        that.data = grnModelFactory.newData();
                        that.tempData = grnModelFactory.tempData();
//
                        this.loadApprovedPurchaseOrder();
//
                        GrnService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });

                        GrnService.loadItems()
                                .success(function (data) {
                                    that.Items = data;
                                });
                        GrnService.loadApprovedPurchaseOrder()
                                .success(function (data) {
                                    that.approvedPurchaseOrderList = data;
                                });
                        this.getPendingOrderTotalAmount();

                    }
                    , getSupplier: function (supplier) {
                        var label;
                        angular.forEach(this.suppliers, function (value) {
                            if (value.indexNo === supplier) {
                                label = value.indexNo + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    , getItemObject: function (item) {
                        var supp;
                        angular.forEach(this.Items, function (value) {
                            if (value.indexNo === item) {
                                supp = value;
                                return;
                            }
                        });
                        return supp;
                    }
                    , getPurchaseOrderItem: function (index) {
                        var purchaseOrderItem;
                        angular.forEach(this.purchaseOrderItemList, function (value) {
                            if (value.indexNo === index) {
                                purchaseOrderItem = value;
                                return;
                            }
                        });
                        return purchaseOrderItem;
                    }
                    , getItemLable: function (item) {
                        var lable;
                        angular.forEach(this.Items, function (value) {
                            if (value.indexNo === item) {
                                lable = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , getPendingOrderTotalAmount: function () {
                        var totalAmount = 0.00;
                        angular.forEach(this.pendingPurchaseOrderList, function (value) {
                            totalAmount += parseFloat(value.grandTotal);
                        });
                        this.PendingOrderTotalAmount = totalAmount;
                    }, loadApprovedPurchaseOrder: function () {
                        var that = this;
                        GrnService.loadApprovedPurchaseOrder()
                                .success(function (data) {
                                    that.pendingPurchaseOrderList = data;

                                    angular.forEach(data, function (value) {
                                        that.grandTotalValue += parseFloat(value.grandTotal);
//                                        value.grandTotal2 = value.grandTotal;
                                    });
                                });
                    }, selectPurchaseOrder: function (indexNo, number) {
                        var that = this;
                        that.purchaseOrderItemList = [];
                        this.selectedDetailIndex = indexNo;
                        this.selectedPONumber = number;

                        angular.forEach(that.pendingPurchaseOrderList, function (value) {
                            if (indexNo === value.indexNo) {
                                that.purchaseOrderItemList = value.purchaseOrderItemList;
                                that.data.deliverDate = value.deliverDate;
                                that.data.requestDate = value.date;
                                that.data.approvedDate = value.approvedDate;
                                that.data.supplier = value.supplier;
                            }
                        });

                        angular.forEach(that.suppliers, function (value) {
                            if (that.data.supplier === value.indexNo) {
                                that.data.creditPeriod = value.creditPeriod;
                                return;
                            }
                        });

                    }, select: function (indexNo) {
                        var keyId = -1;
                        angular.forEach(this.purchaseOrderItemList, function (value, key) {
                            if (indexNo === value.indexNo) {
                                keyId = key;
                            }
                        });
                        var selectedItem = this.purchaseOrderItemList[keyId];

                        selectedItem.purchaseOrderItem = selectedItem.indexNo;
                        selectedItem.selectedPONumber = this.selectedPONumber;
                        selectedItem.receiveQty = selectedItem.balanceQty;
                        selectedItem.qty = selectedItem.balanceQty;

                        selectedItem.value = selectedItem.receiveQty * selectedItem.price;
                        selectedItem.discountValue = (selectedItem.value * selectedItem.discount) / 100;
                        selectedItem.netValue = selectedItem.value - selectedItem.discountValue;
                        this.data.amount += selectedItem.netValue;
                        this.data.grnItemList.push(selectedItem);

                        this.purchaseOrderItemList.splice(keyId, 1);
                        this.grnQtyCount();

                    }, editItemQty: function (indexNo) {
                        var keyId = -1;
                        angular.forEach(this.purchaseOrderItemList, function (value, key) {
                            if (indexNo === value.indexNo) {
                                keyId = key;
                            }
                        });
                        var selectedItem = this.purchaseOrderItemList[keyId];
                        selectedItem.purchaseOrderItem = selectedItem.indexNo;
                        selectedItem.selectedPONumber = this.selectedPONumber;
                        selectedItem.receiveQty = selectedItem.balanceQty;
                        selectedItem.barcode = this.getItemObject(selectedItem.item).barcode;

                        this.tempData = selectedItem;


                        this.purchaseOrderItemList.splice(keyId, 1);

                    }, addData: function () {
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Empty Value.Can't be Added !");
                        }
                        if (!that.tempData.receiveQty) {
                            saveConfirmation = false;
                            Notification.error("Quantity must be Greater Than 0. Can't be Added !");
                        }
                        if (that.tempData.receiveQty > that.tempData.orderQty) {
                            saveConfirmation = false;
                            Notification.error("Quantity Out of Range ! Max Quantity " + that.tempData.balanceQty);
                        }
                        if (saveConfirmation) {
                            this.data.amount += this.tempData.netValue;
                            this.tempData.qty = this.tempData.receiveQty;
                            this.tempData.value = this.tempData.qty * this.tempData.price;
                            this.tempData.netValue = this.tempData.value;
                            this.tempData.discount = 0;
                            this.tempData.discountValue = 0;

                            this.data.grnItemList.push(this.tempData);
                            this.tempData = {};
                            this.grnQtyCount();
                        }
                    }
                    , save: function () {
                        var that = this;

                        var saveConfirmation = true;
                        if (!that.data.supplier) {
                            saveConfirmation = false;
                            Notification.error("Select Supplier for Save GRN Receive !");
                        }
                        if (that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Finish Edting Item for Save GRN Receive !");
                        }
                        if (!that.data.grnItemList.length > 0) {
                            saveConfirmation = false;
                            Notification.error("Add GRN Item for Save GRN Receive !");
                        }
                        if (saveConfirmation) {

                            var defer = $q.defer();
                            GrnService.saveGrnReceive(JSON.stringify(this.data))
                                    .success(function (data) {
                                        Notification.success('GRN Receive Save Success !');
                                        that.clear();
                                        defer.resolve();
                                    })
                                    .error(function (data) {
                                        Notification.error('GRN Receive Save Fail !');
                                        defer.reject();
                                    });
//                        console.log(this.data);
                            return defer.promise;
                        }
                    }
                    , clear: function () {
                        this.purchaseOrderItemList = [];
                        this.grandTotalValue = 0.00;
                        this.itemTotalQty = 0.00;
                        this.selectedDetailIndex = -1;
                        this.selectedPONumber = -1;
                        this.data = grnModelFactory.newData();
                        this.tempData = grnModelFactory.tempData();
                        this.totalGrnQty = 0.00;
                        this.loadApprovedPurchaseOrder();

                    }
                    , deleteItem: function (index) {
                        this.purchaseOrderItemList.push(this.data.grnItemList[index]);
                        this.data.grnItemList.splice(index, 1);
                        this.grnQtyCount();

                    }
                    , grnQtyCount: function () {
                        var that = this;
                        var totalGrnQty = 0;
                        angular.forEach(this.data.grnItemList, function (value) {
                            totalGrnQty += value.qty;
                        });
                        this.totalGrnQty = totalGrnQty;
                    },
                    itemTotal: function () {
                        var that = this;
                        that.itemTotalQty = 0.00;
                        that.itemTotalCount = 0;
                        angular.forEach(that.purchaseOrderItemList, function (value) {
                            if (value.status === 'APPROVED') {
                                that.itemTotalQty += value.balanceQty;
                                that.itemTotalCount++;
                            }
                        });
                    }
                    , orderLengthCheck: function (list) {
                        var check = false;
                        angular.forEach(list, function (value) {
                            if (value.status === 'APPROVED') {
                                if (value.balanceQty > 0) {
                                    check = true;
                                    return;
                                }
                            }
                        });
                        return check;
                    }
                    , changeSupplier: function () {
                        console.log('change supplier');
                        this.purchaseOrderItemList = [];
                        this.grandTotalValue = 0.00;
                        this.itemTotalQty = 0.00;
                        this.selectedDetailIndex = -1;
                        this.selectedPONumber = -1;
                        this.data.grnItemList = [];
                        this.tempData = grnModelFactory.tempData();
                        this.totalGrnQty = 0.00;
                        this.loadApprovedPurchaseOrder();
                        this.itemTotalCount = 0;
                        this.totalGrnQty = 0.00;
                    }
                };
                return GrnModel;
            });
}());

