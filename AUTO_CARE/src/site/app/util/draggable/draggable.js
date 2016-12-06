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
                    dragModel: "=dragModel",
                    dragFlavour: "@dragFlavour"
                },
                link: draggableService.dragTarget
            };
        });

angular.module("appModule")
        .directive("dropTarget", function (draggableService) {
            return {
                restrict: 'A',
                scope: {
                    dropFunction: "&drop",
                    dropModel: "=dropModel",
                    dropFlavour: "@dropFlavour"
                },
                link: draggableService.dropTarget
            };
        });


angular.module("appModule")
        .service("draggableService", function () {
            var currentDragModel;
            var currentDragFlavour;

            this.dragTarget = function (scope, element, attrs) {
                element.attr("draggable", "true");

                var dragFunction = scope.dragFunction();
                var dragModel = scope.dragModel;
                var dragFlavour = scope.dragFlavour;

                if (dragFunction ? !angular.isFunction(dragFunction) : true) {
                    dragStart = function (e, m) {
                        console.log("DRAG");
                    };
                }

                if (!dragModel) {
                    dragModel = null;
                }

                if (!dragFlavour) {
                    dragFlavour = "ANY";
                }

                //drag start
                element.bind("dragstart", function (e) {
                    currentDragModel = dragModel;
                    currentDragFlavour = dragFlavour;
                    dragFunction(element, currentDragModel);
                });
            };

            this.dropTarget = function (scope, element, attrs) {
                var dropFunction = scope.dropFunction();
                var dropModel = scope.dropModel;
                var dropFlavour = scope.dropFlavour;

                if (dropFunction ? !angular.isFunction(dropFunction) : true) {
                    dragStart = function (e, m) {
                        console.log("DROP");
                    };
                }

                if (!dropModel) {
                    dropModel = element;
                }

                if (!dropFlavour) {
                    dropFlavour = "ANY";
                }

                //drag leave
                element.bind("drop", function () {
                    dropFunction(dropModel, currentDragModel);
                });

                element.bind("dragover", function (e) {
                    if (dropFlavour === currentDragFlavour) {
                        e.preventDefault();
                    }
                });
            };
        });

