(function () {
//module
    angular.module("itemSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("itemSelectionModule")
            .controller("itemSelectionController", function ($scope, $routeParams, ItemSelectionModel, Notification, ConfirmPane) {

                $scope.model = new ItemSelectionModel();
                $scope.ui = {};

                //variables pass data to methods
                $scope.selectedJobCardIndexNo = null;
                $scope.selectVehicleType = null;
                $scope.selectVehiclePriceCategory = null;

                //get package items
                $scope.viewPackageDetails = function ($index, package) {
                    $scope.selectPackagePosition = null;
                    $scope.model.getPackageItems(package);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectPackageItemPosition = $scope.selectPackageItemPosition === $index ? -1 : $index;
                };

                //get item units by drop dowsn list
                $scope.ui.getItemUnits = function ($index, package) {
                    return $scope.model.getItemUnits(package, $scope.selectVehiclePriceCategory);
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

                //add stock items
                $scope.ui.addNormalItem = function (item, qty) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            ConfirmPane.successConfirm("Do you sure want to add item")
                                    .confirm(function () {
                                        $scope.model.addNormalItem(item, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                    });
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //add stock item units
                $scope.ui.addItemUnit = function (itemUnit, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (itemUnit) {
                            var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                            if (angular.isUndefined(itemStatus)) {
                                ConfirmPane.successConfirm("Do you sure want to add item")
                                        .confirm(function () {
                                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                        });
                            } else {
                                Notification.error("this item is allrday exsist");
                            }
                        } else {
                            Notification.error("select item");
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

                $scope.ui.getItemsByCategory = function (details) {
                    $scope.model.getItemsByCategory(details, $scope.model.jobCardData.priceCategory);
                };

                $scope.ui.getItemData = function () {
                    var jobCardIndexNo = parseInt($routeParams.jobCardIndexNo);
                    if (jobCardIndexNo) {
                        var jobCard = $scope.model.findJobCard(jobCardIndexNo);
                        //job card seletion
                        $scope.selectedJobCardIndexNo = jobCard.indexNo;

                        //get vehicle type and price category
                        $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
                        $scope.selectVehiclePriceCategory = jobCard.priceCategory;

                        //get price category items
                        $scope.model.getItemByPriceCategory($scope.selectVehiclePriceCategory);

                        //get job card history
                        $scope.model.getJobItemHistory(jobCard.indexNo);
                    }
                };

                $scope.init = function () {

                };

                $scope.init();

            });
}());