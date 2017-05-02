(function () {
    angular.module("appModule")
            .factory("ServiceSelectionModel", function (ServiceSelectionService, ServiceSelectionModelFactory, $q) {
                function ServiceSelectionModel() {
                    this.constructor();
                }

                ServiceSelectionModel.prototype = {

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

                    constructor: function () {
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();

                        ServiceSelectionService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        ServiceSelectionService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        ServiceSelectionService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        ServiceSelectionService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    },
                    addPackageAndServiceItem: function (item, type, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;

                        this.data = ServiceSelectionModelFactory.newData();
                        if (vehicleType === "REGISTER") {
                            //value change
                            that.data.quantity = 1;
                            that.data.price = item.salePriceRegister;
                            that.data.value = item.salePriceRegister;

                            that.data.jobCard = jobCard;
                            that.data.item = item.indexNo;

                            if (type === "PACKAGE_ITEM") {
                                this.data.package = 1;
                            } else {
                                this.data.package = 0;
                            }

                        } else {
                            //value change
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
                        return defer.promise;
                    },
                    addNormalItem: function (item, qty, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;
                        this.data = ServiceSelectionModelFactory.newData();
                        if (vehicleType === "REGISTER") {
                            //value change
                            that.data.quantity = qty;
                            that.data.price = item.salePriceRegister;
                            that.data.value = qty * item.salePriceRegister;
                            that.data.item = item.indexNo;
                            that.data.jobCard = jobCard;
                        } else {
                            //value change
                            that.data.quantity = qty;
                            that.data.price = item.salePriceNormal;
                            that.data.value = qty * item.salePriceNormal;
                            that.data.item = item.indexNo;
                            that.data.jobCard = jobCard;
                        }

                        ServiceSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    that.data = ServiceSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    addItemUnit: function (itemUnit, qty, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;

                        this.data = ServiceSelectionModelFactory.newData();
                        var itemUnitData = that.itemUnitData(itemUnit);

                        if (vehicleType === "REGISTER") {
                            that.data.quantity = qty;
                            that.data.price = itemUnitData.salePriceRegister;
                            that.data.value = parseFloat(qty * itemUnitData.salePriceRegister);
                            that.data.itemUnit = itemUnitData.indexNo;
                            that.data.jobCard = jobCard;
                        } else {
                            that.data.quantity = qty;
                            that.data.price = itemUnitData.salePriceNormal;
                            that.data.value = parseFloat(qty * itemUnitData.salePriceNormal);
                            that.data.itemUnit = itemUnitData.indexNo;
                            that.data.jobCard = jobCard;
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
                        return defer.promise;
                    },
                    getSelectItemTotalForService: function () {
                        var total = 0.0;
                        var that = this;
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "SERVICE") {
                                total += values.value;
                                return;
                            }
                        });
                        return total;
                    },
                    getSelectItemTotalForItemAndItemUnits: function () {
                        var total = 0.0;
                        var that = this;
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "STOCK" || values.itemUnit !== null) {
                                total += values.value;
                                return;
                            }
                        });
                        return total;
                    },
                    getSelectItemAllItems: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
                    getSelectJobItemForService: function () {
                        var that = this;
                        var lists = [];
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "SERVICE") {
                                lists.push(values);
                                return;
                            }
                        });
                        return lists;
                    },
                    getSelectJobItemForItemAndItemUnits: function () {
                        var that = this;
                        var lists = [];
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "STOCK" || values.itemUnit !== null) {
                                lists.push(values);
                                return;
                            }
                        });
                        return lists;
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
                    getItemUnits: function (item, priceCategory) {
                        var data = [];
                        angular.forEach(this.itemUnits, function (values) {
                            if (values.item === parseInt(item) && values.priceCategory === parseInt(priceCategory)) {
                                data.push(values);
                                return;
                            }
                        });
                        return data;
                    },
                    getItemByPriceCategory: function (priceCategory) {
                        var that = this;
                        this.filterItems = [];
                        angular.forEach(this.items, function (values) {
                            if (values.priceCategory === parseInt(priceCategory)) {
                                that.filterItems.push(values);
                                return;
                            }
                        });
                        return that.filterItems;
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
                            if (values.itemUnit === parseInt(itemUnit)) {
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