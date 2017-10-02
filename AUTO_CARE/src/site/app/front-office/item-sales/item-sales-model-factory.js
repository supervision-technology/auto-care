(function () {
    angular.module("appModule")
            .factory("itemSalesFactory", function () {
                var factory = {};

                factory.customerLedger = function () {
                    var data = {
                        indexNo: null,
                        invoice: null,
                        payment: null,
                        date: null,
                        debitAmount: 0.00,
                        creditAmount: 0.00,
                        type: null,
                        client: null,
                        refNumber: null,
                        formName: null
                    };
                    return data;
                };
                
                return factory;
            });
}());

