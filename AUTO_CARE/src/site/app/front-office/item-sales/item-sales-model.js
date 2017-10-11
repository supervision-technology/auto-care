(function () {
    angular.module("appModule")
            .factory("itemSalesModel", function (itemSalesService, itemSalesFactory, $filter, $q, Notification) {
                function paymentVoucherModel() {
                    this.constructor();
                }
                paymentVoucherModel.prototype = {
                    //master list
                    vehicleList: [],
                    clientList: [],
                    employeeList: [],
                    jobItemList: [],
                    itemsByStockLeger: [],
                    itemUnits: [],
                    paymentInformationList: [],
                    branchSearchList: [],

                    //transaction list
                    payment: {},
                    information: {},
                    paymentInformation: {},
                    customerLedger: {},
                    saveData: {},
                    invoice: {},

                    //item model
                    tempItem: {},
                    itemSale: {},
                    customerData: {},

                    constructor: function () {
                        var that = this;
                        this.tempItem = itemSalesFactory.tempData();
                        this.customerData = itemSalesFactory.customerData();

                        this.customerLedger = itemSalesFactory.customerLedger();
                        this.payment = itemSalesFactory.payment();
                        this.information = itemSalesFactory.information();
                        this.paymentInformation = itemSalesFactory.paymentInformation();
                        this.invoice = itemSalesFactory.invoiceData();

                        this.saveData = itemSalesFactory.saveData();

                        itemSalesService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                        itemSalesService.loadEmployee()
                                .success(function (data) {
                                    that.employeeList = data;
                                });

                        itemSalesService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });

                        itemSalesService.loadBank()
                                .success(function (data) {
                                    that.bankList = data;
                                });

                        itemSalesService.loadBranch()
                                .success(function (data) {
                                    that.branchList = data;
                                });

                        itemSalesService.loadCardType()
                                .success(function (data) {
                                    that.cardTypeList = data;
                                });

                    },
                    saveItemSale: function () {
                        var defer = $q.defer();
                        var that = this;

                        that.saveData.jobItem = that.jobItemList;
                        that.saveData.customerLedger = that.customerLedger;
                        that.saveData.payment = that.payment;
                        that.saveData.paymentInformationList = that.paymentInformationList;
                        that.saveData.invoice = that.invoice;
                        console.log(that.saveData);


                        itemSalesService.saveItemSale(JSON.stringify(this.saveData))
                                .success(function (data) {
                                    console.log(data);
                                    that.clear();
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    console.log("error");
                                    defer.reject();
                                });
                        return defer.promise;

                    },

                    clear: function () {
                        this.customerLedger = itemSalesFactory.customerLedger();
                        this.payment = itemSalesFactory.payment();
                        this.information = itemSalesFactory.information();
                        this.paymentInformation = itemSalesFactory.paymentInformation();
                        this.invoice = itemSalesFactory.invoiceData();
                        this.saveData = itemSalesFactory.saveData();

                        this.paymentInformationList = [];
                        this.branchSearchList = [];
                        this.jobItemList = [];
                    },

                    getQuickSeacrhStockItemAndNonStockItem: function (itemKey) {
                        var that = this;
                        var defer = $q.defer();
                        itemSalesService.getQuickSeacrhStockItemAndNonStockItem(itemKey)
                                .success(function (data) {
                                    that.itemsByStockLeger = [];
                                    that.itemsByStockLeger = data;
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    that.itemsByStockLeger = [];
                                    defer.reject();
                                });
                        return defer.promise;
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

                    findByAvailableStockQty: function (itemIndexNo) {
                        var defer = $q.defer();
                        itemSalesService.findByAvailableStockQty(itemIndexNo)
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },

                    getInsertCashPayment: function (amount, type) {
                        this.payment.cashAmount = 0.00;
                        this.payment.cashAmount = parseFloat(amount);
                        this.payment.totalAmount += parseFloat(amount);
                        this.paymentInformation.amount = parseFloat(amount);
                        this.paymentInformation.type = type;
                        this.paymentInformationList.push(this.paymentInformation);
                        this.paymentInformation = {};
                        this.getPaymentDetails();
                        console.log(this.paymentInformationList);

                    },
                    getPaymentDetails: function () {

//                        this.payment.cashAmount = parseFloat(this.getTotalPaymentTypeWise('CASH'));
                        this.payment.chequeAmount = parseFloat(this.getTotalPaymentTypeWise('CHEQUE'));
                        this.payment.cardAmount = parseFloat(this.getTotalPaymentTypeWise('CARD'));
                        this.payment.overPaymentAmount = parseFloat(this.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLEMENT'));
                        console.log(this.payment.overPaymentAmount);
                        this.payment.totalAmount =
                                parseFloat(this.payment.cashAmount)
                                + parseFloat(this.payment.cardAmount)
                                + parseFloat(this.payment.chequeAmount)
                                + parseFloat(this.payment.overPaymentAmount);
                        this.payment.balanceAmount = parseFloat(this.information.invoiceTotalPayment) - this.payment.totalAmount;
                        if (this.payment.balanceAmount < 0.00) {
                            this.payment.balanceAmount = 0.00;
                        }
                        this.payment.overPayment = parseFloat(this.payment.totalAmount) - parseFloat(this.information.invoiceTotalPayment);
                    },

                    //insert card or cheque payment
                    getInsertCardAndChequePayment: function (paymentInformation, type) {
                        paymentInformation.type = type;
                        this.paymentInformationList.push(paymentInformation);
                        this.paymentInformation = {};
                        this.getPaymentDetails();

                    },

                    //insert client over payment settle
                    insertClientOverPaymentSettlment: function (amount, type) {
                        this.paymentInformation = itemSalesFactory.paymentInformation();
                        this.paymentInformation.type = type;
                        this.paymentInformation.amount = amount;
                        this.paymentInformationList.push(this.paymentInformation);
                        this.paymentInformation = {};
                        this.getPaymentDetails();

                    },

                    deleteOverPayment: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === "OVER_PAYMENT_SETTLEMENT") {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                            }
                        });
                    },

                    getCashPaymentDelete: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === 'CASH') {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                            }
                        });
                    },
                    //delete card payment and cheque payment
                    getCardAndChequePaymentDelete: function (number,type) {
                        var that = this;
                        var id = -1;
                        for (var i = 0; i < that.paymentInformationList.length; i++) {
                            if (that.paymentInformationList[i].type === type && that.paymentInformationList[i].number === number ) {
                                id = i;
                            }
                        }
                        this.paymentInformationList.splice(id, 1);
                        this.getPaymentDetails();

                    },
                
                    //total payment CASH,CHEQUE,CARD
                    getTotalPaymentTypeWise: function (type) {
                        var total = 0.0;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === type) {
                                total += values.amount;
                                return;
                            }
                        });
                        return total;
                    },

                    cardTypeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.cardTypeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },

                    clientVehicles: function (indexNo) {
                        var that = this;
                        itemSalesService.getClientVehicles(indexNo)
                                .success(function (data) {
                                    that.information.pendingVehicles = data.vehicleNo;
                                });

                    },

                    clientBalance: function (indexNo) {
                        var that = this;
                        itemSalesService.getClientBalance(indexNo)
                                .success(function (data) {
                                    that.information.balanceAmount = parseFloat(data);
                                });

                    },

                    clientOverPayment: function (indexNo) {
                        var that = this;
                        itemSalesService.getClientOverPayment(indexNo)
                                .success(function (data) {
                                    that.information.overPayment = parseFloat(data);
                                });
                    },

                    clientLabel: function ($item, $model, $label) {
                        var that = this;
                        that.customerData.name = $item.name;
                        that.customerData.mobile = $item.mobile;
                        that.invoice.branch = $item.branch;
                        that.clientVehicles($item.indexNo);
                        that.clientBalance($item.indexNo);
                        that.clientOverPayment($item.indexNo);
                    },

                    clientLabelFormater: function (indexNo) {
                        var data = "";
                        angular.forEach(this.clientList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },

                    bankLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.bankList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },

                    employeeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    branchLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.branchSearchList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    findByBranchList: function (bank) {
                        var that = this;
                        var defer = $q;
                        itemSalesService.loadBranchByBank(bank)
                                .success(function (data) {
                                    that.branchSearchList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
                    }



                };
                return paymentVoucherModel;
            });
}());
