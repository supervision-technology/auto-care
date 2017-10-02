(function () {
    angular.module("purchaseOrderRequestModule", ['ui.bootstrap']);
    angular.module("purchaseOrderRequestModule")
            .controller("purchaseOrderRequestController", function ($scope, $rootScope, $uibModal, $uibModalStack, $filter, $timeout, purchaseOrderRequestModel, Notification, ConfirmPane, ModalDialog, optionPane) {
                $scope.model = new purchaseOrderRequestModel();
                $scope.ui = {};
                $scope.selectedIndex = -1;

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.clear();
                    $scope.chxNBT = false;
                    $scope.chxVAT = false;

                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.model.data.deliverDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#date');
                };

                $scope.ui.edit = function (indexNo) {
                    $scope.model.edit(indexNo);
                };
                $scope.ui.removeAll = function () {
                    ConfirmPane.primaryConfirm("Do you want to remove all !")
                            .confirm(function () {
                                $scope.model.removeAll();
                                $scope.ui.mode="IDEAL";
                            });
                };
                $scope.ui.selectRequiredItems=function (){
                  $scope.model.selectRequiredItems();  
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.model.delete(indexNo);
                };
                $scope.ui.loadPendingPurchaseOrderByNumber = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        var number = $scope.model.loadPendingPurchaseOrderByNumber();

                        $timeout(function () {
                            $scope.chxVAT = $scope.model.data.vat ? true : false;
                            $scope.chxNBT = $scope.model.data.nbt ? true : false;
                        }, 100);
                    }
                };

                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Save Purchase Order Request !")
                            .confirm(function () {
                                $scope.model.savePurchaseOrderRequest()
                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
                                            $scope.model.clear();
                                            $scope.chxNBT = false;
                                            $scope.chxVAT = false;
                                            Notification.success("Purchase Order Request Save Success !");
                                        });
                            })
                            .discard(function () {
                                Notification.error("Purchase Order Request Save Fail !");
                                console.log('fail');
                            });
                };

                $scope.ui.addData = function () {
                    $scope.model.addData();
                    $scope.ui.focus('#barcode');
                };
                $scope.ui.focus = function (textId) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(textId))[0].focus();
                    }, 10);
                };
                $scope.ui.validateBarcode = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        if ($scope.model.data.supplier) {

                            $scope.model.validateBarcode($scope.model.tempData.barcode);
                            if ($scope.model.tempData.item) {
                                $scope.ui.focus('#qty');
                            } else {
                                Notification.error("Item not found!");
                                $scope.ui.focus('#barcode');
                            }
                        } else {
                            Notification.error("Select Supplier for add Item");
                        }
                    }
                };
                $scope.ui.setItemDetail = function (indexNo) {
                    if ($scope.model.data.supplier) {

                        $scope.model.setItemDetail(indexNo);
                        if ($scope.model.tempData.item) {
                            $scope.ui.focus('#qty');
                        } else {
                            $scope.ui.focus('#item');
                        }
                    } else {
                        Notification.error("Select Supplier for add Item");

                    }
                };
                $scope.ui.loadItem = function (supplier) {

                    if ($scope.model.data.purchaseOrderItemList.length === 0) {
                        $scope.model.loadItem(supplier);
                    } else {
                        ConfirmPane.primaryConfirm("Do you want to change Supplier !")
                                .confirm(function () {
                                    $scope.model.data = {};
                                    $scope.model.tempData = {};
                                    $scope.model.summaryData = {};
                                    $scope.model.supplierItems = [];
                                    $scope.chxNBT = false;
                                    $scope.chxVAT = false;
                                    Notification.success("Supplier Chaneged !");

                                })
                                .discard(function () {
                                    $scope.model.data.supplier = null;
                                    console.log('fail');
                                });
                    }
                };
                $scope.ui.calculatedValue = function () {
                    $scope.model.tempData.value = (parseFloat($scope.model.tempData.qty) * parseFloat($scope.model.tempData.price)).toFixed(2);
//                    $scope.model.tempData.discountValue = 0;
//                    $scope.model.tempData.discount = 0;
                    $scope.model.tempData.netValue = $scope.model.tempData.value;

                    $scope.ui.calculateDiscountWithRate();
                };
                $scope.ui.calculateDiscountWithRate = function () {
                    $scope.model.tempData.discountValue = ((parseFloat($scope.model.tempData.value) * parseFloat($scope.model.tempData.discount)) / 100).toFixed(2);
                    $scope.model.tempData.netValue = (parseFloat($scope.model.tempData.value) - parseFloat($scope.model.tempData.discountValue)).toFixed(2);
                };
                $scope.ui.calculateDiscountWithValue = function () {
                    $scope.model.tempData.discount = ((parseFloat($scope.model.tempData.discountValue) * 100) / parseFloat($scope.model.tempData.value)).toFixed(2);
                    $scope.model.tempData.netValue = (parseFloat($scope.model.tempData.value) - parseFloat($scope.model.tempData.discountValue)).toFixed(2);
                };
                $scope.ui.callAddData = function () {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        $scope.ui.addData();
                    }
                };
                $scope.ui.checkBoxNBTFunction = function () {
                    if ($scope.chxNBT) {
                        $scope.model.data.nbt = 2;
                    } else {
                        $scope.model.data.nbt = 0;
                    }
                    $scope.ui.calculateNBT();
                };
                $scope.ui.checkBoxVATFunction = function () {
                    if ($scope.chxVAT) {
                        $scope.model.data.vat = 15;
                    } else {
                        $scope.model.data.vat = 0;
                    }
                    $scope.ui.calculateVAT($scope.model.data.vat);
                };

                $scope.ui.calculateNBT = function () {
                    $scope.model.data.nbtValue = ((parseFloat($scope.model.data.itemValue) * parseFloat($scope.model.data.nbt)) / 100).toFixed(2);
                    $scope.model.data.grandTotal = (parseFloat($scope.model.data.itemValue) + parseFloat($scope.model.data.nbtValue)).toFixed(2);
                    $scope.model.data.vatValue = null;
                    $scope.model.data.vat = null;
                    $scope.chxVat = false;
                };

                $scope.ui.calculateVAT = function (vatRate) {
                    var nbtValue = $scope.model.data.nbtValue;
                    if (!$scope.model.data.nbtValue) {
                        nbtValue = 0.00;
                    }
                    $scope.model.data.vatValue = (((parseFloat($scope.model.data.itemValue) + parseFloat(nbtValue)) * parseFloat(vatRate)) / 100).toFixed(2);
                    $scope.model.data.grandTotal = (parseFloat($scope.model.data.itemValue) + parseFloat(nbtValue) + parseFloat($scope.model.data.vatValue)).toFixed(2);
                };

                $scope.modalOpen = function () {
                    if ($scope.model.tempData.item) {
                        $scope.model.getBranchesStock();
                        $timeout(function () {
                            $rootScope.getBranchesStockList = $scope.model.branchesStockList;
                            $uibModal.open({
                                animation: true,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: 'app/front-office/purchase-order/popup-dialog/branch-stock-popup.html',
                                controller: 'purchaseOrderRequestController',
                                size: 'lg'
                            });
                        }, 1000);
                    } else {
                        Notification.error("Select a Item for View Branches Stock Quantity");
                    }
                };

                $scope.dismissAllModel = function () {
                    $uibModalStack.dismissAll();

                };
                $scope.ui.selectAllReOrderItem = function (reOrderIndexNo) {
                    $scope.model.selectAllReOrderItem(reOrderIndexNo);

                };
                $scope.ui.editReOrderItem = function (reOrderIndexNo) {
                    $scope.model.editReOrderItem(reOrderIndexNo);

                };
                $scope.ui.setEditableReOrderItem = function () {
                    $scope.model.setEditableReOrderItem();

                };
                $scope.ui.selectReOrderItemIndex = function (key) {
                    if ($scope.selectedIndex === key) {
                        $scope.selectedIndex = -1;
                    } else {
                        $scope.selectedIndex = key;
                    }
                };
                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

