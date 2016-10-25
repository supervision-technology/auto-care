(function () {
//module
    angular.module("employeeAssignmentModule", []);
    //controller
    angular.module("employeeAssignmentModule")
            .controller("employeeAssignmentController", function ($scope) {

                $scope.models = {
                    selected: null,
                    lists: {
                        "WAITING": [
                            {employee: "Kasun Chamara", image: '/img/c5.png'},
                            {employee: "Nidura Prageeth", image: '/img/c1.png'},
                            {employee: "Kavish Manjitha", image: '/img/c2.png'},
                            {employee: "Akila Sasanka", image: '/img/c3.png'},
                            {employee: "Nidura Prageeth", image: '/img/c4.png'},
                            {employee: "Nidura Prageeth", image: '/img/c5.png'},
                            {employee: "Nidura Prageeth", image: '/img/c6.png'},
                            {employee: "Nidura Prageeth", image: '/img/c1.png'},
                            {employee: "Nidura Prageeth", image: '/img/c2.png'},
                            {employee: "Nidura Prageeth", image: '/img/c3.png'},
                            {employee: "Nidura Prageeth", image: '/img/c4.png'},
                            {employee: "Nidura Prageeth", image: '/img/c5.png'},
                            {employee: "Nidura Prageeth", image: '/img/c6.png'},
                            {employee: "Nidura Prageeth", image: '/img/c1.png'},
                            {employee: "Nidura Prageeth", image: '/img/c2.png'}
                        ],
                        "CLEANING": [],
                        "SERVICE": [],
                        "WHEEL_ALIGNMENT": [],
                        "VAXING": [],
                        "ENGINE_REPAIRING": [],
                        "INTERIOR_CLEANING": []
                    }
                };

                // Generate initial model
                for (var i = 1; i <= 1; ++i) {
//                    $scope.models.lists.A.push({label: "Item A" + i});
                    $scope.models.lists.CLEANING.push({employee: "Nidura Prageeth", image: '/img/c1.png'});
                    $scope.models.lists.SERVICE.push({employee: "Nidura Prageeth", image: '/img/c2.png'});
                    $scope.models.lists.WHEEL_ALIGNMENT.push({employee: "Nidura Prageeth", image: '/img/C2.png'});
                    $scope.models.lists.VAXING.push({employee: "Nidura Prageeth", image: '/img/c3.png'});
                    $scope.models.lists.ENGINE_REPAIRING.push({employee: "Nidura Prageeth", image: '/img/c4.png'});
                    $scope.models.lists.INTERIOR_CLEANING.push({employee: "Nidura Prageeth", image: '/img/c5.png'});
                }

                // Model to JSON for demo purpose
                $scope.$watch('models', function (model) {
                    $scope.modelAsJson = angular.toJson(model, true);
                }, true);
            });
}());
