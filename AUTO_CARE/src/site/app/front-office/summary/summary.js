(function () {
    angular.module("summaryModule", []);

    angular.module("summaryModule")
            .controller("SummaryController", function ($scope) {
                $scope.selectionsFunction = true;

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

                $scope.selectedRow = null;
                $scope.vehicleSelectionDetail = function ($index) {
                    $scope.selectedRow = $index;
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.activePositionVehicle = $scope.activePositionVehicle == $index ? -1 : $index;
                };
            });


}());

