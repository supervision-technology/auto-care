(function () {
    angular.module("appModule")
            .factory("GrnApproveModel", function (GrnService, grnModelFactory, $q, $timeout, Notification) {
                function GrnModel() {
                    this.constructor();
                }

                GrnModel.prototype = {

                    //model factory data
                    data: {},
                    tempData: {},
                    summaryData: {},
                    suppliers: [],
                    items: [],
                    mainList: [],
                    mainListValue: 0,
                    selectedGrnIndex: -1,
                    approvedPurchaseOrderItemList: [],

                    constructor: function () {
                        var that = this;
                        that.data = grnModelFactory.newData();
                        that.tempData = grnModelFactory.tempData();
                        that.summaryData = grnModelFactory.tempData();
//
                        GrnService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });

                        GrnService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        this.loadPendingGrnList();

                        GrnService.loadApprovedPurchaseOrderItemList()
                                .success(function (data) {
                                    that.approvedPurchaseOrderItemList = data;
                                });


                    }
                    , loadPendingGrnList: function () {
                        var that = this;
                        that.mainList = [];
                        GrnService.loadPendingGrnList()
                                .success(function (data) {
                                    angular.forEach(data, function (value) {
                                        var amount = 0.00;
                                        angular.forEach(value.grnItemList, function (subUnit) {
                                            amount += subUnit.netValue;
                                        });
                                        value.grnAmount = amount;
                                        that.mainList.push(value);
                                    });
                                });
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
                    , getItemLabel: function (item) {
                        var label;
                        angular.forEach(this.items, function (value) {
                            if (value.indexNo === item) {
                                label = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    , getItem: function (purchaseOrderItem) {
                        var that = this;
                        var itemIndexNo;
                        angular.forEach(that.approvedPurchaseOrderItemList, function (value) {
                            if (value.indexNo === purchaseOrderItem) {
                                itemIndexNo = value.item;
                                return;
                            }
                        });
                        var itemObject;
                        angular.forEach(that.items, function (value) {
                            if (value.indexNo === itemIndexNo) {
                                itemObject = value;
                                return;
                            }
                        });
                        return itemObject;
                    }
                    , calculateMainListValue: function () {
                        var that = this;
                        this.mainListValue = 0;
                        var total = 0;
                        angular.forEach(this.mainList, function (value) {
                            total += value.grnAmount;
                        });
                        this.mainListValue = total;
                    }
                    , selectGrn: function ($index, indexNo) {
                        this.data = this.mainList[$index];
                        this.data.grandAmount = this.data.amount;
                        this.selectedGrnIndex = indexNo;

                    }
                    , edit: function (index) {
                        this.tempData = this.data.grnItemList[index];
                        this.tempData.item = this.getItem(this.tempData.purchaseOrderItem).indexNo;
                        this.tempData.barcode = this.getItem(this.tempData.purchaseOrderItem).barcode;
                        this.data.grnItemList.splice(index, 1);

                    }
                    , addData: function () {
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
                        if (!that.tempData.price) {
                            saveConfirmation = false;
                            Notification.error("Price must be Greater Than 0. Can't be Added !");
                        }
                        if (saveConfirmation) {
                            this.data.grnItemList.push(this.tempData);
                            this.tempData = grnModelFactory.tempData();
                        }

                    }
                    , calculateDataValue: function () {
                        var totalQty = 0.00;
                        var totalValue = 0.00;
                        var totalDiscountValue = 0.00;
                        var totalNetValue = 0.00;
                        angular.forEach(this.data.grnItemList, function (value) {
                            totalQty += value.qty;
                            totalValue += value.value;
                            totalDiscountValue += value.discountValue;
                            totalNetValue += value.netValue;
                        });
                        this.summaryData.qty = totalQty;
                        this.summaryData.value = totalValue;
                        this.summaryData.discount = totalDiscountValue;
                        this.data.amount = totalNetValue;
                    }
                    , save: function () {
                        var that = this;

                        var saveConfirmation = true;

                        if (that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Finish Edting Item for Approve Purchase Order !");
                        }
                        if (!that.data.approveDate) {
                            saveConfirmation = false;
                            Notification.error("Insert Approved Date for Approve Purchase Order !");
                        }
                        if (!that.data.supplier) {
                            saveConfirmation = false;
                            Notification.error("Can't be Approved this GRN without Supplier !");
                        }
                        if (that.data.nbt>=3 || that.data.nbt<=-1 ) {
                            saveConfirmation = false;
                            Notification.error("NBT Out Of Range !");
                        }
                        if (saveConfirmation) {

                            this.data.grandTotal = this.data.grandAmount;
                            var defer = $q.defer();
                            GrnService.saveGrnApprove(JSON.stringify(this.data))
                                    .success(function (data) {
                                        Notification.success('GRN Approved Success !');
                                        that.clear();
                                        defer.resolve();
                                    })
                                    .error(function (data) {
                                        Notification.error('GRN Approved Fail !');
                                        defer.reject();
                                    });
                            return defer.promise;
                        }
                    }
                    , clear: function () {
                        var that = this;
                        that.data = grnModelFactory.newData();
                        that.tempData = grnModelFactory.tempData();
                        that.summaryData = grnModelFactory.tempData();
                        this.loadPendingGrnList();
                        this.selectedGrnIndex = -1;
                    }

                };
                return GrnModel;
            });
}());

