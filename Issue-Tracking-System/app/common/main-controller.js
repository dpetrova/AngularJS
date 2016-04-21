angular.module('issueTracker.common', [
    'issueTracker.users.authentication',
    'issueTracker.notify'])
    //there is not any route -> don't need .config
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'identity',
        'authentication',
        '$location',
        'notify',
        function($scope, $http, identity, authentication, $location, notify) {

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
                $scope.isAuthenticated = false;
                authentication.logout();
                notify.showInfo("Logout successfully");
                $location.path('/');
            };

        }]);
