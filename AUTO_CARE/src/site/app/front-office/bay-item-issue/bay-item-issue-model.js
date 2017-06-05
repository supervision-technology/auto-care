(function () {
    angular.module("appModule")
            .factory("bayItemIssueModel", function (bayItemIssueService, bayItemIssueFactory, $filter, $q) {
                function bayItemIssueModel() {
                    this.constructor();
                }

                bayItemIssueModel.prototype = {
                    data: {},
                    items: [],
                    itemUnits: [],
                    bays: [],
                    itemsByStockLeger: [],
                    //bayIssueItemLeger
                    bayIssueItemLeger: [],
                    constructor: function () {
                        var that = this;
                        this.findItemsForStockLeger();

                        that.data = bayItemIssueFactory.newData();
                        bayItemIssueService.loadBay()
                                .success(function (data) {
                                    that.bays = data;
                                });

                        bayItemIssueService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });

                        bayItemIssueService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    },
                    clear: function () {
                        this.data = bayItemIssueFactory.newData();
                    },
                    findItemsForStockLeger: function () {
                        var that = this;
                        var defer = $q;
                        bayItemIssueService.findByItemStockItmQty()
                                .success(function (data) {
                                    that.itemsByStockLeger = [];
                                    that.itemsByStockLeger = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemsByStockLeger = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    itemData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.items, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    itemUnitData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.itemUnits, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    getItemUnits: function (item) {
                        var data = [];
                        angular.forEach(this.itemUnits, function (values) {
                            if (values.item === parseInt(item)) {
                                data.push(values);
                                return;
                            }
                        });
                        return data;
                    },
                    duplicateItemUnitCheck: function (itemUnit) {
                        var data;
                        angular.forEach(this.bayIssueItemLeger, function (values) {
                            if (values.itemUnits === parseInt(itemUnit)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    addItemUnit: function (itemUnit, quantity, bay) {
                        var that = this;
                        var defer = $q;

                        //fill data
                        var getItemUnitsData = this.itemUnitData(itemUnit);
                        that.data = bayItemIssueFactory.newData();
                        that.data.quantity = quantity;
                        that.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                        that.data.item = getItemUnitsData.item;
                        that.data.itemUnits = getItemUnitsData.indexNo;
                        that.data.stockRemoveQty = parseFloat(quantity * getItemUnitsData.qty);
                        that.data.bay = parseInt(bay);

                        bayItemIssueService.saveBayItemIssue(that.data)
                                .success(function (data) {
                                    that.bayIssueItemLeger.push(data);
                                    that.findItemsForStockLeger();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.findItemsForStockLeger();
                                    that.bayIssueItemLeger = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    deleteBayItemIssue: function (index) {
                        var defer = $q.defer();
                        var that = this;
                        bayItemIssueService.deleteBayItemIssue(this.bayIssueItemLeger[index].indexNo)
                                .success(function () {
                                    that.bayIssueItemLeger.splice(index, 1);
                                    that.findItemsForStockLeger();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.findItemsForStockLeger();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getBayIssueHistory: function (bay) {
                        var defer = $q.defer();
                        var that = this;
                        bayItemIssueService.getBayIssueHistory(bay)
                                .success(function (data) {
                                    that.bayIssueItemLeger = [];
                                    that.bayIssueItemLeger = data;
                                    that.findItemsForStockLeger();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.findItemsForStockLeger();
                                    that.bayIssueItemLeger = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    }
                };
                return bayItemIssueModel;
            });
}());