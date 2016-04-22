angular.module('issueTracker.projectsDetails', [
    'issueTracker.projects.feed',
    'issueTracker.issues.feed'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'app/projects/project-details.html',
            controller: 'ProjectDetailsCtrl'
        });
    }])
    .controller('ProjectDetailsCtrl', [
        '$scope',
        '$routeParams',
        'feed',
        'issuesFeed',
        'identity',
        function ($scope, $routeParams, feed, issuesFeed, identity) {

            feed.getProjectById($routeParams.projectId)
                .then(function (project) {
                    $scope.currProject = project.data;
                    console.log($scope.currProject);

                    $scope.isProjectLead = identity.isProjectLead($scope.currProject.Lead.Id);
                });

            issuesFeed.getAllProjectIssues($routeParams.projectId)
                .then(function (issues) {
                    //view all project's issues
                    $scope.projectIssues = issues.data;
                    console.log($scope.projectIssues);

                    //view only my issues
                    //var allIssues = issues.data;
                    //
                    ////filter my issues only
                    //var myIssues = issues.data.filter(function(issue){
                    //    return issue.Assignee.Id === $scope.currentUser.Id ||
                    //           issue.Author.Id === $scope.currentUser.Id;
                    //});
                    //
                    ////what issues to display
                    //if($scope.currentUser.isAdmin || $scope.isProjectLead){
                    //    $scope.projectIssues = allIssues;
                    //}
                    //else{
                    //    $scope.projectIssues = myIssues;
                    //}
                    //
                    //console.log($scope.projectIssues);

                });



        }]);
