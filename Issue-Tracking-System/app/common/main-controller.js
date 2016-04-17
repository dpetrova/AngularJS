angular.module('issueTracker.common', [])
    //there is not any route -> don't need .config
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'identity',
        'authentication',
        function($scope, $http, identity, authentication) {

            identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                });

            $scope.isAuthenticated = identity.isAuthenticated();

            $scope.logout = function () {
                authentication.logout();
            };

        }]);
