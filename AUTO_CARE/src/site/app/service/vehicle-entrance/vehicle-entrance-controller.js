(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, $window, Notification, systemConfig, $filter, $location, vehicleEntranceModel, $timeout) {
                $scope.model = new vehicleEntranceModel();

                $scope.ui = {};
                $scope.imagemodel = [];

                $scope.ui.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.secondStep();
                    }
                };
                
                $scope.ui.showImg = function (){
                    if ($scope.imagemodel.length === 0) {
                        $scope.ui.showImg === 2;
                    }
                };

                $scope.ui.imageUpload = function () {
                    $scope.ui.changeUi = 'ui4';
                };

                $scope.ui.changeFunction = function (event) {
                    var files = event.target.files;

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imagemodel.push(e.target.result);
                        console.log($scope.imagemodel[0]);
                    });
                };

                $scope.ui.new = function () {
                    $scope.model.clientData = {};
                    $scope.ui.clientDisabled = false;
                };
                $scope.ui.edit = function () {
                    $scope.ui.clientDisabled = false;
                };

                $scope.ui.saveJobCard = function () {
                    $scope.model.saveJobCard()
                            .then(function () {
                                Notification.success("Save job-card success !!!");
                            }, function () {
                                Notification.error("Save job-card fail !!!");
                            });
                };

                $scope.ui.setParam = function (client) {
                    $scope.model.clientData = client;
                };

                $scope.validateClient = function () {
                    if (!$scope.model.clientData.mobile) {
                        Notification.error("please Input Mobile No");
                        return false;
                    } else if (!$scope.model.clientData.name) {
                        Notification.error("please Input Name");
                        return false;
                    } else if ($scope.model.clientData.mobile && $scope.model.clientData.name) {
                        return true;
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


                $scope.$watch('vehicleNo', function (val) {
                    $scope.vehicleNo = $filter('uppercase')(val);
                }, true);


                $scope.ui.clientAssingNext = function () {
                    var vehicleStatus = $scope.model.vehicle($scope.vehicleNo);
                    //vehicle nathnam
                    if (angular.isUndefined(vehicleStatus)) {
                        //vehicle 1th nathi rejisted nathi client kenek
                        var vehicleNo = $scope.vehicleNo;
                        if (angular.isUndefined($scope.model.clientData.indexNo)) {
                            if ($scope.validateClient()) {
                                $scope.model.newClient()
                                        .then(function (data) {
                                            Notification.success("New client added success !!!");
                                            $scope.model.vehicleData = {};
                                            $scope.model.vehicleData.vehicleNo = vehicleNo;
                                            $scope.ui.changeUi = 'ui3';
                                            $scope.ui.vehicleDisabled = false;
                                        }, function () {
                                            Notification.error("New client added fail !!!");
                                        });
                            }

                            //vehicle 1th nathuwa rejisted client kenek
                        } else {
                            $scope.model.vehicleData = {};
                            $scope.model.vehicleData.vehicleNo = vehicleNo;
                            $scope.ui.changeUi = 'ui3';

//                            $scope.ui.clientEdit();
                        }
                        //vehicle thiyenawanm
                    } else {
                        if (angular.isUndefined($scope.model.clientData.indexNo)) {
                            if ($scope.validateClient()) {
                                $scope.model.newClient()
                                        .then(function () {
                                            Notification.success("New client added success !!!");
                                            $scope.ui.changeUi = 'ui3';
                                        }, function () {
                                            Notification.error("New client added fail !!!");
                                        });
                            }
                        } else {
                            $scope.ui.changeUi = 'ui3';
                            $scope.model.loadJobCardByClientIndexNo($scope.model.clientData.indexNo);
                        }
                    }

                };

                $scope.ui.jobCardNsext = function () {
                    if ($scope.validateVehicleData) {
                        $scope.model.updateClientFromVehicle()
                                .then(function () {
                                    Notification.success("Save vehicle and assing client Success !!!");
                                    $scope.model.saveJobCard()
                                            .then(function (data) {
                                                $scope.ui.goToItemSelection(data);

                                                Notification.success("Save job-card success !!!");
                                                $scope.model.clearModel();
                                                $scope.vehicleNo = "";
                                                $scope.ui.clientDisabled = true;
                                                $scope.ui.vehicleDisabled = true;

                                            }, function () {
                                                Notification.error("Save job-card fail !!!");
                                            });
                                }, function () {
                                    Notification.error("Save vehicle and assing client fail !!!");
                                });
                    }
                };

                $scope.ui.goToItemSelection = function (data) {
                    $window.location.href = systemConfig.apiUrl + "#/service/item-selection/" + data;
                };

                $scope.ui.secondStep = function () {
                    if ($scope.model.vehicle($scope.vehicleNo)) {
                        $scope.ui.changeUi = 'ui2';
                        $scope.ui.vehicleDisabled = true;

                        $scope.model.vehicleSerachByVehicleNo($scope.vehicleNo);
                    } else {
                        $scope.ui.changeUi = 'ui2';
                        $scope.ui.new();
                        $scope.ui.vehicleDisabled = false;
                    }
                };


                $scope.ui.init = function () {
                    $scope.ui.changeUi = 'ui1';
                    $scope.ui.clientDisabled = true;
                    $scope.ui.vehicleDisabled = true;

                };

                $scope.ui.init();
            });
}());
