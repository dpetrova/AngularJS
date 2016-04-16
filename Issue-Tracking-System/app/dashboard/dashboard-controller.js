angular.module('issueTracker.dashboard', [
    'issueTracker.issues.feed',
    'issueTracker.common.filters',
    'angularUtils.directives.dirPagination'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', [
        '$scope',
        'issuesFeed',
        function ($scope, issuesFeed) {

            issuesFeed.getMyIssues('DueDate desc, IssueKey', 10, 1)
                .then(function (issues) {
                    $scope.myIssues = issues.Issues;
                    console.log($scope.myIssues);
                });
        }]);
