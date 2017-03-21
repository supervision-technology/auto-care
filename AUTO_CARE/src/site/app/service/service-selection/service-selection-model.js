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
                    packageItemList: [],
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
                    },
                    clear: function () {

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
                    }
                };
                return ServiceSelectionModel;
            });
}());