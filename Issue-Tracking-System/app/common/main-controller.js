angular.module('issueTracker.common', [])
    //той не отговаря на никакъв route -> нямаме нужда от .config
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
