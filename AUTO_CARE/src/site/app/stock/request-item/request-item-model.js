(function () {
    angular.module("appModule")
            .factory("requestItemModel", function (requestItemService, $q) {
                function requestItemModel() {
                    this.constructor();
                }

                requestItemModel.prototype = {
                    data: {},
                    //master data lists
                    bays: [],
                    items: [],
                    vehicles: [],
                    itemUnits: [],
                    packageItemList: [],
                    //select package items list
                    itemUnitList: [],
                    //pending job card list
                    pendingJobCards: [],
                    //select job card items
                    jobItemList: [],
                    bayItemList: [],
                    //job card select filter items
                    filterItems: [],
                    //complited job items
                    itemsByStockLegerStockItem: [],
                    itemsByStockLegerNonStockItem: [],
                    complitedJobItem: [],
                    constructor: function () {
                        var that = this;
                        requestItemService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        requestItemService.loadBay()
                                .success(function (data) {
                                    that.bays = data;
                                });

                        requestItemService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        requestItemService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        requestItemService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });

                        this.findItemsForStockLeger();
                        this.findByItemNonStockItmQty();
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        requestItemService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemList = [];
                                    angular.extend(that.jobItemList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemList = [];
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getBayIssueHistory: function (bay) {
                        var defer = $q.defer();
                        var that = this;
                        requestItemService.getBayIssueHistory(bay)
                                .success(function (data) {
                                    that.bayItemList = [];
                                    that.bayItemList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.bayItemList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findItemsForStockLeger: function () {
                        var that = this;
                        var defer = $q;
                        requestItemService.findByItemStockItmQty()
                                .success(function (data) {
                                    that.itemsByStockLegerStockItem = [];
                                    that.itemsByStockLegerStockItem = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemsByStockLegerStockItem = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findByItemNonStockItmQty: function () {
                        var that = this;
                        var defer = $q;
                        requestItemService.findByItemNonStockItmQty()
                                .success(function (data) {
                                    that.itemsByStockLegerNonStockItem = [];
                                    that.itemsByStockLegerNonStockItem = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemsByStockLegerNonStockItem = [];
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
                    vehicleData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicles, function (values) {
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
                    findByStockFromItem: function (item) {
                        var data = 0.0;
                        angular.forEach(this.itemsByStockLegerStockItem, function (values) {
                            if (values[0] === parseInt(item)) {
                                data = values[1];
                                return;
                            }
                        });
                        return data;
                    },
                    findByNonStockFromItem: function (item) {
                        var data = 0.0;
                        angular.forEach(this.itemsByStockLegerNonStockItem, function (values) {
                            if (values[0] === parseInt(item)) {
                                data = values[1];
                                return;
                            }
                        });
                        return data;
                    },
                    checkItemCompliteJobCard: function (itemData, selectedJobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "COMPLITED";
                        requestItemService.checkItemJobCard(itemData.indexNo, status, selectedJobCardIndexNo)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.jobItemList.length; i++) {
                                        if (that.jobItemList[i].indexNo === itemData.indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.jobItemList.splice(id, 1);
                                    that.jobItemList.push(data);
                                    that.findItemsForStockLeger();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    checkItemPendingJobCard: function (itemData, selectBayIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "PENDING";
                        requestItemService.checkItemJobCard(itemData.indexNo, status, selectBayIndexNo)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.jobItemList.length; i++) {
                                        if (that.jobItemList[i].indexNo === itemData.indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.jobItemList.splice(id, 1);
                                    that.jobItemList.push(data);
                                    that.findItemsForStockLeger();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    checkItemCompliteBay: function (itemData) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "COMPLITED";
                        requestItemService.checkItemBay(itemData.indexNo, status)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.bayItemList.length; i++) {
                                        if (that.bayItemList[i].indexNo === itemData.indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.bayItemList.splice(id, 1);
                                    that.bayItemList.push(data);
                                    that.findByNonStockFromItem()();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    checkItemPendingBay: function (itemData) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "PENDING";
                        requestItemService.checkItemBay(itemData.indexNo, status)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.bayItemList.length; i++) {
                                        if (that.bayItemList[i].indexNo === itemData.indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.bayItemList.splice(id, 1);
                                    that.bayItemList.push(data);
                                    that.findByNonStockFromItem();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    }
                };
                return requestItemModel;
            });
}());