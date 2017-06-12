(function () {
    angular.module("dailyCheckListModule", ['ui.bootstrap', 'ui-notification']);
    angular.module("dailyCheckListModule")
            .controller("dailyCheckListController", function ($scope, $filter, dailyCheckListModel) {
                $scope.model = new dailyCheckListModel();

                $scope.ui = {};

                $scope.ui.selectButton = function (item) {
                    console.log(item);
                    $scope.model.findByItem(item);
                };

                $scope.ui.historySelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible === 0 ? true : false;
                    $scope.ui.canselAction = $scope.ui.canselAction === $index ? -1 : $index;
                };

                $scope.ui.checkingConfirm = function (subItem, index) {
                    $scope.model.saveCheckedSubItem(subItem.indexNo,subItem.subName);
                    $scope.model.checkedList.push(subItem);
                    $scope.model.findItemList.splice(index, 1);
                    
                };

                $scope.ui.checkingCansel = function (subItem, index) {
                    $scope.model.saveCheckedSubItem(subItem.indexNo,subItem.subName);
                    $scope.model.checkedList.push(subItem);
                    $scope.model.findItemList.splice(index, 1);
                };
                
                $scope.ui.findByItem = function (item) {
                    $scope.model.findByItem(item);
                };

                $scope.ui.init = function () {

                };
                $scope.ui.init();
            });
}());