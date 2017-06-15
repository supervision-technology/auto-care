(function () {
    angular.module("appModule")
            .factory("stockTransferBranchOutApproveModel", function (StockTransferService, Notification, StockTransferModelFactory, $q) {
                function stockTransferBranchOutApproveModel() {
                    this.constructor();
                }

                stockTransferBranchOutApproveModel.prototype = {

                    data: {},
                    tempData: {},
                    //master data lists
                    branches: [],
                    allItems: [],
                    stocks: [],
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
                    , getItemBarcode: function (index) {
                        var label;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                label = value.barcode;
                                return;
                            }
                        });
                        return label;
                    }
                    , getItemDescription: function (index) {
                        var label;
                        angular.forEach(this.allItems, function (value) {
                            if (value.indexNo === index) {
                                label = value.name;
                                return;
                            }
                        });
                        return label;
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
                    , getPendingTransferOrders: function (branch) {
                        var that = this;
                        if (!branch) {
                            Notification.error('Select Branch For Load Pending Transfer Orders');
                        } else {
                            StockTransferService.getPendingTransferByBranch(branch)
                                    .success(function (data) {
                                        that.pendingTransferOrders = data;
                                    });
                        }
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
                    , unitCheck: function (index) {
                        this.data.transferItemList[index].status = 'CHECKED';

                    }
                    , unitUncheck: function (index) {
                        this.data.transferItemList[index].status = null;

                    }
                    ,
                    saveStockTransferOutApprove: function () {
                        var defer = $q.defer();
                        var that = this;

                        var saveConfirmation = true;

                        if (!this.validateChechAllItems()) {
                            saveConfirmation = false;
                            Notification.error("Check All Items for Complete Stock Transfer !");
                        }
                        
                        if (that.data.transferItemList.length === 0) {
                            saveConfirmation = false;
                            Notification.error("Empty Item for Complete Stock Transfer !");
                        }

                        if (saveConfirmation) {
                            StockTransferService.saveExternalTransferOutApprove(JSON.stringify(this.data))
                                    .success(function (data) {
                                        Notification.success('Save Success');
                                        that.clear();
                                        defer.resolve();

                                    })
                                    .error(function (data) {
                                        Notification.error('Save fail');
                                        defer.reject();
                                    });
                            return defer.promise;
                        }
                    }
                    ,
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
                        this.tempData = StockTransferModelFactory.tempData();
                        this.pendingTransferOrders = [];
                    }
                };
                return stockTransferBranchOutApproveModel;
            });
}());



