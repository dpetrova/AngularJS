angular.module('issueTracker.dashboard', [
    'issueTracker.issues.feed',
    'issueTracker.common.filters'
    //'angularUtils.directives.dirPagination'
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
        '$route',
        function ($scope, issuesFeed, $route) {

            $scope.issuesParams = {
                'pageSize' : 10,
                'startPage' : 1
            };

            $scope.reloadIssues = function() {
                issuesFeed.getMyIssues($scope.issuesParams.pageSize, $scope.issuesParams.startPage, 'DueDate desc, IssueKey')
                    .then(function (myIssues) {
                        //console.log(myIssues.data);
                        $scope.myIssues = myIssues.data;
                        $scope.myIssues.TotalCount = $scope.myIssues.TotalPages * $scope.issuesParams.pageSize; //because by default TotalCount: 0 -> BUG?
                    });
            };

            $scope.reloadIssues();
        }]);
