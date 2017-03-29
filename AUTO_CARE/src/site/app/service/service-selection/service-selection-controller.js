(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, ServiceSelectionModel, Notification, ConfirmPane) {
                $scope.model = new ServiceSelectionModel();
                $scope.ui = {};

                //variables pass data to methods
                $scope.selectedJobCardIndexNo = null;
                $scope.selectVehicleType = null;
                $scope.selectVehiclePriceCategory = null;

                $scope.ui.selectedJobCardRow = function (jobCard) {
                    //job card seletion
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;

                    //get vehicle type and price category
                    $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
                    $scope.selectVehiclePriceCategory = jobCard.priceCategory;

                    //get job card history
                    $scope.model.getJobItemHistory(jobCard.indexNo);

                    //clear position
                    $scope.ui.viewPositionClear();
                };

                $scope.ui.viewPositionClear = function () {
                    $scope.selectPackagePosition = null;
 
                };

                //get package items
                $scope.viewPackageDetails = function ($index, package) {
                    $scope.selectPackagePosition = null;
                    $scope.model.getPackageItems(package);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectPackageItemPosition = $scope.selectPackageItemPosition === $index ? -1 : $index;
                };

                $scope.ui.getItemUnits = function ($index, package) {
                    return $scope.model.getItemUnits(package, $scope.selectVehiclePriceCategory);
                };

                $scope.ui.addPackageAndServiceItem = function (item, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addPackageAndServiceItem(item, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.addNormalItem = function (item, qty) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addNormalItem(item, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.addItemUnit = function (itemUnit, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.deleteSelectDetails = function ($index) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
                            .confirm(function () {
                                $scope.model.deleteSelectDetails($index);
                            });
                };

            });
}());