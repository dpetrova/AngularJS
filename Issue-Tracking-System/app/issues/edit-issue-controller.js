angular.module('issueTracker.editIssue', [
    'issueTracker.issues.feed',
    'issueTracker.users.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:issueId/edit', {
            templateUrl: 'app/issues/edit-issue.html',
            controller: 'EditIssueCtrl'
        });
    }])
    .controller('EditIssueCtrl', [
        '$scope',
        '$routeParams',
        'issuesFeed',
        'identity',
        '$location',
        'usersFeed',
        function ($scope, $routeParams, issuesFeed, identity, $location, usersFeed) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });


            $scope.editIssue = function(issue){
                var modifiedIssue = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: $routeParams.projectId,
                    AssigneeId: issue.AssigneeId,
                    PriorityId: issue.PriorityId
                };

                issuesFeed.modifyIssue($routeParams.issueId, modifiedIssue)
                    .then(function (issue) {
                        console.log(issue.data);
                        $location.path('/issues/' + $routeParams.issueId);
                    });
            };

            $scope.cancelEditIssue = function(){
                $location.path('/issues/' + $routeParams.issueId);
            };
        }]);
