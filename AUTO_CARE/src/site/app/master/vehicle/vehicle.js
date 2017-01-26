(function () {
    //module
    angular.module("vehicleModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("vehicleModule")
            .factory("vehicleFactory", function ($http, systemConfig) {
                var factory = {};

                factory.loadVehicle = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.lordClient = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.lordVehicleType = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle-type";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data)
                            })
                            .error(function (data, status, headers) {

                            });
                }
                factory.lordPriceCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/priceCategory";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                callback(data);
                            });
                };

                factory.insertVehicle = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle/insert-detail";
                    $http.post(url, summary)
                            .success(function (data, status, heaers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorCallback(data);
                            });
                };
                factory.deleteVehicle = function (indexNo, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle/delete-detail/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorCallback(data);
                            });
                };

                return factory;
            });


    //controller
    angular.module("vehicleModule")
            .controller("vehicleController", function ($scope, $log, vehicleFactory, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.vehicle = [];


                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.vehicle = {};

                };

                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#clientText")[0].focus();
                    }, 10);
                };

                //----------validate funtion-------------

                $scope.validateInput = function () {
                    if ($scope.model.vehicle.client) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------

                $scope.http.deleteVehicle = function (indexNo, index) {
                    vehicleFactory.deleteVehicle(
                            indexNo,
                            function () {
                                $scope.model.vehicleList.splice(index, 1);
                                Notification.success("delete success");
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };



                //save function 
                $scope.http.saveVehicle = function () {
                    var detail = $scope.model.vehicle;
                    var detailJSON = JSON.stringify(detail);
                    vehicleFactory.insertVehicle(
                            detailJSON,
                            function (data) {
                                $scope.model.vehicleList.push(data);
                                Notification.success("Successfully Added");
                                $scope.model.reset();

                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );

                };

                //----------------ui funtion--------------
                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveVehicle();
                    }else{
                        Notification.error("Please Input Details")
                    }
                };


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                //edit function 
                $scope.ui.edit = function (vehicles, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.vehicle = vehicles;
                    $scope.model.vehicleList.splice(index, 1);
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();
                    //load SubItem
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicleList = data;
                    });
                    vehicleFactory.lordClient(function (data) {
                        $scope.model.clientList = data;
                    });
                    vehicleFactory.lordVehicleType(function (data) {
                        $scope.model.vehicleTypeList = data;
                    });
                    vehicleFactory.lordPriceCategory(function (data) {
                        $scope.model.priceCategoryList = data;
                    });
                };
                $scope.ui.init();

            });
}());


