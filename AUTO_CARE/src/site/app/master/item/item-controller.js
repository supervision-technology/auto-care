(function () {
    angular.module("itemModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("itemModule")
            .controller("itemController", function ($scope, itemModel, $timeout, Notification) {
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

                $scope.ui.selectStock = function (type) {
                    if (type === 'STOCK') {
                        $scope.itemStockVisiblePriceCategory = true;
                    } else {
                        $scope.itemStockVisiblePriceCategory = false;
                    }
                };

                //save item
                $scope.ui.saveItems = function () {
                    if (!$scope.model.itemData.type) {
                        Notification.error("enter item type");
                    } else if (!$scope.model.itemData.name) {
                        Notification.error("enter item name");
                    } else if (!$scope.model.itemData.salePriceNormal) {
                        Notification.error("enter item sale price normal");
                    } else if (!$scope.model.itemData.salePriceRegister) {
                        Notification.error("enter item sale price register");
                    } else if (!$scope.model.itemData.costPrice) {
                        Notification.error("enter item cost price");
                    } else if ($scope.model.itemData.type
                            && $scope.model.itemData.name
                            && $scope.model.itemData.salePriceNormal
                            && $scope.model.itemData.salePriceRegister
                            && $scope.model.itemData.costPrice) {
                        $scope.model.saveItem()
                                .then(function () {
                                    Notification.success("Item save Success");
                                }, function () {
                                    Notification.error("Item save Fail");
                                });
                    }
                };

                //edit item
                $scope.ui.editeItems = function (items, $index) {
                    $scope.model.editeItem(items, $index);
                };

                //delete item
                $scope.ui.deleteItems = function (items, $index) {
                    $scope.model.deleteItem(items, $index);
                };

                //---------------------item unit ---------------------
                //save item units
                $scope.ui.saveItemUnits = function () {
                    if (!$scope.model.itemUnitData.item) {
                        Notification.error("select item");
                    } else if (!$scope.model.itemUnitData.name) {
                        Notification.error("enter item unit name");
                    } else if (!$scope.model.itemUnitData.qty) {
                        Notification.error("enter item unit qty");
                    } else if (!$scope.model.itemUnitData.salePriceNormal) {
                        Notification.error("enter item unit sale price normal");
                    } else if (!$scope.model.itemUnitData.salePriceRegister) {
                        Notification.error("enter item cost sale price register");
                    } else if ($scope.model.itemUnitData.item
                            && $scope.model.itemUnitData.name
                            && $scope.model.itemUnitData.qty
                            && $scope.model.itemUnitData.salePriceNormal
                            && $scope.model.itemUnitData.salePriceRegister) {
                        $scope.model.saveItemUnit();
                    }
                };

                //edit item units
                $scope.ui.editeItemUnits = function (itemsUnits, $index) {
                    $scope.model.editeItemUnits(itemsUnits, $index);
                };

                $scope.ui.getItemType = function (model) {
                    $scope.itemType = $scope.model.item(model).type;
                    $scope.itemUnit = $scope.model.item(model).unit;
                    //item selected get item wise item units
                    $scope.model.loadItemUnitByItem(model);
                };

                //delete item units
                $scope.ui.deleteItemUnits = function (itemsUnits, $index) {
                    $scope.model.deleteItemUnits(itemsUnits, $index);
                };

                //--------------------- package ---------------------
                //save package items
                $scope.ui.addPackageItem = function () {
                    if (!$scope.model.packageData.packages) {
                        Notification.error("select package item");
                    } else if (!$scope.model.packageData.item) {
                        Notification.error("select item");
                    } else if ($scope.model.packageData.packages && $scope.model.packageData.item) {
                        $scope.model.addPackageItem();
                    }
                };

                //select package - get package item list
                $scope.ui.getPackageItems = function (model) {
                    $scope.model.getPackageItems(model);
                };

                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();
            });
}());