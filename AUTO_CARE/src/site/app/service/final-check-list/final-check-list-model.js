(function () {
    angular.module("appModule")
            .factory("finalCheckListModel", function (finalCheckListService, $q) {
                function finalCheckListModel() {
                    this.constructor();
                }

                finalCheckListModel.prototype = {

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
                    complitedJobItem: [],
                    constructor: function () {
                        var that = this;
                        finalCheckListService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        finalCheckListService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        finalCheckListService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        finalCheckListService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemList = [];
                                    angular.extend(that.jobItemList, data);
                                    angular.extend(that.complitedJobItem, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemList = [];
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getPackageItems: function (indexNo) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.getPackageItems(indexNo)
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
                    checkItemComplite: function ($index, item) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "COMPLITED";
                        finalCheckListService.checkItem(item.indexNo, status)
                                .success(function (data) {
                                    that.jobItemList.splice($index, 1);
                                    that.complitedJobItem.unshift(data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    checkItemPending: function ($index, item) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "PENDING";
                        finalCheckListService.checkItem(item.indexNo, status)
                                .success(function (data) {
                                    that.complitedJobItem.splice($index, 1);
                                    that.jobItemList.unshift(data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    }
                };
                return finalCheckListModel;
            });
}());