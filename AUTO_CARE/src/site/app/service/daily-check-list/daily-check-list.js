(function () {
    angular.module("dailyCheckListModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("dailyCheckListModule")
            .factory("dailyCheckListFactory", function ($http, systemConfig) {
                var factory = {};

                //load items
                factory.loadItem = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/all-items";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.getSubItems = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/sub-item-check-list/get-sub-item-check-list";
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

                factory.updateConirmation = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/sub-item-check-list/update-confirmation";
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

                factory.incertDailyCheckList = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/sub-item-check-list/incert-sub-item-check-list/" + summary;
                    $http.post(url)
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

    angular.module("dailyCheckListModule")
            .controller("dailyCheckListController", function ($scope, dailyCheckListFactory, $filter, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.subItems = [];
                $scope.model.items = [];

                $scope.selectTableIndex;
                //<-----------------http funtiion------------------->
                $scope.http.getSubItems = function (item, $index) {
                    $scope.selectTableIndex = $index;
                    var detailJSON = JSON.stringify(item);
                    dailyCheckListFactory.getSubItems(
                            detailJSON,
                            function (data) {
                                $scope.model.subItems = data;
                            },
                            function (data) {
                                console.log(data);
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.historySelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
                };

                $scope.ui.confirmation = function (subItem, text, index) {
                    subItem.comfirmation = text;
                    subItem.checked = true;
                    //false
                    if ("false" === subItem.comfirmation) {
                        if (subItem.reason === null) {
                            Notification.error("please enter reson");
                        } else {
                            subItem.time = $filter('date')(new Date(), 'HH:mm:ss');
                            var detailJSON = JSON.stringify(subItem);
                            dailyCheckListFactory.updateConirmation(
                                    detailJSON,
                                    function (data) {
                                        $scope.model.subItems.splice(index, 1);
                                        $scope.model.subItems.push(subItem);
                                        $scope.model.items[$scope.selectTableIndex].chekedItem = data;
                                        $scope.selectedRow1 = subItem;
                                        $scope.historyActivePosition = -1;
                                    },
                                    function (data) {
                                        console.log(data);
                                    }
                            );
                        }
                    } else {
                        //true
                        subItem.reason = null;
                        subItem.time = $filter('date')(new Date(), 'HH:mm:ss');
                        var detailJSON = JSON.stringify(subItem);
                        dailyCheckListFactory.updateConirmation(
                                detailJSON,
                                function (data) {
                                    console.log(subItem);
                                    $scope.model.subItems.splice(index, 1);
                                    $scope.model.subItems.push(subItem);
                                    $scope.model.items[$scope.selectTableIndex].chekedItem = data;
                                    $scope.selectedRow2 = subItem;
                                },
                                function (data) {
                                    console.log(data);
                                }
                        );
                    }
                };
                
//                $scope.ui.getItems = function (date) {
//                    console.log(date);
//                };

                $scope.ui.incertDailyCheckList = function (date) {
                    dailyCheckListFactory.incertDailyCheckList(
                            date,
                            function (data) {
                                Notification.error("sucsss");
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.init = function () {
                    $scope.model.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    dailyCheckListFactory.loadItem(function (data) {
                        $scope.model.items = data;
                    });

                };
                $scope.ui.init();

            });
}());
