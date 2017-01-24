(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, VehicleEntranceService, $uibModal, Notification, $q) {

                //data models 
                $scope.model = {};
                $scope.model.jobCardHistory = [];
                $scope.model.jobCardItemDetailHistory = [];
                $scope.model.jobCard =
                        {
                            "indexNo": 0,
                            "number": 0,
                            "branch": 0,
                            "date": null,
                            "transaction": 0,
                            "priceCategory": 0,
                            "inTime": null,
                            "outTime": null,
                            "inMileage": 0,
                            "nextMileage": 0,
                            "status": null,
                            "bay": 0,
                            "client": 0,
                            "vehicle": 0
                        };

                //ui models
                $scope.ui = {};

                $scope.model.vehicle = {
                    "client": null,
                    "priceCategory": null
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
                    var defer = $q.defer();
                    $scope.model.vehicle.client = model.client;
                    $scope.model.vehicle.priceCategory = model.priceCategory;
                    var vehicleNo = model.vehicleNo;

                    VehicleEntranceService.getJobHistory(vehicleNo)
                            .success(function (data) {
                                console.log(data);
                                $scope.model.jobCardHistory = [];
                                $scope.model.jobCardHistory = data;
                                defer.resolve();
                            })
                            .error(function (data) {
                                $scope.model.jobCardHistory = [];
                                defer.reject();
                            });
                };

                $scope.ui.getDefarancedate = function (date) {
                    var d1 = new Date(date);
                    var cur = new Date();
                    var defarance = (cur.getFullYear() * 12 + cur.getMonth()) - (d1.getFullYear() * 12 + d1.getMonth());
                    return defarance;
                };
//
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

                    //get select job card get items
                    var jobCardNo = jobCard.indexNo;
                    VehicleEntranceService.getJobItemHistory(jobCardNo)
                            .success(function (data) {
                                console.log(data);
                                $scope.model.jobCardItemDetailHistory = [];
                                $scope.model.jobCardItemDetailHistory = data;
                            })
                            .error(function (data) {
                                $scope.model.jobCardItemDetailHistory = [];
                            });
                };

                $scope.ui.init = function () {
                    //load vehicle
                    VehicleEntranceService.loadVehicle()
                            .success(function (data) {
                                $scope.model.vehicle = data;
                            });
                };
                $scope.ui.init();
            });
}());