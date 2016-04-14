angular.module('issueTracker.common', [])
    //there is not any route -> don't need .config
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'identity',
        function($scope, $http, identity) {

            identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                });

            $scope.isAuthenticated = identity.isAuthenticated();

        }]);
