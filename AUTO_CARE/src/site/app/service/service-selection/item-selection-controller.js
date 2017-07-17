(function () {
//module
    angular.module("itemSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("itemSelectionModule")
            .controller("itemSelectionController", function ($scope, $uibModalStack, $uibModal, optionPane, ItemSelectionModel, Notification, ConfirmPane) {
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
                    $scope.model.getQuickSeacrhStockItem(itemKey, $scope.model.jobCardData.priceCategory)
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
                    $scope.model.findItemsForStockLeger(itemCategory)
                            .then(function () {

                                $scope.showStockItemTable = true;
                                $scope.hideStockItemTable = false;

                            });
                };

                $scope.ui.getItemUnits = function (details) {
                    $scope.model.getItemUnits(details[0]);
                    $scope.itemName = details[2];
                    $scope.itemStockItemQty = details[1];
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'item_selection_popup.html',
                        scope: $scope,
                        size: 'lg'
                    });
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
                $scope.ui.addItemUnit = function (itemUnit, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (itemUnit) {
                            var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                            if (angular.isUndefined(itemStatus)) {
                                ConfirmPane.successConfirm("Do you sure want to add item")
                                        .confirm(function () {
                                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                            $scope.ui.dismissAllModel();
                                        });
                            } else {
                                // Notification.error("this item is allrday exsist");
                                ConfirmPane.successConfirm("This Item Is Allrday Esxist")
                                        .confirm(function () {
                                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                            $scope.ui.dismissAllModel();
                                        });
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
                                $scope.model.printEstimate($scope.selectedJobCardIndexNo);
                            });
                };
            });
}());

