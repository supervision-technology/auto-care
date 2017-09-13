(function () {
    angular.module("appModule")
            .service("IndividualViewService", function ($http, systemConfig) {

                //invoice viewer and print
                this.listParameters = function (report) {
                    return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report-parameters", JSON.stringify(report));
                };

                this.reportData = function (reportName) {
                    return $http.get(systemConfig.apiUrl + "/api/v1/report/report-viewer/invoice-report-data/" + reportName);
                };

                this.getReportUrl = function (report, params, reportValues) {
                    var url = systemConfig.apiUrl + "/api/v1/report/report-viewer/report";

                    var action = btoa(report.fileName);
                    url = url + "?action=" + action;

                    angular.forEach(reportValues, function (value, key) {
                        url = url + "&" + key + "=" + value;
                    });

                    return url;
                };
                
                this.getPrintReportReportUrl = function (report, params, reportValues) {
                    var url = systemConfig.apiUrl + "/api/v1/report/report-viewer/print-report";

                    var action = btoa(report.fileName);
                    url = url + "?action=" + action;

                    angular.forEach(reportValues, function (value, key) {
                        url = url + "&" + key + "=" + value;
                    });

                    return url;
                };

                this.viewReport = function (report, params, reportValues) {
                    return $http.get(this.getReportUrl(report, params, reportValues), {responseType: 'arraybuffer'});
                };
                
                this.printReport = function (report, params, reportValues) {
                    return $http.get(this.getPrintReportReportUrl(report, params, reportValues));
                };

            });
}());