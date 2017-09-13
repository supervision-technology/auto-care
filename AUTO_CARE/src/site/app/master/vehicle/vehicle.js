(function () {
    //module
    angular.module("vehicleModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("vehicleModule")
            .factory("vehicleFactory", function ($http, systemConfig) {
                var factory = {};

                factory.findByVehicleNumber = function (vehicleNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle/find-by-vehicle-no/" + vehicleNo;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
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
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
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

                $scope.model = {};
                $scope.ui = {};
                $scope.http = {};
                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;
                $scope.model.vehicle = {};
                $scope.model.vehicleList = [];

                $scope.model.searchKeyword = null;
                $scope.model.showSuggestions = false;
                $scope.model.searchSuggestions = [];


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
                    } else {
                        Notification.error("Please Input Details");
                    }
                };

                $scope.clientData = function (indexNo) {
                    var client = "";
                    angular.forEach($scope.model.clientList, function (value) {
                        console.log(indexNo);
                        console.log(value.indexNo + " - " + value.name);
                        if (value.indexNo === parseInt(indexNo)) {
                            client = value;
                            return;
                        }
                    });
                    return client;
                };

                $scope.clientLable = function (indexNo) {
                    var client;
                    angular.forEach($scope.model.clientList, function (value) {
                        if (value.indexNo === indexNo) {
                            client = value.indexNo + ' - ' + value.name;
                            return;
                        }
                    });
                    return client;
                };

                $scope.vehicleTypeLabel = function (indexNo) {
                    var vehicleType;
                    angular.forEach($scope.model.vehicleTypeList, function (value) {
                        if (value.indexNo === indexNo) {
                            vehicleType = value.indexNo + ' - ' + value.model;
                            return;
                        }
                    });
                    return vehicleType;
                };

                $scope.priceCategoryLabel = function (indexNo) {
                    var priceCategory;
                    angular.forEach($scope.model.priceCategoryList, function (value) {
                        if (value.indexNo === indexNo) {
                            priceCategory = value.name;
                            return;
                        }
                    });
                    return priceCategory;
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.model.reset();
                    $scope.ui.focus();
                };

                //edit function 
                $scope.ui.edit = function (vehicles, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.vehicle = vehicles;
                    $scope.model.vehicleList.splice(index, 1);
                };
                $scope.model.loadAllVehicles = function () {
                    vehicleFactory.loadVehicle(function (data) {
                        $scope.model.vehicleList = data;
                    }, function (data) {
                        Notification.error(data.message);
                    });
                };


                $scope.model.findByVehicleNumber = function () {
                    vehicleFactory.findByVehicleNumber($scope.model.searchKeyword, function (data) {
                        $scope.model.searchSuggestions = data;
                        console.log(data);
                    }, function () {
                        $scope.mode.searchSuggestions = [];
                    });
                };
                $scope.ui.setVehicleData = function (vehicle) {
                    $scope.model.vehicle = vehicle;
                    $scope.ui.mode = "EDIT";
                    $scope.model.searchKeyword = null;
                };
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    vehicleFactory.lordClient(function (data) {
                        $scope.model.clientList = data;
                    });
                    vehicleFactory.lordVehicleType(function (data) {
                        $scope.model.vehicleTypeList = data;
                    });
                    vehicleFactory.lordPriceCategory(function (data) {
                        $scope.model.priceCategoryList = data;
                    });

                    $scope.$watch('model.searchKeyword', function (newV, oldV) {
                        $scope.model.showSuggestions = newV && newV.length;

                        if (newV && newV.length >= 2) {
                            //load from server
                            $scope.model.findByVehicleNumber();
                        }
                    });

                    $scope.$watch('model.vehicle', function (newVal) {
                        if (newVal) {
                            $scope.model.showSuggestions = !$scope.model.vehicle;
                        }
                    });

//                    $scope.model.loadAllVehicles();
//                    vehicleFactory.loadVehicle(function (data) {
//                        $scope.model.vehicleList = [];
//                        angular.forEach(data, function (vehicle) {
//                            vehicle.clientName = $scope.clientData(vehicle.client).name;
//                            $scope.model.vehicleList.push(vehicle);
//
//                        });
//                    });

                };
                $scope.ui.init();

            });
}());


