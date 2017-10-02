(function () {
    angular.module("appModule")
            .factory("itemSalesModel", function (itemSalesService, itemSalesFactory, $filter, $q, Notification) {
                function paymentVoucherModel() {
                    this.constructor();
                }
                paymentVoucherModel.prototype = {
                    //master list
                    vehicleList: [],
                    clientList: [],

                    customerLedger: {},

                    constructor: function () {
                        var that = this;
                        this.customerLedger = itemSalesFactory.customerLedger();

                        itemSalesService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                    }




                };
                return paymentVoucherModel;
            });
}());
