angular.module('issueTracker.projects.feed', [])
    .factory('feed', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllProjects(pageSize, pageNumber) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/?filter=&pageSize=' +pageSize + '&pageNumber=' + pageNumber)
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


            function addProject(newProject) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Projects/', newProject)
                    .then(function (project) {
                        deferred.resolve(project);
                    });

                return deferred.promise;
            }


            function editProject(projectId, modifiedProject) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + projectId, modifiedProject)
                    .then(function (project) {
                        deferred.resolve(project);
                    });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                editProject: editProject
            };
        }]);
