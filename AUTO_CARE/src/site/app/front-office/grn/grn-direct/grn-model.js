(function () {
    angular.module("appModule")
            .factory("directGrnModel", function (directGrnService, directGrnModelFactory, $q, optionPane) {
                function directGrnModel() {
                    this.constructor();
                }

                directGrnModel.prototype = {

                    //model factory data
                    data: {},
                    tempData: {},
                    //master data lists
                    items: [],
                    suppliers: [],

                    //opreation data
                    categoryIndex: null,
                    brandIndex: null,

                    constructor: function () {
                        var that = this;
                        that.data = directGrnModelFactory.newData();
                        that.tempData = directGrnModelFactory.tempData();

                        directGrnService.loadItems()
                                .success(function (data) {
                                    that.items = data;

                                });

                        directGrnService.loadSupplier()
                                .success(function (data) {
                                    that.suppliers = data;
                                });

                    },
                    itemLable: function (index) {
                        var label;
                        angular.forEach(this.items, function (value) {
                            if (value.indexNo === index) {
                                label = value.barcode + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    },
                    supplierLable: function (index) {
                        var label;
                        angular.forEach(this.suppliers, function (value) {
                            if (value.indexNo === index) {
                                label = value.indexNo + ' - ' + value.name;
                                return;
                            }
                        });
                        return label;
                    },

                    //validation
                    validateBarcode: function (barcode) {
                        var c = null;
                        angular.forEach(this.items, function (value) {
                            if (value.barcode === barcode) {
                                c = value;
                                return;
                            }
                        });
                        if (c) {
                            this.tempData.item = c.indexNo;
                            this.tempData.unitPrice = c.costPrice;
                        } else {
                            this.tempData.item = null;
                        }
                    },

                    addData: function () {
                        var that = this;
                        var saveConfirmation = true;

                        if (!that.tempData.barcode) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Enter Barcode for Find Item !");
                        }
                        if (!that.tempData.item) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Select Item !");
                        }
                        if (!that.tempData.unitPrice) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Enter Cost Price !");
                        }
                        if (!that.tempData.qty) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Enter Quantity !");
                        }
                        if (saveConfirmation) {
                            that.data.grnItemList.unshift(that.tempData);
                            this.tempData = directGrnModelFactory.tempData();
                            this.summaryValueCalculator();
                            return saveConfirmation;
                        }
                        return saveConfirmation;
                    },
                    getItemLabel: function (indexNo) {

                        var that = this;
                        var label = null;
                        angular.forEach(this.items, function (value) {
                            if (value.indexNo === indexNo) {
                                label = value;
                                that.categoryIndex = value.category;
                                that.brandIndex = value.brand;
                                return;
                            }
                        });
                        return label;
                    }
                    , summaryValueCalculator: function () {
                        var that = this;
                        var valueSummary = 0;
                        var qtySummary = 0;

                        angular.forEach(that.data.grnItemList, function (value) {
                            valueSummary += value.unitPrice * value.qty;
                            qtySummary += value.qty;

                        });
                        this.data.summaryQty = qtySummary;
                        this.data.amount = valueSummary;
                        this.data.netAmount= valueSummary;
                        this.data.discount= 0.00;
                        this.data.discountRate= 0.00;
                    },
                    saveGrn: function () {
                        var defer = $q.defer();
                        var that = this;
                        var saveConfirmation = true;

                        if (!that.data.supplier) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Select Supplier for Save Grn !");
                        }
                        if (!that.data.date) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Select Date for Save Grn !");
                        }
                        if (!that.data.grnItemList) {
                            saveConfirmation = false;
                            optionPane.dangerMessage("Add Grn Item for Save Grn !");
                        }

                        if (saveConfirmation) {
                            console.log(this.data);
                            directGrnService.saveGrn(JSON.stringify(this.data))
                                    .success(function (data) {
                                        defer.resolve();
                                    })
                                    .error(function (data) {
                                        defer.reject();
                                    });
                            return defer.promise;
                        }

                    },
                    netValueCalculator: function () {
                        var that = this;
                        if (this.data.amount) {
                            that.data.netAmount = this.data.amount - this.data.discount;
                            that.data.discountRate = (this.data.discount * 100) / this.data.amount;
                        }
                    }
                   
                    , discountRate: function () {
                        var that = this;
                        if (this.data.amount) {
                            that.data.discount = (this.data.amount * that.data.discountRate) / 100;
                            that.data.netAmount = this.data.amount - this.data.discount;
                        }
                    }
                    , edit: function (index) {
                        var that = this;
                        that.tempData = that.data.grnItemList[index];
                        that.data.grnItemList.splice(index, 1);
                        this.summaryValueCalculator();
                        this.netValueCalculator();
                    }
                    , delete: function (index) {
                        var that = this;
                        that.data.grnItemList.splice(index, 1);
                        this.summaryValueCalculator();
                        this.netValueCalculator();
                    }
                    , clear: function () {
                        var that = this;
                        that.data = directGrnModelFactory.newData();
                        that.tempData = directGrnModelFactory.tempData();
                    }

//                    addPackageAndServiceItem: function (item, type, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//
//                        this.data = invoiceModelFactory.newData();
//                        if (vehicleType === "REGISTER") {
//                            //value change
//                            that.data.quantity = 1;
//                            that.data.price = item.salePriceRegister;
//                            that.data.value = item.salePriceRegister;
//
//                            that.data.jobCard = jobCard;
//                            that.data.item = item.indexNo;
//
//                            if (type === "PACKAGE_ITEM") {
//                                this.data.package = 1;
//                            } else {
//                                this.data.package = 0;
//                            }
//
//                        } else {
//                            //value change
//                            that.data.quantity = 1;
//                            that.data.price = item.salePriceNormal;
//                            that.data.value = item.salePriceNormal;
//
//                            that.data.jobCard = jobCard;
//                            that.data.item = item.indexNo;
//
//                            if (type === "PACKAGE_ITEM") {
//                                this.data.package = 1;
//                            } else {
//                                this.data.package = 0;
//                            }
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    addNormalItem: function (item, qty, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//                        this.data = invoiceModelFactory.newData();
//                        if (vehicleType === "REGISTER") {
//                            //value change
//                            that.data.quantity = qty;
//                            that.data.price = item.salePriceRegister;
//                            that.data.value = qty * item.salePriceRegister;
//                            that.data.item = item.indexNo;
//                            that.data.jobCard = jobCard;
//                        } else {
//                            //value change
//                            that.data.quantity = qty;
//                            that.data.price = item.salePriceNormal;
//                            that.data.value = qty * item.salePriceNormal;
//                            that.data.item = item.indexNo;
//                            that.data.jobCard = jobCard;
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return  defer.promise;
//                    },
//                    addItemUnit: function (itemUnit, qty, jobCard, vehicleType) {
//                        var defer = $q.defer();
//                        var that = this;
//
//                        this.data = invoiceModelFactory.newData();
//                        var itemUnitData = that.itemUnitData(itemUnit);
//
//                        if (vehicleType === "REGISTER") {
//                            that.data.quantity = qty;
//                            that.data.price = itemUnitData.salePriceRegister;
//                            that.data.value = parseFloat(qty * itemUnitData.salePriceRegister);
//                            that.data.itemUnit = itemUnitData.indexNo;
//                            that.data.jobCard = jobCard;
//                        } else {
//                            that.data.quantity = qty;
//                            that.data.price = itemUnitData.salePriceNormal;
//                            that.data.value = parseFloat(qty * itemUnitData.salePriceNormal);
//                            that.data.itemUnit = itemUnitData.indexNo;
//                            that.data.jobCard = jobCard;
//                        }
//
//                        invoiceService.saveJobItems(this.data)
//                                .success(function (data) {
//                                    that.jobItemList.unshift(data);
//                                    this.data = invoiceModelFactory.newData();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getSelectItemTotal: function () {
//                        var total = 0.0;
//                        angular.forEach(this.jobItemList, function (values) {
//                            total += values.value;
//                            return;
//                        });
//                        return total;
//                    },
//                    deleteSelectDetails: function (index) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.deleteJobItems(this.jobItemList[index].indexNo)
//                                .success(function () {
//                                    that.jobItemList.splice(index, 1);
//                                    that.getSelectItemTotal();
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.getSelectItemTotal();
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getJobItemHistory: function (jobCard) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.getJobItemHistory(jobCard)
//                                .success(function (data) {
//                                    that.jobItemList = [];
//                                    angular.extend(that.jobItemList, data);
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.jobItemList = [];
//                                    defer.reject();
//                                });
//                        return  defer.promise;
//                    },
//                    getPackageItems: function (indexNo) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.getPackageItems(indexNo)
//                                .success(function (data) {
//                                    that.packageItemList = [];
//                                    that.packageItemList = data;
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.packageItemList = [];
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    getItemUnits: function (item, priceCategory) {
//                        var data = [];
//                        angular.forEach(this.itemUnits, function (values) {
//                            if (values.item === parseInt(item) && values.priceCategory === parseInt(priceCategory)) {
//                                data.push(values);
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    getItemByPriceCategory: function (priceCategory) {
//                        var that = this;
//                        this.filterItems = [];
//                        angular.forEach(this.items, function (values) {
//                            if (values.priceCategory === parseInt(priceCategory)) {
//                                that.filterItems.push(values);
//                                return;
//                            }
//                        });
//                        return that.filterItems;
//                    },
//                    itemData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.items, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    vehicleData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.vehicles, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    itemUnitData: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.itemUnits, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    duplicateItemCheck: function (item) {
//                        var data;
//                        angular.forEach(this.jobItemList, function (values) {
//                            if (values.item === parseInt(item.indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    duplicateItemUnitCheck: function (itemUnit) {
//                        var data;
//                        angular.forEach(this.jobItemList, function (values) {
//                            if (values.itemUnit === parseInt(itemUnit)) {
//                                data = values;
//                                return;
//                            }
                    //                        });
                    //                        return data;
//                    }
                };
                return directGrnModel;
            });
}());