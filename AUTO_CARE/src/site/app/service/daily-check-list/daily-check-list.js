(function () {
    angular.module("dailyCheckListModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("dailyCheckListModule")
            .factory("dailyCheckListFactory", function ($http, systemConfig) {
                var factory = {};

                //load items
                factory.loadItem = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/item-check-list";
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

                factory.getChekedSubItems = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/sub-item-check-list/get-cheked-sub-items";
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

                return factory;

            });

    angular.module("dailyCheckListModule")
            .controller("dailyCheckListController", function ($scope, dailyCheckListFactory, $filter) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.model.subItems = [];
                $scope.model.items = [];

                //<-----------------http funtiion------------------->
                $scope.http.getSubItems = function (item) {
                    var detailJSON = JSON.stringify(item);
                    dailyCheckListFactory.getSubItems(
                            detailJSON,
                            function (data) {
                                $scope.model.subItems = data;
                            },
                            function (data) {
                                console.log(data);
                            }
                    );

//                    dailyCheckListFactory.getChekedSubItems(
//                            detailJSON,
//                            function (data) {
//                                $scope.model.items[0].checkStage = data;
//                            },
//                            function (data) {
//                                console.log(data);
//                            }
//                    );
                };

                $scope.historySelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
                };

                $scope.ui.confirmation = function (subItem, text, index) {
                    subItem.comfirmation = text;
                    subItem.checked = true;
                    subItem.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    subItem.time = $filter('date')(new Date(), 'HH:mm:ss');
                    var detailJSON = JSON.stringify(subItem);
                    console.log(subItem);
                    dailyCheckListFactory.updateConirmation(
                            detailJSON,
                            function (data) {
                                $scope.model.subItems.splice(index, 1);
                                $scope.model.subItems.push(data);
                            },
                            function (data) {
                                console.log(data);
                            }
                    );
                };

                $scope.ui.init = function () {
                    dailyCheckListFactory.loadItem(function (data) {
                        $scope.model.items = data;
                    });
                };
                $scope.ui.init();

            });
}());
