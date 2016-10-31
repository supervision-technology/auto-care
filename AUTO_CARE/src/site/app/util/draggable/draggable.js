/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("appModule")
        .directive("dragTarget", function (draggableService) {
            return {
                restrict: 'A',
                scope: {
                    dragFunction: "&drag",
                    dragModel: "=dragModel"
                },
                link: draggableService.dragTarget
            };
        });

angular.module("appModule")
        .directive("dropTarget", function (draggableService) {
            return {
                restrict: 'A',
                scope: {
                    dropFunction: "&drop"
                },
                link: draggableService.dropTarget
            };
        });


angular.module("appModule")
        .service("draggableService", function () {
            var currentDragModel;

            this.dragTarget = function (scope, element, attrs) {
                element.attr("draggable", "true");

                var dragFunction = scope.dragFunction();
                var dragModel = scope.dragModel;

                if (dragFunction ? !angular.isFunction(dragFunction) : true) {
                    dragStart = function (e, m) {
                        console.log("DRAG");
                    };
                }
                if (!dragModel) {
                    dragModel = null;
                }

                //drag start
                element.bind("dragstart", function (e) {
                    currentDragModel = dragModel;
                    dragFunction(element, currentDragModel);
                });
            };

            this.dropTarget = function (scope, element, attrs) {
                var dropFunction = scope.dropFunction();
                if (dropFunction ? !angular.isFunction(dropFunction) : true) {
                    dragStart = function (e, m) {
                        console.log("DROP");
                    };
                }

                //drag leave
                element.bind("dragleave", function () {
                    dropFunction(element, currentDragModel);
                });
            };
        });

