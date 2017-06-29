(function () {
//module
    angular.module("employeeAssignmentModule", ['ui-notification']);
    //http factory
    angular.module("employeeAssignmentModule")
            .factory("employeeAssignmentFactory", function ($http, systemConfig) {
                var factory = {};
                //load Jobs
                factory.loadEmployees = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/employee";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                factory.employeesAttendance = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/employee-attendance";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load Bays
                factory.loadBays = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay/get-bays-by-branch-employee-is-view";
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
                //insert 
                factory.insertDetail = function (detail, callback, errorcallback) {
                    
                    var url = systemConfig.apiUrl + "/api/care-point/transaction/employee-assignment/insert-detail";
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
    angular.module("employeeAssignmentModule")
            .controller("employeeAssignmentController", function ($scope, $timeout, $filter, employeeAssignmentFactory, Notification) {
                $scope.ui = {};
                $scope.model = {};
                $scope.http = {};
                $scope.model.employeeAssignment = {
                    "bay": {
                        timeout: null
                    },
                    "employee": null
                };

                $scope.model.jobAssignmentList = [];
                $scope.model.employeeList = [];
                $scope.model.employeesAttendanceList = [];
                $scope.model.vehicles = [];
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

                $scope.dragLeave = function (bay, emp) {

//                    if ($scope.dragableMode) {
//
//                        $scope.dragableMode = false;
//                        var vehicleCount = 0;
//                        employeeAssignmentFactory.getBayAssignVehicleCount(bay.indexNo,
//                                function (data) {
//                                    vehicleCount = data;
//
//                                    $scope.isSameBay = false;
//                                    for (var i = 0; i < $scope.model.jobList.length; i++) {
//                                        if ($scope.model.jobList[i].bay === bay.indexNo) {
//                                            if ($scope.model.jobList[i].vehicle === job.vehicle) {
//                                                $scope.isSameBay = true;
//                                                break;
//                                            }
//                                        }
//                                    }
//                                    if ($scope.isSameBay) {
//                                        $scope.model.jobAssignment.bay.timeout = '';
//                                        Notification.error('Same Bay Assignment fail !');
//                                    } else {
//
//                                        if (vehicleCount < bay.maxVehicle) {
                    $scope.model.employeeAssignment.employee = emp;
                    $scope.model.employeeAssignment.bay = bay;
                    $scope.model.employeeAssignment.bay.timeout = 5;
                    $scope.onTimeout($scope.model.employeeAssignment.bay);
//
//                                        } else {
//                                            Notification.error('Max vehicle Assign for this bay !');
//                                        }
//                                    }
//                                });
//                    }
//                    $scope.dragableMode = true;
//                    
                };
                $scope.getEmployee = function (employee) {
                    for (var i = 0; i < $scope.model.employeeList.length; i++) {
                        if ($scope.model.employeeList[i].indexNo === employee) {
                            return $scope.model.employeeList[i];
                            break;
                        }
                    }
                };
                $scope.onTimeout = function (bay) {

                    if ($scope.model.employeeAssignment.bay.timeout !== '') {
                        var mytimeout = $timeout($scope.onTimeout, 1000);
                        $scope.model.employeeAssignment.bay.timeout--;

                        if ($scope.model.employeeAssignment.bay.timeout === 0) {
                            $timeout.cancel(mytimeout);
                            $scope.http.insertDetail();
                        }
                    } else {
                        $scope.model.employeeAssignment.bay.timeout = '';
                    }

                };

                $scope.http.insertDetail = function () {
                    console.log('save method');
                    $scope.model.employeeAssignment.inTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    $scope.model.employeeAssignment.outTime = null;
                    var detail = $scope.model.employeeAssignment;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    if ($scope.model.employeeAssignment.bay) {
                        if ($scope.model.employeeAssignment.employee) {
                            $scope.model.employeeAssignment.employee=$scope.model.employeeAssignment.employee.indexNo;
                            $scope.model.employeeAssignment.bay=$scope.model.employeeAssignment.bay.indexNo;
                            console.log($scope.model.employeeAssignment);
                            employeeAssignmentFactory.insertDetail(
                                    detailJSON,
                                    function (data) {
//                                        var vehicle = $scope.getVehicle(data.jobCard.vehicle);
//
//                                        Notification.success(vehicle.vehicleNo + ' Vehicle Assigned to ' + data.bay.name + ' successfully');
//                                        $scope.model.employeeAssignment = data;
//                                        $scope.model.jobList = [];
//                                        $scope.model.bayList = [];

                                        $scope.ui.init();
                                    }
                            , function (data) {
                                Notification.error(data);

                            });
                        } else {
                            Notification.error('Select a employee to Transfer');
                        }
                    } else {
                        Notification.error('Select a Bay to Transfer');
                    }


                };
                $scope.ui.init = function () {

                    employeeAssignmentFactory.loadEmployees(function (data) {
                        $scope.model.employeeList = data;
                    });
                    employeeAssignmentFactory.employeesAttendance(function (data) {
                        $scope.model.employeesAttendanceList = data;
                    });

                    employeeAssignmentFactory.loadBays(function (data) {
                        $scope.model.bayList = data;
                    });

                    employeeAssignmentFactory.loadVehicles(function (data) {
                        $scope.model.vehicles = data;
                    });


                };
                $scope.ui.init();
            });
}());
