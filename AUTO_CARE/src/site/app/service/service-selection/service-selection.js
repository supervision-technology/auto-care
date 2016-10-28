(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope) {
                $scope.selectionsFunction = true;
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
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
                        contactNumber: "0714303339"
                    },
                    {
                        image: "/img/03.png",
                        number: "OP 7895",
                        customerName: "Nidura Prageeth",
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

                $scope.selectedRow = null;
                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle == $index ? -1 : $index;
                };

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
                                }
                            ]
                        }
                    }
                ];

                $scope.packageSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.packagePositionVehicle = $scope.packagePositionVehicle == $index ? -1 : $index;
                };

                $scope.service = [
                    {
                        name: "Interior Detailing",
                        price: 10000.00,
                        discription: "-"
                    },
                    {
                        name: "LUBRICATION",
                        price: 13000.00,
                        discription: "-"
                    },
                    {
                        name: "VACUUM FLOOR / SEATS & TRUNK",
                        price: 13000.00,
                        discription: "-"
                    },
                    {
                        name: "TYRE & DASH DRESSING",
                        price: 13000.00,
                        discription: "-"
                    },
                    {
                        name: "EXTERIOR WAXING",
                        price: 13000.00,
                        discription: "-"
                    },
                    {
                        name: "VISUAL SAFETY CHECK",
                        price: 13000.00,
                        discription: "-"
                    }
                ];

                $scope.serviceSelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.servicePositionVehicle = $scope.servicePositionVehicle == $index ? -1 : $index;
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

                $scope.history = [
                    {
                        invoiceNumber: "I0005",
                        amount: 25000.00,
                        date: "2016-02-05",
                        discription: {
                            items: [
                                {
                                    name: "Pac 01",
                                    unitprice: 15000.00,
                                    qty: 1,
                                    amount: 15000.00
                                },
                                {
                                    name: "O.Filters",
                                    unitprice: 7000.00,
                                    qty: 1,
                                    amount: 7000.00
                                },
                                {
                                    name: "Carpet",
                                    unitprice: 1700.00,
                                    qty: 2,
                                    amount: 3000.00
                                }
                            ]
                        }
                    },
                    {
                        invoiceNumber: "123456",
                        amount: 15000.00,
                        date: "2016-02-05",
                        discription: {
                            items: [
                                {
                                    name: "Pac 01",
                                    unitprice: 15000.00,
                                    qty: 1,
                                    amount: 15000.00
                                }
                            ]
                        }
                    }
                ];
                $scope.historySelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.historyActivePosition = $scope.historyActivePosition == $index ? -1 : $index;
                };

                $scope.selections = [
                    {
                        name: "package 01",
                        qty: 1,
                        type: "P",
                        amount: "6000.00",
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
                        type: "I",
                        name: "Interior Detailing",
                        qty: 1,
                        amount: "7000.00"
                    },
                    {
                        name: "Oil Filters",
                        type: "I",
                        qty: 2,
                        amount: "28000.00"
                    }
                ];
                $scope.selectionsSelectionDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.selectionsActivePosition = $scope.selectionsActivePosition == $index ? -1 : $index;
                };
            });
}());