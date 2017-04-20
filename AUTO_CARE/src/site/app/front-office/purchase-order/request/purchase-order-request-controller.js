(function () {
    angular.module("purchaseOrderRequestModule", ['ui.bootstrap']);
    angular.module("purchaseOrderRequestModule")
            .controller("purchaseOrderRequestController", function ($scope, $filter, $timeout, purchaseOrderRequestModel, Notification, ConfirmPane) {
                $scope.model = new purchaseOrderRequestModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#date');
                    console.log($scope.model.data.date);
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = 'IDEAL';
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
                        $scope.model.validateBarcode($scope.model.tempData.barcode);
                        if ($scope.model.tempData.item) {
                            $scope.ui.focus('#price');
                        } else {
                            Notification.error("Item not found!");
                            $scope.ui.focus('#barcode');
                        }
                    }
                };
                $scope.ui.setItemDetail = function (indexNo) {
                    $scope.model.setItemDetail(indexNo);
                    if ($scope.model.tempData.item) {
                        $scope.ui.focus('#price');
                    } else {
                        $scope.ui.focus('#item');
                    }
                };
                $scope.ui.calculatedValue = function () {
                    $scope.model.tempData.value = $scope.model.tempData.qty * $scope.model.tempData.price;
                    $scope.model.tempData.discountValue = 0;
                    $scope.model.tempData.discount = 0;
                    $scope.model.tempData.netValue = $scope.model.tempData.value;
                };
                $scope.ui.calculateDiscountWithRate = function () {
                    console.log('calculated discount');
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

                $scope.ui.calculateNBT = function () {
                    $scope.model.data.nbtValue = ($scope.model.data.itemValue * $scope.model.data.nbt) / 100;
                    $scope.model.data.grandTotal = $scope.model.data.itemValue + $scope.model.data.nbtValue;
                    $scope.model.data.vatValue = null;
                    $scope.model.data.vat = null;
                    console.log("a");
                };

                $scope.ui.calculateVAT = function () {
                    if ($scope.model.data.vat) {
                        $scope.model.data.vatValue = (($scope.model.data.itemValue + $scope.model.data.nbtValue) * $scope.model.data.nbt) / 100;
                        $scope.model.data.grandTotal = $scope.model.data.itemValue + $scope.model.data.nbtValue + $scope.model.data.vatValue;
                    }
                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

