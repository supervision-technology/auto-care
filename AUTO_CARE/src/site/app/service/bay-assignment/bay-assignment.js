(function () {
//module
    angular.module("bayAssignmentModule", ['ui-notification']);
    //http factory
    angular.module("bayAssignmentModule")
            .factory("bayAssignmentFactory", function ($http, systemConfig) {
                var factory = {};
                //load Jobs
                factory.loadJobs = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Bays
                factory.loadBays = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay";
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
                $scope.model.bayList = [
                    {
                        timeout: null
                    }
                ];
//                // Model to JSON for demo purpose
//                $scope.$watch('models', function (model) {
//                    $scope.modelAsJson = angular.toJson(model, true);
//                }, true);
//
//                $scope.onTimeout = function (bay) {
//                    bay.timeout--;
////                    $scope.model.counter=60;
//                    console.log(bay.timeout);
//                    mytimeout = $timeout($scope.onTimeout, 1000);
//                    if (bay.timeout === 0) {
//                        $timeout.cancel(mytimeout);
//                        $scope.http.insertDetail();
//                    }
//                    console.log(bay.timeout);
//                };
//
                $scope.stop = function (bay) {
                    console.log('stop');
                    bay.timeout = 'canceled';
                    $timeout.cancel(mytimeout);

                };
                $scope.dragStart = function (element, model) {
//                    console.log("AA");
//                    console.log(model);
                };
                $scope.dragLeave = function (bay, job) {
                    $scope.check = false;
                    console.log(bay);
                    console.log(job);
                    
                    for (var i = 0; i < $scope.model.jobList.length; i++) {
                        if ($scope.model.jobList[i].bay === bay.indexNo) {
                            $scope.check = true;
                            break;
                        }
                    }
                    if (!$scope.check) {
                        $scope.model.jobAssignment.jobCard = job;
                        $scope.model.jobAssignment.bay = bay;
                        $scope.model.jobAssignment.bay.timeout = 5;
                        $scope.onTimeout($scope.model.jobAssignment.bay);
                    }else{
                        Notification.error('Already exsist to '+bay.name);
                    }
//                    
                };
                $scope.onTimeout = function (bay) {
                    if ($scope.model.jobAssignment.bay.timeout !== 'canceled') {
                        var mytimeout = $timeout($scope.onTimeout, 1000);
                        $scope.model.jobAssignment.bay.timeout--;
                        if ($scope.model.jobAssignment.bay.timeout === 0) {
                            $timeout.cancel(mytimeout);
                            $scope.http.insertDetail();
                        }
                    } else {
                        $scope.model.jobAssignment.bay.timeout = 'canceled';
                    }
                };

                $scope.http.insertDetail = function () {
                    $scope.model.jobAssignment.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $scope.model.jobAssignment.outTime = '';
                    $scope.model.jobAssignment.branch = 1;
                    $scope.model.jobAssignment.date = new Date();
                    var detail = $scope.model.jobAssignment;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    if ($scope.model.jobAssignment.bay) {
                        if ($scope.model.jobAssignment.jobCard) {
                            bayAssignmentFactory.insertDetail(
                                    detailJSON,
                                    function (data) {
                                        Notification.success(data.jobCard.vehicle.vehicleNo + ' Vehicle Assigned to ' + data.bay.name + ' successfully');
                                        $scope.model.jobAssignment = data;
                                        $scope.model.jobList = [];
                                        $scope.model.bayList = [];

                                        $scope.ui.init();
                                    }
                            , function (data) {
                                Notification.error(data);

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
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].status !== "Complete") {
                                    $scope.model.jobList.push(data[i]);
                                }
                            }
                        }
                    });
                    bayAssignmentFactory.loadBays(function (data) {
                        $scope.model.bayList = data;
                    });
                };
                $scope.ui.init();
            });
}());
