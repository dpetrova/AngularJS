angular.module('issueTracker.dashboard', [
    'issueTracker.issues.feed',
    'issueTracker.common.filters'
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

            $scope.issuesParams = {
                'pageSize' : 10,
                'startPage' : 1
            };

            $scope.reloadIssues = function() {
                issuesFeed.getMyIssues($scope.issuesParams.pageSize, $scope.issuesParams.startPage, 'DueDate desc, IssueKey')
                    .then(function (myIssues) {
                        console.log(myIssues.data);
                        $scope.myIssues = myIssues.data;
                        $scope.myIssues.TotalCount = $scope.myIssues.TotalPages * $scope.issuesParams.pageSize; //because by default TotalCount: 0 -> BUG?

                        //filter unique projects
                        var uniqueProjects = [],
                            keys = [];

                        angular.forEach(myIssues.data.Issues, function(issue) {
                            var key = issue.Project.Id;
                            if(keys.indexOf(key) === -1) {
                                keys.push(key);
                                uniqueProjects.push(issue.Project);
                            }
                        });

                        $scope.affiliatedProjects = uniqueProjects;
                        console.log($scope.affiliatedProjects)
                    });
            };

            $scope.reloadIssues();
        }]);
