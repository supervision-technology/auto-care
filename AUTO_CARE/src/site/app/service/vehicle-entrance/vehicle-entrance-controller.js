(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope,vehicleEntranceModel , $timeout) {
                $scope.model = new vehicleEntranceModel();      
        
                $scope.ui = {};
                $scope.ui.searchUi;
                $scope.ui.nextButton = function (buttonIndex) {
                    if (buttonIndex === 'fristButton') {
                        $scope.ui.searchUi = 'ur2';
                    } else if (buttonIndex === 'secondButton') {
                        $scope.ui.searchUi = 'ur3';
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.ui.searchUi = 'ur4';
                    }
                };
                
                $scope.ui.backButton = function (buttonIndex) {
                    if (buttonIndex === 'secondButton') {
                        $scope.ui.searchUi = 'ur1';
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.ui.searchUi = 'ur2';
                    } else if (buttonIndex === 'thirdButton') {
                        $scope.ui.searchUi = 'ur4';
                    }
                };

                $scope.ui.init = function () {
                    $scope.ui.searchUi = 'ur1';
                };
                $scope.ui.init();
            });
}());