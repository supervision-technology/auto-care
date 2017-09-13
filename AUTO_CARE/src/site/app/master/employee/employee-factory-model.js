(function () {
    angular.module("appModule")
            .factory("employeeFactory", function () {
                var factory = {};
                factory.newEmployeeData = function () {
                    var data = {
                        "indexNo": null,
                        "name": null,
                        "addressLine1": null,
                        "addressLine2": null,
                        "addressLine3": null,
                        "mobile": null,
                        "branch": null,
                        "type": null,
                        "rol": null,
                        "image": null,
                        "bay": null
                    };
                    return data;
                };
                return factory;
            });
}());