(function () {
    angular.module("appModule")
            .controller("employeeController", function ($scope, employeeModel, systemConfig, $timeout, Notification) {
                $scope.model = new employeeModel();
                $scope.ui = {};

                // <Image-upload>-----------------------------Image Upload-----------------------------------
                $scope.imagemodel = [];
                $scope.imagemodelX = [];
                $scope.ui.imageShowMode1 = 'NotAvalable';
                $scope.ui.changeFunction = function (event) {
                    if ($scope.ui.imageShowMode1 === 'NotAvalable') {
                        $scope.ui.imageShowMode1 = 'Avalable';
                    }
                    var files = event.target.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.imagemodel.push(file);

                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };
                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imagemodelX.push(e.target.result);
                    });
                };
                $scope.ui.showImg = function () {
                    if ($scope.imageModel) {
                        $scope.ui.showImg;
                    }
                };
                $scope.ui.saveImage = function (indexNo, name) {
//                    var employeeNo = $scope.model.employee.indexNo;
                    for (var i = 0; i < $scope.imagemodel.length; i++) {
                        var url = systemConfig.apiUrl + "/api/care-point/master/employee/upload-image/" + name + "/" + indexNo;
                        var formData = new FormData();
                        formData.append("file", $scope.imagemodel[i]);

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", url);
                        xhr.send(formData);
                    }
                };
                $scope.ui.save = function () {
                    $scope.model.saveEmployee()
                            .then(function (data) {
                                $scope.ui.saveImage(data.indexNo, data.name);
                                $scope.model.employeeData = {};
                                $scope.imagemodel = [];
                                $scope.imagemodelX = [];
                                $scope.ui.imageShowMode1 = 'NotAvalable';
                                Notification.success("Save Success...!!");
                            }, function () {

                            });
                };
                $scope.ui.clearImage = function () {
                    console.log("sdsdsd");
                    $scope.imagemodel = [];
                    $scope.imagemodelX = [];
                    $scope.ui.imageShowMode1 = 'NotAvalable';
                };
// </Image-upload>-----------------------------Image Upload-----------------------------------

                //focus
                $scope.ui.focus = function () {
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);
                };
                //new
                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $scope.ui.focus();
                };


                $scope.ui.init = function () {
                    $scope.ui.mode = "IDEAL";

                };
                $scope.ui.init();
            });
}());