(function () {
    var service = function ($http, systemConfig) {

        //load common master files
        this.loadEmolyee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };
        this.saveEmployee = function (employee) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/employee/save-employee", employee);
        };

    };

    angular.module("appModule")
            .service("employeeService", service);
}());