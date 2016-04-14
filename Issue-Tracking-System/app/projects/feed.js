angular.module('issueTracker.projects.feed', [])
    .factory('feed', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
            function all() {

                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects')
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            return {
                all: all
            };
        }]);
