(function () {
    angular.module("appModule")
            .factory("paymentVoucherModel", function (paymentVoucherService, paymentVoucherFactory, $filter, $q,Notification) {
                function paymentVoucherModel() {
                    this.constructor();
                }
                paymentVoucherModel.prototype = {
                    //master list
                    vehicleList: [],
                    clientList: [],

//                    employeeList: [],
//                    pendingJobCards: [],
//                    bankList: [],
//                    branchList: [],
//                    cardTypeList: [],
//                    branchSearchList: [],
                    //trasactons list
                    customerLedger: {},
                    payment: {},
                    information: {},
                    paymentInformation: {},
                    saveData: {},

                    paymentInformationList: [],
                    branchSearchList: [],
                    cardTypeList: [],
                    balanceInvoiceList: [],

//                    invoiceData: {},
//                    employeeData: {},
//                    paymentData: {},
//                    paymentInfomationData: {},
//                    paymentInformationList: [],
//                    invoicePaymentData: {},
                    //master data lists

                    constructor: function () {
                        var that = this;
                        this.customerLedger = paymentVoucherFactory.customerLedger();
                        this.payment = paymentVoucherFactory.payment();
                        this.information = paymentVoucherFactory.information();
                        this.paymentInformation = paymentVoucherFactory.paymentInformation();
                        this.saveData = paymentVoucherFactory.saveData();

//                        this.employeeData = paymentVoucherFactory.newEmployeeData();
//                        this.invoiceData = paymentVoucherFactory.newInvoiceData();
//                        this.paymentData = paymentVoucherFactory.newPaymentData();
//                        this.paymentInfomationData = paymentVoucherFactory.newPaymentInformation();
//                        //payment invoice model (mix model)
//                        this.invoicePaymentData = paymentVoucherFactory.newInvoicePayment();
//                        this.relordPendingJobCard();


//                        new
                        paymentVoucherService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });
                        paymentVoucherService.loadVehicle()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });
                        paymentVoucherService.loadBank()
                                .success(function (data) {
                                    that.bankList = data;
                                });

                        paymentVoucherService.loadBranch()
                                .success(function (data) {
                                    that.branchList = data;
                                });



//                        paymentVoucherService.loadEmployee()
//                                .success(function (data) {
//                                    that.employeeList = data;
//                                });
//
//
//
                        paymentVoucherService.loadCardType()
                                .success(function (data) {
                                    that.cardTypeList = data;
                                });
                    },

                    selectClient: function (clientIndex) {
                        var that = this;
                        var client = this.client(clientIndex);
                        that.information.clientMobile = client.mobile;
                        that.information.vehicle = '';
                        this.clientVehicles(clientIndex);
                        this.clientBalance(clientIndex);
                        this.clientOverPayment(clientIndex);
                        this.getBalanceInvoiceCount(clientIndex);

                    },
                    selectClientFromBalance: function (clientIndex) {
                        var that = this;
                        this.clientBalance(clientIndex);
                        this.clientOverPayment(clientIndex);
                        that.information.vehicle = '';
                        this.getBalanceInvoiceList(clientIndex);

                    },
                    selectVehicle: function (vehIndex) {
                        var vehicle = this.vehicle(vehIndex);
                        var client = this.client(vehicle.client);
                        this.customerLedger.client = client.indexNo;
                        this.information.clientMobile = client.mobile;
                        this.clientVehicles(client.indexNo);
                        this.clientBalance(client.indexNo);
                        this.clientOverPayment(client.indexNo);
                        this.getBalanceInvoiceCount(client.indexNo);
                        this.getBalanceInvoiceList(client.indexNo);

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

                    clear: function () {
                        this.customerLedger = paymentVoucherFactory.customerLedger();
                        this.payment = paymentVoucherFactory.payment();
                        this.information = paymentVoucherFactory.information();
                        this.paymentInformation = paymentVoucherFactory.paymentInformation();
                        this.saveData = paymentVoucherFactory.saveData();

                        this.paymentInformationList = [];
                        this.branchSearchList = [];
                        this.balanceInvoiceList = [];
                    },

                    clientLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.clientList, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                lable = value.indexNo + ' - ' + value.name;
                                return;
                            }
                        });
                        return lable;
                    },
                    vehicleLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.vehicleList, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                lable = value.indexNo + ' - ' + value.vehicleNo;
                                return;
                            }
                        });
                        return lable;
                    },

                    clientVehicles: function (indexNo) {
                        var that = this;
                        paymentVoucherService.getClientVehicles(indexNo)
                                .success(function (data) {
                                    that.information.vehicles = data.vehicleNo;
                                });

                    }
                    , clientBalance: function (indexNo) {
                        var that = this;
                        paymentVoucherService.getClientBalance(indexNo)
                                .success(function (data) {
                                    that.information.balanceAmount = parseFloat(data);
                                });

                    }
                    , getInvoicePayAmount: function () {
                        var that = this;
                        var payAmount = 0.00;
                        angular.forEach(that.balanceInvoiceList, function (invoice) {
                            payAmount += invoice.pay;
                            that.information.invoiceTotalPayment = parseFloat(payAmount);

                        });
                        console.log(payAmount);
                    }
                    , clientOverPayment: function (indexNo) {
                        var that = this;
                        paymentVoucherService.getClientOverPayment(indexNo)
                                .success(function (data) {
                                    that.information.overPayment = parseFloat(data);
                                });

                    }
                    , setBalanceAmountToText: function (indexNo) {
                        var that = this;
                        angular.forEach(that.balanceInvoiceList, function (value) {
                            if (value.invoice === parseInt(indexNo)) {
                                value.pay = value.balance;
                            }
                        });
                    }
                    , checkBalanceAmount: function (indexNo) {
                        var that = this;
                        angular.forEach(that.balanceInvoiceList, function (value) {
                            if (value.invoice === parseInt(indexNo)) {
                                console.log(value.balance);
                                console.log(value.pay);
                                if (value.balance<value.pay) {
                                    value.pay = value.balance;
                                    Notification.error(value.balance+' is maximum pay amount for this invoice ! ');
                                }
                            }
                        });
                    }
                    , getBalanceInvoiceList: function (indexNo) {
                        var that = this;
                        paymentVoucherService.getBalanceInvoiceList(indexNo)
                                .success(function (data) {
                                    var invoice = {};
                                    that.balanceInvoiceList = [];
                                    angular.forEach(data, function (object) {
                                        invoice = {};
                                        invoice.invoice = object[0];
                                        invoice.date = object[1];
                                        invoice.amount = object[2];
                                        invoice.paid = object[3];
                                        invoice.balance = object[4];
                                        invoice.pay = 0.00;
                                        that.balanceInvoiceList.push(invoice);

                                    });
                                });

                    }
                    , getBalanceInvoiceCount: function (indexNo) {
                        var that = this;
                        paymentVoucherService.getBalanceInvoiceCount(indexNo)
                                .success(function (data) {
                                    that.information.pendingVehicles = parseInt(data);
                                });

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
                    getCashPaymentDelete: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === 'CASH') {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                            }
                        });
                    }
                    , getPaymentDetails: function () {

//                        this.payment.cashAmount = parseFloat(this.getTotalPaymentTypeWise('CASH'));
                        this.payment.chequeAmount = parseFloat(this.getTotalPaymentTypeWise('CHEQUE'));
                        this.payment.cardAmount = parseFloat(this.getTotalPaymentTypeWise('CARD'));
                        this.payment.overPaymentSettlementAmount = parseFloat(this.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLEMENT'));
                        console.log(this.payment.overPaymentSettlementAmount);
                        this.payment.totalAmount =
                                parseFloat(this.payment.cashAmount)
                                + parseFloat(this.payment.cardAmount)
                                + parseFloat(this.payment.chequeAmount)
                                + parseFloat(this.payment.overPaymentSettlementAmount);
                        this.payment.balanceAmount = parseFloat(this.information.invoiceTotalPayment) - this.payment.totalAmount;
                        if (this.payment.balanceAmount < 0.00) {
                            this.payment.balanceAmount = 0.00;
                        }
                        this.payment.overPayment = parseFloat(this.payment.totalAmount) - parseFloat(this.information.invoiceTotalPayment);
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
                    //insert card or cheque payment
                    getInsertCardAndChequePayment: function (paymentInformation, type) {
                        paymentInformation.type = type;
                        this.paymentInformationList.push(paymentInformation);
                        this.paymentInformation = {};
                        this.getPaymentDetails();

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
                        paymentVoucherService.loadBranchByBank(bank)
                                .success(function (data) {
                                    that.branchSearchList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
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
                    //delete card payment and cheque payment
                    getCardAndChequePaymentDelete: function (number) {
                        var that = this;
                        var id = -1;
                        for (var i = 0; i < that.paymentInformationList.length; i++) {
                            if (that.paymentInformationList[i].number === number) {
                                id = i;
                            }
                        }
                        this.paymentInformationList.splice(id, 1);
                        this.getPaymentDetails();

                    },
                    //                    insert client over payment settle
                    insertClientOverPaymentSettlment: function (amount, type) {
                        this.paymentInformation = paymentVoucherFactory.paymentInformation();
                        this.paymentInformation.type = type;
                        this.paymentInformation.amount = amount;
                        this.paymentInformationList.push(this.paymentInformation);
                        this.paymentInformation = {};
                        this.getPaymentDetails();

                    },
//                    deleteOverPayment: function () {
//                        var that = this;
//                        angular.forEach(this.paymentInformationList, function (values) {
//                            if (values.type === "OVER_PAYMENT_SETTLMENT") {
//                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
//                                that.getPaymentDetails();
//                                ;
//                            }
//                        });
//                    },
                    saveAdvancePayment: function () {
                        this.saveData.customerLedger = this.customerLedger;
                        this.saveData.payment = this.payment;
                        this.saveData.paymentInformationList = this.paymentInformationList;
                        console.log(this.saveData);

                        var that = this;
                        var defer = $q.defer();

                        paymentVoucherService.savePaymentVoucher(JSON.stringify(this.saveData))
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
                    }
                    ,
                    saveBalancePayment: function () {
                        this.saveData.customerLedger = this.customerLedger;
                        this.saveData.payment = this.payment;
                        this.saveData.paymentInformationList = this.paymentInformationList;
                        this.saveData.invoice = this.balanceInvoiceList;
                        console.log(this.saveData);

                        var that = this;
                        var defer = $q.defer();

                        paymentVoucherService.saveBalancePaymentVoucher(JSON.stringify(this.saveData))
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

//                    clientVehicles: function (indexNo) {
//                        var defer = $q;
//                        paymentVoucherService.getClientVehicles(indexNo)
//                                .success(function ( data) {
//                                    console.log(data);
//                                    defer.resolve(data);
//                                })
//                                .error(function () {
//                                    console.log(data);
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                   
//                    employeeLable: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.employeeList, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values.indexNo + " - " + values.name;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    employee: function (indexNo) {
//                        var data = "";
//                        angular.forEach(this.employeeList, function (values) {
//                            if (values.indexNo === parseInt(indexNo)) {
//                                data = values;
//                                return;
//                            }
//                        });
//                        return data;
//                    },
//                    
//                    
//                    getJobItemHistory: function (jobCard) {
//                        var defer = $q.defer();
//                        var that = this;
//                        this.invoiceData.amount = 0.0;
//                        paymentVoucherService.getJobItemHistory(jobCard)
//                                .success(function (data) {
//                                    angular.forEach(data, function (values) {
//                                        that.invoiceData.amount += values.value;
//                                        that.getPaymentDetails();
//                                        return;
//                                    });
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    that.invoiceData.amount = 0.0;
//                                    defer.reject();
//                                });
//                        return  defer.promise;
//                    },
//                    getClientOverPayment: function (client) {
//                        var defer = $q.defer();
//                        var that = this;
//                        paymentVoucherService.getClientOverPayment(client)
//                                .success(function (data) {
//                                    if (data > 0) {
//                                        that.paymentData.overAmount = parseFloat(data);
//                                    } else {
//                                        that.paymentData.creditAmount = parseFloat(data * -1);
//                                    }
//                                    defer.resolve();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    loadInvoiceData: function () {
//                        var defer = $q.defer();
//                        var that = this;
//                        paymentVoucherService.loadInvoiceData(this.invoicePaymentData.invoiceData.number)
//                                .success(function (data) {
//                                    that.clear();
//                                    that.invoicePaymentData = data;
//                                    that.invoiceData = that.invoicePaymentData.invoice;
//                                    that.paymentData = that.invoicePaymentData.payment;
//                                    that.paymentInformationList = that.invoicePaymentData.paymentInformationsList;
//
//                                    that.cashPayment = parseFloat(that.getTotalPaymentTypeWise('CASH'));
//                                    that.paymentData.overSettlementAmount = parseFloat(that.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLMENT'));
//                                    that.getPaymentDetails();
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                    relordPendingJobCard: function () {
//                        var that = this;
//                        paymentVoucherService.pendingJobCards()
//                                .success(function (data) {
//                                    that.pendingJobCards = [];
//                                    angular.forEach(data, function (job) {
//                                        job.vehicleNo = that.vehicle(job.vehicle).vehicleNo;
//                                        that.pendingJobCards.push(job);
//                                    });
//                                    console.log(that.pendingJobCards);
//                                });
//                    },
//                    saveInvoice: function () {
//                        var that = this;
//                        var defer = $q.defer();
//                        this.invoiceData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
//                        this.invoicePaymentData.invoice = this.invoiceData;
//                        this.invoicePaymentData.payment = this.paymentData;
//                        this.invoicePaymentData.paymentInformationsList = this.paymentInformationList;
//                        paymentVoucherService.saveInvoice(JSON.stringify(this.invoicePaymentData))
//                                .success(function (data) {
//                                    that.relordPendingJobCard();
//                                    that.invoicePaymentData.invoice.jobCard;
//                                    defer.resolve(data);
//                                })
//                                .error(function () {
//                                    defer.reject();
//                                });
//                        return defer.promise;
//                    },
//                   
//                    
//                    //insert cash payment
//                    getInsertCashPayment: function (amount, type) {
//                        this.paymentInfomationData.amount = parseFloat(amount);
//                        this.paymentInfomationData.type = type;
//                        this.paymentInformationList.push(this.paymentInfomationData);
//                        this.paymentInfomationData = {};
//                    },
//                    
//                    //insert client over payment settle
//                    insertClientOverPaymentSettlment: function (amount, type) {
//                        this.paymentInfomationData = paymentVoucherFactory.newPaymentInformation();
//                        this.paymentInfomationData.type = type;
//                        this.paymentInfomationData.amount = amount;
//                        this.paymentInformationList.push(this.paymentInfomationData);
//                        this.paymentInfomationData = {};
//                    },
//                    deleteOverPayment: function () {
//                        var that = this;
//                        angular.forEach(this.paymentInformationList, function (values) {
//                            if (values.type === "OVER_PAYMENT_SETTLMENT") {
//                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
//                                that.getPaymentDetails();
//                                ;
//                            }
//                        });
//                    },
//                    //delete card payment and cheque payment
//                    getCardAndChequePaymentDelete: function (number) {
//                        var that = this;
//                        var id = -1;
//                        for (var i = 0; i < that.paymentInformationList.length; i++) {
//                            if (that.paymentInformationList[i].number === number) {
//                                id = i;
//                            }
//                        }
//                        this.paymentInformationList.splice(id, 1);
//                        this.getPaymentDetails();
//                    },
//                    //cash payment delete
//                    

                };
                return paymentVoucherModel;
            });
}());