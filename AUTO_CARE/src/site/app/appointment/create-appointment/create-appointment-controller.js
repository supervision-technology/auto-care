(function () {
    angular.module("appointmentModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("appointmentModule")
            .controller("appointmentCreateController", function ($scope, $filter, $rootScope, appointmentModel, Notification, ConfirmPane) {
                $scope.model = new appointmentModel();

                $scope.ui = {};


                //bays list
                $scope.ui.times = [];
//                $scope.lube = [];
//                $scope.uw = [];
//                $scope.bw = [];
//                $scope.qd = [];


                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };


                $scope.ui.getNextTime = function (time) {
                    var arr = [];
                    var time2 = "00:15:00";
                    var value = $scope.model.formatTime($scope.model.timestrToSec(time + ":" + "00") + $scope.model.timestrToSec(time2));
                    arr = value.split(':');
                    var hour = arr[0];
                    var min = arr[1];
                    return  hour + ":" + min;
                };


                //save appointment
                $scope.ui.saveAppointment = function () {
                    if ($scope.ui.validation()) {
                        $scope.model.saveAppointment()
                                .then(function () {
                                    $scope.ui.mode = "IDEAL";
//                                    $scope.model.getBayVehicle($rootScope.branch, $rootScope.appointmentDate);
                                    $scope.ui.reset();
                                    $scope.model.ui.selectedIndex = {};
                                    $scope.ui.selectedDataIndex = {};
                                    $scope.model.appointmentData.priceFree = false;
                                    $scope.model.priceCategoryList = [];
                                    Notification.success("Appointment save Success");
                                }, function () {
                                    Notification.error("Appointment save Fail");
                                });
                    }
                };

                //edit appointment
                $scope.ui.editAppointment = function (items, $index) {
                    $scope.model.editAppointment(items, $index);
                };


                // select job item 
                $scope.ui.selectItem = function (item) {
                    $scope.itemType = item.type;
                    $scope.model.tempdata.appointmentItem = item.indexNo;
                    $scope.ui.selectedDataIndex = item.indexNo;
                    //set value save obejct
                    $scope.model.appointmentData.item = item.indexNo;
                    $scope.model.categoryDetailLabel(item.item);

                    // when have branch and date
                    if ($scope.model.appointmentData.branch && $scope.model.appointmentData.appointmentDate) {
                        $scope.model.ui.selectedBayLubeIndex = {};
                        $scope.model.ui.selectedBayUwIndex = {};
                        $scope.model.ui.selectedBayBwIndex = {};
                        $scope.model.ui.selectedBayQdIndex = {};
                        $scope.model.appointmentData.bayDetails = [];
                        $scope.model.setAutoAssing(item.type);
                    }
                };

                //select price category
                $scope.ui.selectPriceCategory = function (category) {
                    if ($scope.model.appointmentData.priceFree === false) {
                        //set value save obejct
                        $scope.model.appointmentData.priceCategory = category.priceCategory;
                        $scope.model.ui.selectedIndex = category.priceCategory;
                    } else {
                        Notification.error("can't select price");
                    }

                };

                $scope.ui.selectCheckFree = function (value) {
                    if (value === true) {
                        $scope.model.ui.selectedIndex = null;
                        $scope.model.appointmentData.priceCategory = null;
                    }
                };

                //bay select lube
                $scope.ui.selectBayLube = function (bay, index) {
                    if ($scope.ui.validation()) {
                        if (!bay.vehicle && $scope.itemType === 'full_service' && bay.time <= '17:00:00') {
                            $scope.model.appointmentData.bayDetails = [];
                            $scope.model.appointmentData.inTime = bay.time;
                            $scope.model.tempdata.inTime = bay.time;
                            $scope.model.ui.selectedBayLubeIndex = bay.time;
                            //set value save obejct
                            $scope.model.tempdata.appointmentBay = bay.indexNo;
                            $scope.model.getBay(bay);
                            //manul assing bay
                            $scope.model.setManualAssing(bay, $scope.itemType);
                        } else {
                            Notification.error("time is not available");
                        }
                    }

                };

                //bay select under wash
                $scope.ui.selectBayUw = function (bay, index) {
                    if ($scope.ui.validation()) {
                        if (!bay.vehicle && bay.time > '08:00:00' && bay.time < '18:00:00' && $scope.itemType === 'full_detailing') {
                            $scope.model.appointmentData.bayDetails = [];
                            $scope.model.appointmentData.inTime = bay.time;
                            $scope.model.tempdata.inTime = bay.time;
                            $scope.model.ui.selectedBayUwIndex = bay.time;
                            //set value save obejct
                            $scope.model.tempdata.appointmentBay = bay.indexNo;
                            $scope.model.getBay(bay);
                            //manul assing bay
                            $scope.model.setManualAssing(bay, $scope.itemType);
                        } else {
                            Notification.error("time is not available");
                        }
                    }
                };

                //bay select body wash
                $scope.ui.selectBayBw = function (bay, index) {
                    console.log(bay.time)
                    if ($scope.ui.validation()) {
                        if (!bay.vehicle && bay.time < '18:15:00') {
                            if ($scope.itemType === 'wash_vacum'
                                    || $scope.itemType === 'quick_detailing' || $scope.itemType === 'express_detailing'
                                    || $scope.itemType === 'interior' || $scope.itemType === 'exterior') {
                                $scope.model.appointmentData.bayDetails = [];
                                $scope.model.appointmentData.inTime = bay.time;
                                $scope.model.tempdata.inTime = bay.time;
                                var time2 = "00:15:00";
                                var time = $scope.model.formatTime($scope.model.timestrToSec(bay.time) + $scope.model.timestrToSec(time2));
                                $scope.model.tempdata.outTime = time;
                                $scope.model.ui.selectedBayBwIndex = bay.time;
                                //set value save obejct
                                $scope.model.tempdata.appointmentBay = bay.indexNo;
                                $scope.model.getBay(bay);

                                //manul assing bay
                                $scope.model.setManualAssing(bay, $scope.itemType);
                            } else {
                                Notification.error("time is not available");
                            }
                        } else {
                            Notification.error("time is not available");
                        }
                    }

//                    if (!bay.vehicle) {
////                        var minutes = $scope.ui.parseTime(bay.time) - $scope.ui.parseTime($scope.uwTime);
////                        if (minutes >= 30) {
////                        $scope.bwTime = bay.time;
//                        $scope.model.appointmentData.bayDetails = [];
////                        $scope.model.ui.selectedBayBwIndex = bay.time;
//                        //set value save obejct
//                        $scope.model.tempdata.appointmentBay = bay.indexNo;
//                        $scope.model.getBay(bay);
//                        //manual assing bay
////                        $scope.model.setManualAssing(bay, $scope.itemType);
////                        } else {
////                            Notification.error("can't assing");
////                        }
//                    } else {
//                        Notification.error("time is not available");
//                    }

                };

                $scope.ui.selectBayQd = function (bay, index) {
                    if (index) {
                        Notification.error("not available");
                    } else {
                        if (bay.vehicle) {
                            $scope.model.ui.selectedBayQdIndex = bay.time;
                            //set value save obejct
                            $scope.model.tempdata.appointmentBay = bay.indexNo;
                            $scope.model.getBay(bay);
                        } else {
                            Notification.error("not available");
                        }
                    }
                };

                $scope.ui.selectBranch = function ($item, $model, $label) {
                    $scope.model.appointmentData.appointmentDate = null;
                    $rootScope.branch = $model;
                };

                $scope.ui.selectDate = function (date) {
                    if ($rootScope.branch) {
                        $rootScope.appointmentDate = date;
                        $scope.ui.getBayDetails($rootScope.branch, date);
                    } else {
                        $scope.model.appointmentData.appointmentDate = null;
                        Notification.error("please select branch");
                    }
                };

                $scope.ui.getBayDetails = function (branch, date) {
                    $scope.ui.reset();
                    // reset data
                    $scope.model.appointmentData.bayDetails = [];
                    angular.forEach($scope.model.lube, function (value) {
                        if (value.vehicle) {
                            value.vehicle = null;
                        }
                    });
                    angular.forEach($scope.model.uw, function (value) {
                        if (value.vehicle) {
                            value.vehicle = null;
                        }
                    });
                    angular.forEach($scope.model.bw, function (value) {
                        if (value.vehicle) {
                            value.vehicle = null;
                        }
                    });
                    angular.forEach($scope.model.qd, function (value) {
                        if (value.vehicle) {
                            value.vehicle = null;
                        }
                    });
                    //get vehicles to bay
                    $scope.model.getBayVehicle(branch, date, $scope.itemType);
                };

                $scope.ui.validateMobile = function (number) {
                    var numbers = /^[0-9]+$/;
                    if (!numbers.test(number) || parseInt(number[0]) === 0 || parseInt(number[0]) === 9) {
                        $scope.model.appointmentData.contactNo = null;
                    }
                };

                $scope.ui.validation = function () {
                    if ($scope.model.appointmentData.inTime) {
                        if ($scope.model.tempdata.appointmentItem) {
                            if ($scope.model.appointmentData.vehicleNo) {
                                if ($scope.model.appointmentData.branch) {
                                    if ($scope.model.appointmentData.appointmentDate) {
                                        return true;
                                    } else {
                                        Notification.error("please select date");
                                    }
                                } else {
                                    Notification.error("please select branch");
                                }
                            } else {
                                Notification.error("please select vehicle");
                            }
                        } else {
                            Notification.error("please select a job");
                        }
                    } else {
                        Notification.error("time is not available");
                    }
                };

                $scope.ui.reset = function () {
                    $scope.model.appointmentData.inTime = null;
                    $scope.model.tempdata.inTime = null;
                    $scope.model.tempdata.outTime = null;
                    $scope.model.ui.selectedBayLubeIndex = {};
                    $scope.model.ui.selectedBayUwIndex = {};
                    $scope.model.ui.selectedBayBwIndex = {};
                    $scope.model.ui.selectedBayQdIndex = {};
                };


                $scope.ui.filterValue = function (obj) {
                    return $filter('date')(obj.appointmentDate, 'MM/dd/yyyy') === $filter('date')($rootScope.appointmentDate, 'MM/dd/yyyy');
                };

                $scope.ui.parseTime = function (s) {
                    var c = s.split(':');
                    return parseInt(c[0]) * 60 + parseInt(c[1]);
                };

                function pad(val, max) {
                    var str = val.toString();
                    return str.length < max ? pad("0" + str, max) : str;
                }

                $scope.ui.bayTime = function () {
                    var now = new Date();
                    var check = false;

                    // add time to lube
                    for (var i = 0; i < 21; i++) {
                        var hr = {};
                        var bay = {
                            indexNo: 1,
                            time: null,
                            name: 'LUBE',
                            vehicle: null
                        };

                        // add hour 4th iteration
                        now.setHours(8 + parseInt(i / 2));

                        //start at 8.00 am
                        if (check === false) {
                            now.setMinutes((i % 2));
                            hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                            check = true;
                        }

                        // add 30 minutes 
                        now.setMinutes((i % 2) * 30);
                        hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                        hr.val = hr.txt;
                        bay.time = hr.val + ":" + "00";
                        $scope.model.lube.push(bay);
                    }



                    // add time to UW
                    for (var i = 0; i < 21; i++) {
                        var hr = {};
                        var bay = {
                            indexNo: 2,
                            time: null,
                            name: 'UW',
                            vehicle: null
                        };

                        // add hour 4th iteration
                        now.setHours(8 + parseInt(i / 2));

                        //start at 8.00 am
                        if (check === false) {
                            now.setMinutes((i % 2));
                            hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                            check = true;
                        }

                        // add 30 minutes 
                        now.setMinutes((i % 2) * 30);
                        hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                        hr.val = hr.txt;
                        bay.time = hr.val + ":" + "00";
                        $scope.model.uw.push(bay);
                    }

                    // add time to BW
                    for (var i = 0; i < 42; i++) {
                        var hr = {};
                        var bay = {
                            indexNo: 3,
                            time: null,
                            name: 'BW',
                            vehicle: null
                        };

                        // add hour 4th iteration
                        now.setHours(8 + parseInt(i / 4));

                        //start at 8.00 am
                        if (check === false) {
                            now.setMinutes((i % 2));
                            hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                            check = true;
                        }

                        // add 30 minutes 
                        now.setMinutes((i % 4) * 15);
                        hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                        hr.val = hr.txt;
                        bay.time = hr.val + ":" + "00";
                        $scope.model.bw.push(bay);
                    }

                    // add time to QD
                    for (var i = 0; i < 42; i++) {
                        var hr = {};
                        var bay = {
                            indexNo: 4,
                            time: null,
                            name: 'QD',
                            vehicle: null
                        };

                        // add hour 4th iteration
                        now.setHours(8 + parseInt(i / 4));

                        //start at 8.00 am
                        if (check === false) {
                            now.setMinutes((i % 2));
                            hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                            check = true;
                        }

                        // add 15 minutes 
                        now.setMinutes((i % 4) * 15);
                        hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                        hr.val = hr.txt;
                        bay.time = hr.val + ":" + "00";
                        $scope.model.qd.push(bay);
                    }


                    // time set
                    for (var i = 0; i < 42; i++) {
                        var hr = {};

                        // add hour 4th iteration
                        now.setHours(8 + parseInt(i / 4));

                        //start at 8.00 am
                        if (check === false) {
                            now.setMinutes((i % 2));
                            hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                            check = true;
                        }

                        // add 30 minutes 
                        now.setMinutes((i % 4) * 15);
                        hr.txt = pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2);
                        hr.val = hr.txt;
                        $scope.ui.times.push(hr.val);
                    }


                };


                //init
                $scope.ui.init = function () {
                    $scope.ui.reset();
                    //bay list
                    $scope.model.lube = [];
                    $scope.model.uw = [];
                    $scope.model.bw = [];
                    $scope.model.qd = [];

                    $scope.ui.bayTime();
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";


                };
                $scope.ui.init();
            });
}());