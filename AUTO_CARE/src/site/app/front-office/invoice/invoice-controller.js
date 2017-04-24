(function () {
    angular.module("invoiceModule", ['ui.bootstrap']);
    angular.module("invoiceModule")
            .controller("invoiceController", function ($scope, itemModificationModel, optionPane, invoiceModel, Notification, ConfirmPane) {

                $scope.model = new itemModificationModel();
                $scope.invoiceModel = new invoiceModel();

                //-----------------------------------open item modification -----------------------------------
                $scope.ui = {};

                //variables pass data to methods
                $scope.selectedJobCardIndexNo = null;
                $scope.selectVehicleType = null;
                $scope.selectVehiclePriceCategory = null;
                $scope.selectInvoice = null;

                $scope.ui.selectedJobCardRow = function (jobCard) {
                    //clear
                    $scope.ui.clear();

                    //job card seletion
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;

                    //get vehicle type and price category
                    $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
                    $scope.selectVehiclePriceCategory = jobCard.priceCategory;

                    $scope.invoiceModel.getClientOverPayment(jobCard.client);

                    //get price category items
                    $scope.model.getItemByPriceCategory($scope.selectVehiclePriceCategory);

                    //get job card history
                    $scope.model.getJobItemHistory(jobCard.indexNo);

                    //get vehicle invoice by job card
                    $scope.invoiceModel.getInvoiceByJobCard(jobCard.indexNo);
                    $scope.selectInvoice = null;

                    //get job card vehicle data and client data
                    $scope.invoiceModel.selectJobCardVehicle(jobCard);
                };

                $scope.ui.load = function (e, number) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.invoiceModel.loadInvoiceData(number)
                                .then(function () {

                                }, function () {
                                    if (number) {
                                        Notification.error("Green leaves receive cannot be found at " + number + ".");
                                    } else {
                                        Notification.error("Please enter a valid number.");
                                    }
                                });
                    }
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

                $scope.ui.clear = function () {
                    $scope.invoiceModel.cashPayment = 0.0;
                    $scope.invoiceModel.clear();
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

                //-----------------------------------end item modification -----------------------------------

                //-----------------------------------open invoice payment method -----------------------------------

                //get item units by drop dowsn list
                $scope.ui.getInvoiceByJobCard = function ($index, jobCard) {
                    $scope.selectInvoice = $index;
                    return $scope.invoiceModel.getJobItemHistory(jobCard);
                };

                $scope.ui.saveInvoice = function () {
                    if ($scope.selectedJobCardIndexNo) {
                        if ($scope.invoiceModel.paymentData.balance >= 0) {
                            ConfirmPane.successConfirm("Do you want to save invoice")
                                    .confirm(function () {
                                        $scope.invoiceModel.saveInvoice()
                                                .then(function (data) {
                                                    $scope.model.removeJobCard();
                                                    $scope.ui.clear();
                                                    optionPane.successMessage("Save Invoice" + data.number);
                                                });
                                    });
                        } else {
                            ConfirmPane.successConfirm("Do you want to save invoice Payment Settle OutStanding")
                                    .confirm(function () {
                                        $scope.invoiceModel.saveInvoice()
                                                .then(function (data) {
                                                    $scope.model.removeJobCard();
                                                    $scope.ui.clear();
                                                    optionPane.successMessage("Save Invoice" + data.number);
                                                });
                                    });
                        }

                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.getCashPayment = function (amount, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (0.0 === parseFloat($scope.invoiceModel.getTotalPaymentTypeWise('CASH'))) {
                            $scope.invoiceModel.getInsertCashPayment(amount, type);
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.getCardAndChequePaymentDelete = function ($index) {
                    $scope.invoiceModel.getCardAndChequePaymentDelete($index);
                };

                $scope.ui.getCashPaymentDelete = function () {
                    $scope.invoiceModel.cashPayment = 0.0;
                    $scope.invoiceModel.getCashPaymentDelete();
                };

                $scope.ui.getInsertCardAndChequePayment = function (paymentInformation, type) {
                    if ($scope.selectedJobCardIndexNo) {

                        if (type === "CHEQUE") {
                            if (!paymentInformation.number) {
                                Notification.error("please enter cheque no");
                            } else if (!paymentInformation.chequeDate) {
                                Notification.error("please enter cheque date");
                            } else if (!paymentInformation.bank) {
                                Notification.error("please enter cheque bank");
                            } else if (!paymentInformation.amount) {
                                Notification.error("please enter cheque amount");
                            } else {
                                $scope.invoiceModel.getInsertCardAndChequePayment(paymentInformation, type);
                            }
                        } else if (type === "CARD") {
                            if (!paymentInformation.number) {
                                Notification.error("please enter number");
                            } else if (!paymentInformation.cardType) {
                                Notification.error("please enter card type");
                            } else if (!paymentInformation.amount) {
                                Notification.error("please enter card amount");
                            } else {
                                $scope.invoiceModel.getInsertCardAndChequePayment(paymentInformation, type);
                            }
                        }

                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.addClientOverPayment = function (amount) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (0.0 === parseFloat($scope.invoiceModel.getTotalPaymentTypeWise('OVER_PAYMENT'))) {
                            $scope.invoiceModel.insertClientOverPayment(amount, 'OVER_PAYMENT');
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

//                $scope.ui.getDiscountRate = function () {
//                    $scope.invoiceModel.invoiceData.discountRate = $scope.invoiceModel.invoiceData.discountAmount * 100 / $scope.invoiceModel.invoiceData.amount;
//                    $scope.invoiceModel.invoiceData.netAmount = parseFloat($scope.invoiceModel.invoiceData.amount - $scope.invoiceModel.invoiceData.discountAmount);
//                };
//
//                $scope.ui.getDiscountAmount = function () {
//                    $scope.invoiceModel.invoiceData.discountAmount = parseFloat($scope.invoiceModel.invoiceData.amount * $scope.invoiceModel.invoiceData.discountRate / 100);
//                    $scope.invoiceModel.invoiceData.netAmount = parseFloat($scope.invoiceModel.invoiceData.amount - $scope.invoiceModel.invoiceData.discountAmount);
//                };

                //-----------------------------------end invoice payment method -----------------------------------


                $scope.init = function () {
                    $scope.$watch("[invoiceModel.invoiceData.amount,invoiceModel.invoiceData.discountRate,invoiceModel.invoiceData.discountAmount]", function (newVal, oldVal) {
                        $scope.invoiceModel.getInvoiceData($scope.selectedJobCardIndexNo);
                        $scope.invoiceModel.getPaymentDetails();
                    }, true);

                    $scope.$watch("[invoiceModel.paymentInformationList.length]", function (newVal, oldVal) {
                        if ($scope.invoiceModel.paymentInformationList.length) {
                            $scope.invoiceModel.getPaymentDetails();
                        }
                    }, true);
                };

                $scope.init();
            });
}());

