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
                //load sub category
                factory.loadItemUnit = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-unit";

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
                    var url = systemConfig.apiUrl + "/api/care-point/master/package-item";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //save item
                factory.saveItem = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item/save-item";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });

                };
                //save unit
                factory.saveUnit = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-unit/save-unit";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
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
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };

                //delete unit
                factory.deleteUnit = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item-unit/delete-unit/" + indexNo;
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
                //delete item
                factory.deleteItem = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item/delete-item/" + indexNo;
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
                //delete package
                factory.deletePackage = function (indexNo, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/package-item/delete-package/" + indexNo;
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


    angular.module("itemModule")
            .controller("itemController", function ($scope, itemFactory, Notification, $timeout) {
                //data models 
                $scope.model = {};
                $scope.model.itemDepartmentList = [];
                //ui models
                $scope.ui = {};
                $scope.ui.disable = null;

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
                    "salesPrice": null,
                    "costPrice": null,
                    "type": null,
                    "itemDepartment": null,
                    "brand": null,
                    "category": null,
                    "subCategory": null,
                    "branch": null
                };


                $scope.tempUnit = {
                    indexNo: null,
                    item: null,
                    name: null,
                    salesPrice: null,
                    costPrice: null,
                    qty: null

                };

                //package model
                $scope.model.package = {
                    indexNo: null,
                    item: {},
                    packages: {}
                };

                $scope.ui.departmentLabel = function (indexNo) {
                   
                    var label;
                    angular.forEach($scope.model.itemDepartmentList, function (value) {
                        if (value.indexNo === indexNo) {
                            label = value.indexNo + "-" + value.name;
                            return;
                        }
                    });
                    return label;
                };
                $scope.ui.categoryLabel = function (indexNo) {
                   
                    var label;
                    angular.forEach($scope.model.categoryList, function (value) {
                        if (value.indexNo === indexNo) {
                            label = value.indexNo + "-" + value.name;
                            return;
                        }
                    });
                    return label;
                };

                $scope.ui.keyEventItem = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.save();
                    }
                };
                $scope.ui.keyEventUnit = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.addUnit();
                    }
                };
                $scope.ui.keyEventPackage = function (event) {
                    if (event.keyCode === 13) {
                        $scope.ui.savePackage();
                    }
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
                                Notification.success(data.indexNo + " " + data.name + " Successfully Added");
                                $scope.model.itemList.push(data);
                                $scope.model.item = {};
                            },
                            function (data) {
                                Notification.error(data);
                            }
                    );
                };

//                save package
                $scope.http.savePackage = function () {
                    var detail = $scope.model.package;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detail);
                    itemFactory.savePackage(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " successfully Added");
                                $scope.model.packageItemList.push(data);
                                $scope.model.package = {};
                            },
                            function (data) {
                                Notification.error(data);
                            }
                    );
                };

//                save unit
                $scope.http.saveUnit = function () {
                    var detail = $scope.tempUnit;
                    var detailJSON = JSON.stringify(detail);

                    itemFactory.saveUnit(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " Successfully Added");
                                $scope.model.unitList.push(data);
                                $scope.tempUnit.costPrice = null;
                                $scope.tempUnit.indexNo = null;
                                $scope.tempUnit.name = null;
                                $scope.tempUnit.qty = null;
                                $scope.tempUnit.salesPrice = null;
//                              $scope.tempUnit.item = {};

                            },
                            function (data) {
                                Notification.error(data);
                            }
                    );
                };
                //delete Item
                $scope.http.deleteItem = function (IndexNo, index) {
                    console.log(IndexNo);
                    itemFactory.deleteItem(IndexNo
                            , function (data) {
                                Notification.error(IndexNo + " delete success");
                                $scope.model.itemList.splice(index, 1);
                            }, function (data) {
                        Notification.error(data);
                    });
                };
                //delete package
                $scope.http.deletePackage = function (IndexNo, index) {
                    itemFactory.deletePackage(IndexNo
                            , function (data) {
                                Notification.error(IndexNo + " delete success");
                                $scope.model.packageItemList.splice(index, 1);
                            }, function (data) {
                        Notification.error(data);
                    });
                };
                //delete unit
                $scope.http.deleteUnit = function (IndexNo, index) {
                    itemFactory.deleteUnit(IndexNo
                            , function (data) {
                                Notification.error(IndexNo + " delete success");
                                $scope.model.unitList.splice(index, 1);
                            }
                    , function (data) {
                        Notification.error(data);
                    });
                };


                //----------validation----------
                $scope.ui.validateUnits = function () {
                    if ($scope.tempUnit.name
                            && $scope.tempUnit.costPrice
                            && $scope.tempUnit.salesPrice
                            && $scope.tempUnit.item.indexNo
                            && $scope.tempUnit.qty
                            ) {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.validateItem = function () {
                    if ($scope.model.item.name
                            && $scope.model.item.salesPrice
                            && $scope.model.item.type
                            ) {
                        return true;
                    }
                    return false;
                };
                $scope.validatePackage = function () {
                    if ($scope.model.package.packages.indexNo
                            && $scope.model.package.item.indexNo
                            ) {
                        return true;
                    }
                    return false;
                };

                //----------ui funtion-----------
//                focus
                $scope.ui.focusItem = function () {
                    $timeout(function () {
                        document.querySelectorAll("#type")[0].focus();
                    }, 10);
                };
//                focus
                $scope.ui.focusUnit = function () {
                    $timeout(function () {
                        document.querySelectorAll("#unitItem")[0].focus();
                    }, 10);
                };
//                focus
                $scope.ui.focusPackage = function () {
                    $timeout(function () {
                        document.querySelectorAll("#packageItem")[0].focus();
                    }, 10);
                };

                //save item
                $scope.ui.save = function () {
                    if ($scope.ui.disable === 'item') {//enable textfield
                        if ($scope.validateItem()) {
                            $scope.http.saveItem();
                        } else {
                            Notification.error('input Detail to Save');
                        }
                    } else {
                        $scope.ui.disable = 'item';
                    }
                    $scope.ui.focusItem();
                };

                //save package
                $scope.ui.savePackage = function () {
                    if ($scope.ui.disable === 'package') {//enable textfield
                        if ($scope.validatePackage) {
                            $scope.http.savePackage();
                        } else {
                            Notification.error('input Detail to Save');
                        }
                    } else {
                        $scope.ui.disable = 'package';
                    }
                    $scope.ui.focusPackage();
                };


                $scope.ui.addUnit = function () {//enable textfield
                    if ($scope.ui.disable === 'unit') {
                        if ($scope.ui.validateUnits()) {
                            $scope.http.saveUnit();
                        } else {
                            Notification.error("input Detail to Save");
                        }
                    } else {
                        $scope.ui.disable = 'unit';
                    }
                    $scope.ui.focusUnit();
                };

                //edit
                $scope.ui.editItem = function (item, index) {
                    $scope.model.item = item;
                    $scope.model.itemList.splice(index, 1);
                    $scope.ui.focusItem();
                    $scope.ui.disable = "item";
                };
                //edit
                $scope.ui.editUnit = function (unit, index) {
                    $scope.tempUnit = unit;
                    $scope.model.unitList.splice(index, 1);
                    $scope.ui.focusUnit();
                    $scope.ui.disable = "unit";
                };
                //edit
                $scope.ui.editPackage = function (package, index) {
                    $scope.model.package = package;
                    $scope.model.packageItemList.splice(index, 1);
                    $scope.ui.focusPackage();
                    $scope.ui.disable = "package";
                };


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

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "SAVE";
                    $scope.ui.tableShow = 1;
                    $scope.model.package = {};

                    //load item
                    itemFactory.loadItem(function (data) {
                        $scope.model.itemList = data;
                    });
                    //load item unit
                    itemFactory.loadItemUnit(function (data) {
                        $scope.model.unitList = data;
                    });
                    //load item 
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
                        $scope.model.packageItemList = data;
                    });

                };
                $scope.ui.init();
            });
}());