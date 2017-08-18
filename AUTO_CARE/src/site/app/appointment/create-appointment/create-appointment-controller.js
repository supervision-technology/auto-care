(function () {
    angular.module("appointmentModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("appointmentModule")
            .controller("appointmentCreateController", function ($scope, $filter, $rootScope, appointmentModel, Notification, ConfirmPane) {
                $scope.model = new appointmentModel();
                $scope.ui = {};


                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };


                //save appointment
                $scope.ui.saveAppointment = function () {
                    var t1 = $rootScope.jobTime;
                    var t2 = $filter('date')($scope.model.inTime, 'HH:mm:ss');

                    t1 = t1.split(/\D/);
                    t2 = t2.split(/\D/);
                    var x1 = parseInt(t1[0]) * 60 * 60 + parseInt(t1[1]) * 60 + parseInt(t1[2]);
                    var x2 = parseInt(t2[0]) * 60 * 60 + parseInt(t2[1]) * 60 + parseInt(t2[2]);
                    var s = x1 + x2;
                    var m = Math.floor(s / 60);
                    s = s % 60;
                    var h = Math.floor(m / 60);
                    m = m % 60;
//                    var d = Math.floor(h / 24);
//                    h = h % 24;
//                    alert(d + ':' + h + ':' + m + ':' + s);

                    $scope.model.appointmentData.outTime = h + ':' + m + ':' + s;
                    $scope.model.appointmentData.inTime = $filter('date')($scope.model.inTime, 'HH:mm:ss');

                    $scope.model.saveAppointment()
                            .then(function () {
                                Notification.success("Appointment save Success");
                            }, function () {
                                Notification.error("Appointment save Fail");
                            });
                };

                //edit appointment
                $scope.ui.editAppointment = function (items, $index) {
                    $scope.model.editAppointment(items, $index);
                };

                //delete appointment
                $scope.ui.deleteAppointment = function (items, $index) {
                    ConfirmPane.dangerConfirm("Delete Appointment!")
                            .confirm(function () {
                                $scope.model.deleteAppointment(items, $index);
                            })
                            .discard(function () {
                                console.log('discard fail');
                            });

                };

                // select job item 
                $scope.ui.selectItem = function (item) {
                    $rootScope.jobTime = item.time;
                    $scope.ui.selectedDataIndex = item.indexNo;
                    //set to save obejct
                    $scope.model.appointmentData.item = item.indexNo;
                    $scope.model.categoryDetailLabel(item.item);
                };

                //select price category
                $scope.ui.selectPriceCategory = function (category) {
                    //set to save obejct
                    $scope.model.appointmentData.priceCategory = category.priceCategory;
                    $scope.ui.selectedIndex = category.indexNo;
                };


                $scope.ui.selectDate = function (date) {
                    $rootScope.appointmentDate = date;
                };

                $scope.ui.filterValue = function (obj) {
                    return $filter('date')(obj.appointmentDate, 'MM/dd/yyyy') === $filter('date')($rootScope.appointmentDate, 'MM/dd/yyyy');
                };


                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";

                };
                $scope.ui.init();
            });
}());