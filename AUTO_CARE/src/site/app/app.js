(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "ui.bootstrap",
        "homeModule",
        "dailyCheckListModule",
        "employeeAssignmentModule",
        "serviceSelectionModule",
        "itemSelectionModule",
        "bayAssignmentModule",
        "supervisorSelectionModule",
        //stock
        "requestItemModule",
        //front office
        "dashBoardModule",
        "itemModule",
        "reOrderLevelModule",
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
        "grnModule",
        "app",
        "stockTransferBranchInModule",
        "stockTransferBranchOutApproveModule",
        "stockTransferBranchOutModule",
        "directGrnModule",
        "grnApproveModule",
        "purchaseOrderRequestModule",
        "purchaseOrderApproveModule",
        "stockTransferInternalOutModule",
        "stockTransferInternalInModule",
        "bayItemIssueModule",
        "finalCheckListModule"
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
                            redirectTo: "/service/vehicle-entrance"
                        })
                        .when("/login", {
                            templateUrl: "app/system/login/login.html"
                        })

                        .when("/reports/general/report-viewer", {
                            templateUrl: "app/reports/report-viewer/report-viewer.html",
                            controller: "ReportViewerController"
                        })

                        //service
                        .when("/service/vehicle-entrance", {
                            templateUrl: "app/service/vehicle-entrance/vehicle-entrance.html",
                            controller: "vehicleEntranceController"
                        })
                        .when("/service/service-selection", {
                            templateUrl: "app/service/service-selection/service-selection.html",
                            controller: "serviceSelectionController"
                        })
                        .when("/service/item-selection/:jobCardIndexNo", {
                            templateUrl: "app/service/item-selection/item-selection.html",
                            controller: "itemSelectionController"
                        })
                        .when("/service/service-selection/:jobCardIndexNo", {
                            templateUrl: "app/service/service-selection/service-selection.html",
                            controller: "serviceSelectionController"
                        })
                        .when("/service/final-check-list", {
                            templateUrl: "app/service/final-check-list/final-check-list.html",
                            controller: "finalCheckListController"
                        })

                        //front-office
                        .when("/front-office/invoice", {
                            templateUrl: "app/front-office/invoice/invoice.html",
                            controller: "invoiceController"
                        })
                        .when("/stock/request-item", {
                            templateUrl: "app/stock/request-item/request-item.html",
                            controller: "requestItemController"
                        })
                        .when("/front-office/bay-item-issue", {
                            templateUrl: "app/front-office/bay-item-issue/bay-item-issue.html",
                            controller: "bayItemIssueController"
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
                        //bay-assignment
                        .when("/service/bay-assignment", {
                            templateUrl: "app/service/bay-assignment/bay-assignment.html",
                            controller: "bayAssignmentController"
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
                        //grn request
                        .when("/front-office/grn/grn-request", {
                            templateUrl: "app/front-office/grn/grn-request/grn-request.html",
                            controller: "grnController"
                        })
                        //grn approve
                        .when("/front-office/grn/grn-approve", {
                            templateUrl: "app/front-office/grn/grn-approve/grn-approve.html",
                            controller: "grnApproveController"
                        })
                        //grn direct
                        .when("/front-office/grn/grn-direct", {
                            templateUrl: "app/front-office/grn/grn-direct/grn.html",
                            controller: "directGrnController"
                        })
                        //purchase order request
                        .when("/front-office/purchase-order/request", {
                            templateUrl: "app/front-office/purchase-order/request/purchase-order-request.html",
                            controller: "purchaseOrderRequestController"
                        })
                        //purchase order approve
                        .when("/front-office/purchase-order/approve", {
                            templateUrl: "app/front-office/purchase-order/approve/purchase-order-approve.html",
                            controller: "purchaseOrderApproveController"
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
                        .when("/master/re-order-level", {
                            templateUrl: "app/master/re-order-level/re-order-level.html",
                            controller: "reOrderLevelController"
                        })

                        //stock transfer
                        //branch-transfer-out
                        .when("/stock/transfer/branch-transfer-out", {
                            templateUrl: "app/front-office/stock/branch-transfer/branch-transfer-out/branch-transfer-out.html",
                            controller: "stockTransferBranchOutController"
                        })
                        //branch-transfer-out-approve
                        .when("/stock/transfer/branch-transfer-out-approve", {
                            templateUrl: "app/front-office/stock/branch-transfer/branch-transfer-out-approve/branch-transfer-out-approve.html",
                            controller: "stockTransferBranchOutApproveController"
                        })
                        //branch-transfer-in
                        .when("/stock/transfer/branch-transfer-in", {
                            templateUrl: "app/front-office/stock/branch-transfer/branch-transfer-in/branch-transfer-in.html",
                            controller: "stockTransferBranchInController"
                        })
                        //internal-transfer-out
                        .when("/stock/transfer/internal-transfer-out", {
                            templateUrl: "app/front-office/stock/internal-transfer/internal-transfer-out/internal-transfer-out.html",
                            controller: "stockTransferInternalOutController"
                        })
                        //internal-transfer-in
                        .when("/stock/transfer/internal-transfer-in", {
                            templateUrl: "app/front-office/stock/internal-transfer/internal-transfer-in/internal-transfer-in.html",
                            controller: "stockTransferInternalInController"
                        })
                        //supplier payment
                        .when("/supplier-payment/supplier-payment", {
                            templateUrl: "app/front-office/supplier-payment/supplier-payment.html"
//                            controller: "stockTransferInternalInController"
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

                };
            });

    angular.module("appModule")
            .filter('unique', function () {
                return function (collection, keyname) {
                    var output = [],
                            keys = [];

                    angular.forEach(collection, function (item) {
                        var key = item[keyname];
                        if (keys.indexOf(key) === -1) {
                            keys.push(key);
                            output.push(item);
                        }
                    });
                    return output;
                };
            });

}());
