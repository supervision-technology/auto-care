(function () {
    //module
    angular.module("monthlyGreenLeavesSummryModule", []);

    //controller
    angular.module("monthlyGreenLeavesSummryModule")
            .controller("monthlyGreenLeavesSummryController", function ($scope) {
                $scope.open = function () {
                    $scope.showModal = true;
                };
                
                $scope.cancel = function () {
                    $scope.showModal = false;
                };
            });
}());