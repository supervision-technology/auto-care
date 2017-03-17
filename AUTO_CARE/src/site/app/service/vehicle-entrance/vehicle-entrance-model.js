(function () {
    var factory = function (VehicleEntranceModelFactory, VehicleEntranceService, $q, $filter) {
        function VehicleEntranceModel() {
            this.constructor();
        }

        //prototype functions
        VehicleEntranceModel.prototype = {
            data: {},
            clientData: {},
            vehicleData: {},
            //route information
            jobCardHistory: [],
            //branch information
            jobCardItemDetailHistory: [],
            //vehicles
            vehicles: [],
            //items
            items: [],
            //clients
            clients: [],
            //vehicleType
            vehicleTypes: [],
            //priceCategory
            priceCategorys: [],
            vehicle: {
                "indexNo": 0,
                "vehicleNo": null,
                "year": null,
                "engineNo": null,
                "chasisNo": null,
                "insuranceExpiryDate": null,
                "revenueExpiryDate": null,
                "lastMilage": null,
                "nextMilage": null,
                "colour": null,
                "client": {
                    "indexNo": 0,
                    "name": null,
                    "addressLine1": null,
                    "addressLine2": null,
                    "addressLine3": null,
                    "mobile": null,
                    "branch": null,
                    "type": null,
                    "nic": null
                },
                "priceCategory": {
                    "indexNo": 0,
                    "name": null
                }
            },
            vehicleHistoryDetail: {
                "lastJobCardDate": null,
                "lastMileage": null
            },
            //constructor
            constructor: function () {
                var that = this;
                that.data = VehicleEntranceModelFactory.newData();
                that.vehicleData = VehicleEntranceModelFactory.newVehicleData();

                //load default values
                VehicleEntranceService.loadVehicle()
                        .success(function (data) {
                            that.vehicles = data;
                        });

                VehicleEntranceService.loadItems()
                        .success(function (data) {
                            that.items = data;
                        });

                VehicleEntranceService.loadClients()
                        .success(function (data) {
                            that.clients = data;
                        });

                VehicleEntranceService.loadVehiicleType()
                        .success(function (data) {
                            that.vehicleTypes = data;
                        });

                VehicleEntranceService.loadPriceCategory()
                        .success(function (data) {
                            that.priceCategorys = data;
                        });
            },
            clearVehicledata: function () {
                this.vehicleData = VehicleEntranceModelFactory.newVehicleData();
            },
            //clear all data
            clear: function () {
                this.data = VehicleEntranceModelFactory.newData();
                this.vehicleData = VehicleEntranceModelFactory.newVehicleData();

                this.vehicle = {
                    "client": null,
                    "priceCategory": null
                };

                this.vehicleHistoryDetail = {
                    "lastJobCardDate": null,
                    "lastJobCardIndexNo": null
                };

                this.jobCardHistory = [];
                this.jobCardItemDetailHistory = [];
            },
            //load from server
            getJobHistory: function (vehicleNo) {
                var defer = $q.defer();
                var that = this;
                VehicleEntranceService.getJobHistory(vehicleNo)
                        .success(function (data) {
                            that.jobCardHistory = [];
                            //array sort by date
                            data.sort(function (a, b) {
                                return new Date(b.date) - new Date(a.date);
                            });
                            that.jobCardHistory = data;
                            //vehicle job history details
                            this.vehicleHistoryDetail = {};
                            var lastItem = that.jobCardHistory[0];
                            that.vehicleHistoryDetail.lastJobCardDate = lastItem.date;
                            that.vehicleHistoryDetail.lastMileage = lastItem.inMileage;
                            defer.resolve();
                        })
                        .error(function (data) {
                            that.jobCardHistory = [];
                            this.vehicleHistoryDetail = {};
                            defer.reject();
                        });
                return defer.promise;
            },
            getJobItemHistory: function (jobCardNo) {
                var defer = $q.defer();
                var that = this;
                VehicleEntranceService.getJobItemHistory(jobCardNo)
                        .success(function (data) {
                            that.jobCardItemDetailHistory = [];
                            that.jobCardItemDetailHistory = data;
                            defer.resolve();
                        })
                        .error(function (data) {
                            that.jobCardItemDetailHistory = [];
                            defer.reject();
                        });
            },
            getDefarancedate: function (date) {
                var d1 = new Date(date);
                var cur = new Date();
                var defarance = (cur.getFullYear() * 12 + cur.getMonth()) - (d1.getFullYear() * 12 + d1.getMonth());
                return defarance;
            },
            saveJobCard: function () {
                var defer = $q.defer();
                this.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                this.data.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                this.data.outTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                VehicleEntranceService.saveJobCard(JSON.stringify(this.data))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
            },
            duplicateVehicleCheck: function (vehicleNo) {
                var data;
                angular.forEach(this.vehicles, function (values) {
                    if (values.vehicleNo === vehicleNo) {
                        data = values;
                        return;
                    }
                });
                return data;
            },
            saveVehicle: function () {
                var defer = $q.defer();
                var that = this;
                VehicleEntranceService.saveVehicle(JSON.stringify(this.vehicleData))
                        .success(function (data) {

                            that.vehicle = data;
                            that.data.client = data.client.indexNo;
                            that.data.priceCategory = data.priceCategory.indexNo;
                            that.data.vehicle = data.indexNo;
                            that.data.vehicleNo = data.vehicleNo;
                            that.getJobHistory(data.vehicleNo);

                            defer.resolve();
                        })
                        .error(function (data) {
                            console.log(data);
                            defer.reject();
                        });
            },
            //return lable for client
            clientLabel: function (model) {
                var label;
                angular.forEach(this.clients, function (value) {
                    if (value.indexNo === parseInt(model.indexNo)) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            //return lable for vehicle type
            vehicleTypeLabel: function (model) {
                var label;
                angular.forEach(this.vehicleTypes, function (value) {
                    if (value.indexNo === parseInt(model.indexNo)) {
                        label = value.indexNo + "-" + value.fuelType;
                        return;
                    }
                });
                return label;
            },
            //return lable for price category
            priceCategoryLabel: function (model) {
                var label;
                angular.forEach(this.priceCategorys, function (value) {
                    if (value.indexNo === parseInt(model.indexNo)) {
                        label = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return label;
            },
            vehicel: function (vehicleNo) {
                var vehicle;
                angular.forEach(this.vehicles, function (value) {
                    if (value.vehicleNo === vehicleNo) {
                        vehicle = value;
                        return;
                    }
                });
                return vehicle;
            },
            item: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                return item;
            }
        };
        return VehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("VehicleEntranceModel", factory);
}());


