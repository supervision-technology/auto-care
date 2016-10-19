(function () {
    //module
    angular.module("greenLeavesPaymentModule", []);

    //controller
    angular.module("greenLeavesPaymentModule")
            .controller("greenLeavesPaymentController", function ($scope) {
                $scope.Items = [{
                        Name: "Item 1"
                    }, {
                        Name: "Item 2"
                    }, {
                        Name: "Item 3"
                    }, {
                        Name: "Item 4"
                    }, {
                        Name: "Item 5"
                    }, {
                        Name: "Item 6"
                    }, {
                        Name: "Item 7"
                    }, {
                        Name: "Item 8"
                    }, {
                        Name: "Item 9"
                    }, {
                        Name: "Item 10"
                    }, {
                        Name: "Item 11"
                    }, {
                        Name: "Item 12"
                    }, {
                        Name: "Item 13"
                    }, {
                        Name: "Item 14"
                    }, {
                        Name: "Item 15"
                    }];
                $scope.accNo="Select Acc No";
                $scope.setAccNo=function (accNo){
                    $scope.accNo=accNo;
                };
                
                $scope.checkAll = function () {
                    if ($scope.selectedAll) {
                        $scope.selectedAll = true;
                    } else {
                        $scope.selectedAll = false;
                    }
                    angular.forEach($scope.Items, function (item) {
                        item.Selected = $scope.selectedAll;
                    });

                };

                $scope.setCheckAll = function (item) {
                    //
                    // Check if checkAll should be unchecked
                    //
                    if ($scope.selectedAll && !item.Selected) {
                        $scope.selectedAll = false;
                    }
                    //
                    // Check if all are checked.
                    //
                    var checkCount = 0;
                    angular.forEach($scope.Items, function (item) {
                        if (item.Selected)
                            checkCount++;
                    });
                    $scope.selectedAll = (checkCount === $scope.Items.length);
                };

            });
}());