(function () {
    angular.module("brandModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("brandModule")
            .factory("brandFactory", function ($http, systemConfig) {
                var factory = {};
                //load sub category
                factory.loadBrand = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/brand";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveBrand = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/brand/save-brand";
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

                //delete funtion
                factory.deleteBrand = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/brand/delete-brand/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });

    //Controller
    angular.module("brandModule")
            .controller("brandController", function ($scope, brandFactory, Notification,$timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.brand = [];


                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.brand = {
                        "indexNo": null,
                        "name": null
                    };
                };

                //----------validate funtion-------------

                $scope.validateInput = function () {
                    if ($scope.model.brand.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //----------http funtion----------------

                $scope.http.deleteBrand = function (IndexNo, index) {
                    brandFactory.deleteBrand(IndexNo, function () {
                        Notification.success("delete success");
                        $scope.model.brandList.splice(index, 1);
                    });
                };



                //save function 
                $scope.http.saveBrand = function () {
                    var detail = $scope.model.brand;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);


                    brandFactory.saveBrand(
                            detailJSON,
                            function (data) {                              
                                $scope.model.brandList.push(data);
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
                        $scope.http.saveBrand();
                    } else {
                        Notification.error("Please Input Details");
                    }
                };


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#categoryText")[0].focus();
                    }, 10);
                };

                //edit function 
                $scope.ui.edit = function (subCategory, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.brand = subCategory;
                    $scope.model.brandList.splice(index, 1);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();

                    
                    //lord brand
                    brandFactory.loadBrand(function (data) {
                        $scope.model.brandList = data;
                    });
                };
                
                $scope.ui.init();
            });
}());

