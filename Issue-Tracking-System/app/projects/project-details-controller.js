angular.module('issueTracker.projectsDetails', [
    'issueTracker.projects.feed',
    'issueTracker.issues.feed'
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
        'issuesFeed',
        function ($scope, $routeParams, feed, issuesFeed) {

            feed.getProjectById($routeParams.projectId)
                .then(function (project) {
                    $scope.currProject = project.data;
                    //console.log($scope.currProject);
                });

            issuesFeed.getAllProjectIssues($routeParams.projectId)
                .then(function (issues) {
                    $scope.projectIssues = issues.data;
                    //console.log($scope.projectIssues);
                });

        }]);
