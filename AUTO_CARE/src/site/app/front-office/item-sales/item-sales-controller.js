(function () {
    angular.module("itemSalesModule", ['ui.bootstrap']);
    angular.module("itemSalesModule")
            .controller("itemSalesController", function ($scope, $window, systemConfig, $uibModalStack, $timeout, $uibModal, $filter, optionPane, itemSalesModel, Notification, ConfirmPane) {
                $scope.model = new itemSalesModel();

                $scope.ui = {};

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.ui.tabPayment = function (val) {
                    if (val === 0) {
                        $scope.ui.model = 'IDEAL';
                    } else {
                        $scope.ui.model = 'NEW';
                        $scope.ui.mode = 'IDEAL';
                    }
                };

                $scope.ui.new = function () {
                    $scope.ui.model = 'SAVE';
                    $scope.ui.mode = 'NEW';
                };

                $scope.ui.save = function () {
                    $scope.ui.model = 'NEW';
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.ui.dismissAllModel = function () {
                    $uibModalStack.dismissAll();
                };

                $scope.ui.getQuickSeacrhItem = function (itemKey) {
                    $scope.quickSearchMode = 'show';
                    $scope.model.getQuickSeacrhStockItemAndNonStockItem(itemKey)
                            .then(function (data) {
                                $scope.quickSearchMode = 'hide';
                            }, function () {
                                $scope.quickSearchMode = 'hide';
                            });
                };

                $scope.ui.getItemUnitsDetails = function (details) {
                    //set job item data
                    $scope.model.tempItem.item = details[0];
                    $scope.model.tempItem.itemName = details[1];
                    $scope.model.tempItem.itemType = "STOCK_ITEM";
                    $scope.model.tempItem.jobStatus = "APPROVE";
                    $scope.model.tempItem.orderStatus = "APPROVE";

                    $scope.model.getItemUnits(details[0]);

                    $scope.itemName = details[1];
                    $scope.itemType = details[2];

                    $scope.itemStockItemQty = 0;

                    $scope.model.findByAvailableStockQty(details[0])
                            .then(function (data) {
                                $scope.itemStockItemQty = data;
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

                //add stock item units
                $scope.ui.addItemUnit = function (itemUnit, qty) {
                    if (itemUnit.indexNo) {
                        if (qty > $scope.itemStockItemQty) {
                            optionPane.dangerMessage("NO QTY!");
                        } else {
                            $scope.model.tempItem.itemUnit = itemUnit.indexNo;
                            $scope.model.tempItem.price = itemUnit.salePriceNormal;
                            $scope.model.tempItem.quantity = qty;
                            $scope.model.tempItem.value = itemUnit.salePriceNormal * qty;

                            $scope.model.jobItemList.push($scope.model.tempItem);
                            console.log($scope.model.jobItemList)
                            $scope.ui.getTotalAmount(itemUnit.salePriceNormal, qty);
                            $scope.model.tempItem = {};
                            $scope.ui.dismissAllModel();
                        }
                    } else {
                        Notification.error("select item");
                    }
                };

                $scope.ui.getTotalAmount = function (price, qty) {
                    $scope.model.invoice.amount = null;
                    var qty = parseInt(qty);
                    if ($scope.totalAmount) {
                        $scope.itemCount += 1;
                        $scope.totalAmount += price * qty;
                        $scope.model.invoice.amount = $scope.totalAmount;
                    } else {
                        $scope.totalAmount = price * qty;
                        $scope.model.invoice.amount = $scope.totalAmount;
                        $scope.itemCount = 1;
                    }
                };

                $scope.ui.getCashPayment = function (amount, type) {
                    $scope.model.getInsertCashPayment(amount, type);

                };

                $scope.ui.getDiscountRate = function () {
                    $scope.model.invoice.discountRate = parseFloat(($scope.model.invoice.discountAmount * 100) / $scope.model.invoice.amount);
                    $scope.model.invoice.netAmount = parseFloat($scope.model.invoice.amount - $scope.model.invoice.discountAmount);
                };

                $scope.ui.getDiscountAmount = function () {
                    $scope.model.invoice.discountAmount = parseFloat(($scope.model.invoice.amount * $scope.model.invoice.discountRate) / 100);
                    $scope.model.invoice.netAmount = parseFloat($scope.model.invoice.amount - $scope.model.invoice.discountAmount);
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

                $scope.ui.insertClientOverPaymentSettlment = function () {
                    if ($scope.model.information.overPayment >= $scope.model.paymentInformation.amount) {
                        $scope.model.insertClientOverPaymentSettlment($scope.model.paymentInformation.amount, 'OVER_PAYMENT_SETTLEMENT');
                    } else {
                        Notification.error("please enter valid amount");
                    }
                };

                $scope.ui.getRepEmployeeData = function ($item, $model) {
                    $scope.empMobile = $item.mobile;
                    $scope.empType = $item.type;
                    $scope.empRol = $item.rol;
                    console.log($item);
                };

                $scope.ui.saveItemSale = function () {
//                    if ($scope.model.payment.totalAmount) {
                    ConfirmPane.successConfirm("Do you want to Item Sale!")
                            .confirm(function () {
                                $scope.model.saveItemSale()
                                        .then(function (data) {
                                            $scope.ui.mode = "IDEAL";
                                            Notification.success('Item Sale Save Successfully !');

                                        });
                            });
//                    } else {
//                        Notification.error('Empty Value To Save Item Sale');
//                    }
                };

                //delete item
                $scope.ui.deleteSelectDetails = function ($index, price) {
                    ConfirmPane.dangerConfirm("Are you sure want to remove item")
                            .confirm(function () {
                                $scope.itemCount -= 1;
                                $scope.totalAmount -= price;
                                $scope.model.invoice.amount = $scope.totalAmount;
                                $scope.model.jobItemList.splice($index, 1);
                            });

                };

                $scope.ui.registerNewCustomerDetail = function () {
                    $window.location.href = systemConfig.apiUrl + "#/master/client/";
                };

                $scope.ui.deleteOverPayment = function () {
                    $scope.model.payment.overPaymentAmount = 0.0;
                    $scope.model.deleteOverPayment();
                };

                $scope.ui.getCashPaymentDelete = function () {
                    $scope.model.information.cash = 0.0;
                    $scope.model.payment.cashAmount = 0.0;
                    $scope.model.getCashPaymentDelete();
                };

                $scope.ui.getCardAndChequePaymentDelete = function (number, type) {
                    $scope.model.getCardAndChequePaymentDelete(number, type);
                };



                $scope.init();
            });
}());
