angular.module('issueTracker.users.feed', [])
    .factory('usersFeed', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllUsers() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'users')
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            return {
                getAllUsers: getAllUsers

            };
        }]);
