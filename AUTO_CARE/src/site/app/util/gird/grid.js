/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("appModule")
        .directive("grid", function (gridService) {
            return {
                restrict: 'A',
                link: gridService.grid
            };
        });

angular.module("appModule")
        .service("gridService", function () {
            this.grid = function (scope, element, attrs) {
                var gridSize = {x: 12, y: 12};
                
                var grid = angular.fromJson(attrs.grid);
                var x = grid.x;
                var y = grid.y;
                var w = grid.w;
                var h = grid.h;
                var color = grid.color;

                //validation

                //stylize
                element.css("position", "absolute");
                element.css("display", "block");
                element.css("width", (w / gridSize.x * 100) + "%");
                element.css("height", (h / gridSize.y * 100) + "%");
                element.css("left", (x / gridSize.x * 100) + "%");
                element.css("top", (y / gridSize.y * 100) + "%");
                element.css("background-color", color);
            };
        });