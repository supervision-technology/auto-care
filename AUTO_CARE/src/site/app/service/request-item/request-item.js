(function () {
//module
    angular.module("requestItemModule", []);
    //controller
    angular.module("requestItemModule")
            .controller("requestItemController", function ($scope) {

                $scope.selectionsFunction = true;
                $scope.vehicle = [
                    {
                        bayName: "Cleaning Bay",
                        count: "2",
                        image: "/img/05.png",
                        name: "Kasun Chamara",
                        number: "UG 7256"
                    },
                    {
                        bayName: "Washing Bay",
                        count: "1",
                        image: "/img/01.png",
                        name: "Nidura Prageeth",
                        number: "US 5333"
                    },
                    {
                        bayName: "Vaxing Bay",
                        count: "0",
                        image: "/img/02.png",
                        name: "Kavish Manjitha",
                        number: "HG 0233"
                    },
                    {
                        bayName: "Vaxing Bay",
                        count: "0",
                        image: "/img/02.png",
                        name: "Mohan Jayamuni",
                        number: "HG 0233"
                    },
                    {
                        bayName: "Vaxing Bay",
                        count: "0",
                        image: "/img/02.png",
                        name: "Akila Sasanka",
                        number: "HG 0233"
                    },
                ];
                $scope.selectedRow = null;
                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle == $index ? -1 : $index;
                };
                $scope.requestItems = [
                    {
                        indexNo: "P8332",
                        name: "Oli Filter Caltex",
                        quantity: 2,
                        check: false
                    },
                    {
                        indexNo: "U345",
                        name: "Oli Filter Rolex",
                        quantity: 1,
                        check: false
                    },
                    {
                        indexNo: "E2222",
                        name: "Oli Rolex",
                        quantity: 1,
                        check: false
                    }
                ];
                $scope.barcodeText = "";
                $scope.doBarcode = function () {
                    for (var i = 0; i < $scope.requestItems.length; i++) {

                        if ($scope.requestItems[i].indexNo == $scope.barcodeText) {
                            $scope.requestItems[i].check = true;
                            break;
                        }
                    }
                };
            });
}());

