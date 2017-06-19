(function () {
    angular.module("appModule")
            .controller("appController", function ($scope, $rootScope, $location, SecurityService) {
                $scope.hamburgerOpen = false;

                //route loading
                $rootScope.$watch("layout.loading", function () {
                    $scope.routeLoading = $rootScope.layout.loading;
                });

                $scope.userRoles = $rootScope.userRoles;

                $scope.homepageUrls = [];

                //init homepage urls
                angular.forEach($scope.userRoles, function (value) {
                    if (value.homepageUrl) {
                        $scope.homepageUrls.push({
                            "name": value.name,
                            "url": value.homepageUrl
                        });
                    }
                });

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

                $scope.isHomepage = function () {
                    return $location.path() === "/";
                };

                $scope.logout = function () {
                    SecurityService.logout()
                            .success(function () {
                                $location.path("/login");
                            });
                };
            });
}());