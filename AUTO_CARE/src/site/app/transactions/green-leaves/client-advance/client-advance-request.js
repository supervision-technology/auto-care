(function () {
    //module
    angular.module("clientAdvanceRequestModule", ["chart.js", "ngAnimate", "ui.bootstrap", "ui-notification"]);

    //controller
    angular.module("clientAdvanceRequestModule")
            .controller("clientAdvanceRequestController", function ($scope, $http, systemConfig, Notification) {/*

                //ui models
                $scope.ui = {};
                //current ui mode IDEAL, SELECTED, NEW, EDIT
                
                $scope.ui.mode = null;
                $scope.clientDetails = [];
                
                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    console.log("NEW");
                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                };

                //get route
                var routeUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/routes";
                $http.get(routeUrl).success(function (data) {
                    $scope.routeList = [];
                    $scope.routeList = data.values;
                });

                var clientUrl = systemConfig.apiUrl + "/api/green-leaves/green-leaves-receive/clients";
                $http.get(clientUrl).success(function (data) {
                    $scope.clientList = [];
                    $scope.clientList = data.values;
                });

                //get client
                $scope.getClients = function (hint) {
                    return $scope.clientList;
                };

                //get route
                $scope.getRoutes = function (hint) {
                    return $scope.routeList;
                };

                $scope.getRowData = function () {
                    if (!$scope.requestDetails) {
                        $scope.requestDetails = [];
                    }
                    return $scope.requestDetails;
                };

                $scope.insertTable = function (rowData) {
                    $scope.vars = true;
                    if ($scope.rowData.client.name && $scope.rowData.route.name && $scope.rowData.month && $scope.rowData.amount) {
                        console.log($scope.rowData.month);
                        //select month format
                        $scope.rowData.amount = parseFloat(rowData.amount);
                        if ($scope.requestDetails.length === 0) {
                            $scope.requestDetails.push(rowData);
                            $scope.rowData = null;
                        } else {
                            for (var i = 0; i < $scope.requestDetails.length; i++) {
                                if (angular.equals($scope.requestDetails[i].month, rowData.month) && angular.equals($scope.requestDetails[i].client, rowData.client)) {
                                    $scope.vars = false;
                                    Notification.error('This Client Is This Month Request All Rady');
                                    break;
                                }
                            }
                            if ($scope.vars) {
                                $scope.requestDetails.push(rowData);
                                $scope.rowData = null;
                            }
                        }
                        $scope.getTotalAmount();
                    } else {
                        Notification.error('Must Be Filled All Components To Add');
                    }
                };

                $scope.editSelectdRow = function (requestRowData, index) {
                    $scope.rowData = requestRowData;
                    $scope.requestDetails.splice(index, 1);
                    $scope.getTotalAmount();
                };

                $scope.deleteSelectedRow = function (index) {
                    $scope.requestDetails.splice(index, 1);
                    $scope.rowData = null;
                    Notification.success('Delete Success');
                    $scope.getTotalAmount();
                };

                //get Total Amount
                $scope.getTotalAmount = function () {
                    var total = 0.0;
                    for (var i = 0; i < $scope.requestDetails.length; i++) {
                        total += parseFloat($scope.requestDetails[i].amount);
                    }
                    return total;
                };

                $scope.getClientDetails = function (model) {
                    console.log(model);
                };

                //------- client details -----
                $scope.getClientDetails = function () {
                    $scope.clientDetails = [
                        {
                            indexNo: 1,
                            discription: "B/F",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 2,
                            discription: "Settlement",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 3,
                            discription: "GL Value",
                            debit: 50000.00,
                            credit: 0
                        },
                        {
                            indexNo: 4,
                            discription: "A /Payment",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 5,
                            discription: "L/Installment",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 6,
                            discription: "Fertilizer(P)",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 7,
                            discription: "Fertilizer(C)",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 8,
                            discription: "Tea",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 9,
                            discription: "Savings",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 10,
                            discription: "Welfare",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 11,
                            discription: "Transport",
                            debit: 0,
                            credit: 300.00
                        },
                        {
                            indexNo: 12,
                            discription: "Other",
                            debit: 0,
                            credit: 300.00
                        }
                    ];
                    return $scope.clientDetails;
                };

                $scope.getTotalDebit = function () {
                    var total = 0.0;
                    for (var i = 0; i < $scope.clientDetails.length; i++) {
                        total += parseFloat($scope.clientDetails[i].debit);
                    }
                    return total;
                };

                $scope.getTotalCredit = function () {
                    var total = 0.0;
                    for (var i = 0; i < $scope.clientDetails.length; i++) {
                        total += parseFloat($scope.clientDetails[i].credit);
                    }
                    return total;
                };
                $scope.getCreditBlance = function () {
                    var totalDebit = $scope.getTotalDebit();
                    var totalCredit = $scope.getTotalCredit();
                    var blance = totalDebit - totalCredit;
                    return blance;
                };

                $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
                $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.data = [
                    [65, -59, 80, 81, -56, 55, -40],
                    [28, 48, -40, 19, 86, 27, 90]
                ];
                $scope.datasetOverride = [
                    {
                        label: "Bar chart",
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: "Line chart",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        type: 'line'
                    }
                ];

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                };
                $scope.ui.init();
            */});
}());