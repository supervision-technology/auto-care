(function () {
    angular.module("appModule")
            .factory("finalCheckListModel", function (finalCheckListService, finalCheckListModelFactory, $q) {
                function finalCheckListModel() {
                    this.constructor();
                }

                finalCheckListModel.prototype = {
                    data: {},
                    jobCardData: {},
                    //master data lists
                    bays: [],
                    items: [],
                    vehicles: [],
                    itemUnits: [],
                    itemCheckDetails: [],
                    defaultFinalCheckListItems: [],
                    //pending job card list
                    pendingJobCards: [],
                    //select job card items
                    jobItemList: [],
                    itemCheckDetailsList: [],
                    defaultFinalCheckDetailsList: [],
                    vehicleAssgnmentDetailsList: [],
                    constructor: function () {
                        var that = this;
                        this.jobCardData = finalCheckListModelFactory.newJobCardData();

                        finalCheckListService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        finalCheckListService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });

                        finalCheckListService.loadBays()
                                .success(function (data) {
                                    that.bays = data;
                                });

                        finalCheckListService.loadDefaultFinalItemCheck()
                                .success(function (data) {
                                    that.defaultFinalCheckListItems = data;
                                });

                        finalCheckListService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        finalCheckListService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });

                        finalCheckListService.loadItemCheckDetails()
                                .success(function (data) {
                                    that.itemCheckDetails = data;
                                });
                    },
                    setDefaultFinalCheckList: function (data) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.getDefaultFinalCheckListChecked(data)
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findJobCard: function (jobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.findJobCard(jobCardIndexNo)
                                .success(function (data) {
                                    angular.extend(that.jobCardData, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findByVehicleAssignmentDetails: function (jobCardIndexNo) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.findByVehicleAssignmentDetails(jobCardIndexNo)
                                .success(function (data) {
                                    that.vehicleAssgnmentDetailsList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemList = [];
                                    angular.extend(that.jobItemList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getDefaultFinalCheckList: function (jobCard) {
                        var that = this;
                        var defer = $q.defer();
                        finalCheckListService.getDefaultFinalCheckList(jobCard)
                                .success(function (data) {
                                    that.defaultFinalCheckDetailsList = [];
                                    that.defaultFinalCheckDetailsList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.defaultFinalCheckDetailsList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getItemCheckDetails: function (item) {
                        var defer = $q.defer();
                        var that = this;
                        finalCheckListService.getItemCheckDetails(item)
                                .success(function (data) {
                                    that.itemCheckDetailsList = [];
                                    angular.extend(that.itemCheckDetailsList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemCheckDetailsList = [];
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    checkedItemCheck: function (indexNo, jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "CHECK";
                        finalCheckListService.checkedItem(indexNo, status)
                                .success(function (getData) {
                                    var data = "";
                                    angular.forEach(that.itemCheckDetailsList, function (values) {
                                        if (values.indexNo === getData.indexNo) {
                                            data = values;
                                            return;
                                        }
                                    });
                                    data.status = "CHECK";
                                    that.itemCheckDetailsList.push(data);

                                    var status = "CHECK";
                                    angular.forEach(that.itemCheckDetailsList, function (values) {
                                        if (values.status === "NOT_CHECK") {
                                            status = "NOT_CHECK";
                                        }
                                    });

                                    if (status === "CHECK") {
                                        that.getJobItemHistory(jobCard);
                                    }

                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    checkedItemNotCheck: function (indexNo, jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "NOT_CHECK";
                        finalCheckListService.checkedItem(indexNo, status)
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.itemCheckDetailsList.length; i++) {
                                        if (that.itemCheckDetailsList[i].indexNo === indexNo) {
                                            id = i;
                                        }
                                    }
                                    that.itemCheckDetailsList.splice(id, 1);
                                    that.itemCheckDetailsList.push(data);
                                    that.getJobItemHistory(jobCard);
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return  defer.promise;
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
                    itemCheckDetail: function (indexNo) {
                        var data = "";
                        angular.forEach(this.itemCheckDetails, function (values) {
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
                    loadDefaultFinalItemCheck: function (indexNo) {
                        var data = "";
                        angular.forEach(this.defaultFinalCheckListItems, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    bay: function (indexNo) {
                        var data = "";
                        angular.forEach(this.bays, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return finalCheckListModel;
            });
}());