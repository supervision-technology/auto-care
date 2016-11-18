(function () {
    angular.module("itemModule", ['ui-notification']);

    angular.module("itemModule")
            .factory("itemFactory", function ($http, systemConfig) {
                var factory = {};

                //load employee
                factory.loadItem = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load Item Department
                factory.loadItemDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };

                //load Category
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };

                //load sub category
                factory.loadSubCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save
                factory.saveItem = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item/save-item";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };
                return factory;
            });

    angular.module("itemModule")
            .controller("itemController", function ($scope, itemFactory, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.unitList = [];

                //------------------ model functions ---------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.item = {
                        "indexNo": null,
                        "name": null,
                        "barcode": null,
                        "printDecription": null,
                        "unit": null,
                        "salePrice": null,
                        "costPrice": null,
                        "type": null,
                        "department": null,
                        "brand": null,
                        "category": null,
                        "subCategory": null,
                        "branch": null,
                        units: [
                            {
                                indexNo: null,
                                item: null,
                                name: null,
                                salePrice: null,
                                costPrice: null,
                                qty: null
                            }
                        ]
                    };
                };

                //reset units
                $scope.model.resetUnits = function () {
                    $scope.model.item = {
                        units: [
                            {
                                indexNo: null,
                                item: null,
                                name: null,
                                salePrice: null,
                                costPrice: null,
                                qty: null
                            }
                        ]
                    };

                };



                //----------http funtion--------
                $scope.http.saveItem = function () {
                    $scope.model.item.branch = 1;
                    var detail = $scope.model.item;
                    var detailJSON = JSON.stringify(detail);

                    itemFactory.saveItem(
                            detailJSON,
                            function (data) {
                                Notification.success("success");
                                $scope.model.reset();
//                                $scope.ui.focus();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };



                //----------ui funtion-----------
                //focus
//                $scope.ui.focus = function () {
//                    $timeout(function () {
//                        document.querySelectorAll("#route")[0].focus();
//                    }, 10);
//                };

                $scope.ui.setTabPane = function (int) {
                    if (int === 0) {
                        $scope.ui.mode = "IDEAL";
                    }
                    if (int === 1) {
                        $scope.ui.mode = "NEW2";
                    }
                };


                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                //save
                $scope.ui.save = function () {
//                    if ($scope.validateInput()) {
                    $scope.http.saveItem();
//                    } else {
//                        Notification.error("Please input Details");
//                    }
                };

                $scope.ui.add = function () {
                    var unitdetail = $scope.model.item.units;
                    $scope.model.unitList.push(unitdetail);
                    $scope.model.resetUnits();
                };

                //edit
                $scope.ui.edit = function (details, index) {
                    $scope.model.item.units = details;
                    $scope.model.unitList.splice(index, 1);
                };



                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset
                    $scope.model.reset();

                    //load item
                    itemFactory.loadItem(function (data) {
//                        console.log(data);
                        $scope.model.itemList = data;
                    });
                    //load item departmet
                    itemFactory.loadItemDepartment(function (data) {
                        console.log(data);
                        $scope.model.itemDepartmentList = data;
                    });
                    //load category
                    itemFactory.loadCategory(function (data) {
                        $scope.model.categoryList = data;
                    });
                    //load category
                    itemFactory.loadSubCategory(function (data) {
                        $scope.model.subCategoryList = data;
                    });

                };
                $scope.ui.init();
            });
}());