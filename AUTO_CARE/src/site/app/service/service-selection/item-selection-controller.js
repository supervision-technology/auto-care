(function () {
//module
    angular.module("itemSelectionModule", ['ui.bootstrap', 'ngCookies']);
    //controller
    angular.module("itemSelectionModule")
            .controller("itemSelectionController", function ($scope, optionPane, $uibModalStack, $uibModal, optionPane, ItemSelectionModel, Notification, ConfirmPane) {
                $scope.model = new ItemSelectionModel();

                $scope.ui = {};
                $scope.ui.model = "CATEGORY";
                $scope.selectVehicleType = null;
                $scope.selectStockItemPosition = null;
                $scope.selectedJobCardIndexNo = null;

                $scope.ui.selectedJobCardRow = function (jobCardData) {

                    //find select job card history
                    $scope.selectVehicleType = null;
                    $scope.model.findJobCardDetail(jobCardData.indexNo)
                            .then(function () {

                                $scope.selectedJobCardIndexNo = jobCardData.indexNo;
                                $scope.selectVehicleType = $scope.model.vehicleData(jobCardData.vehicle).type;

                            });

                    //view select job item history
                    $scope.model.getJobItemHistory(jobCardData.indexNo);

                    //get stock leger items
                    $scope.selectIemUnit = null;

                    $scope.ui.backToCategory();
                };

                $scope.ui.resetStockItems = function () {
                    $scope.selectStockItemPosition = null;
                    $scope.model.subCategory = [];
                    $scope.model.itemsByStockLeger = [];
                    $scope.select = null;
                };

                $scope.ui.findSubCateoryByCateory = function (category) {
                    $scope.model.subCategory = [];
                    $scope.model.itemsByStockLeger = [];
                    $scope.select = null;
                    $scope.model.findSubCateoryByCateory(category);
                    $scope.ui.model = "STOCK_ITEM";
                };

                $scope.ui.getQuickSeacrhItem = function (itemKey) {
                    $scope.showStockItemTableQuickSeacrh = false;
                    $scope.hideStockItemTableQuickSeacrh = true;
                    $scope.model.getQuickSeacrhStockItemAndNonStockItem(itemKey)
                            .then(function () {
                                $scope.showStockItemTableQuickSeacrh = true;
                                $scope.hideStockItemTableQuickSeacrh = false;

                            });
                };

                $scope.ui.quickSeacrh = function () {
                    $scope.itemKey = null;
                    $scope.model.filterQuickSeacrhStockItems = [];
                    $scope.ui.model = "QUICK_SEARCH";
                };

                $scope.ui.getStockItemByItemCategory = function (itemCategory, $index) {
                    $scope.showStockItemTable = false;
                    $scope.hideStockItemTable = true;
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectStockItemPosition = $scope.selectStockItemPosition === $index ? -1 : $index;
                    $scope.model.findByNonStockItemAndStockItem(itemCategory)
                            .then(function () {
                                $scope.showStockItemTable = true;
                                $scope.hideStockItemTable = false;

                            });
                };

                $scope.ui.getItemUnitsDetails = function (details) {
                    $scope.model.getItemUnits(details[0]);

                    $scope.itemName = details[1];
                    $scope.itemType = details[2];

                    $scope.itemStockItemQty = 0;

                    $scope.model.findByAvailableStockQty(details[0])
                            .then(function (data) {
                                $scope.itemStockItemQty = data;
                                console.log($scope.itemStockItemQty);
                            });

                    if ($scope.model.getItemUnits(details[0]).length === 0) {
                        optionPane.dangerMessage("ITEM UNITS NOT FOUND!");
                    } else {
                        if ($scope.itemStockItemQty > 0) {
                            optionPane.dangerMessage("ITEM HAVE NO QTY!");
                        } else {
                            $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: 'item_selection_popup.html',
                                scope: $scope,
                                size: 'lg'
                            });
                        }
                    }
                };

                $scope.ui.dismissAllModel = function () {
                    $scope.ui.backToCategory();
                    $scope.ui.resetStockItems();
                    $uibModalStack.dismissAll();
                };

                //back to category page
                $scope.ui.backToCategory = function () {
                    $scope.ui.model = "CATEGORY";
                };

                $scope.ui.setServiceChargers = function (checkd) {
                    if ($scope.selectedJobCardIndexNo) {
                        ConfirmPane.successConfirm("Select Service Chargers")
                                .confirm(function () {
                                    $scope.model.setServiceChargers($scope.selectedJobCardIndexNo, checkd);
                                });
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //add stock item units
                $scope.ui.addItemUnit = function (itemUnit, qty) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (itemUnit) {
                            if (qty > $scope.itemStockItemQty) {
                                optionPane.dangerMessage("NO QTY!");
                            } else {
                                var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                                if (angular.isUndefined(itemStatus)) {
                                    ConfirmPane.successConfirm("Do you sure want to add item")
                                            .confirm(function () {
                                                $scope.model.addItemUnit(itemUnit, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                                $scope.ui.dismissAllModel();
                                            });
                                } else {
                                    ConfirmPane.successConfirm("This Item Is Allrday Esxist")
                                            .confirm(function () {
                                                $scope.model.addItemUnit(itemUnit, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                                $scope.ui.dismissAllModel();
                                            });
                                }
                            }
                        } else {
                            Notification.error("select item");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //delete item
                $scope.ui.deleteSelectDetails = function ($index, itemIndexNo) {
                    $scope.model.findJobItemByIndexNo(itemIndexNo)
                            .then(function (data) {
                                if (data.itemType === 'STOCK_ITEM') {
                                    if (data.orderStatus === 'PENDING') {
                                        ConfirmPane.dangerConfirm("Do you sure want to delete item")
                                                .confirm(function () {
                                                    //delete job card details
                                                    $scope.model.deleteSelectDetails($index);
                                                });
                                    } else {
                                        optionPane.successMessage("THIS ITEM STOCK ISSE");
                                    }
                                } else {
                                    if (data.jobStatus === 'PENDING') {
                                        ConfirmPane.dangerConfirm("Do you sure want to delete item")
                                                .confirm(function () {
                                                    //delete job card details
                                                    $scope.model.deleteSelectDetails($index);
                                                });
                                    } else {
                                        optionPane.successMessage("THIS ITEM FINAL CHECK COMPLITE");
                                    }
                                }
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

                //delete customer recerved item
                $scope.ui.deleteCustomerReservedItem = function ($index, indexNo) {
                    ConfirmPane.dangerConfirm("Do you sure want to delete item")
                            .confirm(function () {
                                $scope.model.deleteCustomerReceiveItem($index, indexNo);
                            });
                };

                $scope.ui.printJobItemRequestAstimate = function () {
                    ConfirmPane.successConfirm("Print Estimate")
                            .confirm(function () {
                                $scope.model.printEstimate($scope.selectedJobCardIndexNo)
                                        .then(function (data) {
                                            if (data === "1") {
                                                optionPane.successMessage("ESTIMATE PRINT AND CLIENT SMS SEND!");
                                            } else {
                                                optionPane.dangerMessage("ERROR");
                                            }
                                        });
                            });
                };
            });
}());

