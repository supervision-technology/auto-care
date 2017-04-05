(function () {
//module
    angular.module("itemSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("itemSelectionModule")
            .controller("itemSelectionController", function ($scope, $window, systemConfig, $routeParams, ItemSelectionModel, Notification, ConfirmPane) {

                $scope.model = new ItemSelectionModel();
                $scope.ui = {};

                //variables pass data to methods
                $scope.selectedJobCardIndexNo = null;
                $scope.selectVehicleType = null;
                $scope.selectVehiclePriceCategory = null;

                $scope.ui.selectedJobCardRow = function (jobCardIndexNo) {
                    $scope.model.findJobCard(jobCardIndexNo)
                            .then(function (data) {
                                $scope.model.jobCardData = data;

                                //job card seletion
                                $scope.selectedJobCardIndexNo = data.indexNo;

                                //get vehicle type and price category
                                $scope.selectVehicleType = $scope.model.vehicleData(data.vehicle).type;
                                $scope.selectVehiclePriceCategory = data.priceCategory;

//                                //get price category items
//                                $scope.model.getItemByPriceCategory($scope.selectVehiclePriceCategory);

                            });
                };

                //add package and serveice items
                $scope.ui.addPackageAndServiceItem = function (item, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            ConfirmPane.successConfirm("Do you sure want to add item")
                                    .confirm(function () {
                                        $scope.model.addPackageAndServiceItem(item, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                    });
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //delete item
                $scope.ui.deleteSelectDetails = function ($index) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
                            .confirm(function () {
                                //delete job card details
                                $scope.model.deleteSelectDetails($index);
                            });
                };

                //category select get items
                $scope.ui.getItemsByCategory = function (details) {
                    $scope.model.getItemsByCategory(details, $scope.model.jobCardData.priceCategory);
                };

                $scope.ui.backToVehicleEntrance = function () {
                    $window.location.href = systemConfig.apiUrl + "#/service/vehicle-entrance";
                };

                $scope.init = function () {
                    //get routing paramiets job card index
                    var jobCardIndexNo = parseInt($routeParams.jobCardIndexNo);
                    if (jobCardIndexNo) {
                        $scope.model.clear();
                        $scope.ui.selectedJobCardRow(jobCardIndexNo);
                    }
                };

                $scope.init();

            });
}());