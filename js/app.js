(function () {
    var app = angular.module('weighIn');

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/list', {
                templateUrl: 'views/list',
                controller: 'ListController'
            })
            .when('/add', {
                templateUrl: 'views/add-weight.html',
                controller: 'WeightController'
            });
    });


    app.controller('HomeController', function() {

        new Chartist.Line('.ct-chart', {
            labels: response.dates,
            series: [response.weights]
        }, {
            low: 150
        });

        $('#loading').hide();
        $('#chart').show();
    });
})();