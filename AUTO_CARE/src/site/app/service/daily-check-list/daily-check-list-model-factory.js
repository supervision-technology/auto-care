(function () {
    angular.module("appModule")
            .factory("dailyCheckListFactory", function () {
                var factory = {};

                factory.newDailyCheckListModel = function () {
                    var data = {
                        "indexNo": null,
                        "date": null,
                        "branch": null,
                        "transaction": null,
                        "complete": null,
                        "tsubItemCheckResultList": [
//                            {
//                                "indexNo": null,
//                                "checked": null,
//                                "reason": null,
//                                "comfirmation": null,
//                                "subItem": null,
//                                "time": null,
//                                "dailyCheckList": null
//                            }
                        ]
                    };
                    return data;
                };

                factory.newSubItemCheckListResultModel = function () {
                    var data = {
                        "indexNo": null,
                        "checked": null,
                        "reason": null,
                        "comfirmation": null,
                        "subItem": null,
                        "time": null,
                        "dailyCheckList": null
                    };
                    return data;
                };

                factory.newItemModel = function () {
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
                        "priceCategory": null,
                        "branch": null
                    };
                    return data;
                };

                factory.newSubItemData = function () {
                    var data = {
                        "index_no": null,
                        "branch": null,
                        "sub_name": null,
                        "short_order": null,
                        "active": null,
                        "item": null
                    };
                    return data;
                };


                return factory;
            });
}());