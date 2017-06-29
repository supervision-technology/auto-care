(function () {
    angular.module("ItemCategoryModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("ItemCategoryModule")
            .factory("categoryFactory", function ($http, systemConfig) {
                var factory = {};

                //load category
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //save or update
                factory.saveCategory = function (category, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-category/save-category";


                    $http.post(url, category)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });

                };

                //delete
                factory.deleteCategory = function (indexNo, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-category/delete-category/" + indexNo;
                    $http.delete(url)
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

    angular.module("ItemCategoryModule")
            .controller("ItemCategoryController", function ($scope,$log, categoryFactory, Notification, $timeout) {
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
                    $scope.model.category = {};
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.category.name) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //<-----------------http funtiion------------------->
                $scope.http.saveCategory = function () {
                    var detail = $scope.model.category;
                    var detailJSON = JSON.stringify(detail);
                    //save
                    categoryFactory.saveCategory(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - "+"Category Save Successfully");
                                $scope.model.categorys.push(data);
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.http.deleteCategory = function (indexNo, index) {
                    categoryFactory.deleteCategory(indexNo
                    , function () {
                        $scope.model.categorys.splice(index, 1);
                        Notification.error(indexNo + " - "+"Category Delete Successfully");
                    }
                    , function (data) {
                        Notification.error(data);
                    });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveCategory();
                    } else {
                        Notification.error("Please Input Detail");
                    }
                    $scope.ui.focus();
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#category")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function (categorys, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.category = categorys;
                    $scope.model.categorys.splice(index, 1);

                    $scope.ui.focus();
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    $scope.model.reset();
                    //load category
                    categoryFactory.loadCategory(function (data) {
                        console.log(data);
                        $scope.model.categorys = data;
                    });
                };

                $scope.ui.init();

            });
}());