angular.module('issueTracker.editProject', [
    'issueTracker.projects.feed',
    'issueTracker.users.feed',
    'issueTracker.notify',
    'issueTracker.common.autocomplete'
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
        'notify',
        function ($scope, $routeParams, feed, identity, $location, usersFeed, notify) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });

            feed.getLabels('')
                .then(function(labels){
                    $scope.labels = labels.data;

                    var labelsNames = [];
                    labels.data.forEach(function(label){
                        labelsNames.push(label.Name);
                    });

                    $scope.labelsNames = labelsNames;
                });

            feed.getProjectById($routeParams.projectId)
                .then(function (project) {
                    $scope.currProject = project.data;
                    console.log($scope.currProject);

                    $scope.isProjectLead = identity.isProjectLead($scope.currProject.Lead.Id);
                });


            $scope.editProject = function(project){
                project.Priorities = [];
                project.AllPriorities.split(/[\s+|,]+/).forEach(function (priorityName) {
                    project.Priorities.push({Name: priorityName});
                });

                var label = $scope.labels.filter(function(label){
                    return label.Name === project.AllLabels;
                });

                var mofifiedProject = {
                    Name: project.Name,
                    Description: project.Description,
                    Priorities: project.Priorities,
                    Labels: label,
                    LeadId: project.Lead.Id
                };

                feed.editProject($routeParams.projectId, mofifiedProject)
                    .then(function (project) {
                        //console.log(project.data);
                        notify.showSuccess("Project edited");
                        $location.path('/projects/' + $routeParams.projectId);
                    },
                    function error(err) {
                        notify.showError("Cannot edit project", err);
                    }
                );
            };

            $scope.cancelEditProject = function(){
                $location.path('/projects/' + $routeParams.projectId);
            };
        }]);

