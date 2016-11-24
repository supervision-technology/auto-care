(function () {
//module
    angular.module("bayAssignmentModule", ['ui-notification']);
    //http factory
    angular.module("bayAssignmentModule")
            .factory("bayAssignmentFactory", function ($http, systemConfig) {
                var factory = {};
                //load Jobs
                factory.loadJobs = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/transaction/job-card";
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
                    var url = systemConfig.apiUrl + "/api/green-leaves/transaction/vehicle-assignment/insert-detail";
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
//                $scope.model.selectedBay = {};
//                $scope.model.selectedJob = {};
                $scope.model.jobAssignment = {
                    "selectedBay":{},
                    "selectedJob":{}
                };
                
                $scope.model.jobAssignment.selectedJob = {};
                $scope.model.jobAssignmentList = [];
                $scope.model.jobList = [];
                $scope.model.bayList = [];
//                // Model to JSON for demo purpose
//                $scope.$watch('models', function (model) {
//                    $scope.modelAsJson = angular.toJson(model, true);
//                }, true);
//
//                $scope.counter = 60;
//                $scope.onTimeout = function () {
//                    $scope.counter--;
//                    mytimeout = $timeout($scope.onTimeout, 1000);
//                    if ($scope.counter === 0) {
//                        $timeout.cancel(mytimeout);
//                    }
//                };
//
//                var mytimeout = $timeout($scope.onTimeout, 1000);
//                $scope.stop = function () {
//                    $timeout.cancel(mytimeout);
//                };

                $scope.grid1 = {x: 0, y: 0, w: 4, h: 6, color: "#CFEDFB", indexNo: 1};
                $scope.grid2 = {x: 4, y: 0, w: 4, h: 6, color: "#F0E3EF", indexNo: 2};
                $scope.grid3 = {x: 8, y: 0, w: 4, h: 6, color: "#FFE2D2", indexNo: 3};
                $scope.grid4 = {x: 0, y: 6, w: 4, h: 6, color: "#FFEBB6", indexNo: 4};
                $scope.grid5 = {x: 4, y: 6, w: 8, h: 6, color: "#E5EFC7", indexNo: 9};
                $scope.dragStart = function (element, model) {
                    console.log("AA");
                    console.log(model);
                };
                $scope.dragLeave = function (element, model) {
                    console.log("BB");
                    console.log(model);
                };
                $scope.ui.selectedJob = function (job) {
                    $scope.model.jobAssignment.selectedJob=job;
                 
                    console.log($scope.model.jobAssignment.selectedJob);
                };
                $scope.ui.selectedBay = function (bay) {
                    $scope.model.jobAssignment.selectedBay = bay;
                    console.log("abc");
                    console.log($scope.model.jobAssignment.selectedBay);
                    $scope.http.insertDetail();
                };
                $scope.http.insertDetail = function () {
                    $scope.model.jobAssignment.inTime = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
                    $scope.model.jobAssignment.outTime = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
                    $scope.model.jobAssignment.branch = 1;
                    $scope.model.jobAssignment.date = new Date();
                    var detail = $scope.model.jobAssignment;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    console.log(detailJSON);
//                    bayAssignmentFactory.insertDepartment(
//                            detailJSON,
//                            function (data) {
//
//                                Notification.success('success !');
//                            }
//                    , function (data) {
//                        Notification.error(data.message);
//
//                    }
//                    );
                };
                $scope.ui.init = function () {

                    $scope.model = {};
                    bayAssignmentFactory.loadJobs(function (data) {
                        $scope.model.jobList = data;
                    });
                    bayAssignmentFactory.loadBays(function (data) {
                        $scope.model.bayList = data;
                    });
                };
                $scope.ui.init();
            });
}());
