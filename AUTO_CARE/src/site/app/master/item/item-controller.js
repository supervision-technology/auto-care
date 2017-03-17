(function () {
    angular.module("itemModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("itemModule")
            .controller("itemController", function ($scope, itemModel, $timeout) {
                $scope.model = new itemModel();
                $scope.ui = {};

                $scope.ui.toggleType = function (functions) {
                    if (functions === "ITEMS") {
                        $scope.ui.saveMode = "ITEMS";
                    } else if (functions === "ITEMS_UNITS") {
                        $scope.ui.saveMode = "ITEMS_UNITS";
                    } else if (functions === "PACKAGE_ITEMS") {
                        $scope.ui.saveMode = "PACKAGE_ITEMS";
                    }
                };

                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#type")[0].focus();
                    }, 10);
                };

                //save item
                $scope.ui.saveItems = function () {
                    $scope.model.saveItem();
                };

                //edit item
                $scope.ui.editeItems = function (items, $index) {
                    $scope.model.editeItem(items, $index);
                };

                //delete item
                $scope.ui.deleteItems = function (items, $index) {
                    $scope.model.deleteItem(items, $index);
                };

                //--------------------- unit ---------------------
                //save item units
                $scope.ui.saveItemUnits = function () {
                    $scope.model.saveItemUnit();
                };

                //edit item units
                $scope.ui.editeItemUnits = function (itemsUnits, $index) {
                    $scope.model.editeItemUnits(itemsUnits, $index);
                };

                //delete item units
                $scope.ui.deleteItemUnits = function (itemsUnits, $index) {
                    $scope.model.deleteItemUnits(itemsUnits, $index);
                };
                
                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();
            });
}());