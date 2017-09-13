(function () {
    angular.module("grnApproveModule", ['ui.bootstrap']);
    angular.module("grnApproveModule")
            .controller("grnApproveController", function ($scope, GrnApproveModel, $timeout, $filter, Notification, ConfirmPane) {
                $scope.model = new GrnApproveModel();
                $scope.ui = {};
                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    //set current date
//                    $scope.ui.focus('#date');
                    $scope.model.data.approveDate = $filter('date')(new Date(), 'yyyy-MM-dd');

                };


                $scope.ui.selectGrn = function ($index, indexNo) {
                    $scope.model.selectGrn($index, indexNo);
                };
                $scope.ui.edit = function (index) {
                    $scope.model.edit(index);
                    console.log(index);
                };
                $scope.ui.addData = function () {
                    $scope.model.addData();
                };
                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Do you want to Approve this GRN !")
                            .confirm(function () {
                                $scope.model.save();
                                $scope.ui.mode = 'IDEAL';
                                $scope.chxNBT = false;
                                $scope.chxVAT = false;

                            })
                            .discard(function () {
                                console.log('fail');
                            });
                };
                $scope.ui.discard = function () {
//                    $scope.model.discard();
                };
                $scope.ui.valueCalculater = function (price) {
                    $scope.model.tempData.value = price * $scope.model.tempData.qty;
                    $scope.model.tempData.netValue = $scope.model.tempData.value;
                    $scope.model.tempData.discount = 0;
                    $scope.model.tempData.discountValue = 0;
                };
                $scope.ui.discountCalculator = function () {
                    $scope.model.tempData.discountValue = ($scope.model.tempData.value * $scope.model.tempData.discount) / 100;
                    $scope.model.tempData.netValue = $scope.model.tempData.value - $scope.model.tempData.discountValue;
                };
                $scope.ui.discountValueCalculator = function () {
                    $scope.model.tempData.discount = ($scope.model.tempData.discountValue * 100) / $scope.model.tempData.value;
                    $scope.model.tempData.netValue = $scope.model.tempData.value - $scope.model.tempData.discountValue;
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
                    $scope.ui.calculateVAT();
                };
                $scope.ui.calculateNBT = function () {
                    $scope.model.data.nbtValue = ($scope.model.data.amount * $scope.model.data.nbt) / 100;
                    $scope.model.data.grandAmount = $scope.model.data.amount + $scope.model.data.nbtValue;
                    $scope.model.data.vatValue = null;
                    $scope.model.data.vat = null;
                    $scope.chxVAT = false;
                };
                $scope.ui.calculateVAT = function () {
                    var nbtValue = $scope.model.data.nbtValue;

                    if (!$scope.model.data.nbtValue) {
                        nbtValue = 0.00;
                    }
                    $scope.model.data.vatValue = (($scope.model.data.amount + nbtValue) * $scope.model.data.vat) / 100;
                    $scope.model.data.grandAmount = $scope.model.data.amount + nbtValue + $scope.model.data.vatValue;
                };


                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                    $scope.$watch("[model.mainList]", function (newVal, oldVal) {
                        $scope.model.calculateMainListValue();
                    }, true);
                    $scope.$watch("[model.data.grnItemList]", function (newVal, oldVal) {
                        $scope.model.calculateDataValue();
                    }, true);

                };

                $scope.init();
            });
}());



