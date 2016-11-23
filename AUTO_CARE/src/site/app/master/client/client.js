(function () {
    //module
    angular.module("clientModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("clientModule")
            .factory("clientFactory", function ($http, systemConfig) {
                var factory = {};

                factory.lordClientFactory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                callback(data);
                            });
                };

                factory.saveClientFactory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client/insert-client";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                }

                //delete
                factory.deleteClientFactory = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client/delete-client/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });


    //controller
    angular.module("clientModule")
            .controller("clientController", function ($scope, $log, clientFactory, Notification, $timeout) {

                $scope.totalItems = 64;
                $scope.currentPage = 4;

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.pageChanged = function () {
                    $log.log('Page changed to: ' + $scope.currentPage);
                };
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.client = {
                        "indexNo": null,
                        "name": null,
                        "address1": null,
                        "address2": null,
                        "address3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "nic": null

                    };
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.client.name | $scope.model.client.mobile | $scope.model.client.nic !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //<-----------------http funtiion------------------->
                $scope.http.saveClient = function () {
                    $scope.model.client.branch = 1;
                    var detail = $scope.model.client;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    clientFactory.saveClientFactory(
                            detailJSON,
                            function (data) {
                                $scope.model.clientList.push(data);
                                Notification.success("Successfull Added..!!!")
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message)
                            }
                    );


                };

                $scope.http.deleteClient = function (indexNo, index) {
                    clientFactory.deleteClientFactory(indexNo, function () {
                        $scope.model.clientList.splice(index, 1);
                        Notification.success("delete success");
                    });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    
                    if ($scope.validateInput()) {
                        $scope.http.saveClient();
                    } else {
                        Notification.error("Please input detail");
                    }
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#nicText")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function (client, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.client = client;
                    $scope.model.clientList.splice(index, 1);

                    $scope.ui.focus();
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset mdel
                    $scope.model.reset();

                    //load pricepriceCategory


                    clientFactory.lordClientFactory(function (data) {
                        $scope.model.clientList = data;
                        console.log($scope.model.clientList);
                    });
                };

                $scope.ui.init();
            });
}());