(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, Notification, vehicleEntranceModel, $timeout) {
                $scope.model = new vehicleEntranceModel();

                $scope.ui = {};
                $scope.ui.mode;
                $scope.ui.searchUi;
//                $scope.ui.nextButton = function (buttonIndex) {
//                    if (buttonIndex === 'fristButton') {
//                        $scope.ui.searchUi = 'ur2';
//
//
//                    } else if (buttonIndex === 'secondButton') {
//                        $scope.ui.searchUi = 'ur3';
//                    } else if (buttonIndex === 'thirdButton') {
//                        $scope.ui.searchUi = 'ur4';
//                    }
//                };

                $scope.ui.backButton = function (buttonIndex) {
                    if (buttonIndex === 'secondButton') {
                        $scope.ui.searchUi = 'ur1';
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.ui.searchUi = 'ur2';
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.ui.searchUi = 'ur4';
                    }
                };

                $scope.ui.getSelectVehicle = function ($model) {
                    $scope.model.vehicleData = $model;
                };

                $scope.ui.onSelect = function () {
                    if (null !== $scope.model.vehicleData.indexNo) {
                        $scope.ui.searchUi = 'ur2';
                        $scope.model.vehicleSerachByIndex($scope.model.vehicleData);
                    } else {
                        $scope.ui.searchUi = 'ur3';

                    }
                };

                $scope.ui.updateVehicle = function () {
                    if ($scope.model.clientData.indexNo) {
                        $scope.model.updateClientFromVehicle()
                                .then(function () {
                                    Notification.success("Client Assign to vehicle Successfully");
                                }, function () {

                                });
                    } else {
                        $scope.model.newClient()
                                .then(function () {
                                    Notification.success("New Client Added Successfully");
                                    $scope.model.updateClientFromVehicle()
                                            .then(function () {
                                                Notification.success("New Client Assign to vehicle Successfully");
                                            }, function () {

                                            });
                                }, function () {

                                });
                    }
                };
                $scope.ui.saveJob = function () {
                    $scope.model.saveJobCard()
                            .then(function () {
                                Notification.success("Job-Card Save Successs");
                            }, function () {

                            });

                };

                $scope.ui.getSelectData = function (model) {
                    $scope.model.clientData = model;
                };

                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $scope.model.clientData = {};

                };

                $scope.ui.init = function () {

                    $scope.ui.searchUi = 'ur1';
                };
                $scope.ui.init();
            });
}());