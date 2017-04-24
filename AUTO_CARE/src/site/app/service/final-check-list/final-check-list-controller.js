(function () {
//module
    angular.module("finalCheckListModule", []);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope, finalCheckListModel) {
                $scope.model = new finalCheckListModel();

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

                $scope.ui.checkItemComplite = function ($index, item) {
                    $scope.model.checkItemComplite($index, item);
                };
                
                $scope.ui.checkItemPending = function ($index, item) {
                    $scope.model.checkItemPending($index, item);
                };
            });
}());

