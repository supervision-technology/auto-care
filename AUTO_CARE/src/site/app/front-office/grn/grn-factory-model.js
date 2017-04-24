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
                        "refNumber": null,
                        "branch": null
                    };
                    return data;
                };

                return factory;
            });
}());