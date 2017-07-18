(function () {
    angular.module("appModule")
            .factory("customerSatisfactionModelFactory", function () {
                var factory = {};

                factory.customerSatisfactionData = function () {
                    var customerSatisfactionData = {
                        "indexNo": null,
                        "rate": 0,
                        "rateReason": null
                        
                    };
                    return customerSatisfactionData;
                };

                return factory;
            });
}());


