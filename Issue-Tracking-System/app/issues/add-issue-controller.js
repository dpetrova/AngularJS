angular.module('issueTracker.addIssue', [
    'issueTracker.issues.feed',
    'issueTracker.users.feed',
    'issueTracker.notify'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'app/issues/add-issue.html',
            controller: 'AddIssueCtrl'
        });
    }])
    .controller('AddIssueCtrl', [
        '$scope',
        '$routeParams',
        'issuesFeed',
        'identity',
        '$location',
        'usersFeed',
        'notify',
        function ($scope, $routeParams, issuesFeed, identity, $location, usersFeed, notify) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });


           $scope.addNewIssue = function(issue){
                var newIssue = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: $routeParams.projectId,
                    AssigneeId: issue.AssigneeId,
                    PriorityId: issue.PriorityId
                };

                issuesFeed.addIssue($routeParams.projectId, newIssue)
                    .then(function (issue) {
                        //console.log(issue.data);
                        notify.showSuccess("Issue added");
                        $location.path('/projects/' + $routeParams.projectId);
                    },
                    function error(err) {
                        notify.showError("Cannot add issue", err);
                    }
                );
            };

            $scope.cancelAddIssue = function(){
                $location.path('/projects/' + $routeParams.projectId);
            };
        }]);
