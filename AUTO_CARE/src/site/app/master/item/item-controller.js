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
                    } else if (functions === "PRICE_CATEGORY_DETAIL") {
                        $scope.ui.saveMode = "PRICE_CATEGORY_DETAIL";
                    }
                };

                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                    $timeout(function () {
                        document.querySelectorAll("#type")[0].focus();
                    }, 10);
                };

                $scope.ui.clear = function () {
                    ConfirmPane.dangerConfirm("Clear !")
                            .confirm(function () {
                                $scope.model.clear();
                            })
                            .discard(function () {
                                console.log('discard');
                            });
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

                //find item by item type
                $scope.ui.findItemByItemType = function (searchItemType) {
                    $scope.model.findItemByItemType(searchItemType);
                };

                //save item
                $scope.ui.saveItems = function () {
                    if (!$scope.model.itemData.type) {
                        Notification.error("enter item type");
                    } else if (!$scope.model.itemData.name) {
                        Notification.error("enter item name");
                    } else if ($scope.model.itemData.type
                            && $scope.model.itemData.name) {
                        ConfirmPane.primaryConfirm("Save Item !")
                                .confirm(function () {
                                    $scope.model.saveItem()
                                            .then(function () {
                                                Notification.success("Item save Success");
                                            }, function () {
                                                Notification.error("Item save Fail");
                                            });
                                })
                                .discard(function () {
                                    console.log('discard');
                                });
                    }
                };

                $scope.ui.savePriceCategoryDetail = function () {
                    if (!$scope.model.priceCategoryDetail.item) {
                        Notification.error("enter item type");
                    } else if (!$scope.model.priceCategoryDetail.priceCategory) {
                        Notification.error("enter item name");
                    } else if (!$scope.model.priceCategoryDetail.normalPrice) {
                        Notification.error("enter item sale price normal");
                    } else if (!$scope.model.priceCategoryDetail.registerPrice) {
                        Notification.error("enter item sale price register");
                    } else if ($scope.model.priceCategoryDetail.item
                            && $scope.model.priceCategoryDetail.priceCategory
                            && $scope.model.priceCategoryDetail.normalPrice
                            && $scope.model.priceCategoryDetail.registerPrice) {
                        var requestData = $scope.model.duplicateCheckPriceCategoryDetails($scope.model.priceCategoryDetail.item, $scope.model.priceCategoryDetail.priceCategory);
                        if (angular.isUndefined(requestData)) {
                            ConfirmPane.primaryConfirm("Save price categiry details !")
                                    .confirm(function () {
                                        $scope.model.savePriceCategoryDetail()
                                                .then(function () {
                                                    Notification.success("save price categiry details");
                                                    $scope.model.priceCategoryDetail.item = $scope.selectNextPriceCategoryDetails;
                                                }, function () {
                                                    Notification.error("save price categiry details fail");
                                                });
                                    })
                                    .discard(function () {
                                        console.log('discard');
                                    });
                        } else {
                            Notification.error("This Item Price Category Details Allrady Exists !");
                        }
                    }
                };

                $scope.ui.editePriceCategoryDetail = function (priceCategoryDetail, $index) {
                    $scope.model.editePriceCategoryDetail(priceCategoryDetail, $index);
                };

                $scope.ui.selectNextPriceCategoryDetails = function (value) {
                    if (value) {
                        $scope.selectNextPriceCategoryDetails = $scope.model.priceCategoryDetail.item;
                    } else {
                        $scope.selectNextPriceCategoryDetails = null;
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
                    $scope.textViewMode = items.type;
                    $scope.model.editeItem(items, $index);
                };

                //delete item
                $scope.ui.deleteItems = function (items, $index) {
                    $scope.model.deleteItem(items, $index);
                };

                //delete item
                $scope.ui.deletePriceCategoryDetail = function (items, $index) {
                    ConfirmPane.dangerConfirm("Delete Price Category Detail !")
                            .confirm(function () {
                                $scope.model.deletePriceCategoryDetail(items, $index);
                            })
                            .discard(function () {
                                console.log('discard fail');
                            });

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