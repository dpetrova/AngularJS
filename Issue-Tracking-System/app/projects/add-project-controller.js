angular.module('issueTracker.addProject', [
    'issueTracker.projects.feed',
    'issueTracker.users.feed',
    'issueTracker.notify',
    'issueTracker.common.autocomplete'
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

            feed.getLabels('')
                .then(function(labels){
                    $scope.labels = labels.data;

                    var labelsNames = [];
                    labels.data.forEach(function(label){
                        labelsNames.push(label.Name);
                    });

                    $scope.labelsNames = labelsNames;

                });


            $scope.addNewProject = function(project){

                var projectKey = project.Name
                    .split(/\s+/)
                    .map(function (el) {
                        return el[0].toUpperCase();
                    })
                    .join('');

                project.Priorities = [];
                project.AllPriorities.split(/[\s+|,]+/).forEach(function (priorityName) {
                    project.Priorities.push({Name: priorityName});
                });

                var label = $scope.labels.filter(function(label){
                    return label.Name === project.AllLabels;
                });

                var newProject = {
                    Name: project.Name,
                    Description: project.Description,
                    ProjectKey: projectKey,
                    Priorities: project.Priorities,
                    Labels: label,
                    LeadId: project.LeadId
                };
                //console.log(newProject);

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
