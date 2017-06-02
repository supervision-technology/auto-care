(function () {
    angular.module("grnModule", ['ui.bootstrap']);
    angular.module("grnModule")
            .controller("grnController", function ($scope, $timeout, $filter, GrnModel, Notification, ConfirmPane) {
                $scope.model = new GrnModel();
                $scope.ui = {};
                $scope.filterList = [];

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                };
                $scope.ui.selectPurchaseOrder = function (indexNo, number) {
                    $scope.model.selectPurchaseOrder(indexNo, number);

                };
                $scope.ui.select = function (indexNo) {
                    $scope.model.select(indexNo);
                };
                $scope.ui.editItemQty = function (indexNo) {
                    $scope.model.editItemQty(indexNo);
                };
                $scope.ui.addData = function () {
                    $scope.model.addData();
                };
                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Do you want to save GRN Receive !")
                            .confirm(function () {
                                $scope.model.save();
                            })
                            .discard(function () {
                                console.log('fail');
                            });
                };
                $scope.ui.deleteItem = function (index) {
                    console.log('deleteItem');
                    $scope.model.deleteItem(index);
                };
                $scope.ui.discard = function () {
                    $scope.model.discard();
                };

                $scope.ui.changeSupplier = function () {
                    $scope.model.changeSupplier();
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';

                    $scope.$watch("model.purchaseOrderItemList", function () {
                        $scope.model.itemTotal();
//                        console.log("$scope.model.pendingPurchaseOrderList");
//                        console.log($scope.model.pendingPurchaseOrderList);
                    });


                };
//                $scope.ui.filterMainList = function () {
//                    $scope.filterList = $scope.model.pendingPurchaseOrderList.filter(function (data) {
//                        return (true);
//                    });
//                    console.log("$scope.filterList");
//                    console.log($scope.filterList);

//                };

                $scope.init();
//                $scope.ui.filterMainList();

            });
}());



