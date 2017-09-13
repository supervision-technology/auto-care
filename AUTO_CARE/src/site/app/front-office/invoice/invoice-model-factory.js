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
                        "totalAmount": 0.0,
                        "cashAmount": 0.0,
                        "chequeAmount": 0.0,
                        "cardAmount": 0.0,
                        "respEmployee": null,
                        "overPaymentAmount": 0.00
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
                        "bankBranch": null,
                        "cardType": null
                    };
                    return data;
                };
                factory.newEmployeeData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "addressLine1": null,
                        "addressLine2": null,
                        "addressLine3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "rol": null,
                        "image": null
                    };
                    return data;
                };

                return factory;
            });
}());

