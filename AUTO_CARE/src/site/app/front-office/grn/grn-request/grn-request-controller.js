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
                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                    $scope.$watch("model.data.grnItemList", function () {
                        $scope.model.summaryValueCalculator();
                    });
                };

                $scope.init();
            });
}());



