(function () {
    var service = function ($http, systemConfig) {
        this.loadEmolyee = function () {
            return $http.get(systemConfig.apiUrl + "/api/care-point/master/employee");
        };
        this.saveEmployee = function (employee) {
            return $http.post(systemConfig.apiUrl + "/api/care-point/master/employee/save-employee", employee);
        };
        this.deleteEmployee = function (indexno) {
            return $http.delete(systemConfig.apiUrl + "/api/care-point/master/employee/delete-employee/"+ indexno);
        };
    };
    angular.module("appModule")
            .service("employeeService", service);
}());