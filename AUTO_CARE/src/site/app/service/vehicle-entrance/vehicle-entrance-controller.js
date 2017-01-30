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
                    $scope.model.clear();
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.model.data.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $scope.model.data.outTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $timeout(function () {
                        document.querySelectorAll("#search")[0].focus();
                    }, 10);
                };

                $scope.ui.search = function (model) {
                    if (model === "NEW") {
                        $scope.ui.mode = "SELECTED";
                    } else if (model === "SEARCH") {
                        $scope.ui.mode = "SELECTION";
                    } else if (model === "JOBCARD") {
                        $scope.ui.mode = "IDEAL";
                    }
                };

                $scope.ui.selectVehicel = function (model) {
                    // $scope.model.vehicle = $scope.model.vehicelOb(model.vehicleNo);
                    $scope.ui.getVehicleSelections(model);
                    $scope.indextab = 0;
                };

                $scope.ui.getVehicleSelections = function (model) {
                    $scope.tempData = model;
                    $scope.model.vehicle = model;

                    //set transaction data
                    $scope.model.data.client = model.client.indexNo;
                    $scope.model.data.priceCategory = model.priceCategory.indexNo;
                    $scope.model.data.vehicle = model.indexNo;
                    $scope.model.getJobHistory(model.vehicleNo);
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
                    //update vehicle
//                    $scope.model.updateVehicle();
                };

//  ----------------------------------- search functions -----------------------------------

                $scope.ui.clientAndVehicleClier = function () {
                    console.log("new client save");
                    $scope.model.saveNewClient();
                };

                $scope.ui.clientAndVehicleClierSave = function () {
                    console.log("client select");
                    console.log($scope.model.clientData);
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.init();
            });
}());