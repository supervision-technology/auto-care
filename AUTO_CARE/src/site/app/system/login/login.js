(function () {
    angular.module("appModule")
            .controller("LoginController", function ($scope, $cookies, $location, $timeout, SecurityService) {
                $scope.ui = {};
                $scope.model = {};

                $scope.ui.focus = null;

                $scope.model.data = {
                    username: null,
                    password: null
                };

                $scope.ui.onFocus = function (val) {
                    $scope.ui.focus = val;
                };

                $scope.ui.onBlur = function () {
                    $scope.ui.focus = null;
                };

                $scope.ui.login = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        if ($scope.model.data.username && $scope.model.data.password) {
                            //login
                            SecurityService.login($scope.model.data)
                                    .success(function (data, status, headers) {
                                        $location.path("/");

                                        $cookies.put("nick-name", data.principal.nickName);
                                        $cookies.put("branch-index-no", data.principal.branch);
                                        $cookies.put("branch-name", data.principal.branchName);
                                    })
                                    .error(function (data, status) {
                                        var element = angular.element(document.querySelectorAll(".login-form")[0])
                                        element.addClass("login-failed");
                                        $timeout(function () {
                                            element.removeClass("login-failed");
                                        }, 1000);

                                    });
                        }
                    }
                };
            });
}());

