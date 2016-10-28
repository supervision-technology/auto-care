/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("appModule")
        .directive("ngDraggable", function (draggableService, $compile) {
            return {
                restrict: 'A',
                link: draggableService.draggable,
                compile: draggableService.compile
            };
        });


angular.module("appModule")
        .service("draggableService", function ($compile) {
            this.draggable = function (scope, element, attrs) {
                
                element.bind("dragstart", function (e) {
                    console.log("drag start");
                });
                
            };
            
            this.compile=function(element){
                //enable draggable
                element.removeAttr("draggable");
                element.attr("draggable", true);
                $compile(element);
            };
        });

