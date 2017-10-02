(function () {
    angular.module("grnModule", ['ui.bootstrap']);
    angular.module("grnModule")
            .controller("grnController", function ($scope, $timeout, $uibModal,$sce,$filter, GrnModel, Notification, GrnService, ConfirmPane) {
                $scope.model = new GrnModel();
                $scope.ui = {};
                $scope.filterList = [];

                $scope.printModel = {};
                $scope.printModel.currentReportGroup = {};
                $scope.printModel.currentReport = {
                    "report": null,
                    "parameters": null,
                    "parameterValues": {}
                };

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                };
                $scope.ui.selectPurchaseOrder = function (indexNo, number) {
                    $scope.model.selectPurchaseOrder(indexNo, number);

                };
                $scope.ui.select = function (indexNo) {
                    $scope.model.select(indexNo);
                };
                $scope.ui.editItemQty = function (indexNo) {
                    $scope.model.editItemQty(indexNo);
                };
                $scope.ui.addData = function () {
                    $scope.model.addData();
                };
                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Do you want to save GRN Receive !")
                            .confirm(function () {
                                $scope.model.save()
                                        .then(function (data) {
                                            ConfirmPane.successConfirm("Do You Want To Print grn request note !")
                                                    .confirm(function () {
                                                        $scope.ui.modalOpen(data);
                                                    });
                                        });
                            })
                            .discard(function () {
                                ConfirmPane.successConfirm("Do You Want To Print grn request note !")
                                        .confirm(function () {
                                            $scope.ui.modalOpen(3);
                                        });
                            });
                };
                $scope.ui.deleteItem = function (index) {
                    console.log('deleteItem');
                    $scope.model.deleteItem(index);
                };
                $scope.ui.discard = function () {
                    $scope.model.discard();
                };

                $scope.ui.changeSupplier = function () {
                    $scope.model.changeSupplier();
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';

                    $scope.$watch("model.purchaseOrderItemList", function () {
                        $scope.model.itemTotal();
                    });


                };
                $scope.ui.modalOpen = function (indexNo) {
                    var reportName = "GRN_NOTE";
                    //get report details
                    GrnService.reportData(reportName)
                            .success(function (data) {
                                $scope.printModel.currentReport.report = data;

                                //get report paramiters
                                GrnService.listParameters(data)
                                        .success(function (data) {
                                            $scope.printModel.currentReport.parameters = data;
                                        });

                                //set paramiters values
                                $scope.printModel.currentReport.parameterValues.GRN_NO = indexNo;

                                //view reports
                                GrnService.viewReport(
                                        $scope.printModel.currentReport.report,
                                        $scope.printModel.currentReport.parameters,
                                        $scope.printModel.currentReport.parameterValues
                                        )
                                        .success(function (response) {
                                            var file = new Blob([response], {type: 'application/pdf'});
                                            var fileURL = URL.createObjectURL(file);

                                            $scope.content = $sce.trustAsResourceUrl(fileURL);

                                            $uibModal.open({
                                                animation: true,
                                                ariaLabelledBy: 'modal-title',
                                                ariaDescribedBy: 'modal-body',
                                                templateUrl: 'grn_recieve_popup.html',
                                                scope: $scope,
                                                size: 'lg'
                                            });

                                        });
                            });
                };
                $scope.init();

            });
}());



