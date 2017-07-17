(function () {
    angular.module("appModule")
            .factory("customerSatisfactionModel", function (customerSatisfactionService, customerSatisfactionModelFactory, $q) {
                function customerSatisfaction() {
                    this.constructor();
                }

                customerSatisfaction.prototype = {
                    data: {},
                    pendingJobCards: [],
                    constructor: function () {
                        var that = this;
                        this.data = customerSatisfactionModelFactory.customerSatisfactionData();

                        customerSatisfactionService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });
                    }
                };
                return customerSatisfaction;
            });
}());
