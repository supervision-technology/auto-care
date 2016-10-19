(function () {
//module
    angular.module("homeModule", []);
    //controller
    angular.module("homeModule")
            .controller("homeController", function ($scope, $timeout, optionPane) {
                var $ctrl = this;
                $ctrl.items = ['item1', 'item2', 'item3'];
                $ctrl.animationsEnabled = true;
                $ctrl.open = function (size, parentSelector) {
                    var parentElem = parentSelector ?
                            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                    var modalInstance = $uibModal.open({
                        animation: false,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        controllerAs: '$ctrl',
                        size: size,
                        appendTo: parentElem,
                        resolve: {
                            items: function () {
                                return $ctrl.items;
                            }
                        }
                    });
                };
                $scope.informationMessage = function () {
                    optionPane.open();
                };
                angular.element(document.querySelectorAll(".btn")).on('click', function (event) {
                    event.preventDefault();
                    console.log("AAA");
//                    var $div = angular.element('<div/>'),
//                            btnOffset = this.getBoundingClientRect(),
//                            xPos = event.pageX - btnOffset.left,
//                            yPos = event.pageY - btnOffset.top;
//
//                    $div.addClass('ripple-effect');
//                    $div.css("height", this.offsetHeight + "px");
//                    $div.css("width", this.offsetHeight + "px");
//                    $div.css({
//                        top: yPos - (this.offsetHeight / 2) + "px",
//                        left: xPos - (this.offsetHeight / 2) + "px"
//                    });
//                    angular.element(this).append($div);
//
//                    $timeout(function () {
//                        $div.remove();
//                        console.log("removed");
//                    }, 1800);
                });
            });
}());