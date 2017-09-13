(function () {
    angular.module("paymentVoucherModule", ['ui.bootstrap']);
    angular.module("paymentVoucherModule")
            .controller("paymentVoucherController", function ($scope, $sce, $timeout, paymentVoucherService, $uibModal, $filter, optionPane, paymentVoucherModel, Notification, ConfirmPane) {

                $scope.model = new paymentVoucherModel();
                $scope.prineModel = {};
                $scope.ui = {};
                $scope.ui.type = 'ADVANCE PAYMENT';

                $scope.ui.paymentType = function (value) {
                    $scope.ui.type = value;
                    $scope.ui.mode = 'IDEAL';
                    $scope.model.clear();

                };
                $scope.ui.selectClient = function (index) {
                    $scope.model.selectClient(index);
                };
                $scope.ui.selectClientFromBalance = function (index) {
                    $scope.model.selectClientFromBalance(index);
                };

                $scope.ui.selectVehicle = function (index) {
                    $scope.model.selectVehicle(index);
                };

                $scope.ui.getCashPayment = function (amount, type) {
                    $scope.model.getInsertCashPayment(amount, type);

                };

                $scope.ui.getCashPaymentDelete = function () {
                    $scope.model.information.cash = 0.0;
                    $scope.model.payment.cashAmount = 0.0;
                    $scope.model.getCashPaymentDelete();
                };

                $scope.ui.new = function () {
//                    $scope.ui.clear();
                    $scope.ui.mode = 'NEW';
                    $scope.model.customerLedger.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                };
                $scope.ui.getInsertCardAndChequePayment = function (paymentInformation, type) {

                    if (type === "CHEQUE") {
                        if (!paymentInformation.number) {
                            Notification.error("please enter cheque no");
                        } else if (!paymentInformation.chequeDate) {
                            Notification.error("please enter cheque date");
                        } else if (!paymentInformation.bank) {
                            Notification.error("please enter cheque bank");
                        } else if (!paymentInformation.bankBranch) {
                            Notification.error("please enter cheque branch");
                        } else if (!paymentInformation.amount) {
                            Notification.error("please enter cheque amount");
                        } else {
                            $scope.model.getInsertCardAndChequePayment(paymentInformation, type);
                        }
                    } else if (type === "CARD") {
                        if (!paymentInformation.cardType) {
                            Notification.error("please enter card type");
                        } else if (!paymentInformation.amount) {
                            Notification.error("please enter card amount");
                        } else {
                            $scope.model.getInsertCardAndChequePayment(paymentInformation, type);
                        }
                    }
                };

                $scope.ui.getCardAndChequePaymentDelete = function (number) {
                    $scope.model.getCardAndChequePaymentDelete(number);
                };

                $scope.ui.saveAdvancePayment = function () {
                    if ($scope.model.payment.totalAmount) {
                        ConfirmPane.successConfirm("Do you want to save advance payment !")
                                .confirm(function () {
                                    $scope.model.saveAdvancePayment()
                                            .then(function (data) {
                                                $scope.ui.mode = "IDEAL";
                                                Notification.success('Advance Payment Save Successfully !');

                                            });
                                });
                    } else {
                        Notification.error('Empty Value to save Advance Payment');
                    }
                };
                $scope.ui.saveBalancePayment = function () {
                    if ($scope.model.payment.totalAmount) {
                        if ($scope.model.payment.totalAmount === $scope.model.information.invoiceTotalPayment) {
                            //default save
                            ConfirmPane.successConfirm("Do you want to save balance payment !")
                                    .confirm(function () {
                                        $scope.ui.saveBalancePaymentSecond();
                                    });

                        } else if ($scope.model.payment.totalAmount > $scope.model.information.invoiceTotalPayment) {
                            //over payment
                            ConfirmPane.warningConfirm("There is a Balance Payment.Do you wate to Save ? ")
                                    .confirm(function () {
                                        $scope.ui.saveBalancePaymentSecond();
                                    });
                        } else {
                            //dont save
                            Notification.error("Pay Amount and Paid Total doesn't Match !");
                        }
                    } else {
                        Notification.error('Empty Value to save Advance Payment');
                    }

                };
                $scope.ui.saveBalancePaymentSecond = function () {
                    $scope.model.saveBalancePayment()
                            .then(function (data) {
                                $scope.ui.mode = "IDEAL";
                                Notification.success('Customer Balance Payment Save Successfully !');

                            });
                };

                $scope.ui.insertClientOverPaymentSettlment = function () {
                    if ($scope.model.information.overPayment >= $scope.model.paymentInformation.amount) {
                        console.log($scope.model.paymentInformation.amount);
                        $scope.model.insertClientOverPaymentSettlment($scope.model.paymentInformation.amount, 'OVER_PAYMENT_SETTLEMENT');
                    } else {
                        Notification.error("plase enter valid amount");
                    }
                };

//                $scope.ui.deleteOverPayment = function () {
//                    $scope.paymentVoucherModel.settlementAmount = 0.0;
//                    $scope.paymentVoucherModel.deleteOverPayment();
//                };

















//                $scope.prineModel.currentReportGroup = {};
//                $scope.prineModel.currentReport = {};
//                $scope.prineModel.currentReport.parameterValues = {};
//
//
//
//                //variables pass data to methods
//                $scope.selectedJobCardIndexNo = null;
//                $scope.selectJobCardServiceChagers = null;
//                $scope.employeeResponsibiltySelect = true;
//
//                $scope.ui.selectedJobCardRow = function (jobCard) {
//
//                    $scope.paymentVoucherModel.clear();
//                    //job card seletion
//                    $scope.selectedJobCardIndexNo = jobCard.indexNo;
//
//                    $scope.paymentVoucherModel.invoiceData.jobCard = jobCard.indexNo;
//                    $scope.paymentVoucherModel.getJobItemHistory(jobCard.indexNo);
//
//                    $scope.paymentVoucherModel.getClientOverPayment(jobCard.client);
//
//                    $scope.selectJobCardServiceChagers = jobCard.serviceChagers;
//                };
//
//                $scope.ui.clear = function () {
//                    $scope.selectedJobCardIndexNo = null;
//                    $scope.selectJobCardServiceChagers = null;
//                    $scope.paymentVoucherModel.clear();
//                    $scope.paymentVoucherModel.cashPayment = 0.0;
//                    $scope.paymentVoucherModel.settlementAmount = 0.0;
//                };
//
//                $scope.ui.load = function (e) {
//                    var code = e ? e.keyCode || e.which : 13;
//                    if (code === 13) {
//                        $scope.paymentVoucherModel.loadInvoiceData()
//                                .then(function () {
//                                    $scope.ui.mode = 'SELECT';
//                                });
//                    }
//                };
//
//                $scope.ui.getRepEmployeeData = function (indexNo) {
//                    $scope.paymentVoucherModel.employeeData = $scope.paymentVoucherModel.employee(indexNo);
//                };
//
//                $scope.ui.modalOpen = function (indexNo) {
//
////---------------------------------- invoice ----------------------------------
//                    var reportName = "Invoice";
//                    //get report details
//                    paymentVoucherService.reportData(reportName)
//                            .success(function (data) {
//                                $scope.prineModel.currentReport.report = data;
//
//                                //get report paramiters
//                                paymentVoucherService.listParameters(data)
//                                        .success(function (data) {
//                                            $scope.prineModel.currentReport.parameters = data;
//                                        });
//
//                                //set paramiters values
//                                $scope.prineModel.currentReport.parameterValues.INVOICE_NO = indexNo;
//
//                                //view reports
//                                paymentVoucherService.viewReport(
//                                        $scope.prineModel.currentReport.report,
//                                        $scope.prineModel.currentReport.parameters,
//                                        $scope.prineModel.currentReport.parameterValues
//                                        )
//                                        .success(function (response) {
//                                            var file = new Blob([response], {type: 'application/pdf'});
//                                            var fileURL = URL.createObjectURL(file);
//
//                                            $scope.content = $sce.trustAsResourceUrl(fileURL);
//
//                                            $uibModal.open({
//                                                animation: true,
//                                                ariaLabelledBy: 'modal-title',
//                                                ariaDescribedBy: 'modal-body',
//                                                templateUrl: 'invoice_popup.html',
//                                                scope: $scope,
//                                                size: 'lg'
//                                            });
//
//                                        });
//                            });
////---------------------------------- end invoice ----------------------------------
//                };
//
//                $scope.ui.invoiceViewer = function () {
//                    console.log("Invoice_From_Job_Card");
//                    console.log("Invoice_From_Job_Card");
//                    var reportName = "Invoice_From_Job_Card";
//                    //get report details
//                    paymentVoucherService.reportData(reportName)
//                            .success(function (data) {
//                                $scope.prineModel.currentReport.report = data;
//
//                                //get report paramiters
//                                paymentVoucherService.listParameters(data)
//                                        .success(function (data) {
//                                            $scope.prineModel.currentReport.parameters = data;
//                                        });
//
//                                //set paramiters values
//                                $scope.prineModel.currentReport.parameterValues.JOB_CARD = $scope.selectedJobCardIndexNo;
//
//                                //view reports
//                                paymentVoucherService.viewReport(
//                                        $scope.prineModel.currentReport.report,
//                                        $scope.prineModel.currentReport.parameters,
//                                        $scope.prineModel.currentReport.parameterValues
//                                        )
//                                        .success(function (response) {
//                                            var file = new Blob([response], {type: 'application/pdf'});
//                                            var fileURL = URL.createObjectURL(file);
//
//                                            $scope.content = $sce.trustAsResourceUrl(fileURL);
//
//                                            $uibModal.open({
//                                                animation: true,
//                                                ariaLabelledBy: 'modal-title',
//                                                ariaDescribedBy: 'modal-body',
//                                                templateUrl: 'invoice_popup.html',
//                                                scope: $scope,
//                                                size: 'lg'
//                                            });
//
//                                        });
//                            });
//                };
//
//                $scope.ui.saveInvoice = function () {
//                    if ($scope.selectedJobCardIndexNo) {
//                        if ($scope.paymentVoucherModel.paymentData.chequeAmount > 0 || $scope.paymentVoucherModel.paymentData.balance > 0) {
//                            if (!$scope.paymentVoucherModel.paymentData.respEmployee) {
//                                optionPane.dangerMessage("plase select reponsibilty employee");
//                                $scope.employeeResponsibiltySelect = false;
//                            } else {
//                                ConfirmPane.successConfirm("Do you want to save invoice")
//                                        .confirm(function () {
//                                            $scope.paymentVoucherModel.saveInvoice()
//                                                    .then(function (data) {
//                                                        $scope.ui.mode = "IDEAL";
//                                                        $scope.ui.clear();
//                                                        ConfirmPane.successConfirm("Do You Want To Print Invoice")
//                                                                .confirm(function () {
//                                                                    console.log(data);
//                                                                    $scope.ui.modalOpen(data.indexNo);
//                                                                });
//                                                    });
//                                        });
//                            }
//                        } else {
//                            ConfirmPane.successConfirm("Do you want to save invoice")
//                                    .confirm(function () {
//                                        $scope.paymentVoucherModel.saveInvoice()
//                                                .then(function (data) {
//                                                    $scope.ui.mode = "IDEAL";
//                                                    $scope.ui.clear();
//                                                    ConfirmPane.successConfirm("Do You Want To Print Invoice")
//                                                            .confirm(function () {
//                                                                console.log(data);
//                                                                $scope.ui.modalOpen(data.indexNo);
//                                                            });
//                                                });
//                                    });
//                        }
//                    } else {
//                        Notification.error("select vehicle");
//                    }
//                };
//
//                
//
//                $scope.ui.getCardAndChequePaymentDelete = function (number) {
//                    $scope.paymentVoucherModel.getCardAndChequePaymentDelete(number);
//                };
//
//                
//
//                
//
//                
//
//                $scope.ui.getDiscountRate = function () {
//                    $scope.paymentVoucherModel.invoiceData.discountRate = parseFloat(($scope.paymentVoucherModel.invoiceData.discountAmount * 100) / $scope.paymentVoucherModel.invoiceData.amount);
//                    $scope.paymentVoucherModel.invoiceData.netAmount = parseFloat($scope.paymentVoucherModel.invoiceData.amount - $scope.paymentVoucherModel.invoiceData.discountAmount);
//                };
//
//                $scope.ui.getDiscountAmount = function () {
//                    $scope.paymentVoucherModel.invoiceData.discountAmount = parseFloat(($scope.paymentVoucherModel.invoiceData.amount * $scope.paymentVoucherModel.invoiceData.discountRate) / 100);
//                    $scope.paymentVoucherModel.invoiceData.netAmount = parseFloat($scope.paymentVoucherModel.invoiceData.amount - $scope.paymentVoucherModel.invoiceData.discountAmount);
//                };

                $scope.init = function () {
                    $scope.$watch("[model.balanceInvoiceList]", function (newVal, oldVal) {
                        $scope.model.getInvoicePayAmount();
                    }, true);
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

