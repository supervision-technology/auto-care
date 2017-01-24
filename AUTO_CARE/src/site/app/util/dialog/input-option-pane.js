(function () {
    angular.module("appModule")
            .service("InputPane", function ($uibModal, $q, Notification) {
                var defer;

                var ctrl = function (type, title) {
                    function Controller(modalInstance, $timeout) {
                        //modal instance
                        this.modalInstance = modalInstance;
                        this.timeout = $timeout;

                        this.type = type;
                        this.title = title;

                        //class and icon
                        switch (type) {
                            case 'primary':
                                this.optionPaneClass = 'option-pane-primary';
                                this.optionPaneIcon = 'glyphicon glyphicon-tag';
                                this.title = typeof this.title === 'undefined' ? 'Confirm' : this.title;
                                break;
                            default:
                                this.optionPaneClass = 'option-pane-default';
                                this.optionPaneIcon = 'glyphicon-bell';
                                this.title = typeof this.title === 'undefined' ? 'Note' : this.title;
                                break;
                        }
                    }
                    Controller.prototype = {
                        confirm: function (data) {
                            var scope = this;
                            this.timeout(function () {
                                if (angular.isUndefined(data)) {
                                    Notification.error("please input text");
                                } else {
                                    scope.modalInstance.close();
                                    defer.resolve(data);
                                }
                            }, 250);
                        },
                        discard: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                                defer.reject();
                            }, 250);
                        }
                    };

                    return ['$uibModalInstance', '$timeout', Controller];
                };

                this.confirm = function (optionType, title) {
                    defer = $q.defer();

                    $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: './app/util/dialog/input-option-pane.html',
                        controller: ctrl(optionType, title),
                        controllerAs: '$ctrl',
                        size: 'md'
                    });

                    return {
                        confirm: function (callback) {
                            defer.promise.then(callback, null);
                            return this;
                        },
                        discard: function (callback) {
                            defer.promise.then(null, callback);
                            return this;
                        }
                    };
                };

                this.primaryInput = function (title) {
                    return this.confirm('primary', title);
                };

                this.defaultInput = function (title) {
                    return this.confirm('default', title);
                };

            });
}());
