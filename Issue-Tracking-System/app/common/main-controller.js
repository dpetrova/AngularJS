angular.module('issueTracker.common', [])
    //there is not any route -> don't need .config
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'identity',
        'authentication',
        '$location',
        function($scope, $http, identity, authentication, $location) {

            identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                });

            $scope.isAuthenticated = identity.isAuthenticated();

            $scope.logout = function () {
                authentication.logout();
                $location.path('/');
            };

        }]);
