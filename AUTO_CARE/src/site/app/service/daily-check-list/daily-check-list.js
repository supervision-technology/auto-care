(function () {
//module
    angular.module("dailyCheckListModule", []);
    //controller
    angular.module("dailyCheckListModule")
            .controller("dailyCheckListController", function ($scope) {
                $scope.machine = [
                    {
                        indexNo: "001",
                        name: "Car Wash Machines HPI1400",
                        discription: "",
                        status: "0714303339"
                    },
                    {
                        indexNo: "002",
                        name: "Car Wash Machines HPI1400",
                        discription: "",
                        status: "0714303339"
                    },
                    {
                        indexNo: "003",
                        name: "Car Wash Machines HPI1400",
                        discription: "",
                        status: "0714303339"
                    },
                    {
                        indexNo: "004",
                        name: "Car Wash Machines HPI1400",
                        discription: "",
                        status: "0714303339"
                    },
                    {
                        indexNo: "005",
                        name: "Car Wash Machines HPI1400",
                        discription: "",
                        status: "0714303339"
                    }
                ];

                $scope.machineSelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.machineActivePositionVehicle = $scope.machineActivePositionVehicle == $index ? -1 : $index;
                };
            });
}());
