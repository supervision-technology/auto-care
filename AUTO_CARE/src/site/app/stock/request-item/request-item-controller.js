(function () {
//module
    angular.module("requestItemModule", []);
    //controller
    angular.module("requestItemModule")
            .controller("requestItemController", function ($scope, requestItemModel, ConfirmPane) {
                $scope.model = new requestItemModel();

                $scope.ui = {};

                $scope.ui.selectedJobCardRow = function (jobCard) {

                    //job card seletion
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;

                    //get vehicle type and price category
                    $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
                    $scope.selectVehiclePriceCategory = jobCard.priceCategory;

                    //get job card history
                    $scope.model.getJobItemHistory(jobCard.indexNo);
                };

                $scope.selectBayIndexNo = null;
                $scope.ui.selectBay = function (data) {
                    $scope.selectIemUnit = null;
                    $scope.selectBayIndexNo = data.indexNo;
                    $scope.model.getBayIssueHistory(data.indexNo);
                    $scope.model.getBayIssueHistoryByDate(data.indexNo);
                };


                $scope.ui.checkItemCompliteJobCard = function (itemData) {
                    ConfirmPane.successConfirm("Do you sure want to issue item")
                            .confirm(function () {
                                $scope.model.checkItemCompliteJobCard(itemData, $scope.selectedJobCardIndexNo);
                            });
                };

                $scope.ui.checkItemPendingJobCard = function (itemData) {
                    ConfirmPane.dangerConfirm("Do you sure want cansel item issue")
                            .confirm(function () {
                                $scope.model.checkItemPendingJobCard(itemData, $scope.selectedJobCardIndexNo);
                            });
                };
                
                $scope.ui.checkItemCompliteBay = function (itemData) {
                    ConfirmPane.successConfirm("Do you sure want to issue item")
                            .confirm(function () {
                                $scope.model.checkItemCompliteBay(itemData);
                            });
                };
                
                $scope.ui.checkItemPendingBay = function (itemData) {
                    ConfirmPane.dangerConfirm("Do you sure want cansel item issue")
                            .confirm(function () {
                                $scope.model.checkItemPendingBay(itemData);
                            });
                };
            });
}());

