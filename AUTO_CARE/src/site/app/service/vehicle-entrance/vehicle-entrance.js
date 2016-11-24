(function () {
//module
    angular.module("vehicleEntranceModule", ['ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("vehicleEntranceModule")
            .factory("vehicleEntranceFactory", function ($http, systemConfig) {
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

                factory.getJobHistory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-history";
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

                factory.getJobItemHistory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/find-job-item-history";
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

                factory.newJobCart = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/insert-detail";
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
    angular.module("vehicleEntranceModule")
            .controller("vehicleEntranceController", function ($scope, vehicleEntranceFactory, $modal) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.vehicle = {
                    "client": null,
                    "priceCategory": null
                };

                $scope.ui.getVehicleSelections = function (model) {
                    $scope.model.vehicle.client = model.client;
                    $scope.model.vehicle.priceCategory = model.priceCategory;

                    var detailJSON = JSON.stringify(model);
                    vehicleEntranceFactory.getJobHistory(
                            detailJSON,
                            function (data) {
                                $scope.model.joCard = data;
                                console.log($scope.model.joCard[0].date);
                            },
                            function (data) {
                                console.log(data);
                            }
                    );
                };

                $scope.ui.getDefarancedate = function (date) {
                    var d1 = new Date(date);
                    var cur = new Date();
                    var defarance = (cur.getFullYear() * 12 + cur.getMonth()) - (d1.getFullYear() * 12 + d1.getMonth());
                    return defarance;
                };
//
//                $scope.oilUsage = 6000;
//                $scope.difarance = 0;
//                $scope.oilStatus = 0;
//                $scope.getNewKmRunningCount = function (newKmRunningCount) {
//                    if (newKmRunningCount <= $scope.vehicleDetail.runningKm) {
//                        Notification.error('Please Check And Valid Input');
//                    } else {
//                        $scope.newKmRunningCount = newKmRunningCount;
//                        $scope.difarance = newKmRunningCount - $scope.vehicleDetail.runningKm;
//                        $scope.oilStatus = $scope.oilUsage - $scope.difarance;
//                    }
//                };
//

                $scope.historySelectionDetail = function ($index, jobCard) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;

                    var detailJSON = JSON.stringify(jobCard);
                    vehicleEntranceFactory.getJobItemHistory(
                            detailJSON,
                            function (data) {
                                $scope.model.itemdetail = data;
                            },
                            function (data) {
                                console.log(data);
                            }
                    );
                };

                $scope.getJobItemHistory = function (jobCard) {
                    var detailJSON = JSON.stringify(jobCard);
                    vehicleEntranceFactory.getJobItemHistory(
                            detailJSON,
                            function (data) {
                                $scope.model.itemdetail = data;
                            },
                            function (data) {
                                console.log(data);
                            }
                    );
                };

                $scope.ui.init = function () {
                    vehicleEntranceFactory.loadVehicle(function (data) {
                        $scope.model.vehicle = data;
                    });
                };
                $scope.ui.init();
            });
}());