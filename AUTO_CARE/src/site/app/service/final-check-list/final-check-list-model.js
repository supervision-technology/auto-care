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
                    itemCheckDetails: [],
                    //pending job card list
                    pendingJobCards: [],
                    //select job card items
                    jobItemList: [],
                    itemCheckDetailsList: [],
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

                        finalCheckListService.loadItemCheckDetails()
                                .success(function (data) {
                                    that.itemCheckDetails = data;
                                });
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
                        return  defer.promise;
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
                    checkedItem: function (indexNo,jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        var status = "CHECK";
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
                    notCheckItem: function (indexNo,jobCard) {
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
                    }
                };
                return finalCheckListModel;
            });
}());