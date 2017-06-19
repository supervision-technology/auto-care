(function () {
    angular.module("appModule")
            .controller("LoginController", function ($scope, $location, $timeout, SecurityService) {
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
                                    })
                                    .error(function (data, status) {
                                        console.log(data);
                                        console.log(status);

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

