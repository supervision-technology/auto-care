(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, $sce, $routeParams, $uibModal, optionPane, ItemSelectionModel, Notification, ConfirmPane, IndividualViewService) {
                $scope.model = new ItemSelectionModel();

                $scope.ui = {};
                $scope.ui.model = "CATEGORY";
                $scope.selectVehicleType = null;
                $scope.selectPackageItemPosition = null;
                $scope.selectedJobCardIndexNo = null;
                $scope.selectedCategoryColors = null;

                $scope.selectCategoryPosition = null;
                $scope.viewRemarkFeild = null;

                $scope.model.currentReportGroup = {};
                $scope.model.currentReport = {};
                $scope.model.currentReport.parameterValues = {};

                $scope.ui.selectedJobCardRow = function (jobCardData) {

                    //get last job card vehicle attenctions list
                    $scope.model.getLastJobCardVehicleAttenctions(jobCardData.vehicle);

                    //find select job card history
                    $scope.selectVehicleType = null;
                    $scope.model.findJobCardDetail(jobCardData.indexNo)
                            .then(function () {

                                $scope.selectedJobCardIndexNo = jobCardData.indexNo;
                                $scope.selectVehicleType = $scope.model.vehicleData(jobCardData.vehicle).type;

                            });

                    //view select job item history
                    $scope.model.getJobItemHistory(jobCardData.indexNo);

                    //job card select get customer reserved item list
                    $scope.model.findByJobCardCustomerReceiveItem(jobCardData.indexNo);

                    //get stock leger items
                    $scope.model.findItemsForStockLeger();
                    $scope.selectIemUnit = null;

                    $scope.ui.backToCategory();
                };

                //back to category page
                $scope.ui.backToCategory = function () {
                    $scope.ui.model = "CATEGORY";
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
                            } else if (data.staticFeildName === 'STOCK') {

                                $scope.ui.model = "STOCK";
                                $scope.model.findItemsForStockLeger();
                            } else if (data.staticFeildName === 'ATTENCTIONS') {

                                $scope.ui.model = "ATTENCTIONS";
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
                                    });
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
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
                                        });
                            } else {
                                // Notification.error("this item is allrday exsist");
                                ConfirmPane.successConfirm("This Item Is Allrday Esxist")
                                        .confirm(function () {
                                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo, $scope.selectVehicleType);
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


                $scope.ui.printJobItemRequestAstimate = function () {
//---------------------------------- invoice ----------------------------------
                    var reportName = "Estimate";
                    //get report details
                    IndividualViewService.reportData(reportName)
                            .success(function (data) {
                                $scope.model.currentReport.report = data;

                                //get report paramiters
                                IndividualViewService.listParameters(data)
                                        .success(function (data) {
                                            $scope.model.currentReport.parameters = data;
                                        });

                                //set paramiters values
                                $scope.model.currentReport.parameterValues.INDEX_NO = $scope.selectedJobCardIndexNo;

                                //view reports
                                IndividualViewService.viewReport(
                                        $scope.model.currentReport.report,
                                        $scope.model.currentReport.parameters,
                                        $scope.model.currentReport.parameterValues
                                        )
                                        .success(function (response) {
                                            var file = new Blob([response], {type: 'application/pdf'});
                                            var fileURL = URL.createObjectURL(file);

                                            $scope.content = $sce.trustAsResourceUrl(fileURL);

                                            $uibModal.open({
                                                animation: true,
                                                ariaLabelledBy: 'modal-title',
                                                ariaDescribedBy: 'modal-body',
                                                templateUrl: 'actimate_popup.html',
                                                scope: $scope,
                                                size: 'lg'
                                            });

                                        });
                            });
//---------------------------------- end invoice ----------------------------------
                };

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