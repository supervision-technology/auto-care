(function () {
    angular.module("appModule")
            .service("ReportViewerService", function ($http, systemConfig) {
                this.listReports = function () {
                    return $http.get(systemConfig.apiUrl + "/api/v1/report/report-viewer/list");
                };

                this.listParameters = function (report) {
                    return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report-parameters", JSON.stringify(report));
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

                this.viewReport = function (report, params, reportValues) {
                    return $http.get(this.getReportUrl(report, params, reportValues), {responseType: 'arraybuffer'});
                };

                this.getPdfBytes = function (map) {
                    console.log(map);

//                    return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report",{responseType: 'arraybuffer'},map);
                    var x = {
                        "client": "K W Chaminda"
                    };
                    return $http.post(systemConfig.apiUrl + "/api/v1/report/report-viewer/report", JSON.stringify(x), {responseType: 'arraybuffer'});

                };
            });
}());