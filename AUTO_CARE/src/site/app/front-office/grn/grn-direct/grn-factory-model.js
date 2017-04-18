(function () {
    angular.module("appModule")
            .factory("grnModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "supplier": null,
                        "number": 0,
                        "date": null,
                        "amount": null,
                        "discount": 0.00,
                        "netAmount": null,
                        "refNumber": null,
                        "branch": null,
                        "grnItemList":[]
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        "barcode": null,
                        "item": null,
                        "unitPrice": 0,
                        "qty": 0,
                        "value": 0,
                        "discount": 0,
                        "netValue": 0,
                        "grn": null,
                    };
                    return tempData;
                };
                factory.supplier = function () {
                    var supplier = {
                        "indexNo": null,
                        "supplier": null,
                        "number": 0,
                        "date": null
                    };
                    return supplier;
                };

                return factory;
            });
}());