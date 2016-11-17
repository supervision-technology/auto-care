(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "ui.bootstrap",
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
        "invoiceModule",
        "subCategoryModule",
        "categoryModule",
        "itemDepartmentModule",
        "brandModule"

    ]);
    
    //constants
    angular.module("appModule")
            .constant("systemConfig", {
                apiUrl: "http://localhost:8080"
            });


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
                            templatek: "app/front-office/service-dashboard/service-dashboard.html",
                            controller: "dashBoardController"
                        })
                        //front-office
                        .when("/front-office/invoice", {
                            templateUrl: "app/front-office/invoice/invoice.html",
                            controller: "invoiceController"
                        })

                        //master
                        .when("/master/item", {
                            templateUrl: "app/master/item/item.html",
                            controller: "itemController"
                        })
                        .when("/master/sub-category", {
                            templateUrl: "app/master/sub-category/sub-category.html",
                            controller: "subCategoryController"
                        })
                        .when("/master/category", {
                            templateUrl: "app/master/category/category.html",
                            controller: "categoryController"
                        })
                        .when("/master/item-department", {
                            templateUrl: "app/master/item-department/item-department.html",
                            controller: "itemDepartmentController"
                        })
                        .when("/master/brand", {
                            templateUrl: "app/master/brand/brand.html",
                            controller: "brandController"
                        })

                        .otherwise({
                            redirectTo: "/"
                        });
            });

    //constants
    angular.module("appModule")
            .constant("systemConfig", {
                apiUrl: "http://localhost:8080"
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