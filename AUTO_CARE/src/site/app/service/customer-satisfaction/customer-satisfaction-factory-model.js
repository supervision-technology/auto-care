(function () {
    angular.module("appModule")
            .factory("customerSatisfactionModelFactory", function () {
                var factory = {};

                factory.customerSatisfactionData = function () {
                    var customerSatisfactionData = {
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
                        "invoice": false,
                        "defaultFinalCheck": false,
                        "rate": 50,
                        "rateReason": null
                        
                    };
                    return customerSatisfactionData;
                };

                return factory;
            });
}());


