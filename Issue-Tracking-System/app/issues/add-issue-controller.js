angular.module('issueTracker.addIssue', [
    'issueTracker.issues.feed',
    'issueTracker.users.feed'
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
        function ($scope, $routeParams, issuesFeed, identity, $location, usersFeed) {

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
                        console.log(issue.data);
                        $location.path('/projects/' + $routeParams.projectId);
                    });
            };

            $scope.cancelAddIssue = function(){
                $location.path('/projects/' + $routeParams.projectId);
            };
        }]);
