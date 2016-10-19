(function () {
    //module
    angular.module("priceSettingModule", []);

    //controller
    angular.module("priceSettingModule")
            .controller("priceSettingController", function ($scope) {
                $scope.leafList = [{}];
              
                $scope.leafLists = function (value) {
                    $scope.leafList = [
                        {
                            indexNo: "00001",
                            route: "batuwana route",
                            normalQty: "200",
                            superQty: "100"

                        },
                        {
                            indexNo: "00002",
                            route: "batuwana route",
                            normalQty: "300",
                            superQty: "400"

                        },
                        {
                            indexNo: "00003",
                            route: "batuwana route",
                            normalQty: "340",
                            superQty: "190"

                        }
                    ];
                    console.log($scope.leafList.length);
                    return $scope.leafList;
                };
                $scope.getTotalNormal = function () {
                    var totalNormal = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var route = $scope.leafList[i];
                        totalNormal += parseFloat(route.normalQty);
                    }
                    return totalNormal;
                };
                $scope.getTotalSuper = function () {
                    var totalSuper = 0;
                    for (var i = 0; i < $scope.leafList.length; i++) {
                        var route = $scope.leafList[i];
                        totalSuper += parseFloat(route.superQty);
                    }
                    return totalSuper;
                };


            });
}());