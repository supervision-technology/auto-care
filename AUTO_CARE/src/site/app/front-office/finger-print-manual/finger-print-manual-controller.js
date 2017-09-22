(function () {
//module
    angular.module("fingerPrintModule", ['ui.bootstrap']);
    //controller
    angular.module("fingerPrintModule")
            .controller("fingerPrintController", function ($scope, fingerPrintModel) {
                $scope.model = new fingerPrintModel();
                $scope.ui = {};

                $scope.ui.save = function () {
                    $scope.model.save();
                };
                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';

                };
                $scope.ui.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };
                $scope.ui.changeDate = function () {
                    $scope.model.changeDate();
                };
                $scope.ui.init();
            });
}());
