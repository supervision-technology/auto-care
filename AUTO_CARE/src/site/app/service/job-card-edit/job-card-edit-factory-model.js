(function () {
    angular.module("appModule")
            .factory("jobCardEditFactory", function () {
                var factory = {};

                factory.jobCardEditData = function () {
                    var data = {
                        "oldPriceCategory": null,
                        "newPriceCategory": null,
                        "reponcebleEmployee": null
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
                        "invoice": false,
                        "defaultFinalCheck": false,
                        "rate": 0,
                        "rateReason": null,
                        "carepetOriginal": 0,
                        "carepetOther": 0,
                        "carepet3M": 0,
                        "driverName": null,
                        "driverMobile": null
                    };
                    return data;
                };

                return factory;
            });
}());