(function () {
    angular.module("invoiceModule", ['ui.bootstrap']);
    angular.module("invoiceModule")
            .controller("invoiceController", function ($scope, $filter, optionPane, invoiceModel, Notification, ConfirmPane) {

                $scope.invoiceModel = new invoiceModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.clear();
                    $scope.ui.mode = 'NEW';
                    $scope.invoiceModel.invoiceData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                };

                //variables pass data to methods
                $scope.selectedJobCardIndexNo = null;

                $scope.ui.selectedJobCardRow = function (jobCard) {
                    $scope.invoiceModel.clear();
                    //job card seletion
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;

                    $scope.invoiceModel.invoiceData.jobCard = jobCard.indexNo;
                    $scope.invoiceModel.getJobItemHistory(jobCard.indexNo);

                    $scope.invoiceModel.getClientOverPayment(jobCard.client);
                };

                $scope.ui.clear = function () {
                    $scope.invoiceModel.clear();
                    $scope.invoiceModel.cashPayment = 0.0;
                    $scope.invoiceModel.settlementAmount = 0.0;
                };

                $scope.ui.load = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.invoiceModel.loadInvoiceData()
                                .then(function () {
                                    $scope.ui.mode = 'SELECT';
                                });
                    }
                };

                $scope.ui.saveInvoice = function () {
                    if ($scope.selectedJobCardIndexNo) {
                        if ($scope.invoiceModel.paymentData.balance >= 0) {
                            ConfirmPane.successConfirm("Do you want to save invoice")
                                    .confirm(function () {
                                        $scope.invoiceModel.saveInvoice()
                                                .then(function (data) {
                                                    $scope.ui.mode = "IDEAL";
                                                    $scope.ui.clear();
                                                    optionPane.successMessage("Save Invoice" + data.number);
                                                });
                                    });
                        } else {
                            ConfirmPane.successConfirm("Do you want to save invoice Payment Settle")
                                    .confirm(function () {
                                        $scope.invoiceModel.saveInvoice()
                                                .then(function (data) {
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
                        Notification.error("please select vehicle");
                    }
                };

                $scope.ui.getCardAndChequePaymentDelete = function (number) {
                    $scope.invoiceModel.getCardAndChequePaymentDelete(number);
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
                            } else if (!paymentInformation.branch) {
                                Notification.error("please enter cheque branch");
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
                        Notification.error("please select vehicle");
                    }
                };

                $scope.ui.insertClientOverPaymentSettlment = function (overPayment, amount) {
                    if ($scope.selectedJobCardIndexNo) {
                        if (0.0 === parseFloat($scope.invoiceModel.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLMENT'))) {
                            if (overPayment >= amount) {
                                $scope.invoiceModel.insertClientOverPaymentSettlment(amount, 'OVER_PAYMENT_SETTLMENT');
                            } else {
                                Notification.error("plase enter valid amount");
                            }
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.deleteOverPayment = function () {
                    $scope.invoiceModel.settlementAmount = 0.0;
                    $scope.invoiceModel.deleteOverPayment();
                };

                $scope.ui.getDiscountRate = function () {
                    $scope.invoiceModel.invoiceData.discountRate = parseFloat(($scope.invoiceModel.invoiceData.discountAmount * 100) / $scope.invoiceModel.invoiceData.amount);
                    $scope.invoiceModel.invoiceData.netAmount = parseFloat($scope.invoiceModel.invoiceData.amount - $scope.invoiceModel.invoiceData.discountAmount);
                };

                $scope.ui.getDiscountAmount = function () {
                    $scope.invoiceModel.invoiceData.discountAmount = parseFloat(($scope.invoiceModel.invoiceData.amount * $scope.invoiceModel.invoiceData.discountRate) / 100);
                    $scope.invoiceModel.invoiceData.netAmount = parseFloat($scope.invoiceModel.invoiceData.amount - $scope.invoiceModel.invoiceData.discountAmount);
                };

                $scope.init = function () {
                    $scope.$watch("[invoiceModel.invoiceData.netAmount,invoiceModel.paymentInformationList.length]", function (newVal, oldVal) {
                        $scope.invoiceModel.getPaymentDetails();
                    }, true);
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

