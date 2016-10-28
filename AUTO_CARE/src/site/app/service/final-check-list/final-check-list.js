(function () {
//module
    angular.module("finalCheckListModule", []);
    //controller
    angular.module("finalCheckListModule")
            .controller("finalCheckListController", function ($scope) {

                $scope.selectionsFunction = true;
                $scope.vehicles = [
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
                    }
                ];
                $scope.selectedRow = 0;
                $scope.isVisible = $scope.isVisible === 0 ? true : false;
                $scope.filter = "UG 7256";
                $scope.vehicleSelectionDetail = function ($index, vehicleNum) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle === $index ? -1 : $index;
                    $scope.filter = vehicleNum;

                };
                $scope.checkedList = [
                ];
                $scope.checkList = [
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
                    },
                    {
                        indexNo: "S004",
                        name: "Wheel Alignment",
                        check: false,
                        vehicle: "CAR 8888"
                    }
                ];

                $scope.doRemoveFromCheck = function (index, item) {
                    $scope.checkedList.push(item);
                    $scope.checkList.splice(index, 1);

                };
                $scope.doRemoveFromChecked = function (index, item) {
                    $scope.checkList.push(item);
                    $scope.checkedList.splice(index, 1);

                };
            });
}());

