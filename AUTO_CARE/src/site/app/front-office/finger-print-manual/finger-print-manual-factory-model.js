(function () {
    angular.module("appModule")
            .factory("fingerPrintFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "id": null,
                        "dn": null,
                        "din": null,
                        "clock": null
                    };
                    return data;
                };
                return factory;
            });
}());