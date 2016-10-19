(function () {
    //module
    angular.module("greenLeavesReceiveModule", ["ngAnimate", "ui.bootstrap", "ui-notification"]);

    //controller
    angular.module("greenLeavesReceiveModule")
            .controller("greenLeavesReceiveController", function ($scope, $http, systemConfig, Notification) {

                //ui models
                $scope.ui = {};
                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    console.log("NEW");
                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                };

                var clientUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/clients";
                $http.get(clientUrl).success(function (data) {
                    $scope.clientList = [];
                    $scope.clientList = data.values;
                });

                //get route client
                $scope.getClients = function (hint) {
                    return $scope.clientList;
                };

                $scope.getRowData = function () {
                    if (!$scope.greenLevesRecives) {
                        $scope.greenLevesRecives = [];
                    }
                    return $scope.greenLevesRecives;
                };

                $scope.insertTable = function (rowData) {
                    $scope.vars = true;
                    if ($scope.rowData.client.name && $scope.rowData.normalLeavesQuantity && $scope.rowData.superLeavesQuantity) {
                        if ($scope.greenLevesRecives.length === 0) {
                            $scope.greenLevesRecives.push(rowData);
                            $scope.rowData = null;
                        } else {
                            for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                                if (angular.equals($scope.greenLevesRecives[i].client, rowData.client)) {
                                    $scope.vars = false;
                                    Notification.error('This Customer Is Already Exists');
                                    break;
                                }
                            }
                            if ($scope.vars) {
                                $scope.greenLevesRecives.push(rowData);
                                $scope.rowData = null;
                            }
                        }
                    } else {
                        Notification.error('Must Be Filled All Components To Add');
                    }
                    $scope.getNormalLeavesQuantityTotal();
                    $scope.getSuperLeavesQuantity();
                };

                $scope.editSelectdRow = function (rowData, index) {
                    if (rowData) {
                        $scope.rowData = rowData;
                        $scope.greenLevesRecives.splice(index, 1);
                    } else {
                        Notification.error('Edit Not Success');
                    }
                };

                $scope.deleteSelectedRow = function (index) {
                    $scope.greenLevesRecives.splice(index, 1);
                    $scope.rowData = null;
                    $scope.getNormalLeavesQuantityTotal();
                    $scope.getSuperLeavesQuantity();
                    Notification.success('Delete Success');
                };

                //get Normal Leaves Qty
                $scope.getNormalLeavesQuantityTotal = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                        total += parseInt($scope.greenLevesRecives[i].normalLeavesQuantity);
                    }
                    return total;
                };

                //get Total Super Leaves Qty
                $scope.getSuperLeavesQuantity = function () {
                    var total = 0;
                    for (var i = 0; i < $scope.greenLevesRecives.length; i++) {
                        total += parseInt($scope.greenLevesRecives[i].superLeavesQuantity);
                    }
                    return total;
                };

                //table selection function
                $scope.selectedRow = null;
                $scope.setClickedRow = function (index,route) {
                    $scope.selectedRow = index;
                    console.log(route);
                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //get route
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/routes";
                    $scope.routes = [];
                    $http.get(url).success(function (data) {
                        $scope.routes = data.values;
                    });
                };
                $scope.ui.init();
            });
}());