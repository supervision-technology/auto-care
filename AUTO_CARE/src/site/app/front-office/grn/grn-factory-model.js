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
                        amount: null,
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
                        netValue:null
                    };
                    return tempData;
                };

                return factory;
            });
}());