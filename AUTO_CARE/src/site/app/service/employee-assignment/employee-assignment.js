(function () {
//module
    angular.module("employeeAssignmentModule", []);
    //controller
    angular.module("employeeAssignmentModule")
            .controller("employeeAssignmentController", function ($scope) {

                $scope.getEmployees = function () {
                    $scope.employees = [
                        {
                            name: "Nidura Prageeth"
                        },
                        {
                           name : "Kasun Chamara" 
                        },
                        {
                           name : "Kavish Manchitha"
                        },       
                        {
                           name : "Chamara Kasun"
                        },       
                        {
                           name : "Mohan Jayamuni"
                        }       
                    ];
                    return $scope.employees;
                };

            });
}());
