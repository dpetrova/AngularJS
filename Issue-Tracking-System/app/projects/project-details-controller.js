angular.module('issueTracker.projectsDetails', [
    'issueTracker.projects.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'app/projects/project-details.html',
            controller: 'ProjectDetailsCtrl'
        });
    }])
    .controller('ProjectDetailsCtrl', [
        '$scope',
        '$routeParams',
        'feed',
        function ($scope, $routeParams, feed) {

            feed.getProjectById($routeParams.projectId)
                .then(function (project) {
                    $scope.currProject = project.data;
                    console.log($scope.currProject);
                });

        }]);
