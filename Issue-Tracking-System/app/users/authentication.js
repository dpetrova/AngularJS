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
                }).then(function success(response) {
                        deferred.resolve(response.data);
                    }, function error(error) {
                        deferred.reject(error.data.message);
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
                }).then(function success(response) {
                    deferred.resolve(response.data);
                    var token = response.data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    sessionStorage.setItem('user', angular.toJson(response.data));
                    sessionStorage.headers = 'Bearer ' + token;
                    sessionStorage.userName = response.data.userName;
                }, function error(error) {
                    deferred.reject(error.data.message);
                });

                return deferred.promise;
            }

            function logout() {
                sessionStorage.clear();
                $http.defaults.headers.common.Authorization = null;

            }

            function getCurrentUser() {
                var defer = $q.defer();
                $http.get(BASE_URL + 'users/me', {headers: {'Authorization': sessionStorage.headers}})
                    .then(function (response) {
                        defer.resolve(response.data);
                        //console.log(response.data)
                    }, function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            }


            function changePassword(user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Account/ChangePassword',
                    data: $.param({grant_type: 'password', OldPassword: user.oldPassword, NewPassword: user.newPassword, ConfirmPassword: user.confirmPassword}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(error) {
                    deferred.reject(error.data.message);
                });

                return deferred.promise;
            }


            return {
                registerUser: register,
                loginUser: login,
                logout: logout,
                getCurrentUser: getCurrentUser,
                changePassword: changePassword
            }
        }]);
