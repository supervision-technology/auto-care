(function () {
    var factory = function (employeeFactory, employeeService, $q, $filter) {
        function employeeModel() {
            this.constructor();
        }
        //prototype functions
        employeeModel.prototype = {
            //data model
            employeeData: {},
            employeeList: [],

            //constructor
            constructor: function () {
                var that = this;
                that.employeeData = employeeFactory.newEmployeeData();

                employeeService.loadEmolyee()
                        .success(function (data) {
                            that.employeeList = data;
                            console.log(data);
                        });
            },
            saveEmployee: function () {
                var that = this;
                var defer = $q.defer();
                employeeService.saveEmployee(JSON.stringify(that.employeeData))
                        .success(function (data) {
                            that.employeeList.push(data);
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            }
        };
        return employeeModel;
    };
    angular.module("appModule")
            .factory("employeeModel", factory);
}());


