angular.module('issueTracker.profile', [
    'issueTracker.users.authentication',
    'issueTracker.notify'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/users/profile.html',
            controller: 'ProfileCtrl'
        });
    }])
    .controller('ProfileCtrl', [
        '$scope',
        '$location',
        'authentication',
        'notify',
        function($scope, $location, authentication, notify) {

            $scope.changePass = function (user) {
                authentication.changePassword(user)
                    .then(function(response){
                        //console.log(response);
                        notify.showInfo("Changed password successfully");
                        $location.path('/dashboard');
                    },
                    function error(err) {
                        notify.showError("Changed password failed", err);
                    }
                );
            };

        }]);