angular.module('issueTracker.editProject', [
    'issueTracker.projects.feed',
    'issueTracker.users.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId/edit', {
            templateUrl: 'app/projects/edit-project.html',
            controller: 'EditProjectCtrl'
        });
    }])
    .controller('EditProjectCtrl', [
        '$scope',
        '$routeParams',
        'feed',
        'identity',
        '$location',
        'usersFeed',
        function ($scope, $routeParams, feed, identity, $location, usersFeed) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });


            $scope.editProject = function(project){
                project.Priorities = [];
                project.AllPriorities.split(/[\s+|,]+/).forEach(function (priorityName) {
                    project.Priorities.push({Name: priorityName});
                });

                var mofifiedProject = {
                    Name: project.Name,
                    Description: project.Description,
                    Priorities: project.Priorities,
                    AssigneeId: project.AssigneeId,
                    LeadId: project.LeadId
                };

                feed.editProject($routeParams.projectId, mofifiedProject)
                    .then(function (project) {
                        console.log(project.data);
                        $location.path('/projects/' + $routeParams.projectId);
                    });
            };

            $scope.cancelEditProject = function(){
                $location.path('/projects/' + $routeParams.projectId);
            };
        }]);

