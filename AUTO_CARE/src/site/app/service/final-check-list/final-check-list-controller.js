(function () {
//module
    angular.module("finalCheckListModule", ['ui.bootstrap']);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope, systemConfig, $filter, finalCheckListModel, ConfirmPane, Notification) {
                $scope.model = new finalCheckListModel();
                $scope.ui = {};

                $scope.selectedJobCardIndexNo = null;
                $scope.selectItemCheckDetailsPending = null;
                $scope.imagemodelX = [];

                $scope.ui.selectedJobCardRow = function (jobCardData) {
                    $scope.selectItemCheckDetailsPending = null;
                    $scope.selectedJobCardIndexNo = jobCardData.indexNo;
                    $scope.model.getJobItemHistory(jobCardData.indexNo);
                    $scope.model.getDefaultFinalCheckList(jobCardData.indexNo);
                    $scope.model.findJobCard(jobCardData.indexNo);
                    $scope.model.findByVehicleAssignmentDetails(jobCardData.indexNo);

                    $scope.imagemodelX = [];
                    $scope.model.loadVehicleImages(jobCardData.indexNo)
                            .then(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    $scope.imagemodelX[i] = systemConfig.apiUrl + "/api/care-point/transaction/job-card/download-image/" + data[i];
                                }
                            }, function () {

                            });
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

                    var formatInTime = $filter('date')(new Date(date01), 'yyyy-MM-dd HH:mm:ss');
                    var formatOutTime = $filter('date')(new Date(date02), 'yyyy-MM-dd HH:mm:ss');

                    if (!date02) {
                        formatOutTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    }


                    var timeStart = new Date(formatInTime).getTime();
                    console.log(timeStart);
                    console.log(timeStart);
                    console.log(formatInTime.getTime());
//                    var timeEnd = new Date(formatOutTime).getTime();
//                    
//                    var hourDiff = timeEnd - timeStart; //in ms
//                    var secDiff = hourDiff / 1000; //in s
//                    var minDiff = hourDiff / 60 / 1000; //in minutes
//                    var hDiff = hourDiff / 3600 / 1000; //in hours
//                    
//                    console.log(minDiff);
//                    console.log(hDiff);

                    var data = {};
//                    data.diffHrs = hDiff;
//                    data.diffMins = minDiff;
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
