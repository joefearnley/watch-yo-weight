(function() {
    var app = angular.module('weighIn', ['ngRoute', 'ngAnimate']);

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

        $scope.pageClass = 'page-home';

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

    app.controller('ListController', function($scope) {
        $scope.pageClass = 'page-list';
    });

    app.controller('WeightController', function($scope) {
        $scope.pageClass = 'page-add';
    });
})();
