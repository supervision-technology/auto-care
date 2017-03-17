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
                        "salePriceNormalCus": null,
                        "salePriceRegisterCus": null,
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
                        "salePriceNormalCus": null,
                        "salePriceRegisterCus": null,
                        "costPrice": null
                    };
                    return data;
                };
                return factory;
            });
}());

