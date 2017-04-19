(function () {
    var factory = function (dailyCheckListService, dailyCheckListFactory, $filter, $q) {
        function dalyCheckListModel() {
            this.constructor();
        }
        dalyCheckListModel.prototype = {
            itemData: {},
            subItemData: {},
            dailyCheckData: {},

            checkedList: [],
            subItemList: [],
            itemList: [],
            findItemList: [],

            constructor: function () {
                var that = this;
                this.itemData = dailyCheckListFactory.newItemModel();
                this.subItemData = dailyCheckListFactory.newSubItemCheckListResultModel();
                this.dailyCheckData = dailyCheckListFactory.newDailyCheckListModel();

                dailyCheckListService.loadSubItems()
                        .success(function (data) {
                            that.subItemList = data;
                        });

                dailyCheckListService.loadItems()
                        .success(function (data) {
                            that.itemList = data;
                        });
                        
                dailyCheckListService.loadCheckedListByDate()
                        .success(function (data){
                            that.checkedList =data;
                        });
                        
            },
            
            saveCheckedSubItem: function (indexNo) {
                var that = this;
                var defer = $q;
                that.dailyCheckData.date = $filter('date')(new Date(), 'yyyy-MM-dd');

                if (that.dailyCheckData.indexNo === null) {
                    dailyCheckListService.saveCheckList(JSON.stringify(this.dailyCheckData))
                            .success(function (data) {
                                that.dailyCheckData.indexNo = data;
                                that.saveCheckSubItems(that.dailyCheckData.indexNo, indexNo);
                                defer.resolve(data);
                            })
                            .error(function () {
                                defer.reject();
                            });
                } else {
                    that.saveCheckSubItems(that.dailyCheckData.indexNo, indexNo);
                }
                return defer.promise;
            },
            
            saveCheckSubItems: function (checkListIndexNo, subItem) {
                var that = this;
                var defer = $q;

                this.subItemData.subItem = subItem;
                this.subItemData.time = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');

                dailyCheckListService.saveCheckSubItems(checkListIndexNo, JSON.stringify(this.subItemData))
                        .success(function (data) {
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
            },
            
            findByItem: function (item) {
                var that = this;
                dailyCheckListService.findByItems(item)
                        .success(function (data) {
                            that.findItemList = data;
                        });
            },

            itemLabel: function (items) {
                var item = "";
                angular.forEach(this.itemList, function (value) {
                    if (value.indexNo === items) {
                        item = value.name;
                        return;
                    }
                });
                return item;
            }

        };
        return dalyCheckListModel;
    };
    angular.module("appModule")
            .factory("dailyCheckListModel", factory);
}());
