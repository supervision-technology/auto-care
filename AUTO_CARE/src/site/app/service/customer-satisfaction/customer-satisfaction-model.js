(function () {
    angular.module("appModule")
            .factory("customerSatisfactionModel", function (customerSatisfactionService, customerSatisfactionModelFactory, $q) {
                function customerSatisfaction() {
                    this.constructor();
                }

                customerSatisfaction.prototype = {
                    data: {},
                    finishedJobCards: [],
                    selectedJobCardIndex: 0,
                    vehicles: [],
                    constructor: function () {
                        var that = this;
                        this.reset();
                        this.finishedJobCard();

                        customerSatisfactionService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });
                    },
                    finishedJobCard: function () {
                        var that = this;
                        customerSatisfactionService.finishedJobCards()
                                .success(function (data) {
                                    that.finishedJobCards = [];
                                    angular.forEach(data, function (job) {
                                        job.vehicleNo = that.vehicleData(job.vehicle).vehicleNo;
                                        that.finishedJobCards.push(job);
                                    });
                                });
                    },
                    vehicleData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicles, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    selectedJobCard: function (jobCardIndexNo) {
                        this.reset();
                        this.data.indexNo = jobCardIndexNo;
                    },
                    save: function () {
                        var defer = $q.defer();
                        var that = this;
                        customerSatisfactionService.save(that.data)
                                .success(function (data) {
                                    that.reset();
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;

                    },
                    reset:function (){
                        this.data = customerSatisfactionModelFactory.customerSatisfactionData();
                    }
                };
                return customerSatisfaction;
            });
}());
