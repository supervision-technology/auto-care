/* 
 *  option-pane.js
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 18, 2016, 10:32:25 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
(function () {
    angular.module("appModule")
            .service("optionPane", function ($uibModal) {
                
                this.open = function () {
                    $uibModal.open({
                        animation: false,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'optionPane.html',
                        controller: 'optionPaneController',
                        controllerAs: '$ctrl',
                        size: 'sm'
                    });
                };
            });

    angular.module("appModule")
            .controller("optionPaneController", function ($scope) {

            });
}());

