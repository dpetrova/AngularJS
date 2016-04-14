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
        'feed',
        function ($scope, feed) {

            feed.getProjectById()
                .then(function (project) {
                    $scope.currProject = project.data;
                    console.log($scope.currProject);
                });

        }]);
