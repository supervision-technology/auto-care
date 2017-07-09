(function () {
//module
    angular.module("finalCheckListModule", ['ui.bootstrap']);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope, $filter, finalCheckListModel, ConfirmPane, Notification) {
                $scope.model = new finalCheckListModel();
                $scope.ui = {};

                $scope.selectedJobCardIndexNo = null;
                $scope.selectItemCheckDetailsPending = null;

                $scope.ui.selectedJobCardRow = function (jobCardData) {
                    $scope.selectItemCheckDetailsPending = null;
                    $scope.selectedJobCardIndexNo = jobCardData.indexNo;
                    $scope.model.getJobItemHistory(jobCardData.indexNo);
                    $scope.model.getDefaultFinalCheckList(jobCardData.indexNo);
                    $scope.model.findJobCard(jobCardData.indexNo);
                    $scope.model.findByVehicleAssignmentDetails(jobCardData.indexNo);
                };

                $scope.ui.getCheckedItemDetailsPending = function ($index, data) {
                    $scope.model.getItemCheckDetails(data);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectItemCheckDetailsPending = $scope.selectItemCheckDetailsPending === $index ? -1 : $index;
                };

                $scope.ui.formatDate = function (date) {
                    return $filter('date')(new Date(date), 'HH:mm:ss');
                };

                //vehicle assignment inTIme and outTime difarance
                $scope.ui.dateDifarance = function (date01, date02) {
                    if (!date02) {
                        date02 = new Date();
                    }

                    var diffMs = (new Date(date02) - new Date(date01));
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                    var data = {};
                    data.diffHrs = diffHrs;
                    data.diffMins = diffMins;
                    return data;
                };

                $scope.ui.checkedItemCheck = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        ConfirmPane.successConfirm("Do you sure want to check item")
                                .confirm(function () {
                                    $scope.model.checkedItemCheck(data, $scope.selectedJobCardIndexNo)
                                            .then(function () {
                                                $scope.model.findJobCard($scope.selectedJobCardIndexNo);
                                            });
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.checkedItemNotCheck = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        ConfirmPane.dangerConfirm("Do you sure want to check item")
                                .confirm(function () {
                                    $scope.model.checkedItemNotCheck(data, $scope.selectedJobCardIndexNo)
                                            .then(function () {
                                                $scope.model.findJobCard($scope.selectedJobCardIndexNo);
                                            });
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //default check list
                $scope.ui.setDefaultFinalCheckListCheck = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        $scope.model.setDefaultFinalCheckList(data)
                                .then(function () {
                                    $scope.model.findJobCard($scope.selectedJobCardIndexNo);
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.setDefaultFinalCheckListPending = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        $scope.model.setDefaultFinalCheckList(data)
                                .then(function () {
                                    $scope.model.findJobCard($scope.selectedJobCardIndexNo);
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };
            });
}());
