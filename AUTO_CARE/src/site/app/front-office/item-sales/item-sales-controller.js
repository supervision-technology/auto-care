(function () {
    angular.module("itemSalesModule", ['ui.bootstrap']);
    angular.module("itemSalesModule")
            .controller("itemSalesController", function ($scope, $timeout, $filter, optionPane, itemSalesModel, Notification, ConfirmPane) {
                $scope.model = new itemSalesModel();
                $scope.ui = {};
                
                 
                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());
