(function () {
    //module
    angular.module("clientModule", ['ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("clientModule")
            .factory("clientFactory", function ($http, systemConfig) {
                var factory = {};

                factory.lordClientFactory = function (callback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                callback(data);
                            });
                };

                factory.saveClientFactory = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client/insert-client";

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

                //delete
                factory.deleteClientFactory = function (indexNo, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/care-point/master/client/delete-client/" + indexNo;
                    $http.delete(url)
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


    //controller
    angular.module("clientModule")
            .controller("clientController", function ($scope, $log, clientFactory, Notification, $timeout) {

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
                    $scope.model.client = {
                        "indexNo": null,
                        "name": null,
                        "address1": null,
                        "address2": null,
                        "address3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "nic": null

                    };
                };

                //------------------ validation functions ------------------------------
                $scope.validateInput = function () {
                    if ($scope.model.client.name | $scope.model.client.mobile | $scope.model.client.nic !== null) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //<-----------------http funtiion------------------->
                $scope.http.saveClient = function () {
                    $scope.model.client.branch = 1;
                    var detail = $scope.model.client;
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    clientFactory.saveClientFactory(
                            detailJSON,
                            function (data) {
                                $scope.model.clientList.push(data);
                                Notification.success(data.indexNo + " - " + "Client Save Successfully");
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );


                };

                $scope.http.deleteClient = function (indexNo, index) {
                    clientFactory.deleteClientFactory(indexNo
                            , function () {
                                $scope.model.clientList.splice(index, 1);
                                Notification.success(indexNo + " - " + "Client Delete Successfully");
                            }
                    , function (data) {
                        Notification.error(data);
                    });
                };

                //<-----------------ui funtiion--------------------->
                //save function
                $scope.ui.save = function () {

                    if ($scope.validateInput()) {
                        $scope.http.saveClient();
                    } else {
                        Notification.error("Please input detail");
                    }
                };

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#nicText")[0].focus();
                    }, 10);
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $scope.ui.focus();
                };

                //edit funtion
                $scope.ui.edit = function (client, index) {
                    $scope.ui.mode = "EDIT";
                    $scope.model.client = client;
                    $scope.model.clientList.splice(index, 1);

                    $scope.ui.focus();
                };
                function ExampleController(PagerService) {
                    var vm = this;

                    vm.clientList = _.range(1, 151); // dummy array of items to be paged
                    vm.pager = {};
                    vm.setPage = setPage;

                    initController();

                    function initController() {
                        // initialize to page 1
                        vm.setPage(1);
                    }

                    function setPage(page) {
                        if (page < 1 || page > vm.pager.totalPages) {
                            return;
                        }

                        // get pager object from service
                        vm.pager = PagerService.GetPager(vm.clientList.length, page);

                        // get current page of items
                        vm.clientList = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
                    }
                }

                function PagerService() {
                    // service definition
                    var service = {};

                    service.GetPager = GetPager;

                    return service;

                    // service implementation
                    function GetPager(totalItems, currentPage, pageSize) {
                        // default to first page
                        currentPage = currentPage || 1;

                        // default page size is 10
                        pageSize = pageSize || 10;

                        // calculate total pages
                        var totalPages = Math.ceil(totalItems / pageSize);

                        var startPage, endPage;
                        if (totalPages <= 10) {
                            // less than 10 total pages so show all
                            startPage = 1;
                            endPage = totalPages;
                        } else {
                            // more than 10 total pages so calculate start and end pages
                            if (currentPage <= 6) {
                                startPage = 1;
                                endPage = 10;
                            } else if (currentPage + 4 >= totalPages) {
                                startPage = totalPages - 9;
                                endPage = totalPages;
                            } else {
                                startPage = currentPage - 5;
                                endPage = currentPage + 4;
                            }
                        }

                        // calculate start and end item indexes
                        var startIndex = (currentPage - 1) * pageSize;
                        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                        // create an array of pages to ng-repeat in the pager control
                        var pages = _.range(startPage, endPage + 1);

                        // return object with all pager properties required by the view
                        return {
                            totalItems: totalItems,
                            currentPage: currentPage,
                            pageSize: pageSize,
                            totalPages: totalPages,
                            startPage: startPage,
                            endPage: endPage,
                            startIndex: startIndex,
                            endIndex: endIndex,
                            pages: pages
                        };
                    }
                }


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset mdel
                    $scope.model.reset();
                    clientFactory.lordClientFactory(function (data) {
                        $scope.model.clientList = data;
                    });
                };

                $scope.ui.init();
            });
}());