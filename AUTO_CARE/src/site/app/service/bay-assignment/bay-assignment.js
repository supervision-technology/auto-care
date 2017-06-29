(function () {
//module
    angular.module("bayAssignmentModule", ['ui-notification']);
    //http factory
    angular.module("bayAssignmentModule")
            .factory("bayAssignmentFactory", function ($http, systemConfig) {
                var factory = {};
                //load Jobs
                factory.loadJobs = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/get-not-finished-job-cards";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Bays
                factory.loadBays = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay/get-bays-by-branch-is-view";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Vehicles
                factory.loadVehicles = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Vehicle  Types
                factory.loadVehicleTypes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/vehicle-type";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //insert 
                factory.insertDetail = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/vehicle-assignment/insert-detail";
                    $http.post(url, detail)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                //insert 
                factory.finishJob = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/vehicle-assignment/job-finished";
                    $http.post(url, detail)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                //get Bay Assign Vehicle Count
                factory.getBayAssignVehicleCount = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/vehicle-assignment/load_not_finished_vehicle_assignment/" + detail;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                return factory;
            });
    //controller
    angular.module("bayAssignmentModule")
            .controller("bayAssignmentController", function ($scope, $timeout, $filter, bayAssignmentFactory, Notification) {
                $scope.ui = {};
                $scope.model = {};
                $scope.http = {};
                $scope.model.jobAssignment = {
                    "bay": {
                        timeout: null
                    },
                    "jobCard": {}
                };

                $scope.model.jobAssignmentList = [];
                $scope.model.jobList = [];
                $scope.model.vehicles = [];
                $scope.model.vehicleTypes = [];
                $scope.dragableMode = true;
                $scope.model.bayList = [
                    {
                        timeout: null
                    }
                ];
//
                $scope.stop = function (bay) {
                    bay.timeout = '';
//                    $timeout.cancel(mytimeout);

                };
                $scope.dragStart = function (element, model) {
                };

                $scope.dragLeave = function (bay, job) {
                    if ($scope.dragableMode) {

                        $scope.dragableMode = false;
                        var vehicleCount = 0;
                        bayAssignmentFactory.getBayAssignVehicleCount(bay.indexNo,
                                function (data) {
                                    vehicleCount = data;

                                    $scope.isSameBay = false;
                                    for (var i = 0; i < $scope.model.jobList.length; i++) {
                                        if ($scope.model.jobList[i].bay === bay.indexNo) {
                                            if ($scope.model.jobList[i].vehicle === job.vehicle) {
                                                $scope.isSameBay = true;
                                                break;
                                            }
                                        }
                                    }
                                    if ($scope.isSameBay) {
                                        $scope.model.jobAssignment.bay.timeout = '';
                                    } else {

                                        if (vehicleCount < bay.maxVehicle) {
                                            $scope.model.jobAssignment.jobCard = job;
                                            $scope.model.jobAssignment.bay = bay;
                                            $scope.model.jobAssignment.bay.timeout = 5;
                                            $scope.onTimeout($scope.model.jobAssignment.bay);

                                        } else {
                                            Notification.error('Max vehicle Assign for this bay !');
                                        }
                                    }
                                });
                    }
                    $scope.dragableMode = true;
//                    
                };
                $scope.getVehicle = function (vehicle) {
                    for (var i = 0; i < $scope.model.vehicles.length; i++) {
                        if ($scope.model.vehicles[i].indexNo === vehicle) {
                            return $scope.model.vehicles[i];
                            break;
                        }
                    }
                };
                $scope.getJobCard = function (jobId) {
                    for (var i = 0; i < $scope.model.jobList.length; i++) {
                        if ($scope.model.jobList[i].indexNo === jobId) {
                            return $scope.model.jobList[i];
                            break;
                        }
                    }
                };
                $scope.getBay = function (bayIndex) {
                    for (var i = 0; i < $scope.model.bayList.length; i++) {
                        if ($scope.model.bayList[i].indexNo === bayIndex) {
                            return $scope.model.bayList[i];
                            break;
                        }
                    }
                };


                $scope.doJobFinish = function (job) {
                    var jobCard = job;
                    jobCard.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

                    var detail = jobCard;
                    var detailJSON = JSON.stringify(detail);
                    console.log(jobCard);
                    bayAssignmentFactory.finishJob(
                            detailJSON,
                            function (data) {
                                Notification.success('Job Finished Success !');
                            }
                    , function (data) {
                        Notification.error(data.message);

                    });
                };
                $scope.onTimeout = function (bay) {

                    if ($scope.model.jobAssignment.bay.timeout !== '') {
                        var mytimeout = $timeout($scope.onTimeout, 1000);
                        $scope.model.jobAssignment.bay.timeout--;

                        if ($scope.model.jobAssignment.bay.timeout === 0) {
                            $timeout.cancel(mytimeout);
                            $scope.http.insertDetail();
                        }
                    } else {
                        $scope.model.jobAssignment.bay.timeout = '';
                    }

                };

                $scope.http.insertDetail = function () {
                    $scope.model.jobAssignment.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $scope.model.jobAssignment.outTime = null;
                    $scope.model.jobAssignment.branch = 1;
                    $scope.model.jobAssignment.date = new Date();
                    $scope.model.jobAssignment.bay = $scope.model.jobAssignment.bay.indexNo;
                    $scope.model.jobAssignment.jobCard = $scope.model.jobAssignment.jobCard.indexNo;
                    var detail = $scope.model.jobAssignment;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    if ($scope.model.jobAssignment.bay) {
                        if ($scope.model.jobAssignment.jobCard) {
                            bayAssignmentFactory.insertDetail(
                                    detailJSON,
                                    function (data) {
                                        console.log(data);
                                        var vehId = $scope.getJobCard(data.jobCard).vehicle;
                                        Notification.success($scope.getVehicle(vehId).vehicleNo + ' Vehicle Assigned to ' + $scope.getBay(data.bay).name + ' successfully');

                                        for (var i = 0; i < $scope.model.jobList.length; i++) {
                                            if ($scope.model.jobList[i].indexNo === data.jobCard) {
                                                $scope.model.jobList[i].bay = data.bay;
                                            }
                                        }
                                    }
                            );
                        } else {
                            Notification.error('Select a Bay to Transfer');
                        }
                    } else {
                        Notification.error('Select a Vehicle to Transfer');
                    }


                };
                $scope.ui.init = function () {

                    bayAssignmentFactory.loadJobs(function (data) {
                        $scope.model.jobList = data;
                    });

                    bayAssignmentFactory.loadBays(function (data) {
                        $scope.model.bayList = data;
                    });

                    bayAssignmentFactory.loadVehicles(function (data) {
                        $scope.model.vehicles = data;
                    });
                    bayAssignmentFactory.loadVehicleTypes(function (data) {
                        $scope.model.vehicleTypes = data;
                    });


                };
                $scope.ui.init();
            });
}());
