
(function () {
    angular.module("stockTransferInternalInModule", ['ui.bootstrap']);
    angular.module("stockTransferInternalInModule")
            .controller("stockTransferInternalInController", function ($scope, $filter, stockTransferInternalInModel, $timeout, Notification, ConfirmPane) {
                $scope.model = new stockTransferInternalInModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.inDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#toBranch');
                };
                 $scope.ui.removeAllData = function () {
                  $scope.model.removeAllData();
                };
                $scope.ui.getPendingTransferOrders=function (toBranch,toStock){
                     $scope.model.getPendingTransferOrders(toBranch,toStock);
                }
                $scope.ui.selectTransferOrder = function (index) {
                    $scope.ui.selectedDetailIndex=index;
                    $scope.model.selectTransferOrder(index);
                };
                 $scope.ui.unitCheck = function (index) {
                    $scope.model.unitCheck(index);
                };
                $scope.ui.unitUncheck = function (index) {
                    $scope.model.unitUncheck(index);
                };

                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Save Internal Transfer In !")
                            .confirm(function () {
                                $scope.model.saveInternalTransferIn()
                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
                                        });
                            })
                            .discard(function () {
                                Notification.error("External Transfer Save Fail !");
                                console.log('fail');
                            });
                };
////
//               
                $scope.ui.focus = function (textId) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(textId))[0].focus();
                    }, 10);
                };
//                $scope.ui.validateBarcode = function (event) {
//                    var key = event ? event.keyCode || event.which : 13;
//                    if (key === 13) {
//                        if ($scope.model.data.fromBranch) {
//                            if ($scope.model.data.fromStore) {
//                            if ($scope.model.data.toStore) {
//
//                                $scope.model.validateBarcode($scope.model.tempData.barcode);
//                                if ($scope.model.tempData.item) {
//                                    $scope.ui.focus('#qty');
//                                } else {
//                                    Notification.error("Item not found!");
//                                    $scope.ui.focus('#barcode');
//                                }
//                            } else {
//                                Notification.error("Select ToStock for add Item");
//                            }
//                            } else {
//                                Notification.error("Select FromStock for add Item");
//                            }
//                        } else {
//                            Notification.error("Select Current Branch for add Item");
//                        }
//                    }
//                };
//                $scope.ui.focusAddData = function (event) {
//                     var key = event ? event.keyCode || event.which : 13;
//                    if (key === 13) {
//                        $scope.ui.addData();
//                    }
//                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

