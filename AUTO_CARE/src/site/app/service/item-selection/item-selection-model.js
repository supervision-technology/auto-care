(function () {
    angular.module("appModule")
            .factory("ItemSelectionModel", function (ItemSelectionService, ItemSelectionModelFactory, $q) {
                function ItemSelectionModel() {
                    this.constructor();
                }

                ItemSelectionModel.prototype = {

                    data: {},
                    jobCardData: {},
                    //master data lists
                    items: [],
                    vehicles: [],
                    itemUnits: [],
                    category: [],

                    //select job card items
                    jobItemList: [],
                    //job card select filter items
                    filterItems: [],

                    constructor: function () {
                        var that = this;
                        this.data = ItemSelectionModelFactory.newData();
                        this.jobCardData = ItemSelectionModelFactory.newJobCardData();

                        ItemSelectionService.loadItems()
                                .success(function (data) {
                                    that.items = data;
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
                    },
                    clear: function () {
                        this.data = ItemSelectionModelFactory.newData();
                        this.jobCardData = ItemSelectionModelFactory.newJobCardData();
                        //select job card items
                        this.jobItemList = [];
                        //job card select filter items
                        this.filterItems = [];
                    },
                    addPackageAndServiceItem: function (item, type, jobCard, vehicleType) {
                        var defer = $q.defer();
                        var that = this;

                        this.data = ItemSelectionModelFactory.newData();
                        if (vehicleType === "REGISTER") {
                            //value change
                            that.data.quantity = 1;
                            that.data.price = item.salePriceRegister;
                            that.data.value = item.salePriceRegister;

                            that.data.jobCard = jobCard;
                            that.data.item = item.indexNo;

                            if (type === "PACKAGE_ITEM") {
                                this.data.package = 1;
                            } else {
                                this.data.package = 0;
                            }

                        } else {
                            //value change
                            that.data.quantity = 1;
                            that.data.price = item.salePriceNormal;
                            that.data.value = item.salePriceNormal;

                            that.data.jobCard = jobCard;
                            that.data.item = item.indexNo;

                            if (type === "PACKAGE_ITEM") {
                                this.data.package = 1;
                            } else {
                                this.data.package = 0;
                            }
                        }

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
                    getSelectItemTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
                    deleteSelectDetails: function (index) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.deleteJobItems(this.jobItemList[index].indexNo)
                                .success(function () {
                                    that.jobItemList.splice(index, 1);
                                    that.getSelectItemTotal();
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.getSelectItemTotal();
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    findJobCard: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.findJobCard(jobCard)
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    that.jobCardData = new ItemSelectionModelFactory.newJobCardData();
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getItemsByCategory: function (category, priceCategory) {
                        var defer = $q.defer();
                        var that = this;
                        ItemSelectionService.findByCategoryAndItems(category, priceCategory)
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
//                    getItemByPriceCategory: function (priceCategory) {
//                        var that = this;
//                        this.filterItems = [];
//                        angular.forEach(this.filterItems, function (values) {
//                            if (values.priceCategory === parseInt(priceCategory)) {
//                                that.filterItems.push(values);
//                                return;
//                            }
//                        });
//                        return that.filterItems;
//                    },
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
                    duplicateItemCheck: function (item) {
                        var data;
                        angular.forEach(this.jobItemList, function (values) {
                            if (values.item === parseInt(item.indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }
                };
                return ItemSelectionModel;
            });
}());