angular.module('issueTracker.editIssue', [
    'issueTracker.issues.feed',
    'issueTracker.users.feed',
    'issueTracker.notify'
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
        'notify',
        function ($scope, $routeParams, issuesFeed, identity, $location, usersFeed, notify) {

            usersFeed.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });

            issuesFeed.getIssueById($routeParams.issueId)
                .then(function (issue) {
                    $scope.currIssue = issue.data;
                    //console.log($scope.currIssue);
                });

            $scope.editIssue = function(issue){
                var modifiedIssue = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: $routeParams.projectId,
                    AssigneeId: issue.Assignee.Id,
                    PriorityId: issue.Priority.Id
                };

                issuesFeed.modifyIssue($routeParams.issueId, modifiedIssue)
                    .then(function (issue) {
                        //console.log(issue.data);
                        notify.showSuccess("Issue edited");
                        $location.path('/issues/' + $routeParams.issueId);
                    },
                    function error(err) {
                        notify.showError("Cannot edit issue", err);
                    }
                );
            };

            $scope.cancelEditIssue = function(){
                $location.path('/issues/' + $routeParams.issueId);
            };
        }]);
