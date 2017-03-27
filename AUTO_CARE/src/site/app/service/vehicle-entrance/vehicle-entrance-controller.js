(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, Notification, $filter, vehicleEntranceModel, $timeout) {
                $scope.model = new vehicleEntranceModel();

                $scope.ui = {};
                $scope.ui.mode;
                $scope.ui.searchUi;
                
                
                $scope.ui.backButton = function (buttonIndex) {
                    if (buttonIndex === 'secondButton') {
                        $scope.model.vehicleData.indexNo = null;
                        $scope.ui.clearModel();
                        $scope.ui.searchUi = 'ur1';
                        $scope.vehicleNo = ""; 
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.model.vehicleData.indexNo = null;
                        $scope.ui.clearModel();
                        $scope.ui.searchUi = 'ur2';
                        $scope.vehicleNo = ""; 
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.model.vehicleData.indexNo = null;
                        $scope.ui.clearModel();
                        $scope.ui.searchUi = 'ur4';
                        $scope.vehicleNo = ""; 
                    }
                };

                $scope.$watch('vehicleNo', function (val) {
                    $scope.vehicleNo = $filter('uppercase')(val);
                }, true);

                $scope.ui.onSelect = function () {
                    var vehicleStatus = $scope.model.vehicle($scope.vehicleNo);
                    if (angular.isUndefined(vehicleStatus)) {
                        $scope.ui.searchUi = 'ur3';
                        $scope.model.vehicleData.vehicleNo = $scope.vehicleNo;
                    } else {
                        $scope.ui.searchUi = 'ur2';
                        $scope.model.vehicleData = vehicleStatus;
                        $scope.model.vehicleSerachByIndex($scope.model.vehicleData.indexNo);
                    }
                };

                $scope.validateVehicleData = function () {
                    if (!$scope.model.vehicleData.vehicleNo) {
                        Notification.error("Please Input Vehicle No");
                        return false;
                    } else if (!$scope.model.vehicleData.vehicleType) {
                        Notification.error("Please Input Vehicle Type");
                        return false;
                    } else if (!$scope.model.vehicleData.chasisNo) {
                        Notification.error("Please Input Chassis No");
                        return false;
                    } else if (!$scope.model.vehicleData.priceCategory) {
                        Notification.error("Please Input Price Category");
                        return false;
                    } else if ($scope.model.vehicleData.vehicleNo
                            && $scope.model.vehicleData.vehicleType
                            && $scope.model.vehicleData.chasisNo
                            && $scope.model.vehicleData.priceCategory) {
                        return true;
                    }
                };

                $scope.ui.saveJobCard = function () {
                    //ex client
                    if ($scope.model.clientData.indexNo) {
                        if ($scope.model.clientData.name) {
                            $scope.model.updateClientFromVehicle()
                                    .then(function () {
                                        Notification.success("Client Assign to vehicle Successfully");
                                        $scope.model.saveJobCard()
                                                .then(function () {
                                                    Notification.success("Job-Card Save Successs");
                                                    $scope.ui.searchUi = 'ur1';
                                                    $scope.ui.clearModel();
                                                    $scope.vehicleNo = "";
                                                }, function () {
                                                    Notification.error("Job-Card Save Fail");
                                                });
                                    }, function () {
                                        Notification.error("Client Assign to vehicle Fail");
                                    });
                        }
                    } else {
                        //new client
                        if ($scope.model.clientData.name) {
                            $scope.model.newClient()
                                    .then(function () {
                                        Notification.success("New Client Added Successfully");
                                        if ($scope.validateVehicleData()) {
                                            $scope.model.updateClientFromVehicle()
                                                    .then(function () {
                                                        Notification.success("Client Assign to vehicle Successfully");
                                                        $scope.model.saveJobCard()
                                                                .then(function () {
                                                                    Notification.success("Job-Card Save Successs");
                                                                    $scope.ui.searchUi = 'ur1'; 
                                                                    $scope.ui.clearModel();
                                                                    $scope.vehicleNo = "";
                                                                }, function () {
                                                                    Notification.error("Job-Card Save Fail");
                                                                });
                                                    }, function () {
                                                        Notification.error("Client Assign to vehicle Fail");
                                                    });
                                        }
                                    }, function () {
                                        Notification.error("New Client Added Fail");
                                    });
                        } else {
                            Notification.error("Please Input Name");
                        }
                    }
                };

//                $scope.ui.saveJob = function () {
//                    $scope.model.saveJobCard()
//                            .then(function () {
//                                Notification.success("Job-Card Save Successs");
//                            }, function () {
//                                Notification.error("Job-Card Save Fail");
//                            });
//                };

                $scope.ui.getSelectData = function (model) {
                    $scope.model.clientData = model;
                };

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.ui.clear();
                };

                $scope.ui.clearModel = function () {
                    $scope.model.clearModel();
                };

                $scope.ui.clear = function () {
                    $scope.model.newVehicleData = {};
                    $scope.model.clear();
                };

                $scope.ui.init = function () {
                    $scope.ui.searchUi = 'ur1';
                };

                $scope.ui.init();
            });
}());
//
//(function () {
//    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
//    angular.module("vehicleEntranceModule")
//            .controller("vehicleEntranceController", function ($scope, Notification, vehicleEntranceModel, $timeout) {
//                $scope.model = new vehicleEntranceModel();
//                $scope.ui = {};
//
//                $scope.ui.changeUi = function () {
//                    $scope.ui.getSelectVehicle();
//                    if ($scope.model.vehicleData === null) {
//                        console.log($scope.model.vehicleData.indexNo);
//                        console.log("if");
//                        $scope.ui.searchUi = 'ur2';
//                        $scope.model.vehicleSerachByIndex($scope.model.vehicleData);
//                    } else {
//                        console.log($scope.model.vehicleData.indexNo);
//                        console.log("else");
//                        $scope.ui.searchUi = 'ur3';
//                    }
//                };
//
//                $scope.ui.getSelectVehicle = function ($model) {
//                    $scope.model.vehicleData = $model;
//                };
//
//                $scope.validateVehicleData = function () {
//                    if (!$scope.model.vehicleData.vehicleNo) {
//                        Notification.error("CPlease Input Vehicle No");
//                        return false;
//                    } else if (!$scope.model.vehicleData.vehicleType) {
//                        Notification.error("CPlease Input Vehicle Type");
//                        return false;
//                    } else if (!$scope.model.vehicleData.chasisNo) {
//                        Notification.error("CPlease Input Chassis No");
//                        return false;
//                    } else if (!$scope.model.vehicleData.priceCategory) {
//                        Notification.error("CPlease Input Price Category");
//                        return false;
//                    } else if ($scope.model.vehicleData.vehicleNo
//                            && $scope.model.vehicleData.vehicleType
//                            && $scope.model.vehicleData.chasisNo
//                            && $scope.model.vehicleData.priceCategory) {
//                        return true;
//                    }
//                };
//
//                $scope.ui.saveJobCard = function () {
//                    if ($scope.model.clientData.indexNo) {
//                        if ($scope.validateVehicleData()) {
//                            $scope.model.updateClientFromVehicle()
//                                    .then(function () {
//                                        Notification.success("Client Assign to vehicle Successfully");
//                                        $scope.model.saveJobCard()
//                                                .then(function () {
//                                                    Notification.success("Job-Card Save Successs");
//                                                    $scope.model.clear();
//                                                    $scope.ui.init();
//
//
//                                                }, function () {
//                                                    Notification.error("Job-Card Save Fail");
//                                                });
//                                    }, function () {
//                                        Notification.error("Client Assign to vehicle Fail");
//                                    });
//                        }
//                    } else {
//                        if ($scope.model.clientData.name) {
//                            $scope.model.newClient()
//                                    .then(function () {
//                                        Notification.success("New Client Added Successfully");
//                                        if ($scope.validateVehicleData()) {
//                                            $scope.model.updateClientFromVehicle()
//                                                    .then(function () {
//                                                        Notification.success("Client Assign to vehicle Successfully");
//                                                        $scope.model.saveJobCard()
//                                                                .then(function () {
//                                                                    Notification.success("Job-Card Save Successs");
//                                                                    $scope.model.clear();
//                                                                    $scope.model.newVehicleData = {};
//                                                                    $scope.ui.init();
//                                                                    $scope.model.getVehicleNo = {};
//                                                                    $scope.ui.allJobCardDataclear();
//
//                                                                }, function () {
//                                                                    Notification.error("Job-Card Save Fail");
//                                                                });
//                                                    }, function () {
//                                                        Notification.error("Client Assign to vehicle Fail");
//                                                    });
//                                        }
//                                    }, function () {
//                                        Notification.error("New Client Added Fail");
//                                    });
//                        } else {
//                            Notification.error("Please Input Name");
//                        }
//                    }
//                };
//
//                $scope.ui.allJobCardDataclear = function () {
//                    $scope.model.clientData = {};
//                    $scope.model.vehicleData = {};
//                    $scope.model.vehicleTypeData = {};
//                    $scope.model.priceCategoryData = {};
//                    $scope.model.jobcard = {};
//                };
//
//                $scope.ui.init = function () {
//                    $scope.ui.allJobCardDataclear();
//                    $scope.ui.searchUi = 'ur1';
//                };
//                $scope.ui.init();
//            });
//}());