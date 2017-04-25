(function () {
    angular.module("appModule")
            .factory("grnModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                       
                    };
                    return tempData;
                };
                
                return factory;
            });
}());