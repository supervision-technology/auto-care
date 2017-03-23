(function () {
    angular.module("appModule")
            .factory("itemFactory", function () {
                var factory = {};
                factory.newItemData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "barcode": null,
                        "printDescription": null,
                        "unit": null,
                        "costPrice": null,
                        "type": null,
                        "department": null,
                        "brand": null,
                        "category": null,
                        "sub_category": null,
                        "salePriceNormal": null,
                        "salePriceRegister": null,
                        "branch": null
                    };
                    return data;
                };
                factory.newItemUnitData = function () {
                    var data = {
                        "indexNo": null,
                        "item": null,
                        "name": null,
                        "qty": null,
                        "priceCategory": null,
                        "salePriceNormal": null,
                        "salePriceRegister": null,
                        "costPrice": null
                    };
                    return data;
                };

                factory.newPackageData = function () {
                    var data = {
                        "indexNo": null,
                        "packages": null,
                        "item": null
                    };
                    return data;
                };
                return factory;
            });
}());

