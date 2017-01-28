(function () {
    var factory = function (VehicleEntranceModelFactory, VehicleEntranceService, $q) {
        function VehicleEntranceModel() {
            this.constructor();
        }

//prototype functions
        VehicleEntranceModel.prototype = {
//weigh data
            data: {},
            clientData: {},
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
                that.clientData = VehicleEntranceModelFactory.newClientData();
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
            },
            //clear all data
            clear: function () {
                this.data = VehicleEntranceModelFactory.newData();
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
            item: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                return item;
            },
            saveJobCard: function () {
                var defer = $q.defer();
                VehicleEntranceService.saveJobCard(JSON.stringify(this.data))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
            },
            //  ----------------------------------- search functions -----------------------------------

            saveNewClient: function () {
                var defer = $q.defer();
                VehicleEntranceService.saveClient(JSON.stringify(this.clientData))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
            },
//  ----------------------------------- u pdate mileage functions -----------------------------------

            updateVehicle: function (vehicle) {
                var defer = $q.defer();
                VehicleEntranceService.saveVehicle(JSON.stringify(vehicle))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
            },
            vehicelOb: function (vehicleNo) {
                var vehicle;
                angular.forEach(this.vehicles, function (value) {
                    if (value.vehicleNo === vehicleNo) {
                        vehicle = value;
                        return;
                    }
                });
                return vehicle;
            }
        };
        return VehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("VehicleEntranceModel", factory);
}());


