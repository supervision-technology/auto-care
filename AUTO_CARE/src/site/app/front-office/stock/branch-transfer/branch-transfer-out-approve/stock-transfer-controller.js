(function () {
    angular.module("stockTransferBranchOutApproveModule", ['ui.bootstrap']);
    angular.module("stockTransferBranchOutApproveModule")
            .controller("stockTransferBranchOutApproveController", function ($scope, $filter,stockTransferBranchOutApproveModel, $timeout, Notification, ConfirmPane) {
                $scope.model = new stockTransferBranchOutApproveModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.inDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//                    $scope.model.data.deliverDate= $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#toBranch');
                };

                $scope.ui.edit = function (indexNo) {
//                    $scope.model.edit(indexNo);
                };
              
                $scope.ui.getPendingTransferOrders = function (branch) {
                    $scope.model.getPendingTransferOrders(branch);
                };
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

                $scope.ui.delete = function (indexNo) {
//                    $scope.model.delete(indexNo);
                };

                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Complete Stock Transfer Order Request !")
                            .confirm(function () {
                                $scope.model.saveStockTransferOutApprove()
                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
//                                            $scope.model.clear();
                                           
                                        });
                            })
                            .discard(function () {
                                Notification.error("Purchase Order Request Save Fail !");
                                console.log('fail');
                            });
                };

                $scope.ui.removeAllData = function () {
                  $scope.model.removeAllData();
                  $scope.ui.getPendingTransferOrders($scope.model.data.fromBranch);
                };
                $scope.ui.focus = function (textId) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(textId))[0].focus();
                    }, 10);
                };
                $scope.ui.validateBarcode = function (event) {
//                    var key = event ? event.keyCode || event.which : 13;
//                    if (key === 13) {
//                        if ($scope.model.data.supplier) {
//
//                            $scope.model.validateBarcode($scope.model.tempData.barcode);
//                            if ($scope.model.tempData.item) {
//                                $scope.ui.focus('#price');
//                            } else {
//                                Notification.error("Item not found!");
//                                $scope.ui.focus('#barcode');
//                            }
//                        } else {
//                            Notification.error("Select Supplier for add Item");
//                        }
//                    }
                };
                $scope.ui.setItemDetail = function (indexNo) {
//                    if ($scope.model.data.supplier) {
//
//                        $scope.model.setItemDetail(indexNo);
//                        if ($scope.model.tempData.item) {
//                            $scope.ui.focus('#price');
//                        } else {
//                            $scope.ui.focus('#item');
//                        }
//                    } else {
//                        Notification.error("Select Supplier for add Item");
//
//                    }
                };
                $scope.ui.loadItem = function (supplier) {

//                    if ($scope.model.data.purchaseOrderItemList.length === 0) {
//                        $scope.model.loadItem(supplier);
//                    } else {
//                        ConfirmPane.primaryConfirm("Do you want to change Supplier !")
//                                .confirm(function () {
//                                    $scope.model.data= {};
//                                    $scope.model.tempData = {};
//                                    $scope.model.summaryData = {};
//                                    $scope.model.supplierItems = [];
//                                    $scope.chxNBT=false;
//                                    $scope.chxVAT=false;
//                                    Notification.success("Supplier Chaneged !");
//
//                                })
//                                .discard(function () {
//                                    $scope.model.data.supplier = null;
//                                    console.log('fail');
//                                });
//                    }
                };
                
                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

