(function () {
    angular.module("purchaseOrderApproveModule", ['ui.bootstrap']);
    angular.module("purchaseOrderApproveModule")
            .controller("purchaseOrderApproveController", function ($scope, $filter, $timeout, purchaseOrderApproveModel, Notification, ConfirmPane) {
                $scope.model = new purchaseOrderApproveModel();
                $scope.ui = {};
                $scope.ui.selectedDetailIndex = -1;

                $scope.ui.selectPurchaseOrder = function (purchaseOrder) {
                    $scope.model.selectPurchaseOrder(purchaseOrder);
                    if ($scope.model.data.vat) {
                        $scope.chxVAT = true;
                    } else {
                        $scope.chxVAT = false;
                    }
                    if ($scope.model.data.nbt) {
                        $scope.chxNBT = true;
                    } else {
                        $scope.chxNBT = false;
                    }
                    $scope.ui.selectedDetailIndex = purchaseOrder.indexNo;
                    $scope.model.data.approvedDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#approvedDate');

                };
                $scope.ui.focus = function (textId) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(textId))[0].focus();
                    }, 10);
                };
                $scope.ui.delete = function (indexNo) {
                    $scope.model.delete(indexNo);
                    if ($scope.model.data.purchaseOrderItemList.length === 0) {
                        if (!$scope.model.tempData.netValue) {
                            $scope.chxNBT = false;
                            $scope.chxVAT = false;
                            $scope.model.data.nbt = 0;
                            $scope.model.data.vat = 0;
                        }
                    }
                };
                $scope.ui.discard = function () {
                    ConfirmPane.dangerConfirm("Discard All Changes !")
                            .confirm(function () {
                                $scope.model.discard();
                                $scope.chxNBT = false;
                                $scope.chxVAT = false;
                                Notification.success('Discarded All Changes');
                                
                            })
                            .discard(function () {
                                console.log('discard fail');
                            });

                };
                $scope.ui.edit = function (indexNo) {
                    $scope.model.edit(indexNo);
                    if ($scope.model.data.purchaseOrderItemList.length === 0) {
                        if (!$scope.model.tempData.netValue) {
                            $scope.chxNBT = false;
                            $scope.chxVAT = false;
                            $scope.model.data.nbt = 0;
                            $scope.model.data.vat = 0;
                        }
                    }
                };
                $scope.ui.addData = function () {
                    $scope.model.addData();
                };
                $scope.ui.checkBoxNBTFunction = function () {
                    console.log('checkBoxNBTFunction');
                    if ($scope.chxNBT) {
                        $scope.model.data.nbt = 2;
                    } else {
                        $scope.model.data.nbt = 0;
                    }
                    $scope.ui.calculateNBT();
                };
                $scope.ui.checkBoxVATFunction = function () {
                    console.log('checkBoxVATFunction');
                    if ($scope.chxVAT) {
                        $scope.model.data.vat = 15;
                    } else {
                        $scope.model.data.vat = 0;
                    }
                    $scope.ui.calculateVAT($scope.model.data.vat);
                };
                $scope.ui.calculateNBT = function () {
                    $scope.model.data.nbtValue = ($scope.model.data.itemValue * $scope.model.data.nbt) / 100;
                    $scope.model.data.grandTotal = $scope.model.data.itemValue + $scope.model.data.nbtValue;
                    $scope.model.data.vatValue = null;
                    $scope.model.data.vat = null;
                };
                $scope.ui.calculateVAT = function (vatRate) {
                    var nbtValue = $scope.model.data.nbtValue;

                    if (!$scope.model.data.nbtValue) {
                        nbtValue = 0.00;
                    }
                    $scope.model.data.vatValue = (($scope.model.data.itemValue + nbtValue) * vatRate) / 100;
                    $scope.model.data.grandTotal = $scope.model.data.itemValue + nbtValue + $scope.model.data.vatValue;
                };
                $scope.ui.calculatedValue = function () {
                    $scope.model.tempData.value = $scope.model.tempData.qty * $scope.model.tempData.price;
                    $scope.model.tempData.discountValue = 0;
                    $scope.model.tempData.discount = 0;
                    $scope.model.tempData.netValue = $scope.model.tempData.value;
                };
                $scope.ui.calculateDiscountWithRate = function () {
                    $scope.model.tempData.discountValue = ($scope.model.tempData.value * $scope.model.tempData.discount) / 100;
                    $scope.model.tempData.netValue = $scope.model.tempData.value - $scope.model.tempData.discountValue;
                };
                $scope.ui.calculateDiscountWithValue = function () {
                    $scope.model.tempData.discount = ($scope.model.tempData.discountValue * 100) / $scope.model.tempData.value;
                    $scope.model.tempData.netValue = $scope.model.tempData.value - $scope.model.tempData.discountValue;
                };
                $scope.ui.priceChange = function () {
                    if ($scope.model.tempData.qty) {
                        $scope.model.tempData.value = $scope.model.tempData.qty * $scope.model.tempData.price;
                        $scope.model.tempData.netValue = $scope.model.tempData.value;
                    } else {
                        $scope.model.tempData.value = 0.00;
                    }
                    $scope.model.tempData.discountValue = 0.00;
                    $scope.model.tempData.discount = 0.00;
                };
                $scope.ui.callAddData = function () {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        $scope.ui.addData();
                    }
                };
                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Save Purchase Order Request !")
                            .confirm(function () {
                                $scope.model.save()
                                        .then(function () {
                                            $scope.ui.mode = "NEW";
                                            Notification.success("Purchase Order Approved !");
                                            $scope.chxNBT = false;
                                            $scope.chxVAT = false;
                                        });
                            })
                            .discard(function () {
                                Notification.error("Purchase Order Approved Fail !");
                                console.log('fail');
                            });
                };

                $scope.init = function () {
                    $scope.ui.mode = 'NEW';
                };

                $scope.init();
            });
}());

