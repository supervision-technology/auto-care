(function () {
    angular.module("appModule")
            .factory("paymentVoucherFactory", function () {
                var factory = {};

                factory.customerLedger = function () {
                    var data = {
                        indexNo: null,
                        invoice: null,
                        payment: null,
                        date: null,
                        debitAmount: 0.00,
                        creditAmount: 0.00,
                        type: null,
                        client: null,
                        refNumber: null,
                        formName: null
                    };
                    return data;
                };
                factory.payment = function () {
                    var data = {
                        indexNo: "",
                        number: 0,
                        totalAmount: 0.00,
                        cashAmount: 0.00,
                        chequeAmount: 0.00,
                        cardAmount: 0.00,
                        balanceAmount: 0.00,
                        respEmployee: null
                    };
                    return data;
                };
                factory.information = function () {
                    var data = {
                        clientMobile: null,
                            vehicles: null,
                            vehicle: null,
                            pendingVehicles: null,
                            balanceAmount: 0.00,
                            overPayment: 0.00,
                            cash: 0.00,
                            invoiceTotalPayment: 0.00
                    };
                    return data;
                };

                factory.paymentInformation = function () {
                    var data = {
                        "indexNo": null,
                        "payment": null,
                        "number": null,
                        "chequeDate": null,
                        "type": null,
                        "amount": 0.0,
                        "fromName":"PAYMENT VOUCHER",
                        "bank": null,
                        "bankBranch": null,
                        "cardType": null
                    };
                    return data;
                };
                factory.saveData = function () {
                    var data = {
                       "customerLedger":{},
                       "payment":{},
                       "paymentInformationList":[]
                    };
                    return data;
                };

                

                return factory;
            });
}());

