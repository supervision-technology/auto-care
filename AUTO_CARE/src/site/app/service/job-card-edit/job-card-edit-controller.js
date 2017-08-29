(function () {
    angular.module("jobCardEditModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("jobCardEditModule")
            .controller("jobCardEditController", function ($scope, jobCardEditModel, optionPane, ConfirmPane, Notification) {
                $scope.model = new jobCardEditModel();

                $scope.ui = {};
                $scope.selectedJobCardIndexNo = null;

                $scope.ui.selectedJobCardRow = function (jobCardData) {
                    //clear job card data and edit job card details
                    $scope.model.clear();

                    $scope.ui.mode = 'NEW';

                    //find select job card history
                    $scope.model.findJobCardDetail(jobCardData.indexNo);
                    $scope.selectedJobCardIndexNo = jobCardData.indexNo;

                    //view select job item history
                    $scope.model.getJobItemHistory(jobCardData.indexNo);
                };

                $scope.ui.getRepEmployeeData = function (indexNo) {
                    $scope.model.employeeData = $scope.model.employee(indexNo);
                };

                $scope.ui.changeJobCardDetails = function () {
                    if (!$scope.selectedJobCardIndexNo) {
                        optionPane.dangerMessage("SELECT JOB CARD");
                    } else if (!$scope.model.jobCardEditData.newPriceCategory) {
                        optionPane.dangerMessage("SELECT NEW PRICE CATEGORY");
                    } else if ($scope.model.jobCardEditData.oldPriceCategory === $scope.model.jobCardEditData.newPriceCategory) {
                        optionPane.dangerMessage("OLD PRICE CATEGORY AND NEW PRICE CATEGORY SAME!,PLEASE SELECT ANOTHER PRICE CATEGORY");
                    } else if (!$scope.model.jobCardEditData.reponcebleEmployee) {
                        optionPane.dangerMessage("SELECT RESPONSIBILITY EMPLOYEE");
                    } else {
                        ConfirmPane.successConfirm("JOB CARD AND VEHICLE UPDATE")
                                .confirm(function () {
                                    $scope.model.changeJobCardDetails()
                                            .then(function (data) {
                                                //clear job card data and edit job card details
                                                $scope.model.clear();
                                                optionPane.successMessage("JOB CARD AND VEHICLE UPDATE SUCCESS");
                                                $scope.init();
                                            });
                                });
                    }
                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };
                $scope.init();
            });
}());