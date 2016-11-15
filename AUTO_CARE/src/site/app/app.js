(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "homeModule",
        "dailyCheckListModule",
        "vehicleEntranceModule",
        "employeeAssignmentModule",
        "serviceSelectionModule",
        "bayAssignmentModule",
        "finalCheckListModule",
        "supervisorSelectionModule",
        //stock
        "requestItemModule",
        //front office
        "dashBoardModule",
        "invoiceModule"
    ]);

    //route config
    angular.module("appModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/system/home/home.html",
                            controller: "homeController"
                        })
                        .when("/login", {
                            templateUrl: "app/system/login/login.html"
                        })
                        //daily-check-list
                        .when("/service/daily-check-list", {
                            templateUrl: "app/service/daily-check-list/daily-check-list.html",
                            controller: "dailyCheckListController"
                        })
                        //employee-assignment
                        .when("/service/employee-assignment", {
                            templateUrl: "app/service/employee-assignment/employee-assignment.html",
                            controller: "employeeAssignmentController"
                        })
                        //vehicle-entrance
                        .when("/service/vehicle-entrance", {
                            templateUrl: "app/service/vehicle-entrance/vehicle-entrance.html",
                            controller: "vehicleEntranceController"
                        })
                        //service-selection
                        .when("/service/service-selection", {
                            templateUrl: "app/service/service-selection/service-selection.html",
                            controller: "serviceSelectionController"
                        })
                        //bay-assignment
                        .when("/service/bay-assignment", {
                            templateUrl: "app/service/bay-assignment/bay-assignment.html",
                            controller: "bayAssignmentController"
                        })
                        //request-item
                        .when("/stock/request-item", {
                            templateUrl: "app/stock/request-item/request-item.html",
                            controller: "requestItemController"
                        })
                        //final-check-list
                        .when("/service/final-check-list", {
                            templateUrl: "app/service/final-check-list/final-check-list.html",
                            controller: "finalCheckListController"
                        })
                        //supervisor-selection
                        .when("/service/supervisor-selection", {
                            templateUrl: "app/service/supervisor-selection/supervisor-selection.html",
                            controller: "supervisorSelectionController"
                        })
                        //dash-Board
                        .when("/front-office/service-dashboard", {
                            templateUrl: "app/front-office/service-dashboard/service-dashboard.html",
                            controller: "dashBoardController"
                        })
                        .when("/front-office/service-das0hboard", {
                            templatek : "app/front-office/service-dashboard/service-dashboard.html",
                            controller: "dashBoardController"
                        })
                        //front-office
                        .when("/front-office/invoice", {
                            templateUrl: "app/front-office/invoice/invoice.html",
                            controller: "invoiceController"
                        })
                        .otherwise({
                            redirectTo: "/"
                        });
            });

    angular.module("appModule")
            .controller("appController", function ($scope, $timeout) {
                $scope.hamburgerOpen = true;

                $scope.toggleHamburger = function () {
                    $scope.hamburgerOpen = !$scope.hamburgerOpen;

//                    if ($scope.hamburgerOpen) {
//                        $timeout(function () {
//                            angular.element(document.querySelector(".side-bar-left")).css("display", "none");
//                        }, 600);
//                    } else {
//                        angular.element(document.querySelector(".side-bar-left")).css("display", "flex");
//                    }
                };
            });
}());