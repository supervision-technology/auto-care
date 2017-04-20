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
                    Notification.success('success message');
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
                    
                    $scope.model.tempData.value=$scope.model.tempData.qty*$scope.model.tempData.price;

                };




                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

