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
                        "amount": null,
                        "discountRate": null,
                        "discountAmount": null,
                        "status": null
                    };
                    return data;
                };

                factory.newPaymentData = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "total_amount": null,
                        "cash_amount": null,
                        "cheque_amount": null,
                        "card_amount": null
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

                return factory;
            });
}());

