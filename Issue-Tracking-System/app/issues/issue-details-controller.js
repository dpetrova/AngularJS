angular.module('issueTracker.issueDetails', [
    'issueTracker.issues.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:issueId', {
            templateUrl: 'app/issues/issue-details.html',
            controller: 'IssueDetailsCtrl'
        });
    }])
    .controller('IssueDetailsCtrl', [
        '$scope',
        '$routeParams',
        'issuesFeed',
        'identity',
        '$location',
        function ($scope, $routeParams, issuesFeed, identity, $location) {

            issuesFeed.getIssueById($routeParams.issueId)
                .then(function (issue) {
                    $scope.currIssue = issue.data;
                    //console.log($scope.currIssue);
                });

            issuesFeed.getAllComments($routeParams.issueId)
                .then(function (comments) {
                    $scope.currIssueComments = comments.data;
                    //console.log($scope.currIssueComments);

                });

            $scope.addComment = function(comment){
                var newComment = {
                    Author: $scope.currentUser,
                    CreatedOn: new Date(),
                    Text: comment.text
                };

                issuesFeed.postComment($routeParams.issueId, newComment)
                    .then(function (comments) {
                        $scope.currIssueComments = comments.data;
                        //console.log($scope.currIssueComments);
                    });
            };


            $scope.changeStatus = function(currIssue){

                //issuesFeed.changeStatus($routeParams.issueId, project.Status.Id)
                //    .then(function (statuses) {
                //        $scope.availableStatuses = statuses.data;
                //        $location.path('/issues/' + $routeParams.issueId);
                //    });

                var modifiedIssue = {
                    Title: $scope.currIssue.Title,
                    Description: $scope.currIssue.Description,
                    DueDate: $scope.currIssue.DueDate,
                    ProjectId: $scope.currIssue.Project.Id,
                    AssigneeId: $scope.currIssue.Assignee.Id,
                    PriorityId: $scope.currIssue.Priority.Id,
                    StatusId: currIssue.Status.Id
                };

                issuesFeed.modifyIssue($routeParams.issueId, modifiedIssue)
                    .then(function (issue) {
                        //console.log(issue.data);
                    });
            };

        }]);
