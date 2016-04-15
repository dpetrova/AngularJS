angular.module('issueTracker.projects.feed', [])
    .factory('feed', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects')
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            function getProjectById(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + projectId)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById
            };
        }]);
