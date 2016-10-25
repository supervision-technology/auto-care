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
        "requestItemModule",
        "finalCheckListModule",
        "supervisorSelectionModule"
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
                            templateUrl: "app/system/login/login.html",
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
                        .when("/service/request-item", {
                            templateUrl: "app/service/request-item/request-item.html",
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
                        .otherwise({
                            redirectTo: "/"
                        });
            });
}());