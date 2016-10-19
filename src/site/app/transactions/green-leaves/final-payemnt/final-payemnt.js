(function () {
    //module
    angular.module("finalPaymentModule", []);

    //controller
    angular.module("finalPaymentModule")
            .controller("finalPaymentModuleController", function ($scope) {
                $scope.showBfAndCoinValues = true;
                //A /Payment,L/Installment,Fertilizer(P),Fertilizer(C),Tea,Savings,Other
                $scope.showOther = function () {
                    $scope.otherValues = true;
                    $scope.showGreenLeaveValues = false;
                    $scope.showBfAndCoinValues = false;
                };

                //GL Value
                $scope.showGLValues = function () {
                    $scope.showGreenLeaveValues = true;
                    $scope.otherValues = false;
                    $scope.showBfAndCoinValues = false;
                };

                //B/F,Coins
                $scope.showBfAndCoins = function () {
                    $scope.showBfAndCoinValues = true;
                    $scope.otherValues = false;
                    $scope.showGreenLeaveValues = false;
                };
            });
}());