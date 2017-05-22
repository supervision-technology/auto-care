(function () {
    angular.module("appModule")
            .factory("requestItemModel", function (requestItemService, $q) {
                function requestItemModel() {
                    this.constructor();
                }

                requestItemModel.prototype = {
                    data: {},
                    //master data lists
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
                    //job card select filter items
                    filterItems: [],
                    //complited job items
                    itemsByStockLeger: [],
                    complitedJobItem: [],
                    constructor: function () {
                        var that = this;
                        requestItemService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
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
                    findItemsForStockLeger: function () {
                        var that = this;
                        var defer = $q;
                        requestItemService.findByItemStockItmQty()
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
                    findPackageStockItems: function (packageData) {
                         
                    },
                    getPackageItems: function (indexNo) {
                        var defer = $q.defer();
                        var that = this;
                        requestItemService.getPackageItems(indexNo)
                                .success(function (data) {
                                    that.packageItemList = [];
                                    that.packageItemList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.packageItemList = [];
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
                        angular.forEach(this.itemsByStockLeger, function (values) {
                            if (values[0] === parseInt(item)) {
                                data = values[1];
                                return;
                            }
                        });
                        return data;
                    },
                    checkItemComplite: function (itemData, selectedJobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "COMPLITED";
                        requestItemService.checkItem(itemData.indexNo, status, selectedJobCardIndexNo)
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
                    checkItemPending: function (itemData, selectedJobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "PENDING";
                        requestItemService.checkItem(itemData.indexNo, status, selectedJobCardIndexNo)
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
                    }
                };
                return requestItemModel;
            });
}());