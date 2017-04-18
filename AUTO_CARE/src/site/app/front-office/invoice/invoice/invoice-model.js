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

                    vehicleList: [],
                    clientList: [],
                    vehicleTypeList: [],
                    priceCategoryList: [],
                    bankBranchList: [],

                    //master data lists
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
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();

                        this.paymentData = invoiceFactory.paymentData();
                        this.customerLegerData = invoiceFactory.customerLegerData();
                        this.paymentInformation = invoiceFactory.paymentInformation();

                        this.invoiceHistoryList = [];
                        this.jobItemHistortList = [];
                        this.paymentInformationList = [];
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
                            this.invoiceData.discountAmount = parseFloat(this.invoiceData.amount * this.invoiceData.discountRate / 100);
                            this.invoiceData.netAmount = parseFloat(this.invoiceData.amount - this.invoiceData.discountAmount);

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
                        this.paymentData.cashAmount = this.getTotalPaymentTypeWise('CASH');
                        this.paymentData.chequeAmount = this.getTotalPaymentTypeWise('CHEQUE');
                        this.paymentData.cardAmount = this.getTotalPaymentTypeWise('CARD');
                        this.paymentData.totalAmount = parseFloat(this.paymentData.cashAmount + this.paymentData.chequeAmount + this.paymentData.cardAmount);
                        this.paymentData.balance = this.paymentData.totalAmount - this.invoiceData.netAmount;
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
                    //delete card payment and cheque payment
                    paymentDelete: function ($index) {
                        this.paymentInformationList.splice($index, 1);
                        this.getPaymentDetails();
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