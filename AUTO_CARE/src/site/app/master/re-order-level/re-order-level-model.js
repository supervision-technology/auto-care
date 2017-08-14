(function () {
    var factory = function (reOrderLevelFactory, reOrderLevelService, $q, $filter) {
        function reOrderLevelModel() {
            this.constructor();
        }

        //prototype functions
        reOrderLevelModel.prototype = {
            //data model
            data:[],
            reOrderLevelList:[],
            branches:[],
            items:[],
            //constructor
            constructor: function () {
                var that = this;

                that.data = reOrderLevelFactory.data();

//                reOrderLevelService.loadReOrderLevel()
//                        .success(function (data) {
//                            that.reOrderLevelList = data;
//                        });
                this.loadReOrderLevel();
                reOrderLevelService.loadBranches()
                        .success(function (data) {
                            that.branches = data;
                        });
                reOrderLevelService.loadItems()
                        .success(function (data) {
                            that.items = data;
                        });


            },
            loadReOrderLevel:function (){
                var that=this;
                 reOrderLevelService.loadReOrderLevel()
                        .success(function (data) {
                            that.reOrderLevelList = [];
                            angular.forEach(data,function (reOrder){
                                reOrder.itemName=that.itemLabel(reOrder.item);
                                that.reOrderLevelList.push(reOrder);
                            });
                            
                        });
            },

            save: function () {
                var defer = $q.defer();
                var that = this;
                console.log(this.data);
                reOrderLevelService.save(JSON.stringify(this.data))
                        .success(function (data) {
                            that.data = reOrderLevelFactory.data();
                            that.loadReOrderLevel();
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            itemLabel: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.barcode + "-" + value.name;
                        return;
                    }
                });
                return item;
            },
            getItemLabel: function (indexNo) {
                console.log(indexNo);
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value;
                        return;
                    }
                });
                return item;
            },
            branchLabel: function (indexNo) {
                var label;
                angular.forEach(this.branches, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        label = value.branchCode + " - " + value.name;
                        return;
                    }
                });
                
                return label;
            }

        };
        return reOrderLevelModel;
    };
    angular.module("appModule")
            .factory("reOrderLevelModel", factory);
}());


