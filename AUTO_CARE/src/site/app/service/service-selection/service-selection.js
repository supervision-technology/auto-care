(function () {
//module
    angular.module("serviceSelectionModule", ['ui.bootstrap']);
    //controller
    angular.module("serviceSelectionModule")
            .controller("serviceSelectionController", function ($scope) {
                $scope.package = [
                    {
                        name: "package 01",
                        price: 10000.00,
                        discription:"Body wash, and tyre dressing (15 Minutes)"
                    },
                    {
                        name: "package 02",
                        price: 13000.00,
                        discription:"Body wash, carpet wash, glass cleaning, dash cleaning and tyre dressing (30 Minutes)"
                    },
                    {
                        name: "package 03",
                        price: 5000.00,
                        discription:"Body wash, carpet wash, glass cleaning, tyre dressing, interior vacuuming, and 3M wax (45 Minutes)"
                    },
                    {
                        name: "package 04",
                        price: 5000.00,
                        discription:"Body wash, carpet wash, glass cleaning, dash cleaning and tyre dressing (30 Minutes)"
                    },
                    {
                        name: "package 05",
                        price: 15000.00,
                        discription:"Body wash, under wash, carpet wash, glass cleaning and interior vacuuming (20 Minutes)"
                    }
                ];
                $scope.service = [
                    {
                        name: "Interior Detailing",
                        price: 10000.00,
                        discription:"Removal of seats,Cleaning of seats,Drying of seats,Vacuum cleaning,Cleaning of floor boards,Cleaning of dashboard,Cleaning of hood"
                    },
                    {
                        name: "Exterior Detailing",
                        price: 13000.00,
                        discription:"Body wash,Cut,Polish,Wax"
                    },
                    {
                        name: "LUBRICATION",
                        price: 13000.00,
                        discription:"We top up engine oil, transmission fluid, brake fluid, clutch & power steering fluid up to optimal capacity or completely change it using high performance brand lubricants. ."
                    },
                    {
                        name: "UNDERCARRIAGE DEGREASING",
                        price: 13000.00,
                        discription:"We completely degrease the undercarriage of the automobile, removing accumulated oil and grit using the application of pressure washes with advanced pressure sensors."
                    },
                    {
                        name: "VACUUM FLOOR / SEATS & TRUNK",
                        price: 13000.00,
                        discription:"We vacuum the cabin interior, seats and trunk to ensure removal of dust and particle accumulation"
                    },
                    {
                        name: "WINDSCREEN & GLASS CLEANING",
                        price: 13000.00,
                        discription:"Our glass treatment improves wet weather driving visibility. The treatment uses a non-streaking formula, ammonia free and safe for tinted windows. This is ideal for high humidity conditions."
                    },
                    {
                        name: "TYRE & DASH DRESSING",
                        price: 13000.00,
                        discription:"We restore the true colour and natural gloss to the dashboard and leaves tyres looking new."
                    },
                    {
                        name: "EXTERIOR WAXING",
                        price: 13000.00,
                        discription:"We apply a hard wax with a clear coat that produces a high-gloss finish to new or old car paint. The wax also acts as a protective layer that helps maintain the paint and protect it for longer."
                    },
                    {
                        name: "VISUAL SAFETY CHECK",
                        price: 13000.00,
                        discription:"A detailed feedback form is issued after every full lubrication service."
                    }
                ];
                $scope.items = [
                    {
                        name: "Oil Filters",
                        price: 7000.00,
                        discription:"-"
                    },
                    {
                        name: "Cables",
                        price: 13000.00,
                        discription:"-"
                    }
                ];
                $scope.toggleDetail = function ($index) {
                    $scope.isVisible = $scope.isVisible == 0 ? true : false;
                    $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
                };
            });
}());