(function () {
    angular.module("appModule")
            .factory("grnModel", function (grnService, grnModelFactory, $q) {
                function grnModel() {
                    this.constructor();
                }

                invoiceModel.prototype = {
                    
                    data: {},
                    //master data lists
                    

                    constructor: function () {
                        var that = this;
                        this.data = invoiceModelFactory.newData();

                        invoiceService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        invoiceService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        invoiceService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        invoiceService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    },
//                    addPackageAndServiceItem: function (item, type, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//
//                        this.data = invoiceModelFactory.newData();
//                        if (vehicleType === "REGISTER") {
//                            //value change
//                            that.data.quantity = 1;
//                            that.data.price = item.salePriceRegister;
//                            that.data.value = item.salePriceRegister;
//
//                            that.data.jobCard = jobCard;
//                            that.data.item = item.indexNo;
//
//                            if (type === "PACKAGE_ITEM") {
//                                this.data.package = 1;
//                            } else {
//                                this.data.package = 0;
//                            }
//
//                        } else {
//                            //value change
//                            that.data.quantity = 1;
//                            that.data.price = item.salePriceNormal;
//                            that.data.value = item.salePriceNormal;
//
//                            that.data.jobCard = jobCard;
//                            that.data.item = item.indexNo;
//
//                            if (type === "PACKAGE_ITEM") {
//                                this.data.package = 1;
//                            } else {
//                                this.data.package = 0;
//                            }
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    addNormalItem: function (item, qty, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//                        this.data = invoiceModelFactory.newData();
//                        if (vehicleType === "REGISTER") {
//                            //value change
//                            that.data.quantity = qty;
//                            that.data.price = item.salePriceRegister;
//                            that.data.value = qty * item.salePriceRegister;
//                            that.data.item = item.indexNo;
//                            that.data.jobCard = jobCard;
//                        } else {
//                            //value change
//                            that.data.quantity = qty;
//                            that.data.price = item.salePriceNormal;
//                            that.data.value = qty * item.salePriceNormal;
//                            that.data.item = item.indexNo;
//                            that.data.jobCard = jobCard;
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return  defer.promise;
//                    },
//                    addItemUnit: function (itemUnit, qty, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//
//                        this.data = invoiceModelFactory.newData();
//                        var itemUnitData = that.itemUnitData(itemUnit);
//
//                        if (vehicleType === "REGISTER") {
//                            that.data.quantity = qty;
//                            that.data.price = itemUnitData.salePriceRegister;
//                            that.data.value = parseFloat(qty * itemUnitData.salePriceRegister);
//                            that.data.itemUnit = itemUnitData.indexNo;
//                            that.data.jobCard = jobCard;
//                        } else {
//                            that.data.quantity = qty;
//                            that.data.price = itemUnitData.salePriceNormal;
//                            that.data.value = parseFloat(qty * itemUnitData.salePriceNormal);
//                            that.data.itemUnit = itemUnitData.indexNo;
//                            that.data.jobCard = jobCard;
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getSelectItemTotal: function () {
//                        var total = 0.0;
//                        angular.forEach(this.jobItemList, function (values) {
//                            total += values.value;
//                            return;
//                        });
//                        return total;
//                    },
//                    deleteSelectDetails: function (index) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.deleteJobItems(this.jobItemList[index].indexNo)
//                                .success(function () {
//                                    that.jobItemList.splice(index, 1);
//                                    that.getSelectItemTotal();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.getSelectItemTotal();
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getJobItemHistory: function (jobCard) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.getJobItemHistory(jobCard)
//                                .success(function (data) {
//                                    that.jobItemList = [];
//                                    angular.extend(that.jobItemList, data);
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.jobItemList = [];
//                                    defer.reject();
//                                });
//                        return  defer.promise;
//                    },
//                    getPackageItems: function (indexNo) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.getPackageItems(indexNo)
//                                .success(function (data) {
//                                    that.packageItemList = [];
//                                    that.packageItemList = data;
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.packageItemList = [];
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getItemUnits: function (item, priceCategory) {
//                        var data = [];
//                        angular.forEach(this.itemUnits, function (values) {
//                            if (values.item === parseInt(item) && values.priceCategory === parseInt(priceCategory)) {
//                                data.push(values);
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    getItemByPriceCategory: function (priceCategory) {
//                        var that = this;
//                        this.filterItems = [];
//                        angular.forEach(this.items, function (values) {
//                            if (values.priceCategory === parseInt(priceCategory)) {
//                                that.filterItems.push(values);
//                                return;
//                            }
//                        });
//                        return that.filterItems;
//                    },
//                    itemData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.items, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    vehicleData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.vehicles, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    itemUnitData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.itemUnits, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    duplicateItemCheck: function (item) {
//                        var data;
//                        angular.forEach(this.jobItemList, function (values) {
//                            if (values.item === parseInt(item.indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    duplicateItemUnitCheck: function (itemUnit) {
//                        var data;
//                        angular.forEach(this.jobItemList, function (values) {
//                            if (values.itemUnit === parseInt(itemUnit)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    }
//                };
                return grnModel;
            });
}());