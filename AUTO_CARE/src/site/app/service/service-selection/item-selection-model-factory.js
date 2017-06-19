(function () {
    angular.module("appModule")
            .factory("ItemSelectionModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "itemUnit": null,
                        "item": null,
                        "itemType": null,
                        "quantity": null,
                        "price": null,
                        "value": null,
                        "orderStatus": "PENDING",
                        "jobStatus": "PENDING",
                        "jobCard": null,
                        "stockRemoveQty": null
                    };
                    return data;
                };

                factory.newCustomerReservedItemData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "qty": null,
                        "jobCard": null
                    };
                    return data;
                };

                factory.newJobCardData = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "branch": null,
                        "date": null,
                        "transaction": null,
                        "priceCategory": null,
                        "inTime": null,
                        "outTime": null,
                        "inMileage": null,
                        "nextMileage": null,
                        "status": null,
                        "bay": null,
                        "client": null,
                        "vehicle": null,
                        "serviceChagers": false,
                        "vehicleImages": false,
                        "finalCheck": false,
                        "attenctions": false,
                        "invoice": false
                    };
                    return data;
                };

                return factory;
            });
}());

