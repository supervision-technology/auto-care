(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, VehicleEntranceModel, ConfirmPane, $uibModal, $timeout, $filter) {
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

                $scope.ui.searchCustomer = function () {
                    $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        templateUrl: './app/service/vehicle-entrance/customer-search.html',
                        controller: 'customerSearchController',
                        size: 'lg'
                    }).closed.then(function () {
                        console.log("closed");
                    });
                };

                $scope.ui.getVehicleSelections = function (model) {
                    console.log(model);
                    $scope.model.vehicle.client = model.client;
                    $scope.model.vehicle.priceCategory = model.priceCategory;
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

                $scope.ui.confirm = function () {
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
//

                $scope.historySelectionDetail = function ($index, jobCard) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
                    $scope.model.getJobItemHistory(jobCard.indexNo);
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.clear();
                };

                $scope.ui.init();
            });
}());