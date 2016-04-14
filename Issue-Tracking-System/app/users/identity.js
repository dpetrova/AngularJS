angular.module('issueTracker.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            var deferred = $q.defer();

            var currentUser = angular.fromJson(sessionStorage.user);

            if(currentUser){
                var accessToken = currentUser.access_token;

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

                $http.get(BASE_URL + 'users/me')
                    .then(function(response) {
                        currentUser = response.data;
                        deferred.resolve(currentUser);
                    });
            }

            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    if(accessToken){
                        return true;
                    } else{
                        return false;
                    }
                }
            };
        }]);
