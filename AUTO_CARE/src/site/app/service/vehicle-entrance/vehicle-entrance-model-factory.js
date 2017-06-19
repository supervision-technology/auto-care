(function () {
    angular.module("appModule")
            .factory("vehicleEntranceFactory", function () {
                var factory = {};
                factory.newVehicleData = function () {
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
                        "priceCategory": null,
                        "type": null
                    };
                    return data;
                };
                factory.newClientData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "addressLine1": null,
                        "addressLine2": null,
                        "addressLine3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "nic": null
                    };
                    return data;
                };
                factory.newJobCardData = function () {
                    var data = {
                        "indexNo": null,
                        "number": null,
                        "branch": null,
                        "date": null,
                        "transaction": null,
                        "priceCategory": null,
                        "inTime": null,
                        "outTime": null,
                        "inMileage": null,
                        "nextMileage": null,
                        "status": null,
                        "bay": null,
                        "client": null,
                        "vehicle": null,
                        "serviceChagers": false,
                        "vehicleImages": false,
                        "finalCheck": false,
                        "attenctions": false,
                        "invoice": false
                    };
                    return data;
                };
                factory.newVehicleTypeData = function () {
                    var data = {
                        "indexNo": null,
                        "make": null,
                        "model": null,
                        "version": null,
                        "fuelType": null,
                        "type": null,
                        "priceCategory": null
                    };
                    return data;
                };
                factory.newPriceCategoryData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null
                    };
                    return  data;
                };
                return factory;
            }
            );
}());