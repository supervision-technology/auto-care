(function () {
    angular.module("appModule")
            .factory("jobCardEditModel", function (jobCardEditService, jobCardEditFactory, $q) {
                function jobCardEditModel() {
                    this.constructor();
                }

                jobCardEditModel.prototype = {
                    jobCardEditData: {},
                    JobCardData: {},
                    items: [],
                    itemUnits: [],
                    category: [],
                    itemCategory: [],
                    vehicleList: [],
                    priceCategoryList: [],
                    employeeList: [],
                    pendingJobCards: [],
                    constructor: function () {
                        var that = this;
                        that.clear();

                        jobCardEditService.loadVehicles()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });

                        jobCardEditService.loadPriceCategory()
                                .success(function (data) {
                                    that.priceCategoryList = data;
                                });

                        jobCardEditService.loadEmployee()
                                .success(function (data) {
                                    that.employeeList = data;
                                });

                        jobCardEditService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });

                        jobCardEditService.loadCategory()
                                .success(function (data) {
                                    that.category = data;
                                });

                        jobCardEditService.loadItemsCategory()
                                .success(function (data) {
                                    that.itemCategory = data;
                                });

                        jobCardEditService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });

                        that.pendingJobCardDetails();
                    },
                    clear: function () {
                        this.jobCardEditData = jobCardEditFactory.jobCardEditData();
                        this.JobCardData = jobCardEditFactory.newJobCardData();
                        this.jobItemList = [];
                    },
                    pendingJobCardDetails: function () {
                        var that = this;
                        that.pendingJobCards = [];
                        jobCardEditService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });
                    },
                    findJobCardDetail: function (jobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        jobCardEditService.findJobCard(jobCardIndexNo)
                                .success(function (data) {
                                    that.jobCardEditData.oldPriceCategory = data.priceCategory;
                                    angular.extend(that.JobCardData, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    changeJobCardDetails: function () {
                        var defer = $q.defer();
                        var that = this;
                        that.JobCardData.priceCategory = that.jobCardEditData.newPriceCategory;
                        jobCardEditService.changeJobCard(JSON.stringify(that.JobCardData), that.jobCardEditData.reponcebleEmployee)
                                .success(function (data) {
                                    that.pendingJobCardDetails();
                                    defer.resolve();
                                })
                                .error(function (data) {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        jobCardEditService.getJobItemHistory(jobCard)
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
                    vehicleData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    vehicleLabel: function (indexNo) {
                        var vehicle = "";
                        angular.forEach(this.vehicleList, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                vehicle = value.vehicleNo;
                                return;
                            }
                        });
                        return vehicle;
                    },
                    priceCategoryData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.priceCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    priceCategoryLabel: function (indexNo) {
                        var priceCategory = "";
                        angular.forEach(this.priceCategoryList, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                priceCategory = value.name;
                                return;
                            }
                        });
                        return priceCategory;
                    },
                    employeeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.indexNo + " - " + values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    employee: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
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
                    categoryColours: function (indexNo) {
                        var data = "";
                        angular.forEach(this.category, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    //------------------------------- get totals -------------------------------
                    getSelectItemTotalForService: function () {
                        var total = 0.0;
                        var that = this;
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "SERVICE" || that.itemData(values.item).type === "PACKAGE") {
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
                    }
                    //------------------------------- /get totals -------------------------------
                };
                return jobCardEditModel;
            });
}());