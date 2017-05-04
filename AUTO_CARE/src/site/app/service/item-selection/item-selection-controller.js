(function () {
//module
    angular.module("itemSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("itemSelectionModule")
            .controller("itemSelectionController", function ($scope, $window, systemConfig, $routeParams, ItemSelectionModel, Notification, ConfirmPane) {

                $scope.model = new ItemSelectionModel();
                $scope.ui = {};
                $scope.ui.model = "CATEGORY";
                $scope.selectVehicleType = null;
                $scope.selectPackageItemPosition = null;
                $scope.selectedJobCardIndexNo = null;

                //Category names = PACKAGE,SERVICE AND STOCK ITEMS
                $scope.ui.categorySelections = function (data) {
                    //package or stock items
                    if (data.staticFeild) {
                        if (data.staticFeildName === 'PACKAGE') {
                            $scope.ui.model = "PACKAGE";
                            $scope.model.findByCategoryAndPriceCategory(data, $scope.model.jobCardData.priceCategory);
                        } else if (data.staticFeildName === 'STOCK') {
                            $scope.ui.model = "STOCK";
                            $scope.model.findByCategoryAndPriceCategory(data, $scope.model.jobCardData.priceCategory);
                        }
                    } else {
                        //service -  lord items
                        $scope.ui.model = "SERVICE";
                        $scope.model.findByCategoryAndPriceCategory(data, $scope.model.jobCardData.priceCategory);
                    }
                };

                //back to category page
                $scope.ui.backToCategory = function () {
                    $scope.ui.model = "CATEGORY";
                };

                //get item units by drop dowsn list
                $scope.ui.getItemUnits = function ($index, item) {
                    return $scope.model.getItemUnits(item, $scope.model.jobCardData.priceCategory);
                };

                $scope.ui.getPackageDetails = function ($index, package) {
                    $scope.model.getPackageItems(package);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectPackageItemPosition = $scope.selectPackageItemPosition === $index ? -1 : $index;
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


                //delete customer recerved item
                $scope.ui.deleteCustomerReservedItem = function ($index, indexNo) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
                            .confirm(function () {
                                $scope.model.deleteCustomerReceiveItem($index, indexNo);
                            });
                };

                //add customer reserved items
                $scope.ui.addCustomerReservedItem = function () {
                    if (!$scope.model.customerReservedItemData.name) {
                        Notification.error("please enter item name");
                    } else if (!$scope.model.customerReservedItemData.qty) {
                        Notification.error("please select qty");
                    } else if ($scope.model.customerReservedItemData.name && $scope.model.customerReservedItemData.qty) {
                        $scope.model.saveCustomerReceiveItem($scope.selectedJobCardIndexNo);
                    }
                };

                $scope.init = function () {
                    //get routing paramiets job card index
                    var jobCardIndexNo = parseInt($routeParams.jobCardIndexNo);
                    if (jobCardIndexNo) {
                        //find select job card history
                        $scope.model.findJobCardDetail(jobCardIndexNo)
                                .then(function () {
                                    $scope.selectedJobCardIndexNo = jobCardIndexNo;
                                    if ($scope.selectVehicleType) {
                                        $scope.selectVehicleType = $scope.model.vehicleData($scope.model.jobCardData.vehicle).type;
                                    } else {
                                        $scope.selectVehicleType = $scope.model.vehicleData($scope.model.jobCardData.vehicle).type;
                                    }
                                });
                        //view select job item history
                        $scope.model.getJobItemHistory(jobCardIndexNo);

                        //job card select get customer reserved item list
                        $scope.model.findByJobCardCustomerReceiveItem(jobCardIndexNo);
                    }
                };
                $scope.init();
            });
}());