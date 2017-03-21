(function () {
    var factory = function (vehicleEntranceService, vehicleEntranceFactory, $q, $filter) {
        function vehicleEntranceModel() {
            this.constructor();
        }

        vehicleEntranceModel.prototype = {
            //data model
            vehicleData: {},

            //uib-typeHead
            vehicleList: [],

            constructor: function () {
                var that = this;
                that.vehicleData = vehicleEntranceFactory.newVehicleData();
                vehicleEntranceService.loadVehicleByVehicleNo()
                        .success(function (data) {
                                console.log(data);
                                    that.vehicleList = data;
                    
                        });


            },

            vehicleLabel: function (indexNo) {
                var vehicle = "";
                angular.forEach(this.vehicleList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        vehicle = value.indexNo + "-" + value.name;
                        return;
                    }
                });
                return vehicle;
            }

        };
        return vehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("vehicleEntranceModel", factory);
}());