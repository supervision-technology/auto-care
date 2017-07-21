(function () {
    angular.module("appModule")
            .factory("reportViewerModel", function (ReportViewerService) {
                function reportViewer() {
                    this.constructor();
                }

                reportViewer.prototype = {

                    bayList: [],
                    vehicleList: [],
                    vehicleCategoryList: [],
                    clientList: [],
                    supplierList: [],
                    branchList: [],
                    itemTypeList: [],
                    itemCateoryList: [],

                    constructor: function () {
                        var that = this;

                        ReportViewerService.getBayList()
                                .success(function (data) {
                                    that.bayList = data;
                                });
                        ReportViewerService.getVehicleList()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });
                        ReportViewerService.getVehicleCategoryList()
                                .success(function (data) {
                                    that.vehicleCategoryList = data;
                                });
                        ReportViewerService.getClientList()
                                .success(function (data) {
                                    that.clientList = data;
                                });
                        ReportViewerService.getSupplierList()
                                .success(function (data) {
                                    that.supplierList = data;
                                });
                        ReportViewerService.getBranchList()
                                .success(function (data) {
                                    that.branchList = data;
                                });
                        ReportViewerService.getItemCateoryList()
                                .success(function (data) {
                                    that.itemCateoryList = data;
                                });
                        this.itemTypeList = [
                            {indexNo: 1, name: 'STOCK'},
                            {indexNo: 2, name: 'NON STOCK'}
                        ];
                    }
                    , bayLable: function (id) {
                        var lable = '';
                        angular.forEach(this.bayList, function (bay) {
                            if (bay.indexNo === parseInt(id)) {
                                lable = bay.indexNo + " - " + bay.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , vehicleLable: function (id) {
                        var lable = '';
                        angular.forEach(this.vehicleList, function (vehicle) {
                            if (vehicle.indexNo === parseInt(id)) {
                                lable = vehicle.indexNo + " - " + vehicle.vehicleNo;
                                return;
                            }
                        });
                        return lable;
                    }
                    , vehicleCategoryLable: function (id) {
                        var lable = '';
                        angular.forEach(this.vehicleCategoryList, function (vehCategory) {
                            if (vehCategory.indexNo === parseInt(id)) {
                                lable = vehCategory.indexNo + " - " + vehCategory.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , clientLable: function (id) {
                        var lable = '';
                        angular.forEach(this.clientList, function (client) {
                            if (client.indexNo === parseInt(id)) {
                                lable = client.indexNo + " - " + client.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , supplierLable: function (id) {
                        var lable = '';
                        angular.forEach(this.supplierList, function (supplier) {
                            if (supplier.indexNo === parseInt(id)) {
                                lable = supplier.indexNo + " - " + supplier.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , branchLable: function (id) {
                        var lable = '';
                        angular.forEach(this.branchList, function (branch) {
                            if (branch.indexNo === parseInt(id)) {
                                lable = branch.branchCode + " - " + branch.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , itemTypeLable: function (name) {
                        var lable = '';
                        angular.forEach(this.itemTypeList, function (itemType) {
                            if (itemType.name === name) {
                                lable = itemType.indexNo + " - " + itemType.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , itemCateoryLable: function (id) {
                        var lable = '';
                        angular.forEach(this.itemCateoryList, function (itemCateory) {
                            if (itemCateory.indexNo === parseInt(id)) {
                                lable = itemCateory.indexNo + " - " + itemCateory.name;
                                return;
                            }
                        });
                        return lable;
                    }

                };
                return reportViewer;
            });
}());
