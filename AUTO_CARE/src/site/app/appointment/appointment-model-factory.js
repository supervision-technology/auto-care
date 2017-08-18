(function () {
    angular.module("appModule")
            .factory("appointmentFactory", function () {
                var factory = {};

                factory.newAppointmentData = function () {
                    var data = {
                        "indexNo": null,
                        "item": null,
                        "vehicle": null,
                        "branch": null,
                        "receivedDate": null,
                        "appointmentDate": null,
                        "clientName": null,
                        "contactNo": null,
                        "vehicleNo": null,
                        "vehicleModel": null,
                        "status": null
                    };
                    return data;
                };


                return factory;
            });
}());

