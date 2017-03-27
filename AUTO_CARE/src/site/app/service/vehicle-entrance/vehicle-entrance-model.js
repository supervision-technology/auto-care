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
            priceCategoryData :{},

            //uib-typeHead
            vehicleList: [],
            clientList: [],
            vehicleTypeList: [],
            priceCategoryList :[],

            constructor: function () {
                var that = this;
                this.vehicleData = vehicleEntranceFactory.newVehicleData();
                this.clientData = vehicleEntranceFactory.newClientData();
                this.jobcard = vehicleEntranceFactory.newJobCardData();
                this.vehicleTypeData = vehicleEntranceFactory.newVehicleTypeData();
                this.priceCategoryData = vehicleEntranceFactory.newPriceCategoryData();
                
                vehicleEntranceService.loadVehicle()
                        .success(function (data) {
                            that.vehicleList = data;
                        });

                vehicleEntranceService.loadClient()
                        .success(function (data) {
                            that.clientList = data;
                        });

                vehicleEntranceService.loadVehicleType()
                        .success(function (data) {
                            that.vehicleTypeList = data;
                        });
                vehicleEntranceService.loadPriceCategory()
                        .success(function (data) {
                            that.priceCategoryList = data;
                        });
            },
            clearModel : function (){
                this.clientData = {};
                this.vehicleData = {};
                this.jobcard = {};
                this.vehicleTypeData = {};
                this.priceCategoryData = {};
            },
            
            clear: function () {
                this.clientData = {};
//                this.vehicleData ={};
//                this.jobcard ={};
//                this.vehicleTypeData ={};
//                this.priceCategoryData ={};
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
                var that = this;

                that.jobcard.transaction = 1;
                that.jobcard.inTime = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
                ;
                that.jobcard.status = "PENDING";
                that.jobcard.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                that.jobcard.bay = 1;
                that.jobcard.priceCategory = that.vehicleData.priceCategory;
                that.jobcard.inMileage = that.vehicleData.lastMilage;
                that.jobcard.client = that.clientData.indexNo;
                that.jobcard.vehicle = that.vehicleData.indexNo;
//                that.jobcard.vehicle = that.vehicleData.indexNo;
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
                var that = this;
                this.vehicleData.client = that.clientData.indexNo;
                this.vehicleData.type = "NORMAL";
                console.log(that.clientData);
                console.log(that.vehicleData);
                var defer = $q.defer();
                vehicleEntranceService.updateVehicle(JSON.stringify(this.vehicleData))
                        .success(function (data) {
                            that.vehicleData = data;
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
                vehicleEntranceService.newClient(JSON.stringify(this.clientData))
                        .success(function (data) {
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
            vehicle: function (vehicleNo) {
                var data;
                angular.forEach(this.vehicleList, function (value) {
                    if (angular.equals(value.vehicleNo,vehicleNo)) {
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
            
            priceCategoryLabel : function (indexNo){
                var priceCategory="";
                angular.forEach(this.priceCategoryList ,function(value){
                    if (value.indexNo === parseInt(indexNo)) {
                        priceCategory = value.name;
                        return ;
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