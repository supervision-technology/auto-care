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
                    selectedDetailIndex: -1,

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
                    }, selectPurchaseOrder: function (indexNo) {
                        var that = this;
                        that.purchaseOrderItemList = [];
                        this.selectedDetailIndex = indexNo;
                        angular.forEach(that.pendingPurchaseOrderList, function (value) {
                            if (indexNo === value.number) {
                                that.purchaseOrderItemList = value.purchaseOrderItemList;
                                that.data.deliverDate = value.deliverDate;
                                that.data.requestDate = value.date;
                                that.data.approvedDate = value.approvedDate;
                                that.data.supplier = value.supplier;
                            }
                        });
                        that.itemTotalQty = 0.00;
                        angular.forEach(that.purchaseOrderItemList, function (value) {
                            that.itemTotalQty += value.qty;
                        });

                    }, select: function (indexNo) {
                        var selectedItem = this.purchaseOrderItemList[indexNo];
                        selectedItem.purchaseOrderItem = this.selectedDetailIndex;
                        this.data.grnItemList.push(selectedItem);

                        this.purchaseOrderItemList.splice(indexNo, 1);


                    }, editItemQty: function (indexNo) {
                        var selectedItem = this.purchaseOrderItemList[indexNo];
                        selectedItem.purchaseOrderItem = this.selectedDetailIndex;
                        selectedItem.barcode = this.getItemObject(selectedItem.item).barcode;

                        this.tempData = selectedItem;


                        this.purchaseOrderItemList.splice(indexNo, 1);

                    }, addData: function () {
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Empty Value.Can't be Added !");
                        }
                        if (!that.tempData.qty) {
                            saveConfirmation = false;
                            Notification.error("Quantity must be Greater Than 0. Can't be Added !");
                        }
                        if (that.tempData.qty > that.tempData.orderQty) {
                            saveConfirmation = false;
                            Notification.error("Quantity Out of Range ! Max Quantity " + that.tempData.orderQty);
                        }
                        if (saveConfirmation) {
                            this.data.grnItemList.push(this.tempData);
                            this.tempData = {};
                        }
                    }
                    , save: function () {
                        var defer = $q.defer();
                        var that = this;
                        console.log(this.data);
                        GrnService.saveGrnReceive(JSON.stringify(this.data))
                                .success(function (data) {
                                    Notification.success('save success !');
                                    defer.resolve();
                                })
                                .error(function (data) {
                                    Notification.error('save fail !');
                                    defer.reject();
                                });
                        return defer.promise;
                    }
                };
                return GrnModel;
            });
}());

