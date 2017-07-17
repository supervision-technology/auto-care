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
                        
                    };
                    return customerSatisfactionData;
                };

                return factory;
            });
}());


