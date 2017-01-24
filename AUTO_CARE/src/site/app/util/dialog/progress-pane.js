(function () {
    angular.module("appModule")
            .service("ProgressPane", function ($uibModal, $timeout) {
                var ctrl = function (type, title) {
                    function Controller(modalInstance, $timeout) {
                        //modal instance
                        this.modalInstance = modalInstance;
                        this.timeout = $timeout;

                        //title
                        this.title = title;
                        this.title = typeof this.title === 'undefined' ? 'Loading...' : this.title;


                        //class and icon
                        switch (type) {
                            case 'primary':
                                this.progressClass = 'progress-bar-primary';
                                this.optionPaneClass = 'option-pane-primary';
                                break;
                            case 'info':
                                this.progressClass = 'progress-bar-info';
                                this.optionPaneClass = 'option-pane-info';
                                break;
                            case 'success':
                                this.progressClass = 'progress-bar-success';
                                this.optionPaneClass = 'option-pane-success';
                                break;
                            case 'warning':
                                this.progressClass = 'progress-bar-warning';
                                this.optionPaneClass = 'option-pane-warning';
                                break;
                            case 'danger':
                                this.progressClass = 'progress-bar-danger';
                                this.optionPaneClass = 'option-pane-danger';
                                break;
                            default:
                                this.progressClass = 'progress-bar-default';
                                this.optionPaneClass = 'option-pane-default';
                                break;
                        }

                    }

                    Controller.prototype = {
                        continue: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                            }, 250);
                        }
                    };

                    return ['$uibModalInstance', '$timeout', Controller];
                };

                this.progress = function (optionType, message, title) {
                    var model = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: './app/util/dialog/progress-pane.html',
                        controller: ctrl(optionType, message, title),
                        controllerAs: '$ctrl',
                        size: 'md'
                    });

                    return {
                        close: function () {
                            $timeout(function () {
                                model.close();
                            }, 1000);
                        }
                    };
                };

                this.primaryProgress = function (title) {
                    return this.progress('primary', title);
                };

                this.infoProgress = function (title) {
                    return this.progress('info', title);
                };

                this.successProgress = function (title) {
                    return this.progress('success', title);
                };

                this.warningProgress = function (title) {
                    return this.progress('warning', title);
                };

                this.dangerProgress = function (title) {
                    return this.progress('danger', title);
                };

                this.defaultProgress = function (title) {
                    return this.progress('default', title);
                };

            });
}());