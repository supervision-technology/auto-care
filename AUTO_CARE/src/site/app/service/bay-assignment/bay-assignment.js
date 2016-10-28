(function () {
//module
    angular.module("bayAssignmentModule", ['dndLists']);
    //controller
    angular.module("bayAssignmentModule")
            .controller("bayAssignmentController", function ($scope, $timeout) {

                $scope.vehicle = [
                    {
                        image: "/img/01.png",
                        number: "WC 3351",
                        customerName: "Kavish Manjitha",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/02.png",
                        number: "MM 4488",
                        customerName: "Kasun Chamara",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/04.png",
                        number: "QT 8956",
                        customerName: "Mohan",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/05.png",
                        number: "UG 7256",
                        customerName: "Mohan",
                        contactNumber: "0714303339"
                    }
                ];

//                $scope.models = {
//                    selected: null,
//                    lists: {
//                        "WAITING": [
//                            {vehicle_no: "FR-7474", image: '/img/05.png'},
//                            {vehicle_no: "FR-4463", image: '/img/01.png'},
//                            {vehicle_no: "FR-6322", image: '/img/02.png'},
//                            {vehicle_no: "MM-7439", image: '/img/03.png'},
//                            {vehicle_no: "KI-9308", image: '/img/04.png'},
//                            {vehicle_no: "ER-6438", image: '/img/05.png'},
//                            {vehicle_no: "FO-0032", image: '/img/04.png'},
//                            {vehicle_no: "CAY-3467", image: '/img/03.png'},
//                            {vehicle_no: "CAT-3444", image: '/img/02.png'},
//                            {vehicle_no: "CER-4578", image: '/img/01.png'},
//                            {vehicle_no: "CNO-9383", image: '/img/02.png'},
//                            {vehicle_no: "CAA-8444", image: '/img/03.png'},
//                            {vehicle_no: "BAA-4454", image: '/img/04.png'},
//                            {vehicle_no: "RE-6483", image: '/img/05.png'},
//                            {vehicle_no: "RR-9593", image: '/img/04.png'}
//                        ],
//                        "CLEANING": [],
//                        "SERVICE": [],
//                        "WHEEL_ALIGNMENT": [],
//                        "VAXING": [],
//                        "ENGINE_REPAIRING": [],
//                        "INTERIOR_CLEANING": []
//                    }
//                };

//                // Generate initial model
//                for (var i = 1; i <= 1; ++i) {
////                    $scope.models.lists.A.push({label: "Item A" + i});
//                    $scope.models.lists.CLEANING.push({vehicle_no: "FR-835" + i, image: '/img/01.png'});
//                    $scope.models.lists.SERVICE.push({vehicle_no: "RE-847" + i, image: '/img/02.png'});
//                    $scope.models.lists.WHEEL_ALIGNMENT.push({vehicle_no: "IJ-832" + i, image: '/img/02.png'});
//                    $scope.models.lists.VAXING.push({vehicle_no: "TT-375" + i, image: '/img/03.png'});
//                    $scope.models.lists.ENGINE_REPAIRING.push({vehicle_no: "PO-832" + i, image: '/img/04.png'});
//                    $scope.models.lists.INTERIOR_CLEANING.push({vehicle_no: "SRI-00" + i, image: '/img/05.png'});
//                }

                // Model to JSON for demo purpose
                $scope.$watch('models', function (model) {
                    $scope.modelAsJson = angular.toJson(model, true);
                }, true);

                $scope.counter = 60;
                $scope.onTimeout = function () {
                    $scope.counter--;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                    if ($scope.counter === 0) {
                        $timeout.cancel(mytimeout);
                    }
                };

                var mytimeout = $timeout($scope.onTimeout, 1000);
                $scope.stop = function () {
                    $timeout.cancel(mytimeout);
                };

                $scope.grid1 = {x: 0, y: 0, w: 4, h: 6, color:"#CFEDFB"};
                $scope.grid2 = {x: 4, y: 0, w: 4, h: 6, color:"#F0E3EF"};
                $scope.grid3 = {x: 8, y: 0, w: 4, h: 6, color:"#FFE2D2"};
                $scope.grid4 = {x: 0, y: 6, w: 4, h: 6, color:"#FFEBB6"};
                $scope.grid5 = {x: 4, y: 6, w: 8, h: 6, color:"#E5EFC7"};
//                $scope.grid6 = {x: 8, y: 6, w: 8, h: 6};

            });
}());
