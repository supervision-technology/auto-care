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

                $scope.ui.checkItemComplite = function (itemData) {
                    ConfirmPane.successConfirm("Do you sure want to issue item")
                            .confirm(function () {
                                $scope.model.checkItemComplite(itemData, $scope.selectedJobCardIndexNo);
                            });
                };

                $scope.ui.checkItemPending = function (itemData) {
                    ConfirmPane.dangerConfirm("Do you sure want cansel item issue")
                            .confirm(function () {
                                $scope.model.checkItemPending(itemData, $scope.selectedJobCardIndexNo);
                            });
                };
            });
}());

