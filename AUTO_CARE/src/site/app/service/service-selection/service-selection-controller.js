(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope, ServiceSelectionModel, Notification) {
                $scope.model = new ServiceSelectionModel();
                $scope.ui = {};

                $scope.selectedJobCardIndexNo = null;
                $scope.selectVehicleType = null;
                $scope.selectVehiclePriceCategory = null;

                $scope.ui.selectedJobCardRow = function ($index, jobCard) {
                    $scope.selectedJobCardRow = $index;
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;
                    $scope.selectVehicleType = $scope.model.vehicleData(jobCard.vehicle).type;
                    $scope.selectVehiclePriceCategory = jobCard.priceCategory;
                    $scope.model.getJobItemHistory(jobCard.indexNo);
                };

                $scope.packageSelectionDetail = function ($index, package) {
                    //get package items
                    $scope.model.getPackageItems(package);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectPackagePosition = $scope.selectPackagePosition === $index ? -1 : $index;
                };

                $scope.ui.serviceSelectionDetail = function ($index, service) {
                    //get item units
                    $scope.model.getItemUnits(service, $scope.selectVehiclePriceCategory);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectServicePosition = $scope.selectServicePosition === $index ? -1 : $index;
                };

                $scope.ui.itemSelectionDetail = function ($index, item) {
                    //get item units
                    $scope.model.getItemUnits(item, $scope.selectVehiclePriceCategory);
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.selectItemPosition = $scope.selectItemPosition === $index ? -1 : $index;
                };

                $scope.addPackageAndServiceItem = function (item, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addPackageAndServiceItem(item, type, $scope.selectedJobCardIndexNo);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.addNormalItem = function (item, qty) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemCheck(item);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addNormalItem(item, qty, $scope.selectedJobCardIndexNo);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.addItemUnit = function (itemUnit, type) {
                    if ($scope.selectedJobCardIndexNo) {
                        var itemStatus = $scope.model.duplicateItemUnitCheck(itemUnit);
                        if (angular.isUndefined(itemStatus)) {
                            $scope.model.addItemUnit(itemUnit, type, $scope.selectedJobCardIndexNo);
                        } else {
                            Notification.error("this item is allrday exsist");
                        }
                    } else {
                        Notification.error("select vehicle");
                    }
                };

                $scope.ui.deleteSelectDetails = function ($index) {
                    $scope.model.deleteSelectDetails($index);
                };

            });
}());