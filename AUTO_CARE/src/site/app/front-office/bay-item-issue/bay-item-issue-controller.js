(function () {
//module
    angular.module("bayItemIssueModule", ['ui.bootstrap']);
    //controller
    angular.module("bayItemIssueModule")
            .controller("bayItemIssueController", function ($scope, bayItemIssueModel, ConfirmPane, Notification) {
                $scope.model = new bayItemIssueModel();
                $scope.ui = {};

                $scope.selectBayIndexNo = null;
                $scope.ui.selectBay = function (data) {
                    $scope.selectIemUnit = null;
                    $scope.selectBayIndexNo = data.indexNo;
                    $scope.model.getBayIssueHistory(data.indexNo);
                };

                //add stock item units
                $scope.ui.addItemUnit = function (itemUnit, quantity) {
                    if ($scope.selectBayIndexNo) {
                        if (itemUnit) {
                            var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                            if (angular.isUndefined(itemStatus)) {
                                ConfirmPane.successConfirm("Do you sure want to add item")
                                        .confirm(function () {
                                            $scope.model.addItemUnit(itemUnit, quantity, $scope.selectBayIndexNo);
                                        });
                            } else {
                                Notification.error("this item is allrday exsist");
                            }
                        } else {
                            Notification.error("select item");
                        }
                    } else {
                        Notification.error("select bay");
                    }
                };

                $scope.ui.deleteBayItemIssue = function ($index) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
                            .confirm(function () {
                                //delete job card details
                                $scope.model.deleteBayItemIssue($index);
                            });
                };
            });
}());