(function () {
    angular.module("subItemModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);
    //http factory
    angular.module("subItemModule")
            .factory("subItemFactory", function ($http, systemConfig) {
                var factory = {};
                //load sub category
                factory.loadSubItem = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/sub-item";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save sub category
                factory.saveSubItem = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/sub-item/save-subItem";
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
                factory.deleteSubItem = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/sub-tem/delete-subItem/" + indexNo;
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
    angular.module("subItemModule")
            .controller("subItemController", function ($scope, subItemFactory, Notification, $timeout) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.subItem = [];


                //----------- data models ------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.subItem = {};

                };

                //----------validate funtion-------------

                $scope.validateInput = function () {
                    if ($scope.model.subItem.subName !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //----------http funtion----------------

                $scope.http.deleteSubItem = function (IndexNo, index) {
                    subItemFactory.deleteSubItem(IndexNo, function () {
                        Notification.success("delete success");
                        $scope.model.subItemList.splice(index, 1);
                    });
                };



                //save function 
                $scope.http.saveSubItem = function () {
                    var detail = $scope.model.subItem;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);


                    subItemFactory.saveSubItem(
                            detailJSON,
                            function (data) {
                                $scope.model.subItemList.push(data);
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
                    $scope.http.saveSubItem();
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
                    $scope.model.subItem = subCategory;
                    $scope.model.subItemList.splice(index, 1);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    //rest model data
                    $scope.model.reset();
                    //load SubItem
                    subItemFactory.loadSubItem(function (data) {
                        $scope.model.subItemList = data;
                    });
                   
                };

                $scope.ui.init();
            });
}());

