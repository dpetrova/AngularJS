angular.module('issueTracker.home', [
    'issueTracker.users.authentication',
    'issueTracker.notify'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        'notify',
        function($scope, $location, authentication, notify) {

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        //console.log(loggedInUser);
                        notify.showInfo("Login successfully");
                        $location.path('/dashboard');
                    },
                    function error(err) {
                        notify.showError("Login failed", err);
                    }
                );
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        //console.log(registeredUser);
                        notify.showSuccess("Register successfully");
                        $location.path('/dashboard');
                    },
                    function error(err) {
                        notify.showError("Register failed", err);
                    }
                );
            };

        }]);
