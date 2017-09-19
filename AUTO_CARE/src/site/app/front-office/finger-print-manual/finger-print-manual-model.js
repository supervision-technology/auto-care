(function () {
    angular.module("appModule")
            .factory("fingerPrintModel", function (fingerPrintService, fingerPrintFactory, $filter, $q, Notification) {
                function fingerPrintModel() {
                    this.constructor();
                }

                fingerPrintModel.prototype = {
                    data:[],
                    fingerPrint: {},
                    employeeList: [],
                    mashineList: [],
                    currentBranch: {},

                    constructor: function () {
                        var that = this;

                        that.fingerPrint = fingerPrintFactory.newData();

                        fingerPrintService.loadEmolyee()
                                .success(function (data) {
                                    that.employeeList = data;
                                });
                        fingerPrintService.loadCurrentBranch()
                                .success(function (data) {
                                    that.currentBranch = data;
                                });
                        fingerPrintService.loadFingerPrintMashine()
                                .success(function (data) {
                                    that.mashineList = data;
                                });

                    },
                    clear: function () {
//                        this.fingerPrint.date = null;
                        this.fingerPrint.time = null;
                        this.fingerPrint.dn = null;
                        this.fingerPrint.din = null;
                        this.fingerPrint.clock = null;
                    },
                    employeeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.indexNo + " - " + values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    mashineLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.mashineList, function (value) {
                            if (value.indexNo === parseInt(indexNo)) {
                                data = value.fingerPrint + ' - ' + value.name;
                                return;
                            }
                        });
                        return data;
                    },

                    save: function () {
                        var defer = $q.defer();
                        var that = this;
                        var date = $filter('date')(this.fingerPrint.date, 'yyyy-MM-dd');
                        var time = $filter('date')(this.fingerPrint.time, 'hh:mm:ss');
                        this.fingerPrint.clock = date + ' ' + time;
                        console.log(this.fingerPrint);
                        fingerPrintService.saveFingerPrint(JSON.stringify(this.fingerPrint))
                                .success(function (data) {
                                    that.clear();
                                    Notification.success('Fingerprint Save Success ! ');
                                    defer.resolve(data);
                                })
                                .error(function (data) {
                                    Notification.error(data.message);
                                    defer.reject(data);
                                });
                        return  defer.promise;
                    },
                    changeDate: function () {
                        var that=this;
                        fingerPrintService.loadData($filter('date')(this.fingerPrint.date, 'yyyy-MM-dd'))
                                .success(function (data) {
                                    that.data=data;
                                })
                                .error(function () {

                                });
                    }
                };
                return fingerPrintModel;
            });
}());