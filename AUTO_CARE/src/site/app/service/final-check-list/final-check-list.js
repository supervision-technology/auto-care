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
                        image: "/img/05.png",
                        name: "Kasun Chamara",
                        number: "UG 7256"
                    },
                    {
                        bayName: "Washing Bay",
                        image: "/img/01.png",
                        name: "Nidura Prageeth",
                        number: "US 5333"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        name: "Kavish Manjitha",
                        number: "HG 0233"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        name: "Mohan Jayamuni",
                        number: "FR 0344"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        name: "Akila Sasanka",
                        number: "CAR 8888"
                    },
                ];
                $scope.selectedRow = 0;
                $scope.isVisible = $scope.isVisible === 0 ? true : false;
                $scope.filter = "UG 7256";
                $scope.vehicleSelectionDetail = function ($index,vehicleNum) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle === $index ? -1 : $index;
                    $scope.filter= vehicleNum;
                    
                };
                $scope.services = [
                    {
                        indexNo: "S001",
                        name: "Vaxing",
                        check: false,
                        vehicle: "UG 7256"
                    },
                    {
                        indexNo: "S0021",
                        name: "Body Wash",
                        check: false,
                        vehicle: "UG 7256"
                    },
                    {
                        indexNo: "S002",
                        name: "Interior Cleaning",
                        check: false,
                        vehicle: "US 5333"
                    },
                    {
                        indexNo: "S003",
                        name: "Body Wash",
                        check: false,
                        vehicle: "HG 0233"
                    },
                    {
                        indexNo: "S0033",
                        name: "Interior Cleaning",
                        check: false,
                        vehicle: "HG 0233"
                    },
                    {
                        indexNo: "S004",
                        name: "Full Service",
                        check: false,
                        vehicle: "FR 0344"
                    },
                    {
                        indexNo: "S004",
                        name: "Wheel Alignment",
                        check: false,
                        vehicle: "CAR 8888"
                    }
                ];
            });
}());

