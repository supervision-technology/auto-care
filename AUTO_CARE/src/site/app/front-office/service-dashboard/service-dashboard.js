(function () {
//module
    angular.module("dashBoardModule", ["chart.js"]);
    //controller
    angular.module("dashBoardModule")
            .controller("dashBoardController", function ($scope) {
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
                    }
                ];
                //1st Chart
                $scope.labels = ["CARS", "VANS", "JEEPS"];
                $scope.data = [3, 5, 2];

                //2nd Chart
                $scope.labels1 = ['Bay Waiting', 'Bay Washing', 'Bay Cleaning', 'Bay Waxing', 'Bay Repairing'];
                $scope.series = ['Series A', 'Series B'];

                $scope.data1 = [
                    [10, 2, 4, 3, 1]
                ];

                //3rd Chart
                $scope.label3 = ["January", "February", "March", "April", "May", "June", "July"];
                $scope.serie3 = ['Series A', 'Series B'];
                $scope.data3 = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
                $scope.options = {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                display: true,
                                position: 'right'
                            }
                        ]
                    }
                };
            });
}());


