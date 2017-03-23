(function () {
    angular.module("appModule")
            .factory("ServiceSelectionModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "packageItem": null,
                        "itemUnit": null,
                        "quantity": null,
                        "price": null,
                        "value": null,
                        "orderStatus": "PENDING",
                        "jobStatus": "PENDING",
                        "formCustomer": true,
                        "jobCard": null,
                        "item": null
                    };
                    return data;
                };

                return factory;
            });
}());