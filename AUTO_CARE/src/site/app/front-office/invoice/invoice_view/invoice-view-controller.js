(function () {
    angular.module("appModule")
            .controller("InvoiceViewController", function ($scope, $routeParams, $sce, InvoiceViewService) {
                $scope.model = {};
                $scope.model.currentReportGroup = {};
                $scope.model.currentReport = {};
                $scope.model.currentReport.parameterValues = {};

                $scope.ui = {};

                $scope.init = function () {

                    var reportName = "Invoice";
                    //get report details
                    InvoiceViewService.reportData(reportName)
                            .success(function (data) {

                                $scope.model.currentReport.report = data;

                                //get report paramiters
                                InvoiceViewService.listParameters(data)
                                        .success(function (data) {
                                            $scope.model.currentReport.parameters = data;
                                        });

                                //set paramiters values
                                $scope.model.currentReport.parameterValues.INVOICE_NO = $routeParams.invoiceIndexNo;

                                $scope.ui.status = "LOADING";
                                //view reports
                                InvoiceViewService.viewReport(
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
                            });
                };
                $scope.init();
            });
}());