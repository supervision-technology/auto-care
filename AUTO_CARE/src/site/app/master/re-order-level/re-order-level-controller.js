(function () {
    angular.module("reOrderLevelModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("reOrderLevelModule")
            .controller("reOrderLevelController", function ($scope, reOrderLevelModel, $timeout, Notification) {
                $scope.model = new reOrderLevelModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };
                $scope.ui.save = function () {
                    $scope.model.save()
                            .then(function () {
                                Notification.success("ReOrder Level Save Success");
                            }, function () {
                                Notification.error("Item save Fail");
                            });
                };

                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                };
                $scope.ui.init();
            });
}());