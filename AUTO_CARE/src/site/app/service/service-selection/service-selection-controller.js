(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, $routeParams, ServiceSelectionModel, ServiceSelectionService, Notification, ConfirmPane) {

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
                };

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

                $scope.init = function () {
                    var jobCardIndexNo = parseInt($routeParams.jobCardIndexNo);
                    if (jobCardIndexNo) {
                        ServiceSelectionService.pendingJobCards()
                                .success(function (data) {
                                    angular.forEach(data, function (values) {
                                        if (values.indexNo === jobCardIndexNo) {
                                            $scope.ui.selectedJobCardRow(values);
                                        }
                                    });
                                });
                    }
                };

                $scope.init();

            });
}());