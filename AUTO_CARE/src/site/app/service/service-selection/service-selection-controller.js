(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, ServiceSelectionModel) {
                $scope.model = new ServiceSelectionModel();
                $scope.ui = {};

                $scope.packageSelectionDetail = function ($index, package) {
                    //get package items
                    $scope.model.getPackageItems(package);
                    $scope.selectedPackageItemRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.selectPackagePosition = $scope.selectPackagePosition == $index ? -1 : $index;
                };

                $scope.addPackageItem = function (package) {

                };
                
                $scope.addItem = function (item){
                    
                };

                $scope.ui.init = function () {

                };

                $scope.ui.init();
            });
}());