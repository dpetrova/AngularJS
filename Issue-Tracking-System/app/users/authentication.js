angular.module('issueTracker.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function register(user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Register',
                    data: user
                }).then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: $.param({grant_type: 'password', username: user.username, password: user.password}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(error) {
                    console.log(error);
                });

                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Logout'
                }).then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            return {
                registerUser: register,
                loginUser: login,
                logout: logout
            }
        }]);
