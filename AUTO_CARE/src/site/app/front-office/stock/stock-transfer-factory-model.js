(function () {
    angular.module("appModule")
            .factory("StockTransferModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        indexNo: null,
                        outNumber: null,
                        inNumber: null,
                        outDate: null,
                        inDate: null,
                        refNumber: null,
                        remarks: null,
                        fromBranch: null,
                        toBranch: null,
                        fromStore: null,
                        toStore: null,
                        type: null,
                        status: null,
                        totalQty: null,
                        transferItemList: [
                            
                        ]
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        indexNo: null,
                        item: null,
                        cost: null,
                        qty: null,
                        totalQty: null,
                        orderedQty: null,
                        netQty: null,
                    };
                    return tempData;
                };

                return factory;
            });
}());