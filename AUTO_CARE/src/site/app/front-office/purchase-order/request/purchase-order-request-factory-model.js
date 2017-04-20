(function () {
    angular.module("appModule")
            .factory("PurchaseOrderRequestModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "supplier": null,
                        "number": null,
                        "date": null,
                        "deliverDate": null,
                        "status": null,
                        "isView": null,
                        "formName": null,
                        "itemValue": null,
                        "nbt": null,
                        "nbtValue": null,
                        "vat": null,
                        "vatValue": null,
                        "grandTotal": null,
                        "returnStatus": null,
                        "purchaseOrderItemList": []
                        
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "purchaseOrder": null,
                        "item": null,
                        "price": null,
                        "qty": null,
                        "value": null,
                        "discount": null,
                        "discountValue": null,
                        "netValue": null,
                        "stockQty": null,
                        "orderQty": null,
                        "recieveQty": null,
                        "balanceQty": null,
                        
                    };
                    return tempData;
                };
                factory.summaryData = function () {
                    var summaryData = {
                        "qty": null,
                        "value": null,
                        "discount": null
                        
                    };
                    return summaryData;
                };

                return factory;
            });
}());