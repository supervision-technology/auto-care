(function () {
    angular.module("appModule")
            .factory("itemSalesFactory", function () {
                var factory = {};

                factory.tempData = function () {
                    var data = {
                        indexNo: null,
                        jobCard: null,
                        item: null,
                        itemName: null,
                        itemUnit: null,
                        itemType: null,
                        quantity: null,
                        stockRemoveQty: null,
                        price: null,
                        value: null,
                        orderStatus: null,
                        jobStatus: null,
                        isChange: null
                    };
                    return data;
                };

                factory.customerData = function () {
                    var data = {
                        name: null,
                        mobile: null
                    };
                    return data;
                };

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

                factory.payment = function () {
                    var data = {
                        indexNo: "",
                        number: 0,
                        totalAmount: 0.00,
                        cashAmount: 0.00,
                        chequeAmount: 0.00,
                        cardAmount: 0.00,
                        balanceAmount: 0.00,
                        respEmployee: null,
                        overPaymentAmount: 0.00
                    };
                    return data;
                };

                factory.information = function () {
                    var data = {
                        clientMobile: null,
                        vehicles: null,
                        vehicle: null,
                        pendingVehicles: null,
                        balanceAmount: 0.00,
                        overPayment: 0.00,
                        cash: 0.00,
                        invoiceTotalPayment: 0.00
                    };
                    return data;
                };

                factory.paymentInformation = function () {
                    var data = {
                        "indexNo": null,
                        "payment": null,
                        "number": null,
                        "chequeDate": null,
                        "type": null,
                        "amount": 0.0,
                        "formName": null,
                        "bank": null,
                        "bankBranch": null,
                        "cardType": null
                    };
                    return data;
                };
               
                factory.invoiceData = function () {
                    var data = {
                        "indexNo": null,
                        "jobCard": null,
                        "date": null,
                        "number": null,
                        "amount": 0.00,
                        "discountRate": 0.00,
                        "discountAmount": 0.00,
                        "netAmount": 0.00,
                        "branch": null,
                        "status": "ITEMSALE_FORM"
                    };
                    return data;
                };

                factory.saveData = function () {
                    var data = {
                        "jobItem": [],
                        "customerLedger": {},
                        "payment": {},
                        "invoice" : {},
                        "paymentInformationList": []
                    };
                    return data;
                };

                return factory;
            });
}());

