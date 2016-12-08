(function () {
    //module
    angular.module("itemDepartmentModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("itemDepartmentModule")
            .factory("itemDepartmentFactory", function ($http, systemConfig) {
                var factory = {};

                //load Item Department
                factory.loadItemDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-departments";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load recent weigh
                factory.loadSummary = function (number, callback) {
                    var url = systemConfig.apiUrl + "" + number;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //update or save summary
                factory.saveSummary = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/green-leaves-weigh/save-summary";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //insert department
                factory.insertDepartment = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments/insert-detail";
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

                //delete 
                factory.deleteDepartmemt = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments/delete-detail/" + indexNo;
                    $http.delete(url)
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
    angular.module("itemDepartmentModule")
            .controller("itemDepartmentController", function ($scope, $log, itemDepartmentFactory, Notification, $timeout) {
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
                $scope.model.department = {};
                $scope.model.tempDepartment = {};
//                $scope.model.department.name = null;
//                $scope.model.department.indexNo = 0;

                //ui models
                $scope.ui = {};
                $scope.ui.event = "";

                //http models
                $scope.http = {};

                $scope.maxSize = 5;
                $scope.bigTotalItems = 175;
                $scope.bigCurrentPage = 1;

                $scope.model.departmentList = [];




                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#itemText")[0].focus();
                    }, 10);
                };

                //new function   
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };

                $scope.ui.keyEvent = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();

                    }
                };

                //edit function
                $scope.ui.edit = function (department, indexNo) {
                    $scope.ui.focus();
                    $scope.ui.mode = "EDIT";
                    $scope.model.department = department;
                    $scope.model.departmentList.splice(indexNo, 1);
                };
                //save department
                $scope.ui.save = function () {
                    if ($scope.model.department) {
                        $scope.http.insertItemDepartment();
                    } else {
                        Notification.error('No Item Department Name to Save ');
                    }
                    $scope.ui.focus();

                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model = {};
                    //load routes
                    itemDepartmentFactory.loadItemDepartment(function (data) {
                        $scope.model.departmentList = data;
                    });
                };
                $scope.ui.init();

                $scope.http.insertItemDepartment = function () {
                    var detail = $scope.model.department;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    itemDepartmentFactory.insertDepartment(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Item Department Save Successfully");
                                $scope.model.departmentList.push(data);
                                $scope.model.department = {};

                            }
                    , function (data) {
                        Notification.error(data.message);

                    }
                    );
                };
                $scope.http.deleteDepartment = function (indexNo, index) {
                    if (indexNo) {
                        itemDepartmentFactory.deleteDepartmemt(indexNo
                                , function () {
                                    $scope.model.departmentList.splice(index, 1);
                                    Notification.error(indexNo + ' Department Delete Successfully');
                                    $scope.ui.mode="IDEAL";
                                }
                        , function (data) {
                            Notification.error(data);
                        });
                    }
                };
            });
}());