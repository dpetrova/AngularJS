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

            feed.getAllProjects()
                .then(function (allProjects) {
                    $scope.allProjects = allProjects.data;
                });

            //$scope.viewProject = function(projectId){
            //    feed.getProjectById(projectId)
            //        .then(function (project) {
            //            $scope.currProject = project.data;
            //            console.log($scope.currProject)
            //        });
            //};

        }]);
