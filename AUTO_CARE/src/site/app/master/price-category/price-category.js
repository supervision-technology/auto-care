(function () {
    //module
    angular.module("priceCategoryModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("priceCategoryModule")
            .factory("priceCategoryFactory", function ($http, systemConfig) {
                var factory = {};

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

                factory.savePriceCategory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/priceCategory/insert-detail";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorCallback(data);
                            });
                };


                factory.deletePriceCategory = function (indexNo, callback,errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/priceCategory/delete-detail/" + indexNo;

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
    angular.module("priceCategoryModule")
            .controller("priceCategoryController", function ($scope, $log, priceCategoryFactory, Notification, $timeout) {

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
                    $scope.model.priceCategory = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.priceCategory.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //<-----------------http funtiion------------------->
                $scope.http.savePriceCategory = function () {
                    var detail = $scope.model.priceCategory;
                    var detailJSON = JSON.stringify(detail);
                    //save
                    priceCategoryFactory.savePriceCategory(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - "+"Price Category Save Successfully");
                                $scope.model.priceCategoryList.push(data);
                                $scope.model.reset();
                               
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.http.deletePriceCategory = function (indexNo, index) {
                    console.log(indexNo, index);
                    priceCategoryFactory.deletePriceCategory(
                            indexNo,
                            function () {
                                $scope.model.priceCategoryList.splice(index, 1);
                                Notification.error(indexNo + " - "+"Price Category delete Successfully");
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.savePriceCategory();
                    } else {
                        Notification.error("please input price category to save");
                    }
                     $scope.ui.focus();
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#priceCategoryTexts")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function (priceCategory, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.priceCategory = priceCategory;
                    $scope.model.priceCategoryList.splice(index, 1);

                    $scope.ui.focus();
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset mdel
                    $scope.model.reset();

                    //load pricepriceCategory


                    priceCategoryFactory.lordPriceCategory(function (data) {
                        $scope.model.priceCategoryList = data;
                    });
                };

                $scope.ui.init();
            });
}());