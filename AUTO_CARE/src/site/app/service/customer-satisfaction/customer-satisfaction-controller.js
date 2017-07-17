(function () {
//module
    angular.module("customerSatisfactionModule", ['ui.bootstrap']);
    //controller
    angular.module("customerSatisfactionModule")
            .controller("customerSatisfactionController", function ($scope, $filter, customerSatisfactionModel, ConfirmPane, Notification) {
                $scope.model = new customerSatisfactionModel();
//                $scope.model = {};
                $scope.ui = {};

                $scope.ui.mode = 'IDEAL';
                $scope.range = 0;

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = 'IDEAL';
                    $scope.range = 0;
                };

            });
}());


