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

        }]);
