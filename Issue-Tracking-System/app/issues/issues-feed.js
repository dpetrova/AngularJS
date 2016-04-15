angular.module('issueTracker.issues.feed', [])
    .factory('issuesFeed', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllProjectIssues(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + projectId + '/Issues')
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            function getAllIssuesByFilter(pageSize, pageNumber, filter, filterValue) {
                var deferred = $q.defer();

                $http.get(BASE_URL + '/Issues/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&' + filter + '=' + filterValue)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            function getMyIssues(pageSize, pageNumber, by) {
                var deferred = $q.defer();

                $http.get(BASE_URL + '/Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + by)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            function getIssueById(issueId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + issueId)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    });

                return deferred.promise;
            }

            return {
                getAllProjectIssues: getAllProjectIssues,
                getAllIssuesByFilter: getAllIssuesByFilter,
                getMyIssues: getMyIssues,
                getIssueById: getIssueById
            };
        }]);

