(function () {
    angular.module("appModule")
            .factory("ItemSelectionModel", function (ItemSelectionService, ItemSelectionModelFactory, $q) {
                function ItemSelectionModel() {
                    this.constructor();
                }

                ItemSelectionModel.prototype = {
                    data: {},
                    jobCardData: {},
                    customerReservedItemData: {},
                    //master data lists
                    items: [],
                    itemCategory: [],
                    stockTest: [],
                    vehicles: [],
                    itemUnits: [],
                    category: [],
                    filterQuickSeacrhItems: [],
                    filterQuickSeacrhStockItems: [],
                    packageItemList: [],
                    vehicleAttenctionsCategoryList: [],
                    vehicleAttenctionsList: [],
                    //pending job card list
                    pendingJobCards: [],
                    //select job card items
                    jobItemList: [],
                    vehicleAttenctionSelectedList: [],
                    lastJobCardVehicleAttenctionList: [],
                    //job card select filter items
                    filterItems: [],
                    //select job card customer reserved itemes list
                    customerReceivedItems: [],
                    //items bt stock leger
                    itemsByStockLeger: [],
                    constructor: function () {
                        var that = this;
                        this.data = ItemSelectionModelFactory.newData();
                        this.jobCardData = ItemSelectionModelFactory.newJobCardData();
                        this.customerReservedItemData = ItemSelectionModelFactory.newCustomerReservedItemData();

                        ItemSelectionService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });

                        ItemSelectionService.loadItemsCategory()
                                .success(function (data) {
                                    that.itemCategory = data;
                                });

                        ItemSelectionService.pendingJobCards()
                                .success(function (data) {
                                    angular.forEach(data, function (job) {
                                        console.log(job.vehicle);
                                        job.vehicleNo = that.vehicleData(job.vehicle).vehicleNo;
                                        that.pendingJobCards.push(job);
                                    });
                                    console.log(that.pendingJobCards);
                                });

                        ItemSelectionService.loadCategory()
                                .success(function (data) {
                                    that.category = data;
                                });

                        ItemSelectionService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        ItemSelectionService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });

                        ItemSelectionService.getVehicleAttenctionsCategory()
                                .success(function (data) {
                                    that.vehicleAttenctionsCategoryList = data;
                                });

                        ItemSelectionService.getVehicleAttenctions()
                                .success(function (data) {
                                    that.vehicleAttenctionsList = data;
                                });
//                        that.pendingJobCardSetVehicleNo();
                    },
//                    pendingJobCardSetVehicleNo: function () {
//                        var that = this;
//                        var newPendingList = [];
//                        console.log(that.pendingJobCards);
//                        console.log(this.pendingJobCards);
//                        angular.forEach(that.pendingJobCards, function (job) {
//                            job.vehicleNo = that.vehicleData(job.vehicle).vehicleNo;
//                            newPendingList.push(job);
//                        });
//                        that.pendingJobCards = [];
//                        that.pendingJobCards = newPendingList;
//
//                    }
//                    ,
                    clear: function () {
                        this.data = ItemSelectionModelFactory.newData();
                        this.jobCardData = ItemSelectionModelFactory.newJobCardData();
                        //select job card items
                        this.jobItemList = [];
                        //job card select filter items
                        this.filterItems = [];
                    },
                    setServiceChargers: function (jobCard, serviceStatus) {
                        var that = this;
                        var defer = $q;
                        ItemSelectionService.setServiceChargers(jobCard, serviceStatus)
                                .success(function (data) {
                                    angular.extend(that.jobCardData, data);
                                    that.getSelectItemAllItems();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getQuickSeacrhItem: function (itemKey, priceCategory) {
                        var that = this;
                        var defer = $q;
                        ItemSelectionService.getQuickSeacrhItem(itemKey, priceCategory)
                                .success(function (data) {
                                    that.filterQuickSeacrhItems = [];
                                    that.filterQuickSeacrhItems = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.filterQuickSeacrhItems = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getQuickSeacrhStockItem: function (itemKey) {
                        var that = this;
                        var defer = $q.defer();
                        ItemSelectionService.getQuickSeacrhStockItem(itemKey)
                                .success(function (data) {
                                    that.filterQuickSeacrhStockItems = [];
                                    that.filterQuickSeacrhStockItems = data;
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    that.filterQuickSeacrhStockItems = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    printEstimate: function (jobCard) {
                        var defer = $q;
                        ItemSelectionService.printEstimate(jobCard)
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findSubCateoryByCateory: function (category) {
                        var that = this;
                        var defer = $q;
                        ItemSelectionService.findSubCateoryByCateory(category)
                                .success(function (data) {
                                    that.subCategory = [];
                                    that.subCategory = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.subCategory = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    checkObservation: function () {
                        var that = this;
                        var status = false;
                        angular.forEach(this.jobItemList, function (jobItemValues) {
                            angular.forEach(that.items, function (itemValues) {
                                if (jobItemValues.item === itemValues.indexNo) {
                                    if (itemValues.category === 7) {
                                        status = true;
                                        return;
                                    }
                                }
                            });
                        });
                        return status;
                    },
                    findItemsForStockLeger: function (itemCategory) {
                        var that = this;
                        var defer = $q.defer();
                        ItemSelectionService.findByItemStockItmQty(itemCategory)
                                .success(function (data) {
                                    that.itemsByStockLeger = [];
                                    that.itemsByStockLeger = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.itemsByStockLeger = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findJobItemByIndexNo: function (jobItem) {
                        var defer = $q.defer();
                        ItemSelectionService.findJobItemByIndexNo(jobItem)
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findJobCardDetail: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.findJobCard(jobCard)
                                .success(function (data) {
                                    that.jobCardData = ItemSelectionModelFactory.newJobCardData();
                                    angular.extend(that.jobCardData, data);
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    that.jobCardData = new ItemSelectionModelFactory.newJobCardData();
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    findByCategoryAndPriceCategory: function (categoryData, priceCategory) {
                        var defer = $q.defer();
                        var that = this;
                        var category = categoryData.indexNo;
                        ItemSelectionService.findByCategoryAndPriceCategory(category, priceCategory)
                                .success(function (data) {
                                    that.filterItems = [];
                                    that.filterItems = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.filterItems = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getPackageItems: function (indexNo) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.getPackageItems(indexNo)
                                .success(function (data) {
                                    that.packageItemList = [];
                                    that.packageItemList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.packageItemList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemList = [];
                                    angular.extend(that.jobItemList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemList = [];
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getItemUnits: function (item) {
                        var data = [];
                        this.selectItemUnits = [];
                        angular.forEach(this.itemUnits, function (values) {
                            if (values.item === parseInt(item)) {
                                data.push(values);
                                return;
                            }
                        });
                        this.selectItemUnits = data;
                        return data;
                    },
//------------------------------- service,stock items,package duplicate check ------------------------------- 
                    duplicateItemCheck: function (item) {
                        var data;
                        angular.forEach(this.jobItemList, function (values) {
                            if (values.item === parseInt(item.indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    duplicateItemUnitCheck: function (itemUnit) {
                        var data;
                        angular.forEach(this.jobItemList, function (values) {
                            if (values.itemUnit === parseInt(itemUnit)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
//------------------------------- /service,stock items,package duplicate check ------------------------------- 
                    itemData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.items, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    vehicleData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicles, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    itemUnitData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.itemUnits, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    categoryColours: function (indexNo) {
                        var data = "";
                        angular.forEach(this.category, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    itemCategoryColours: function (indexNo) {
                        var data = "";
                        angular.forEach(this.itemCategory, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
//------------------------------- add stock items,packages and servicee -------------------------------                     
                    addPackageAndServiceItem: function (item, type, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;

                        this.data = ItemSelectionModelFactory.newData();
                        if (vehicleType === "REGISTER") {
                            //value change
                            that.data.quantity = 1;
                            that.data.price = item.salePriceRegister;
                            that.data.value = item.salePriceRegister;
                        } else {
                            //value change
                            that.data.quantity = 1;
                            that.data.price = item.salePriceNormal;
                            that.data.value = item.salePriceNormal;
                        }

                        that.data.itemType = type;
                        that.data.jobCard = jobCard;
                        that.data.item = item.indexNo;

                        ItemSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    this.data = ItemSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    addItemUnit: function (itemUnit, qty, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;

                        this.data = ItemSelectionModelFactory.newData();
                        var itemUnitData = that.itemUnitData(itemUnit);

                        if (vehicleType === "REGISTER") {
                            that.data.quantity = qty;
                            that.data.price = itemUnitData.salePriceRegister;
                            that.data.value = parseFloat(qty * itemUnitData.salePriceRegister);
                        } else {
                            that.data.quantity = qty;
                            that.data.price = itemUnitData.salePriceNormal;
                            that.data.value = parseFloat(qty * itemUnitData.salePriceNormal);
                        }

                        that.data.itemType = "STOCK_ITEM";
                        that.data.itemUnit = itemUnitData.indexNo;
                        that.data.jobCard = jobCard;
                        that.data.item = itemUnitData.item;
                        that.data.stockRemoveQty = parseFloat(qty * itemUnitData.qty);

                        ItemSelectionService.saveJobItems(this.data)
                                .success(function (data) {
                                    that.jobItemList.unshift(data);
                                    that.data = ItemSelectionModelFactory.newData();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    deleteSelectDetails: function (index) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.deleteJobItems(this.jobItemList[index].indexNo)
                                .success(function () {
                                    that.jobItemList.splice(index, 1);
                                    that.getSelectItemAllItems();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.getSelectItemAllItems();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
//------------------------------- /add stock items,packages and servicee -------------------------------                    
//------------------------------- get totals -------------------------------
                    getSelectItemTotalForService: function () {
                        var total = 0.0;
                        var that = this;
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "SERVICE" || that.itemData(values.item).type === "PACKAGE") {
                                total += values.value;
                                return;
                            }
                        });
                        return total;
                    },
                    getSelectItemTotalForItemAndItemUnits: function () {
                        var total = 0.0;
                        var that = this;
                        angular.forEach(this.jobItemList, function (values) {
                            if (that.itemData(values.item).type === "STOCK" || values.itemUnit !== null) {
                                total += values.value;
                                return;
                            }
                        });
                        return total;
                    },
                    getSelectItemAllItems: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
//------------------------------- /get totals -------------------------------
//------------------------------- customer received items -------------------------------
                    findByJobCardCustomerReceiveItem: function (jobCard) {
                        var that = this;
                        var defer = $q.defer();
                        ItemSelectionService.findByJobCardCustomerReceiveItem(jobCard)
                                .success(function (data) {
                                    that.customerReceivedItems = [];
                                    that.customerReceivedItems = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.customerReceivedItems = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    saveCustomerReceiveItem: function (jobCard) {
                        var that = this;
                        var defer = $q.defer();
                        this.customerReservedItemData.jobCard = jobCard;
                        ItemSelectionService.saveCustomerReceiveItem(this.customerReservedItemData)
                                .success(function (data) {
                                    that.customerReceivedItems.unshift(data);
                                    that.customerReservedItemData = {};
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    deleteCustomerReceiveItem: function ($index, indexNo) {
                        var that = this;
                        ItemSelectionService.deleteCustomerReceiveItem(parseInt(indexNo))
                                .success(function (data) {
                                    var id = -1;
                                    for (var i = 0; i < that.customerReceivedItems.length; i++) {
                                        if (that.customerReceivedItems[i].indexNo === parseInt(data)) {
                                            id = i;
                                        }
                                    }
                                    that.customerReceivedItems.splice(id, 1);
                                })
                                .error(function () {

                                });
                    },
//------------------------------- vehicle attenctions -------------------------------  
                    vehicleAttenctions: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleAttenctionsList, function (values) {
                            if (values.indexNo === indexNo) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    vehicleAttenctionCategory: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleAttenctionsCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    addJobVehicleAttenction: function (data) {
                        var defer = $q;
                        ItemSelectionService.addJobVehicleAttenction(data)
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    addRemarkJobVehicleAttenction: function ($index, remark) {
                        var defer = $q;
                        var vehicleAttenctionData = this.vehicleAttenctionSelectedList[$index];
                        vehicleAttenctionData.remark = remark;
                        ItemSelectionService.addJobVehicleAttenction(vehicleAttenctionData)
                                .success(function (data) {
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getSelectedVehicleAttenctionCategoryData: function (category, jobCard) {
                        var that = this;
                        var defer = $q;
                        ItemSelectionService.getSelectedVehicleAttenctionCategoryData(category, jobCard)
                                .success(function (data) {
                                    that.vehicleAttenctionSelectedList = [];
                                    that.vehicleAttenctionSelectedList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.vehicleAttenctionSelectedList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getLastJobCardVehicleAttenctions: function (jobCard) {
                        var that = this;
                        var defer = $q;
                        ItemSelectionService.getLastJobCardVehicleAttenctions(jobCard)
                                .success(function (data) {
                                    that.lastJobCardVehicleAttenctionList = [];
                                    that.lastJobCardVehicleAttenctionList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    }
//------------------------------- /vehicle attenctions -------------------------------                    
                };
                return ItemSelectionModel;
            });
}());