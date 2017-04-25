(function () {
    angular.module("appModule")
            .factory("GrnModel", function (GrnService, grnModelFactory, $q, optionPane) {
                function directGrnModel() {
                    this.constructor();
                }

                directGrnModel.prototype = {

                    //model factory data
                    data: {},
                    tempData: {},
                    //master data lists
                    items: [],
                    suppliers: [],

                    //opreation data
                    categoryIndex: null,
                    brandIndex: null,

                    constructor: function () {
//                        var that = this;
//                        that.data = directGrnModelFactory.newData();
//                        that.tempData = directGrnModelFactory.tempData();
//
//                        directGrnService.loadItems()
//                                .success(function (data) {
//                                    that.items = data;
//
//                                });
//
//                        directGrnService.loadSupplier()
//                                .success(function (data) {
//                                    that.suppliers = data;
//                                });

                    }
                };
                return directGrnModel;
            });
}());

