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
        function ($scope, $routeParams, issuesFeed, identity) {

            issuesFeed.getIssueById($routeParams.issueId)
                .then(function (issue) {
                    $scope.currIssue = issue.data;
                    $scope.currIssue.Comments = [];
                    console.log($scope.currIssue);
                });

            $scope.addComment = function(comment){
                var currUser = identity.getCurrentUser(),
                    newComment = {
                    author: currUser.$$state.value.Username,
                    postedOn: new Date(),
                    text: comment.text
                };

                $scope.currIssue.Comments.push(newComment);
            };

        }]);
