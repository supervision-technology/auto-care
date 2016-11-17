(function () {
    angular.module("itemModule", []);
    angular.module("itemModule")
            .factory("itemFactory", function ($http, systemConfig) {
                var factory = {};

                //load product
                factory.loadItem = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/item";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                //load subcategory by selected category 
                factory.loadSubCategoryByCategory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/sub-category/get-sub-category";
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

                //load category by selected item department 
                factory.loadCategory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/category/get-category";
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

                //load item department
                factory.loadItemDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/item-departments";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save product
                factory.saveProduct = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product/save-product";
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

                //delete  product
                factory.deleteProduct = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/master/product/delete-product/" + indexNo;
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

                //data model
                $scope.model = {};

                //ui model
                $scope.ui = {};

                //http modal
                $scope.http = {};

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.data = {};
                };

                //------------------ ui functions ------------------------------

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                };

                $scope.ui.save = function () {
//                    $scope.http.saveProduct();
                };

                $scope.ui.edit = function (product, index) {
//                    $scope.model.data = product;
//                    $scope.model.items.splice(index, 1);
                };

                $scope.ui.delete = function (indexNo) {
//                    $scope.http.deleteProduct(indexNo);
                };

                //------------------ http functions ------------------------------

                $scope.http.saveProduct = function () {
//                    var detail = $scope.model.data;
//                    console.log(detail);
//                    var detailJSON = JSON.stringify(detail);
//                    itemFactory.saveProduct(
//                            detailJSON,
//                            function (data) {
//                                Notification.success("success");
//                                //reset model
//                                $scope.model.products.push(data);
//                                $scope.model.reset();
//                            },
//                            function (data) {
//                                Notification.error(data.message);
//                            }
//                    );
                };

                $scope.http.deleteProduct = function (indexNo) {
//                    itemFactory.deleteProduct(indexNo, function () {
//                        var id = -1;
//                        for (var i = 0; i < $scope.model.products.length; i++) {
//                            if ($scope.model.products[i].indexNo === indexNo) {
//                                id = i;
//                            }
//                        }
//                        $scope.model.products.splice(id, 1);
//                    });
                };

                //---------- inti fuctions ---------- 
                $scope.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //reset model
                    $scope.model.reset();
                    //loadProduct
                    itemFactory.loadItem(function (data) {
                        $scope.model.items = data;
                    });

                    //loadItemDepartment
//                    productFactory.loadItemDepartment(function (data) {
//                        $scope.model.itemDepartments = data;
//                    });
                };
                $scope.init();
            });
}());

