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
                controller: 'AddWeightController'
            });
    });

    app.constant('FirebaseUrl', 'https://watch-yo-weight.firebaseio.com');

    app.service('rootRef', ['FirebaseUrl', Firebase]);

    app.service('weights', function(rootRef, $firebase, $firebaseArray) {
        var weightsRef = rootRef.child('weights');

        this.get = function(date) {
            return $firebase(weightsRef.child(date));
        }

        this.all = function() {
            return $firebaseArray(weightsRef);
        }
    });

    app.controller('HomeController', function($scope, $filter, weights) {

        $scope.weights = weights.all();

        var url = 'https://watch-yo-weight.firebaseio.com/weights';
        var ref = new Firebase(url);
        var chartData = {
            dates: [],
            weights: []
        };

        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var weighInDate = $filter('date')(new Date(childSnapshot.val().date), 'm/d/yyyy');
                chartData.dates.push(weighInDate);
                chartData.weights.push(childSnapshot.val().weight);
            });

            console.log(chartData.dates);
            console.log(chartData.weights);


            new Chartist.Line('.ct-chart', {
                labels: chartData.dates,
                series: [chartData.weights]
            }, {
                low: 150
            });

            $('#chart').fadeIn();
        });
    });

    app.controller('ListController', function($scope, weights) {
        $scope.weights = weights.all();
    });

    app.controller('AddWeightController', function($scope) {
        $scope.addWeight = function() {
            console.log($scope.weight);
            console.log($scope.date);
        }
    });

})();
