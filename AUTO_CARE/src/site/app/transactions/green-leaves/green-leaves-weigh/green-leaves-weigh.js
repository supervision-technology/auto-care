(function () {
    //module
    angular.module("greenLeavesWeighModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    //http factory
    angular.module("greenLeavesWeighModule")
            .factory("greenLeavesWeighFactory", function ($http, systemConfig) {
                var factory = {};

                //load routes
                factory.loadRoutes = function (callback) {
                    var url = systemConfig.apiUrl + "/api/green-leaves/routes";

                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data.values);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load recent weigh
                factory.loadWeigh = function (number, callback) {

                };

                //insert normal leaves weigh
                factory.insertNormal = function () {

                };

                //insert super leaves weigh
                factory.insertSuper = function () {

                };

                //delete normal weigh
                factory.deleteNormal = function () {

                };

                //delete super weigh
                factory.deleteSuper = function () {

                };

                return factory;
            });

    //controller
    angular.module("greenLeavesWeighModule")
            .controller("greenLeavesWeighController", function ($scope, $timeout, greenLeavesWeighFactory) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //contains all route objects, should be assigned at init
                $scope.model.routes = null;

                //green leaves weigh information
                $scope.model.weigh = null;

                //temp edit data
                $scope.model.tempWeigh = null;

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.ui.type = "NORMAL";

                //------------------ model functions ---------------------------
                //reset model
                $scope.model.reset = function () {
                    $scope.model.weigh = {
                        "indexNo": null,
                        "route": null,
                        "date": null,
                        "number": null,
                        "greenLeavesWeighDetails": [
                            /*{
                             "indexNo": 0,
                             "quantity": 0,
                             "crates": 0,
                             "bags": 0,
                             "polyBags": 0,
                             "type": "NORMAL"//or SUPER
                             }*/
                        ],
                        //normal leaves summary
                        "normalTotalWeight": 0.0,
                        "normalTareCalculated": 0.0,
                        "normalTareDeduction": 0.0,
                        "normalGeneralDeductionPercent": 4.0,
                        "normalGeneralDeduction": 0.0,
                        "normalWaterDeduction": 0.0,
                        "normalCoarseLeaves": 0.0,
                        "normalBoiledLeaves": 0.0,
                        "normalNetWeight": 0.0,
                        //normal tare summary
                        "normalCrates": 0,
                        "normalBags": 0,
                        "normalPolyBags": 0,
                        //super leaves summary
                        "superTotalWeight": 0.0,
                        "superTareCalculated": 0.0,
                        "superTareDeduction": 0.0,
                        "superGeneralDeductionPercent": 4.0,
                        "superGeneralDeduction": 0.0,
                        "superWaterDeduction": 0.0,
                        "superCoarseLeaves": 0.0,
                        "superBoiledLeaves": 0.0,
                        "superNetWeight": 0.0,
                        //super tare summary
                        "superCrates": 0,
                        "superBags": 0,
                        "superPolyBags": 0
                    };

                    $scope.model.resetTemp();

                    $scope.model.validate();
                };

                $scope.model.resetTemp = function () {
                    $scope.model.tempWeigh = {
                        "indexNo": null,
                        "quantity": 0,
                        "crates": 0,
                        "bags": 0,
                        "polyBags": 0,
                        "type": "NORMAL"//or SUPER
                    };
                };

                //validate model
                $scope.model.validate = function () {
                    var normalTotalWeight = 0.0;
                    var superTotalWeight = 0.0;

                    var normalCrates = 0;
                    var normalBags = 0;
                    var normalPolyBags = 0;

                    var superCrates = 0;
                    var superBags = 0;
                    var superPolyBags = 0;
                    angular.forEach($scope.model.weigh.greenLeavesWeighDetails, function (value, key) {
                        if (value.type === 'NORMAL') {
                            normalTotalWeight = normalTotalWeight + parseFloat(value.quantity);

                            normalCrates = normalCrates + parseInt(value.crates);
                            normalBags = normalBags + parseInt(value.bags);
                            normalPolyBags = normalPolyBags + parseInt(value.polyBags);
                        } else if (value.type === 'SUPER') {
                            superTotalWeight = superTotalWeight + parseFloat(value.quantity);

                            superCrates = superCrates + parseInt(value.crates);
                            superBags = superBags + parseInt(value.bags);
                            superPolyBags = superPolyBags + parseInt(value.polyBags);
                        }
                    });

                    //general deduction
                    var normalGeneralDeductionPercent = parseFloat($scope.model.weigh.normalGeneralDeductionPercent);
                    var normalGeneralDeduction = parseInt(normalGeneralDeductionPercent * normalTotalWeight / 100);
                    $scope.model.weigh.normalGeneralDeduction = normalGeneralDeduction;

                    var superGeneralDeductionPercent = parseFloat($scope.model.weigh.superGeneralDeductionPercent);
                    var superGeneralDeduction = parseInt(superGeneralDeductionPercent * superTotalWeight / 100);
                    $scope.model.weigh.superGeneralDeduction = superGeneralDeduction;

                    //net value
                    var normalNetWeight = normalTotalWeight
                            - parseFloat($scope.model.weigh.normalTareDeduction)
                            - parseFloat($scope.model.weigh.normalGeneralDeduction)
                            - parseFloat($scope.model.weigh.normalWaterDeduction)
                            - parseFloat($scope.model.weigh.normalCoarseLeaves)
                            - parseFloat($scope.model.weigh.normalBoiledLeaves);

                    var superNetWeight = superTotalWeight
                            - parseFloat($scope.model.weigh.superTareDeduction)
                            - parseFloat($scope.model.weigh.superGeneralDeduction)
                            - parseFloat($scope.model.weigh.superWaterDeduction)
                            - parseFloat($scope.model.weigh.superCoarseLeaves)
                            - parseFloat($scope.model.weigh.superBoiledLeaves);

                    $scope.model.weigh.normalTotalWeight = normalTotalWeight;
                    $scope.model.weigh.normalNetWeight = normalNetWeight;

                    $scope.model.weigh.superTotalWeight = superTotalWeight;
                    $scope.model.weigh.superNetWeight = superNetWeight;

                    //tare count
                    $scope.model.weigh.normalCrates = normalCrates;
                    $scope.model.weigh.normalBags = normalBags;
                    $scope.model.weigh.normalPolyBags = normalPolyBags;

                    $scope.model.weigh.superCrates = superCrates;
                    $scope.model.weigh.superBags = superBags;
                    $scope.model.weigh.superPolyBags = superPolyBags;
                };

                //------------------ ui functions ------------------------------
                //load recent weigh
                $scope.ui.load = function () {
                    $scope.ui.mode = 'SELECTED';
                };

                //new function
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                //edit function
                $scope.ui.edit = function () {
                    $scope.ui.mode = "EDIT";

                    $timeout(function () {
                        document.querySelectorAll("#route")[0].focus();
                    }, 10);
                };

                //add function
                $scope.ui.insertNormal = function () {
                    console.log("insert normal");
                    if ($scope.ui.validateWeighInput()) {
                        $scope.model.tempWeigh.indexNo = null;
                        $scope.model.tempWeigh.type = 'NORMAL';

                        $scope.model.weigh.greenLeavesWeighDetails.push($scope.model.tempWeigh);
                    }
                    $scope.model.resetTemp();
                    $scope.model.validate();

                    //reset focus cycle
                    $timeout(function () {
                        document.querySelectorAll("#normal-qty")[0].focus();
                    }, 10);
                };
                $scope.ui.insertSuper = function () {
                    if ($scope.ui.validateWeighInput()) {
                        $scope.model.tempWeigh.indexNo = null;
                        $scope.model.tempWeigh.type = 'SUPER';

                        $scope.model.weigh.greenLeavesWeighDetails.push($scope.model.tempWeigh);
                    }
                    $scope.model.resetTemp();
                    $scope.model.validate();

                    //reset focus cycle
                    $timeout(function () {
                        document.querySelectorAll("#super-qty")[0].focus();
                    }, 10);

                };

                //delete function
                $scope.ui.deleteNormal = function (indexNo) {

                };
                $scope.ui.deleteSuper = function () {

                };

                //finish edits
                $scope.ui.finish = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.model.reset();
                };

                //toggle normal or super
                $scope.ui.toggleType = function (type) {
                    $scope.ui.type = type;

                    //key focus route
                    if (type === 'NORMAL') {
                        $timeout(function () {
                            document.querySelectorAll("#normal-qty")[0].focus();
                        }, 10);
                    } else if (type === 'SUPER') {
                        $timeout(function () {
                            document.querySelectorAll("#super-qty")[0].focus();
                        }, 10);
                    }
                };

                //ui validation functions
                $scope.ui.validateWeighInput = function () {
                    var quantity = $scope.model.tempWeigh.quantity;
                    var tareCount = $scope.model.tempWeigh.crates
                            + $scope.model.tempWeigh.bags
                            + $scope.model.tempWeigh.polyBags;

                    console.log(tareCount + "," + quantity + "," + (tareCount > 0 && quantity > 0));

                    return (tareCount > 0 && quantity > 0);
                };

                //ui init function
                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                    //reset model
                    $scope.model.reset();

                    //load routes
                    greenLeavesWeighFactory.loadRoutes(function (data) {
                        $scope.model.routes = data;
                    });
                };
                $scope.ui.init();

            });
}());