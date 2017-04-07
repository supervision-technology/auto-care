(function () {
    angular.module("appModule")
            .factory("invoiceModel", function (invoiceService, invoiceFactory, $q) {
                function invoiceModel() {
                    this.constructor();
                }
                invoiceModel.prototype = {

                    invoiceData: {},
                    clientData: {},
                    vehicleData: {},

                    vehicleList: [],
                    clientList: [],
                    vehicleTypeList: [],
                    priceCategoryList: [],

                    //master data lists
                    invoiceHistoryList: [],
                    jobItemHistortList: [],
                    constructor: function () {
                        var that = this;
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.clientData = invoiceFactory.newClientData();
                        this.vehicleData = invoiceFactory.newVehicleData();

                        invoiceService.loadVehicle()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });

                        invoiceService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                        invoiceService.loadVehicleType()
                                .success(function (data) {
                                    that.vehicleTypeList = data;
                                });

                        invoiceService.loadPriceCategory()
                                .success(function (data) {
                                    that.priceCategoryList = data;
                                });
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    that.jobItemHistortList = [];
                                    angular.extend(that.jobItemHistortList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.jobItemHistortList = [];
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getInvoiceByJobCard: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        //job card select empty jobItemHistortList
                        this.jobItemHistortList = [];
                        invoiceService.getInvoiceByJobCard(jobCard)
                                .success(function (data) {
                                    that.invoiceHistoryList = [];
                                    angular.extend(that.invoiceHistoryList, data);
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.invoiceHistoryList = [];
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getJobItemHistoryTotal: function () {
                        var total = 0.0;
                        angular.forEach(this.jobItemHistortList, function (values) {
                            total += values.value;
                            return;
                        });
                        return total;
                    },
                    selectJobCardVehicle: function (jobCard) {
                        this.clientData = this.client(parseInt(jobCard.client));
                        this.vehicleData = this.vehicle(parseInt(jobCard.vehicle));
                    },
                    vehicle: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    client: function (indexNo) {
                        var data = "";
                        angular.forEach(this.clientList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    priceCatagoryLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.priceCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                lable = values.name;
                                return;
                            }
                        });
                        return lable;
                    },
                    vehicleTypeLable: function (indexNo) {
                        var lable = "";
                        angular.forEach(this.vehicleTypeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                lable = values.make + ' - ' + values.model;
                                return;
                            }
                        });
                        return lable;
                    }
                };
                return invoiceModel;
            });
}());