(function () {
    angular.module("grnModule", ['ui.bootstrap']);
    angular.module("grnModule")
            .controller("directGrnController", function ($scope, $timeout,$filter, directGrnModel, Notification, ConfirmPane) {
                $scope.model = new directGrnModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    //set current date
                     $scope.ui.focus('#date');
            $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                };

                $scope.ui.validateBarcode = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        $scope.model.validateBarcode($scope.model.tempData.barcode);
                        if ($scope.model.tempData.item) {
                            $scope.ui.focus('#costProce');
                        } else {
                            Notification.error("Item not found!");
                            $scope.ui.focus('#barcode');
                        }
                    }
                };
                $scope.ui.btnFocus = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        var confirm = $scope.model.addData();
                        console.log(confirm);
                        $scope.ui.focus('#barcode');
                    }
                };
                $scope.ui.addData = function () {
                    $scope.model.addData();
                    $scope.ui.focus('#barcode');
                };

                $scope.ui.focus = function (id) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(id))[0].focus();
                    }, 10);
                };

                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Save Good Receive Note !")
                        .confirm(function () {
                            $scope.model.saveGrn()
                                    .then(function () {
                                        $scope.ui.mode = "IDEAL";
                                        $scope.model.clear();
                                        Notification.success("Grn Save Success !");
                                    });
                        })
                        .discard(function () {
                             Notification.error("Grn Save Fail !");
                            $scope.ui.mode = 'NEW';
                            console.log('fail');
                        });
                };
                
                $scope.ui.netValueCalculator = function () {
                    $scope.model.netValueCalculator();
                };
                
                $scope.ui.discountRate = function () {
                    $scope.model.discountRate();
                };
                
                $scope.ui.edit = function (index) {
                    $scope.model.edit(index);
                };
                
                $scope.ui.delete = function (index) {
                    $scope.model.delete(index);
                };
                
//                //variables pass data to methods
//                $scope.selectedJobCardIndexNo = null;
//                $scope.selectVehicleType = null;
//                $scope.selectVehiclePriceCategory = null;
//
//                $scope.ui.selectedJobCardRow = function (jobCard) {
//
//                    //job card seletion
//                    $scope.selectedJobCardIndexNo = jobCard.indexNo;
//
//                    //get vehicle type and price category
//                    $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
//                    $scope.selectVehiclePriceCategory = jobCard.priceCategory;
//
//                    //get price category items
//                    $scope.model.getItemByPriceCategory($scope.selectVehiclePriceCategory);
//
//                    //get job card history
//                    $scope.model.getJobItemHistory(jobCard.indexNo);
//                };
//
//                //get package items
//                $scope.viewPackageDetails = function ($index, package) {
//                    $scope.selectPackagePosition = null;
//                    $scope.model.getPackageItems(package);
//                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
//                    $scope.selectPackageItemPosition = $scope.selectPackageItemPosition === $index ? -1 : $index;
//                };
//
//                //get item units by drop dowsn list
//                $scope.ui.getItemUnits = function ($index, package) {
//                    return $scope.model.getItemUnits(package, $scope.selectVehiclePriceCategory);
//                };
//
//                //add package and serveice items
//                $scope.ui.addPackageAndServiceItem = function (item, type) {
//                    if ($scope.selectedJobCardIndexNo) {
//                        var itemStatus = $scope.model.duplicateItemCheck(item);
//                        if (angular.isUndefined(itemStatus)) {
//                            ConfirmPane.successConfirm("Do you sure want to add item")
//                                    .confirm(function () {
//                                        $scope.model.addPackageAndServiceItem(item, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
//                                    });
//                        } else {
//                            Notification.error("this item is allrday exsist");
//                        }
//                    } else {
//                        Notification.error("select vehicle");
//                    }
//                };
//
//                //add stock items
//                $scope.ui.addNormalItem = function (item, qty) {
//                    if ($scope.selectedJobCardIndexNo) {
//                        var itemStatus = $scope.model.duplicateItemCheck(item);
//                        if (angular.isUndefined(itemStatus)) {
//                            ConfirmPane.successConfirm("Do you sure want to add item")
//                                    .confirm(function () {
//                                        $scope.model.addNormalItem(item, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
//                                    });
//                        } else {
//                            Notification.error("this item is allrday exsist");
//                        }
//                    } else {
//                        Notification.error("select vehicle");
//                    }
//                };
//
//                //add stock item units
//                $scope.ui.addItemUnit = function (itemUnit, type) {
//                    if ($scope.selectedJobCardIndexNo) {
//                        if (itemUnit) {
//                            var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
//                            if (angular.isUndefined(itemStatus)) {
//                                ConfirmPane.successConfirm("Do you sure want to add item")
//                                        .confirm(function () {
//                                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
//                                        });
//                            } else {
//                                Notification.error("this item is allrday exsist");
//                            }
//                        } else {
//                            Notification.error("select item");
//                        }
//                    } else {
//                        Notification.error("select vehicle");
//                    }
//                };
//
//                //delete item
//                $scope.ui.deleteSelectDetails = function ($index) {
//                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
//                            .confirm(function () {
//                                //delete job card details
//                                $scope.model.deleteSelectDetails($index);
//                            });
//                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                    $scope.$watch("model.data.grnItemList", function () {
                        $scope.model.summaryValueCalculator();
                    });
                };

                $scope.init();
            });
}());



