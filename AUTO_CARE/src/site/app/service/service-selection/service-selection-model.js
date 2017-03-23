(function () {
    angular.module("appModule")
            .factory("ServiceSelectionModel", function (ServiceSelectionService, ServiceSelectionModelFactory, $q) {
                function ServiceSelectionModel() {
                    this.constructor();
                }

                ServiceSelectionModel.prototype = {
                    data: {},
                    items: [],
                    vehicles: [],
                    itemUnits: [],

                    packageItemList: [],
                    itemUnitList: [],
                    pendingJobCards: [],
                    jobItemList: [],
                    constructor: function () {
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();

                        ServiceSelectionService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        ServiceSelectionService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        ServiceSelectionService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        ServiceSelectionService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    },
                    clear: function () {

                    },
//                    getItemsByPriceCategory: function (priceCategory) {
//                        var that = this;
//                        var defer = $q.defer();
//                        ServiceSelectionService.loadItemsByPriceCategory()
//                                .success(function (data) {
//                                    that.items = [];
//                                    that.items = data;
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.items = [];
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
                    addPackageAndServiceItem: function (item, type, jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();
                        that.data.quantity = 1;
                        that.data.price = item.salePriceNormal;
                        that.data.value = item.salePriceNormal;
                        that.data.jobCard = jobCard;
                        that.data.item = item.indexNo;

                        if (type === "PACKAGE_ITEM") {
                            this.data.package = 1;
                        } else {
                            this.data.package = 0;
                        }

                        ServiceSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    this.data = ServiceSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
                    },
                    addNormalItem: function (item, qty, jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();
                        that.data.quantity = qty;
                        that.data.price = item.salePriceNormal;
                        that.data.value = qty * item.salePriceNormal;
                        that.data.item = item.indexNo;
                        that.data.jobCard = jobCard;

                        ServiceSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    this.data = ServiceSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
                    },
                    addItemUnit: function (itemUnit, qty, jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();
                        that.data.quantity = 1;
                        that.data.price = itemUnit.salePriceNormal;
                        that.data.value = itemUnit.salePriceNormal;
                        that.data.itemUnit = itemUnit.indexNo;
                        that.data.jobCard = jobCard;

                        ServiceSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    this.data = ServiceSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
                    },
                    getSelectItemTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
                    deleteSelectDetails: function (index) {
                        var defer = $q.defer();
                        var that = this;
                        ServiceSelectionService.deleteJobItems(this.jobItemList[index].indexNo)
                                .success(function () {
                                    that.jobItemList.splice(index, 1);
                                    that.getSelectItemTotal();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.getSelectItemTotal();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        ServiceSelectionService.getJobItemHistory(jobCard)
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
                    getPackageItems: function (indexNo) {
                        var defer = $q.defer();
                        var that = this;
                        ServiceSelectionService.getPackageItems(indexNo)
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
                    getItemUnits: function (indexNo, packageCategory) {
                        var defer = $q.defer();
                        var that = this;
                        ServiceSelectionService.getItemUnits(indexNo, packageCategory)
                                .success(function (data) {
                                    that.itemUnitList = [];
                                    that.itemUnitList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promis;
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
                    duplicateItemCheck: function (item) {
                        var data;
                        angular.forEach(this.jobItemList, function (values) {
                            if (values.item === parseInt(item.indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    duplicateItemUnitCheck: function (itemUnit) {
                        var data;
                        angular.forEach(this.jobItemList, function (values) {
                            if (values.itemUnit === parseInt(itemUnit.indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return ServiceSelectionModel;
            });
}());