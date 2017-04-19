(function () {
    angular.module("purchaseOrderRequestModule", ['ui.bootstrap']);
    angular.module("purchaseOrderRequestModule")
            .controller("purchaseOrderRequestController", function ($scope,$filter,$timeout, purchaseOrderRequestModel, Notification, ConfirmPane) {
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




                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

