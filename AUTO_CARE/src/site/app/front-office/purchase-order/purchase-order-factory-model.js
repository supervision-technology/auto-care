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
                        "approvedDate": null,
                        "status": null,
                        "isView": null,
                        "formName": null,
                        "itemValue": null,
                        "nbt": 0,
                        "nbtValue": 0,
                        "vat": 0,
                        "vatValue": 0,
                        "grandTotal": 0,
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
                        "price": 0,
                        "qty": 0,
                        "value": 0,
                        "discount": 0,
                        "discountValue": 0,
                        "netValue": 0,
                        "stockQty": 0,
                        "orderQty": 0,
                        "recieveQty": 0,
                        "balanceQty": 0,
                        "status": "PENDING"
                        
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