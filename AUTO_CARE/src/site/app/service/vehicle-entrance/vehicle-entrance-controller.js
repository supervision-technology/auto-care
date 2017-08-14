(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, optionPane, ConfirmPane, systemConfig, $window, Notification, $filter, $location, vehicleEntranceModel, $timeout) {
                $scope.model = new vehicleEntranceModel();

                $scope.ui = {};
                $scope.imagemodel = [];
                $scope.imagemodelX = [];
                $scope.ui.imageShowMode1 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode2 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode3 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode4 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode5 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode6 = 'NotAvalable';//or IMAGE VIEW

                $scope.ui.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        if (angular.isUndefined($scope.vehicleNo)) {
                            Notification.error("Please input vehicle no");
                        } else {
                            $scope.ui.secondStep();
                        }
                    }
                };

                $scope.ui.showImg = function () {
                    if ($scope.imagemodel.length === 0) {
                        $scope.ui.showImg === 2;
                    }
                };

                $scope.ui.imageUpload = function () {
                    $scope.ui.changeUi = 'ui4';
                };

                $scope.ui.uploadForm = function () {

                    ConfirmPane.successConfirm("Do you want to Save Images ?")
                            .confirm(function () {
                                // save job card
                                if ($scope.validateVehicleData) {
                                    $scope.model.updateClientFromVehicle()
                                            .then(function () {
                                                Notification.success("Save vehicle and assing client Success !!!");
                                                if ($scope.imagemodel.length) {
                                                    console.log($scope.imagemodel.length);
                                                    console.log("$scope.imagemodel.length");
                                                    $scope.model.jobcard.vehicleImages = true;
                                                }
                                                $scope.model.saveJobCard()
                                                        .then(function (data) {
                                                            for (var i = 0; i < $scope.imagemodel.length; i++) {
                                                                var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/upload-image/" + data + "/" + i;
                                                                var formData = new FormData();
                                                                formData.append("file", $scope.imagemodel[i]);

                                                                var xhr = new XMLHttpRequest();
                                                                xhr.open("POST", url);
                                                                xhr.send(formData);
                                                            }
                                                            Notification.success("Save job-card success !!!");
                                                            $scope.model.clearModel();
                                                            $scope.vehicleNo = "";
                                                            $scope.ui.clientDisabled = true;
                                                            $scope.ui.vehicleDisabled = true;
                                                            $scope.ui.goToItemSelection(data);

                                                        }, function () {
                                                            Notification.error("Save job-card fail !!!");
                                                        });
                                            }, function () {
                                                Notification.error("Save vehicle and assing client fail !!!");
                                            });
                                }
                            })
                            .discard(function () {
                                ConfirmPane.dangerConfirm("Do you want to Delete All Images ?")
                                        .confirm(function () {
                                            $scope.imagemodelX = [];
                                        })
                                        .discard(function () {
                                            $scope.ui.changeUi = 'ui4';
                                        });
                            });
                };

                $scope.ui.changeFunction = function (event) {
                    if ($scope.ui.imageShowMode1 === 'NotAvalable') {
                        $scope.ui.imageShowMode1 = 'Avalable';
                    } else if ($scope.ui.imageShowMode2 === 'NotAvalable') {
                        $scope.ui.imageShowMode2 = 'Avalable';
                    } else if ($scope.ui.imageShowMode3 === 'NotAvalable') {
                        $scope.ui.imageShowMode3 = 'Avalable';
                    } else if ($scope.ui.imageShowMode4 === 'NotAvalable') {
                        $scope.ui.imageShowMode4 = 'Avalable';
                    } else if ($scope.ui.imageShowMode5 === 'NotAvalable') {
                        $scope.ui.imageShowMode5 = 'Avalable';
                    } else if ($scope.ui.imageShowMode6 === 'NotAvalable') {
                        $scope.ui.imageShowMode6 = 'Avalable';
                    }
                    var files = event.target.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.imagemodel.push(file);

                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imagemodelX.push(e.target.result);
                    });
                };

                $scope.ui.new = function () {
                    $scope.model.clientData = {};
                    $scope.ui.clientDisabled = false;
                };

                $scope.ui.edit = function () {
                    $scope.ui.clientDisabled = false;
                };

                $scope.ui.backToSelectCustomer = function () {
                    $scope.ui.changeUi = 'ui2';
                };

                $scope.ui.backToSelectVehicleDetail = function () {
                    $scope.ui.changeUi = 'ui3';
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
                    client.mobile = parseInt(client.mobile);
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
                    } else if (!$scope.model.vehicleData.lastMilage) {
                        Notification.error("Please Input Last Milage");
                        return false;
                    } else if ($scope.model.vehicleData.vehicleNo
                            && $scope.model.vehicleData.vehicleType
                            && $scope.model.vehicleData.chasisNo
                            && $scope.model.vehicleData.priceCategory
                            && $scope.model.vehicleData.lastMilage) {
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
                                console.log($scope.model.clientData.resident);
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
                        }
                        //vehicle thiyenawanm
                    } else {
                        if (angular.isUndefined($scope.model.clientData.indexNo)) {
                            if ($scope.validateClient()) {
                                $scope.model.newClient()
                                        .then(function () {
                                            Notification.success("New client added success !!!");
                                            $scope.ui.changeUi = 'ui3';
                                            $scope.model.vehicleData.lastMilage = null;
                                        }, function () {
                                            Notification.error("New client added fail !!!");
                                            $scope.model.vehicleData.lastMilage = null;
                                        });
                            }
                        } else {
                            $scope.ui.changeUi = 'ui3';
                            $scope.model.vehicleData.lastMilage = null;
                            $scope.model.loadJobCardByClientIndexNo($scope.model.clientData.indexNo);
                            $scope.model.getLastJobCardVehicleAttenctions($scope.model.vehicleData.indexNo);
                        }
                    }
                };

                $scope.ui.jobCardNsext = function () {
                    if ($scope.validateVehicleData()) {
                        $scope.ui.changeUi = 'ui4';
                    }
                };

                $scope.ui.goToItemSelection = function (data) {
                    $window.location.href = systemConfig.apiUrl + "#/service/service-selection/" + data;
                };

                $scope.ui.secondStep = function () {
                    if (angular.isUndefined($scope.vehicleNo)) {
                        Notification.error("Please input vehicle no");
                    } else {
                        if ($scope.model.vehicle($scope.vehicleNo)) {
                            $scope.model.searchPendingJobCard($scope.vehicleNo)
                                    .then(function (data) {
                                        if (data.length === 0) {
                                            $scope.model.vehicleSerachByVehicleNo($scope.vehicleNo);
                                            $scope.ui.changeUi = 'ui2';
                                            $scope.ui.vehicleDisabled = true;
                                        } else {
                                            optionPane.dangerMessage("Pending JobCard Avalable")
                                                    .continue(function () {

                                                    });
                                        }
                                    }, function () {
                                        $scope.model.vehicleSerachByVehicleNo($scope.vehicleNo);
                                        $scope.ui.changeUi = 'ui2';
                                        $scope.ui.vehicleDisabled = true;
                                    });
                        } else {
                            $scope.ui.changeUi = 'ui2';
                            $scope.ui.new();
                            $scope.ui.vehicleDisabled = false;
                        }
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
