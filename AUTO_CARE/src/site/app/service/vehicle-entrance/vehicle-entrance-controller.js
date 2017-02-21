(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, VehicleEntranceModel, ConfirmPane, $timeout, $filter) {
                $scope.model = new VehicleEntranceModel();
                //ui models
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.model.data.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $scope.model.data.outTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $timeout(function () {
                        document.querySelectorAll("#search")[0].focus();
                    }, 10);
                };

                $scope.ui.search = function (model) {
                    if (model === "JOBCARD") {
                        $scope.ui.mode = "IDEAL";

                    } else if (model === "SEARCH") {
                        $scope.ui.mode = "SELECTION";

                    } else if (model === "NEW") {
                        $scope.ui.mode = "SELECTED";
                    }
                };

                $scope.ui.toggleSelections = function (model) {
                    if (model === "SELECT") {
                        $scope.ui.selectionType = "SELECT";
                    } else if (model === "EDIT") {
                        $scope.ui.selectionType = "EDIT";
                    }
                };

                $scope.ui.selectVehicel = function (model) {
                    if ($scope.ui.selectionType === "SELECT") {
                        $scope.ui.getVehicleSelections(model);
                        $scope.model.getJobHistory(model.vehicleNo);
                        $scope.indextab = 0;

                    } else if ($scope.ui.selectionType === "EDIT") {
                        $scope.model.vehicleData = model;
                        $scope.indextab = 2;
                    }
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
                        $scope.model.clearVehicledata();
                    } else {
                        $scope.clientFunction = true;
                        $scope.model.vehicleData.client.type = "REGISTER";
                        $scope.model.clearVehicledata();
                    }
                };

                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Hello World")
                            .confirm(function () {
                                $scope.model.saveJobCard();
                                $scope.model.clear();
                                $scope.ui.mode = "IDEAL";
                            })
                            .discard(function () {
                                $scope.ui.mode = "IDEAL";
                                console.log("REJECT");
                            });
                };

                $scope.ui.discard = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.saveVehicle = function () {
                    $scope.model.saveVehicle();
                    $scope.indextab = 0;
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
                    console.log(vehicle);
                    console.log(inMilage);
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.init();
            });
}());