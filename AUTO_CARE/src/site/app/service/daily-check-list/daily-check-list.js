(function () {
//module
    angular.module("dailyCheckListModule", []);
    //controller
    angular.module("dailyCheckListModule")
            .controller("dailyCheckListController", function ($scope) {
                
                $scope.filterBy ="1";
                $scope.check_list_group = [
                    {
                        indexNo: "1",
                        name: "Car Wash Machines HPI1400",
                        active: true,
                        sortOrder: "1"
                    },
                    {
                        indexNo: "2",
                        name: "Car Wash Machines P4000",
                        active: true,
                        sortOrder: "2"
                    },
                    {
                        indexNo: "3",
                        name: "Car Wash Machines IUO001",
                        active: true,
                        sortOrder: "3"
                    },
                    {
                        indexNo: "4",
                        name: "Car Wash Machines 01",
                        active: true,
                        sortOrder: "4"
                    },
                    {
                        indexNo: "5",
                        name: "Car Wash Machines 2322",
                        active: true,
                        sortOrder: "5"
                    }
                ];
                $scope.check_list_item = [
                    {
                        indexNo: "10",
                        group: "1",
                        description: "this is the description",
                        sortOrder: "1"

                    },
                    {
                        indexNo: "20",
                        group: "1",
                        description: "this is the description",
                        sortOrder: "2"

                    },
                    {
                        indexNo: "30",
                        group: "2",
                        description: "this is the description",
                        sortOrder: "3"

                    },
                    {
                        indexNo: "30",
                        group: "3",
                        description: "this is the description",
                        sortOrder: "3"

                    },
                    {
                        indexNo: "40",
                        group: "2",
                        description: "this is the description",
                        sortOrder: "4"

                    }
                ];
                $scope.doFilter=function (groupNo){
                    $scope.filterBy =groupNo;
                };
            });
}());
