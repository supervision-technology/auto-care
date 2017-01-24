(function () {
    angular.module("appModule")
            .factory("VehicleEntranceModelFactory", function () {
                var factory = {};
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


                factory.newClientData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "mobile": null,
                        "nic": null
                    };
                };
                return factory;
            });
}());