(function () {
    angular.module("appModule")
            .factory("VehicleEntranceModelFactory", function () {
                var factory = {};
                //job card
                factory.newData = function () {
                    var data = {
                        "indexNo": 0,
                        "number": 0,
                        "branch": 0,
                        "date": null,
                        "transaction": 0,
                        "priceCategory": 0,
                        "inTime": null,
                        "outTime": null,
                        "inMileage": 0,
                        "nextMileage": 0,
                        "status": "PENDING",
                        "bay": 0,
                        "client": 0,
                        "vehicle": 0
                    };

                    return data;
                };

                //new vehicle
                factory.newVehicleData = function () {
                    var data = {
                        "indexNo": null,
                        "vehicleNo": "",
                        "year": null,
                        "engineNo": null,
                        "chasisNo": null,
                        "insuranceExpiryDate": null,
                        "revenueExpiryDate": null,
                        "lastMilage": null,
                        "nextMilage": null,
                        "colour": null,
                        "client": {
                            "indexNo": "",
                            "name": "",
                            "addressLine1": null,
                            "addressLine2": null,
                            "addressLine3": null,
                            "mobile": null,
                            "branch": null,
                            "type": null,
                            "nic": null
                        },
                        "vehicleType": {
                            "indexNo": "",
                            "make": null,
                            "model": null,
                            "version": null,
                            "fuelType": null,
                            "type": "",
                            "priceCategory": {
                                "indexNo": "",
                                "name": ""
                            }
                        },
                        "priceCategory": {
                            "indexNo": null,
                            "name": null
                        }
                    };
                    return data;
                };

                return factory;
            });
}());