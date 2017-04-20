(function () {
    angular.module("appModule")
            .factory("invoiceFactory", function () {
                var factory = {};

                factory.newInvoiceData = function () {
                    var data = {
                        "indexNo": null,
                        "date": null,
                        "jobCard": null,
                        "number": null,
                        "amount": 0.0,
                        "netAmount": 0.0,
                        "discountRate": 0,
                        "discountAmount": 0,
                        "status": null,
                        "overPayment": null,
                        "outStandingAmount": null
                    };
                    return data;
                };

                factory.newInvoicePayment = function () {
                    var data = {
                        "invoice": {},
                        "payment": {},
                        "paymentInformationsList": []
                    };
                    return data;
                };

                factory.newPaymentData = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "total_amount": 0.0,
                        "cash_amount": 0.0,
                        "cheque_amount": 0.0,
                        "card_amount": 0.0
                    };
                    return data;
                };

                factory.newClientData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "address1": null,
                        "address2": null,
                        "address3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "nic": null
                    };
                    return data;
                };

                factory.newVehicleData = function () {
                    var data = {
                        "indexNo": null,
                        "vehicleNo": null,
                        "year": null,
                        "engineNo": null,
                        "chasisNo": null,
                        "insuranceExpiryDate": null,
                        "revenueExpiryDate": null,
                        "lastMilage": null,
                        "nextMilage": null,
                        "colour": null,
                        "client": null,
                        "vehicleType": null,
                        "priceCategory": null,
                        "type": null
                    };
                    return data;
                };

                factory.paymentData = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "totalAmount": 0.0,
                        "cashAmount": 0.0,
                        "chequeAmount": 0.0,
                        "cardAmount": 0.0
                    };
                    return data;
                };


                factory.customerLegerData = function () {
                    var data = {
                        "indexNo": null,
                        "date": null,
                        "debitAmount": 0.0,
                        "creditAmount": 0.0,
                        "chequeAmount": 0.0,
                        "type": null,
                        "invoice": null,
                        "payment": null
                    };
                    return data;
                };

                factory.paymentInformation = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "chequeDate": null,
                        "amount": null,
                        "type": null,
                        "formName": null,
                        "payment": null,
                        "bank": null,
                        "cardType": null
                    };
                    return data;
                };

                return factory;
            });
}());

