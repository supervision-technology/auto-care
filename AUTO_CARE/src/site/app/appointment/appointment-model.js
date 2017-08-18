(function () {
    var factory = function (appointmentFactory, appointmentService, $q,$rootScope, $filter, Notification) {

        function itemModel() {
            this.constructor();
        }

        //prototype functions
        itemModel.prototype = {
            //data model
            appointmentData: {},
            //uib-typeahead
            items: [],
            branchList: [],
            vehicleList: [],
            //view table lists
            itemList: [],
            appointmentList: [],
            priceCategoryList: [],
            AppointmentItemList: [],
            pendingAppointmentList: [],
            approvedAppointmentList: [],
            //temp list
            clientList: [],
            tempPriceCategoryList: [],
            vehicleTypeList: [],
            //constructor
            constructor: function () {
                var that = this;

                that.appointmentData = appointmentFactory.newAppointmentData();


                appointmentService.loadItem()
                        .success(function (data) {
                            that.itemList = data;
                        });

                appointmentService.loadBranch()
                        .success(function (data) {
                            that.branchList = data;
                        });

                appointmentService.loadPriceCategory()
                        .success(function (data) {
                            that.tempPriceCategoryList = data;
                        });

                appointmentService.loadAppointment()
                        .success(function (data) {
                            that.appointmentList = data;
                        });

                appointmentService.loadAppointmentItem()
                        .success(function (data) {
                            that.AppointmentItemList = data;
                        });

                appointmentService.loadPendingAppointmentByBranch()
                        .success(function (data) {
                            that.pendingAppointmentList = data;
                        });

                appointmentService.loadApprovedAppointment()
                        .success(function (data) {
                            that.approvedAppointmentList = data;
                        });

                appointmentService.loadVehicle()
                        .success(function (data) {
                            that.vehicleList = data;
                        });

                appointmentService.loadClient()
                        .success(function (data) {
                            that.clientList = data;
                        });

                appointmentService.loadVehicleType()
                        .success(function (data) {
                            that.vehicleTypeList = data;
                        });


            },

            saveAppointment: function () {
                var defer = $q.defer();
                var that = this;
                appointmentService.saveAppointment(JSON.stringify(this.appointmentData))
                        .success(function (data) {
                            that.appointmentList.unshift(data);
                            that.appointmentData = {};
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },

            editAppointment: function (items, $index) {
                this.appointmentData = items;
                this.appointmentList.splice($index, 1);
            },

            deleteAppointment: function (items, $index) {
                var defer = $q.defer();
                var that = this;
                appointmentService.deleteAppointment(items.indexNo)
                        .success(function (data) {
                            that.appointmentList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },

            itemLabel: function (indexNo) {
                var job;
                angular.forEach(this.itemList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        job = value;
                        return;
                    }
                });
                return job;
            },

            branchLable: function (indexNo) {
                var data;
                angular.forEach(this.branchList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        data = value.indexNo + " - " + value.name;
                        return;
                    }
                });
                return data;
            },

            categoryDetailLabel: function (index) {
                var that = this;
                appointmentService.loadPriceCategoryDetails(index)
                        .success(function (data) {
                            that.priceCategoryList = data;
                        });
            },

            itemNameLabel: function (index) {
                var data;
                var that = this;
                angular.forEach(that.tempPriceCategoryList, function (value) {
                    if (value.indexNo === index) {
                        data = value.name;
                    }
                });
                return data;
            },

            vehicleLabel: function (model) {
                var that = this;
                that.appointmentData.vehicle = model.indexNo;
                angular.forEach(that.vehicleTypeList, function (value) {
                    if (value.indexNo === model.vehicleType) {
                        that.appointmentData.vehicleModel = value.model;
                    }
                });

                angular.forEach(that.clientList, function (value) {
                    if (value.indexNo === model.client) {
                        that.appointmentData.contactNo = value.mobile;
                        that.appointmentData.clientName = value.name;

                    }
                });
            },


           


        };
        return itemModel;
    };
    angular.module("appModule")
            .factory("appointmentModel", factory);
}());


