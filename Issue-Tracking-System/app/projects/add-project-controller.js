angular.module('issueTracker.addProject', [
    'issueTracker.projects.feed',
    'issueTracker.users.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/projects/add-project.html',
            controller: 'AddProjectCtrl'
        });
    }])
    .controller('AddProjectCtrl', [
        '$scope',
        'feed',
        'identity',
        '$location',
        'usersFeed',
        function ($scope, feed, identity, $location, usersFeed) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });


            $scope.addNewProject = function(project){
                project.Priorities = [];
                project.AllPriorities.split(/[\s+|,]+/).forEach(function (priorityName) {
                    project.Priorities.push({Name: priorityName});
                });

                var newProject = {
                    Name: project.Name,
                    Description: project.Description,
                    ProjectKey: project.ProjectKey,
                    Priorities: project.Priorities,
                    AssigneeId: project.AssigneeId
                };

                feed.addProject(newProject)
                    .then(function (project) {
                        console.log(project.data);
                        $location.path('/projects');
                    });
            };
        }]);
