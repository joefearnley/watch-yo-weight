(function() {
    var app = angular.module('weighIn', ['ngRoute', 'ngAnimate', 'firebase']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/list', {
                templateUrl: 'views/list.html',
                controller: 'ListController'
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'WeightController'
            });
    });

    app.controller('HomeController', function($scope) {

        //new Chartist.Line('.ct-chart', {
        //    labels: response.dates,
        //    series: [response.weights]
        //}, {
        //    low: 150
        //});
        //
        //$('#loading').hide();
        //$('#chart').show();
    });

    app.controller('ListController', function($scope, $firebaseObject) {
        //$scope.weights = getData();

        var rootRef =
    });

    app.controller('WeightController', function($scope) {
        $scope.pageClass = 'page-add';
    });

    function getData() {
        return [{
            "date": '2016-01-03',
            "weight": 183.00
        }, {
            "date": '2016-01-09',
            "weight": 180.00
        }, {
            "date": '2016-01-16',
            "weight": 178.00
        }, {
            "date": '2016-01-29',
            "weight": 177.00
        }, {
            "date": '2016-02-06',
            "weight": 173.50
        }, {
            "date": '2016-02-09',
            "weight": 175.00
        }, {
            "date": '2016-02-12',
            "weight": 173.00
        }, {
            "date": '2016-02-18',
            "weight": 172.00
        }, {
            "date": '2016-02-20',
            "weight": 170.00
        }, {
            "date": '2016-02-26',
            "weight": 169.60
        }, {
            "date": '2016-03-03',
            "weight": 172.30
        }, {
            "date": '2016-03-08',
            "weight": 175.30
        }];
    }
})();
