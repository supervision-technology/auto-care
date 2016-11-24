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
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-departments";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load Category
                factory.loadCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };

                //load sub category
                factory.loadSubCategory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/sub-category";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load brand
                factory.loadBrand = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/brand";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load packages
                factory.loadPackages = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item/all-packages";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //find item units
                factory.findByItem = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-unit/item";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //save item
                factory.saveItem = function (summary, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item/save-item";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });

                };

                //save package
                factory.savePackage = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/package-item/save-package";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorcallback(data);
                            });

                };

                //delete unit
                factory.deleteUnit = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-unit/delete-unit/" + indexNo;
                    $http.delete(url)
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
                $scope.ui.tableShow = 0;
                
                $scope.model.packageItemList = [];



                //------------------ model functions ---------------
                $scope.model.item = {
                    "indexNo": null,
                    "name": null,
                    "barcode": null,
                    "printDescription": null,
                    "unit": null,
                    "salePrice": null,
                    "costPrice": null,
                    "type": null,
                    "itemDepartment": null,
                    "brand": null,
                    "category": null,
                    "subCategory": null,
                    "branch": null,
                    unitList: []
                };


                $scope.tempUnit = {
                    indexNo: null,
                    name: null,
                    salePrice: null,
                    costPrice: null,
                    qty: null

                };

                //package model
                $scope.model.package = {
                    indexNo: null,
                    item: {},
                    packages: {}
                };


                //----------http funtion--------
                //save item
                $scope.http.saveItem = function () {
                    $scope.model.item.branch = 1;
                    var detail = $scope.model.item;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detail);

                    itemFactory.saveItem(
                            detailJSON,
                            function (data) {
                                Notification.success("successfully Added");
                                $scope.model.itemList.push(data);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

//                save package
                $scope.http.savePackage = function () {
                    $scope.model.package.packages.branch = 1;
                    $scope.model.package.packages.type = "PACKAGE";
                    var detail = $scope.model.package;
                    var detailJSON = JSON.stringify(detail);

                    itemFactory.savePackage(
                            detailJSON,
                            function (data) {
                                Notification.success("successfully Added");
                                $scope.model.packageItemList.push(data);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //find item 
                $scope.http.findByItem = function (item) {
                    var details = item;
                    var detailJSON = JSON.stringify(details);

                    itemFactory.findByItem(
                            detailJSON,
                            function (data) {
                                $scope.model.item.unitList = data;
                            });
                };

                //delete unit
                $scope.http.deleteUnit = function (IndexNo, index) {
                    itemFactory.deleteUnit(IndexNo, function () {
                        Notification.success("delete success");
//                        $scope.model.item.unitList.splice(index, 1);
                    });
                };


                //----------validation----------
                $scope.ui.validateUnits = function () {
                    if ($scope.tempUnit.name !== null) {
                        return true;
                    } else {
                        return false;
                    }
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
                        $scope.ui.tableShow = 1;
                        $scope.ui.mode = "SAVE";
                    }
                    if (int === 1) {
                        $scope.ui.tableShow = 2;
                        $scope.ui.mode = "ADD";
                    }
                    if (int === 2) {
                        $scope.ui.tableShow = 3;
                        $scope.ui.mode = "PACKAGE";
                    }
                };




                //new function
//                $scope.ui.new = function () {
//                    $scope.ui.mode = "NEW";
//                };

                //save item
                $scope.ui.save = function () {
                    $scope.http.saveItem();
                };

                //save package
                $scope.ui.savePackage = function () {
                    $scope.http.savePackage();
                };

                $scope.ui.addUnit = function () {
//                    $scope.tempUnit.item = null;
                    if ($scope.model.item.type !== null && $scope.model.item.name !== null && $scope.ui.validateUnits()) {
                        $scope.model.item.unitList.push($scope.tempUnit);
                        $scope.tempUnit = {};
                    } else {
                        Notification.error("Please enter product and unit detail");
                    }
                };

                //edit
                $scope.ui.edit = function (details, index) {
//                    $scope.model.item = details;
//                    $scope.model.item.unitList.splice(index, 1);
//                    $scope.model.resetUnit();
                };


                $scope.ui.init = function () {
                    //set ideal mode
//                    $scope.ui.mode = "IDEAL";
                    $scope.ui.mode = "SAVE";
                    $scope.ui.tableShow = 1;

                    //load item
                    itemFactory.loadItem(function (data) {
                        $scope.model.itemList = data;
                    });
                    //load item departmet
                    itemFactory.loadItemDepartment(function (data) {
                        $scope.model.itemDepartmentList = data;
                    });
                    //load category
                    itemFactory.loadCategory(function (data) {
                        $scope.model.categoryList = data;
                    });
                    //load sub category
                    itemFactory.loadSubCategory(function (data) {
                        $scope.model.subCategoryList = data;
                    });
                    //load sub category
                    itemFactory.loadBrand(function (data) {
                        $scope.model.brandList = data;
                    });
                    //load packages
                    itemFactory.loadPackages(function (data) {
                        $scope.model.packageList = data;
                    });

                };
                $scope.ui.init();
            });
}());