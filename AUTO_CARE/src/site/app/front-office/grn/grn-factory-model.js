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
                        nbt: null,
                        nbtValue: null,
                        vat: null,
                        vatValue: null,
                        grandAmount: null,
                        payAmount: null,
                        balanceAmount: null,
                        returnValue: null,
                        status: "PENDING",
                        type: "grn receive",
                        isNbt: null,
                        isVat: null,
                        grnItemList: []
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        indexNo:null,
                        grn:null,
                        purchaseOrderItem:null,
                        price:null,
                        qty:null,
                        value:null,
                        discount:null,
                        discountValue:null,
                        netValue:null,
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