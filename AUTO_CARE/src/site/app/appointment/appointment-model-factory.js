(function () {
    angular.module("appModule")
            .factory("appointmentFactory", function () {
                var factory = {};

                factory.newAppointmentData = function () {
                    var data = {
//                        "indexNo": null,
                        "item": null,
                        "vehicle": null,
                        "branch": null,
                        "receivedDate": null,
                        "appointmentDate": null,
                        "inTime": null,
                        "clientName": null,
                        "contactNo": null,
                        "vehicleNo": null,
                        "vehicleModel": null,
                        "status": null,
                        bayDetails: [
//                            {
//                                indexNo: null,
//                                bayOrder: null,
//                                vehicle: null,
//                                appointmentItem: null,
//                                appointmentBay: null,
//                                inTime: null,
//                                outTime: null,
//                                branch: null,
//                                date: null
//                            }
                        ]

                    };
                    return data;
                };


                return factory;
            });
}());

