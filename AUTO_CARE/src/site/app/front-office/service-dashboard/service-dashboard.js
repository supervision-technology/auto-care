(function () {
//module
    angular.module("dashBoardModule", []);
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
                ]
            });
}());


