(function () {
    var factory = function (appointmentFactory, appointmentService, $q, $rootScope, $filter, Notification) {

        function itemModel() {
            this.constructor();
        }

        //prototype functions
        itemModel.prototype = {
            //data model
            appointmentData: {},
            tempdata: {},
            temp: {},
            ui: {},
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
            //bay list
            lube: [],
            uw: [],
            bw: [],
            qd: [],

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

                console.log(this.appointmentData)
                appointmentService.saveAppointment(JSON.stringify(this.appointmentData))
                        .success(function (data) {
//                            that.appointmentList.unshift(data);
                            that.appointmentData = {};
                            that.tempdata = {};
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
                that.tempdata.vehicle = model;

                appointmentService.getPriceCategoryByVehicle(model.indexNo)
                        .success(function (data) {
                            console.log(data)
                            that.appointmentData.priceCategory = data;
                            that.ui.selectedIndex = data;
                        });

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

            getBay: function (bay) {
                var that = this;
                appointmentService.loadBay(this.tempdata.appointmentBay)
                        .success(function (data) {
                            $rootScope.bay = data;
                            that.setTempData(bay);
                        });
            },

            setTempData: function (bay) {
                this.temp.appointmentBay = $rootScope.bay;
                this.temp.vehicle = this.tempdata.vehicle;
                this.temp.appointmentItem = this.tempdata.appointmentItem;
                this.temp.inTime = bay.time;
                this.temp.branch = this.appointmentData.branch;
                this.temp.date = this.appointmentData.appointmentDate;

                this.appointmentData.bayDetails.push(this.temp);
                console.log(this.appointmentData.bayDetails)
                this.temp = {};
            },

            getBayVehicle: function (branch, date, type) {
                var that = this;
                appointmentService.loadBayDetails(branch, date)
                        .success(function (data) {
//                            that.bayDetailList = data;
                            angular.forEach(data, function (value) {
//                                var inTime = $filter('date')(new Date(value.inTime), 'HH:mm');

                                //add lube details
                                angular.forEach(that.lube, function (lube) {
                                    if (lube.time === value.inTime && value.appointmentBay.name === lube.name) {
                                        lube.vehicle = value.vehicle.vehicleNo;
                                    }
                                });

                                //add uw details
                                angular.forEach(that.uw, function (uw) {
                                    if (uw.time === value.inTime && value.appointmentBay.name === uw.name) {
                                        uw.vehicle = value.vehicle.vehicleNo;
                                    }
                                });

                                //add bw details
                                angular.forEach(that.bw, function (bw) {
                                    if (bw.time === value.inTime && value.appointmentBay.name === bw.name) {
                                        bw.vehicle = value.vehicle.vehicleNo;
                                    }
                                });

                                //add qd details
                                angular.forEach(that.qd, function (qd) {
                                    if (qd.time === value.inTime && value.appointmentBay.name === qd.name) {
                                        qd.vehicle = value.vehicle.vehicleNo;
                                    }
                                });

                            });
                            that.setAutoAssing(type);

                        });

            },

            //start time sum 
            timestrToSec: function (timestr) {
                var parts = timestr.split(":");
                return (parts[0] * 3600) +
                        (parts[1] * 60) +
                        (+parts[2]);
            },

            pad: function (num) {
                if (num < 10) {
                    return "0" + num;
                } else {
                    return "" + num;
                }
            },

            formatTime: function (seconds) {
                return [this.pad(Math.floor(seconds / 3600) % 60),
                    this.pad(Math.floor(seconds / 60) % 60),
                    this.pad(seconds % 60)
                ].join(":");
            },
            //end time sum


            //auto assing bay
            setAutoAssing: function (type) {
                var that = this;
                var data = null;
                var data2 = null;
                var data3 = null;
                var data4 = null;

                if (type === "full_service") {
                    angular.forEach(that.lube, function (value) {
                        if (!value.vehicle) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayLubeIndex = value.time;
                                //set value save obejct
                                $rootScope.lubeTime = value.time;
                                that.appointmentData.inTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.uw, function (value) {
                        if (!value.vehicle && value.time > $rootScope.lubeTime) {
                            if (data2 === null) {
                                data2 = value;
                                that.ui.selectedBayUwIndex = value.time;
                                //set value save obejct
                                $rootScope.underWashTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.bw, function (value) {
                        var time2 = "00:15:00";
                        var time = that.formatTime(that.timestrToSec($rootScope.underWashTime) + that.timestrToSec(time2));
                        if (!value.vehicle && value.time > time) {
                            if (data3 === null) {
                                data3 = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                $rootScope.bodyWashTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.qd, function (value) {
                        if (!value.vehicle && value.time > $rootScope.bodyWashTime) {
                            if (data4 === null) {
                                data4 = value;
                                that.ui.selectedBayQdIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

                if (type === "wash_vacum" || type === "quick_detailing" || type === "express_detailing") {
                    angular.forEach(that.bw, function (value) {
                        if (!value.vehicle) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                $rootScope.bodyWashTime = value.time;
                                that.appointmentData.inTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.qd, function (value) {
                        if (!value.vehicle && value.time > $rootScope.bodyWashTime) {
                            if (data4 === null) {
                                data4 = value;
                                that.ui.selectedBayQdIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

                if (type === "full_detailing") {
                    angular.forEach(that.uw, function (value) {
                        if (!value.vehicle && value.time > '08:00:00') {
                            if (data2 === null) {
                                data2 = value;
                                that.ui.selectedBayUwIndex = value.time;
                                //set value save obejct
                                $rootScope.underWashTime = value.time;
                                that.appointmentData.inTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.bw, function (value) {
                        var time2 = "00:15:00";
                        var time = that.formatTime(that.timestrToSec($rootScope.underWashTime) + that.timestrToSec(time2));
                        if (!value.vehicle && value.time > time) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

                if (type === "interior" || type === "exterior") {
                    angular.forEach(that.bw, function (value) {
                        if (!value.vehicle) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                that.appointmentData.inTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

            },

            //manual assing bay
            setManualAssing: function (bay, type) {
                var that = this;
                var data = null;
                var data2 = null;
                var data3 = null;
                if (type === "full_service") {
                    angular.forEach(that.uw, function (value) {
                        if (!value.vehicle && value.time > bay.time) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayUwIndex = value.time;
                                //set value save obejct
                                $rootScope.underWashTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.bw, function (value) {
                        var time2 = "00:15:00";
                        var time = that.formatTime(that.timestrToSec($rootScope.underWashTime) + that.timestrToSec(time2));
                        if (!value.vehicle && value.time > time) {
                            if (data2 === null) {
                                data2 = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                $rootScope.bodyWashTime = value.time;
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });

                    angular.forEach(that.qd, function (value) {
                        if (!value.vehicle && value.time > $rootScope.bodyWashTime) {
                            if (data3 === null) {
                                data3 = value;
                                that.ui.selectedBayQdIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

                if (type === "wash_vacum" || type === "quick_detailing" || type === "express_detailing") {
                    angular.forEach(that.qd, function (value) {
                        if (!value.vehicle && value.time > bay.time) {
                            if (data2 === null) {
                                data2 = value;
                                that.ui.selectedBayQdIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }
                if (type === "full_detailing") {
                    angular.forEach(that.bw, function (value) {
                        var time2 = "00:15:00";
                        var time = that.formatTime(that.timestrToSec(bay.time) + that.timestrToSec(time2));
                        if (!value.vehicle && value.time > time) {
                            if (data === null) {
                                data = value;
                                that.ui.selectedBayBwIndex = value.time;
                                //set value save obejct
                                that.tempdata.appointmentBay = value.indexNo;
                                that.getBay(value);
                            }
                        }
                    });
                }

            }

        };
        return itemModel;
    };
    angular.module("appModule")
            .factory("appointmentModel", factory);
}());


