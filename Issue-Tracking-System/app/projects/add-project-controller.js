angular.module('issueTracker.addProject', [
    'issueTracker.projects.feed',
    'issueTracker.users.feed',
    'issueTracker.notify'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects-add', {
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
        'notify',
        function ($scope, feed, identity, $location, usersFeed, notify) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });


            $scope.addNewProject = function(project){
                project.Priorities = [];
                project.AllPriorities.split(/[\s+|,]+/).forEach(function (priorityName) {
                    project.Priorities.push({Name: priorityName});
                });

                project.Labels = [];
                project.AllLabels.split(/[\s+|,]+/).forEach(function (labelName) {
                    project.Labels.push({Name: labelName});
                });

                var newProject = {
                    Name: project.Name,
                    Description: project.Description,
                    ProjectKey: project.ProjectKey,
                    Priorities: project.Priorities,
                    Labels: project.Labels,
                    LeadId: project.LeadId
                };

                feed.addProject(newProject)
                    .then(function (project) {
                        //console.log(project.data);
                        notify.showSuccess("Project added");
                        $location.path('/projects');
                    },
                    function error(err) {
                        notify.showError("Cannot add project", err);
                    }
                );
            };

            $scope.cancelAddProject = function(){
                $location.path('/projects');
            };
        }]);
