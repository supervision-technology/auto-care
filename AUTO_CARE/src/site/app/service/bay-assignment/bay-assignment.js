(function () {
//module
    angular.module("bayAssignmentModule", []);
    //controller
    angular.module("bayAssignmentModule")
            .controller("bayAssignmentController", function ($scope, $timeout) {
                $scope.bay={};
                $scope.ui={};
                $scope.bay.indexNo=1;

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

                $scope.grid1 = {x: 0, y: 0, w: 4, h: 6, color: "#CFEDFB",indexNo:1};
                $scope.grid2 = {x: 4, y: 0, w: 4, h: 6, color: "#F0E3EF",indexNo:2};
                $scope.grid3 = {x: 8, y: 0, w: 4, h: 6, color: "#FFE2D2",indexNo:3};
                $scope.grid4 = {x: 0, y: 6, w: 4, h: 6, color: "#FFEBB6",indexNo:4};
                $scope.grid5 = {x: 4, y: 6, w: 8, h: 6, color: "#E5EFC7",indexNo:9};

                $scope.dragStart = function (element, model) {
//                    console.log("AA");
//                    console.log(model);
                };
                $scope.dragLeave = function (element, model) {
//                    console.log("BB");
//                    console.log(model);
                    console.log($scope.bay.indexNo);
                    console.log(model);
                    
                };
                $scope.ui.setBay = function (indexNo){
                     $scope.bay.indexNo=indexNo;
                     console.log($scope.bay.indexNo);
                };
            });
}());
