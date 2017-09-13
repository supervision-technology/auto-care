(function () {
    angular.module("appModule")
            .factory("stockTransferInternalInModel", function (StockTransferService, Notification, StockTransferModelFactory, $q) {
                function stockTransferInternalInModel() {
                    this.constructor();
                }

                stockTransferInternalInModel.prototype = {

                    data: {},
                    tempData: {},
                    //master data lists
                    stocks: [],
                    branches: [],
                    allItems: [],
                    stockQty: [],
                    pendingTransferOrders: [],

                    constructor: function () {
                        var that = this;
                        this.data = StockTransferModelFactory.newData();
                        this.tempData = StockTransferModelFactory.tempData();

                        StockTransferService.loadBranches()
                                .success(function (data) {
                                    that.branches = data;
                                });
                        StockTransferService.loadItems()
                                .success(function (data) {
                                    that.allItems = data;
                                });
                        StockTransferService.loadStock()
                                .success(function (data) {
                                    that.stocks = data;
                                });
                    }
                    , getPendingTransferOrders: function (branch, store) {
                        var that = this;
                        if (!branch) {
                            Notification.error('Select Branch For Load Pending Transfer Orders')
                        } else {
                            StockTransferService.getPendingTransferOrdersForInternal(branch, store)
                                    .success(function (data) {
                                        that.pendingTransferOrders = data;
                                    });
                        }
                    }
                    , branchLabel: function (index) {
                        var label;
                        angular.forEach(this.branches, function (value) {
                            if (value.indexNo === index) {
                                label = value.branchCode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    , stockLabel: function (index) {
                        var label;
                        angular.forEach(this.stocks, function (value) {
                            if (value.indexNo === index) {
                                label = value.number + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    , itemLable: function (index) {
                        var label;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                label = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    , selectTransferOrder: function (index) {
                        var that = this;
                        var totalQty = 0.00;
                        this.data = that.pendingTransferOrders[index];

                        angular.forEach(this.data.transferItemList, function (value) {
                            totalQty += parseFloat(value.qty);
                        });
                        this.data.totalQty = totalQty;
                    }
                    , getItemBarcode: function (index) {
                        var barcode;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                barcode = value.barcode;
                                return;
                            }
                        });
                        return barcode;
                    }
                    , getItemDescription: function (index) {
                        var description;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                description = value.name;
                                return;
                            }
                        });
                        return description;
                    }
                    , unitCheck: function (index) {
                        this.data.transferItemList[index].status = 'CHECKED';

                    }
                    , unitUncheck: function (index) {
                        this.data.transferItemList[index].status = null;

                    }
                    , validateChechAllItems: function () {
                        var check = true;
                        angular.forEach(this.data.transferItemList, function (value) {
                            if (value.status !== 'CHECKED') {
                                check = false;
                                return;
                            }
                        });
                        return check;
                    }
                    , saveInternalTransferIn: function () {
                        var defer = $q.defer();
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.data.inDate) {
                            saveConfirmation = false;
                            Notification.error("Select Date for Save Internal Transfer In !");
                        }
                        if (!this.validateChechAllItems()) {
                            saveConfirmation = false;
                            Notification.error("Check All Items for Complete Internal Stock Transfer !");
                        }
                        if (!that.data.fromBranch) {
                            saveConfirmation = false;
                            Notification.error("Select Current Branch for Save Internal Transfer In !");
                        }
                        if (!that.data.toStore) {
                            saveConfirmation = false;
                            Notification.error("Select ToStore for Save Internal Transfer In !");
                        }
                        if (that.data.transferItemList.length === 0) {
                            saveConfirmation = false;
                            Notification.error("Empty Item to Save Internal Transfer In !");
                        }
                        if (that.data.fromStore === that.data.tStore) {
                            saveConfirmation = false;
                            Notification.error("Can't be same Store to Save Internal Transfer In !");
                        }

                        if (saveConfirmation) {
                            console.log(this.data);
                            StockTransferService.saveInternalTransferIn(JSON.stringify(this.data))
                                    .success(function (data) {
                                        defer.resolve();
                                        that.clear();
                                        Notification.success("Item Transfer Success");
                                    })
                                    .error(function (data) {
                                        defer.reject();
                                        Notification.error("Item Transfer Fail");
                                    });
                            return defer.promise;
                        }
                    },
                    clear: function () {
                        this.data = StockTransferModelFactory.newData();
                        this.tempData = StockTransferModelFactory.tempData();
                        this.pendingTransferOrders = [];
                    }
                    ,
                    removeAllData: function () {
                        this.data.toStock = null;
                        this.data.inNumber = null;
                        this.data.inDate = null;
                        this.data.outDate = null;
                        this.data.outNumber = null;
                        this.data.refNumber = null;
                        this.data.remarks = null;
                        this.data.totalQty = 0;
                        this.data.transferItemList = null;
                        this.tempData = StockTransferModelFactory.tempData();
                        this.pendingTransferOrders = [];
                    }
                };
                return stockTransferInternalInModel;
            });
}());



