(function () {
    angular.module('appModule')
            .directive('inputHint', function (InputHintService, $document, $compile) {
                return {
                    restrict: 'A',
                    scope: true,
                    link: InputHintService.inputHint
                };
            });

    angular.module("appModule")
            .service("InputHintService", function ($document, $compile) {
                this.inputHint = function (scope, element, attrs) {
                    var tip = $compile('<div ng-class="tipClass">{{ text }}<div class="input-hint-arrow"></div></div>')(scope),
                            tipClassName = 'input-hint',
                            tipActiveClassName = 'input-hint-show';

                    scope.tipClass = [tipClassName];
                    scope.text = attrs.inputHint;

                    if (attrs.tooltipPosition) {
                        scope.tipClass.push('input-hint-' + attrs.tooltipPosition);
                    } else {
                        scope.tipClass.push('input-hint-down');
                    }
                    attrs.$set('placeholder', scope.text);
                    
                    $document.find('body').append(tip);
                    
                    element.bind('focus', function (e) {
                        tip.addClass(tipActiveClassName);

                        tip = angular.element(tip);
                        var pos = e.target.getBoundingClientRect(),
                                offset = {},
                                tipHeight = tip[0].offsetHeight,
                                tipWidth = tip[0].offsetWidth,
                                elWidth = pos.width || pos.right - pos.left,
                                elHeight = pos.height || pos.bottom - pos.top,
                                tipOffset = 5;

                        if (tip.hasClass('input-hint-down')) {
                            offset.top = pos.top + elHeight + tipOffset;
                            offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
                        } else {
                            offset.top = pos.top - tipHeight - tipOffset;
                            offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
                        }

                        tip.css({
                            top: offset.top + "px",
                            left: offset.left + "px"
                        });
                    });

                    element.bind('blur', function (e) {
                        tip.removeClass(tipActiveClassName);
                    });
                };
            }
            );
}());