(function () {
    var factory = function (itemFactory, itemService, $q, $filter, Notification) {
        function itemModel() {
            this.constructor();
        }

        //prototype functions
        itemModel.prototype = {
            //data model
            itemData: {},
            tempItemData: {},
            itemUnitData: {},
            packageData: {},
            consumableData: {},
            itemCheckData: {},
            priceCategoryDetails: {},
            //uib-typeahead
            items: [],
            itemsTypeWiseItems: [],
            itemunits: [],
            itemDepartments: [],
            categorys: [],
            itemCategorys: [],
            subCategorys: [],
            brands: [],
            priceCategory: [],
            suppliers: [],
            consumableItemList: [],
            //view table lists
            itemViewList: [],
            itemunitsViewList: [],
            packageViewList: [],
            itemCheckDetailList: [],
            priceCategoryDetailsList: [],
            selectedConsumableItem: {},
            selectedItem: {},
            consumableItemIsView: false,
            selectedItemIsView: false,
            //constructor
            constructor: function () {
                var that = this;

                that.itemData = itemFactory.newItemData();
                that.tempItemData = itemFactory.newItemData();
                that.itemUnitData = itemFactory.newItemUnitData();
                that.packageUnitData = itemFactory.newPackageData();
                that.consumableData = itemFactory.newConsumableData();
                that.itemCheckData = itemFactory.newItemCheckData();
                that.priceCategoryDetails = itemFactory.newPriceCategoryDetails();

                itemService.loadItem()
                        .success(function (data) {
                            that.items = data;
                            that.itemViewList = data;
                        });

//                itemService.loadItemUnit()
//                        .success(function (data) {
//                            that.itemunitsViewList = data;
//                        });

                itemService.loadCategory()
                        .success(function (data) {
                            that.categorys = data;
                        });

                itemService.loadItemCategory()
                        .success(function (data) {
                            that.itemCategorys = data;
                        });

                itemService.loadSubCategory()
                        .success(function (data) {
                            that.subCategorys = data;
                        });

                itemService.loadBrand()
                        .success(function (data) {
                            that.brands = data;
                        });

                itemService.loadItemDepartment()
                        .success(function (data) {
                            that.itemDepartments = data;
                        });
                itemService.loadPriceCategory()
                        .success(function (data) {
                            that.priceCategory = data;
                        });
                itemService.loadSupplier()
                        .success(function (data) {
                            that.suppliers = data;
                        });


                this.loadConsumableItem();
                this.loadItemCheckDetailList();
            },
            clear: function () {
                this.constructor();
            },
            findItemByItemType: function (itemType) {
                var that = this;
                var defer = $q.defer();
                itemService.findItemByItemType(itemType)
                        .success(function (data) {
                            that.itemsTypeWiseItems = [];
                            that.itemsTypeWiseItems = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.itemsTypeWiseItems = [];
                            defer.reject();
                        });
                return defer.promise;
            },
            loadConsumableItem: function () {
                var that = this;
                itemService.loadConsumableItem()
                        .success(function (data) {
                            that.consumableItemList = data;
                        });
            },
            loadItemCheckDetailList: function () {
                var that = this;
                itemService.loadItemCheckDetails()
                        .success(function (data) {
                            that.itemCheckDetailList = data;
                        });
            },
            saveItem: function () {
                var defer = $q.defer();
                var that = this;
                itemService.saveItem(JSON.stringify(this.itemData))
                        .success(function (data) {
                            that.itemViewList.unshift(data);
                            that.itemData = {};
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            editeItem: function (items, $index) {
                this.itemData = items;
                this.itemsTypeWiseItems.splice($index, 1);
            },
            deleteItem: function (items, $index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteItem(items.indexNo)
                        .success(function (data) {
                            that.itemsTypeWiseItems.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            loadItemUnitByItem: function (item) {
                var that = this;
                var defer = $q;
                itemService.loadItemUnitByItem(item)
                        .success(function (data) {
                            that.itemunitsViewList = [];
                            that.itemunitsViewList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.itemunitsViewList = [];
                            defer.reject();
                        });
                return defer.promise;
            },
            saveItemUnit: function () {
                var defer = $q.defer();
                var that = this;
                this.itemUnitData.itemUnitType = "NORMAL";
                itemService.saveItemUnit(JSON.stringify(this.itemUnitData))
                        .success(function (data) {
                            that.itemunitsViewList.unshift(data);
                            that.itemUnitData = {};

                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            editeItemUnits: function (itemsUnits, $index) {
                this.itemUnitData = itemsUnits;
                this.itemunitsViewList.splice($index, 1);
            },
            deleteItemUnits: function (itemsUnits, $index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteItemUnit(itemsUnits.indexNo)
                        .success(function (data) {
                            that.itemunitsViewList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            //package items
            addPackageItem: function () {
                var defer = $q.defer();
                var that = this;
                itemService.savePackageItem(this.packageData)
                        .success(function (data) {
                            that.packageViewList.unshift(data);
                            that.packageData = {};
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            getPackageItems: function (indexNo) {
                var defer = $q.defer();
                var that = this;
                itemService.getPackageItems(indexNo)
                        .success(function (data) {
                            that.packageViewList = [];
                            that.packageViewList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.packageViewList = [];
                            defer.reject();
                        });
                return defer.promise;
            },
            deletePackageItems: function (package, $index) {
                var defer = $q.defer();
                var that = this;
                itemService.deletePackageItem(package.indexNo)
                        .success(function (data) {
                            that.packageViewList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            saveConsumable: function () {
                var confirmation = true;
                if (!this.consumableData.service) {
                    confirmation = false;
                    Notification.error('Select a Service Item For Save !');
                }
                if (!this.consumableData.consumable) {
                    confirmation = false;
                    Notification.error('Select a Consumable Item For Save !');
                }
                if (this.consumableData.qty <= 0.0) {
                    confirmation = false;
                    Notification.error('Quantity less then 0 !');
                }
                if (confirmation) {

                    var defer = $q.defer();
                    var that = this;
                    itemService.saveConsumableItem(JSON.stringify(this.consumableData))
                            .success(function (data) {
                                that.consumableData.consumable = null;
                                that.consumableData.qty = 0.00;
                                that.loadConsumableItem();
                                this.consumableItemIsView = false;
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                    return defer.promise;
                }
            },
            saveItemChechDetail: function () {
                var confirmation = true;
                if (!this.itemCheckData.item) {
                    confirmation = false;
                    Notification.error('Select a Item For Save !');
                }
                if (!this.itemCheckData.name) {
                    confirmation = false;
                    Notification.error('Select a Check Description !');
                }
                if (confirmation) {

                    var defer = $q.defer();
                    var that = this;
                    itemService.saveItemCheckDetail(JSON.stringify(this.itemCheckData))
                            .success(function (data) {
                                that.itemCheckData.name = null;
                                that.loadItemCheckDetailList();
                                defer.resolve();
                            })
                            .error(function (data) {
                                defer.reject();
                            });
                    return defer.promise;
                }
            },
            selectCunsumableItel: function (index) {
                var item = this.itemObject(index);
                this.selectedConsumableItem = item;
                this.consumableItemIsView = true;
            },
            deleteConsumableItem: function (index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteConsumableItem(index)
                        .success(function (data) {
                            that.consumableData.consumable = null;
                            that.consumableData.qty = 0.00;
                            that.loadConsumableItem();
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            deleteItemCheckDetail: function (index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteItemCheckDetail(index)
                        .success(function (data) {
                            that.itemCheckData.name = null;
                            that.itemCheckData.item = null;
                            that.loadItemCheckDetailList();
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            priceCategoryLable: function (indexNo) {
                var item;
                angular.forEach(this.priceCategory, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            brandLable: function (indexNo) {
                var item;
                angular.forEach(this.brands, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            supplierLable: function (indexNo) {
                var supplier;
                angular.forEach(this.suppliers, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        supplier = value.name + " - " + value.contactNo;
                        return;
                    }
                });
                return supplier;
            },
            itemLable: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + " - " + value.name;
                        return;
                    }
                });
                return item;
            },
            itemObject: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                return item;
            },
            categoryLable: function (indexNo) {
                var item;
                angular.forEach(this.categorys, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            itemCategoryLable: function (indexNo) {
                var item;
                angular.forEach(this.itemCategorys, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            subCategoryLable: function (indexNo) {
                var item;
                angular.forEach(this.subCategorys, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            itemDepartmentLable: function (indexNo) {
                var item;
                angular.forEach(this.itemDepartments, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            item: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                return item;
            },
            selectedItemForCheckItem: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                this.selectedItem = item;
                this.selectedItemIsView = true;
            },
            // ------------ price category details ------------
            loadPriceCategoryDetailByItem: function (item) {
                var that = this;
                var defer = $q.defer();

                //select item data
                that.tempItemData = that.item(item);

                itemService.loadPriceCategoryDetailByItem(item)
                        .success(function (data) {
                            that.priceCategoryDetailsList = [];
                            that.priceCategoryDetailsList = data;
                            defer.resolve();
                        })
                        .error(function () {
                            that.priceCategoryDetailsList = [];
                            defer.reject();
                        });
                return defer.promise;
            },
            savePriceCategoryDetail: function () {
                var that = this;
                var defer = $q.defer();
                itemService.saveMPriceCategoryDetails(this.priceCategoryDetail)
                        .success(function (data) {
                            that.priceCategoryDetailsList.unshift(data);
                            that.priceCategoryDetail = {};
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            duplicateCheckPriceCategoryDetails: function (item, priceCategory) {
                var data;
                angular.forEach(this.priceCategoryDetailsList, function (values) {
                    if (values.item === parseInt(item) && values.priceCategory === parseInt(priceCategory)) {
                        data = values;
                        return;
                    }
                });
                return data;
            },
            deletePriceCategoryDetail: function ($index, indexNo) {
                var that = this;
                var defer = $q.defer();
                itemService.deleteMPriceCategoryDetails(indexNo)
                        .success(function (data) {
                            that.priceCategoryDetailsList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            editePriceCategoryDetail: function (priceCategoryDetail, $index) {
                this.priceCategoryDetail = priceCategoryDetail;
                this.priceCategoryDetailsList.splice($index, 1);
            }
        };
        return itemModel;
    };
    angular.module("appModule")
            .factory("itemModel", factory);
}());


