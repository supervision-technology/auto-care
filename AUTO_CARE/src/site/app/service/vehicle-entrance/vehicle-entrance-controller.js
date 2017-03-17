(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, VehicleEntranceModel, Notification, ConfirmPane, $timeout) {

                $scope.model = new VehicleEntranceModel();
                $scope.name = 'test';
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#search")[0].focus();
                    }, 10);
                };

                $scope.ui.toggleType = function (model) {
                    if (model === "JOB_CARD") {
                        $scope.ui.mode = "EDIT";

                    } else if (model === "ADVANCE_SEARCH") {
                        $scope.ui.mode = "SEARCH";

                    } else if (model === "NEW") {
                        $scope.ui.mode = "CLIENT";
                        $scope.ui.setClientType('NEW');
                        //$scope.model.clearVehicledata();
                        $scope.model.vehicleData.vehicleNo = $scope.model.vehicle.vehicleNo;
                    }
                };

                $scope.ui.selectVehicel = function (model) {
                    $scope.ui.getVehicleSelections(model);
                    $scope.model.getJobHistory(model.vehicleNo);
                    $scope.indextab = 0;
                };

                $scope.ui.getVehicleSelections = function (model) {
                    $scope.model.vehicle = model;
                    $scope.model.data.client = model.client.indexNo;
                    $scope.model.data.priceCategory = model.priceCategory.indexNo;
                    $scope.model.data.vehicle = model.indexNo;
                    $scope.model.getJobHistory(model.vehicleNo);
                };

                $scope.ui.setClientType = function (model) {
                    if (model === "NEW") {
                        $scope.clientFunction = false;
                        $scope.model.vehicleData.client.type = "NEW";
                        $scope.radioType = 'NEW';
                    } else {
                        $scope.clientFunction = true;
                        $scope.model.vehicleData.client.type = "REGISTER";
                        $scope.radioType = 'REGISTER';
                    }
                };

                $scope.ui.save = function () {
                    if (!$scope.model.vehicle.vehicleNo) {
                        Notification.error("please select vehicle");
                    } else if (!$scope.model.data.inMileage) {
                        Notification.error("please select in milage");
                    } else if ($scope.model.vehicle.vehicleNo
                            && $scope.model.data.inMileage) {
                        ConfirmPane.primaryConfirm("SAVE JOB CARD")
                                .confirm(function () {
                                    $scope.model.saveJobCard();
                                    $scope.model.clear();
                                    $scope.ui.mode = "IDEAL";
                                })
                                .discard(function () {
                                    $scope.ui.mode = "IDEAL";
                                    console.log("REJECT");
                                });
                    }
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.saveVehicle = function () {
                    if (!$scope.model.vehicleData.client.name) {
                        Notification.error("enter client name");

                    } else if (!$scope.model.vehicleData.client.mobile) {
                        Notification.error("enter client mobile");

                    } else if (!$scope.model.vehicleData.client.nic) {
                        Notification.error("enter client nic");

                    } else if (!$scope.model.vehicleData.vehicleNo) {
                        Notification.error("enter vehicle no");

                    } else if (!$scope.model.vehicleData.vehicleType.indexNo) {
                        Notification.error("enter vehicle type");

                    } else if (!$scope.model.vehicleData.priceCategory.indexNo) {
                        Notification.error("enter price category");

                    } else if ($scope.model.vehicleData.client.name
                            && $scope.model.vehicleData.client.mobile
                            && $scope.model.vehicleData.client.nic
                            && $scope.model.vehicleData.vehicleNo
                            && $scope.model.vehicleData.vehicleType.indexNo
                            && $scope.model.vehicleData.priceCategory.indexNo) {
                        var vehicleData = $scope.model.duplicateVehicleCheck($scope.model.vehicleData.vehicleNo);
                        if (angular.isUndefined(vehicleData)) {
                            $scope.ui.mode = "EDIT";
                            $scope.model.saveVehicle();
                            $scope.indextab = 0;
                        } else {
                            Notification.error("this vehicle allrady exsist!");
                        }
                    }
                };

                $scope.ui.edit = function () {
                    $scope.model.vehicleData = $scope.model.vehicle;
                    $scope.indextab = 2;
                };

//                $scope.oilUsage = 6000;
//                $scope.difarance = 0;
//                $scope.oilStatus = 0;
//                $scope.getNewKmRunningCount = function (newKmRunningCount) {
//                    if (newKmRunningCount <= $scope.vehicleDetail.runningKm) {
//                        Notification.error('Please Check And Valid Input');
//                    } else {
//                        $scope.newKmRunningCount = newKmRunningCount;
//                        $scope.difarance = newKmRunningCount - $scope.vehicleDetail.runningKm;
//                        $scope.oilStatus = $scope.oilUsage - $scope.difarance;
//                    }
//                };

                $scope.historySelectionDetail = function ($index, jobCard) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
                    $scope.model.getJobItemHistory(jobCard.indexNo);
                };


                $scope.ui.getRunningKmDetails = function () {
                    var inMilage = $scope.model.data.inMileage;
                    var vehicle = $scope.model.vehicle;
                    var lastMilage = $scope.model.vehicleHistoryDetail.lastMileage;
                    console.log(vehicle);
                    console.log(inMilage);
                    console.log(lastMilage);
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.init();
            });
}());