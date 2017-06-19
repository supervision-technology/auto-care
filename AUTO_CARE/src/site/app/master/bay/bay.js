(function () {
    //module
    angular.module("bayModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("bayModule")
            .factory("bayFactory", function ($http, systemConfig) {
                var factory = {};
                factory.loadBays = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                errorcallback(data);
                            });
                };
                //update or save summary
                factory.insertBay = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay/insert-detail";
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
                factory.deleteBay = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/bay/delete-detail/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });
    //controller
    angular.module("bayModule")
            .controller("bayController", function ($scope, Notification, bayFactory, $timeout) {
                $scope.model = {};
                $scope.model.bay = {};
                $scope.model.bayList = [];

                //ui models
                $scope.ui = {};
                $scope.ui.event = "asd";

                //http models
                $scope.http = {};

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);

                };
                $scope.ui.edit = function (bay, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.bay = bay;
                    $scope.model.bayList.splice(index, 1);
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);


                };
                $scope.ui.save = function () {
                    if ($scope.model.bay.name) {
                        if ($scope.model.bay.assignEmployee) {
                            if ($scope.model.bay.assignVehicle) {
                                $scope.http.insertBay();
                                $timeout(function () {
                                    document.querySelectorAll("#name")[0].focus();
                                }, 10);
                            } else {
                                Notification.error('select Vehicle Assign way to Save ');
                            }
                        } else {
                            Notification.error('select Employee Assignment way to Save ');
                        }
                    } else {
                        Notification.error('No Name to Save ');
                    }


                };
                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    console.log($scope.ui.mode);
                    //reset model
                    $scope.model = {};
                    //load routes
                    bayFactory.loadBays(function (data) {
                        $scope.model.bayList = data;
                    });

                };
                $scope.ui.init();

                $scope.http.insertBay = function () {
                    var detail = $scope.model.bay;
                    var detailJSON = JSON.stringify(detail);
                    //save detail dirrectly
                    console.log(detailJSON);
                    bayFactory.insertBay(
                            detailJSON,
                            function (data) {

                                Notification.success(data.indexNo + ' save successfylly !');
                                $scope.model.bayList.push(data);
                                $scope.model.bay = {};

                            }
                    , function (data) {
                        Notification.error(data.message);
                    }
                    );
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);

                };
                $scope.http.deleteBay = function (indexNo,index) {
                    console.log(index);
                    console.log(indexNo);
                    if (indexNo) {
                        bayFactory.deleteBay(indexNo, function () {
                            console.log('delete success');
                            $scope.model.bayList.splice(index, 1);
                            Notification.error(indexNo + ' Department Delete Successfully');
                            $scope.ui.mode = "IDEAL";
                        });
                    }
                };

            });
}());

