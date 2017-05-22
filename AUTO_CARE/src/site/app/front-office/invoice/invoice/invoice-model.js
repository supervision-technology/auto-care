(function () {
    angular.module("appModule")
            .factory("invoiceModel", function (invoiceService, invoiceFactory, $filter, $q) {
                function invoiceModel() {
                    this.constructor();
                }
                invoiceModel.prototype = {
                    //master list
                    vehicleList: [],
                    clientList: [],
                    pendingJobCards: [],
                    bankList: [],
                    branchList: [],
                    //trasactons list
                    invoiceData: {},
                    paymentData: {},
                    paymentInfomationData: {},
                    paymentInformationList: [],
                    invoicePaymentData: {},
                    //master data lists

                    constructor: function () {
                        var that = this;
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.paymentData = invoiceFactory.newPaymentData();
                        this.paymentInfomationData = invoiceFactory.newPaymentInformation();
                        //payment invoice model (mix model)
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();

                        invoiceService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        invoiceService.loadVehicle()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });

                        invoiceService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                        invoiceService.loadBank()
                                .success(function (data) {
                                    that.bankList = data;
                                });

                        invoiceService.loadBranch()
                                .success(function (data) {
                                    that.branchList = data;
                                });
                    },
                    clear: function () {
                        console.log("clear");
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.paymentData = invoiceFactory.newPaymentData();
                        this.paymentInfomationData = invoiceFactory.newPaymentInformation();
                        //payment invoice model (mix model)
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();
                    },
                    vehicle: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    client: function (indexNo) {
                        var data = "";
                        angular.forEach(this.clientList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
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
                    branchkLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.branchList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    getBranch: function (bank) {
                        var data = "";
                        angular.forEach(this.branchList, function (values) {
                            if (values.bank === bank) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        this.invoiceData.amount = 0.0;
                        invoiceService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    angular.forEach(data, function (values) {
                                        that.invoiceData.amount += values.value;
                                        that.getPaymentDetails();
                                        return;
                                    });
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.invoiceData.amount = 0.0;
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getClientOverPayment: function (client) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.getClientOverPayment(client)
//                                .success(function (data) {
//                                    if (parseInt(data) > 0) {
//                                        that.invoiceData.overAmount = parseFloat(data);
//                                        defer.resolve();
//                                    } else {
//                                        that.invoiceData.outStandingAmount = parseFloat(-1 * data);
//                                        defer.resolve();
//                                    }
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
                    },
                    loadInvoiceData: function (invoiceNumber) {
//                        var defer = $q.defer();
//                        var that = this;
//                        invoiceService.loadInvoiceData(invoiceNumber)
//                                .success(function (data) {
//                                    that.invoicePaymentData = invoiceFactory.newInvoicePayment();
//                                    angular.extend(that.invoicePaymentData, data);
//                                    that.invoiceData = that.invoicePaymentData.invoice;
//                                    that.paymentData = that.invoicePaymentData.payment;
//                                    that.paymentInformationList = that.invoicePaymentData.paymentInformationsList;
//
//                                    console.log(that.invoicePaymentData);
//                                    that.getPaymentDetails();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
                    },
                    saveInvoice: function () {
                        var that = this;
                        var defer = $q.defer();
                        this.invoiceData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                        this.invoicePaymentData.invoice = this.invoiceData;
                        this.invoicePaymentData.payment = this.paymentData;
                        this.invoicePaymentData.paymentInformationsList = this.paymentInformationList;

                        console.log(this.invoicePaymentData);
                        console.log(this.invoicePaymentData);

//                        invoiceService.saveInvoice(JSON.stringify(this.invoicePaymentData))
//                                .success(function (data) {
//                                    defer.resolve(data);
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
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
                    getPaymentDetails: function () {
                        this.invoiceData.netAmount = parseFloat(this.invoiceData.amount - this.invoiceData.discountAmount);

                        this.paymentData.cashAmount = parseFloat(this.getTotalPaymentTypeWise('CASH'));
                        this.paymentData.chequeAmount = parseFloat(this.getTotalPaymentTypeWise('CHEQUE'));
                        this.paymentData.cardAmount = parseFloat(this.getTotalPaymentTypeWise('CARD'));
                        this.paymentData.overAmount = parseFloat(this.getTotalPaymentTypeWise('OVER_PAYMENT'));

                        this.paymentData.totalAmount =
                                parseFloat(this.paymentData.cashAmount)
                                + parseFloat(this.paymentData.cardAmount)
                                + parseFloat(this.paymentData.chequeAmount)
                                + parseFloat(this.paymentData.overAmount);

                        this.paymentData.balance = parseFloat(this.invoiceData.netAmount - this.paymentData.totalAmount);

//                        if (parseFloat(this.paymentData.balance) < 0) {
//                            this.invoiceData.overPayment = parseFloat(-1 * this.paymentData.balance);
//                            this.paymentData.balance = 0.0;
//                        } else {
//                            this.invoiceData.overPayment = 0.0;
//                        }
                    },
                    //insert cash payment
                    getInsertCashPayment: function (amount, type) {
                        this.paymentInfomationData.amount = parseFloat(amount);
                        this.paymentInfomationData.type = type;
                        this.paymentInformationList.push(this.paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    //insert card or cheque payment
                    getInsertCardAndChequePayment: function (paymentInfomationData, type) {
                        paymentInfomationData.type = type;
                        this.paymentInformationList.push(paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    //insert client over payment settle
                    insertClientOverPayment: function (amount, type) {
                        this.paymentInfomationData = invoiceFactory.paymentInformation();
                        this.paymentInfomationData.type = type;
                        this.paymentInfomationData.amount = amount;
                        this.paymentInformationList.push(this.paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    //delete card payment and cheque payment
                    getCardAndChequePaymentDelete: function ($index) {
                        this.paymentInformationList.splice($index, 1);
                    },
                    //cash payment delete
                    getCashPaymentDelete: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === 'CASH') {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                            }
                        });
                    }

                };
                return invoiceModel;
            });
}());