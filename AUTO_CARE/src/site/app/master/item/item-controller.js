(function () {
    angular.module("itemModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("itemModule")
            .controller("itemController", function ($scope, itemModel, $timeout, Notification, ConfirmPane) {
                $scope.model = new itemModel();
                $scope.ui = {};

                $scope.ui.toggleType = function (functions) {
                    if (functions === "ITEMS") {
                        $scope.ui.saveMode = "ITEMS";
                    } else if (functions === "ITEMS_UNITS") {
                        $scope.ui.saveMode = "ITEMS_UNITS";
                    } else if (functions === "PACKAGE_ITEMS") {
                        $scope.ui.saveMode = "PACKAGE_ITEMS";
                    } else if (functions === "CONSUMABLE_ITEMS") {
                        $scope.ui.saveMode = "CONSUMABLE_ITEMS";
                    } else if (functions === "ITEM_CHECK_DETAIL") {
                        $scope.ui.saveMode = "ITEM_CHECK_DETAIL";
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
                        $scope.textViewMode = 'STOCK';
                    }
                    if (type === 'NON-STOCK') {
                        $scope.textViewMode = 'NON-STOCK';
                    }
                    if (type === 'SERVICE') {
                        $scope.textViewMode = 'SERVICE';
                    }
                    if (type === 'PACKAGE') {
                        $scope.textViewMode = 'PACKAGE';
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
                //save consumable item
                $scope.ui.saveConsumable = function () {
                    ConfirmPane.primaryConfirm("Save this Consumable Item !")
                            .confirm(function () {
                                $scope.model.saveConsumable()
                                        .then(function () {
                                            Notification.success("Consumable Item Save Success");
                                        }, function () {
                                            Notification.error("Consumable Item Save Fail");
                                        });

                            })
                            .discard(function () {
                                console.log('discard');
                            });

                };
                //save item check detail
                $scope.ui.saveItemCheckDetail = function () {
                    ConfirmPane.primaryConfirm("Save this Detail !")
                            .confirm(function () {
                                $scope.model.saveItemChechDetail()
                                        .then(function () {
                                            Notification.success("Item Check detail Save Success");
                                        }, function () {
                                            Notification.error("Item Check detail Save Fail");
                                        });

                            })
                            .discard(function () {
                                console.log('discard');
                            });

                };

                //edit item
                $scope.ui.editeItems = function (items, $index) {
                    $scope.textViewMode=items.type;
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
                        $scope.itemType = null;
                        $scope.itemUnit = null;
                    }

                };
                $scope.ui.showDetails = function () {
                    var show = true;
                    if (!$scope.itemType) {
                        show = false;
                    }
                    if (!$scope.itemUnit) {
                        show = false;
                    }
                    if (!$scope.model.itemUnitData.item) {
                        show = false;
                    }
                    return show;
                };

                //edit item units
                $scope.ui.editeItemUnits = function (itemsUnits, $index) {
                    $scope.model.editeItemUnits(itemsUnits, $index);
                };

                $scope.ui.getItemType = function (model) {
                    $scope.itemType = $scope.model.item(model).type;
                    $scope.itemUnit = $scope.model.item(model).unit;
                    $scope.itemObject = $scope.model.item(model);
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

                //consumable Item
                $scope.ui.deleteConsumableItem = function (index) {
                    ConfirmPane.dangerConfirm("Delete Selected Consumable Item !")
                            .confirm(function () {
                                $scope.model.deleteConsumableItem(index)
                                        .then(function () {
                                            Notification.success("Consumable Item Delete Success");
                                        }, function () {
                                            Notification.error("Consumable Item Delete Fail");
                                        });

                            })
                            .discard(function () {
                                console.log('discard fail');
                            });
                };
                //deleteItemCheckDetail
                $scope.ui.deleteItemCheckDetail = function (index) {
                    ConfirmPane.dangerConfirm("Delete Selected Item Chech Detail  !")
                            .confirm(function () {
                                $scope.model.deleteItemCheckDetail(index)
                                        .then(function () {
                                            Notification.success("Item Check Detail Delete Success");
                                        }, function () {
                                            Notification.error("Item Check Detail Delete Fail");
                                        });

                            })
                            .discard(function () {
                                console.log('discard fail');
                            });
                };

                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();
            });
}());