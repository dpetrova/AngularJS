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
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }

            function getAllIssuesByFilter(pageSize, pageNumber, filter, filterValue) {
                var deferred = $q.defer();

                $http.get(BASE_URL + '/Issues/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&' + filter + '=' + filterValue)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    },function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }

            //function getMyIssues(by, pageSize, pageNumber) {
            //    var deferred = $q.defer();
            //    $http.get(BASE_URL + '/issues/me?orderBy=' + by + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber)
            //        .then(function (feed) {
            //            deferred.resolve(feed.data);
            //        }, function (error) {
            //            defer.reject(error.data.message)
            //        });
            //
            //    return deferred.promise;
            //}

            function getMyIssues(pageSize, pageNumber, by) {
                var deferred = $q.defer();
                $http.get(BASE_URL + '/issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + by)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }

            function getIssueById(issueId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + issueId)
                    .then(function (feed) {
                        deferred.resolve(feed);
                    }, function (error) {
                        defer.reject(error.data.message)
                });

                return deferred.promise;
            }

            function getAllComments(issueId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + issueId +'/comments')
                    .then(function (comments) {
                        deferred.resolve(comments);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }

            function postComment(issueId, newComment) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/' + issueId +'/comments', newComment)
                    .then(function (comment) {
                        deferred.resolve(comment);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }


            function addIssue(projectId, newIssue) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/', newIssue)
                    .then(function (issue) {
                        deferred.resolve(issue);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }


            function modifyIssue(issueId, modifiedIssue) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + issueId, modifiedIssue)
                    .then(function (issue) {
                        deferred.resolve(issue);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }

            function changeStatus(issueId, statusId) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId, null)
                    .then(function (statuses) {
                        deferred.resolve(statuses);
                    }, function (error) {
                        defer.reject(error.data.message)
                    });

                return deferred.promise;
            }


            return {
                getAllProjectIssues: getAllProjectIssues,
                getAllIssuesByFilter: getAllIssuesByFilter,
                getMyIssues: getMyIssues,
                getIssueById: getIssueById,
                getAllComments: getAllComments,
                postComment: postComment,
                modifyIssue: modifyIssue,
                addIssue: addIssue,
                changeStatus: changeStatus
            };
        }]);

