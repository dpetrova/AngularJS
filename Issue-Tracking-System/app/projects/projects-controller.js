angular.module('issueTracker.projects', [
    'issueTracker.projects.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsCtrl'
        });
    }])
    .controller('ProjectsCtrl', [
        '$scope',
        'feed',
        function ($scope, feed) {

            feed.getAllProjects(10, 1)
                .then(function (allProjects) {
                    $scope.allProjects = allProjects.data;
                });

        }]);
