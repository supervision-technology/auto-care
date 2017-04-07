(function () {
    angular.module("appModule")
            .factory("paymentMethodModel", function (itemModificationService, itemModificationFactory, $q) {
                function paymentMethodModel() {
                    this.constructor();
                }

                paymentMethodModel.prototype = {
                    
                    data: {},
                    //master data lists
                    items: [],
                    vehicles: [],
                    itemUnits: [],

                    packageItemList: [],
                    //select package items list
                    itemUnitList: [],
                    //pending job card list
                    pendingJobCards: [],
                    //select job card items
                    jobItemList: [],
                    //job card select filter items
                    filterItems: [],

                    constructor: function () {
                        var that = this;
                        this.data = itemModificationFactory.newData();

                        itemModificationService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = data;
                                });

                        itemModificationService.loadItems()
                                .success(function (data) {
                                    that.items = data;
                                });
                        itemModificationService.loadVehicles()
                                .success(function (data) {
                                    that.vehicles = data;
                                });

                        itemModificationService.loadItemUnits()
                                .success(function (data) {
                                    that.itemUnits = data;
                                });
                    }
                };
                return paymentMethodModel;
            });
}());