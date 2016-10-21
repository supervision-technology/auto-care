(function () {
//module
    angular.module("bayAssignmentModule", ['as.sortable']);
    //controller
    angular.module("bayAssignmentModule")
            .controller("bayAssignmentController", function ($scope) {
                $scope.models = {
                    selected: null,
                    lists: {
                        "WAITING": [
                            {vehicle_no: "FR-7474", image: '/img/05.png'},
                            {vehicle_no: "FR-4463", image: '/img/01.png'},
                            {vehicle_no: "FR-6322", image: '/img/02.png'},
                            {vehicle_no: "MM-7439", image: '/img/03.png'},
                            {vehicle_no: "KI-9308", image: '/img/04.png'},
                            {vehicle_no: "ER-6438", image: '/img/05.png'},
                            {vehicle_no: "FO-0032", image: '/img/04.png'},
                            {vehicle_no: "CAY-3467", image: '/img/03.png'},
                            {vehicle_no: "CAT-3444", image: '/img/02.png'},
                            {vehicle_no: "CER-4578", image: '/img/01.png'},
                            {vehicle_no: "CNO-9383", image: '/img/02.png'},
                            {vehicle_no: "CAA-8444", image: '/img/03.png'},
                            {vehicle_no: "BAA-4454", image: '/img/04.png'},
                            {vehicle_no: "RE-6483", image: '/img/05.png'},
                            {vehicle_no: "RR-9593", image: '/img/04.png'}
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
                    $scope.models.lists.CLEANING.push({vehicle_no: "FR-835" + i, image: '/img/01.png'});
                    $scope.models.lists.SERVICE.push({vehicle_no: "RE-847" + i, image: '/img/02.png'});
                    $scope.models.lists.WHEEL_ALIGNMENT.push({vehicle_no: "IJ-832" + i, image: '/img/02.png'});
                    $scope.models.lists.VAXING.push({vehicle_no: "TT-375" + i, image: '/img/03.png'});
                    $scope.models.lists.ENGINE_REPAIRING.push({vehicle_no: "PO-832" + i, image: '/img/04.png'});
                    $scope.models.lists.INTERIOR_CLEANING.push({vehicle_no: "SRI-00" + i, image: '/img/05.png'});
                }

                // Model to JSON for demo purpose
                $scope.$watch('models', function (model) {
                    $scope.modelAsJson = angular.toJson(model, true);
                }, true);
            });
}());
