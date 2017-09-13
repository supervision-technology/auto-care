(function () {
    angular.module("appModule")
            .factory("vehicleImageModel", function (vehicleImageService, $q) {
                function vehicleImageModel() {
                    this.constructor();
                }

                vehicleImageModel.prototype = {
                    vehicles: [],
                    priceCategoryList: [],
                    pendingJobCards: [],
                    constructor: function () {
                        var that = this;

                        vehicleImageService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = [];
                                    that.pendingJobCards = data;
                                });

                        vehicleImageService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        vehicleImageService.loadPriceCategory()
                                .success(function (data) {
                                    that.priceCategoryList = data;
                                });
                    },
                    loadVehicleImages: function (jobCard) {
                        var defer = $q.defer();
                        vehicleImageService.loadVehicleImages(jobCard)
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    removeVehicleImage: function (vehicleImage) {
                        var defer = $q.defer();
                        vehicleImageService.removeVehicleImage(vehicleImage)
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
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
                    priceCategoryData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.priceCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return vehicleImageModel;
            });
}());