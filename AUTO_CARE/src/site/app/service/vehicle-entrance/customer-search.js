(function () {
//module
    angular.module("customerSearchModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("customerSearchModule")
            .factory("customerSearchFactory", function ($http, systemConfig) {
                var factory = {};
                factory.loadClient = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveClient = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client/insert-detail";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };
                return factory;
            });
    //controller
    angular.module("customerSearchModule")
            .controller("customerSearchController", function ($scope, customerSearchFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};


                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {
                        "indexNo": null,
                        "name": null,
                        "mobile": null,
                        "nic": null
                    };
                };
                $scope.model.client = [];

                //------------------ ui functions ------------------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#clientNo")[0].focus();
                    }, 10);
                };

                $scope.ui.edit = function (client, index) {
                    $scope.model.data = client;
                    $scope.model.client.splice(index, 1);
                };


                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.data.nic
                            && $scope.model.data.mobile
                            && $scope.model.data.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveSupplier();
                    } else {
                        Notification.error("Please Input Details");
                    }
                };


                //------------------ http functions ------------------------------
                //save
                $scope.http.saveSupplier = function () {
                    var detail = $scope.model.data;
                    var detailJSON = JSON.stringify(detail);

                    customerSearchFactory.saveClient(
                            detailJSON,
                            function (data) {
                                Notification.success("success" + data.indexNo);
                                //reset model
                                $scope.model.client.push(data);
                                $scope.model.reset();
                                $timeout(function () {
                                    document.querySelectorAll("#clientNo")[0].focus();
                                }, 10);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.checkSupplierExists = function (text, type) {
                    for (var i = 0; i < $scope.model.client.length; i++) {
                        if (type === "name") {
                            if (text === $scope.model.client[i].name) {
                                $scope.selectedRow = $scope.model.client[i];
                                console.log($scope.model.client[i]);
                            }
                        } else if (type === "nic") {
                            if (text === $scope.model.client[i].nic) {
                                $scope.selectedRow = $scope.model.client[i];
                                console.log($scope.model.client[i]);
                            }
                        } else if (type === "mobile") {
                            if (text === $scope.model.client[i].mobile) {
                                $scope.selectedRow = $scope.model.client[i];
                                console.log($scope.model.client[i]);
                            }
                        }
                    }
                };

                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    customerSearchFactory.loadClient(function (data) {
                        $scope.model.client = data;
                    });
                };
                $scope.ui.init();
            });
}());

