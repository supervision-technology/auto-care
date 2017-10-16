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
                    employeeList: [],
                    categoryList: [],
                    itemList: [],

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
                        ReportViewerService.getEmployeeList()
                                .success(function (data) {
                                    that.employeeList = data;
                                });
                        ReportViewerService.getCategoryList()
                                .success(function (data) {
                                    that.categoryList = data;
                                });
                        ReportViewerService.getItemList()
                                .success(function (data) {
                                    that.itemList = data;
                                });
                        this.itemTypeList = [
                            {indexNo: 1, name: 'STOCK'},
                            {indexNo: 2, name: 'NON STOCK'}
                        ];
                        this.timeList = [
                            "00:00:30",
                            "00:01:00",
                            "00:10:00",
                            "00:15:00",
                            "00:20:00",
                            "00:30:00",
                            "00:40:00",
                            "00:45:00",
                            "00:50:00",
                            "01:10:00",
                            "01:20:00",
                            "01:30:00",
                            "01:40:00",
                            "01:45:00",
                            "01:50:00",
                            "02:00:00",
                            "02:10:00",
                            "02:20:00",
                            "02:30:00",
                            "02:40:00",
                            "02:45:00",
                            "02:50:00",
                            "03:00:00",
                            "03:10:00",
                            "03:20:00",
                            "03:30:00",
                            "03:40:00",
                            "03:45:00",
                            "03:50:00",
                            "04:00:00",
                            "04:10:00",
                            "04:20:00",
                            "04:30:00",
                            "04:40:00",
                            "04:45:00",
                            "04:50:00",
                            "05:00:00",
                            "06:00:00",
                            "07:00:00",
                            "10:00:00",
                            "20:00:00",
                            "30:00:00"
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
                    , categoryLable: function (id) {
                        var lable = '';
                        angular.forEach(this.categoryList, function (value) {
                            if (value.indexNo === parseInt(id)) {
                                lable = value.indexNo + " - " + value.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , itemLable: function (id) {
                        var lable = '';
                        angular.forEach(this.itemList, function (value) {
                            if (value.indexNo === parseInt(id)) {
                                lable = value.indexNo + " - " + value.name;
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
                    , employeeLable: function (id) {
                        var lable = '';
                        angular.forEach(this.employeeList, function (employee) {
                            if (employee.indexNo === parseInt(id)) {
                                lable = employee.indexNo + " - " + employee.name;
                                return;
                            }
                        });
                        return lable;
                    }
                    , timeLable: function (timePara) {
                        var lable = null;
                        angular.forEach(this.timeList, function (time) {
                            if (time === timePara) {
                                lable = time;
                                return;
                            }
                        });
                        return lable;
                    }

                };
                return reportViewer;
            });
}());
