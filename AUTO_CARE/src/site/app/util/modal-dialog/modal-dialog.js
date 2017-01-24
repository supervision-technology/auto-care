(function () {
    angular.module("appModule")
            .service("ModalDialog", function ($uibModal) {

                var ctrl = function () {
                    function Controller(modalInstance, $timeout) {
                        //modal instance
                        this.modalInstance = modalInstance;
                        this.timeout = $timeout;
                    }

                    Controller.prototype = {
                        close: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                            }, 250);
                        }
                    };

                    return ['$uibModalInstance', '$timeout', Controller];
                };

                this.showModel = function (size, templateUrl, controller) {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: templateUrl,
                        controller: controller,
                        size: size
                    });
                };

                this.modalOpen = function (size, templateUrl, controller) {
                    return this.showModel(size, templateUrl, controller);
                };

            });
}());
