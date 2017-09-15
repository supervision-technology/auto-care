(function () {
//module
    angular.module("vehicleImageManage", ['ui.bootstrap', 'ngCookies']);
    //controller
    angular.module("vehicleImageManage")
            .controller("vehicleImageController", function ($scope, ConfirmPane, optionPane, vehicleImageModel, systemConfig, $cookies) {
                $scope.model = new vehicleImageModel();
                $scope.ui = {};
                $scope.imagemodelX = [];
                $scope.imagemodel = [];

                $scope.ui.imageShowMode1 = 'NotAvalable';
                $scope.ui.imageShowMode2 = 'NotAvalable';
                $scope.ui.imageShowMode3 = 'NotAvalable';
                $scope.ui.imageShowMode4 = 'NotAvalable';
                $scope.ui.imageShowMode5 = 'NotAvalable';
                $scope.ui.imageShowMode6 = 'NotAvalable';

                $scope.selectedJobCardIndexNo = null;
                $scope.ui.selectedJobCardRow = function (jobCard) {
                    $scope.selectedJobCardIndexNo = jobCard.indexNo;

                    $scope.imagemodelX = [];
                    $scope.model.loadVehicleImages($scope.selectedJobCardIndexNo)
                            .then(function (data) {
                                if (data.length > 0) {
                                    $scope.ui.imageShowMode1 = 'Avalable';
                                    $scope.ui.imageShowMode2 = 'Avalable';
                                    $scope.ui.imageShowMode3 = 'Avalable';
                                    $scope.ui.imageShowMode4 = 'Avalable';
                                    $scope.ui.imageShowMode5 = 'Avalable';
                                    $scope.ui.imageShowMode6 = 'Avalable';

                                    for (var i = 0; i < data.length; i++) {
                                        $scope.imagemodelX[i] = systemConfig.apiUrl + "/api/care-point/transaction/job-card/download-image/" + data[i];
                                    }
                                } else {
                                    $scope.ui.imageShowMode1 = 'NotAvalable';
                                    $scope.ui.imageShowMode2 = 'NotAvalable';
                                    $scope.ui.imageShowMode3 = 'NotAvalable';
                                    $scope.ui.imageShowMode4 = 'NotAvalable';
                                    $scope.ui.imageShowMode5 = 'NotAvalable';
                                    $scope.ui.imageShowMode6 = 'NotAvalable';
                                }

                            }, function () {

                            });
                };


                $scope.ui.removeImage = function (imageIndex, imageShowMode1) {

                    if (imageShowMode1 === "imageShowMode1") {
                        $scope.ui.imageShowMode1 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode2") {
                        $scope.ui.imageShowMode2 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode1") {
                        $scope.ui.imageShowMode1 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode3") {
                        $scope.ui.imageShowMode3 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode4") {
                        $scope.ui.imageShowMode4 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode5") {
                        $scope.ui.imageShowMode5 = 'NotAvalable';
                    }

                    if (imageShowMode1 === "imageShowMode6") {
                        $scope.ui.imageShowMode6 = 'NotAvalable';
                    }

                    $scope.imagemodelX.splice(imageIndex, 1);
                };

                $scope.ui.changeFunction = function (event) {
                    if ($scope.ui.imageShowMode1 === 'NotAvalable') {
                        $scope.ui.imageShowMode1 = 'Avalable';

                    } else if ($scope.ui.imageShowMode2 === 'NotAvalable') {
                        $scope.ui.imageShowMode2 = 'Avalable';

                    } else if ($scope.ui.imageShowMode3 === 'NotAvalable') {
                        $scope.ui.imageShowMode3 = 'Avalable';

                    } else if ($scope.ui.imageShowMode4 === 'NotAvalable') {
                        $scope.ui.imageShowMode4 = 'Avalable';

                    } else if ($scope.ui.imageShowMode5 === 'NotAvalable') {
                        $scope.ui.imageShowMode5 = 'Avalable';

                    } else if ($scope.ui.imageShowMode6 === 'NotAvalable') {
                        $scope.ui.imageShowMode6 = 'Avalable';
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


                $scope.ui.uploardImages = function () {

                    ConfirmPane.successConfirm("SAVE JOB CARD IMAGES")
                            .confirm(function () {

                                if ($scope.imagemodel.length < 6) {
                                    optionPane.dangerMessage("PLEASE SELECT ALL IMAGES");
                                } else {

                                    for (var i = 0; i < $scope.imagemodel.length; i++) {
                                        var url = systemConfig.apiUrl + "/api/care-point/transaction/job-card/upload-image/" + $scope.selectedJobCardIndexNo + "/" + i;
                                        var formData = new FormData();
                                        formData.append("file", $scope.imagemodel[i]);

                                        var token = $cookies.get('XSRF-TOKEN');
                                        var xhr = new XMLHttpRequest();
                                        xhr.open("POST", url);
                                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                                        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                                        xhr.setRequestHeader("X-XSRF-TOKEN", token);
                                        xhr.send(formData);

                                        //ProgressPane.successProgress("Loading..." + i + "image details").close();
                                    }

                                    optionPane.successMessage("SAVE JOB CARD IMAFES SUCCESSFULLY!");
                                }

                            });
                };
            });
}());

