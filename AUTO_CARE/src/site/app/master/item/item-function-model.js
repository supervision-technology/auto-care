(function () {
    var factory = function (ItemService, ItemModelFactory, $q) {
        function ItemFuctionModel() {
            this.constructor();
        }

        //prototype functions
        ItemFuctionModel.prototype = {
            //items
            items: [],
            //deparatment 
            departments: [],
            //brand
            brands: [],
            //category
            categorys: [],
            //sub-category
            subCategorys: [],
            //constructor
            constructor: function () {
                var that = this;
                that.data = ItemModelFactory.newData();
                // lord default values
                ItemService.loadItem()
                        .success(function (data) {
                            that.items = data;
                        });
                ItemService.loadDepartment()
                        .success(function (data) {
                            that.departments = data;
                        });
                ItemService.loadCategory()
                        .success(function (data) {
                            that.categorys = data;
                        });
                ItemService.loadBrand()
                        .success(function (data) {
                            that.brands = data;
                        });
                ItemService.loadSubCategory()
                        .success(function (data) {
                            that.subCategorys = data;
                        });
            }
        };
        return ItemFuctionModel;
    };
    angular.module("appModule")
            .factory("ItemFuctionModel", factory);
}());


