(function (){
     angular.module("appModule")
             .factory("vehicleEntranceFactory", function (){
                var factory = {};
                    factory.newVehicleEntranceData = function (){
                        var data = {
                            
                        };
                        return data;
                         
                        
                    };       
                return factory;
             });
}());