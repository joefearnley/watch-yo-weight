(function() {
    var dependencies = ['ngRoute', 'ngAnimate', 'firebase', 'jcs-autoValidate'];

    var app = angular.module('weighIn', dependencies);

    app.constant('FirebaseUrl', 'https://watch-yo-weight.firebaseio.com');

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

    app.service('rootRef', ['FirebaseUrl', Firebase]);

    app.service('weights', function(rootRef, $firebaseObject, $firebaseArray) {
        var weightsRef = rootRef.child('weights');

        this.get = function(date) {
            return $firebaseObject(weightsRef.child(date));
        }

        this.all = function() {
            return $firebaseArray(weightsRef);
        }

        this.add = function(weighInDate, weight) {
            var allWeights = $firebaseArray(weightsRef);

            var newWeight = {
                'date': weighInDate,
                'weight': weight
            };

            allWeights.$add(newWeight).then(function(ref) {
                return ref.key();
            });
        }
    });

    app.controller('HomeController', function($scope, $filter, weights) {

        $scope.weights = weights.all();

        var chartData = {
            dates: [],
            weights: []
        };

        $scope.weights.$loaded().then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var weighInDate = $filter('date')(new Date(childSnapshot.date), 'm/d/yyyy');
                chartData.dates.push(weighInDate);
                chartData.weights.push(childSnapshot.weight);
            });

            new Chartist.Line('.ct-chart', {
                labels: chartData.dates,
                series: [chartData.weights]
            });
        });
    });

    app.controller('ListController', function($scope, weights) {
        $scope.weights = weights.all();
    });

    app.controller('AddWeightController', function($scope, $filter, $location, weights) {
        $scope.weighInDate = $filter('date')(new Date(), 'MM/dd/yyyy');

        $scope.addWeight = function() {
            var weighInDateParts = $scope.weighInDate.split('/')
            var weighInDate = weighInDateParts[2] + '-' + weighInDateParts[0] + '-' + weighInDateParts[1];
            weights.add(weighInDate, $scope.weight);

            $location.path('/list');
        }
    });

})();
