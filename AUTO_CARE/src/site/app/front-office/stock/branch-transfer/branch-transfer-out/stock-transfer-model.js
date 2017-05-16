(function () {
    angular.module("appModule")
            .factory("stockTransferBranchOutModel", function (StockTransferService, Notification, StockTransferModelFactory, $q) {
                function stockTransferBranchOutModel() {
                    this.constructor();
                }

                stockTransferBranchOutModel.prototype = {

                    data: {},
                    tempData: {},
                    //master data lists
                    suppliers: [],
                    branches: [],
                    allItems: [],
                    stockQty: [],

                    constructor: function () {
                        var that = this;
                        this.data = StockTransferModelFactory.newData();
                        this.tempData = StockTransferModelFactory.tempData();

                        StockTransferService.loadSuppliers()
                                .success(function (data) {
                                    that.suppliers = data;
                                });
                        StockTransferService.loadBranches()
                                .success(function (data) {
                                    that.branches = data;
                                });
                        StockTransferService.loadItems()
                                .success(function (data) {
                                    that.allItems = data;
                                });
                    }
                    ,
                    getItemQty: function (branch, item) {
                        var stockQty = null;
                        var that = this;
                        StockTransferService.getItemStockQty(branch, item)
                                .success(function (data) {
                                    stockQty = data;
                                    if (stockQty[0][1] !== 0) {
                                        var totalQty = parseFloat(stockQty[0][1]);
                                        var orderedQty = parseFloat(stockQty[0][2]);
                                        var netQty = parseFloat(totalQty - orderedQty);

                                        that.tempData.netQty = netQty;
                                        that.tempData.orderedQty = orderedQty;
                                        that.tempData.totalQty = totalQty;
                                    } else {
                                        that.tempData.netQty = 0;
                                        that.tempData.orderedQty = 0;
                                        that.tempData.totalQty = 0;
                                    }

                                });
                        if (!that.tempData.netQty) {
                            Notification.error("Can't Find Stock Qty for this Item !'");
                             this.tempData = StockTransferModelFactory.tempData(); 
                        }

                    }
                    , validateBarcode: function (barcode) {
                        var selectItem = null;
                        angular.forEach(this.allItems, function (value) {
                            if (value.barcode === barcode) {
                                selectItem = value;
                                return;
                            }
                        });
                        if (selectItem) {
                            this.tempData.item = selectItem.indexNo;
                            this.getItemQty(this.data.fromBranch, selectItem.indexNo);

                        } else {
                            this.tempData.item = null;
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
                    , itemLabel: function (index) {
                        var label;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                label = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    }
                    ,
                    addData: function () {
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.tempData.item) {
                            saveConfirmation = false;
                            Notification.error("Select Transfer Items !");
                        }
                        if (!that.tempData.qty) {
                            saveConfirmation = false;
                            Notification.error("Add Transfer Quantity !");
                        }
                        if (that.tempData.qty <= 0) {
                            saveConfirmation = false;
                            Notification.error("Quantity Must Be Greater than 0 !");
                        }
                        if (that.tempData.qty > that.tempData.netQty) {
                            saveConfirmation = false;
                            Notification.error("Quantity Out of Range !");
                        }
                        if (that.validateAddData(that.tempData.item)) {
                            saveConfirmation = false;
                            Notification.error("Item Already Exists !");
                        }
                        if (that.data.fromBranch === that.data.toBranch) {
                            saveConfirmation = false;
                            Notification.error("Same Branch Selected !");
                        }

                        if (saveConfirmation) {
                            this.data.transferItemList.push(this.tempData);
                            this.tempData = StockTransferModelFactory.tempData();
                            this.summaryCalculator();
                        }

                    },
                    validateAddData: function (item) {
                        var findObject = false;
                        angular.forEach(this.data.transferItemList, function (value) {
                            if (value.item === item) {
                                findObject = true;
                                return;
                            }
                        });
                        return findObject;
                    },
                    edit: function (indexNo) {
                        this.tempData = this.data.transferItemList[indexNo];
                        this.data.transferItemList.splice(indexNo, 1);
                        this.summaryCalculator();
                    },

                    delete: function (indexNo) {
                        this.data.transferItemList.splice(indexNo, 1);
                        this.summaryCalculator();
                    },

                    getItemName: function (indexNo) {
                        var itemName = null;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === indexNo) {
                                itemName = value.name;
                                return;
                            }
                        });
                        return itemName;
                    },
                    summaryCalculator: function () {
                        var qty = 0;

                        angular.forEach(this.data.transferItemList, function (value) {
                            qty = parseFloat(qty) + parseFloat(value.qty);
                        });
                        this.data.totalQty = qty;
                    },
                    removeTempData: function () {
                        this.data.transferItemList = [];
                        this.tempData = StockTransferModelFactory.tempData();
                        this.summaryCalculator();
                    }
                    , saveExternalTransferOut: function () {
                        var defer = $q.defer();
                        var that = this;

                        var saveConfirmation = true;

                        if (!that.data.outDate) {
                            saveConfirmation = false;
                            Notification.error("Select Date for Save External Transfer Out !");
                        }
                        if (!that.data.fromBranch) {
                            saveConfirmation = false;
                            Notification.error("Select Current Branch for Save External Transfer Out !");
                        }
                        if (!that.data.toBranch) {
                            saveConfirmation = false;
                            Notification.error("Select Transfer Branch for Save External Transfer Out !");
                        }
                        if (that.data.transferItemList.length === 0) {
                            saveConfirmation = false;
                            Notification.error("Add Transfer Item for Save External Transfer Out !");
                        }
                        if (that.data.fromBranch === that.data.toBranch) {
                            saveConfirmation = false;
                            Notification.error("Can't be same Branch to Save External Transfer Out !");
                        }
                        if (that.tempData.barcode || that.tempData.item || that.tempData.qty) {
                            saveConfirmation = false;
                            Notification.error("Remove Editing Item for save External Transfer Out !");
                        }

                        if (saveConfirmation) {
                            StockTransferService.saveExternalTransferOut(JSON.stringify(this.data))
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
                    }
                };
                return stockTransferBranchOutModel;
            });
}());



