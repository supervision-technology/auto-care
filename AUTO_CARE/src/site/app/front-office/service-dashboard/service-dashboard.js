(function () {
//module
    angular.module("dashBoardModule", []);
    //controller
    angular.module("dashBoardModule")
            .controller("dashBoardController", function ($scope) {

                $scope.vehicle = [
                    {
                        bayName: "Cleaning Bay",
                        image: "/img/05.png",
                        number: "UG 7256"
                    },
                    {
                        bayName: "Washing Bay",
                        image: "/img/01.png",
                        number: "US 5333"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        number: "HG 0233"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        number: "FR 0344"
                    },
                    {
                        bayName: "Vaxing Bay",
                        image: "/img/02.png",
                        number: "CAR 8888"
                    }
                ];
                $scope.models = {
                    selected: null,
                    lists: {
                        "WAITING": [
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"},
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"},
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"},
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"}
                        ],
                        "CLEANING": [
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"}
                            
                        ],
                        "SERVICE": [
                            {inTime: "08.34 am", outTime: "09.02 am",duration:"28.Min 05.sec"}
                            
                        ],
                        "WHEEL_ALIGNMENT": [
                       
                        ],
                        "VAXING": [
                            
                        ],
                        "ENGINE_REPAIRING": [
                            
                        ],
                        "INTERIOR_CLEANING": [
                            
                        ]
                    }
                };

                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                };
            });
}());


