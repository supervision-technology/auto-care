(function () {
    var factory = function (VehicleEntranceModelFactory, VehicleEntranceService, $q) {
        function VehicleEntranceModel() {
            this.constructor();
        }

        //prototype functions
        VehicleEntranceModel.prototype = {
            //weigh data
            data: {},
            //route information
            jobCardHistory: [],
            //branch information
            jobCardItemDetailHistory: [],
            //vehicles
            vehicles: [],
            //items
            items: [],
            //clients
            client: [],
            vehicle: {
                "client": null,
                "priceCategory": null
            },
            //constructor
            constructor: function () {
                var that = this;
                that.data = VehicleEntranceModelFactory.newData();
                //load default values
                VehicleEntranceService.loadVehicle()
                        .success(function (data) {
                            that.vehicles = data;
                        });
                VehicleEntranceService.loadItems()
                        .success(function (data) {
                            that.items = data;
                        });
            },
            //clear all data
            clear: function () {
                this.data = VehicleEntranceModelFactory.newData();
                this.vehicle = {
                    "client": null,
                    "priceCategory": null
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
                            that.jobCardHistory = data;
                            defer.resolve();
                        })
                        .error(function (data) {
                            that.jobCardHistory = [];
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
            }
        };
        return VehicleEntranceModel;
    };

    angular.module("appModule")
            .factory("VehicleEntranceModel", factory);
}());


