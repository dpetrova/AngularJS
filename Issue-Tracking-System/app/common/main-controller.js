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
                    console.log($scope.currentUser);
                });

            authentication.getCurrentUser()
                .then(function(data){
                    //$scope.currentUser = data;
                    $scope.currentUser.Id = data.Id;
                    $scope.currentUser.isAdmin = data.isAdmin;
                    $scope.currentUser.Username = data.Username;
                });

            $scope.isAuthenticated = identity.isAuthenticated();

            $scope.logout = function () {
                authentication.logout();
                $location.path('/');
            };

        }]);
