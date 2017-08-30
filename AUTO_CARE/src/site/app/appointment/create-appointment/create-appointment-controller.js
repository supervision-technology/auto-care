(function () {
    angular.module("appointmentModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("appointmentModule")
            .controller("appointmentCreateController", function ($scope, $filter, $rootScope, appointmentModel, Notification, ConfirmPane) {
                $scope.model = new appointmentModel();

                $scope.ui = {};

                //bays list
//                $scope.lube = [];
//                $scope.uw = [];
//                $scope.bw = [];
//                $scope.qd = [];


                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };


                //save appointment
                $scope.ui.saveAppointment = function () {
                    $scope.model.saveAppointment()
                            .then(function () {
                                $scope.model.getBayVehicle($rootScope.branch, $rootScope.appointmentDate);
                                $scope.ui.selectedIndex = {};
                                $scope.model.ui.selectedBayLubeIndex = {};
                                $scope.model.ui.selectedBayUwIndex = {};
                                $scope.model.ui.selectedBayBwIndex = {};
                                $scope.model.ui.selectedBayQdIndex = {};
                                Notification.success("Appointment save Success");
                            }, function () {
                                Notification.error("Appointment save Fail");
                            });
                };

                //edit appointment
                $scope.ui.editAppointment = function (items, $index) {
                    $scope.model.editAppointment(items, $index);
                };

                //delete appointment
                $scope.ui.deleteAppointment = function (items, $index) {
                    ConfirmPane.dangerConfirm("Delete Appointment!")
                            .confirm(function () {
                                $scope.model.deleteAppointment(items, $index);
                            })
                            .discard(function () {
                                console.log('discard fail');
                            });

                };

                // select job item 
                $scope.ui.selectItem = function (item) {
                    console.log(item)
                    $scope.itemType = item.type;
                    $scope.model.tempdata.appointmentItem = item.indexNo;
                    $scope.ui.selectedDataIndex = item.indexNo;
                    //set value save obejct
                    $scope.model.appointmentData.item = item.indexNo;
                    $scope.model.categoryDetailLabel(item.item);

                    // when have branch and date
                    if ($rootScope.branch && $rootScope.appointmentDate) {
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
                    //set value save obejct
                    $scope.model.appointmentData.priceCategory = category.priceCategory;
                    $scope.ui.selectedIndex = category.indexNo;
                };

                //bay select lube
                $scope.ui.selectBayLube = function (bay, index) {
                    if (!bay.vehicle) {
                        $scope.model.appointmentData.bayDetails = [];
                        $scope.model.ui.selectedBayLubeIndex = bay.time;
                        //set value save obejct
                        $scope.model.tempdata.appointmentBay = bay.indexNo;
                        $scope.model.getBay(bay);
                        //manul assing bay
                        $scope.model.setManualAssing(bay, $scope.itemType);
                    } else {
                        Notification.error("time is not available");
                    }
                };

                //bay select under wash
                $scope.ui.selectBayUw = function (bay, index) {
                    if (!bay.vehicle && bay.time > '08:00:00') {
                        $scope.model.appointmentData.bayDetails = [];
                        $scope.model.ui.selectedBayUwIndex = bay.time;
                        //set value save obejct
                        $scope.model.tempdata.appointmentBay = bay.indexNo;
                        $scope.model.getBay(bay);
                        //manul assing bay
                        $scope.model.setManualAssing(bay, $scope.itemType);
                    } else {
                        Notification.error("time is not available");
                    }
                };

                //bay select body wash
                $scope.ui.selectBayBw = function (bay, index) {
                    if (!bay.vehicle) {
                        $scope.model.appointmentData.bayDetails = [];
                        $scope.model.ui.selectedBayBwIndex = bay.time;
                        //set value save obejct
                        $scope.model.tempdata.appointmentBay = bay.indexNo;
                        $scope.model.getBay(bay);

                        //manul assing bay
                        $scope.model.setManualAssing(bay, $scope.itemType);
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
                    if (!bay.vehicle) {
                        if ($scope.bwTime < bay.time) {
                            $scope.model.ui.selectedBayQdIndex = bay.time;
                            //set value save obejct
                            $scope.model.tempdata.appointmentBay = bay.indexNo;
                            $scope.model.getBay(bay);
                        } else {
                            Notification.error("can't assing");
                        }
                    } else {
                        Notification.error("time is not available");
                    }
                };

                $scope.ui.selectBranch = function (branch) {
                    $rootScope.branch = branch;
                };

                $scope.ui.selectDate = function (date) {
                    $rootScope.appointmentDate = date;
                    $scope.ui.getBayDetails($rootScope.branch, date);
                };

                $scope.ui.getBayDetails = function (branch, date) {
                    angular.forEach($scope.model.lube, function (){
                        
                    });
                    $scope.model.getBayVehicle(branch, date, $scope.itemType);
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
                    for (var i = 0; i < 41; i++) {
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
                    for (var i = 0; i < 41; i++) {
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


                };


                //init
                $scope.ui.init = function () {
                    $scope.ui.bayTime();

                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();
            });
}());