(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "ui.bootstrap",
        "homeModule",
        "dailyCheckListModule",
        "employeeAssignmentModule",
        "serviceSelectionModule",
        "bayAssignmentModule",
        "finalCheckListModule",
        "supervisorSelectionModule",
        //stock
        "requestItemModule",
        //front office
        "dashBoardModule",
        "itemModule",
        "invoiceModule",
        "subCategoryModule",
        "categoryModule",
        "itemDepartmentModule",
        "brandModule",
        "bayModule",
        "vehicleEntranceModule",
        "priceCategoryModule",
        "vehicleTypeModule",
        "clientModule",
        "vehicleModule",
        "jobCardModule",
        "subItemModule",
        "app"

    ]);

    //constants
    angular.module("appModule")
            .constant("systemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
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
                        //Pagination Test
//                        .when("/pagination/pagination-test", {
//                            templateUrl: "app/master/pagination/pagination.html",
//                            controller: "ExampleController"
//                        })
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
                        //vehicle-entrance-test
                        .when("/service/vehicle-entrance", {
                            templateUrl: "app/service/vehicle-entrance/vehicle-entrance.html",
                            controller: "vehicleEntranceController"
                        })    
                        //vehicle-entrance
                        .when("/service/vehicle-entrance-test", {
                            templateUrl: "app/service/vehicle-entrance/test/vehicle-entrance.html",
                            controller: "vehicleEntranceController"
                        })
                        //service-selection
                        .when("/service/service-selection", {
                            templateUrl: "app/service/service-selection/service-selection.html",
                            controller: "serviceSelectionController"
                        })
                        
                        //service-selection for job card entrance
                        .when("/service/service-selection/:jobCardIndexNo", {
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
                        .when("/master/bay", {
                            templateUrl: "app/master/bay/bay.html",
                            controller: "bayController"
                        })
                        .when("/master/price-category", {
                            templateUrl: "app/master/price-category/price-category.html",
                            controller: "priceCategoryController"
                        })
                        .when("/master/vehicle-type", {
                            templateUrl: "app/master/vehicle-type/vehicle-type.html",
                            controller: "vehicleTypeController"
                        })
                        .when("/master/client", {
                            templateUrl: "app/master/client/client.html",
                            controller: "clientController"
                        })
                        .when("/master/vehicle", {
                            templateUrl: "app/master/vehicle/vehicle.html",
                            controller: "vehicleController"
                        })
                        .when("/front-office/job-card", {
                            templateUrl: "app/front-office/job-card/job-card.html",
                            controller: "jobCardController"
                        })
                        .when("/master/sub-item", {
                            templateUrl: "app/master/sub-item/sub-item.html",
                            controller: "subItemController"
                        })
                        .when("/master/sub_item", {
                            templateUrl: "app/master/sub-item/sub-item.html",
                            controller: "subItemController"
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

                    $scope.showChilds = function (index) {

                        $scope.items[index].active = !$scope.items[index].active;
                        collapseAnother(index);
                    };

                    var collapseAnother = function (index) {
                        for (var i = 0; i < $scope.items.length; i++) {
                            if (i != index) {
                                $scope.items[i].active = false;
                            }
                        }
                    };
//
//                    $scope.items = [
//                        {
//                            name: "Item1",
//                            subItems: [
//                                {
//                                    routingUrl: "#/service/vehicle-entrance",
//                                    routingName: "Vehicle Entrance"
//                                },
//                                {
//                                    routingUrl: "#/service/vehicle-entrance/new-client-history",
//                                    routingName: "Old Client History"
//                                },
//                                {
//                                    routingUrl: "#/service/vehicle-entrance/old-client-history",
//                                    routingName: "New Client"
//                                },
//                                {
//                                    routingUrl: "#/service/service-selection",
//                                    routingName: "Old Client History"
//                                }
//                            ]
//                        }
//                    ];
                };
            });
}());
