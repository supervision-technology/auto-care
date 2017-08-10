(function () {
//module
    angular.module("customerSatisfactionModule", ['ui.bootstrap']);
    //controller
    angular.module("customerSatisfactionModule")
            .controller("customerSatisfactionController", function ($scope, $uibModal, $timeout, $uibModalStack, customerSatisfactionModel, ConfirmPane, Notification) {
                $scope.model = new customerSatisfactionModel();
                $scope.ui = {};

                $scope.ui.mode = 'IDEAL';
                $scope.removeIndex = null;

                $scope.ui.save = function () {

                    $scope.ui.mode = 'IDEAL';
                    if ($scope.model.data.indexNo) {
                        if ($scope.model.data.rate >= 14) {

                            ConfirmPane.successConfirm("Are you sure want to save this customer satisfaction Rate ? !")
                                    .confirm(function () {
                                        $scope.model.save();
                                    });
                        } else {
                            $scope.ui.getReasonModal();
                        }
                    } else {
                        Notification.error('Select A Vehicle to Save !');

                    }
                };
                $scope.ui.directSave = function () {
                    if ($scope.model.data.rateReason) {
                        
                    $uibModalStack.dismissAll();
                    $scope.model.save();
                    }else{
                        Notification.error('Empty Reason !');
                        
                    }
                };
                $scope.model.save()
                        .then(function () {
                            $scope.ui.removeRatedJobCard();
                            Notification.success('Customer Satisfaction save Success !');
                        });

                $scope.ui.selectedJobCard = function (jobCardData, index) {
                    $scope.model.selectedJobCard(jobCardData.indexNo);
                    $scope.removeIndex = index;
                };

                $scope.ui.getReasonModal = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'reason.html',
                        scope: $scope,
                        size: 'lg'
                    });
                    $scope.ui.focus('#txtReason');
                };
                $scope.ui.removeRatedJobCard = function () {
                    $scope.model.finishedJobCards.splice($scope.removeIndex, 1);
                    $scope.removeIndex = null;
                };

                //focus
                $scope.ui.focus = function (id) {
                    $timeout(function () {
                        document.querySelectorAll(id)[0].focus();
                    }, 10);
                };


            });
}());


