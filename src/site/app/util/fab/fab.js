(function () {
    angular.module("appModule")
            .directive('btn', function (rippleService) {
                return {
                    restrict: 'C',
                    link: rippleService.ripple
                };
            })
            .directive('fab', function (rippleService) {
                return {
                    restrict: 'C',
                    link: rippleService.ripple
                };
            });

    angular.module("appModule").service("rippleService", function ($timeout) {
        this.ripple = function (scope, element, attrs) {
            element.bind('click', function (event) {
                event.preventDefault();

                var $div = angular.element('<div/>'),
                        btnOffset = this.getBoundingClientRect(),
                        xPos = event.pageX - btnOffset.left,
                        yPos = event.pageY - btnOffset.top;

                $div.addClass('ripple-effect');
                $div.css("height", this.offsetWidth + "px");
                $div.css("width", this.offsetWidth + "px");
                $div.css({
                    top: yPos - (this.offsetWidth / 2) + "px",
                    left: xPos - (this.offsetWidth / 2) + "px"
                });
                angular.element(this).append($div);

                $timeout(function () {
                    $div.remove();
                }, 1000);
            });
        };
    });

}());
