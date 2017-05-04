(function () {
    angular.module("directGrnModule", ['ui.bootstrap']);
    angular.module("directGrnModule")
            .controller("directGrnController", function ($scope, $timeout, $filter, directGrnModel, Notification, ConfirmPane) {
                $scope.model = new directGrnModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    //set current date
                    $scope.ui.focus('#date');
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                };
//
                $scope.ui.validateBarcode = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        $scope.model.validateBarcode($scope.model.tempData.barcode);
                        if ($scope.model.tempData.item) {
                            $scope.ui.focus('#price');
                        } else {
                            Notification.error("Item not found!");
                            $scope.ui.focus('#barcode');
                        }
                    }
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
                    $scope.model.data.nbtValue = ($scope.model.data.amount * $scope.model.data.nbt) / 100;
                    $scope.model.data.grandAmount = $scope.model.data.amount + $scope.model.data.nbtValue;
                    $scope.model.data.vatValue = null;
                    $scope.model.data.vat = null;
                    $scope.chxVat = false;
                };

                $scope.ui.calculateVAT = function (vatRate) {
                    var nbtValue = $scope.model.data.nbtValue;
                    console.log('work');
                    if (!$scope.model.data.nbtValue) {
                        nbtValue = 0.00;
                    }
                    $scope.model.data.vatValue = (($scope.model.data.amount + nbtValue) * vatRate) / 100;
                    $scope.model.data.grandAmount = $scope.model.data.amount + nbtValue + $scope.model.data.vatValue;
                    console.log($scope.model.data.vat);
                    console.log(vatRate);
                };
//                $scope.ui.btnFocus = function (event) {
//                    var key = event ? event.keyCode || event.which : 13;
//                    if (key === 13) {
//                        var confirm = $scope.model.addData();
//                        console.log(confirm);
//                        $scope.ui.focus('#barcode');
//                    }
//                };
                $scope.ui.edit = function (indexNo) {
                    $scope.model.edit(indexNo);
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.model.delete(indexNo);
                };

                $scope.ui.addData = function () {
                    $scope.model.addData();
                    $scope.ui.focus('#barcode');
                };
//
                $scope.ui.focus = function (id) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(id))[0].focus();
                    }, 10);
                };
                $scope.ui.save = function () {
//                     $scope.model.saveDirectGrn();
                    ConfirmPane.primaryConfirm("Do you want to Save Direct GRN !")
                            .confirm(function () {
                                $scope.model.saveDirectGrn()
                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
                                            Notification.success("Direct GRN Save Success !");
                                            $scope.chxVat = false;
                                            $scope.chxNbt = false;
                                        });
                            })
                            .discard(function () {
                                Notification.error("Direct GRN Save Fail !");
                                console.log('fail');
                            });
                };
//
//                $scope.ui.save = function () {
//                    ConfirmPane.primaryConfirm("Save Good Receive Note !")
//                        .confirm(function () {
//                            $scope.model.saveGrn()
//                                    .then(function () {
//                                        $scope.ui.mode = "IDEAL";
//                                        $scope.model.clear();
//                                        Notification.success("Grn Save Success !");
//                                    });
//                        })
//                        .discard(function () {
//                             Notification.error("Grn Save Fail !");
//                            $scope.ui.mode = 'NEW';
//                            console.log('fail');
//                        });
//                };
//                
//                $scope.ui.netValueCalculator = function () {
//                    $scope.model.netValueCalculator();
//                };
//                
//                $scope.ui.discountRate = function () {
//                    $scope.model.discountRate();
//                };
//                
//                $scope.ui.edit = function (index) {
//                    $scope.model.edit(index);
//                };
//                
//                $scope.ui.delete = function (index) {
//                    $scope.model.delete(index);
//                };

//               

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                    console.log('12345');
//                    $scope.$watch("model.data.grnItemList", function () {
//                        $scope.model.summaryValueCalculator();
//                    });
                };

                $scope.init();
            });
}());



