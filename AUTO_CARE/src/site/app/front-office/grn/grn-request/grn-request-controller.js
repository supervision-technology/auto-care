(function () {
    angular.module("grnModule", ['ui.bootstrap']);
    angular.module("grnModule")
            .controller("grnController", function ($scope, $timeout, $filter, GrnModel, Notification, ConfirmPane) {
                $scope.model = new GrnModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    //set current date
//                    $scope.ui.focus('#date');
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                };
                $scope.ui.selectPurchaseOrder = function (indexNo) {
                    $scope.model.selectPurchaseOrder(indexNo);
//                    $scope.ui.selectedDetailIndex = indexNo;

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
                    $scope.model.save();
                };
                $scope.ui.discard = function () {
                    $scope.model.discard();
                };
                
                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';

                };

                $scope.init();
            });
}());



