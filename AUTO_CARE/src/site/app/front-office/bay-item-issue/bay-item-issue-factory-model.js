(function () {
    angular.module("appModule")
            .factory("bayItemIssueFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "quantity": null,
                        "stockRemoveQty": null,
                        "date": null,
                        "orderStatus": "PENDING",
                        "item": null,
                        "itemUnits": null,
                        "bay": null
                    };
                    return data;
                };
                return factory;
            });
}());

