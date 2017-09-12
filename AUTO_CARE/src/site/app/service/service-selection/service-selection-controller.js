(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, optionPane, $uibModalStack, $routeParams, $uibModal, optionPane, ItemSelectionModel, Notification, ConfirmPane) {
                $scope.model = new ItemSelectionModel();

                $scope.ui = {};
                $scope.ui.model = "CATEGORY";

                $scope.tempItem = {};

                $scope.selectVehicleType = null;
                $scope.selectPackageItemPosition = null;
                $scope.selectedJobCardIndexNo = null;
                $scope.selectedCategoryColors = null;

                $scope.selectCategoryPosition = null;
                $scope.viewRemarkFeild = null;

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

                    $scope.ui.backToCategory();
                };

                //job card select get customer reserved item list
                $scope.ui.findClientRecevedItem = function () {
                    $scope.model.findByJobCardCustomerReceiveItem($scope.selectedJobCardIndexNo);
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
                    $uibModalStack.dismissAll();
                };

                //back to category page
                $scope.ui.backToCategory = function () {
                    if ($scope.ui.model === "ATTENCTIONS") {
                        $scope.activeTab = 0;
                    }

                    $scope.ui.model = "CATEGORY";
                };

                $scope.ui.goToObservations = function () {
                    $scope.ui.model = "ATTENCTIONS";
                    //get last job card vehicle attenctions list
                    $scope.model.getLastJobCardVehicleAttenctions($scope.model.jobCardData.vehicle);
                };

                $scope.ui.getQuickSeacrhItem = function (itemKey) {
                    $scope.model.getQuickSeacrhItem(itemKey, $scope.model.jobCardData.priceCategory);
                };

                $scope.ui.quickSeacrh = function () {
                    $scope.itemKey = null;
                    $scope.model.filterQuickSeacrhItems = [];
                    $scope.ui.model = "QUICK_SEARCH";
                };

                //Category Names = PACKAGE,SERVICE AND STOCK ITEMS
                $scope.ui.categorySelections = function (data) {
                    //package or stock items
                    if (!$scope.selectedJobCardIndexNo) {
                        Notification.error("plase select job card");
                    } else {
                        $scope.selectedCategoryColors = data.colour;
                        if (data.staticFeild) {
                            if (data.staticFeildName === 'PACKAGE') {
                                $scope.ui.model = "PACKAGE";
                                $scope.model.filterItems = [];
                                $scope.model.findByCategoryAndPriceCategory(data, $scope.model.jobCardData.priceCategory);

                            }
                        } else {
                            //service -  lord items
                            $scope.ui.model = "SERVICE";
                            $scope.model.filterItems = [];
                            $scope.model.findByCategoryAndPriceCategory(data, $scope.model.jobCardData.priceCategory);
                        }
                    }
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
                                        $scope.serviceBeforValue = "";
                                    });
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                //------------- qty wise service ---------------

                $scope.ui.viewQtyWiseServiceItem = function (item) {
                    $scope.tempItem = item;
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'qty_wise_item_popup.html',
                        scope: $scope,
                        size: 'lg'
                    });

                };

                $scope.ui.addQtyWiseServiceItem = function (item, qty) {
                    ConfirmPane.successConfirm("Do you sure want to add item")
                            .confirm(function () {
                                $scope.model.addQtyWiseServiceItem(item, qty, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
                                $scope.ui.dismissAllModel();
                            });
                };

                //------------- qty wise service ---------------


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

//------------------------------- vehicle attenctions -------------------------------  

                $scope.ui.getVehicleAttenctionsData = function ($index, category) {
                    $scope.model.getSelectedVehicleAttenctionCategoryData(category, $scope.selectedJobCardIndexNo);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.viewRemarkFeild = false;
                    $scope.selectCategoryPosition = $scope.selectCategoryPosition === $index ? -1 : $index;
                };

                $scope.ui.viewRemark = function ($index) {
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.viewRemarkFeild = $scope.viewRemarkFeild === $index ? -1 : $index;
                };

                $scope.ui.viewRemarkLastJobCard = function ($index, details) {
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.viewRemarkFeild = $scope.viewRemarkFeild === $index ? -1 : $index;
                    $scope.remark = null;
                    $scope.remark = details.remark;
                };

                $scope.ui.addJobVehicleAttenction = function (data) {
                    if ($scope.selectedJobCardIndexNo) {
                        $scope.model.addJobVehicleAttenction(data);
                        //$scope.selectCategoryPosition = null;
                        $scope.viewRemarkFeild = null;
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.addRemarkJobVehicleAttenction = function (remark) {
                    if ($scope.selectedJobCardIndexNo) {
                        $scope.model.addRemarkJobVehicleAttenction($scope.viewRemarkFeild, remark);
                        //$scope.selectCategoryPosition = null;
                        $scope.viewRemarkFeild = null;
                    } else {
                        Notification.error("select vehicle");
                    }
                };

//------------------------------- /vehicle attenctions -------------------------------    


//---------------------------------- estimate ----------------------------------
                $scope.ui.printJobItemRequestAstimate = function () {
                    ConfirmPane.successConfirm("Print Estimate")
                            .confirm(function () {
                                $scope.model.printEstimate($scope.selectedJobCardIndexNo)
                                        .then(function () {
                                            optionPane.successMessage("ESTIMATE PRINT AND CLIENT SMS SEND!");
                                        });
                            });
                };
//---------------------------------- end estimate ----------------------------------

                $scope.init = function () {
                    //get routing paramiets job card index
                    var jobCardIndexNo = parseInt($routeParams.jobCardIndexNo);
                    if (jobCardIndexNo) {
                        $scope.model.findJobCardDetail(jobCardIndexNo)
                                .then(function (data) {
                                    $scope.ui.selectedJobCardRow(data);
                                });
                    }
                };

                $scope.init();
            });
}());