(function () {
//module
    angular.module("finalCheckListModule", ['ui.bootstrap']);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope, finalCheckListModel, ConfirmPane, Notification) {
                $scope.model = new finalCheckListModel();
                $scope.ui = {};

                $scope.selectedJobCardIndexNo = null;
                $scope.selectItemCheckDetailsPending = null;
                $scope.selectItemCheckDetailsComplite = null;

                $scope.ui.selectedJobCardRow = function (jobCardData) {
                    $scope.selectedJobCardIndexNo = jobCardData.indexNo;
                    $scope.model.getJobItemHistory(jobCardData.indexNo);
                };

                $scope.ui.getCheckedItemDetailsPending = function ($index, data) {
                    $scope.model.getItemCheckDetails(data);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectItemCheckDetailsPending = $scope.selectItemCheckDetailsPending === $index ? -1 : $index;
                };

                $scope.ui.checkedItemPending = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        ConfirmPane.successConfirm("Do you sure want to check item")
                                .confirm(function () {
                                    $scope.model.checkedItem(data, $scope.selectedJobCardIndexNo);
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.checkedItemComplite = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        ConfirmPane.dangerConfirm("Do you sure want to check item")
                                .confirm(function () {
                                    $scope.model.notCheckItem(data, $scope.selectedJobCardIndexNo);
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

            });
}());
