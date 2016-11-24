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
                //insert department
                factory.insertDepartment = function (detail, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-departments/insert-detail";
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
                factory.deleteDepartmemt = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-departments/delete-detail/" + indexNo;
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
                $scope.ui.edit = function (department) {
                    $scope.ui.focus();
                    $scope.ui.mode = "EDIT";
                    $scope.model.department = department;
                    for (var i = 0; i < $scope.model.departmentList.length; i++) {
                        if ($scope.model.departmentList[i].indexNo === $scope.model.department.indexNo) {
                            $scope.model.departmentList.splice(i, 1);

                        }
                    }


                };
                //save department
                $scope.ui.save = function () {
                    if ($scope.model.department) {
                        $scope.http.insertItemDepartment();
                    } else {
                        Notification.error('No Item Department Name to Save ');
                    }

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
                    console.log(detailJSON);
                    //save detail dirrectly
                    itemDepartmentFactory.insertDepartment(
                            detailJSON,
                            function (data) {
                                Notification.success('success !');
                                $scope.model.departmentList.push(data);
                                $scope.model.department = {};

                            }
                    , function (data) {
                        Notification.error(data.message);

                    }
                    );
                };
                $scope.http.deleteDepartment = function (indexNo) {
                    if (indexNo) {
                        itemDepartmentFactory.deleteDepartmemt(indexNo, function () {
                            for (var i = 0; i < $scope.model.departmentList.length; i++) {
                                if ($scope.model.departmentList[i].indexNo === indexNo) {
                                    $scope.model.departmentList.splice(i, 1);
                                    break;
                                }
                            }
                            Notification.success(indexNo + ' Department Delete Successfully');
                        });
                    }
                };
            });
}());