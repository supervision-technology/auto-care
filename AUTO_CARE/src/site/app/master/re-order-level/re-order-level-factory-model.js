(function () {
    angular.module("appModule")
            .factory("reOrderLevelFactory", function () {
                var factory = {};
                factory.data = function () {
                    var data = {
                        "indexNo": null,
                        "item":null,
                        "branch":null,
                        "reOrderMax":0,
                        "reOrderMin":0
                    };
                    return data;
                };
               

                return factory;
            });
}());

