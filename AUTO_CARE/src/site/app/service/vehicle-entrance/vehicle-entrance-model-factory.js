(function () {
    angular.module("appModule")
            .factory("vehicleEntranceFactory", function (){
            var factory = {};
                    factory.newVehicle = function (){
                    var data = {
                            "indexNo": null,
                            "vehicleNo": null,
                            "year": null,
                            "engineNo": null,
                            "chasisNo": null,
                            "insuranceExpiryDate": null,
                            "revenueExpiryDate": null,
                            "lastMilage": null,
                            "nextMilage": null,
                            "colour": null,
                            "client": null,
                            "vehicleType": null,
                            "priceCategory": null 
                    };
                            return data;
                    };
                    return factory;
            }
            );
}());