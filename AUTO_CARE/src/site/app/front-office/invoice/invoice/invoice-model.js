(function () {
    angular.module("appModule")
            .factory("invoiceModel", function (invoiceService, invoiceFactory, $filter, $q) {
                function invoiceModel() {
                    this.constructor();
                }
                invoiceModel.prototype = {

                    invoiceData: {},
                    clientData: {},
                    vehicleData: {},
                    invoicePaymentData: {},

                    paymentData: {},
                    customerLegerData: {},
                    paymentInformation: {},

                    paymentInformationList: [],

                    //master data lists
                    vehicleList: [],
                    clientList: [],
                    vehicleTypeList: [],
                    priceCategoryList: [],
                    bankBranchList: [],

                    invoiceHistoryList: [],
                    jobItemHistortList: [],
                    constructor: function () {
                        var that = this;
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.clientData = invoiceFactory.newClientData();
                        this.vehicleData = invoiceFactory.newVehicleData();

                        this.paymentData = invoiceFactory.paymentData();
                        this.customerLegerData = invoiceFactory.customerLegerData();
                        this.paymentInformation = invoiceFactory.paymentInformation();

                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();

                        invoiceService.loadVehicle()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });

                        invoiceService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                        invoiceService.loadVehicleType()
                                .success(function (data) {
                                    that.vehicleTypeList = data;
                                });

                        invoiceService.loadPriceCategory()
                                .success(function (data) {
                                    that.priceCategoryList = data;
                                });

                        invoiceService.loadBankAndBranch()
                                .success(function (data) {
                                    that.bankBranchList = data;
                                });
                    },
                    clear: function () {
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.clientData = invoiceFactory.newClientData();
                        this.vehicleData = invoiceFactory.newVehicleData();

                        this.paymentData = invoiceFactory.paymentData();
                        this.customerLegerData = invoiceFactory.customerLegerData();
                        this.paymentInformation = invoiceFactory.paymentInformation();
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();

                        this.invoiceHistoryList = [];
                        this.jobItemHistortList = [];
                        this.paymentInformationList = [];

                        this.paymentData.totalAmount = 0.0;
                    },
                    getClientOverPayment: function (client) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.getClientOverPayment(client)
                                .success(function (data) {
                                    if (parseInt(data) > 0) {
                                        that.invoiceData.overAmount = parseFloat(data);
                                        defer.resolve();
                                    } else {
                                        that.invoiceData.outStandingAmount = parseFloat(-1 * data);
                                        defer.resolve();
                                    }
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    loadInvoiceData: function (invoiceNumber) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.loadInvoiceData(invoiceNumber)
                                .success(function (data) {
                                    that.invoicePaymentData = invoiceFactory.newInvoicePayment();
                                    angular.extend(that.invoicePaymentData, data);
                                    that.invoiceData = that.invoicePaymentData.invoice;
                                    that.paymentData = that.invoicePaymentData.payment;
                                    that.paymentInformationList = that.invoicePaymentData.paymentInformationsList;
                                    
                                    console.log(that.invoicePaymentData);
                                    that.getPaymentDetails();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemHistortList = [];
                                    angular.extend(that.jobItemHistortList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemHistortList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getInvoiceByJobCard: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        //job card select empty jobItemHistortList
                        this.jobItemHistortList = [];
                        invoiceService.getInvoiceByJobCard(jobCard)
                                .success(function (data) {
                                    that.invoiceHistoryList = [];
                                    angular.extend(that.invoiceHistoryList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.invoiceHistoryList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    saveInvoice: function () {
                        var that = this;
                        var defer = $q.defer();
                        this.invoicePaymentData.invoice = this.invoiceData;
                        this.invoicePaymentData.payment = this.paymentData;
                        this.invoicePaymentData.paymentInformationsList = this.paymentInformationList;

                        invoiceService.saveInvoice(JSON.stringify(this.invoicePaymentData))
                                .success(function (data) {
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getInvoiceData: function (jobCard) {
                        this.invoiceData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                        this.invoiceData.jobCard = jobCard;

                        if (this.invoiceData.discountAmount || this.invoiceData.discountRate) {
                            //discount amount create
                            this.invoiceData.discountAmount = parseFloat(this.invoiceData.amount)
                                    * parseFloat(this.invoiceData.discountRate / 100);
                            this.invoiceData.netAmount = parseFloat(this.invoiceData.amount)
                                    - parseFloat(this.invoiceData.discountAmount);

                        } else {
                            this.invoiceData.discountRate = 0;
                            this.invoiceData.discountAmount = 0.0;
                            this.invoiceData.netAmount = this.invoiceData.amount;
                        }
                    },
                    getJobItemHistoryTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemHistortList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
                    selectJobCardVehicle: function (jobCard) {
                        this.clientData = this.client(parseInt(jobCard.client));
                        this.vehicleData = this.vehicle(parseInt(jobCard.vehicle));
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
                    priceCatagoryLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.priceCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                lable = values.name;
                                return;
                            }
                        });
                        return lable;
                    },
                    vehicleTypeLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.vehicleTypeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                lable = values.make + ' - ' + values.model;
                                return;
                            }
                        });
                        return lable;
                    },
                    bankListLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.bankBranchList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                lable = values.name + ' - ' + values.bank;
                                return;
                            }
                        });
                        return lable;
                    },
                    getPaymentDetails: function () {
                        this.paymentData.cashAmount = parseFloat(this.getTotalPaymentTypeWise('CASH'));
                        this.paymentData.chequeAmount = parseFloat(this.getTotalPaymentTypeWise('CHEQUE'));
                        this.paymentData.cardAmount = parseFloat(this.getTotalPaymentTypeWise('CARD'));
                        this.paymentData.overAmount = parseFloat(this.getTotalPaymentTypeWise('OVER_PAYMENT'));

                        this.paymentData.totalAmount =
                                parseFloat(this.paymentData.cashAmount)
                                + parseFloat(this.paymentData.cardAmount)
                                + parseFloat(this.paymentData.chequeAmount)
                                + parseFloat(this.paymentData.overAmount);

                        this.paymentData.balance =
                                parseFloat(this.invoiceData.netAmount)
                                - parseFloat(this.paymentData.totalAmount);

                        if (parseFloat(this.paymentData.balance) < 0) {
                            this.invoiceData.overPayment = parseFloat(-1 * this.paymentData.balance);
                            this.paymentData.balance = 0.0;
                        } else {
                            this.invoiceData.overPayment = 0.0;
                        }
                    },
                    //insert cash payment
                    getInsertCashPayment: function (amount, type) {
                        this.paymentInformation.amount = parseFloat(amount);
                        this.paymentInformation.type = type;
                        this.paymentInformationList.push(this.paymentInformation);
                        this.paymentInformation = {};
                    },
                    //insert card or cheque payment
                    getInsertCardAndChequePayment: function (paymentInformation, type) {
                        paymentInformation.type = type;
                        this.paymentInformationList.push(paymentInformation);
                        this.paymentInformation = {};
                    },
                    //insert client over payment settle
                    insertClientOverPayment: function (amount, type) {
                        this.paymentInformation = invoiceFactory.paymentInformation();
                        this.paymentInformation.type = type;
                        this.paymentInformation.amount = amount;
                        this.paymentInformationList.push(this.paymentInformation);
                        this.paymentInformation = {};
                    },
                    //delete card payment and cheque payment
                    getCardAndChequePaymentDelete: function ($index) {
                        this.paymentInformationList.splice($index, 1);
                        this.getPaymentDetails();
                    },
                    //cash payment delete
                    getCashPaymentDelete: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === 'CASH') {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                            }
                        });
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
                    }

                };
                return invoiceModel;
            });
}());