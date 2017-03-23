(function () {
    var factory = function (vehicleEntranceService,Notification, vehicleEntranceFactory, $q, $filter) {
        function vehicleEntranceModel() {
            this.constructor();
        }

        vehicleEntranceModel.prototype = {
            //data model
            vehicleData: {},
            clientData: {},
            jobcard: {},

            //uib-typeHead
            vehicleList: [],
            clientList: [],

            constructor: function () {
                var that = this;
                this.vehicleData = vehicleEntranceFactory.newVehicleData();
                this.clientData = vehicleEntranceFactory.newClientData();
                this.jobcard = vehicleEntranceFactory.newJobCardData();

                vehicleEntranceService.loadVehicle()
                        .success(function (data) {
                            that.vehicleList = data;
                        });

                vehicleEntranceService.loadClient()
                        .success(function (data) {
                            that.clientList = data;
                        });
            },
            vehicleSerachByIndex: function (indexNo) {
                var that = this;
                vehicleEntranceService.vehicleSerachByIndex(indexNo)
                        .success(function (data) {
                            that.vehicleData = data;

                            vehicleEntranceService.getClientByIndexNo(that.vehicleData.client)
                                    .success(function (data) {
                                        that.clientData = data;
                                    });
                        });
            },
            saveJobCard: function () {
                this.jobcard.client = this.clientData.indexNo;
                this.jobcard.vehicle = this.vehicleData.indexNo;
                var that = this;
                var defer = $q.defer();
                console.log(that.jobcard);
                vehicleEntranceService.saveJob(JSON.stringify(that.jobcard))
                        .success(function (data) {
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            updateClientFromVehicle: function () {
                var that=this;
                this.vehicleData.client = that.clientData.indexNo;
                console.log(this.clientData.indexNo);
                var defer = $q.defer();
                vehicleEntranceService.updateVehicle(JSON.stringify(this.vehicleData))
                        .success(function () {
//                            Notification.success(data.vehicleNo+" Update Successfully");
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            newClient: function () {
                var that=this;
                var defer = $q.defer();
                this.clientData.type = "type";
                vehicleEntranceService.newClient(JSON.stringify(this.clientData))
                        .success(function (data) {
//                            Notification.success(data.name +" Added Successfully ")
//                            that.updateClientFromVehicle(data.indexNo);
                            that.clientData = data;
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
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
            clientLabel: function (indexNo) {
                var client = "";
                angular.forEach(this.clientList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        client = value.name;
                        return;
                    }
                });
                return client;
            }
        };
        return vehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("vehicleEntranceModel", factory);
}());