(function() {
    var dependencies = [
        'ngRoute',
        'ngAnimate',
        'firebase',
        'jcs-autoValidate',
        'chart.js'
    ];

    var app = angular.module('weighIn', dependencies);

    app.constant('FirebaseUrl', 'https://watch-yo-weight.firebaseio.com');

    app.run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/login');
            }
        });
    }]);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                resolve: {
                    'currentAuth': ['Auth', function(Auth) {
                        return Auth.$requireAuth();
                    }]
                }
            })
            .when('/list', {
                templateUrl: 'views/list.html',
                controller: 'ListController',
                resolve: {
                    'currentAuth': ['Auth', function(Auth) {
                        return Auth.$requireAuth();
                    }]
                }
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'AddWeightController',
                resolve: {
                    'currentAuth': ['Auth', function(Auth) {
                        return Auth.$requireAuth();
                    }]
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutController'
            });
    });

    app.factory('Auth', ['$firebaseAuth', 'rootRef',
        function($firebaseAuth, rootRef) {
            return $firebaseAuth(rootRef);
        }
    ]);

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

    app.factory('WeightService', function($http) {
        var url = 'https://watch-yo-weight.firebaseio.com/weights';
        return {
            all: function() {
                return $http.get(url);
            }
        };
    });

    app.controller('HomeController',
        function($scope, $filter, $location, weights, Auth, WeightService) {
            $scope.weights = weights.all();

            var chartData = {
                dates: [],
                weights: []
            };

            $scope.weights.$loaded().then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var weighInDate = $filter('date')(new Date(childSnapshot.date), 'M/d/yy');
                    chartData.dates.push(weighInDate);
                    chartData.weights.push(childSnapshot.weight);
                });

                $scope.labels = chartData.dates
                $scope.data = [chartData.weights];
            });

            WeightService.all().then(function(response) {
                console.log(response);
            });
    });

    app.controller('ListController', function($scope, weights) {
        $scope.weights = weights.all().reverse();
    });

    app.controller('AddWeightController', function($scope, $filter, $location, weights) {
        $scope.weighInDate = $filter('date')(new Date(), 'MM/dd/yyyy');

        $scope.addWeight = function() {
            var weighInDateParts = $scope.weighInDate.split('/')
            var weighInDate = weighInDateParts[2] + '-' + weighInDateParts[0] + '-' + weighInDateParts[1];
            weights.add(weighInDate, $scope.weight);

            $location.path('/list');
        };
    });

    app.controller('LoginController', function($scope, rootRef) {
        $scope.login = function() {
            rootRef.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function(error, authData) {
                if (error) {
                    console.log('Login Failed...redirecting.', error);
                } else {
                    window.location.href= '#/';
                }
            });
        }
    });

    app.controller('LogoutController', function($scope, $location, Auth) {
        $scope.init = function() {
            Auth.$unauth();
            $location.path('/login');
        }

        $scope.init();
    });
})();
