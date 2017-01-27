(function () {
    angular.module("appModule")
            .factory("ItemModelFactory", function () {
                var factory = {};
                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "barcode": null,
                        "printDescription": null,
                        "unit": null,
                        "salesPrice": null,
                        "costPrice": null,
                        "type": null,
                        "branch": null,
                        "department": null,
                        "category": null,
                        "brand": null,
                        "subCategory": null
                    };
                    return data;
                };
                return factory;
            });
}());
