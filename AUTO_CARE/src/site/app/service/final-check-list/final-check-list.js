(function () {
//module
    angular.module("finalCheckListModule", []);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope) {

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
                $scope.filter = "";
                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle === $index ? -1 : $index;
                };
                $scope.services = [
                    {
                        indexNo: "S001",
                        name: "Vaxing",
                        check: false,
                        vehicle: "HG 0233"
                    },
                    {
                        indexNo: "S002",
                        name: "Interior Cleaning",
                        check: false,
                        vehicle: "HG 0233"
                    },
                    {
                        indexNo: "S003",
                        name: "Body Wash",
                        check: false,
                        vehicle: "HG 0233"
                    },
                    {
                        indexNo: "S004",
                        name: "Under Wash",
                        check: false,
                        vehicle: "HG 0233"
                    }
                ];
            });
}());

