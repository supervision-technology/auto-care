(function () {
    angular.module("purchaseOrderApproveModule", ['ui.bootstrap']);
    angular.module("purchaseOrderApproveModule")
            .controller("purchaseOrderApproveController", function ($scope, $filter, $uibModal, $sce, $timeout, purchaseOrderApproveModel, PurchaseOrderRequestService, Notification, ConfirmPane) {
                $scope.model = new purchaseOrderApproveModel();
                $scope.ui = {};
                $scope.ui.selectedDetailIndex = -1;

                $scope.printModel = {};

                $scope.printModel.currentReportGroup = {};
                $scope.printModel.currentReport = {
                    "report": null,
                    "parameters": null,
                    "parameterValues": {}
                };

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
                    if ($scope.model.data.indexNo) {
                        ConfirmPane.dangerConfirm("Delete Selected Purchase Order !")
                                .confirm(function () {
                                    $scope.model.discard();
                                    $scope.chxNBT = false;
                                    $scope.chxVAT = false;
                                })
                                .discard(function () {
                                    console.log('discard fail');
                                });
                    } else {
                        Notification.error('Please Select Porchase Order to Delete !')
                    }

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
                    $scope.model.data.nbtValue = (($scope.model.data.itemValue * $scope.model.data.nbt) / 100).toFixed(2);
                    $scope.model.data.grandTotal = parseFloat($scope.model.data.itemValue) + parseFloat($scope.model.data.nbtValue);
                    $scope.model.data.vatValue = 0;
                    $scope.model.data.vat = 0;
                };
                $scope.ui.calculateVAT = function (vatRate) {
                    var nbtValue = $scope.model.data.nbtValue;

                    if (!$scope.model.data.nbtValue) {
                        nbtValue = 0.00;
                    }
                    $scope.model.data.vatValue = (((parseFloat($scope.model.data.itemValue) + parseFloat(nbtValue)) * parseFloat(vatRate)) / 100).toFixed(2);
                    $scope.model.data.grandTotal = parseFloat($scope.model.data.itemValue) + parseFloat(nbtValue) + parseFloat($scope.model.data.vatValue);
                };
                $scope.ui.calculatedValue = function () {
                    $scope.model.tempData.value = ($scope.model.tempData.qty * $scope.model.tempData.price).toFixed(2);
                    $scope.model.tempData.discountValue = 0;
                    $scope.model.tempData.discount = 0;
                    $scope.model.tempData.netValue = $scope.model.tempData.value;
                };
                $scope.ui.calculateDiscountWithRate = function () {
                    $scope.model.tempData.discountValue = (($scope.model.tempData.value * $scope.model.tempData.discount) / 100).toFixed(2);
                    $scope.model.tempData.netValue = parseFloat($scope.model.tempData.value) - parseFloat($scope.model.tempData.discountValue);
                };
                $scope.ui.calculateDiscountWithValue = function () {
                    $scope.model.tempData.discount = (($scope.model.tempData.discountValue * 100) / $scope.model.tempData.value).toFixed(2);
                    $scope.model.tempData.netValue = parseFloat($scope.model.tempData.value) - parseFloat($scope.model.tempData.discountValue);
                };
                $scope.ui.priceChange = function () {
                    if ($scope.model.tempData.qty) {
                        $scope.model.tempData.value = ($scope.model.tempData.qty * $scope.model.tempData.price).toFixed(2);
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
                                        .then(function (data) {
                                            $scope.ui.mode = "NEW";
                                            Notification.success(data.number +" Purchase Order Approved !");
                                            $scope.chxNBT = false;
                                            $scope.chxVAT = false;
                                            ConfirmPane.successConfirm("Do You Want To Print Purchase Order !")
                                                    .confirm(function () {
                                                        $scope.ui.modalOpen(data.indexNo);
                                                    });
                                        });
                            })
                            .discard(function () {
                                Notification.error("Purchase Order Approved Fail !");
                                console.log('fail');
                                
                            });
                };

                $scope.ui.modalOpen = function (indexNo) {

//---------------------------------- invoice ----------------------------------
                    var reportName = "Purchase_Order";
                    //get report details
                    PurchaseOrderRequestService.reportData(reportName)
                            .success(function (data) {
                                $scope.printModel.currentReport.report = data;

                                //get report paramiters
                                PurchaseOrderRequestService.listParameters(data)
                                        .success(function (data) {
                                            $scope.printModel.currentReport.parameters = data;
                                        });

                                //set paramiters values
                                $scope.printModel.currentReport.parameterValues.PO_NO = indexNo;

                                //view reports
                                PurchaseOrderRequestService.viewReport(
                                        $scope.printModel.currentReport.report,
                                        $scope.printModel.currentReport.parameters,
                                        $scope.printModel.currentReport.parameterValues
                                        )
                                        .success(function (response) {
                                            var file = new Blob([response], {type: 'application/pdf'});
                                            var fileURL = URL.createObjectURL(file);

                                            $scope.content = $sce.trustAsResourceUrl(fileURL);

                                            $uibModal.open({
                                                animation: true,
                                                ariaLabelledBy: 'modal-title',
                                                ariaDescribedBy: 'modal-body',
                                                templateUrl: 'purchase_order_popup.html',
                                                scope: $scope,
                                                size: 'lg'
                                            });

                                        });
                            });
//---------------------------------- end invoice ----------------------------------
                };

                $scope.init = function () {
                    $scope.ui.mode = 'NEW';
                };

                $scope.init();
            });
}());

