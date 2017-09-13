(function () {
    angular.module("appModule")
            .factory("grnModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        indexNo: null,
                        supplier: null,
                        number: null,
                        date: null,
                        creditPeriod: 0,
                        amount: 0,
                        refNumber: null,
                        branch: null,
                        nbt: 0,
                        nbtValue: 0,
                        vat: 0,
                        vatValue: 0,
                        grandAmount: 0,
                        payAmount: 0,
                        balanceAmount: 0,
                        returnValue: 0,
                        status: "PENDING",
                        type: "grn receive",
                        isNbt: false,
                        isVat: false,
                        grnItemList: []
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        indexNo:null,
                        grn:null,
                        purchaseOrderItem:null,
                        price:0,
                        qty:0,
                        value:0,
                        discount:0,
                        discountValue:0,
                        netValue:0,
                        stockQty:0
                    };
                    return tempData;
                };
                factory.summaryData = function () {
                    var summaryData = {
                        qty:0.00,
                        value:0.00,
                        discount:0.00
                    };
                    return summaryData;
                };

                return factory;
            });
}());