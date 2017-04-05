(function () {
    var factory = function (vehicleEntranceService, vehicleEntranceFactory, $q, $filter) {
        function vehicleEntranceModel() {
            this.constructor();
        }

        vehicleEntranceModel.prototype = {

            //data model
            vehicleData: {},
            clientData: {},
            jobcard: {},
            vehicleTypeData: {},
            priceCategoryData: {},
            
            //uib-typeHead
            vehicleList: [],
            clientList: [],
            vehicleTypeList: [],
            priceCategoryList: [],
            jobCardList: [],
            
            constructor: function () {
                var that = this;
                this.vehicleData = vehicleEntranceFactory.newVehicleData();
                this.clientData = vehicleEntranceFactory.newClientData();
                this.jobcard = vehicleEntranceFactory.newJobCardData();
//                this.jobcard = vehicleEntranceFactory.getJobCard();
                this.vehicleTypeData = vehicleEntranceFactory.newVehicleTypeData();
                this.priceCategoryData = vehicleEntranceFactory.newPriceCategoryData();
                
                this.loadClient();
                
                this.loadVehicle();
                
                vehicleEntranceService.loadVehicleType()
                        .success(function (data) {
                            that.vehicleTypeList = data;
                            console.log(data);
                        });
                vehicleEntranceService.loadPriceCategory()
                        .success(function (data) {
                            that.priceCategoryList = data;
                        });
            },
            loadClient: function () {
                var that = this;
                vehicleEntranceService.loadClient()
                        .success(function (data) {
                            that.clientList = data;
                        });
            },
            loadJobCardByClientIndexNo: function(indexNo){
                var that =this;
                vehicleEntranceService.getJobCard(indexNo)
                        .success(function (data){
                            that.jobCardList = data;
                        });
            },
            loadVehicle: function () {
                var that = this;
                vehicleEntranceService.loadVehicle()
                        .success(function (data) {
                            that.vehicleList = data;
                        });
            },
            clearModel: function () {
                this.clientData = {};
                this.vehicleData = {};
                this.jobcard = {};
                this.vehicleTypeData = {};
                this.priceCategoryData = {};
            },
            clear: function () {
                this.clientData = {};
            },
            vehicleSerachByIndex: function (indexNo) {
                var that = this;
                vehicleEntranceService.vehicleSerachByIndex(indexNo)
                        .success(function (data) {
                            that.vehicleData = data;
                            vehicleEntranceService.getClientByIndexNo(that.vehicleData.client)
                                    .success(function (data) {
                                        that.clientData = data;
                                    })
                                    .error(function () {
                                        console.log("error search");
                                    });
                        })
                        .error(function () {
                            console.log("error search");
                        });
            },
            vehicleSerachByVehicleNo: function (vehicleNo) {
                var that = this;
                vehicleEntranceService.vehicleSerachByVehicleNo(vehicleNo)
                        .success(function (data) {
                            that.vehicleData = data;
                            vehicleEntranceService.getClientByIndexNo(that.vehicleData.client)
                                    .success(function (data) {
                                        that.clientData = data;
                                    });
                        });
            },
            saveJobCard: function () {
                var that = this;
                that.jobcard.transaction = 1;
                that.jobcard.inTime = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
                that.jobcard.status = "PENDING";
                that.jobcard.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                that.jobcard.bay = 1;
                that.jobcard.priceCategory = that.vehicleData.priceCategory;
                that.jobcard.inMileage = that.vehicleData.lastMilage;
                that.jobcard.client = that.clientData.indexNo;
                that.jobcard.vehicle = that.vehicleData.indexNo;
                var defer = $q.defer();
                vehicleEntranceService.saveJob(JSON.stringify(that.jobcard))
                        .success(function (data) {
                            that.loadClient();
                            that.loadVehicle();
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            updateClientFromVehicle: function () {
                var that = this;
                this.vehicleData.client = that.clientData.indexNo;
                this.vehicleData.type = "NORMAL";
                var defer = $q.defer();
                vehicleEntranceService.updateVehicle(JSON.stringify(that.vehicleData))
                        .success(function (data) {
                            that.vehicleData = data;
                            that.clientList.unshift(data);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            newClient: function () {
                var that = this;
                var defer = $q.defer();
                that.clientData.type = "NEW";
                vehicleEntranceService.newClient(JSON.stringify(that.clientData))
                        .success(function (data) {
                            that.clientData = data;
                            that.vehicleList.unshift(data);
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
            vehicle: function (vehicleNo) {
                var data;
                angular.forEach(this.vehicleList, function (value) {
                    if (angular.equals(value.vehicleNo, vehicleNo)) {
                        data = value;
                        return;
                    }
                });
                return data;
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
            },
            vehicleTypeLabel: function (indexNo) {
                var vehicleType = "";
                angular.forEach(this.vehicleTypeList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        vehicleType = value.type;
                        return;
                    }
                });
                return vehicleType;
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
            }
        };
        return vehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("vehicleEntranceModel", factory);
}());