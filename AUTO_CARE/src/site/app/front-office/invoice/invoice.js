(function () {
    angular.module("invoiceModule", []);

    angular.module("invoiceModule")
            .controller("invoiceController", function ($scope) {
                $scope.selectionsFunction = true;
                $scope.selectedRow = null;
                $scope.total = "100";

                $scope.package = [
                    {
                        name: "package 01",
                        price: 6000.00,
                        discription: {
                            items: [
                                {
                                    indexNo: "001",
                                    name: "Body Wash & Vacuum"
                                },
                                {
                                    indexNo: "002",
                                    name: "Undercarriage Wash"
                                },
                                {
                                    indexNo: "003",
                                    name: "Oil Change"
                                },
                                {
                                    indexNo: "004",
                                    name: "Waxing"
                                },
                                {
                                    indexNo: "005",
                                    name: "Interior Claning & Engine Repaire"
                                },
                                {
                                    indexNo: "006",
                                    name: "A/C Repair"
                                }
                            ]
                        }
                    },
                    {
                        name: "package 02",
                        price: 4000.00,
                        discription: {
                            items: [
                                {
                                    indexNo: "001",
                                    name: "Body Wash & Vacuum"
                                },
                                {
                                    indexNo: "002",
                                    name: "Undercarriage Wash"
                                },
                                {
                                    indexNo: "003",
                                    name: "Oil Change"
                                },
                                {
                                    indexNo: "004",
                                    name: "Waxing"
                                }
                            ]
                        }
                    },
                    {
                        name: "package 03",
                        price: 10000.00,
                        discription: {
                            items: [
                                {
                                    indexNo: "001",
                                    name: "Body Wash & Vacuum"
                                },
                                {
                                    indexNo: "002",
                                    name: "Undercarriage Wash"
                                },
                                {
                                    indexNo: "003",
                                    name: "Oil Change"
                                },
                                {
                                    indexNo: "004",
                                    name: "Waxing"
                                },
                                {
                                    indexNo: "005",
                                    name: "Interior Claning & Engine Repaire"
                                },
                                {
                                    indexNo: "006",
                                    name: "A/C Repair"
                                },
                                {
                                    indexNo: "007",
                                    name: "Engine Tuning & Scanning"
                                },
                                {
                                    indexNo: "008",
                                    name: "Weel Alignment"
                                },
                                {
                                    indexNo: "009",
                                    name: "Tyre & Battery Service"
                                },
                            ]
                        }
                    }
                ];

                $scope.packageSelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.packagePositionVehicle = $scope.packagePositionVehicle == $index ? -1 : $index;
                };

                $scope.items = [
                    {
                        name: "Oil Filters",
                        price: 7000.00,
                        discription: "-"
                    },
                    {
                        name: "Cables",
                        price: 13000.00,
                        discription: "-"
                    }
                ];

                $scope.itemSelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.itemActivePosition = $scope.itemActivePosition == $index ? -1 : $index;
                };

                $scope.service = [
                    {
                        name: "Interior Detailing",
                        price: 10000.00,
                        discription: "Removal of seats,Cleaning of seats,Drying of seats,Vacuum cleaning,Cleaning of floor boards,Cleaning of dashboard,Cleaning of hood"
                    },
                    {
                        name: "LUBRICATION",
                        price: 13000.00,
                        discription: "We top up engine oil, transmission fluid, brake fluid, clutch & power steering fluid up to optimal capacity or completely change it using high performance brand lubricants. ."
                    },
                    {
                        name: "VACUUM FLOOR / SEATS & TRUNK",
                        price: 13000.00,
                        discription: "We vacuum the cabin interior, seats and trunk to ensure removal of dust and particle accumulation"
                    },
                    {
                        name: "TYRE & DASH DRESSING",
                        price: 13000.00,
                        discription: "We restore the true colour and natural gloss to the dashboard and leaves tyres looking new."
                    },
                    {
                        name: "EXTERIOR WAXING",
                        price: 13000.00,
                        discription: "We apply a hard wax with a clear coat that produces a high-gloss finish to new or old car paint. The wax also acts as a protective layer that helps maintain the paint and protect it for longer."
                    },
                    {
                        name: "VISUAL SAFETY CHECK",
                        price: 13000.00,
                        discription: "A detailed feedback form is issued after every full lubrication service."
                    }
                ];

                $scope.vehicle = [
                    {
                        image: "/img/01.png",
                        number: "WC 3351",
                        customerName: "Kavish Manjitha",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/02.png",
                        number: "MM 4488",
                        customerName: "Kasun Chamara",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/04.png",
                        number: "QT 8956",
                        customerName: "Mohan",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/05.png",
                        number: "UG 7256",
                        customerName: "Mohan",
                        contactNumber: "0714303339"
                    }
                ];

                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle == $index ? -1 : $index;
                };

                $scope.calNetAmount1 = function (discount) {
                    $scope.netAmount = $scope.total - discount;
                }
                
                $scope.calNetAmount2 = function (discount) {
                    var disValue = $scope.total * (discount / 100);
                    $scope.netAmount = $scope.total - disValue;
                    $scope.discount1 = disValue;
                }
            });


}());
