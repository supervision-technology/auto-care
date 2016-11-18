(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("vehicleEntranceModule")
            .factory("vehicleEntranceFactory", function ($http, systemConfig) {
                var factory = {};
                factory.loadVehicle = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.getHistoryJob = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/sub-item-check-list/incert-sub-item-check-list/" + summary;
                    $http.post(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };
               
                return factory;
            });
    //controller
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, vehicleEntranceFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.vehicle = {
                    "client": null,
                    "priceCategory": null
                };

                $scope.ui.getVehicleSelections = function (model) {
                    $scope.model.vehicle.client = model.client;
                    $scope.model.vehicle.priceCategory = model.priceCategory;
                };

//                $scope.vehicle = [
//                    {number: "VH 3125", name: "Kavish Manjitha", contact: "0756904935", runningKm: 20000, type: "BB"},
//                    {number: "RI 7894", name: "Kasun Chamara", contact: "0756904935", runningKm: 30000, type: "CC"},
//                    {number: "UI 7456", name: "Channa Jayamuni", contact: "0756904935", runningKm: 140000, type: "CV"},
//                    {number: "OP 5675", name: "Nidura Prageeth", contact: "0756904935", runningKm: 4000, type: "BB"}
//                ];
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
//                $scope.getVehicles = function (hint) {
//                    return $scope.vehicle;
//                };
//

//
//                $scope.checkVehicle = true;
//                $scope.newVehicle = function () {
//                    if ($scope.checkVehicle) {
//                        $scope.checkVehicle = false;
//                    } else {
//                        $scope.checkVehicle = true;
//                    }
//                };
//
//                $scope.history = [
//                    {
//                        invoiceNumber: "0005",
//                        amount: 25000.00,
//                        date: "2016-02-05",
//                        discription: {
//                            items: [
//                                {
//                                    name: "Pac 01",
//                                    unitprice: 15000.00,
//                                    qty: 1,
//                                    amount: 15000.00
//                                },
//                                {
//                                    name: "O.Filters",
//                                    unitprice: 7000.00,
//                                    qty: 1,
//                                    amount: 7000.00
//                                },
//                                {
//                                    name: "Carpet",
//                                    unitprice: 1700.00,
//                                    qty: 2,
//                                    amount: 3000.00
//                                }
//                            ]
//                        }
//                    },
//                    {
//                        invoiceNumber: "006",
//                        amount: 15000.00,
//                        date: "2016-02-05",
//                        discription: {
//                            items: [
//                                {
//                                    name: "Pac 01",
//                                    unitprice: 15000.00,
//                                    qty: 1,
//                                    amount: 15000.00
//                                }
//                            ]
//                        }
//                    },
//                    {
//                        invoiceNumber: "006",
//                        amount: 15000.00,
//                        date: "2016-02-05",
//                        discription: {
//                            items: [
//                                {
//                                    name: "Pac 01",
//                                    unitprice: 15000.00,
//                                    qty: 1,
//                                    amount: 15000.00
//                                }
//                            ]
//                        }
//                    },
//                    {
//                        invoiceNumber: "006",
//                        amount: 15000.00,
//                        date: "2016-02-05",
//                        discription: {
//                            items: [
//                                {
//                                    name: "Pac 01",
//                                    unitprice: 15000.00,
//                                    qty: 1,
//                                    amount: 15000.00
//                                }
//                            ]
//                        }
//                    }
//                ];
//                $scope.historySelectionDetail = function ($index) {
//                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
//                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
//                };
//
//                $scope.selections = [
//                    {
//                        name: "package 01",
//                        qty: 1,
//                        amount: "6000.00",
//                        discription: {
//                            items: [
//                                {
//                                    indexNo: "001",
//                                    name: "Body Wash & Vacuum"
//                                },
//                                {
//                                    indexNo: "002",
//                                    name: "Undercarriage Wash"
//                                }
//                            ]
//                        }
//                    }
//                ];
//                $scope.selectionsSelectionDetail = function ($index) {
//                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
//                    $scope.selectionsActivePosition = $scope.selectionsActivePosition == $index ? -1 : $index;
//                };

                $scope.ui.init = function () {
                    vehicleEntranceFactory.loadVehicle(function (data) {
                        $scope.model.vehicle = data;
                        console.log($scope.model.vehicle);
                    });
                };
                $scope.ui.init();
            });
}());