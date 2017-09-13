(function () {
    angular.module("appModule")
            .controller("ReportViewerController", function ($scope, $filter, $sce, reportViewerModel, ReportViewerService) {
                $scope.model = {};
                $scope.newModel = new reportViewerModel();
                $scope.model.currentReportGroup = {};
                $scope.model.currentReport = {};
                $scope.model.currentReport.parameterValues = {};

                $scope.ui = {};

                $scope.report = "#";

//                $scope.model.currentReport.parameterValues.FROM_DATE = new Date();
//                $scope.model.currentReport.parameterValues.TO_DATE = new Date();
                $scope.model.currentReport.parameterValues.FROM_DATE = $filter('date')(new Date(), 'dd-MM-yyyy');
                $scope.model.currentReport.parameterValues.TO_DATE = $filter('date')(new Date(), 'dd-MM-yyyy');

                $scope.ui.selectReportGroup = function (reportGroup) {
                    $scope.model.currentReportGroup = reportGroup;
                };

                $scope.ui.selectReport = function (report) {
                    $scope.model.currentReport.report = report;

                    ReportViewerService.listParameters(report)
                            .success(function (data) {
                                $scope.model.currentReport.parameters = data;
                            });

                    $scope.activeTabIndex = 1;
                    $scope.ui.status = "PENDING";
                };

                $scope.ui.viewCurrentReport = function () {
                    if ($scope.model.currentReport.report) {
                        $scope.ui.status = "LOADING";
                        ReportViewerService.viewReport(
                                $scope.model.currentReport.report,
                                $scope.model.currentReport.parameters,
                                $scope.model.currentReport.parameterValues
                                )
                                .success(function (response) {
                                    $scope.ui.status = "LOADED";
                                    var file = new Blob([response], {type: 'application/pdf'});
                                    var fileURL = URL.createObjectURL(file);

                                    $scope.content = $sce.trustAsResourceUrl(fileURL);
                                });
                    }
                };

                $scope.ui.isParameterAvailable = function (param) {
                    if (typeof $scope.model.currentReport.parameters === 'undefined') {
                        return false;
                    }

                    return $scope.model.currentReport.parameters.indexOf(param) >= 0;
                };


                $scope.init = function () {
                    ReportViewerService.listReports()
                            .success(function (data) {
                                $scope.model.reports = data;
                                //console.log(data);
                            });

                    $scope.ui.status = "PENDING";
                };
                $scope.init();
            });
}());