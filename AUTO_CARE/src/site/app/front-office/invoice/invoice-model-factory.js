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
                        "status": null
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


                factory.newInvoicePayment = function () {
                    var data = {
                        "invoice": {},
                        "payment": {},
                        "paymentInformationsList": []
                    };
                    return data;
                };
                
                factory.newPaymentInformation = function () {
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

