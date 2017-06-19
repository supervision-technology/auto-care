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
                        "unit": 0,
                        "costPrice": 0,
                        "type": null,
                        "department": null,
                        "brand": null,
                        "category": null,
                        "sub_category": null,
                        "salePriceNormal": 0,
                        "salePriceRegister": 0,
                        "priceCategory": null,
                        "branch": null,
                        "reOrderMax": null,
                        "reOrderMin": null,
                        "discount": null,
                        "supplierPrice": null
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
                        "salePriceNormal": 0,
                        "salePriceRegister": 0,
                        "costPrice": 0
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
                factory.newConsumableData = function () {
                    var data = {
                        "indexNo": null,
                        "service": null,
                        "consumable": null,
                        "qty": null
                    };
                    return data;
                };
                factory.newItemCheckData = function () {
                    var itemCheckData = {
                        "indexNo": null,
                        "item": null,
                        "name": null
                    };
                    return itemCheckData;
                };
                return factory;
            });
}());

