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

            //issuesFeed.getMyIssues(10, 1, 'DueDate desc, IssueKey')
            //    .then(function (issues) {
            //        $scope.myIssues = issues.Issues;
            //        //console.log($scope.myIssues);
            //    });

            $scope.issuesParams = {
                'pageSize' : 10,
                'startPage' : 1
            };

            $scope.reloadIssues = function() {
                issuesFeed.getMyIssues($scope.issuesParams.pageSize, $scope.issuesParams.startPage, 'DueDate desc, IssueKey')
                    .then(function (myIssues) {
                        console.log(myIssues);
                        $scope.myIssues = myIssues;
                    });
            };

            $scope.reloadIssues();
        }]);
