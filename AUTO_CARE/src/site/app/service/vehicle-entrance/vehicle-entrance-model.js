(function (){
    var factory = function (vehicleEntranceService, vehicleEntranceFactory, $q, $filter){
        function vehicleEntranceModel(){
            this.constructor();
        }
        
        vehicleEntranceModel.prototype = {
            
            constructor: function () {
                 var that = this;
            }
            
        };
        return vehicleEntranceModel;
    };
    angular.module("appModule")
            .factory("vehicleEntranceModel", factory);
}());