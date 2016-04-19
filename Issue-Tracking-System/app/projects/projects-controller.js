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

            $scope.projectsParams = {
                'pageSize' : 10,
                'startPage' : 1
            };

            $scope.reloadProjects = function() {
                feed.getAllProjects($scope.projectsParams.pageSize, $scope.projectsParams.startPage)
                    .then(function (allProjects) {
                        $scope.allProjects = allProjects.data;
                        //console.log($scope.allProjects);
                    });
            };

            $scope.reloadProjects();

        }]);
