(function () {
    //index module
    angular.module("appModule", [
        "ngRoute",
        "homeModule",
        "ui.bootstrap",
        "greenLeavesReceiveModule",
        "clientAdvanceRequestModule",
        "clientAdvanceApproveModule",
        "greenLeavesWeighModule",
        "greenLeavesPaymentModule",
        "priceSettingModule",
        "finalPaymentModule",
        "monthlyGreenLeavesSummryModule",
        "routeDetailsModule",
        "supplierModule"
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

                        //green leaves
                        .when("/transactions/green-leaves/green-leaves-receive", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-receive/green-leaves-receive.html",
                            controller: "greenLeavesReceiveController"
                        })
                        .when("/transactions/green-leaves/client-advance/client-advance-request", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-request.html",
                            controller: "clientAdvanceRequestController"
                        })
                        .when("/transactions/green-leaves/client-advance/client-advance-approve", {
                            templateUrl: "app/transactions/green-leaves/client-advance/client-advance-approve.html",
                            controller: "clientAdvanceApproveController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/green-leaves-weigh", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-weigh/green-leaves-weigh.html",
                            controller: "greenLeavesWeighController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/green-leaves-payment", {
                            templateUrl: "app/transactions/green-leaves/green-leaves-payment/green-leaves-payment.html",
                            controller: "greenLeavesPaymentController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/price-setting", {
                            templateUrl: "app/transactions/green-leaves/price-setting/price-setting.html",
                            controller: "priceSettingController"
                        })
                        .when("/transactions/green-leaves/green-leaves-weigh/final-payemnt", {
                            templateUrl: "app/transactions/green-leaves/final-payemnt/final-payemnt.html",
                            controller: "finalPaymentModuleController"
                        })
                        .when("/transactions/green-leaves/monthly-green-leaves-summry/monthly-green-leaves-summry", {
                            templateUrl: "app/transactions/green-leaves/monthly-green-leaves-summry/monthly-green-leaves-summry.html",
                            controller: "monthlyGreenLeavesSummryController"
                        })
                        .when("/transactions/green-leaves/route-details", {
                            templateUrl: "app/transactions/green-leaves/route-details/route-details.html",
                            controller: "routeDetailsController"
                        })
                        .when("/master/supplier/manage-supplier", {
                            templateUrl: "app/master/supplier/supplier.html",
                            controller: "routeDetailsController"
                        })
                        .otherwise({
                            redirectTo: "/"
                        });
            });

    angular.module("appModule")
            .config(function (ChartJsProvider) {
                ChartJsProvider.setOptions({
                    responsive: true,
                    maintainAspectRatio: false
                });
            });

    angular.module("appModule")
            .controller("appController", function ($scope, $timeout) {
                $scope.hamburgerOpen = false;

                $scope.toggleHamburger = function () {
                    $scope.hamburgerOpen = !$scope.hamburgerOpen;

                    if ($scope.hamburgerOpen) {
                        $timeout(function () {
                            angular.element(document.querySelector(".side-bar-left")).css("display", "none");
                        }, 600);
                    } else {
                        angular.element(document.querySelector(".side-bar-left")).css("display", "flex");
                    }
                };
            });

}());