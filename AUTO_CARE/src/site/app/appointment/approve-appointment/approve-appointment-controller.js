(function () {
    angular.module("appointmentModuleApprove", ['ui.bootstrap', 'ui-notification']);
    angular.module("appointmentModuleApprove")
            .controller("appointmentApproveController", function ($scope, appointmentModel, Notification, ConfirmPane) {
                $scope.model = new appointmentModel();
                $scope.ui = {};


                //--------------------- item ---------------------
                $scope.ui.new = function () {
                    $scope.ui.mode = "EDIT";
                };


                //save appointment
                $scope.ui.saveAppointment = function () {
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
                $scope.ui.deleteAppointment = function (appointment, $index) {
                    ConfirmPane.dangerConfirm("reject Appointment!")
                            .confirm(function () {
                                $scope.model.deleteAppointment(appointment, $index);
                            })
                            .discard(function () {
                                console.log('discard fail');
                            });
                };


                //init
                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.type = "NORMAL";
                };
                $scope.ui.init();
            });
}());